import React, { useState } from 'react';
import {
  AlertTriangle,
  Banknote,
  Bell,
  Check,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  ShieldCheck,
  Wrench,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { INITIAL_DEMO_TASKS, PERFORMANCE_PERIOD_BASELINES } from '../demoData';
import { DemoEmployee, DemoTask, PerformancePeriod } from '../demoTypes';

interface PerformanceScreenProps {
  tasks: DemoTask[];
  employees: DemoEmployee[];
  remindedMember: boolean;
  onRemindEmployee: (employeeId: string) => void;
  onSelectTask: (taskId: string) => void;
  onViewAllTasks: () => void;
}

export const PerformanceScreen: React.FC<PerformanceScreenProps> = ({
  tasks,
  employees,
  remindedMember,
  onRemindEmployee,
  onSelectTask,
  onViewAllTasks,
}) => {
  const { isRtl, t, pick } = useLanguage();
  const p = t.demoUi.performance;
  const common = t.demoUi.common;
  const ItemChevron = isRtl ? ChevronLeft : ChevronRight;

  const [period, setPeriod] = useState<PerformancePeriod>('week');

  const initialCompletedCount = INITIAL_DEMO_TASKS.filter(
    (item) => item.status === 'completed'
  ).length;
  const currentCompletedCount = tasks.filter(
    (item) => item.status === 'completed'
  ).length;

  const extraTasksCount = Math.max(0, tasks.length - INITIAL_DEMO_TASKS.length);
  const deltaCompleted = currentCompletedCount - initialCompletedCount;

  const baseline = PERFORMANCE_PERIOD_BASELINES[period];
  const totalCount = baseline.baseTotal + extraTasksCount;
  const completedCount = Math.min(
    totalCount,
    Math.max(0, baseline.baseCompleted + deltaCompleted)
  );
  const pct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (pct / 100) * circumference;

  const overdueTask = tasks.find((item) => item.status === 'overdue');
  const overdueAssignee =
    (overdueTask && employees.find((e) => e.id === overdueTask.assigneeId)) ||
    employees[0];

  const tasksWithInstallments = tasks.filter((item) => Boolean(item.installment));
  const paidInstallmentsCount = tasksWithInstallments.filter(
    (item) => item.installment?.status === 'paid'
  ).length;
  const overdueInstallmentTask = tasksWithInstallments.find(
    (item) => item.installment?.status === 'overdue'
  );
  const collectionPct =
    tasksWithInstallments.length > 0
      ? Math.round((paidInstallmentsCount / tasksWithInstallments.length) * 100)
      : 100;

  const allSnags = tasks.flatMap((item) => item.snags || []);
  const resolvedSnagsCount = allSnags.filter((s) => s.resolved).length;
  const snagPct =
    allSnags.length > 0 ? Math.round((resolvedSnagsCount / allSnags.length) * 100) : 100;

  const getEmployeeName = (id: string) => {
    const emp = employees.find((e) => e.id === id);
    return emp ? pick(emp.name, emp.nameEn) : common.defaultAssigneeLabel;
  };

  const activeMatters = tasks.filter((item) => item.status !== 'completed').slice(0, 4);

  const periodKeys: PerformancePeriod[] = ['today', 'week', 'month'];

  const teamOrder = ['emp-1', 'emp-4', 'emp-3', 'emp-2'];
  const orderedEmployees = teamOrder
    .map((id) => employees.find((e) => e.id === id))
    .filter((e): e is DemoEmployee => Boolean(e));

  return (
    <div className="px-4 py-4 space-y-4 bg-[#f8fafc] min-h-full text-start">
      {/* Period Segmented Control */}
      <div
        role="tablist"
        aria-label={p.periodAriaLabel}
        className="grid grid-cols-3 rounded-2xl bg-slate-200/70 p-1"
      >
        {periodKeys.map((key) => {
          const active = period === key;
          return (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={active}
              onClick={() => setPeriod(key)}
              className={`min-h-[38px] rounded-xl text-[11.5px] font-bold transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                active
                  ? 'bg-[#0d9488] text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {p.periods[key]}
            </button>
          );
        })}
      </div>

      {/* Progress Index Card */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.05)] border border-slate-100">
        <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#0d9488]">
          <ShieldCheck className="size-3.5" />
          <span>{p.progressIndexTitle}</span>
        </div>

        <div className="mt-2.5 flex items-center justify-between gap-3">
          <div>
            <p className="text-[28px] font-extrabold text-slate-900 tabular-nums leading-none">
              {pct}%
            </p>
            <p className="mt-1.5 text-[13px] font-bold text-slate-900 leading-tight">
              {p.projectCompletionTitle}
            </p>
            <p className="mt-1 text-[11px] font-medium text-slate-500 tabular-nums">
              {p.tasksOnSchedule(completedCount, totalCount)}
            </p>
          </div>

          <div className="relative size-16 shrink-0 flex items-center justify-center">
            <svg className="size-16 -rotate-90" viewBox="0 0 64 64" aria-hidden="true">
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="5"
              />
              <circle
                cx="32"
                cy="32"
                r={radius}
                fill="none"
                stroke="#0d9488"
                strokeWidth="5"
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeOffset}
                className="transition-all duration-300"
              />
            </svg>
            <span className="absolute text-[8.5px] font-bold text-slate-600 text-center leading-tight px-1">
              {pick(baseline.statusBadge, baseline.statusBadgeEn)}
            </span>
          </div>
        </div>
      </div>

      {/* Live Collections & Site Snag Readiness Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        <button
          type="button"
          onClick={() => {
            if (overdueInstallmentTask) {
              onSelectTask(overdueInstallmentTask.id);
            } else {
              onViewAllTasks();
            }
          }}
          className="rounded-2xl bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 text-start hover:border-teal-200 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
        >
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10.5px] font-bold text-slate-500">
              {p.collectionsTitle}
            </span>
            <Banknote className="size-3.5 text-[#0d9488] shrink-0" />
          </div>
          <p className="mt-1.5 text-[18px] font-extrabold text-slate-900 tabular-nums leading-none">
            {collectionPct}%
          </p>
          <p className="mt-1 text-[10px] font-semibold text-slate-500 tabular-nums">
            {p.installmentsPaidOf(paidInstallmentsCount, tasksWithInstallments.length)}
          </p>
          <p
            className={`mt-1.5 text-[9.5px] font-bold ${
              overdueInstallmentTask ? 'text-[#b42318]' : 'text-[#0b7a6c]'
            }`}
          >
            {overdueInstallmentTask
              ? p.overdueInstallmentAction
              : p.collectionsSteady}
          </p>
        </button>

        <div className="rounded-2xl bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 text-start">
          <div className="flex items-center justify-between gap-1">
            <span className="text-[10.5px] font-bold text-slate-500">
              {p.inspectionReadinessTitle}
            </span>
            <Wrench className="size-3.5 text-[#0d9488] shrink-0" />
          </div>
          <p className="mt-1.5 text-[18px] font-extrabold text-slate-900 tabular-nums leading-none">
            {snagPct}%
          </p>
          <p className="mt-1 text-[10px] font-semibold text-slate-500 tabular-nums">
            {p.snagsFixedOf(resolvedSnagsCount, allSnags.length)}
          </p>
          <div className="mt-2 h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
            <div
              className="h-full rounded-full bg-[#0d9488] transition-all duration-300"
              style={{ width: `${snagPct}%` }}
            />
          </div>
        </div>
      </div>

      {/* Needs Attention Card */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <span className="size-1.5 rounded-full bg-[#e11d48]" aria-hidden="true" />
          <h5 className="text-[13px] font-bold text-slate-900">
            {p.needsAttentionTitle}
          </h5>
        </div>

        {overdueTask ? (
          <div className="rounded-2xl bg-[#fff5f5] border border-rose-200 p-3.5 space-y-2.5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <p className="text-[13px] font-bold text-slate-900 leading-snug">
                  {pick(overdueTask.title, overdueTask.titleEn)}
                </p>
                <p className="text-[11px] font-medium text-[#b42318] mt-0.5">
                  {pick(overdueTask.compoundName, overdueTask.compoundNameEn)}
                </p>
              </div>
              <span className="rounded-full bg-[#fde8e8] text-[#b42318] px-2.5 py-0.5 text-[10px] font-semibold shrink-0">
                {common.overdue}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2 pt-1">
              <div className="flex items-center gap-2 min-w-0">
                <img
                  src={overdueAssignee.avatar}
                  alt={pick(overdueAssignee.name, overdueAssignee.nameEn)}
                  className="size-7 rounded-full object-cover shrink-0 ring-1 ring-rose-200"
                />
                <span className="text-[11.5px] font-bold text-slate-900 truncate">
                  {pick(overdueAssignee.name, overdueAssignee.nameEn)}
                </span>
              </div>

              <button
                type="button"
                disabled={remindedMember}
                onClick={() => onRemindEmployee(overdueAssignee.id)}
                className={`min-h-[36px] px-3 rounded-xl text-[11px] font-bold inline-flex items-center gap-1.5 border transition shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400 ${
                  remindedMember
                    ? 'bg-[#e3f5f1] text-[#0b7a6c] border-teal-200 cursor-default'
                    : 'bg-white text-[#b42318] border-rose-200 hover:bg-rose-50 active:scale-95 cursor-pointer'
                }`}
              >
                {remindedMember ? (
                  <>
                    <Check className="size-3.5" />
                    <span>{p.remindedBtn}</span>
                  </>
                ) : (
                  <>
                    <Bell className="size-3.5" />
                    <span>{p.sendReminderBtn}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-2xl bg-[#e3f5f1] border border-teal-200 p-3.5 text-xs font-semibold text-[#0b7a6c]">
            {p.noOverdueMessage}
          </div>
        )}
      </div>

      {/* Active Tasks Section */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-2">
            <h5 className="text-[13px] font-bold text-slate-900">
              {p.activeTasksTitle}
            </h5>
            <span className="rounded-full bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-600 tabular-nums">
              {p.tasksCountPill(activeMatters.length)}
            </span>
          </div>
          <button
            type="button"
            onClick={onViewAllTasks}
            className="min-h-[32px] px-1.5 text-[11px] font-bold text-[#0d9488] hover:underline cursor-pointer"
          >
            {p.viewAllBtn}
          </button>
        </div>

        <div className="rounded-2xl bg-white shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 divide-y divide-slate-100">
          {activeMatters.map((item) => {
            const isComp = item.status === 'completed';
            const isOver = item.status === 'overdue';
            const isVisit = item.status === 'site-visit';
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTask(item.id)}
                className="w-full min-h-[58px] px-3.5 py-2.5 flex items-center gap-2.5 text-start hover:bg-slate-50 transition cursor-pointer first:rounded-t-2xl last:rounded-b-2xl"
              >
                <span
                  className={`size-6 rounded-full flex items-center justify-center shrink-0 ${
                    isComp
                      ? 'bg-[#e3f5f1] text-[#0d9488]'
                      : isOver
                      ? 'bg-[#fde8e8] text-[#b42318]'
                      : isVisit
                      ? 'bg-amber-50 text-amber-700'
                      : 'bg-[#e8edfd] text-[#4338ca]'
                  }`}
                >
                  {isComp ? (
                    <CheckCircle2 className="size-3.5" />
                  ) : isOver ? (
                    <AlertTriangle className="size-3.5" />
                  ) : (
                    <Clock className="size-3.5" />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <p className="text-[11.5px] font-bold text-slate-900 leading-snug">
                    {pick(item.title, item.titleEn)}
                  </p>
                  <p className="text-[10px] font-medium text-slate-400 mt-0.5 leading-snug tabular-nums">
                    {getEmployeeName(item.assigneeId)} ·{' '}
                    {pick(item.shortDeadline, item.shortDeadlineEn)}
                  </p>
                </div>

                <span
                  className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold shrink-0 whitespace-nowrap ${
                    isComp
                      ? 'bg-[#e3f5f1] text-[#0b7a6c]'
                      : isOver
                      ? 'bg-[#fde8e8] text-[#b42318]'
                      : isVisit
                      ? 'bg-amber-50 text-amber-800'
                      : item.status === 'in-progress'
                      ? 'bg-[#e3f5f1] text-[#0b7a6c]'
                      : 'bg-[#e8edfd] text-[#4338ca]'
                  }`}
                >
                  {isComp
                    ? common.completed
                    : isOver
                    ? common.overdue
                    : isVisit
                    ? common.siteVisit
                    : item.status === 'in-progress'
                    ? common.inProgress
                    : common.pending}
                </span>

                <ItemChevron className="size-3.5 text-slate-300 shrink-0" />
              </button>
            );
          })}
        </div>
      </div>

      {/* Team Performance Section */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h5 className="text-[13px] font-bold text-slate-900">
            {p.teamPerformanceTitle}
          </h5>
          <span className="text-[10.5px] font-medium text-slate-400">
            {p.activeMembersCount(orderedEmployees.length)}
          </span>
        </div>

        <div className="rounded-2xl bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 space-y-3.5">
          {orderedEmployees.map((emp) => {
            const base = baseline.teamBase[emp.id] || { completed: 1, total: 2 };
            const initEmpDone = INITIAL_DEMO_TASKS.filter(
              (item) => item.assigneeId === emp.id && item.status === 'completed'
            ).length;
            const initEmpTotal = INITIAL_DEMO_TASKS.filter(
              (item) => item.assigneeId === emp.id
            ).length;
            const currEmpDone = tasks.filter(
              (item) => item.assigneeId === emp.id && item.status === 'completed'
            ).length;
            const currEmpTotal = tasks.filter(
              (item) => item.assigneeId === emp.id
            ).length;

            const total = Math.max(1, base.total + (currEmpTotal - initEmpTotal));
            const done = Math.min(
              total,
              Math.max(0, base.completed + (currEmpDone - initEmpDone))
            );
            const barPct = Math.round((done / total) * 100);
            const empName = pick(emp.name, emp.nameEn);
            const empRole = pick(emp.role, emp.roleEn);

            return (
              <div key={emp.id} className="space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <img
                      src={emp.avatar}
                      alt={empName}
                      className="size-8 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-[12px] font-bold text-slate-900 truncate leading-tight">
                        {empName}
                      </p>
                      <p className="text-[10px] text-slate-400 tabular-nums mt-0.5">
                        {p.memberProgressOnTime(empRole, done, total)}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10.5px] font-bold tabular-nums shrink-0 ${
                      barPct === 100
                        ? 'bg-[#e3f5f1] text-[#0b7a6c]'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {barPct}%
                  </span>
                </div>

                <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#0d9488] transition-all duration-300"
                    style={{ width: `${barPct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
