import React, { useEffect, useRef, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Calendar,
  Camera,
  CheckCheck,
  Clock,
  Home,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
} from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DemoEmployee, DemoMessage, DemoTask } from '../demoTypes';

interface TeamChatScreenProps {
  messages: DemoMessage[];
  tasks: DemoTask[];
  employees: DemoEmployee[];
  isTyping: boolean;
  onSendMessage: (text: string) => void;
  onViewTask: (taskId: string) => void;
  onNavigateHome: () => void;
  onShowToast: (msg: string) => void;
}

const EMOJI_CHOICES = ['🏡', '📄', '✅', '👏', '📅', '🔑'];

export const TeamChatScreen: React.FC<TeamChatScreenProps> = ({
  messages,
  tasks,
  employees,
  isTyping,
  onSendMessage,
  onViewTask,
  onNavigateHome,
  onShowToast,
}) => {
  const { isRtl, t, pick } = useLanguage();
  const c = t.demoUi.teamChat;
  const common = t.demoUi.common;
  const DetailsArrow = isRtl ? ArrowLeft : ArrowRight;

  const [inputText, setInputText] = useState('');
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const messagesScrollRef = useRef<HTMLDivElement | null>(null);
  const menuContainerRef = useRef<HTMLDivElement | null>(null);
  const emojiContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = messagesScrollRef.current;
    if (!el) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    el.scrollTo({
      top: el.scrollHeight,
      behavior: prefersReducedMotion ? 'auto' : 'smooth',
    });
  }, [messages.length, isTyping]);

  useEffect(() => {
    if (!menuOpen && !emojiOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        setEmojiOpen(false);
      }
    };
    const handlePointerDown = (e: PointerEvent) => {
      const target = e.target as Node | null;
      if (
        menuOpen &&
        menuContainerRef.current &&
        target &&
        !menuContainerRef.current.contains(target)
      ) {
        setMenuOpen(false);
      }
      if (
        emojiOpen &&
        emojiContainerRef.current &&
        target &&
        !emojiContainerRef.current.contains(target)
      ) {
        setEmojiOpen(false);
      }
    };
    document.addEventListener('keydown', handleKey);
    document.addEventListener('pointerdown', handlePointerDown);
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [menuOpen, emojiOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = inputText.trim();
    if (!trimmed) return;
    onSendMessage(trimmed);
    setInputText('');
    setEmojiOpen(false);
  };

  const getEmployeeName = (assigneeId: string) => {
    const emp = employees.find((e) => e.id === assigneeId);
    return emp ? pick(emp.name, emp.nameEn) : common.defaultAssigneeLabel;
  };

  const getTask = (taskId: string) => tasks.find((item) => item.id === taskId);

  return (
    <div className="flex flex-col h-full min-h-0 overflow-hidden bg-[#f8fafc] text-start">
      {/* Pinned Group Card cleanly under status bar */}
      <div className="relative z-20 shrink-0 px-3.5 pt-2 pb-2 bg-[#f8fafc] border-b border-slate-200/60">
        <div className="rounded-2xl bg-white p-3 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2.5 min-w-0">
            <span
              aria-hidden="true"
              className="size-10 rounded-full bg-[#e6f7f5] text-[#0d9488] ring-1 ring-teal-200/70 flex items-center justify-center shrink-0"
            >
              <Building2 className="size-5" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <p className="text-[13px] font-bold text-slate-900 truncate">
                  {t.demoUi.firm.firmName}
                </p>
                <span
                  aria-label={c.verifiedChannelLabel}
                  className="size-3.5 rounded-full bg-[#0d9488] text-white inline-flex items-center justify-center text-[8px] font-bold shrink-0"
                >
                  ✓
                </span>
              </div>
              <p className="text-[10.5px] font-medium text-slate-500 truncate">
                {t.demoUi.firm.channelSubtitle}
              </p>
            </div>
          </div>

          <div ref={menuContainerRef} className="relative shrink-0">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={c.chatOptionsLabel}
              aria-expanded={menuOpen}
              className="min-w-[44px] min-h-[44px] -me-1.5 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-100 active:scale-95 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <MoreVertical className="size-4" />
            </button>

            {menuOpen && (
              <div
                role="menu"
                aria-label={c.chatActionsLabel}
                className="absolute end-0 top-12 z-40 w-44 rounded-xl bg-white border border-slate-200 shadow-lg p-1"
              >
                <button
                  type="button"
                  role="menuitem"
                  onClick={() => {
                    setMenuOpen(false);
                    onNavigateHome();
                  }}
                  className="w-full min-h-[44px] flex items-center gap-2 rounded-lg px-2.5 py-2 text-[12px] font-bold text-slate-800 hover:bg-slate-50 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                >
                  <Home className="size-3.5 text-[#0d9488] shrink-0" />
                  <span>{c.backToHome}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Independently Scrollable Message Thread */}
      <div
        ref={messagesScrollRef}
        className="min-h-0 flex-1 overflow-y-auto touch-scroll no-scrollbar px-3.5 py-3 space-y-3"
      >
        <div className="flex justify-center">
          <span className="inline-flex items-center gap-1 rounded-full bg-slate-200/75 px-3 py-1 text-[10px] font-semibold text-slate-600">
            <Calendar className="size-2.5" />
            <span>{c.todayBadge}</span>
          </span>
        </div>

        {messages.map((msg) => {
          const attached = msg.attachedTaskId ? getTask(msg.attachedTaskId) : undefined;
          // User's own messages (isSelf) always sit on the RIGHT; colleagues sit on the LEFT
          const alignClass = msg.isSelf
            ? isRtl
              ? 'items-start'
              : 'items-end'
            : isRtl
            ? 'items-end'
            : 'items-start';

          const senderName = pick(msg.senderName, msg.senderNameEn);
          const senderRole = pick(msg.senderRole, msg.senderRoleEn);
          const msgTime = msg.time ? pick(msg.time, msg.timeEn) : undefined;

          if (attached) {
            const isCompleted = attached.status === 'completed';
            return (
              <div key={msg.id} className={`flex flex-col ${alignClass}`}>
                <div className="flex items-center gap-1.5 mb-1">
                  <span className="text-[10.5px] font-semibold text-slate-800">
                    {senderName}
                  </span>
                  <span className="rounded bg-[#e3f5f1] text-[#0b7a6c] px-1.5 py-0.5 text-[9px] font-semibold">
                    {senderRole}
                  </span>
                </div>

                <div className="w-[88%] rounded-2xl bg-white p-3.5 shadow-[0_2px_12px_rgba(15,23,42,0.05)] border border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[9.5px] font-semibold text-slate-500">
                        {c.attachedTaskLabel}
                      </span>
                      <span
                        dir="ltr"
                        className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-600 tabular-nums"
                      >
                        {attached.matterRef}
                      </span>
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold shrink-0 ${
                        isCompleted
                          ? 'bg-[#e3f5f1] text-[#0b7a6c]'
                          : attached.status === 'site-visit'
                          ? 'bg-amber-50 text-amber-800'
                          : attached.status === 'overdue'
                          ? 'bg-[#fde8e8] text-[#b42318]'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      ●{' '}
                      {isCompleted
                        ? common.completed
                        : attached.status === 'site-visit'
                        ? common.siteVisit
                        : attached.status === 'overdue'
                        ? common.overdue
                        : attached.status === 'in-progress'
                        ? common.inProgress
                        : common.pending}
                    </span>
                  </div>

                  <p className="text-[13px] font-bold text-slate-900 leading-snug">
                    {pick(attached.title, attached.titleEn)}
                  </p>

                  <div className="flex items-center justify-between gap-2 rounded-xl bg-slate-50 px-2.5 py-2 text-[10px] text-slate-500">
                    <span className="inline-flex items-center gap-1 min-w-0 tabular-nums">
                      <Clock className="size-3 shrink-0" />
                      <span className="truncate">
                        {pick(attached.deadline, attached.deadlineEn)}
                      </span>
                    </span>
                    <span className="font-semibold text-slate-700 shrink-0">
                      {getEmployeeName(attached.assigneeId)}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onViewTask(attached.id)}
                    className="w-full min-h-[44px] rounded-xl bg-[#0d9488] text-white text-[12px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#0b7f75] active:scale-[0.99] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
                  >
                    <span>{c.viewDetails}</span>
                    <DetailsArrow className="size-3.5" />
                  </button>

                  {msgTime && (
                    <div className="flex items-center justify-end gap-1 text-[9.5px] font-medium text-slate-400 tabular-nums">
                      <span>{msgTime}</span>
                      {msg.isSelf && <CheckCheck className="size-3 text-[#0d9488]" />}
                    </div>
                  )}
                </div>
              </div>
            );
          }

          return (
            <div key={msg.id} className={`flex flex-col ${alignClass}`}>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="text-[10.5px] font-semibold text-slate-800">
                  {senderName}
                </span>
                <span
                  className={`text-[9.5px] font-medium ${
                    msg.isLead
                      ? 'rounded bg-[#e3f5f1] text-[#0b7a6c] px-1.5 py-0.5 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  {senderRole}
                </span>
              </div>

              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 shadow-[0_1px_6px_rgba(15,23,42,0.04)] ${
                  msg.isSelf
                    ? 'bg-[#e3f5f1] text-slate-800 rounded-tr-sm'
                    : 'bg-white text-slate-800 border border-slate-100 rounded-tl-sm'
                }`}
              >
                <p className="text-[12px] font-normal leading-[1.6]">
                  {pick(msg.text, msg.textEn)}
                </p>
                <div className="mt-1 flex items-center justify-end gap-1 text-[9.5px] font-medium text-slate-400 tabular-nums">
                  <span>{msgTime}</span>
                  {msg.isSelf && <CheckCheck className="size-3 text-[#0d9488]" />}
                </div>
              </div>
            </div>
          );
        })}

        {isTyping && (
          <div className={`flex ${isRtl ? 'justify-end' : 'justify-start'}`}>
            <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-100 px-3 py-1.5 shadow-sm">
              <span className="flex items-center gap-1" aria-hidden="true">
                <span className="size-1.5 rounded-full bg-[#0d9488] animate-bounce motion-reduce:animate-none" />
                <span className="size-1.5 rounded-full bg-[#0d9488] animate-bounce [animation-delay:120ms] motion-reduce:animate-none" />
                <span className="size-1.5 rounded-full bg-[#0d9488] animate-bounce [animation-delay:240ms] motion-reduce:animate-none" />
              </span>
              <span className="text-[10.5px] font-medium text-slate-500">
                {c.saraTyping}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Fixed Bottom Composer Bar */}
      <div
        ref={emojiContainerRef}
        className="relative z-20 shrink-0 bg-white border-t border-slate-200/80 shadow-[0_-4px_16px_rgba(15,23,42,0.05)] px-1.5 pt-2 pb-[max(1.25rem,env(safe-area-inset-bottom))]"
      >
        {emojiOpen && (
          <div
            role="dialog"
            aria-label={c.emojiDialogLabel}
            className="absolute bottom-16 end-3 rounded-2xl bg-white border border-slate-200 shadow-lg p-1.5 flex items-center gap-1 z-30"
          >
            {EMOJI_CHOICES.map((emoji) => (
              <button
                key={emoji}
                type="button"
                onClick={() => {
                  setInputText((prev) => `${prev}${emoji}`);
                  setEmojiOpen(false);
                }}
                className="min-w-[44px] min-h-[44px] rounded-xl text-base hover:bg-slate-100 cursor-pointer flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {emoji}
              </button>
            ))}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex items-center gap-0.5">
          <button
            type="button"
            onClick={() => onShowToast(t.demoUi.header.fullVersionToast)}
            aria-label={c.takePhotoLabel}
            className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Camera className="size-4" />
          </button>

          <button
            type="button"
            onClick={() => onShowToast(t.demoUi.header.fullVersionToast)}
            aria-label={c.attachFileLabel}
            className="min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Paperclip className="size-4" />
          </button>

          <div className="relative flex-1 min-w-0 flex items-center">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={c.composerPlaceholder}
              aria-label={c.composerAriaLabel}
              className="w-full min-h-[44px] rounded-full bg-slate-100 ps-3.5 pe-11 text-[12px] text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:bg-white border border-transparent focus:border-teal-400"
            />
            <button
              type="button"
              onClick={() => setEmojiOpen((prev) => !prev)}
              aria-label={c.insertEmojiLabel}
              aria-expanded={emojiOpen}
              className="absolute end-0 min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Smile className="size-4" />
            </button>
          </div>

          <button
            type="submit"
            aria-label={c.sendMessageLabel}
            className="min-w-[44px] min-h-[44px] size-11 rounded-full bg-[#0d9488] text-white flex items-center justify-center hover:bg-[#0b7f75] active:scale-95 transition cursor-pointer shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Send className="size-4" />
          </button>
        </form>
      </div>
    </div>
  );
};
