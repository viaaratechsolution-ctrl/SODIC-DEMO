import React, { useMemo, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  Plus,
  Search,
  SlidersHorizontal,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DemoEmployee, DemoTask, ProjectFilter, TaskStatusFilter } from '../demoTypes';

export type TaskSortBy = 'default' | 'deadline' | 'priority';

interface TasksScreenProps {
  tasks: DemoTask[];
  employees: DemoEmployee[];
  statusFilter: TaskStatusFilter;
  onStatusFilterChange: (filter: TaskStatusFilter) => void;
  projectFilter: ProjectFilter;
  onProjectFilterChange: (project: ProjectFilter) => void;
  priorityFilter: 'all' | 'high';
  onClearPriorityFilter: () => void;
  onSelectTask: (taskId: string) => void;
  onCreateTaskClick: () => void;
  showHotspot?: boolean;
}

export const TasksScreen: React.FC<TasksScreenProps> = ({
  tasks,
  employees,
  statusFilter,
  onStatusFilterChange,
  projectFilter,
  onProjectFilterChange,
  priorityFilter,
  onClearPriorityFilter,
  onSelectTask,
  onCreateTaskClick,
  showHotspot = false,
}) => {
  const { t, isRtl, pick } = useLanguage();
  const tasksT = t.demoUi.tasks;
  const projectsT = t.demoUi.projects;
  const commonT = t.demoUi.common;
  const categoriesT = t.demoUi.categories;
  const DirectionalChevron = isRtl ? ChevronLeft : ChevronRight;

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOpen, setSortOpen] = useState(false);
  const [sortBy, setSortBy] = useState<TaskSortBy>('default');

  const getEmployee = (id: string) =>
    employees.find((e) => e.id === id) || employees[0];

  const filters: { id: TaskStatusFilter; label: string }[] = [
    { id: 'all', label: tasksT.filters.all },
    { id: 'in-progress', label: tasksT.filters['in-progress'] },
    { id: 'completed', label: tasksT.filters.completed },
    { id: 'pending', label: tasksT.filters.pending },
  ];

  const projectTabs: { id: ProjectFilter; label: string }[] = [
    { id: 'all', label: projectsT.all },
    { id: 'east-town', label: projectsT['east-town'] },
    { id: 'villette', label: projectsT.villette },
    { id: 'west-park', label: projectsT['west-park'] },
  ];

  const filteredTasks = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();

    const list = tasks.filter((task) => {
      if (priorityFilter === 'high' && task.priority !== 'high') return false;
      if (projectFilter !== 'all' && task.projectKey !== projectFilter) return false;

      if (statusFilter === 'completed' && task.status !== 'completed') return false;
      if (
        statusFilter === 'in-progress' &&
        task.status !== 'in-progress' &&
        task.status !== 'site-visit'
      ) {
        return false;
      }
      if (
        statusFilter === 'pending' &&
        task.status !== 'pending' &&
        task.status !== 'overdue'
      ) {
        return false;
      }

      if (q) {
        const assignee = getEmployee(task.assigneeId);
        const catAr = task.category;
        const catEn = categoriesT[task.category];
        const haystack = `${task.title} ${task.titleEn || ''} ${task.matterRef} ${task.clientName} ${task.clientNameEn || ''} ${task.compoundName} ${task.compoundNameEn || ''} ${catAr} ${catEn} ${assignee.name} ${assignee.nameEn}`.toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });

    if (sortBy === 'priority') {
      const rank = { high: 0, medium: 1, low: 2 };
      return [...list].sort((a, b) => rank[a.priority] - rank[b.priority]);
    }
    if (sortBy === 'deadline') {
      const rankDeadline = (task: DemoTask) => {
        const d = `${task.deadline} ${task.deadlineEn || ''}`.toLowerCase();
        if (task.status === 'overdue' || d.includes('أمس') || d.includes('yesterday')) return 0;
        if (d.includes('27 نوفمبر') || d.includes('27 nov')) return 1;
        if (d.includes('30 نوفمبر') || d.includes('30 nov')) return 2;
        if (task.status === 'completed' || d.includes('مكتمل') || d.includes('completed')) return 4;
        return 3;
      };
      return [...list].sort((a, b) => rankDeadline(a) - rankDeadline(b));
    }

    return list;
  }, [tasks, priorityFilter, projectFilter, statusFilter, searchQuery, sortBy, employees, categoriesT]);

  const statusBadge = (task: DemoTask) => {
    switch (task.status) {
      case 'completed':
        return {
          label: commonT.completedCheck,
          cls: 'bg-[#e3f5f1] text-[#0b7a6c]',
        };
      case 'site-visit':
        return {
          label: commonT.siteVisit,
          cls: 'bg-amber-50 text-amber-800',
        };
      case 'in-progress':
        return {
          label: commonT.inProgress,
          cls: 'bg-[#e3f5f1] text-[#0b7a6c]',
        };
      case 'overdue':
        return {
          label: commonT.overdue,
          cls: 'bg-[#fde8e8] text-[#b42318]',
        };
      default:
        return {
          label: commonT.pending,
          cls: 'bg-[#e8edfd] text-[#4338ca]',
        };
    }
  };

  const priorityBadge = (priority: DemoTask['priority']) => {
    if (priority === 'high') {
      return { label: commonT.urgent, cls: 'bg-[#fde8e8] text-[#b42318]' };
    }
    if (priority === 'medium') {
      return { label: commonT.mediumPriority, cls: 'bg-slate-100 text-slate-600' };
    }
    return { label: commonT.lowPriority, cls: 'bg-slate-100 text-slate-500' };
  };

  return (
    <div className="relative min-h-full bg-[#f8fafc] px-4 py-4 pb-20 space-y-4 text-start">
      {/* Heading + Search & Filter Icons */}
      <div className="flex items-start justify-between gap-2">
        <div>
          <h4 className="text-[21px] font-extrabold text-slate-900 leading-snug">
            {tasksT.title}
          </h4>
          <p className="text-[12px] font-normal leading-[1.6] text-slate-500 mt-0.5">
            {tasksT.subtitle}
          </p>
        </div>

        <div className="flex items-center gap-1 -me-1.5">
          <button
            type="button"
            onClick={() => {
              setSortOpen(false);
              setSearchOpen((prev) => !prev);
            }}
            aria-label={tasksT.searchLabel}
            aria-expanded={searchOpen}
            className={`min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
              searchOpen ? 'bg-teal-50 text-[#0d9488]' : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <Search className="size-[18px]" />
          </button>

          <button
            type="button"
            onClick={() => setSortOpen((prev) => !prev)}
            aria-label={tasksT.sortLabel}
            aria-expanded={sortOpen}
            className={`min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
              sortOpen || sortBy !== 'default'
                ? 'bg-teal-50 text-[#0d9488]'
                : 'text-slate-600 hover:bg-slate-200/60'
            }`}
          >
            <SlidersHorizontal className="size-[18px]" />
          </button>
        </div>
      </div>

      {/* Expandable Search Input */}
      {searchOpen && (
        <div className="relative">
          <Search className="size-3.5 text-slate-400 absolute start-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={tasksT.searchPlaceholder}
            aria-label={tasksT.searchLabel}
            className="w-full min-h-[40px] rounded-xl bg-white border border-slate-200 ps-8 pe-9 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
            autoFocus
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              aria-label={tasksT.clearSearchLabel}
              className="absolute end-1.5 top-1/2 -translate-y-1/2 size-7 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer"
            >
              <X className="size-3.5" />
            </button>
          )}
        </div>
      )}

      {/* Sort Sheet */}
      {sortOpen && (
        <div
          role="region"
          aria-label={tasksT.sortSheetLabel}
          className="rounded-2xl bg-white border border-slate-200 p-3 shadow-md space-y-2"
        >
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-500">
              {tasksT.sortByTitle}
            </span>
            <button
              type="button"
              onClick={() => setSortOpen(false)}
              className="text-[11px] font-semibold text-teal-600 cursor-pointer"
            >
              {commonT.done}
            </button>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            {(
              [
                { id: 'default', label: tasksT.sortNewest },
                { id: 'deadline', label: tasksT.sortDeadline },
                { id: 'priority', label: tasksT.sortPriority },
              ] as { id: TaskSortBy; label: string }[]
            ).map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setSortBy(opt.id)}
                className={`min-h-[36px] rounded-xl text-[11px] font-semibold border transition cursor-pointer flex items-center justify-center gap-1 ${
                  sortBy === opt.id
                    ? 'bg-[#0d9488] text-white border-[#0d9488]'
                    : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                }`}
              >
                {sortBy === opt.id && <Check className="size-3" />}
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Filter Chips */}
      <div className="space-y-2">
        {/* SODIC Project Segmented Filter */}
        <div
          role="tablist"
          aria-label={tasksT.projectFilterLabel}
          className="grid grid-cols-4 gap-1 rounded-xl bg-slate-200/65 p-1"
        >
          {projectTabs.map((proj) => {
            const active = projectFilter === proj.id;
            return (
              <button
                key={proj.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => onProjectFilterChange(proj.id)}
                className={`min-h-[34px] rounded-lg px-1.5 text-[10px] font-bold whitespace-nowrap truncate transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  active
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {proj.label}
              </button>
            );
          })}
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar pb-0.5">
          {filters.map((filter) => {
            const active = statusFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onStatusFilterChange(filter.id)}
                className={`min-h-[36px] px-3.5 py-1.5 rounded-full text-[11px] font-semibold whitespace-nowrap shrink-0 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
                  active
                    ? 'bg-[#0d9488] text-white shadow-sm'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* High priority filter chip if active */}
      {priorityFilter === 'high' && (
        <div className="flex items-center justify-between rounded-xl bg-rose-50 border border-rose-200 px-3 py-2 text-[11px] text-[#b42318]">
          <span className="font-semibold">{tasksT.highPriorityBanner}</span>
          <button
            type="button"
            onClick={onClearPriorityFilter}
            className="inline-flex items-center gap-1 font-bold hover:underline cursor-pointer"
          >
            <span>{commonT.clear}</span>
            <X className="size-3" />
          </button>
        </div>
      )}

      {/* Filtered Task Cards */}
      <div className="space-y-2.5">
        <AnimatePresence initial={false}>
          {filteredTasks.length === 0 ? (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="rounded-2xl bg-white p-6 text-center border border-slate-100 space-y-2"
            >
              <p className="text-xs font-semibold text-slate-700">{tasksT.emptyTitle}</p>
              <p className="text-[11px] text-slate-400">
                {tasksT.emptySubtitle}
              </p>
              {(projectFilter !== 'all' || statusFilter !== 'all' || priorityFilter === 'high' || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    onProjectFilterChange('all');
                    onStatusFilterChange('all');
                    onClearPriorityFilter();
                    setSearchQuery('');
                  }}
                  className="min-h-[36px] px-3.5 rounded-xl bg-teal-50 text-[#0b7a6c] text-[11px] font-bold hover:bg-teal-100 transition cursor-pointer"
                >
                  {tasksT.showAllTasks}
                </button>
              )}
            </motion.div>
          ) : (
            filteredTasks.map((task) => {
              const assignee = getEmployee(task.assigneeId);
              const assigneeName = pick(assignee.name, assignee.nameEn);
              const pri = priorityBadge(task.priority);
              const stat = statusBadge(task);

              return (
                <motion.button
                  key={task.id}
                  layout
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.2 }}
                  type="button"
                  onClick={() => onSelectTask(task.id)}
                  className="w-full text-start rounded-2xl bg-white p-3.5 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center gap-3 hover:border-teal-200 hover:shadow-md active:scale-[0.99] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <img
                    src={assignee.avatar}
                    alt={assigneeName}
                    className="size-11 rounded-full object-cover ring-1 ring-slate-200 shrink-0"
                  />

                  <div className="min-w-0 flex-1">
                    <p className="text-[12.5px] font-bold text-slate-900 leading-snug">
                      {pick(task.title, task.titleEn)}
                    </p>
                    <p className="text-[11px] font-medium text-slate-500 truncate mt-0.5 tabular-nums">
                      {assigneeName} · {pick(task.shortDeadline, task.shortDeadlineEn)}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-1.5">
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${pri.cls}`}
                      >
                        {pri.label}
                      </span>
                      <span
                        className={`rounded-full px-2.5 py-0.5 text-[10px] font-semibold ${stat.cls}`}
                      >
                        {stat.label}
                      </span>
                    </div>
                  </div>

                  <DirectionalChevron className="size-4 text-slate-400 shrink-0" />
                </motion.button>
              );
            })
          )}
        </AnimatePresence>
      </div>

      {/* Floating + Create Task Action Button */}
      <button
        type="button"
        onClick={onCreateTaskClick}
        aria-label={tasksT.createNewTaskLabel}
        className="sticky bottom-3 ms-auto size-12 min-w-[48px] min-h-[48px] rounded-full bg-[#0d9488] text-white shadow-lg shadow-teal-600/35 flex items-center justify-center hover:bg-[#0b7f75] active:scale-95 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
      >
        <Plus className="size-6 stroke-[2.5]" />
        {showHotspot && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-full bg-teal-400/50 animate-ping motion-reduce:animate-none"
          />
        )}
      </button>
    </div>
  );
};
