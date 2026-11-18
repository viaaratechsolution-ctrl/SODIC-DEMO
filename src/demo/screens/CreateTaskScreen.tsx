import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bell,
  Building2,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  FileSignature,
  Headset,
  Home,
  ImagePlus,
  KeyRound,
  Lock,
  MapPin,
  Plus,
  Trash2,
  UploadCloud,
  User,
  X,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { translations } from '../../i18n/translations';
import {
  DemoEmployee,
  DemoTask,
  MatterCategory,
  MatterChecklistStep,
  MatterDocument,
  SodicProjectKey,
  TaskPriority,
} from '../demoTypes';

interface CreateTaskScreenProps {
  employees: DemoEmployee[];
  presetCategory?: MatterCategory | null;
  onCreateTask: (task: DemoTask) => void;
  onShowToast: (msg: string) => void;
}

interface CategoryDef {
  id: MatterCategory;
  prefix: string;
  unitCode: string;
  defaultTitle: { ar: string; en: string };
  defaultCompound: { ar: string; en: string };
  defaultDesc: { ar: string; en: string };
  icon: React.FC<{ className?: string }>;
}

const CATEGORIES: CategoryDef[] = [
  {
    id: 'reservation',
    prefix: 'ET',
    unitCode: 'ET-B14-302',
    defaultTitle: {
      ar: 'تأكيد حجز وحدة سكنية في إيست تاون',
      en: 'Confirm Residential Unit Reservation – East Town',
    },
    defaultCompound: {
      ar: 'إيست تاون · القاهرة الجديدة',
      en: 'East Town · New Cairo',
    },
    defaultDesc: {
      ar: 'استلام استمارة الحجز ومطابقة بيانات العميل وتأكيد تحصيل مقدم الحجز وإصدار إيصال التخصيص.',
      en: 'Collect booking form, verify client ID records, confirm deposit payment, and issue allocation receipt.',
    },
    icon: Home,
  },
  {
    id: 'handover',
    prefix: 'VL',
    unitCode: 'VL-V28-NC',
    defaultTitle: {
      ar: 'تسليم فيلا في فيليت',
      en: 'Villa Handover – Villette',
    },
    defaultCompound: {
      ar: 'فيليت · القاهرة الجديدة',
      en: 'Villette · New Cairo',
    },
    defaultDesc: {
      ar: 'إنهاء إجراءات تسليم الفيلا للعميل شاملة مراجعة المستندات ومعاينة الوحدة وتوقيع محضر الاستلام.',
      en: 'Complete villa handover procedures including document review, unit walk-through, and signing the handover report.',
    },
    icon: KeyRound,
  },
  {
    id: 'inspection',
    prefix: 'SW',
    unitCode: 'SW-PH4-19',
    defaultTitle: {
      ar: 'معاينة موقع - سوديك ويست',
      en: 'Site Inspection – SODIC West',
    },
    defaultCompound: {
      ar: 'سوديك ويست · الشيخ زايد',
      en: 'SODIC West · Sheikh Zayed',
    },
    defaultDesc: {
      ar: 'جولة فحص ومطابقة التشطيبات والمرافق في الموقع قبل اعتماد موعد التسليم النهائي للعميل.',
      en: 'Field inspection of finishing and utilities readiness prior to scheduling final client key handover.',
    },
    icon: MapPin,
  },
  {
    id: 'contracts',
    prefix: 'CT',
    unitCode: 'ET-A09-104',
    defaultTitle: {
      ar: 'مراجعة عقد حجز وحدة في إيست تاون',
      en: 'Unit Reservation Contract Review – East Town',
    },
    defaultCompound: {
      ar: 'إيست تاون · القاهرة الجديدة',
      en: 'East Town · New Cairo',
    },
    defaultDesc: {
      ar: 'مراجعة بنود عقد الحجز وجدول الأقساط وتجهيز النسخة النهائية للتوقيع والأرشفة.',
      en: 'Review reservation terms and payment plan and prepare the final contract copy for signature and archiving.',
    },
    icon: FileSignature,
  },
  {
    id: 'customer-care',
    prefix: 'CS',
    unitCode: 'VL-S12-201',
    defaultTitle: {
      ar: 'متابعة عميل - عقد تمليك',
      en: 'Customer Follow-up – Ownership Contract',
    },
    defaultCompound: {
      ar: 'فيليت · القاهرة الجديدة',
      en: 'Villette · New Cairo',
    },
    defaultDesc: {
      ar: 'التنسيق مع العميل لاستكمال توقيعات ملحق التمليك وتحديث بيانات ملف خدمة العملاء.',
      en: 'Coordinate with the client to finalize ownership addendum signatures and update customer care records.',
    },
    icon: Headset,
  },
];

export const CreateTaskScreen: React.FC<CreateTaskScreenProps> = ({
  employees,
  presetCategory = null,
  onCreateTask,
  onShowToast,
}) => {
  const { lang, isRtl, t, pick } = useLanguage();
  const c = t.demoUi.createTask;
  const defaultsAr = translations.ar.demoUi.createTask.defaults;
  const defaultsEn = translations.en.demoUi.createTask.defaults;

  const initialCat =
    (presetCategory && CATEGORIES.find((item) => item.id === presetCategory)) ||
    CATEGORIES[1];

  const [category, setCategory] = useState<MatterCategory>(initialCat.id);
  const [title, setTitle] = useState(initialCat.defaultTitle[lang]);
  const [matterRef, setMatterRef] = useState(`${initialCat.prefix}/1185/26`);
  const [unitCode, setUnitCode] = useState(initialCat.unitCode);
  const [description, setDescription] = useState(initialCat.defaultDesc[lang]);
  const [clientName, setClientName] = useState(c.defaults.clientName);
  const [compoundName, setCompoundName] = useState(initialCat.defaultCompound[lang]);
  const [priority, setPriority] = useState<TaskPriority>('high');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  const [assigneeId, setAssigneeId] = useState<string>(employees[0].id);
  const [teamMemberIds, setTeamMemberIds] = useState<string[]>([
    employees[0].id,
    employees[3].id,
    employees[2].id,
  ]);
  const [addMemberOpen, setAddMemberOpen] = useState(false);

  const [createdDate, setCreatedDate] = useState(c.defaults.createdDate);
  const [deadlinePreset, setDeadlinePreset] = useState(c.defaults.deadlinePreset);
  const [customDeadline, setCustomDeadline] = useState('');

  const [steps, setSteps] = useState<MatterChecklistStep[]>(() =>
    defaultsAr.defaultSteps.map((label, idx) => ({
      id: `cs-${idx + 1}`,
      label,
      labelEn: defaultsEn.defaultSteps[idx],
      done: idx < 2,
    }))
  );
  const [newStepText, setNewStepText] = useState('');

  const [documents, setDocuments] = useState<MatterDocument[]>([
    {
      id: 'cd-1',
      name: defaultsAr.docNames[0],
      nameEn: defaultsEn.docNames[0],
      type: 'PDF',
      size: '1.1 MB',
      statusLabel: defaultsAr.docStatusUploaded,
      statusLabelEn: defaultsEn.docStatusUploaded,
    },
    {
      id: 'cd-2',
      name: defaultsAr.docNames[1],
      nameEn: defaultsEn.docNames[1],
      type: 'PDF',
      size: '0.5 MB',
      statusLabel: defaultsAr.docStatusVerified,
      statusLabelEn: defaultsEn.docStatusVerified,
    },
    {
      id: 'cd-3',
      name: defaultsAr.docNames[2],
      nameEn: defaultsEn.docNames[2],
      type: 'DOC',
      size: '450 KB',
      statusLabel: defaultsAr.docStatusReady,
      statusLabelEn: defaultsEn.docStatusReady,
    },
  ]);

  const [sendClientUpdate, setSendClientUpdate] = useState(true);
  const [alert24h, setAlert24h] = useState(true);

  const [errors, setErrors] = useState<{
    title?: string;
    clientName?: string;
    assigneeId?: string;
    deadline?: string;
  }>({});

  const prevLangRef = useRef(lang);
  const photoInputRef = useRef<HTMLInputElement | null>(null);
  const docInputRef = useRef<HTMLInputElement | null>(null);

  const selectedLead = employees.find((e) => e.id === assigneeId) || employees[0];
  const SubmitArrow = isRtl ? ArrowLeft : ArrowRight;

  // Keep untouched default field values synchronized when switching language
  useEffect(() => {
    const prevLang = prevLangRef.current;
    if (prevLang === lang) return;
    prevLangRef.current = lang;

    const prevDefaults = translations[prevLang].demoUi.createTask.defaults;
    const nextDefaults = translations[lang].demoUi.createTask.defaults;
    const activeCat = CATEGORIES.find((item) => item.id === category);

    if (activeCat) {
      setTitle((curr) =>
        curr === activeCat.defaultTitle[prevLang] ? activeCat.defaultTitle[lang] : curr
      );
      setCompoundName((curr) =>
        curr === activeCat.defaultCompound[prevLang]
          ? activeCat.defaultCompound[lang]
          : curr
      );
      setDescription((curr) =>
        curr === activeCat.defaultDesc[prevLang] ? activeCat.defaultDesc[lang] : curr
      );
    }

    setClientName((curr) =>
      curr === prevDefaults.clientName ? nextDefaults.clientName : curr
    );
    setCreatedDate((curr) =>
      curr === prevDefaults.createdDate ? nextDefaults.createdDate : curr
    );
    setDeadlinePreset((curr) => {
      if (curr === 'custom') return curr;
      const idx = prevDefaults.deadlinePresets.indexOf(curr);
      if (idx !== -1 && nextDefaults.deadlinePresets[idx]) {
        return nextDefaults.deadlinePresets[idx];
      }
      return nextDefaults.deadlinePreset;
    });
    setErrors({});
  }, [lang, category]);

  const applyCategoryDefaults = (cat: CategoryDef) => {
    setCategory(cat.id);
    const num = Math.floor(1000 + Math.random() * 8999);
    setMatterRef(`${cat.prefix}/${num}/26`);
    setUnitCode(cat.unitCode);
    setTitle(cat.defaultTitle[lang]);
    setCompoundName(cat.defaultCompound[lang]);
    setDescription(cat.defaultDesc[lang]);
  };

  useEffect(() => {
    if (!presetCategory) return;
    const match = CATEGORIES.find((item) => item.id === presetCategory);
    if (match) {
      applyCategoryDefaults(match);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presetCategory]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setUploadedPhotos((prev) => [...prev, url]);
    onShowToast(t.demoUi.toasts.photoAttached);
    e.target.value = '';
  };

  const handleDocUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const isPdf = file.name.toLowerCase().endsWith('.pdf');
    const sizeLabel =
      file.size >= 1024 * 1024
        ? `${(file.size / (1024 * 1024)).toFixed(1)} MB`
        : `${Math.max(18, Math.round(file.size / 1024))} KB`;

    setDocuments((prev) => [
      ...prev,
      {
        id: `cd-${Date.now()}`,
        name: file.name,
        nameEn: file.name,
        type: isPdf ? 'PDF' : 'DOC',
        size: sizeLabel,
        statusLabel: defaultsAr.docStatusUploaded,
        statusLabelEn: defaultsEn.docStatusUploaded,
        url: URL.createObjectURL(file),
      },
    ]);
    onShowToast(t.demoUi.toasts.docUploaded(file.name));
    e.target.value = '';
  };

  const handleToggleStep = (id: string) => {
    setSteps((prev) =>
      prev.map((s) => (s.id === id ? { ...s, done: !s.done } : s))
    );
  };

  const handleMoveStep = (index: number, delta: -1 | 1) => {
    const targetIdx = index + delta;
    if (targetIdx < 0 || targetIdx >= steps.length) return;
    setSteps((prev) => {
      const next = [...prev];
      const [moved] = next.splice(index, 1);
      next.splice(targetIdx, 0, moved);
      return next;
    });
  };

  const handleAddStep = () => {
    const trimmed = newStepText.trim();
    if (!trimmed) return;
    setSteps((prev) => [
      ...prev,
      { id: `cs-${Date.now()}`, label: trimmed, labelEn: trimmed, done: false },
    ]);
    setNewStepText('');
  };

  const handleToggleTeamMember = (empId: string) => {
    setTeamMemberIds((prev) =>
      prev.includes(empId)
        ? prev.length > 1
          ? prev.filter((id) => id !== empId)
          : prev
        : [...prev, empId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalDeadline =
      deadlinePreset === 'custom' ? customDeadline.trim() : deadlinePreset;

    const nextErrors: typeof errors = {};
    if (!title.trim()) nextErrors.title = c.errors.title;
    if (!clientName.trim()) nextErrors.clientName = c.errors.clientName;
    if (!assigneeId) nextErrors.assigneeId = c.errors.assigneeId;
    if (!finalDeadline) nextErrors.deadline = c.errors.deadline;

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    const doneCount = steps.filter((s) => s.done).length;
    const progress =
      steps.length > 0 ? Math.round((doneCount / steps.length) * 100) : 0;

    const activeCat = CATEGORIES.find((item) => item.id === category) || CATEGORIES[1];
    const resolvedCompound = compoundName.trim() || activeCat.defaultCompound[lang];
    const inferredProjectKey: SodicProjectKey =
      resolvedCompound.includes('إيست تاون') ||
      resolvedCompound.toLowerCase().includes('east town')
        ? 'east-town'
        : resolvedCompound.includes('سوديك ويست') ||
          resolvedCompound.toLowerCase().includes('sodic west')
        ? 'sodic-west'
        : 'villette';

    const defaultCompoundPair =
      inferredProjectKey === 'east-town'
        ? { ar: 'إيست تاون · القاهرة الجديدة', en: 'East Town · New Cairo' }
        : inferredProjectKey === 'sodic-west'
        ? { ar: 'سوديك ويست · الشيخ زايد', en: 'SODIC West · Sheikh Zayed' }
        : { ar: 'فيليت · القاهرة الجديدة', en: 'Villette · New Cairo' };

    const trimmedTitle = title.trim();
    const isDefaultTitle =
      trimmedTitle === activeCat.defaultTitle.ar ||
      trimmedTitle === activeCat.defaultTitle.en;
    const titleAr = isDefaultTitle ? activeCat.defaultTitle.ar : trimmedTitle;
    const titleEn = isDefaultTitle ? activeCat.defaultTitle.en : trimmedTitle;

    const trimmedDesc = description.trim();
    const isDefaultDesc =
      trimmedDesc === activeCat.defaultDesc.ar ||
      trimmedDesc === activeCat.defaultDesc.en ||
      !trimmedDesc;
    const descAr = isDefaultDesc ? activeCat.defaultDesc.ar : trimmedDesc;
    const descEn = isDefaultDesc ? activeCat.defaultDesc.en : trimmedDesc;

    const trimmedClient = clientName.trim();
    const isDefaultClient =
      trimmedClient === defaultsAr.clientName ||
      trimmedClient === defaultsEn.clientName;
    const clientAr = isDefaultClient ? defaultsAr.clientName : trimmedClient;
    const clientEn = isDefaultClient ? defaultsEn.clientName : trimmedClient;

    const isDefaultCompound =
      resolvedCompound === activeCat.defaultCompound.ar ||
      resolvedCompound === activeCat.defaultCompound.en;
    const compoundAr = isDefaultCompound ? defaultCompoundPair.ar : resolvedCompound;
    const compoundEn = isDefaultCompound ? defaultCompoundPair.en : resolvedCompound;

    const presetIdx = c.defaults.deadlinePresets.indexOf(finalDeadline);
    const deadlineAr =
      presetIdx !== -1 ? defaultsAr.deadlinePresets[presetIdx] : finalDeadline;
    const deadlineEn =
      presetIdx !== -1 ? defaultsEn.deadlinePresets[presetIdx] : finalDeadline;

    const createdAr =
      createdDate === c.defaults.createdDate ? defaultsAr.createdDate : createdDate;
    const createdEn =
      createdDate === c.defaults.createdDate ? defaultsEn.createdDate : createdDate;

    const statusPillAr =
      category === 'handover'
        ? 'قيد التسليم'
        : translations.ar.demoUi.categories[category];
    const statusPillEn =
      category === 'handover'
        ? 'Handover in progress'
        : translations.en.demoUi.categories[category];

    const normalizedSteps: MatterChecklistStep[] =
      steps.length > 0
        ? steps.map((step) => ({
            ...step,
            labelEn: step.labelEn || step.label,
          }))
        : [
            {
              id: `cs-${Date.now()}`,
              label: defaultsAr.fallbackStep,
              labelEn: defaultsEn.fallbackStep,
              done: false,
            },
          ];

    const newTask: DemoTask = {
      id: `task-${Date.now()}`,
      title: titleAr,
      titleEn,
      description: descAr,
      descriptionEn: descEn,
      category,
      projectKey: inferredProjectKey,
      matterRef,
      unitCode: unitCode.trim() || 'SODIC-2026',
      clientName: clientAr,
      clientNameEn: clientEn,
      compoundName: compoundAr,
      compoundNameEn: compoundEn,
      propertyMeta: {
        compoundName: compoundAr,
        compoundNameEn: compoundEn,
        unitType: defaultsAr.fallbackUnitType,
        unitTypeEn: defaultsEn.fallbackUnitType,
        priceEgp: defaultsAr.fallbackPriceEgp,
        priceEgpEn: defaultsEn.fallbackPriceEgp,
        statusPill: statusPillAr,
        statusPillEn,
      },
      installment: {
        label:
          category === 'reservation'
            ? defaultsAr.reservationInstallment
            : defaultsAr.dueInstallment,
        labelEn:
          category === 'reservation'
            ? defaultsEn.reservationInstallment
            : defaultsEn.dueInstallment,
        amountEgp:
          category === 'reservation'
            ? defaultsAr.reservationAmount
            : defaultsAr.dueAmount,
        amountEgpEn:
          category === 'reservation'
            ? defaultsEn.reservationAmount
            : defaultsEn.dueAmount,
        dueDate: deadlineAr,
        dueDateEn: deadlineEn,
        status: progress >= 100 ? 'paid' : 'due',
      },
      snags: [],
      assigneeId,
      teamMemberIds: Array.from(new Set([assigneeId, ...teamMemberIds])),
      assignedBy: 'أحمد حسن',
      assignedByEn: 'Ahmed Hassan',
      createdDate: createdAr,
      createdDateEn: createdEn,
      deadline: deadlineAr,
      deadlineEn,
      shortDeadline: deadlineAr.replace(/ 2026.*/, ''),
      shortDeadlineEn: deadlineEn.replace(/ 2026.*/, ''),
      priority,
      status:
        progress >= 100
          ? 'completed'
          : category === 'inspection'
          ? 'site-visit'
          : progress > 0
          ? 'in-progress'
          : 'pending',
      progress,
      image: uploadedPhotos[0],
      stepperStages: ['تم الحجز', 'تم التعاقد', 'معاينة الوحدة', 'التسليم'],
      stepperStagesEn: ['Reserved', 'Contracted', 'Inspected', 'Handed over'],
      checklistSteps: normalizedSteps,
      documents,
      uploadedPhotos,
      notes: [],
      sendClientUpdate,
      alert24h,
    };

    onCreateTask(newTask);
  };

  const doneCount = steps.filter((s) => s.done).length;

  return (
    <form
      onSubmit={handleSubmit}
      className="px-4 py-4 space-y-3.5 bg-[#f8fafc] min-h-full text-start"
    >
      {/* SODIC Banner */}
      <div className="rounded-2xl bg-white px-3.5 py-2.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center gap-2.5">
        <span className="size-8 rounded-xl bg-[#0d9488] text-white flex items-center justify-center shrink-0">
          <Building2 className="size-4" />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="text-[12px] font-extrabold text-slate-900 truncate">
              {t.demoUi.firm.firmName}
            </span>
            <span className="rounded bg-[#e3f5f1] px-1.5 py-0.5 text-[9px] font-bold text-[#0b7a6c] shrink-0">
              {t.demoUi.firm.regionBadge}
            </span>
          </div>
          <p className="text-[10px] font-semibold text-[#0d9488] truncate">
            {t.demoUi.firm.subtitle}
          </p>
        </div>
      </div>

      {/* Category Pills */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-[10.5px] font-bold text-slate-600">
            {c.categoryTitle} <span className="text-[#b42318]">{c.requiredMark}</span>
          </span>
          <span className="text-[10px] font-semibold text-slate-400">
            {c.chooseTrack}
          </span>
        </div>

        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon;
            const active = category === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => applyCategoryDefaults(cat)}
                className={`min-h-[36px] px-3 py-1 rounded-full text-[11px] font-bold whitespace-nowrap shrink-0 inline-flex items-center gap-1.5 transition cursor-pointer ${
                  active
                    ? 'bg-[#0d9488] text-white shadow-sm'
                    : 'bg-white text-slate-700 border border-slate-200 hover:bg-slate-50'
                }`}
              >
                <Icon className="size-3" />
                <span>{t.demoUi.categories[cat.id]}</span>
                {active && <Check className="size-3 stroke-[3]" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Title, Ref, Unit Code, Description */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-3">
        <div>
          <label
            htmlFor="sodic-task-title"
            className="block text-[10.5px] font-bold text-slate-500 mb-1"
          >
            {c.titleLabel} <span className="text-[#b42318]">{c.requiredMark}</span>
          </label>
          <input
            id="sodic-task-title"
            type="text"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              if (errors.title) setErrors((prev) => ({ ...prev, title: undefined }));
            }}
            placeholder={c.titlePlaceholder}
            className={`w-full min-h-[42px] rounded-xl border px-3 text-[12.5px] font-bold text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none focus:ring-2 ${
              errors.title
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-200 focus:border-teal-500 focus:ring-teal-500/20'
            }`}
          />
          {errors.title && (
            <p role="alert" className="mt-1 text-[10.5px] font-medium text-[#b42318]">
              {errors.title}
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <span className="block text-[10.5px] font-bold text-slate-500 mb-1">
              {c.refLabel}
            </span>
            <div
              dir="ltr"
              className="min-h-[40px] rounded-xl border border-slate-200 bg-slate-100/80 px-2.5 flex items-center justify-between gap-1 text-[12px] font-bold text-slate-800 tabular-nums"
            >
              <span>{matterRef}</span>
              <Lock className="size-3 text-slate-400 shrink-0" />
            </div>
          </div>

          <div>
            <label
              htmlFor="sodic-unit-code"
              className="block text-[10.5px] font-bold text-slate-500 mb-1"
            >
              {c.unitCodeLabel}
            </label>
            <input
              id="sodic-unit-code"
              type="text"
              dir="ltr"
              value={unitCode}
              onChange={(e) => setUnitCode(e.target.value)}
              className="w-full min-h-[40px] rounded-xl border border-slate-200 bg-slate-50/70 px-2.5 text-[12px] font-bold text-slate-800 tabular-nums focus:bg-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="sodic-task-desc"
            className="block text-[10.5px] font-bold text-slate-500 mb-1"
          >
            {c.descLabel}
          </label>
          <textarea
            id="sodic-task-desc"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50/70 px-3 py-2 text-[11.5px] font-normal text-slate-700 leading-[1.6] focus:bg-white focus:outline-none focus:border-teal-500"
          />
        </div>
      </div>

      {/* Client & Compound */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-3">
        <p className="text-[11px] font-extrabold text-slate-800">
          {c.clientSectionTitle}
        </p>

        <div>
          <label
            htmlFor="sodic-client-name"
            className="block text-[10.5px] font-bold text-slate-500 mb-1"
          >
            {c.clientNameLabel} <span className="text-[#b42318]">{c.requiredMark}</span>
          </label>
          <div className="relative">
            <User className="size-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="sodic-client-name"
              type="text"
              value={clientName}
              onChange={(e) => {
                setClientName(e.target.value);
                if (errors.clientName) {
                  setErrors((prev) => ({ ...prev, clientName: undefined }));
                }
              }}
              placeholder={c.clientNamePlaceholder}
              className={`w-full min-h-[40px] rounded-xl border ps-8 pe-3 text-[12px] font-bold text-slate-900 bg-slate-50/70 focus:bg-white focus:outline-none ${
                errors.clientName
                  ? 'border-rose-400'
                  : 'border-slate-200 focus:border-teal-500'
              }`}
            />
          </div>
          {errors.clientName && (
            <p role="alert" className="mt-1 text-[10.5px] font-medium text-[#b42318]">
              {errors.clientName}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="sodic-compound-name"
            className="block text-[10.5px] font-bold text-slate-500 mb-1"
          >
            {c.compoundLabel}
          </label>
          <div className="relative">
            <MapPin className="size-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="sodic-compound-name"
              type="text"
              value={compoundName}
              onChange={(e) => setCompoundName(e.target.value)}
              className="w-full min-h-[40px] rounded-xl border border-slate-200 ps-8 pe-3 text-[12px] font-semibold text-slate-800 bg-slate-50/70 focus:bg-white focus:outline-none focus:border-teal-500"
            />
          </div>
        </div>

        <div>
          <span className="block text-[10.5px] font-bold text-slate-500 mb-1.5">
            {c.priorityLabel}
          </span>
          <div className="grid grid-cols-3 gap-1.5 rounded-xl bg-slate-100 p-1">
            {(
              [
                { id: 'low', label: t.demoUi.common.lowPriority },
                { id: 'medium', label: t.demoUi.common.mediumPriority },
                { id: 'high', label: t.demoUi.common.urgent },
              ] as { id: TaskPriority; label: string }[]
            ).map((opt) => {
              const active = priority === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => setPriority(opt.id)}
                  className={`min-h-[36px] rounded-lg text-[11px] font-bold transition cursor-pointer ${
                    active
                      ? opt.id === 'high'
                        ? 'bg-[#fde8e8] text-[#b42318] shadow-sm'
                        : 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {opt.id === 'high' && active ? '⚑ ' : ''}
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Upload Photos Dropzone */}
        <div>
          <input
            ref={photoInputRef}
            type="file"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
            aria-label={c.uploadPhotosLabel}
          />

          {uploadedPhotos.length > 0 && (
            <div className="grid grid-cols-3 gap-2 mb-2">
              {uploadedPhotos.map((src, idx) => (
                <div
                  key={`${src}-${idx}`}
                  className="relative aspect-square rounded-xl overflow-hidden border border-slate-200"
                >
                  <img
                    src={src}
                    alt={c.uploadedPhotoAlt(idx + 1)}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setUploadedPhotos((prev) => prev.filter((p) => p !== src))
                    }
                    aria-label={c.removePhotoLabel}
                    className="absolute top-1 end-1 size-5 rounded-full bg-black/65 text-white flex items-center justify-center cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <button
            type="button"
            onClick={() => photoInputRef.current?.click()}
            className="w-full min-h-[70px] rounded-xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-300 flex flex-col items-center justify-center gap-1 py-2.5 px-3 transition cursor-pointer"
          >
            <ImagePlus className="size-4.5 text-slate-400" />
            <span className="text-[11px] font-bold text-slate-700">
              {c.uploadPhotosTitle}
            </span>
            <span className="text-[9.5px] text-slate-400">{c.uploadPhotosHint}</span>
          </button>
        </div>
      </div>

      {/* Responsible Member & Dates */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-3">
        <p className="text-[11px] font-extrabold text-slate-800">
          {c.scheduleSectionTitle}
        </p>

        <div>
          <label
            htmlFor="sodic-lead-assignee"
            className="block text-[10.5px] font-bold text-slate-500 mb-1"
          >
            {c.assigneeLabel}
          </label>
          <div className="relative rounded-xl border border-slate-200 bg-slate-50/70 p-2 flex items-center gap-2.5">
            <img
              src={selectedLead.avatar}
              alt={pick(selectedLead.name, selectedLead.nameEn)}
              className="size-8 rounded-full object-cover shrink-0"
            />
            <select
              id="sodic-lead-assignee"
              value={assigneeId}
              onChange={(e) => {
                const nextId = e.target.value;
                setAssigneeId(nextId);
                if (!teamMemberIds.includes(nextId)) {
                  setTeamMemberIds((prev) => [nextId, ...prev]);
                }
                if (errors.assigneeId) {
                  setErrors((prev) => ({ ...prev, assigneeId: undefined }));
                }
              }}
              className="w-full appearance-none bg-transparent pe-6 text-[12px] font-bold text-slate-900 focus:outline-none cursor-pointer"
            >
              {employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {pick(emp.name, emp.nameEn)} · {pick(emp.role, emp.roleEn)}
                </option>
              ))}
            </select>
            <ChevronDown className="size-4 text-slate-400 absolute end-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          </div>
          {errors.assigneeId && (
            <p role="alert" className="mt-1 text-[10.5px] font-medium text-[#b42318]">
              {errors.assigneeId}
            </p>
          )}
        </div>

        {/* Team Members + Add Member */}
        <div>
          <span className="block text-[10.5px] font-bold text-slate-500 mb-1.5">
            {c.teamMembersLabel}
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <div className={`flex -space-x-1.5 ${isRtl ? 'space-x-reverse' : ''}`}>
              {teamMemberIds.map((id) => {
                const member = employees.find((e) => e.id === id);
                if (!member) return null;
                const memberName = pick(member.name, member.nameEn);
                return (
                  <img
                    key={member.id}
                    src={member.avatar}
                    alt={memberName}
                    title={memberName}
                    className="size-7 rounded-full object-cover ring-2 ring-white"
                  />
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => setAddMemberOpen((prev) => !prev)}
              className="min-h-[30px] rounded-full border border-dashed border-teal-400 bg-teal-50/50 px-2.5 py-1 text-[10.5px] font-bold text-[#0b7a6c] inline-flex items-center gap-1 hover:bg-teal-50 cursor-pointer"
            >
              <Plus className="size-3" />
              <span>{c.addMemberBtn}</span>
            </button>
          </div>

          {addMemberOpen && (
            <div className="mt-2 rounded-xl border border-slate-200 bg-slate-50 p-2 grid grid-cols-2 gap-1.5">
              {employees.map((emp) => {
                const active = teamMemberIds.includes(emp.id);
                const empName = pick(emp.name, emp.nameEn);
                return (
                  <button
                    key={emp.id}
                    type="button"
                    onClick={() => handleToggleTeamMember(emp.id)}
                    className={`min-h-[34px] rounded-lg px-2 py-1 flex items-center gap-1.5 text-[10.5px] font-semibold border transition cursor-pointer ${
                      active
                        ? 'bg-[#e3f5f1] border-[#0d9488] text-[#0b7a6c]'
                        : 'bg-white border-slate-200 text-slate-600'
                    }`}
                  >
                    <img
                      src={emp.avatar}
                      alt={empName}
                      className="size-4 rounded-full object-cover shrink-0"
                    />
                    <span className="truncate">{empName}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Created Date & Deadline */}
        <div className="grid grid-cols-2 gap-2.5">
          <div>
            <label
              htmlFor="sodic-created-date"
              className="block text-[10px] font-bold text-slate-500 mb-1"
            >
              {c.createdDateLabel}
            </label>
            <div className="relative">
              <input
                id="sodic-created-date"
                type="text"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
                className="w-full min-h-[38px] rounded-xl border border-slate-200 bg-slate-50 px-2.5 pe-7 text-[10.5px] font-semibold text-slate-800 tabular-nums focus:bg-white focus:outline-none focus:border-teal-500"
              />
              <Calendar className="size-3.5 text-slate-400 absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>

          <div>
            <span className="block text-[10px] font-bold text-slate-500 mb-1">
              {c.deadlineLabel} <span className="text-[#b42318]">{c.requiredMark}</span>
            </span>
            <div className="relative">
              <select
                value={deadlinePreset}
                onChange={(e) => {
                  setDeadlinePreset(e.target.value);
                  if (errors.deadline) {
                    setErrors((prev) => ({ ...prev, deadline: undefined }));
                  }
                }}
                aria-label={c.deadlineLabel}
                className="w-full min-h-[38px] appearance-none rounded-xl border border-rose-200 bg-[#fff5f5] px-2.5 pe-7 text-[10.5px] font-semibold text-[#b42318] tabular-nums focus:outline-none focus:border-rose-400 cursor-pointer"
              >
                {c.defaults.deadlinePresets.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
                <option value="custom">{c.customDateOption}</option>
              </select>
              <Clock className="size-3.5 text-[#b42318] absolute end-2 top-1/2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>

        {deadlinePreset === 'custom' && (
          <input
            type="text"
            value={customDeadline}
            onChange={(e) => {
              setCustomDeadline(e.target.value);
              if (errors.deadline) {
                setErrors((prev) => ({ ...prev, deadline: undefined }));
              }
            }}
            placeholder={c.customDatePlaceholder}
            className="w-full min-h-[38px] rounded-xl border border-slate-200 px-3 text-[11px] font-semibold text-slate-800 focus:outline-none focus:border-teal-500"
          />
        )}
        {errors.deadline && (
          <p role="alert" className="text-[10.5px] font-medium text-[#b42318]">
            {errors.deadline}
          </p>
        )}
      </div>

      {/* Checklist Steps */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <h5 className="text-[11px] font-extrabold text-slate-800">
            {c.stepsSectionTitle}
          </h5>
          <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 tabular-nums">
            {t.demoUi.common.stepsCompletedOf(doneCount, steps.length)}
          </span>
        </div>

        <ul className="space-y-1.5">
          {steps.map((step, idx) => {
            const stepLabel = pick(step.label, step.labelEn);
            return (
              <li
                key={step.id}
                className="flex items-center gap-2 rounded-xl bg-slate-50 px-2.5 py-2 border border-slate-100"
              >
                <button
                  type="button"
                  role="checkbox"
                  aria-checked={step.done}
                  onClick={() => handleToggleStep(step.id)}
                  className={`size-4.5 rounded flex items-center justify-center border shrink-0 cursor-pointer transition ${
                    step.done
                      ? 'bg-[#0d9488] border-[#0d9488] text-white'
                      : 'bg-white border-slate-300 text-transparent'
                  }`}
                >
                  <Check className="size-3 stroke-[3]" />
                </button>

                <span className="flex-1 text-[11px] font-medium text-slate-800 leading-snug">
                  {stepLabel}
                </span>

                <div className="flex items-center gap-0.5 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, -1)}
                    disabled={idx === 0}
                    aria-label={c.moveUpLabel(stepLabel)}
                    className="size-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowUp className="size-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleMoveStep(idx, 1)}
                    disabled={idx === steps.length - 1}
                    aria-label={c.moveDownLabel(stepLabel)}
                    className="size-6 rounded flex items-center justify-center text-slate-400 hover:text-slate-700 disabled:opacity-30 cursor-pointer"
                  >
                    <ArrowDown className="size-3" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setSteps((prev) => prev.filter((s) => s.id !== step.id))}
                    aria-label={c.removeStepLabel(stepLabel)}
                    className="size-6 rounded flex items-center justify-center text-slate-400 hover:text-[#b42318] cursor-pointer"
                  >
                    <X className="size-3" />
                  </button>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5 pt-1">
          <input
            type="text"
            value={newStepText}
            onChange={(e) => setNewStepText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddStep();
              }
            }}
            placeholder={c.addStepPlaceholder}
            className="flex-1 min-h-[38px] rounded-xl border border-slate-200 px-2.5 text-[11px] text-slate-800 focus:outline-none focus:border-teal-500"
          />
          <button
            type="button"
            onClick={handleAddStep}
            className="min-h-[38px] px-3 rounded-xl border border-dashed border-teal-400 bg-teal-50/60 text-[#0b7a6c] text-[11px] font-bold flex items-center gap-1 hover:bg-teal-50 cursor-pointer shrink-0"
          >
            <Plus className="size-3.5" />
            <span>{t.demoUi.common.add}</span>
          </button>
        </div>
      </div>

      {/* Documents */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between gap-2">
          <h5 className="text-[11px] font-extrabold text-slate-800 tabular-nums">
            {c.docsSectionTitle(documents.length)}
          </h5>
          <span className="text-[10px] text-slate-400">{c.maxFileSize}</span>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {documents.map((doc) => {
            const docName = pick(doc.name, doc.nameEn);
            const docStatus = pick(doc.statusLabel, doc.statusLabelEn);
            return (
              <div
                key={doc.id}
                className="rounded-xl border border-slate-100 bg-slate-50 p-2 flex items-center gap-2 min-w-0"
              >
                <span
                  className={`px-1.5 py-0.5 rounded text-[8.5px] font-extrabold shrink-0 ${
                    doc.type === 'PDF'
                      ? 'bg-[#fde8e8] text-[#b42318]'
                      : 'bg-[#e3f5f1] text-[#0b7a6c]'
                  }`}
                >
                  {doc.type}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[10.5px] font-bold text-slate-900 truncate">
                    {docName}
                  </p>
                  <p className="text-[9px] text-slate-400 truncate tabular-nums">
                    {doc.size} · {docStatus}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    setDocuments((prev) => prev.filter((d) => d.id !== doc.id))
                  }
                  aria-label={`${t.demoUi.common.delete} ${docName}`}
                  className="size-6 rounded flex items-center justify-center text-slate-400 hover:text-[#b42318] cursor-pointer shrink-0"
                >
                  <Trash2 className="size-3" />
                </button>
              </div>
            );
          })}
        </div>

        <input
          ref={docInputRef}
          type="file"
          accept=".pdf,.doc,.docx,image/*"
          onChange={handleDocUpload}
          className="hidden"
          aria-label={c.uploadDocAriaLabel}
        />
        <button
          type="button"
          onClick={() => docInputRef.current?.click()}
          className="w-full min-h-[68px] rounded-xl border border-dashed border-slate-200 bg-slate-50/50 hover:bg-slate-50 hover:border-teal-300 flex flex-col items-center justify-center gap-1 py-2.5 px-3 transition cursor-pointer"
        >
          <UploadCloud className="size-4.5 text-slate-400" />
          <span className="text-[11px] font-bold text-slate-700">
            {c.uploadDocTitle}
          </span>
          <span className="text-[9.5px] text-slate-400">{c.uploadDocHint}</span>
        </button>
      </div>

      {/* Automated Reminders */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-3">
        <p className="text-[11px] font-extrabold text-slate-800">
          {c.alertsSectionTitle}
        </p>

        <div className="flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="text-[11.5px] font-bold text-slate-900">
              {c.clientUpdateTitle}
            </p>
            <p className="text-[10px] text-slate-400 truncate">
              {c.clientUpdateSubtitle(clientName || t.demoUi.common.client)}
            </p>
          </div>
          <button
            type="button"
            dir="ltr"
            role="switch"
            aria-checked={sendClientUpdate}
            aria-label={c.clientUpdateSwitchLabel}
            onClick={() => setSendClientUpdate((prev) => !prev)}
            className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer shrink-0 ${
              sendClientUpdate ? 'bg-[#0d9488]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-0.5 start-0.5 size-4.5 rounded-full bg-white shadow-sm transition-transform ${
                sendClientUpdate ? 'translate-x-4.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between gap-2 pt-2 border-t border-slate-100">
          <div className="min-w-0">
            <p className="text-[11.5px] font-bold text-slate-900 flex items-center gap-1">
              <Bell className="size-3 text-[#0d9488]" />
              <span>{c.alert24hTitle}</span>
            </p>
            <p className="text-[10px] text-slate-400 truncate">{c.alert24hSubtitle}</p>
          </div>
          <button
            type="button"
            dir="ltr"
            role="switch"
            aria-checked={alert24h}
            aria-label={c.alert24hSwitchLabel}
            onClick={() => setAlert24h((prev) => !prev)}
            className={`relative w-10 h-5.5 rounded-full transition-colors cursor-pointer shrink-0 ${
              alert24h ? 'bg-[#0d9488]' : 'bg-slate-300'
            }`}
          >
            <span
              className={`absolute top-0.5 start-0.5 size-4.5 rounded-full bg-white shadow-sm transition-transform ${
                alert24h ? 'translate-x-4.5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>

      {/* Assign Task CTA */}
      <button
        type="submit"
        className="w-full min-h-[48px] rounded-2xl bg-[#0d9488] text-white text-[13px] font-bold shadow-md shadow-teal-600/25 flex items-center justify-center gap-2 hover:bg-[#0b7f75] active:scale-[0.99] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        <span>{c.submitBtn}</span>
        <SubmitArrow className="size-4" />
      </button>
    </form>
  );
};
