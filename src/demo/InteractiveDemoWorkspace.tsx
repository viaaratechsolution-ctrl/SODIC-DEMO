import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  Check,
  ChevronLeft,
  ChevronRight,
  ClipboardCheck,
  FileCheck2,
  FilePlus2,
  LayoutGrid,
  ListChecks,
  Maximize2,
  MessagesSquare,
  Minimize2,
  RotateCcw,
  TrendingUp,
} from 'lucide-react';
import { AnimatePresence, motion, MotionConfig } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';
import { Language, translations } from '../i18n/translations';
import {
  calculateChecklistProgress,
  CURRENT_USER,
  DEFAULT_DETAIL_TASK_ID,
  DEFAULT_MY_TASK_ID,
  DEMO_EMPLOYEES,
  DEMO_SCREEN_ORDER,
  INITIAL_DEMO_ACTIVITIES,
  INITIAL_DEMO_MESSAGES,
  INITIAL_DEMO_TASKS,
  INITIAL_NOTIFICATIONS,
  SCRIPTED_TEAM_REPLIES,
} from './demoData';
import {
  DemoActivity,
  DemoMessage,
  DemoNotification,
  DemoScreenId,
  DemoTask,
  MatterCategory,
  MatterChecklistStep,
  MatterDocument,
  SodicProjectFilter,
  TaskStatus,
  TaskStatusFilter,
} from './demoTypes';
import { DeviceFrame, DemoToastData } from './DeviceFrame';
import { DemoHeader } from './components/DemoHeader';
import { DemoBottomNav } from './components/DemoBottomNav';
import { ShareToChatSheet } from './components/ShareToChatSheet';
import { HomeScreen } from './screens/HomeScreen';
import { TasksScreen } from './screens/TasksScreen';
import { TaskDetailScreen } from './screens/TaskDetailScreen';
import { CreateTaskScreen } from './screens/CreateTaskScreen';
import { MyTaskScreen } from './screens/MyTaskScreen';
import { TeamChatScreen } from './screens/TeamChatScreen';
import { PerformanceScreen } from './screens/PerformanceScreen';

const SCREEN_ICONS: Record<DemoScreenId, React.FC<{ className?: string }>> = {
  home: LayoutGrid,
  tasks: ListChecks,
  'task-details': FileCheck2,
  'create-task': FilePlus2,
  'my-task': ClipboardCheck,
  'team-chat': MessagesSquare,
  performance: TrendingUp,
};

function formatCurrentTime(targetLang: Language): string {
  const now = new Date();
  const hours = now.getHours();
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const h12 = hours % 12 || 12;
  if (targetLang === 'ar') {
    const period = hours >= 12 ? 'م' : 'ص';
    return `${h12}:${minutes} ${period}`;
  }
  const period = hours >= 12 ? 'PM' : 'AM';
  return `${h12}:${minutes} ${period}`;
}

function computeStatusFromChecklist(
  steps: MatterChecklistStep[],
  currentStatus: TaskStatus
): { status: TaskStatus; progress: number } {
  const progress = calculateChecklistProgress(steps);
  if (steps.length > 0 && progress === 100) {
    return { status: 'completed', progress: 100 };
  }
  if (progress === 0) {
    return { status: 'pending', progress: 0 };
  }
  if (currentStatus === 'site-visit' || currentStatus === 'overdue') {
    return { status: currentStatus, progress };
  }
  return { status: 'in-progress', progress };
}

export const InteractiveDemoWorkspace: React.FC = () => {
  const { isRtl, t, pick } = useLanguage();
  const sectionText = t.demoSection;
  const ui = t.demoUi;
  const eventsAr = translations.ar.demoUi.events;
  const eventsEn = translations.en.demoUi.events;

  const PrevIcon = isRtl ? ChevronRight : ChevronLeft;
  const NextIcon = isRtl ? ChevronLeft : ChevronRight;

  // Shared single source of truth in-memory state (preserved across language switches)
  const [currentScreen, setCurrentScreen] = useState<DemoScreenId>('home');
  const [history, setHistory] = useState<DemoScreenId[]>([]);
  const [direction, setDirection] = useState<number>(1);

  const [tasks, setTasks] = useState<DemoTask[]>(INITIAL_DEMO_TASKS);
  const [activities, setActivities] = useState<DemoActivity[]>(INITIAL_DEMO_ACTIVITIES);
  const [messages, setMessages] = useState<DemoMessage[]>(INITIAL_DEMO_MESSAGES);
  const [notifications, setNotifications] = useState<DemoNotification[]>(INITIAL_NOTIFICATIONS);

  const [detailTaskId, setDetailTaskId] = useState<string>(DEFAULT_DETAIL_TASK_ID);
  const [myTaskId, setMyTaskId] = useState<string>(DEFAULT_MY_TASK_ID);
  const [taskStatusFilter, setTaskStatusFilter] = useState<TaskStatusFilter>('all');
  const [projectFilter, setProjectFilter] = useState<SodicProjectFilter>('all');
  const [taskPriorityFilter, setTaskPriorityFilter] = useState<'all' | 'high'>('all');
  const [createPresetCategory, setCreatePresetCategory] = useState<MatterCategory | null>(null);
  const [remindedMember, setRemindedMember] = useState<boolean>(false);

  // Share to Chat state
  const [shareSheetOpen, setShareSheetOpen] = useState<boolean>(false);
  const [sharedTaskIds, setSharedTaskIds] = useState<Record<string, boolean>>({});
  const shareTriggerRef = useRef<HTMLButtonElement | null>(null);

  const [isTyping, setIsTyping] = useState<boolean>(false);
  const replyIndexRef = useRef<number>(0);
  const typingTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

  // Horizontal scroller refs so active step auto-scrolls horizontally without vertical page jump
  const mobileScrollerRef = useRef<HTMLDivElement | null>(null);
  const mobileChipRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  // Height comparison refs
  const phoneBoxRef = useRef<HTMLDivElement | null>(null);
  const desktopCardsRef = useRef<HTMLOListElement | null>(null);
  const [isCardsTallerThanPhone, setIsCardsTallerThanPhone] = useState<boolean>(false);

  const [toast, setToast] = useState<DemoToastData | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // Guided experience & idle autoplay state
  const [hasInteracted, setHasInteracted] = useState<boolean>(false);
  const [showHotspot, setShowHotspot] = useState<boolean>(true);
  const [guidedProgress, setGuidedProgress] = useState({
    openedMatter: false,
    tickedChecklist: false,
    checkedPerformance: false,
  });

  const showToast = useCallback(
    (msg: string, action?: { label: string; onAction: () => void }) => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
      setToast({
        id: Date.now(),
        message: msg,
        actionLabel: action?.label,
        onAction: action?.onAction,
      });
      toastTimerRef.current = window.setTimeout(
        () => {
          setToast(null);
        },
        action ? 4500 : 2800
      );
    },
    []
  );

  const stopAutoplay = useCallback(() => {
    setHasInteracted(true);
    setShowHotspot(false);
  }, []);

  // Auto-scroll active step chip into horizontal center on mobile scroller (RTL & LTR safe)
  useEffect(() => {
    const scroller = mobileScrollerRef.current;
    const chip = mobileChipRefs.current[currentScreen];
    if (!scroller || !chip) return;

    const scrollerRect = scroller.getBoundingClientRect();
    const chipRect = chip.getBoundingClientRect();
    const scrollerCenter = scrollerRect.left + scrollerRect.width / 2;
    const chipCenter = chipRect.left + chipRect.width / 2;
    const delta = chipCenter - scrollerCenter;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    scroller.scrollBy({
      left: delta,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [currentScreen, isRtl]);

  // Measure desktop cards vs phone height to toggle sticky only if cards exceed phone height
  useEffect(() => {
    const checkHeights = () => {
      const phoneEl = phoneBoxRef.current;
      const cardsEl = desktopCardsRef.current;
      if (!phoneEl || !cardsEl) {
        setIsCardsTallerThanPhone(false);
        return;
      }
      const phoneH = phoneEl.getBoundingClientRect().height;
      const cardsH = cardsEl.getBoundingClientRect().height;
      setIsCardsTallerThanPhone(cardsH > phoneH + 8);
    };

    checkHeights();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', checkHeights);
      return () => window.removeEventListener('resize', checkHeights);
    }

    const observer = new ResizeObserver(checkHeights);
    if (phoneBoxRef.current) observer.observe(phoneBoxRef.current);
    if (desktopCardsRef.current) observer.observe(desktopCardsRef.current);
    return () => observer.disconnect();
  }, [isFullscreen]);

  // Gentle idle autoplay: waits 8 seconds on first load, stops permanently on any user interaction
  useEffect(() => {
    if (hasInteracted) return;

    let cycleTimer: number | null = null;
    const initialDelay = window.setTimeout(() => {
      const advance = () => {
        setDirection(1);
        setCurrentScreen((prev) => {
          const idx = DEMO_SCREEN_ORDER.indexOf(prev);
          return DEMO_SCREEN_ORDER[(idx + 1) % DEMO_SCREEN_ORDER.length];
        });
      };
      advance();
      cycleTimer = window.setInterval(advance, 5500);
    }, 8000);

    return () => {
      window.clearTimeout(initialDelay);
      if (cycleTimer) window.clearInterval(cycleTimer);
    };
  }, [hasInteracted]);

  useEffect(() => {
    return () => {
      if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
      if (toastTimerRef.current) window.clearTimeout(toastTimerRef.current);
    };
  }, []);

  const navigateTo = useCallback(
    (target: DemoScreenId, fromUser = true) => {
      if (fromUser) stopAutoplay();
      setShareSheetOpen(false);
      const currIdx = DEMO_SCREEN_ORDER.indexOf(currentScreen);
      const nextIdx = DEMO_SCREEN_ORDER.indexOf(target);
      setDirection(nextIdx >= currIdx ? 1 : -1);

      if (target !== currentScreen) {
        setHistory((prev) => [...prev.slice(-14), currentScreen]);
        setCurrentScreen(target);
      }

      if (target === 'task-details' || target === 'my-task') {
        setGuidedProgress((prev) =>
          prev.openedMatter ? prev : { ...prev, openedMatter: true }
        );
      }
      if (target === 'performance') {
        setGuidedProgress((prev) =>
          prev.checkedPerformance ? prev : { ...prev, checkedPerformance: true }
        );
      }
    },
    [currentScreen, stopAutoplay]
  );

  const handleBack = useCallback(() => {
    stopAutoplay();
    setShareSheetOpen(false);
    setDirection(-1);
    setHistory((prev) => {
      if (prev.length > 0) {
        const last = prev[prev.length - 1];
        setCurrentScreen(last);
        return prev.slice(0, -1);
      }
      const fallback: Record<DemoScreenId, DemoScreenId> = {
        home: 'home',
        tasks: 'home',
        'task-details': 'tasks',
        'create-task': 'tasks',
        'my-task': 'tasks',
        'team-chat': 'home',
        performance: 'home',
      };
      setCurrentScreen(fallback[currentScreen]);
      return prev;
    });
  }, [currentScreen, stopAutoplay]);

  const handleStepSelect = (idx: number) => {
    const targetId = DEMO_SCREEN_ORDER[idx];
    if (targetId) {
      if (targetId === 'task-details') {
        setDetailTaskId(DEFAULT_DETAIL_TASK_ID);
      } else if (targetId === 'my-task') {
        setMyTaskId(DEFAULT_MY_TASK_ID);
      }
      navigateTo(targetId, true);
    }
  };

  const handlePrevStep = () => {
    stopAutoplay();
    setShareSheetOpen(false);
    const currIdx = DEMO_SCREEN_ORDER.indexOf(currentScreen);
    const prevIdx = (currIdx - 1 + DEMO_SCREEN_ORDER.length) % DEMO_SCREEN_ORDER.length;
    setDirection(-1);
    setCurrentScreen(DEMO_SCREEN_ORDER[prevIdx]);
  };

  const handleNextStep = () => {
    stopAutoplay();
    setShareSheetOpen(false);
    const currIdx = DEMO_SCREEN_ORDER.indexOf(currentScreen);
    const nextIdx = (currIdx + 1) % DEMO_SCREEN_ORDER.length;
    setDirection(1);
    setCurrentScreen(DEMO_SCREEN_ORDER[nextIdx]);
  };

  const handleSelectTask = (taskId: string) => {
    const found = tasks.find((item) => item.id === taskId);
    if (found && found.assigneeId === CURRENT_USER.id) {
      setMyTaskId(taskId);
      navigateTo('my-task', true);
    } else {
      setDetailTaskId(taskId);
      navigateTo('task-details', true);
    }
  };

  const handleCreateTask = (newTask: DemoTask) => {
    stopAutoplay();
    const assignee =
      DEMO_EMPLOYEES.find((e) => e.id === newTask.assigneeId) || DEMO_EMPLOYEES[0];

    setTasks((prev) => [newTask, ...prev]);
    setDetailTaskId(newTask.id);
    if (newTask.assigneeId === CURRENT_USER.id) {
      setMyTaskId(newTask.id);
    }
    setTaskStatusFilter('all');
    setProjectFilter('all');
    setTaskPriorityFilter('all');
    setCreatePresetCategory(null);

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        actorName: CURRENT_USER.name,
        actorNameEn: CURRENT_USER.nameEn,
        actorAvatar: CURRENT_USER.avatar,
        summary: newTask.title,
        summaryEn: newTask.titleEn || newTask.title,
        detail: eventsAr.assignedDetail(assignee.name, newTask.matterRef),
        detailEn: eventsEn.assignedDetail(assignee.nameEn, newTask.matterRef),
        time: translations.ar.demoUi.common.now,
        timeEn: translations.en.demoUi.common.now,
        kind: 'created',
        taskId: newTask.id,
      },
      ...prev,
    ]);

    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderNameEn: CURRENT_USER.nameEn,
        senderRole: CURRENT_USER.role,
        senderRoleEn: CURRENT_USER.roleEn,
        isLead: true,
        isSelf: true,
        attachedTaskId: newTask.id,
        time: formatCurrentTime('ar'),
        timeEn: formatCurrentTime('en'),
        read: true,
      },
    ]);

    showToast(ui.toasts.assignedTo(pick(assignee.name, assignee.nameEn)));
    setHistory((prev) => [...prev.slice(-14), 'tasks']);
    setDirection(1);
    setCurrentScreen(
      newTask.assigneeId === CURRENT_USER.id ? 'my-task' : 'task-details'
    );
  };

  const handleCompleteTask = (taskId: string) => {
    stopAutoplay();
    let completedTitleAr = eventsAr.fallbackCompletedTitle;
    let completedTitleEn = eventsEn.fallbackCompletedTitle;
    let actor = DEMO_EMPLOYEES[0];

    const timeAr = formatCurrentTime('ar');
    const timeEn = formatCurrentTime('en');

    setTasks((prev) =>
      prev.map((item) => {
        if (item.id !== taskId) return item;
        completedTitleAr = item.title;
        completedTitleEn = item.titleEn || item.title;
        actor =
          DEMO_EMPLOYEES.find((e) => e.id === item.assigneeId) || DEMO_EMPLOYEES[0];
        return {
          ...item,
          status: 'completed',
          progress: 100,
          submittedAt: timeAr,
          submittedAtEn: timeEn,
          checklistSteps: item.checklistSteps.map((s) => ({ ...s, done: true })),
        };
      })
    );

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        actorName: actor.name,
        actorNameEn: actor.nameEn,
        actorAvatar: actor.avatar,
        summary: eventsAr.completedSummary(actor.name),
        summaryEn: eventsEn.completedSummary(actor.nameEn),
        detail: eventsAr.completedDetail(completedTitleAr),
        detailEn: eventsEn.completedDetail(completedTitleEn),
        time: translations.ar.demoUi.common.now,
        timeEn: translations.en.demoUi.common.now,
        kind: 'completed',
        taskId,
      },
      ...prev,
    ]);

    setGuidedProgress((prev) => ({ ...prev, tickedChecklist: true }));
    showToast(ui.toasts.taskCompleted(pick(completedTitleAr, completedTitleEn)));
  };

  const handleToggleChecklistStep = (taskId: string, stepId: string) => {
    stopAutoplay();
    let reachedComplete = false;
    let taskTitleAr = '';
    let taskTitleEn = '';
    let actor = DEMO_EMPLOYEES[0];

    setTasks((prev) =>
      prev.map((item) => {
        if (item.id !== taskId) return item;
        const nextSteps = item.checklistSteps.map((step) =>
          step.id === stepId ? { ...step, done: !step.done } : step
        );
        const { status, progress } = computeStatusFromChecklist(
          nextSteps,
          item.status
        );
        if (status === 'completed' && item.status !== 'completed') {
          reachedComplete = true;
          taskTitleAr = item.title;
          taskTitleEn = item.titleEn || item.title;
          actor =
            DEMO_EMPLOYEES.find((e) => e.id === item.assigneeId) || DEMO_EMPLOYEES[0];
        }
        return {
          ...item,
          checklistSteps: nextSteps,
          status,
          progress,
        };
      })
    );

    setGuidedProgress((prev) => ({ ...prev, tickedChecklist: true }));

    if (reachedComplete) {
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          actorName: actor.name,
          actorNameEn: actor.nameEn,
          actorAvatar: actor.avatar,
          summary: `${actor.name} أكمل ${taskTitleAr}`,
          summaryEn: `${actor.nameEn} completed ${taskTitleEn}`,
          detail: eventsAr.allStepsVerified,
          detailEn: eventsEn.allStepsVerified,
          time: translations.ar.demoUi.common.now,
          timeEn: translations.en.demoUi.common.now,
          kind: 'completed',
          taskId,
        },
        ...prev,
      ]);
      showToast(ui.toasts.allStepsDone);
    }
  };

  const handleAddNote = (taskId: string, noteText: string) => {
    stopAutoplay();
    const stampAr = `${translations.ar.demoUi.common.todayAtPrefix} ${formatCurrentTime('ar')}`;
    const stampEn = `${translations.en.demoUi.common.todayAtPrefix} ${formatCurrentTime('en')}`;
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? {
              ...item,
              notes: [
                ...item.notes,
                {
                  id: `note-${Date.now()}`,
                  text: noteText,
                  textEn: noteText,
                  timestamp: stampAr,
                  timestampEn: stampEn,
                },
              ],
            }
          : item
      )
    );
    showToast(ui.toasts.noteAdded);
  };

  const handleAddPhoto = (taskId: string, photoUrl: string) => {
    stopAutoplay();
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? { ...item, uploadedPhotos: [...item.uploadedPhotos, photoUrl] }
          : item
      )
    );
    showToast(ui.toasts.photoAttached);
  };

  const handleRemovePhoto = (taskId: string, photoUrl: string) => {
    stopAutoplay();
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? {
              ...item,
              uploadedPhotos: item.uploadedPhotos.filter((src) => src !== photoUrl),
            }
          : item
      )
    );
  };

  const handleAddDocument = (taskId: string, doc: MatterDocument) => {
    stopAutoplay();
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? { ...item, documents: [doc, ...item.documents] }
          : item
      )
    );
    showToast(ui.toasts.docUploaded(pick(doc.name, doc.nameEn)));
  };

  const handleRemoveDocument = (taskId: string, docId: string) => {
    stopAutoplay();
    setTasks((prev) =>
      prev.map((item) =>
        item.id === taskId
          ? { ...item, documents: item.documents.filter((d) => d.id !== docId) }
          : item
      )
    );
    showToast(ui.toasts.docRemoved);
  };

  const handleQuickCreate = (category: MatterCategory) => {
    stopAutoplay();
    setCreatePresetCategory(category);
    navigateTo('create-task', true);
  };

  const handleMarkInstallmentPaid = (taskId: string) => {
    stopAutoplay();
    let paidLabelAr = '';
    let paidLabelEn = '';
    let paidAmountAr = '';
    let paidAmountEn = '';
    let clientAr = '';
    let clientEn = '';

    setTasks((prev) =>
      prev.map((item) => {
        if (item.id !== taskId || !item.installment) return item;
        paidLabelAr = item.installment.label;
        paidLabelEn = item.installment.labelEn || item.installment.label;
        paidAmountAr = item.installment.amountEgp;
        paidAmountEn = item.installment.amountEgpEn || item.installment.amountEgp;
        clientAr = item.clientName;
        clientEn = item.clientNameEn || item.clientName;

        const resolvedStatus: TaskStatus =
          item.status === 'overdue'
            ? item.progress >= 100
              ? 'completed'
              : 'in-progress'
            : item.status;

        const clearedCompoundAr = item.compoundName.includes('متأخرة')
          ? 'إيست تاون · القاهرة الجديدة'
          : item.compoundName;
        const clearedCompoundEn =
          item.compoundNameEn && item.compoundNameEn.toLowerCase().includes('overdue')
            ? 'East Town · New Cairo'
            : item.compoundNameEn || clearedCompoundAr;

        return {
          ...item,
          status: resolvedStatus,
          compoundName: clearedCompoundAr,
          compoundNameEn: clearedCompoundEn,
          propertyMeta: item.propertyMeta
            ? {
                ...item.propertyMeta,
                statusPill:
                  item.propertyMeta.statusPill === 'متأخرة'
                    ? 'تم السداد'
                    : item.propertyMeta.statusPill,
                statusPillEn:
                  item.propertyMeta.statusPillEn === 'Overdue'
                    ? 'Paid'
                    : item.propertyMeta.statusPillEn || item.propertyMeta.statusPill,
              }
            : undefined,
          installment: {
            ...item.installment,
            status: 'paid',
            dueDate: eventsAr.installmentPaidNow,
            dueDateEn: eventsEn.installmentPaidNow,
            reminderSent: false,
          },
        };
      })
    );

    setNotifications((prev) =>
      prev.map((n) => (n.taskId === taskId ? { ...n, unread: false } : n))
    );

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        actorName: CURRENT_USER.name,
        actorNameEn: CURRENT_USER.nameEn,
        actorAvatar: CURRENT_USER.avatar,
        summary: eventsAr.installmentCollectedSummary(paidLabelAr),
        summaryEn: eventsEn.installmentCollectedSummary(paidLabelEn),
        detail: `${paidAmountAr} · ${clientAr}`,
        detailEn: `${paidAmountEn} · ${clientEn}`,
        time: translations.ar.demoUi.common.now,
        timeEn: translations.en.demoUi.common.now,
        kind: 'completed',
        taskId,
      },
      ...prev,
    ]);

    showToast(ui.toasts.installmentPaid);
  };

  const handleSendInstallmentReminder = (taskId: string) => {
    stopAutoplay();
    let clientAr = '';
    let clientEn = '';
    let amountAr = '';
    let amountEn = '';
    let taskTitleAr = '';
    let taskTitleEn = '';

    setTasks((prev) =>
      prev.map((item) => {
        if (item.id !== taskId || !item.installment) return item;
        clientAr = item.clientName;
        clientEn = item.clientNameEn || item.clientName;
        amountAr = item.installment.amountEgp;
        amountEn = item.installment.amountEgpEn || item.installment.amountEgp;
        taskTitleAr = item.title;
        taskTitleEn = item.titleEn || item.title;
        return {
          ...item,
          installment: { ...item.installment, reminderSent: true },
        };
      })
    );

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        actorName: CURRENT_USER.name,
        actorNameEn: CURRENT_USER.nameEn,
        actorAvatar: CURRENT_USER.avatar,
        summary: eventsAr.installmentReminderSummary(clientAr),
        summaryEn: eventsEn.installmentReminderSummary(clientEn),
        detail: `${amountAr} · ${taskTitleAr}`,
        detailEn: `${amountEn} · ${taskTitleEn}`,
        time: translations.ar.demoUi.common.now,
        timeEn: translations.en.demoUi.common.now,
        kind: 'reminder',
        taskId,
      },
      ...prev,
    ]);

    showToast(ui.toasts.installmentReminderSent(pick(clientAr, clientEn)));
  };

  const handleToggleSnag = (taskId: string, snagId: string) => {
    stopAutoplay();
    let toggledTitleAr = '';
    let toggledTitleEn = '';
    let nowResolved = false;

    setTasks((prev) =>
      prev.map((item) => {
        if (item.id !== taskId || !item.snags) return item;
        const nextSnags = item.snags.map((snag) => {
          if (snag.id !== snagId) return snag;
          toggledTitleAr = snag.title;
          toggledTitleEn = snag.titleEn || snag.title;
          nowResolved = !snag.resolved;
          return { ...snag, resolved: !snag.resolved };
        });
        return { ...item, snags: nextSnags };
      })
    );

    if (toggledTitleAr) {
      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          actorName: CURRENT_USER.name,
          actorNameEn: CURRENT_USER.nameEn,
          actorAvatar: CURRENT_USER.avatar,
          summary: nowResolved ? eventsAr.snagClosedSummary : eventsAr.snagReopenedSummary,
          summaryEn: nowResolved
            ? eventsEn.snagClosedSummary
            : eventsEn.snagReopenedSummary,
          detail: toggledTitleAr,
          detailEn: toggledTitleEn,
          time: translations.ar.demoUi.common.now,
          timeEn: translations.en.demoUi.common.now,
          kind: 'update',
          taskId,
        },
        ...prev,
      ]);
      showToast(nowResolved ? ui.toasts.snagResolved : ui.toasts.snagReopened);
    }
  };

  const handleAddSnag = (taskId: string, title: string, area: string) => {
    stopAutoplay();
    const arAreas = translations.ar.demoUi.myTask.snagAreas;
    const enAreas = translations.en.demoUi.myTask.snagAreas;
    const arIdx = arAreas.indexOf(area);
    const enIdx = enAreas.indexOf(area);
    const areaAr = arIdx !== -1 ? arAreas[arIdx] : enIdx !== -1 ? arAreas[enIdx] : area;
    const areaEn = enIdx !== -1 ? enAreas[enIdx] : arIdx !== -1 ? enAreas[arIdx] : area;

    setTasks((prev) =>
      prev.map((item) => {
        if (item.id !== taskId) return item;
        const existing = item.snags || [];
        return {
          ...item,
          snags: [
            {
              id: `sn-${Date.now()}`,
              title,
              titleEn: title,
              area: areaAr,
              areaEn,
              resolved: false,
            },
            ...existing,
          ],
        };
      })
    );

    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        actorName: CURRENT_USER.name,
        actorNameEn: CURRENT_USER.nameEn,
        actorAvatar: CURRENT_USER.avatar,
        summary: eventsAr.snagAddedSummary,
        summaryEn: eventsEn.snagAddedSummary,
        detail: `${title} · ${areaAr}`,
        detailEn: `${title} · ${areaEn}`,
        time: translations.ar.demoUi.common.now,
        timeEn: translations.en.demoUi.common.now,
        kind: 'update',
        taskId,
      },
      ...prev,
    ]);

    showToast(ui.toasts.snagAdded);
  };

  const handleOpenShareSheet = useCallback(
    (triggerEl: HTMLButtonElement) => {
      stopAutoplay();
      shareTriggerRef.current = triggerEl;
      setShareSheetOpen(true);
    },
    [stopAutoplay]
  );

  const handleCloseShareSheet = useCallback(() => {
    setShareSheetOpen(false);
    window.setTimeout(() => {
      shareTriggerRef.current?.focus();
    }, 20);
  }, []);

  const handleSendShareToChat = useCallback(
    (task: DemoTask, note: string) => {
      stopAutoplay();
      const nowAr = formatCurrentTime('ar');
      const nowEn = formatCurrentTime('en');
      const wasAlreadyShared = Boolean(sharedTaskIds[task.id]);

      const newMessages: DemoMessage[] = [];
      if (note) {
        newMessages.push({
          id: `msg-share-note-${Date.now()}`,
          senderId: CURRENT_USER.id,
          senderName: CURRENT_USER.name,
          senderNameEn: CURRENT_USER.nameEn,
          senderRole: CURRENT_USER.role,
          senderRoleEn: CURRENT_USER.roleEn,
          isLead: true,
          isSelf: true,
          text: note,
          textEn: note,
          time: nowAr,
          timeEn: nowEn,
          read: true,
        });
      }
      newMessages.push({
        id: `msg-share-card-${Date.now() + 1}`,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderNameEn: CURRENT_USER.nameEn,
        senderRole: CURRENT_USER.role,
        senderRoleEn: CURRENT_USER.roleEn,
        isLead: true,
        isSelf: true,
        attachedTaskId: task.id,
        time: nowAr,
        timeEn: nowEn,
        read: true,
      });

      setMessages((prev) => [...prev, ...newMessages]);
      setSharedTaskIds((prev) => ({ ...prev, [task.id]: true }));
      setIsTyping(true);

      if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
      typingTimerRef.current = window.setTimeout(() => {
        const replyAr = wasAlreadyShared
          ? eventsAr.shareReplyAgain(task.matterRef)
          : eventsAr.shareReplyFirst;
        const replyEn = wasAlreadyShared
          ? eventsEn.shareReplyAgain(task.matterRef)
          : eventsEn.shareReplyFirst;
        const sara = DEMO_EMPLOYEES[1];
        setMessages((prev) => [
          ...prev,
          {
            id: `msg-share-reply-${Date.now()}`,
            senderId: sara.id,
            senderName: sara.name,
            senderNameEn: sara.nameEn,
            senderRole: sara.role,
            senderRoleEn: sara.roleEn,
            isLead: true,
            text: replyAr,
            textEn: replyEn,
            time: formatCurrentTime('ar'),
            timeEn: formatCurrentTime('en'),
          },
        ]);
        setIsTyping(false);
      }, 1500);

      setActivities((prev) => [
        {
          id: `act-${Date.now()}`,
          actorName: CURRENT_USER.name,
          actorNameEn: CURRENT_USER.nameEn,
          actorAvatar: CURRENT_USER.avatar,
          summary: eventsAr.sharedSummary(CURRENT_USER.name, task.title),
          summaryEn: eventsEn.sharedSummary(
            CURRENT_USER.nameEn,
            task.titleEn || task.title
          ),
          detail: note || `${task.matterRef} · ${task.shortDeadline}`,
          detailEn:
            note ||
            `${task.matterRef} · ${task.shortDeadlineEn || task.shortDeadline}`,
          time: translations.ar.demoUi.common.now,
          timeEn: translations.en.demoUi.common.now,
          kind: 'update',
          taskId: task.id,
        },
        ...prev,
      ]);

      setShareSheetOpen(false);
      window.setTimeout(() => {
        shareTriggerRef.current?.focus();
      }, 20);

      showToast(
        wasAlreadyShared ? ui.toasts.sharedAgain : ui.toasts.sharedToChat,
        {
          label: ui.toasts.openChat,
          onAction: () => {
            setToast(null);
            navigateTo('team-chat', true);
          },
        }
      );
    },
    [eventsAr, eventsEn, navigateTo, sharedTaskIds, showToast, stopAutoplay, ui.toasts]
  );

  const handleMessageEmployee = (taskId: string) => {
    stopAutoplay();
    setMessages((prev) => [
      ...prev,
      {
        id: `msg-${Date.now()}`,
        senderId: CURRENT_USER.id,
        senderName: CURRENT_USER.name,
        senderNameEn: CURRENT_USER.nameEn,
        senderRole: CURRENT_USER.role,
        senderRoleEn: CURRENT_USER.roleEn,
        isLead: true,
        isSelf: true,
        attachedTaskId: taskId,
        time: formatCurrentTime('ar'),
        timeEn: formatCurrentTime('en'),
        read: true,
      },
    ]);
    navigateTo('team-chat', true);
    showToast(ui.toasts.attachedToChat);
  };

  const handleSendChatMessage = (text: string) => {
    stopAutoplay();
    const userMsg: DemoMessage = {
      id: `msg-${Date.now()}`,
      senderId: CURRENT_USER.id,
      senderName: CURRENT_USER.name,
      senderNameEn: CURRENT_USER.nameEn,
      senderRole: CURRENT_USER.role,
      senderRoleEn: CURRENT_USER.roleEn,
      isSelf: true,
      text,
      textEn: text,
      time: formatCurrentTime('ar'),
      timeEn: formatCurrentTime('en'),
      read: true,
    };
    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);

    typingTimerRef.current = window.setTimeout(() => {
      const scripted =
        SCRIPTED_TEAM_REPLIES[replyIndexRef.current % SCRIPTED_TEAM_REPLIES.length];
      replyIndexRef.current += 1;

      setMessages((prev) => [
        ...prev,
        {
          id: `msg-reply-${Date.now()}`,
          senderId: scripted.senderId,
          senderName: scripted.senderName,
          senderNameEn: scripted.senderNameEn,
          senderRole: scripted.senderRole,
          senderRoleEn: scripted.senderRoleEn,
          isLead: scripted.isLead,
          text: scripted.text,
          textEn: scripted.textEn,
          time: formatCurrentTime('ar'),
          timeEn: formatCurrentTime('en'),
        },
      ]);
      setIsTyping(false);
    }, 1500);
  };

  const handleRemindEmployee = (employeeId: string) => {
    stopAutoplay();
    setRemindedMember(true);
    const member =
      DEMO_EMPLOYEES.find((e) => e.id === employeeId) || DEMO_EMPLOYEES[1];
    setActivities((prev) => [
      {
        id: `act-${Date.now()}`,
        actorName: member.name,
        actorNameEn: member.nameEn,
        actorAvatar: member.avatar,
        summary: eventsAr.reminderSummary(member.name),
        summaryEn: eventsEn.reminderSummary(member.nameEn),
        detail: eventsAr.reminderDetailOverdue,
        detailEn: eventsEn.reminderDetailOverdue,
        time: translations.ar.demoUi.common.now,
        timeEn: translations.en.demoUi.common.now,
        kind: 'reminder',
        taskId: 'task-ownership-followup',
      },
      ...prev,
    ]);
    showToast(ui.toasts.reminderSentTo(pick(member.name, member.nameEn)));
  };

  const handleResetDemo = () => {
    if (typingTimerRef.current) window.clearTimeout(typingTimerRef.current);
    setTasks(INITIAL_DEMO_TASKS);
    setActivities(INITIAL_DEMO_ACTIVITIES);
    setMessages(INITIAL_DEMO_MESSAGES);
    setNotifications(INITIAL_NOTIFICATIONS);
    setDetailTaskId(DEFAULT_DETAIL_TASK_ID);
    setMyTaskId(DEFAULT_MY_TASK_ID);
    setTaskStatusFilter('all');
    setProjectFilter('all');
    setTaskPriorityFilter('all');
    setCreatePresetCategory(null);
    setRemindedMember(false);
    setShareSheetOpen(false);
    setSharedTaskIds({});
    setIsTyping(false);
    setHistory([]);
    setCurrentScreen('home');
    setDirection(-1);
    setGuidedProgress({
      openedMatter: false,
      tickedChecklist: false,
      checkedPerformance: false,
    });
    setHasInteracted(true);
    setShowHotspot(true);
    showToast(ui.toasts.resetDemo);
  };

  const activeDetailTask =
    tasks.find((item) => item.id === detailTaskId) ||
    tasks.find((item) => item.id === DEFAULT_DETAIL_TASK_ID) ||
    tasks[0];

  const activeMyTask =
    tasks.find((item) => item.id === myTaskId) ||
    tasks.find((item) => item.id === DEFAULT_MY_TASK_ID) ||
    tasks[0];

  const activeScreenMeta = ui.screens[currentScreen];

  const headerConfig: Record<
    DemoScreenId,
    { title: string; subtitle?: string; showBack: boolean }
  > = {
    home: {
      title: ui.screens.home.headerTitle,
      subtitle: ui.firm.shortFirmName,
      showBack: history.length > 0,
    },
    tasks: {
      title: ui.screens.tasks.headerTitle,
      subtitle: ui.firm.shortFirmName,
      showBack: true,
    },
    'task-details': {
      title: ui.screens['task-details'].headerTitle,
      subtitle: activeDetailTask.matterRef,
      showBack: true,
    },
    'create-task': {
      title: ui.screens['create-task'].headerTitle,
      subtitle: ui.screens['create-task'].subtitle,
      showBack: true,
    },
    'my-task': {
      title: ui.screens['my-task'].headerTitle,
      subtitle: activeMyTask.matterRef,
      showBack: true,
    },
    'team-chat': {
      title: ui.screens['team-chat'].headerTitle,
      subtitle: ui.firm.shortFirmName,
      showBack: true,
    },
    performance: {
      title: ui.screens.performance.headerTitle,
      subtitle: ui.firm.shortFirmName,
      showBack: true,
    },
  };

  const currentHeader = headerConfig[currentScreen];
  const isChatScreen = currentScreen === 'team-chat';
  const activeShareTask =
    currentScreen === 'my-task' ? activeMyTask : activeDetailTask;

  const rtlFactor = isRtl ? 1 : -1;
  const enterX = (direction > 0 ? -16 : 16) * rtlFactor;
  const exitX = (direction > 0 ? 16 : -16) * rtlFactor;

  return (
    <MotionConfig reducedMotion="user">
      {/* Guided Mode Progress Strip */}
      <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-border bg-card/65 px-3.5 py-3 sm:px-4 sm:py-3.5 backdrop-blur-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-center sm:text-start text-xs font-semibold text-primary">
            {sectionText.guidedPrompt}
          </p>

          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-2">
            <button
              type="button"
              onClick={() => {
                setDetailTaskId(DEFAULT_DETAIL_TASK_ID);
                navigateTo('task-details', true);
              }}
              className={`min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                guidedProgress.openedMatter
                  ? 'border-primary/40 bg-primary/15 text-primary'
                  : 'border-border bg-background/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`size-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 tabular-nums ${
                  guidedProgress.openedMatter
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/10 text-foreground'
                }`}
              >
                {guidedProgress.openedMatter ? <Check className="size-2.5 stroke-[3]" /> : '1'}
              </span>
              <span>{sectionText.guidedStep1}</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setMyTaskId(DEFAULT_MY_TASK_ID);
                navigateTo('my-task', true);
              }}
              className={`min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                guidedProgress.tickedChecklist
                  ? 'border-primary/40 bg-primary/15 text-primary'
                  : 'border-border bg-background/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`size-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 tabular-nums ${
                  guidedProgress.tickedChecklist
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/10 text-foreground'
                }`}
              >
                {guidedProgress.tickedChecklist ? (
                  <Check className="size-2.5 stroke-[3]" />
                ) : (
                  '2'
                )}
              </span>
              <span>{sectionText.guidedStep2}</span>
            </button>

            <button
              type="button"
              onClick={() => navigateTo('performance', true)}
              className={`min-h-[44px] sm:min-h-[38px] inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary whitespace-nowrap ${
                guidedProgress.checkedPerformance
                  ? 'border-primary/40 bg-primary/15 text-primary'
                  : 'border-border bg-background/60 text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`size-4 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0 tabular-nums ${
                  guidedProgress.checkedPerformance
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-white/10 text-foreground'
                }`}
              >
                {guidedProgress.checkedPerformance ? (
                  <Check className="size-2.5 stroke-[3]" />
                ) : (
                  '3'
                )}
              </span>
              <span>{sectionText.guidedStep3}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Responsive Container */}
      <div className="mt-10 sm:mt-12 min-w-0">
        <div
          className={`flex flex-col items-center gap-8 min-[1025px]:grid min-[1025px]:grid-cols-[auto_minmax(0,520px)] min-[1025px]:justify-center min-[1025px]:gap-12 xl:gap-16 ${
            isCardsTallerThanPhone
              ? 'min-[1025px]:items-start'
              : 'min-[1025px]:items-center'
          }`}
        >
          {/* Column 1: Phone Mockup + Screen Caption & Navigation Controls */}
          <div
            className={`w-full min-w-0 flex flex-col items-center gap-5 min-[1025px]:w-auto ${
              isCardsTallerThanPhone ? 'min-[1025px]:sticky min-[1025px]:top-24' : ''
            }`}
          >
            <div ref={phoneBoxRef} className="w-full flex justify-center min-w-0">
              <DeviceFrame
                onSwipeNext={handleNextStep}
                onSwipePrev={handlePrevStep}
                onInteract={stopAutoplay}
                isFocusMode={isFullscreen}
                resetScrollKey={`${currentScreen}-${detailTaskId}-${myTaskId}`}
                toast={toast}
                lockOuterScroll={isChatScreen}
                hideHomeIndicator={isChatScreen}
                header={
                  isChatScreen ? undefined : (
                    <DemoHeader
                      title={currentHeader.title}
                      subtitle={currentHeader.subtitle}
                      showBack={currentHeader.showBack}
                      onBack={handleBack}
                      notifications={notifications}
                      onNotificationClick={(notif) => {
                        stopAutoplay();
                        setNotifications((prev) =>
                          prev.map((n) => (n.id === notif.id ? { ...n, unread: false } : n))
                        );
                        if (notif.taskId) {
                          handleSelectTask(notif.taskId);
                        }
                      }}
                      onMarkAllRead={() => {
                        stopAutoplay();
                        setNotifications((prev) =>
                          prev.map((n) => ({ ...n, unread: false }))
                        );
                        showToast(ui.header.allReadToast);
                      }}
                      onShowToast={(msg) => showToast(msg)}
                      onShareClick={
                        currentScreen === 'task-details' ? handleOpenShareSheet : undefined
                      }
                    />
                  )
                }
                bottomNav={
                  isChatScreen ? undefined : (
                    <DemoBottomNav
                      currentScreen={currentScreen}
                      onNavigate={(screen) => navigateTo(screen, true)}
                    />
                  )
                }
                overlay={
                  <ShareToChatSheet
                    task={activeShareTask}
                    isOpen={shareSheetOpen}
                    onClose={handleCloseShareSheet}
                    onSend={handleSendShareToChat}
                  />
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={currentScreen}
                    initial={{ opacity: 0, x: enterX }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: exitX }}
                    transition={{ duration: 0.22, ease: 'easeOut' }}
                    className={isChatScreen ? 'h-full min-h-0 flex flex-col' : 'min-h-full'}
                  >
                    {currentScreen === 'home' && (
                      <HomeScreen
                        tasks={tasks}
                        activities={activities}
                        employees={DEMO_EMPLOYEES}
                        onNavigate={(s) => {
                          if (s === 'create-task') setCreatePresetCategory(null);
                          navigateTo(s, true);
                        }}
                        onSelectTask={handleSelectTask}
                        onQuickCreate={handleQuickCreate}
                        onViewHighPriority={() => {
                          setProjectFilter('all');
                          setTaskStatusFilter('all');
                          setTaskPriorityFilter('high');
                          navigateTo('tasks', true);
                        }}
                        onFilterFromStat={(filter) => {
                          setProjectFilter('all');
                          setTaskPriorityFilter('all');
                          setTaskStatusFilter(filter);
                          navigateTo('tasks', true);
                        }}
                        showHotspot={showHotspot}
                        onDismissHotspot={() => setShowHotspot(false)}
                      />
                    )}

                    {currentScreen === 'tasks' && (
                      <TasksScreen
                        tasks={tasks}
                        employees={DEMO_EMPLOYEES}
                        statusFilter={taskStatusFilter}
                        onStatusFilterChange={(f) => {
                          stopAutoplay();
                          setTaskStatusFilter(f);
                        }}
                        projectFilter={projectFilter}
                        onProjectFilterChange={(p) => {
                          stopAutoplay();
                          setProjectFilter(p);
                        }}
                        priorityFilter={taskPriorityFilter}
                        onClearPriorityFilter={() => {
                          stopAutoplay();
                          setTaskPriorityFilter('all');
                        }}
                        onSelectTask={handleSelectTask}
                        onCreateTaskClick={() => {
                          setCreatePresetCategory(null);
                          navigateTo('create-task', true);
                        }}
                        showHotspot={showHotspot}
                      />
                    )}

                    {currentScreen === 'task-details' && (
                      <TaskDetailScreen
                        task={activeDetailTask}
                        employees={DEMO_EMPLOYEES}
                        activities={activities}
                        onToggleChecklistStep={handleToggleChecklistStep}
                        onCompleteTask={handleCompleteTask}
                        onMarkInstallmentPaid={handleMarkInstallmentPaid}
                        onSendInstallmentReminder={handleSendInstallmentReminder}
                        onMessageEmployee={handleMessageEmployee}
                        onOpenMyTask={(id) => {
                          setMyTaskId(id);
                          navigateTo('my-task', true);
                        }}
                        onOpenShareSheet={handleOpenShareSheet}
                        onRemoveDocument={handleRemoveDocument}
                        onShowToast={(msg) => showToast(msg)}
                      />
                    )}

                    {currentScreen === 'create-task' && (
                      <CreateTaskScreen
                        employees={DEMO_EMPLOYEES}
                        presetCategory={createPresetCategory}
                        onCreateTask={handleCreateTask}
                        onShowToast={(msg) => showToast(msg)}
                      />
                    )}

                    {currentScreen === 'my-task' && (
                      <MyTaskScreen
                        task={activeMyTask}
                        employees={DEMO_EMPLOYEES}
                        onToggleWorkflowStep={handleToggleChecklistStep}
                        onToggleSnag={handleToggleSnag}
                        onAddSnag={handleAddSnag}
                        onAddNote={handleAddNote}
                        onAddPhoto={handleAddPhoto}
                        onRemovePhoto={handleRemovePhoto}
                        onAddDocument={handleAddDocument}
                        onRemoveDocument={handleRemoveDocument}
                        onCompleteTask={handleCompleteTask}
                        onOpenShareSheet={handleOpenShareSheet}
                        onShowToast={(msg) => showToast(msg)}
                      />
                    )}

                    {currentScreen === 'team-chat' && (
                      <TeamChatScreen
                        messages={messages}
                        tasks={tasks}
                        employees={DEMO_EMPLOYEES}
                        isTyping={isTyping}
                        onSendMessage={handleSendChatMessage}
                        onViewTask={handleSelectTask}
                        onNavigateHome={() => navigateTo('home', true)}
                        onShowToast={(msg) => showToast(msg)}
                      />
                    )}

                    {currentScreen === 'performance' && (
                      <PerformanceScreen
                        tasks={tasks}
                        employees={DEMO_EMPLOYEES}
                        remindedMember={remindedMember}
                        onRemindEmployee={handleRemindEmployee}
                        onSelectTask={handleSelectTask}
                        onViewAllTasks={() => {
                          setProjectFilter('all');
                          setTaskStatusFilter('all');
                          setTaskPriorityFilter('all');
                          navigateTo('tasks', true);
                        }}
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              </DeviceFrame>
            </div>

            {/* Mobile Step/Caption Horizontal Scroller (<= 640px only) */}
            <div className="w-full min-w-0 min-[641px]:hidden">
              <div
                ref={mobileScrollerRef}
                className="flex gap-3 overflow-x-auto no-scrollbar touch-scroll snap-x snap-mandatory py-1"
                role="tablist"
                aria-label={sectionText.screensTablistLabel}
              >
                {DEMO_SCREEN_ORDER.map((screenId, idx) => {
                  const screen = ui.screens[screenId];
                  const isActive = currentScreen === screenId;
                  const Icon = SCREEN_ICONS[screenId];
                  return (
                    <button
                      key={screenId}
                      ref={(el) => {
                        mobileChipRefs.current[screenId] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      onClick={() => handleStepSelect(idx)}
                      className={`snap-start min-h-[48px] w-[224px] shrink-0 rounded-2xl border-[1.5px] px-3.5 py-2.5 text-start transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                        isActive
                          ? 'border-primary/70 bg-primary/10'
                          : 'border-white/[0.08] bg-card/60 hover:border-primary/30'
                      }`}
                    >
                      <span className="flex items-center gap-2 text-xs font-semibold text-foreground whitespace-nowrap">
                        <Icon
                          className={`size-3.5 shrink-0 ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        />
                        <span
                          className={
                            isActive
                              ? 'text-gradient-brand tabular-nums'
                              : 'text-muted-foreground tabular-nums'
                          }
                        >
                          {screen.num}
                        </span>
                        <span className="truncate">{screen.title}</span>
                      </span>
                      <span className="mt-1 block text-[11px] leading-[1.55] text-muted-foreground whitespace-normal">
                        {screen.caption}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Active Screen Caption */}
            <div className="min-h-[3.25rem] max-w-xs px-2 text-center">
              <p className="text-xs font-semibold text-primary tabular-nums">
                {activeScreenMeta.num} · {activeScreenMeta.title}
              </p>
              <p className="mt-1 text-sm font-medium leading-relaxed text-foreground">
                {activeScreenMeta.caption}
              </p>
            </div>

            {/* Screen Navigation Controls */}
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <button
                type="button"
                onClick={handlePrevStep}
                aria-label={sectionText.prevScreenLabel}
                className="grid min-w-[44px] min-h-[44px] size-11 place-items-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <PrevIcon className="size-5" />
              </button>

              <div
                className="flex items-center"
                role="tablist"
                aria-label={sectionText.screenIndicatorLabel}
              >
                {DEMO_SCREEN_ORDER.map((screenId, idx) => {
                  const screen = ui.screens[screenId];
                  const isSelected = currentScreen === screenId;
                  return (
                    <button
                      key={screenId}
                      type="button"
                      role="tab"
                      aria-selected={isSelected}
                      aria-label={`${screen.num} ${screen.title}`}
                      onClick={() => handleStepSelect(idx)}
                      className="min-h-[44px] px-1 flex items-center justify-center cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary rounded-full"
                    >
                      <span
                        className={`block h-2.5 rounded-full transition-all duration-200 ${
                          isSelected
                            ? 'w-6 bg-gradient-brand'
                            : 'w-2.5 bg-foreground/25 hover:bg-foreground/45'
                        }`}
                      />
                    </button>
                  );
                })}
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                aria-label={sectionText.nextScreenLabel}
                className="grid min-w-[44px] min-h-[44px] size-11 place-items-center rounded-full border border-border bg-card text-foreground transition hover:border-primary/50 hover:text-primary cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <NextIcon className="size-5" />
              </button>
            </div>

            {/* Utility Bar */}
            <div className="flex flex-wrap items-center justify-center gap-2.5">
              <button
                type="button"
                onClick={handleResetDemo}
                className="min-h-[44px] inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground border border-border/80 bg-card/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                <RotateCcw className="size-3.5 text-primary" />
                <span>{sectionText.resetDemo}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  stopAutoplay();
                  setIsFullscreen((prev) => !prev);
                }}
                className="hidden min-[641px]:inline-flex min-h-[44px] items-center justify-center gap-1.5 px-4 py-2 rounded-full text-xs font-medium text-muted-foreground hover:text-foreground border border-border/80 bg-card/60 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                aria-pressed={isFullscreen}
              >
                {isFullscreen ? (
                  <Minimize2 className="size-3.5 text-primary" />
                ) : (
                  <Maximize2 className="size-3.5 text-primary" />
                )}
                <span>
                  {isFullscreen ? sectionText.collapsePhone : sectionText.expandPhone}
                </span>
              </button>
            </div>
          </div>

          {/* Column 2: Tablet 2-Col Grid OR Desktop Cards beside phone */}
          <div className="hidden min-[641px]:block w-full min-w-0">
            <ol
              ref={desktopCardsRef}
              aria-label={sectionText.workflowStepsListLabel}
              className="mx-auto grid max-w-2xl grid-cols-2 gap-3.5 auto-rows-fr min-[1025px]:mx-0 min-[1025px]:max-w-none min-[1025px]:grid-cols-1 min-[1025px]:gap-3 min-[1025px]:max-h-[760px] min-[1025px]:overflow-y-auto no-scrollbar"
            >
              {DEMO_SCREEN_ORDER.map((screenId, idx) => {
                const screen = ui.screens[screenId];
                const isActive = currentScreen === screenId;
                const Icon = SCREEN_ICONS[screenId];
                const isLastOdd = idx === DEMO_SCREEN_ORDER.length - 1;

                return (
                  <li
                    key={screenId}
                    className={`min-w-0 ${
                      isLastOdd
                        ? 'col-span-2 mx-auto w-[calc(50%-0.4375rem)] min-[1025px]:col-span-1 min-[1025px]:mx-0 min-[1025px]:w-full'
                        : 'w-full'
                    }`}
                  >
                    <button
                      type="button"
                      aria-current={isActive ? 'step' : undefined}
                      onClick={() => handleStepSelect(idx)}
                      className={`group grid h-full w-full grid-cols-[2.5rem_minmax(0,1fr)] items-start gap-3.5 rounded-2xl border-[1.5px] px-4 py-3 text-start shadow-[0_6px_22px_-12px_rgba(0,0,0,0.65)] transition-colors transition-shadow duration-200 motion-reduce:transition-none cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                        isActive
                          ? 'border-primary/75 bg-primary/[0.11] shadow-[0_10px_28px_-12px_rgba(26,209,209,0.28)]'
                          : 'border-white/[0.08] bg-card/55 hover:border-primary/35 hover:bg-card/85'
                      }`}
                    >
                      {/* Start Icon + Step Number Slot */}
                      <span className="flex flex-col items-center gap-1 pt-0.5">
                        <span
                          className={`grid size-8 place-items-center rounded-xl transition-colors duration-200 ${
                            isActive
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-white/[0.05] text-primary group-hover:bg-primary/15'
                          }`}
                        >
                          <Icon className="size-4" />
                        </span>
                        <span
                          className={`font-display text-[11px] font-semibold tabular-nums leading-none ${
                            isActive ? 'text-primary' : 'text-muted-foreground'
                          }`}
                        >
                          {screen.num}
                        </span>
                      </span>

                      {/* Content Slot */}
                      <span className="min-w-0 flex flex-col">
                        <span className="font-display text-[15px] font-semibold leading-snug text-foreground">
                          {screen.title}
                        </span>
                        <span className="mt-1 text-[13px] leading-[1.6] text-muted-foreground whitespace-normal break-words">
                          {screen.caption}
                        </span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </div>

      {/* Accessibility note for screen hint */}
      <p className="mt-6 text-center text-xs text-muted-foreground px-2">
        {sectionText.hint}
      </p>
    </MotionConfig>
  );
};
