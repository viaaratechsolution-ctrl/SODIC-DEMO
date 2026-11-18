import React, { useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  FileText,
  Home,
  ImagePlus,
  MapPin,
  MoreVertical,
  Plus,
  Share2,
  User,
  Wrench,
  X,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { calculateChecklistProgress } from '../demoData';
import { DemoEmployee, DemoTask, MatterDocument } from '../demoTypes';
import { MatterStepper } from '../components/MatterStepper';
import { MatterDocumentsCard } from '../components/MatterDocumentsCard';

interface MyTaskScreenProps {
  task: DemoTask;
  employees: DemoEmployee[];
  onToggleWorkflowStep: (taskId: string, stepId: string) => void;
  onToggleSnag: (taskId: string, snagId: string) => void;
  onAddSnag: (taskId: string, title: string, area: string) => void;
  onAddNote: (taskId: string, noteText: string) => void;
  onAddPhoto: (taskId: string, photoUrl: string) => void;
  onRemovePhoto: (taskId: string, photoUrl: string) => void;
  onAddDocument: (taskId: string, doc: MatterDocument) => void;
  onRemoveDocument: (taskId: string, docId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onOpenShareSheet: (triggerEl: HTMLButtonElement) => void;
  onShowToast: (msg: string) => void;
}

export const MyTaskScreen: React.FC<MyTaskScreenProps> = ({
  task,
  employees,
  onToggleWorkflowStep,
  onToggleSnag,
  onAddSnag,
  onAddNote,
  onAddPhoto,
  onRemovePhoto,
  onAddDocument,
  onRemoveDocument,
  onCompleteTask,
  onOpenShareSheet,
  onShowToast,
}) => {
  const { t, lang, pick } = useLanguage();
  const myT = t.demoUi.myTask;
  const commonT = t.demoUi.common;
  const firmT = t.demoUi.firm;
  const categoriesT = t.demoUi.categories;
  const headerT = t.demoUi.header;

  const assignee = employees.find((e) => e.id === task.assigneeId) || employees[0];
  const assigneeName = pick(assignee.name, assignee.nameEn);

  const [addingNote, setAddingNote] = useState(false);
  const [noteInput, setNoteInput] = useState('');
  const [addingSnag, setAddingSnag] = useState(false);
  const [snagTitleInput, setSnagTitleInput] = useState('');
  const [snagAreaInput, setSnagAreaInput] = useState(myT.snagAreas[0]);
  const [incompleteWarning, setIncompleteWarning] = useState(false);
  const [justConfirmed, setJustConfirmed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    setSnagAreaInput(myT.snagAreas[0]);
  }, [lang, myT.snagAreas]);

  const completedSteps = task.checklistSteps.filter((s) => s.done).length;
  const totalSteps = task.checklistSteps.length || 1;
  const calculatedProgress = calculateChecklistProgress(task.checklistSteps);
  const isCompleted = task.status === 'completed';

  const statusPill = (() => {
    switch (task.status) {
      case 'completed':
        return { label: myT.deliveredBtn, cls: 'bg-[#e3f5f1] text-[#0b7a6c]' };
      case 'site-visit':
        return { label: commonT.siteVisit, cls: 'bg-amber-50 text-amber-800' };
      case 'in-progress':
        return { label: commonT.inProgress, cls: 'bg-[#e3f5f1] text-[#0b7a6c]' };
      case 'overdue':
        return { label: commonT.overdue, cls: 'bg-[#fde8e8] text-[#b42318]' };
      default:
        return { label: commonT.pending, cls: 'bg-[#e8edfd] text-[#4338ca]' };
    }
  })();

  const handleSubmitNote = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = noteInput.trim();
    if (!trimmed) return;
    onAddNote(task.id, trimmed);
    setNoteInput('');
    setAddingNote(false);
  };

  const handleSubmitSnag = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = snagTitleInput.trim();
    if (!trimmed) return;
    onAddSnag(task.id, trimmed, snagAreaInput);
    setSnagTitleInput('');
    setAddingSnag(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    onAddPhoto(task.id, objectUrl);
    e.target.value = '';
  };

  const handleTaskSubmission = () => {
    if (isCompleted) return;
    if (completedSteps < totalSteps) {
      setIncompleteWarning(true);
      onShowToast(myT.remainingStepsToast(totalSteps - completedSteps));
      return;
    }
    setIncompleteWarning(false);
    setJustConfirmed(true);
    onCompleteTask(task.id);
    window.setTimeout(() => setJustConfirmed(false), 600);
  };

  const taskTitle = pick(task.title, task.titleEn);
  const taskImageCaption = task.imageCaption
    ? pick(task.imageCaption, task.imageCaptionEn)
    : undefined;

  return (
    <div className="px-4 py-4 space-y-3.5 bg-[#f8fafc] min-h-full text-start">
      {/* SODIC Banner */}
      <div className="rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2.5 min-w-0">
          <span className="size-8 rounded-xl bg-[#0d9488] text-white flex items-center justify-center shrink-0">
            <Building2 className="size-4" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="text-[12px] font-bold text-slate-900 truncate">
                {firmT.firmName}
              </span>
              <span className="rounded bg-[#e3f5f1] px-1.5 py-0.5 text-[9px] font-semibold text-[#0b7a6c] shrink-0">
                {firmT.regionBadge}
              </span>
            </div>
            <p className="text-[10px] font-medium text-[#0d9488] truncate">
              {myT.assignedScreenSubtitle}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => onShowToast(headerT.fullVersionToast)}
          aria-label={myT.taskOptionsLabel}
          className="min-w-[36px] min-h-[36px] -me-1 rounded-full flex items-center justify-center text-slate-400 hover:bg-slate-100 cursor-pointer shrink-0"
        >
          <MoreVertical className="size-4" />
        </button>
      </div>

      {/* Main Assigned Task Card */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-3">
        <div className="flex items-center justify-between gap-2 flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="rounded-full bg-[#e6f7f5] px-2.5 py-0.5 text-[10px] font-semibold text-[#0b7a6c]">
              {categoriesT[task.category]}
            </span>
            <span
              dir="ltr"
              className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 tabular-nums"
            >
              {task.matterRef}
            </span>
          </div>
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusPill.cls}`}>
            ● {statusPill.label}
          </span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <h4 className="text-[16px] font-bold text-slate-900 leading-snug min-w-0 flex-1">
            {taskTitle}
          </h4>
          <button
            type="button"
            onClick={(e) => onOpenShareSheet(e.currentTarget)}
            aria-label={myT.shareLabel}
            className="min-w-[44px] min-h-[44px] -mt-1.5 -me-1.5 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0d9488] hover:bg-slate-100 active:scale-95 transition cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Share2 className="size-4" />
          </button>
        </div>
        <p className="-mt-1.5 text-[11.5px] font-normal text-slate-500 leading-[1.6]">
          {pick(task.description, task.descriptionEn)}
        </p>

        {/* Property Unit Summary */}
        {task.propertyMeta && (
          <div className="rounded-xl border border-teal-100 bg-[#f4fbf9] p-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <p className="flex items-center gap-1 text-[11px] font-bold text-slate-800 truncate">
                <Home className="size-3 text-[#0d9488] shrink-0" />
                <span className="truncate">
                  {pick(task.propertyMeta.unitType, task.propertyMeta.unitTypeEn)}
                </span>
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 truncate">
                {pick(task.propertyMeta.compoundName, task.propertyMeta.compoundNameEn)}
              </p>
            </div>
            <div className="text-end shrink-0">
              <p className="text-[11.5px] font-extrabold text-[#0b7a6c] tabular-nums">
                {pick(task.propertyMeta.priceEgp, task.propertyMeta.priceEgpEn)}
              </p>
              <span className="inline-block mt-0.5 rounded-full bg-white border border-teal-200 px-2 py-0.5 text-[9px] font-bold text-[#0b7a6c]">
                {pick(task.propertyMeta.statusPill, task.propertyMeta.statusPillEn)}
              </span>
            </div>
          </div>
        )}

        {/* Compound Thumbnail */}
        {task.image && (
          <div className="rounded-xl border border-slate-100 bg-slate-50/70 p-2 flex items-center gap-3">
            <img
              src={task.image}
              alt={taskImageCaption || taskTitle}
              className="w-20 h-14 rounded-lg object-cover shrink-0"
            />
            <div className="min-w-0 flex-1">
              <p className="text-[11.5px] font-bold text-slate-900 leading-snug">
                {taskImageCaption || taskTitle}
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5 tabular-nums">
                {commonT.unitCodeLabel} <span dir="ltr">{task.unitCode}</span>
              </p>
            </div>
          </div>
        )}

        {/* Client + Compound */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
          <div>
            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              <User className="size-3 text-[#0d9488]" />
              <span>{commonT.client}</span>
            </span>
            <span className="block text-[11.5px] font-bold text-slate-900 mt-0.5 leading-snug">
              {pick(task.clientName, task.clientNameEn)}
            </span>
          </div>

          <div className="border-s border-slate-100 ps-2.5">
            <span className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              <MapPin className="size-3 text-[#0d9488]" />
              <span>{commonT.projectSite}</span>
            </span>
            <span className="block text-[11.5px] font-bold text-slate-900 mt-0.5 leading-snug">
              {pick(task.compoundName, task.compoundNameEn)}
            </span>
          </div>
        </div>

        {/* Deadline + Assignee */}
        <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-slate-100">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-lg bg-slate-100 text-[#0d9488] flex items-center justify-center shrink-0">
              <Calendar className="size-3.5" />
            </span>
            <div className="min-w-0">
              <span className="block text-[10px] font-medium text-slate-400">
                {commonT.targetDate}
              </span>
              <span className="block text-[10.5px] font-semibold text-slate-900 leading-snug tabular-nums">
                {pick(task.deadline, task.deadlineEn)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <img
              src={assignee.avatar}
              alt={assigneeName}
              className="size-7 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
            />
            <div className="min-w-0">
              <span className="block text-[10px] text-slate-400">{commonT.assignee}</span>
              <span className="block text-[10.5px] font-bold text-slate-900 truncate">
                {assigneeName}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Linked 4-Stage Stepper */}
      <MatterStepper
        stages={pick(task.stepperStages, task.stepperStagesEn)}
        progress={calculatedProgress}
      />

      {/* Interactive Checklist */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <h5 className="text-[13px] font-bold text-slate-900">{myT.executionStepsTitle}</h5>
          <span className="text-[11px] font-semibold text-[#0b7a6c] tabular-nums">
            {commonT.stepsCompletedOf(completedSteps, totalSteps)}
          </span>
        </div>

        <div className="space-y-1">
          {task.checklistSteps.map((step) => (
            <button
              key={step.id}
              type="button"
              role="checkbox"
              aria-checked={step.done}
              onClick={() => {
                setIncompleteWarning(false);
                onToggleWorkflowStep(task.id, step.id);
              }}
              className="w-full min-h-[42px] rounded-xl px-2 py-1.5 flex items-center gap-2.5 text-start hover:bg-slate-50 active:scale-[0.99] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <span
                className={`size-5 rounded-md flex items-center justify-center border transition shrink-0 ${
                  step.done
                    ? 'bg-[#0d9488] border-[#0d9488] text-white'
                    : 'bg-white border-slate-300 text-transparent'
                }`}
              >
                <Check className="size-3.5 stroke-[3]" />
              </span>
              <span
                className={`text-[11.5px] font-medium leading-relaxed ${
                  step.done ? 'text-slate-900' : 'text-slate-600'
                }`}
              >
                {pick(step.label, step.labelEn)}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Documents + Upload */}
      <MatterDocumentsCard
        documents={task.documents}
        allowUpload
        onAddDocument={(doc) => onAddDocument(task.id, doc)}
        onRemoveDocument={(docId) => onRemoveDocument(task.id, docId)}
        onShowToast={onShowToast}
      />

      {/* Site Inspection Snag List Card */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5 min-w-0">
            <Wrench className="size-3.5 text-[#0d9488] shrink-0" />
            <h5 className="text-[13px] font-bold text-slate-900 truncate">
              {myT.snagCardTitle}
            </h5>
          </div>
          <button
            type="button"
            onClick={() => setAddingSnag((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d9488] hover:text-[#0b7f75] cursor-pointer shrink-0"
          >
            <Plus className="size-3" />
            <span>{addingSnag ? commonT.cancel : myT.addSnagBtn}</span>
          </button>
        </div>

        {addingSnag && (
          <form onSubmit={handleSubmitSnag} className="space-y-2 rounded-xl bg-slate-50 p-2.5 border border-slate-200/80">
            <input
              type="text"
              value={snagTitleInput}
              onChange={(e) => setSnagTitleInput(e.target.value)}
              placeholder={myT.snagPlaceholder}
              className="w-full min-h-[38px] rounded-lg border border-slate-200 bg-white px-2.5 text-[11.5px] text-slate-900 focus:outline-none focus:border-teal-500"
              autoFocus
            />
            <div className="flex items-center justify-between gap-2">
              <select
                value={snagAreaInput}
                onChange={(e) => setSnagAreaInput(e.target.value)}
                aria-label={myT.snagAreaLabel}
                className="min-h-[36px] rounded-lg border border-slate-200 bg-white px-2 text-[11px] font-semibold text-slate-700 focus:outline-none focus:border-teal-500"
              >
                {myT.snagAreas.map((area) => (
                  <option key={area} value={area}>
                    {area}
                  </option>
                ))}
              </select>
              <button
                type="submit"
                className="min-h-[36px] px-3 rounded-lg bg-[#0d9488] text-white text-[11px] font-bold hover:bg-[#0b7f75] cursor-pointer"
              >
                {myT.saveSnagBtn}
              </button>
            </div>
          </form>
        )}

        {(!task.snags || task.snags.length === 0) ? (
          <p className="rounded-xl bg-slate-50 px-3 py-2.5 text-[11px] text-slate-500">
            {myT.noSnagsMessage}
          </p>
        ) : (
          <>
            <div className="flex items-center justify-between text-[10.5px] font-semibold text-slate-500 tabular-nums">
              <span>
                {myT.snagsFixedCount(
                  task.snags.filter((s) => s.resolved).length,
                  task.snags.length
                )}
              </span>
              <span className="text-[#0b7a6c]">{myT.tapToToggleStatus}</span>
            </div>
            <div className="space-y-1.5">
              {task.snags.map((snag) => (
                <button
                  key={snag.id}
                  type="button"
                  role="checkbox"
                  aria-checked={snag.resolved}
                  onClick={() => onToggleSnag(task.id, snag.id)}
                  className="w-full min-h-[44px] rounded-xl border border-slate-100 bg-slate-50/70 px-2.5 py-2 flex items-center justify-between gap-2 text-start hover:bg-slate-100/70 active:scale-[0.99] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`size-5 rounded-md flex items-center justify-center border transition shrink-0 ${
                        snag.resolved
                          ? 'bg-[#0d9488] border-[#0d9488] text-white'
                          : 'bg-white border-amber-400 text-transparent'
                      }`}
                    >
                      <Check className="size-3.5 stroke-[3]" />
                    </span>
                    <div className="min-w-0">
                      <p
                        className={`text-[11.5px] font-semibold leading-snug ${
                          snag.resolved ? 'line-through text-slate-400' : 'text-slate-900'
                        }`}
                      >
                        {pick(snag.title, snag.titleEn)}
                      </p>
                      <p className="text-[10px] text-slate-500 mt-0.5">
                        {pick(snag.area, snag.areaEn)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold shrink-0 whitespace-nowrap ${
                      snag.resolved
                        ? 'bg-[#e3f5f1] text-[#0b7a6c]'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    {snag.resolved ? myT.snagFixed : myT.snagPending}
                  </span>
                </button>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Notes Card */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <h5 className="flex items-center gap-1.5 text-[13px] font-bold text-slate-900">
            <FileText className="size-3.5 text-slate-500" />
            <span>{myT.notesTitle}</span>
          </h5>
          <button
            type="button"
            onClick={() => setAddingNote((prev) => !prev)}
            className="inline-flex items-center gap-1 text-[11px] font-bold text-[#0d9488] hover:text-[#0b7f75] cursor-pointer"
          >
            <Plus className="size-3" />
            <span>{addingNote ? commonT.cancel : myT.addNoteBtn}</span>
          </button>
        </div>

        {addingNote && (
          <form onSubmit={handleSubmitNote} className="mb-3 space-y-2">
            <input
              type="text"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
              placeholder={myT.notePlaceholder}
              className="w-full min-h-[40px] rounded-xl border border-slate-200 px-3 text-[12px] text-slate-900 focus:outline-none focus:border-teal-500"
              autoFocus
            />
            <button
              type="submit"
              className="min-h-[36px] px-3.5 rounded-xl bg-[#0d9488] text-white text-[11px] font-bold hover:bg-[#0b7f75] cursor-pointer"
            >
              {myT.saveNoteBtn}
            </button>
          </form>
        )}

        <div
          onClick={() => {
            if (!addingNote) setAddingNote(true);
          }}
          className="rounded-xl bg-[#f4f6fb] p-3 space-y-2 cursor-pointer hover:bg-[#edf1fa] transition"
        >
          {task.notes.length === 0 ? (
            <p className="text-[11px] text-slate-500">
              {myT.notesEmptyPrompt}
            </p>
          ) : (
            <ul className="space-y-1.5">
              {task.notes.map((note) => (
                <li key={note.id} className="flex items-start gap-2 text-[11.5px] text-slate-700">
                  <span className="mt-2 size-1.5 rounded-full bg-slate-500 shrink-0" />
                  <div className="min-w-0 flex-1">
                    <span className="leading-[1.6] block font-normal">
                      {pick(note.text, note.textEn)}
                    </span>
                    <span className="text-[9.5px] text-slate-400 tabular-nums">
                      {pick(note.timestamp, note.timestampEn)}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      {/* Photo Evidence Upload Area */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          aria-label={myT.photoAriaLabel}
        />

        {task.uploadedPhotos.length > 0 && (
          <div className="grid grid-cols-3 gap-2 mb-3">
            {task.uploadedPhotos.map((src, idx) => (
              <div
                key={`${src}-${idx}`}
                className="relative aspect-square rounded-xl overflow-hidden border border-slate-200"
              >
                <img
                  src={src}
                  alt={myT.photoAlt(idx + 1)}
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => onRemovePhoto(task.id, src)}
                  aria-label={myT.removePhotoLabel}
                  className="absolute top-1 end-1 size-6 rounded-full bg-black/65 text-white flex items-center justify-center hover:bg-black cursor-pointer"
                >
                  <X className="size-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}

        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="w-full min-h-[68px] rounded-xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-300 flex flex-col items-center justify-center gap-1 py-2.5 px-4 transition cursor-pointer"
        >
          <ImagePlus className="size-4.5 text-slate-400" />
          <span className="text-[11px] font-bold text-[#0d9488]">
            {myT.attachPhotosTitle}{' '}
            <span className="text-slate-600 font-semibold">({commonT.optional})</span>
          </span>
          <span className="text-[9.5px] text-slate-400">
            {myT.attachPhotosHint}
          </span>
        </button>
      </div>

      {/* Incomplete Checklist Validation Banner */}
      {incompleteWarning && !isCompleted && (
        <div
          role="alert"
          className="rounded-2xl bg-amber-50 border border-amber-200 p-3 flex items-start gap-2.5 text-[11px] text-amber-900"
        >
          <AlertCircle className="size-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="font-bold">{myT.incompleteTitle}</p>
            <p className="mt-0.5 text-amber-800 leading-relaxed">
              {myT.incompleteBody(totalSteps - completedSteps)}{' '}
              <button
                type="button"
                onClick={() => {
                  setIncompleteWarning(false);
                  onCompleteTask(task.id);
                }}
                className="font-extrabold underline hover:text-amber-950 cursor-pointer"
              >
                {myT.completeAllAction}
              </button>
              .
            </p>
          </div>
        </div>
      )}

      {/* Task submission CTA */}
      <button
        type="button"
        disabled={isCompleted}
        onClick={handleTaskSubmission}
        className={`w-full min-h-[48px] rounded-2xl px-4 py-3 text-[13px] font-bold flex items-center justify-center gap-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
          justConfirmed ? 'scale-[0.98]' : ''
        } ${
          isCompleted
            ? 'bg-[#e3f5f1] text-[#0b7a6c] cursor-default'
            : 'bg-[#0d9488] text-white shadow-md shadow-teal-600/20 hover:bg-[#0b7f75] active:scale-[0.99] cursor-pointer'
        }`}
      >
        <CheckCircle2 className="size-4" />
        <span>{isCompleted ? myT.deliveredBtn : myT.confirmSubmitBtn}</span>
      </button>
    </div>
  );
};
