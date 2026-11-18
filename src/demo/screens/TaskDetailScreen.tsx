import React, { useState } from 'react';
import {
  AlertTriangle,
  Banknote,
  Bell,
  Building2,
  Calendar,
  Check,
  CheckCircle2,
  Flag,
  Home,
  ListTodo,
  MapPin,
  MessageSquare,
  Share2,
  User,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { calculateChecklistProgress } from '../demoData';
import { DemoActivity, DemoEmployee, DemoTask } from '../demoTypes';
import { MatterStepper } from '../components/MatterStepper';
import { MatterDocumentsCard } from '../components/MatterDocumentsCard';

interface TaskDetailScreenProps {
  task: DemoTask;
  employees: DemoEmployee[];
  activities: DemoActivity[];
  onToggleChecklistStep: (taskId: string, stepId: string) => void;
  onCompleteTask: (taskId: string) => void;
  onMarkInstallmentPaid: (taskId: string) => void;
  onSendInstallmentReminder: (taskId: string) => void;
  onMessageEmployee: (taskId: string) => void;
  onOpenMyTask: (taskId: string) => void;
  onOpenShareSheet: (triggerEl: HTMLButtonElement) => void;
  onRemoveDocument: (taskId: string, docId: string) => void;
  onShowToast: (msg: string) => void;
}

export const TaskDetailScreen: React.FC<TaskDetailScreenProps> = ({
  task,
  employees,
  activities,
  onToggleChecklistStep,
  onCompleteTask,
  onMarkInstallmentPaid,
  onSendInstallmentReminder,
  onMessageEmployee,
  onOpenMyTask,
  onOpenShareSheet,
  onRemoveDocument,
  onShowToast,
}) => {
  const { t, isRtl, pick } = useLanguage();
  const tdT = t.demoUi.taskDetails;
  const commonT = t.demoUi.common;
  const firmT = t.demoUi.firm;
  const categoriesT = t.demoUi.categories;

  const [justConfirmed, setJustConfirmed] = useState(false);

  const assignee = employees.find((e) => e.id === task.assigneeId) || employees[0];
  const assigneeName = pick(assignee.name, assignee.nameEn);
  const assigneeRole = pick(assignee.role, assignee.roleEn);
  const teamMembers = task.teamMemberIds
    .map((id) => employees.find((e) => e.id === id))
    .filter((e): e is DemoEmployee => Boolean(e));

  const calculatedProgress = calculateChecklistProgress(task.checklistSteps);
  const completedSteps = task.checklistSteps.filter((s) => s.done).length;
  const totalSteps = task.checklistSteps.length || 1;
  const isCompleted = task.status === 'completed';

  const statusMeta = (() => {
    switch (task.status) {
      case 'completed':
        return { label: commonT.completedCheck, cls: 'bg-[#e3f5f1] text-[#0b7a6c]' };
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

  const handleMarkCompleted = () => {
    if (isCompleted) return;
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
      <div className="rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center gap-2.5">
        <span className="size-8 rounded-xl bg-[#0d9488] text-white flex items-center justify-center shrink-0">
          <Building2 className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-bold text-slate-900 truncate">
              {firmT.firmName}
            </span>
            <span className="rounded bg-[#e3f5f1] px-1.5 py-0.5 text-[9px] font-semibold text-[#0b7a6c] shrink-0">
              {firmT.regionBadge}
            </span>
          </div>
          <p className="text-[10px] font-medium text-[#0d9488] truncate">
            {firmT.subtitle}
          </p>
        </div>
      </div>

      {/* Main Summary Card */}
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
          <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${statusMeta.cls}`}>
            ● {statusMeta.label}
          </span>
        </div>

        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <h4 className="text-[16px] font-bold text-slate-900 leading-snug">
              {taskTitle}
            </h4>
          </div>
          <button
            type="button"
            onClick={(e) => onOpenShareSheet(e.currentTarget)}
            aria-label={tdT.shareLabel}
            className="min-w-[44px] min-h-[44px] -mt-1.5 -me-1.5 rounded-full flex items-center justify-center text-slate-500 hover:text-[#0d9488] hover:bg-slate-100 active:scale-95 transition cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Share2 className="size-4" />
          </button>
        </div>
        <p className="-mt-1.5 text-[12px] font-normal text-slate-500 leading-[1.6]">
          {pick(task.description, task.descriptionEn)}
        </p>

        {/* Property Unit Card (Compound, Unit Type, Price in EGP, Status Pill) */}
        {task.propertyMeta && (
          <div
            className={`rounded-xl border border-teal-100 ${
              isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
            } from-[#f0fdf9] to-white p-3 space-y-2`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold text-slate-800 truncate">
                <Home className="size-3.5 text-[#0d9488] shrink-0" />
                <span className="truncate">
                  {pick(task.propertyMeta.compoundName, task.propertyMeta.compoundNameEn)}
                </span>
              </span>
              <span className="rounded-full bg-[#e3f5f1] text-[#0b7a6c] px-2.5 py-0.5 text-[9.5px] font-bold shrink-0">
                {pick(task.propertyMeta.statusPill, task.propertyMeta.statusPillEn)}
              </span>
            </div>
            <div className="flex items-center justify-between gap-2 pt-1 border-t border-teal-100/70">
              <span className="text-[11px] font-semibold text-slate-600 tabular-nums">
                {pick(task.propertyMeta.unitType, task.propertyMeta.unitTypeEn)}
              </span>
              <span className="text-[12.5px] font-extrabold text-[#0b7a6c] tabular-nums">
                {pick(task.propertyMeta.priceEgp, task.propertyMeta.priceEgpEn)}
              </span>
            </div>
          </div>
        )}

        {/* Property Compound Photo */}
        {task.image && (
          <div className="rounded-xl overflow-hidden border border-slate-100 bg-slate-50">
            <img
              src={task.image}
              alt={taskImageCaption || taskTitle}
              className="w-full h-32 object-cover"
            />
            {taskImageCaption && (
              <p className="px-3 py-1.5 text-[10.5px] font-semibold text-slate-600 truncate">
                {taskImageCaption}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Client, Compound, Responsible Member & Team */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-3">
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <p className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              <User className="size-3 text-[#0d9488]" />
              <span>{commonT.client}</span>
            </p>
            <p className="mt-0.5 text-[11.5px] font-bold text-slate-900 leading-snug">
              {pick(task.clientName, task.clientNameEn)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <p className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              <MapPin className="size-3 text-[#0d9488]" />
              <span>{commonT.projectSite}</span>
            </p>
            <p className="mt-0.5 text-[11.5px] font-bold text-slate-900 leading-snug">
              {pick(task.compoundName, task.compoundNameEn)}
            </p>
          </div>
        </div>

        {/* Responsible Member + Team */}
        <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 p-2.5 border border-slate-100">
          <div className="flex items-center gap-2.5 min-w-0">
            <img
              src={assignee.avatar}
              alt={assigneeName}
              className="size-9 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
            />
            <div className="min-w-0">
              <p className="text-[10px] font-semibold text-slate-400">{tdT.responsibleMember}</p>
              <p className="text-[12px] font-bold text-slate-900 truncate">{assigneeName}</p>
              <p className="text-[10px] text-slate-500 truncate">{assigneeRole}</p>
            </div>
          </div>

          <div className={`flex -space-x-1.5 ${isRtl ? 'space-x-reverse' : ''} shrink-0`}>
            {teamMembers.map((member) => {
              const memberName = pick(member.name, member.nameEn);
              const memberRole = pick(member.role, member.roleEn);
              return (
                <span
                  key={member.id}
                  title={`${memberName} (${memberRole})`}
                  className="size-7 rounded-full ring-2 ring-white overflow-hidden bg-slate-200"
                >
                  <img
                    src={member.avatar}
                    alt={memberName}
                    className="w-full h-full object-cover"
                  />
                </span>
              );
            })}
          </div>
        </div>

        {/* Deadline & Priority */}
        <div className="grid grid-cols-2 gap-2.5">
          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <p className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              <Calendar className="size-3 text-[#0d9488]" />
              <span>{commonT.targetDate}</span>
            </p>
            <p className="mt-0.5 text-[11px] font-semibold text-slate-900 leading-snug tabular-nums">
              {pick(task.deadline, task.deadlineEn)}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-2.5 border border-slate-100">
            <p className="flex items-center gap-1 text-[10px] font-semibold text-slate-400">
              <Flag className="size-3 text-[#b42318]" />
              <span>{commonT.priority}</span>
            </p>
            <div className="mt-1 flex items-center gap-1.5 flex-wrap">
              <span
                className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${
                  task.priority === 'high'
                    ? 'bg-[#fde8e8] text-[#b42318]'
                    : 'bg-slate-200 text-slate-700'
                }`}
              >
                {task.priority === 'high'
                  ? commonT.highPriority
                  : task.priority === 'medium'
                  ? commonT.mediumPriority
                  : commonT.lowPriority}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Linked 4-Stage Progress Stepper */}
      <MatterStepper
        stages={pick(task.stepperStages, task.stepperStagesEn)}
        progress={calculatedProgress}
      />

      {/* Installment Status & Reminders Card */}
      {task.installment && (
        <div
          className={`rounded-2xl p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border space-y-2.5 ${
            task.installment.status === 'overdue'
              ? 'bg-[#fff5f5] border-rose-200'
              : 'bg-white border-slate-100'
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              <Banknote
                className={`size-4 shrink-0 ${
                  task.installment.status === 'overdue' ? 'text-[#b42318]' : 'text-[#0d9488]'
                }`}
              />
              <h5 className="text-[13px] font-bold text-slate-900">{tdT.installmentsTitle}</h5>
            </div>

            <span
              className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold inline-flex items-center gap-1 shrink-0 ${
                task.installment.status === 'paid'
                  ? 'bg-[#e3f5f1] text-[#0b7a6c]'
                  : task.installment.status === 'overdue'
                  ? 'bg-[#fde8e8] text-[#b42318]'
                  : 'bg-amber-50 text-amber-800'
              }`}
            >
              {task.installment.status === 'overdue' && <AlertTriangle className="size-3" />}
              <span>
                {task.installment.status === 'paid'
                  ? tdT.installmentPaidBadge
                  : task.installment.status === 'overdue'
                  ? tdT.installmentOverdueBadge
                  : tdT.installmentDueBadge}
              </span>
            </span>
          </div>

          <div className="flex items-center justify-between gap-2 rounded-xl bg-white/90 border border-slate-100 px-3 py-2.5">
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-slate-900 truncate">
                {pick(task.installment.label, task.installment.labelEn)}
              </p>
              <p
                className={`text-[10.5px] font-medium mt-0.5 tabular-nums ${
                  task.installment.status === 'overdue' ? 'text-[#b42318]' : 'text-slate-500'
                }`}
              >
                {pick(task.installment.dueDate, task.installment.dueDateEn)}
              </p>
            </div>
            <span className="text-[13px] font-extrabold text-slate-900 tabular-nums shrink-0">
              {pick(task.installment.amountEgp, task.installment.amountEgpEn)}
            </span>
          </div>

          {task.installment.status !== 'paid' && (
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                disabled={Boolean(task.installment.reminderSent)}
                onClick={() => onSendInstallmentReminder(task.id)}
                className={`min-h-[40px] rounded-xl px-2.5 py-1.5 text-[11px] font-bold border inline-flex items-center justify-center gap-1.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  task.installment.reminderSent
                    ? 'bg-[#e3f5f1] text-[#0b7a6c] border-teal-200 cursor-default'
                    : 'bg-white text-slate-800 border-slate-200 hover:bg-slate-50 active:scale-[0.98] cursor-pointer'
                }`}
              >
                {task.installment.reminderSent ? (
                  <>
                    <Check className="size-3.5" />
                    <span>{tdT.remindedBtn}</span>
                  </>
                ) : (
                  <>
                    <Bell className="size-3.5 text-[#0d9488]" />
                    <span>{tdT.sendPaymentReminderBtn}</span>
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onMarkInstallmentPaid(task.id)}
                className="min-h-[40px] rounded-xl bg-[#0d9488] text-white px-2.5 py-1.5 text-[11px] font-bold inline-flex items-center justify-center gap-1.5 hover:bg-[#0b7f75] active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <CheckCircle2 className="size-3.5" />
                <span>{tdT.markPaidBtn}</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Site Inspection Snag Summary Row */}
      {task.snags && task.snags.length > 0 && (
        <div className="rounded-2xl bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center justify-between gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="size-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center shrink-0">
              <Wrench className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-[12px] font-bold text-slate-900">
                {tdT.snagSummaryTitle}
              </p>
              <p className="text-[10.5px] font-medium text-slate-500 tabular-nums mt-0.5">
                {tdT.snagsResolvedOf(
                  task.snags.filter((s) => s.resolved).length,
                  task.snags.length
                )}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onOpenMyTask(task.id)}
            className="min-h-[38px] px-3 rounded-xl bg-teal-50 text-[#0b7a6c] text-[11px] font-bold hover:bg-teal-100 transition cursor-pointer shrink-0 whitespace-nowrap"
          >
            {tdT.reviewSnagsBtn}
          </button>
        </div>
      )}

      {/* Interactive Checklist Card */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <h5 className="text-[13px] font-bold text-slate-900">{tdT.stepsTitle}</h5>
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
              onClick={() => onToggleChecklistStep(task.id, step.id)}
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

      {/* Documents List with 3-dot Menu */}
      <MatterDocumentsCard
        documents={task.documents}
        onRemoveDocument={(docId) => onRemoveDocument(task.id, docId)}
        onShowToast={onShowToast}
      />

      {/* Live Activity Feed */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100">
        <div className="flex items-center justify-between mb-3">
          <h5 className="text-[13px] font-bold text-slate-900">{tdT.activityLogTitle}</h5>
          <span className="text-[11px] text-slate-400 font-medium">{commonT.liveUpdate}</span>
        </div>

        <div className="space-y-3 border-s-2 border-slate-100 ps-3 ms-1">
          <div className="relative">
            <span className="absolute -start-[17px] top-1 size-2 rounded-full bg-[#0d9488]" />
            <p className="text-[12px] font-semibold text-slate-800 tabular-nums">
              {isCompleted ? tdT.taskCompletedLog : tdT.progressPctLog(calculatedProgress)}
            </p>
            <p className="text-[10px] text-slate-400 tabular-nums">
              {assigneeName} · {activities[0] ? pick(activities[0].time, activities[0].timeEn) : commonT.now}
            </p>
          </div>
          <div className="relative">
            <span className="absolute -start-[17px] top-1 size-2 rounded-full bg-slate-300" />
            <p className="text-[12px] font-semibold text-slate-700 tabular-nums">
              {tdT.taskOpenedLog(task.unitCode)}
            </p>
            <p className="text-[10px] text-slate-400 tabular-nums">
              {pick(task.assignedBy, task.assignedByEn)} · {pick(task.createdDate, task.createdDateEn)}
            </p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-2">
        <button
          type="button"
          onClick={() => onMessageEmployee(task.id)}
          className="min-h-[44px] rounded-xl bg-white border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5 hover:bg-slate-50 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <MessageSquare className="size-3.5 text-[#0d9488]" />
          <span>{tdT.messageTeamBtn}</span>
        </button>

        <button
          type="button"
          onClick={() => onOpenMyTask(task.id)}
          className="min-h-[44px] rounded-xl bg-white border border-slate-200 px-3 py-2 text-[11px] font-bold text-slate-800 flex items-center justify-center gap-1.5 hover:bg-slate-50 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <ListTodo className="size-3.5 text-[#0d9488]" />
          <span>{tdT.executionScreenBtn}</span>
        </button>
      </div>

      <button
        type="button"
        disabled={isCompleted}
        onClick={handleMarkCompleted}
        className={`w-full min-h-[48px] rounded-2xl px-4 py-3 text-[13px] font-bold flex items-center justify-center gap-2 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
          justConfirmed ? 'scale-[0.98]' : ''
        } ${
          isCompleted
            ? 'bg-[#e3f5f1] text-[#0b7a6c] cursor-default'
            : 'bg-[#0d9488] text-white shadow-md shadow-teal-600/20 hover:bg-[#0b7f75] active:scale-[0.99] cursor-pointer'
        }`}
      >
        <CheckCircle2 className="size-4" />
        <span>{isCompleted ? tdT.completedBtn : tdT.confirmCompleteBtn}</span>
      </button>
    </div>
  );
};
