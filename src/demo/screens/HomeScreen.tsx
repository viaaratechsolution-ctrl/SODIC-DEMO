import React from 'react';
import {
  Building2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Home,
  KeyRound,
  MapPin,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CURRENT_USER } from '../demoData';
import {
  DemoActivity,
  DemoEmployee,
  DemoScreenId,
  DemoTask,
  MatterCategory,
  TaskStatusFilter,
} from '../demoTypes';

interface HomeScreenProps {
  tasks: DemoTask[];
  activities: DemoActivity[];
  employees: DemoEmployee[];
  onNavigate: (screen: DemoScreenId) => void;
  onSelectTask: (taskId: string) => void;
  onQuickCreate: (category: MatterCategory) => void;
  onViewHighPriority: () => void;
  onFilterFromStat: (filter: TaskStatusFilter) => void;
  showHotspot?: boolean;
  onDismissHotspot?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  tasks,
  activities,
  employees,
  onNavigate,
  onSelectTask,
  onQuickCreate,
  onViewHighPriority,
  onFilterFromStat,
  showHotspot = false,
  onDismissHotspot,
}) => {
  const { t, isRtl, pick } = useLanguage();
  const homeT = t.demoUi.home;
  const commonT = t.demoUi.common;
  const firmT = t.demoUi.firm;
  const DirectionalChevron = isRtl ? ChevronLeft : ChevronRight;

  const totalCount = tasks.length;
  const completedCount = tasks.filter((item) => item.status === 'completed').length;
  const inProgressCount = tasks.filter(
    (item) => item.status === 'in-progress' || item.status === 'site-visit'
  ).length;
  const pendingCount = tasks.filter(
    (item) => item.status === 'pending' || item.status === 'overdue'
  ).length;

  const progressPct = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;
  const radius = 26;
  const circumference = 2 * Math.PI * radius;
  const strokeOffset = circumference - (progressPct / 100) * circumference;

  const upcomingTasks = tasks.filter((item) => item.status !== 'completed').slice(0, 3);

  const overdueTasks = tasks.filter((item) => item.status === 'overdue');
  const overdueInstallments = tasks.filter((item) => item.installment?.status === 'overdue');
  const dueInstallments = tasks.filter((item) => item.installment?.status === 'due');
  const openSnagsCount = tasks.reduce(
    (acc, item) => acc + (item.snags?.filter((s) => !s.resolved).length ?? 0),
    0
  );
  const topPriorityTask =
    overdueTasks[0] ||
    tasks.find((item) => item.status !== 'completed' && item.priority === 'high') ||
    upcomingTasks[0];

  const getEmployee = (id: string) =>
    employees.find((e) => e.id === id) || employees[0];

  const userFirstName = pick(CURRENT_USER.name, CURRENT_USER.nameEn).split(' ')[0];

  const handleQuickCreateButton = () => {
    onDismissHotspot?.();
    onNavigate('create-task');
  };

  return (
    <div className="px-4 py-4 space-y-5 bg-[#f8fafc] min-h-full text-start">
      {/* Workspace Tag + Greeting */}
      <div>
        <div className="inline-flex items-center gap-1.5 rounded-full bg-[#eef2f6] px-2.5 py-1 text-[10.5px] font-semibold text-slate-700">
          <Building2 className="size-3 text-[#0d9488] shrink-0" />
          <span>{firmT.workspaceTag}</span>
          <span className="size-1.5 rounded-full bg-[#0d9488]" aria-hidden="true" />
        </div>

        <div className="mt-2.5 flex items-start justify-between gap-2">
          <div>
            <h4 className="text-[21px] font-bold text-slate-900 leading-snug">
              {homeT.greeting(userFirstName)}
            </h4>
            <p className="mt-1 text-[12px] font-normal text-slate-500 leading-[1.6]">
              {homeT.subtitle}
            </p>
          </div>

          {/* Pulsing hotspot entry for Create Task */}
          <div className="relative shrink-0">
            <button
              type="button"
              onClick={handleQuickCreateButton}
              aria-label={homeT.createNewTaskLabel}
              className="relative min-w-[44px] min-h-[44px] size-11 rounded-full bg-[#0d9488] text-white shadow-md shadow-teal-600/25 flex items-center justify-center hover:bg-[#0b7f75] active:scale-95 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Plus className="size-5 stroke-[2.5]" />
              {showHotspot && (
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute -inset-1 rounded-full bg-teal-400/50 animate-ping motion-reduce:animate-none"
                />
              )}
            </button>

            {showHotspot && (
              <div
                role="status"
                className="absolute end-0 top-12 z-30 w-44 rounded-xl bg-slate-900 text-white px-3 py-2 text-[11px] font-medium shadow-xl leading-relaxed"
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-1 end-4 size-2 rotate-45 bg-slate-900"
                />
                {homeT.hotspotText}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Workspace Progress Card */}
      <div className="rounded-2xl bg-white p-4 shadow-[0_2px_12px_rgba(15,23,42,0.05)] border border-slate-100">
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="size-7 rounded-lg bg-[#e6f7f5] text-[#0d9488] flex items-center justify-center">
              <RefreshCw className="size-3.5" />
            </span>
            <span className="text-[13px] font-bold text-slate-900">
              {homeT.todaysProgressTitle}
            </span>
          </div>
          <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[10px] font-semibold text-slate-600">
            {commonT.liveUpdate}
          </span>
        </div>

        <div className="mt-3 flex items-center justify-between gap-3">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-[28px] font-extrabold text-slate-900 tabular-nums leading-none">
                {progressPct}%
              </span>
              <span className="text-xs font-bold text-[#0b7a6c]">
                {progressPct === 100 ? homeT.completed : homeT.onTrack}
              </span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-slate-500 tabular-nums">
              {homeT.tasksCompletedOf(completedCount, totalCount)}
            </p>
          </div>

          {/* Circular Progress Ring */}
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
            <span className="absolute text-[9px] font-bold text-slate-600">
              {homeT.steady}
            </span>
          </div>
        </div>

        {/* Teal progress bar (automatically fills right-to-left in RTL and left-to-right in LTR) */}
        <div className="mt-3 h-2 w-full rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#0d9488] transition-all duration-300"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        {/* 3 Status Stat Boxes */}
        <div className="mt-3.5 grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => onFilterFromStat('completed')}
            className="min-h-[58px] rounded-xl bg-[#e7f6f3] px-2 py-2.5 text-center hover:brightness-95 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <span className="block text-[18px] font-extrabold text-[#0b7a6c] tabular-nums leading-tight">
              {completedCount}
            </span>
            <span className="mt-0.5 block text-[10.5px] font-semibold text-[#0b7a6c]">
              {homeT.statCompleted}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onFilterFromStat('in-progress')}
            className="min-h-[58px] rounded-xl bg-[#e8edfd] px-2 py-2.5 text-center hover:brightness-95 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span className="block text-[18px] font-extrabold text-[#374178] tabular-nums leading-tight">
              {inProgressCount}
            </span>
            <span className="mt-0.5 block text-[10.5px] font-semibold text-[#46507a]">
              {homeT.statInProgress}
            </span>
          </button>

          <button
            type="button"
            onClick={() => onFilterFromStat('pending')}
            className="min-h-[58px] rounded-xl bg-[#fde8e8] px-2 py-2.5 text-center hover:brightness-95 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
          >
            <span className="block text-[18px] font-extrabold text-[#b42318] tabular-nums leading-tight">
              {pendingCount}
            </span>
            <span className="mt-0.5 block text-[10.5px] font-semibold text-[#b42318]">
              {homeT.statPending}
            </span>
          </button>
        </div>
      </div>

      {/* Quick Actions Strip */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <h5 className="text-[13px] font-bold text-slate-900">{homeT.quickActionsTitle}</h5>
          <span className="text-[10.5px] font-medium text-slate-400">{homeT.instantActionBadge}</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          <button
            type="button"
            onClick={() => {
              onDismissHotspot?.();
              onQuickCreate('reservation');
            }}
            className="min-h-[48px] rounded-xl bg-white border border-slate-200/80 px-2 py-2 flex flex-col items-center justify-center gap-1 text-slate-800 shadow-[0_1px_6px_rgba(15,23,42,0.03)] hover:border-teal-300 hover:bg-teal-50/40 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Home className="size-4 text-[#0d9488]" />
            <span className="text-[10.5px] font-bold whitespace-nowrap">{homeT.quickReservation}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onDismissHotspot?.();
              onQuickCreate('inspection');
            }}
            className="min-h-[48px] rounded-xl bg-white border border-slate-200/80 px-2 py-2 flex flex-col items-center justify-center gap-1 text-slate-800 shadow-[0_1px_6px_rgba(15,23,42,0.03)] hover:border-teal-300 hover:bg-teal-50/40 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <MapPin className="size-4 text-[#0d9488]" />
            <span className="text-[10.5px] font-bold whitespace-nowrap">{homeT.quickInspection}</span>
          </button>

          <button
            type="button"
            onClick={() => {
              onDismissHotspot?.();
              onQuickCreate('handover');
            }}
            className="min-h-[48px] rounded-xl bg-white border border-slate-200/80 px-2 py-2 flex flex-col items-center justify-center gap-1 text-slate-800 shadow-[0_1px_6px_rgba(15,23,42,0.03)] hover:border-teal-300 hover:bg-teal-50/40 active:scale-[0.98] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <KeyRound className="size-4 text-[#0d9488]" />
            <span className="text-[10.5px] font-bold whitespace-nowrap">{homeT.quickHandover}</span>
          </button>
        </div>
      </div>

      {/* Live Daily Priorities Summary Card */}
      <div
        className={`rounded-2xl border border-teal-100 ${
          isRtl ? 'bg-gradient-to-l' : 'bg-gradient-to-r'
        } from-[#f0fdf9] to-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.03)] space-y-2`}
      >
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="size-6 rounded-lg bg-[#0d9488] text-white flex items-center justify-center shrink-0">
              <Sparkles className="size-3.5" />
            </span>
            <h5 className="text-[12.5px] font-bold text-slate-900">{homeT.dailyPrioritiesTitle}</h5>
          </div>
          <span className="text-[10px] font-semibold text-[#0b7a6c]">{commonT.liveAnalysis}</span>
        </div>

        <p className="text-[11.5px] text-slate-600 leading-[1.65] tabular-nums">
          {overdueInstallments.length > 0
            ? homeT.overdueInstallmentSummary(
                overdueInstallments.length,
                pick(
                  overdueInstallments[0].installment?.amountEgp ?? '',
                  overdueInstallments[0].installment?.amountEgpEn
                )
              )
            : dueInstallments.length > 0
            ? homeT.dueInstallmentsSummary(dueInstallments.length)
            : homeT.allPaidSummary}
          {openSnagsCount > 0
            ? homeT.openSnagsSummary(openSnagsCount)
            : homeT.allSnagsClosedSummary}
        </p>

        {topPriorityTask && (
          <button
            type="button"
            onClick={() => onSelectTask(topPriorityTask.id)}
            className="w-full min-h-[38px] rounded-xl bg-white border border-teal-200/80 px-3 py-1.5 flex items-center justify-between gap-2 text-[11px] font-bold text-[#0b7a6c] hover:bg-teal-50 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <span className="truncate">
              {homeT.priorityFollowUpPrefix} {pick(topPriorityTask.title, topPriorityTask.titleEn)}
            </span>
            <DirectionalChevron className="size-3.5 shrink-0" />
          </button>
        )}
      </div>

      {/* Upcoming Tasks Section */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <div className="flex items-center gap-2">
            <h5 className="text-[14px] font-bold text-slate-900">{homeT.upcomingTasksTitle}</h5>
            <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 rounded-full bg-slate-200/80 text-[10px] font-bold text-slate-700 tabular-nums">
              {upcomingTasks.length}
            </span>
          </div>
          <button
            type="button"
            onClick={onViewHighPriority}
            className="min-h-[36px] px-2 rounded-lg text-[11px] font-bold text-[#0d9488] hover:bg-teal-50 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            {homeT.viewUrgent}
          </button>
        </div>

        <div className="space-y-2.5">
          {upcomingTasks.length === 0 ? (
            <div className="rounded-2xl bg-white p-4 text-center border border-slate-100 text-xs text-slate-500">
              {homeT.allDoneToday}
            </div>
          ) : (
            upcomingTasks.map((task, idx) => {
              const assignee = getEmployee(task.assigneeId);
              const assigneeName = pick(assignee.name, assignee.nameEn);
              const statusLabel =
                task.status === 'site-visit'
                  ? commonT.siteVisit
                  : task.status === 'in-progress'
                  ? commonT.inProgress
                  : task.status === 'overdue'
                  ? commonT.overdue
                  : commonT.pending;

              return (
                <button
                  key={task.id}
                  type="button"
                  onClick={() => onSelectTask(task.id)}
                  className="w-full text-start rounded-2xl bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center gap-3 hover:border-teal-200 hover:shadow-md active:scale-[0.99] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <div className="relative shrink-0">
                    <img
                      src={assignee.avatar}
                      alt={assigneeName}
                      className="size-10 rounded-full object-cover ring-1 ring-slate-200"
                    />
                    <span
                      aria-hidden="true"
                      className={`absolute -bottom-0.5 -end-0.5 size-4 rounded-full border-2 border-white flex items-center justify-center text-white ${
                        idx === 0 ? 'bg-[#0d9488]' : 'bg-slate-800'
                      }`}
                    >
                      {idx === 0 ? <Zap className="size-2.5" /> : <Clock className="size-2.5" />}
                    </span>
                  </div>

                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-bold text-slate-900 leading-snug">
                      {pick(task.title, task.titleEn)}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5 tabular-nums">
                      {assigneeName} · {pick(task.shortDeadline, task.shortDeadlineEn)}
                    </p>
                    <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${
                          task.priority === 'high'
                            ? 'bg-[#fde8e8] text-[#b42318]'
                            : 'bg-slate-100 text-slate-600'
                        }`}
                      >
                        {task.priority === 'high'
                          ? commonT.urgent
                          : task.priority === 'medium'
                          ? commonT.mediumPriority
                          : commonT.lowPriority}
                      </span>
                      <span
                        className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${
                          task.status === 'site-visit'
                            ? 'bg-amber-50 text-amber-800'
                            : task.status === 'in-progress'
                            ? 'bg-[#e3f5f1] text-[#0b7a6c]'
                            : task.status === 'overdue'
                            ? 'bg-[#fde8e8] text-[#b42318]'
                            : 'bg-[#e8edfd] text-[#4338ca]'
                        }`}
                      >
                        {statusLabel}
                      </span>
                    </div>
                  </div>

                  <DirectionalChevron className="size-3.5 text-slate-300 shrink-0" />
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Recent Activity Section */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-2.5">
          <h5 className="text-[14px] font-bold text-slate-900">{homeT.recentActivityTitle}</h5>
          <span className="text-[11px] font-medium text-slate-400">
            {commonT.liveUpdate}
          </span>
        </div>

        <div className="space-y-2">
          {activities.slice(0, 3).map((act) => (
            <button
              key={act.id}
              type="button"
              onClick={() => {
                if (act.taskId) onSelectTask(act.taskId);
              }}
              className="w-full text-start rounded-2xl bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-start gap-3 hover:border-teal-200 transition cursor-pointer"
            >
              <div className="relative shrink-0">
                <img
                  src={act.actorAvatar}
                  alt={pick(act.actorName, act.actorNameEn)}
                  className="size-9 rounded-full object-cover ring-1 ring-slate-200"
                />
                <span
                  aria-hidden="true"
                  className="absolute -bottom-0.5 -end-0.5 size-4 rounded-full bg-[#0d9488] border-2 border-white flex items-center justify-center text-white"
                >
                  <Pencil className="size-2" />
                </span>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-start justify-between gap-2">
                  <p className="text-[12px] font-semibold text-slate-900 leading-snug">
                    {pick(act.summary, act.summaryEn)}
                  </p>
                  <span className="text-[10px] font-semibold text-[#0d9488] shrink-0 whitespace-nowrap tabular-nums">
                    {pick(act.time, act.timeEn)}
                  </span>
                </div>
                <p className="text-[11px] font-normal text-slate-500 mt-0.5 leading-[1.6]">
                  {pick(act.detail, act.detailEn)}
                </p>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
