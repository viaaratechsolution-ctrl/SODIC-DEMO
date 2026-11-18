import React, { useEffect, useRef, useState } from 'react';
import {
  Building2,
  Calendar,
  FileSignature,
  Headset,
  Home,
  KeyRound,
  MapPin,
  Send,
} from 'lucide-react';
import { AnimatePresence, motion, PanInfo, useDragControls } from 'motion/react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DemoTask, MatterCategory } from '../demoTypes';

interface ShareToChatSheetProps {
  task: DemoTask | null;
  isOpen: boolean;
  onClose: () => void;
  onSend: (task: DemoTask, note: string) => void;
}

const CATEGORY_ICONS: Record<MatterCategory, React.FC<{ className?: string }>> = {
  reservation: Home,
  handover: KeyRound,
  inspection: MapPin,
  contracts: FileSignature,
  'customer-care': Headset,
};

export const ShareToChatSheet: React.FC<ShareToChatSheetProps> = ({
  task,
  isOpen,
  onClose,
  onSend,
}) => {
  const { t, pick } = useLanguage();
  const sheetT = t.demoUi.shareSheet;
  const commonT = t.demoUi.common;

  const [note, setNote] = useState('');
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const touchStartYRef = useRef<number | null>(null);
  const dragControls = useDragControls();

  useEffect(() => {
    if (!isOpen) {
      setNote('');
      return;
    }

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === 'Tab' && sheetRef.current) {
        const focusables = Array.from(
          sheetRef.current.querySelectorAll<HTMLElement>(
            'button:not([disabled]), textarea:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
          )
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const activeEl = document.activeElement;

        if (!e.shiftKey && activeEl === last) {
          e.preventDefault();
          first.focus();
        } else if (e.shiftKey && (activeEl === first || !sheetRef.current.contains(activeEl))) {
          e.preventDefault();
          last.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const handleDragEnd = (_event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    if (info.offset.y > 55 || info.velocity.y > 300) {
      onClose();
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement | null;
    if (target?.tagName === 'TEXTAREA') {
      touchStartYRef.current = null;
      return;
    }
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartYRef.current === null) return;
    const deltaY = e.changedTouches[0].clientY - touchStartYRef.current;
    touchStartYRef.current = null;
    if (deltaY > 48) {
      onClose();
    }
  };

  const CategoryIcon = (task && CATEGORY_ICONS[task.category]) || Building2;

  return (
    <AnimatePresence>
      {isOpen && task && (
        <div
          className="absolute inset-0 z-50 flex flex-col justify-end text-start"
          role="dialog"
          aria-modal="true"
          aria-labelledby="share-sheet-title"
        >
          {/* Dimmed backdrop */}
          <motion.button
            type="button"
            aria-label={sheetT.closeLabel}
            tabIndex={-1}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/50 backdrop-blur-[1px] cursor-pointer"
          />

          {/* Sliding bottom sheet inside phone frame */}
          <motion.div
            ref={sheetRef}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            drag="y"
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 260 }}
            dragElastic={{ top: 0, bottom: 0.35 }}
            onDragEnd={handleDragEnd}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="relative z-10 w-full rounded-t-3xl bg-white px-4 pt-2.5 pb-[max(1.25rem,env(safe-area-inset-bottom))] shadow-[0_-12px_36px_rgba(15,23,42,0.2)] space-y-3.5"
          >
            {/* Drag handle + Title */}
            <div
              onPointerDown={(e) => dragControls.start(e)}
              className="touch-none cursor-grab active:cursor-grabbing space-y-2"
            >
              <div className="flex justify-center py-0.5" aria-hidden="true">
                <span className="h-1 w-10 rounded-full bg-slate-300" />
              </div>

              <div className="flex items-center justify-between gap-2">
                <h4
                  id="share-sheet-title"
                  className="text-[15px] font-bold text-slate-900"
                >
                  {sheetT.title}
                </h4>
              </div>
            </div>

            {/* Preview Card */}
            <div className="rounded-2xl bg-slate-50 border border-slate-200/80 p-3 flex items-start gap-2.5">
              <span className="size-9 rounded-xl bg-[#e3f5f1] text-[#0d9488] flex items-center justify-center shrink-0 mt-0.5">
                <CategoryIcon className="size-4.5" />
              </span>
              <div className="min-w-0 flex-1 space-y-1">
                <div className="flex items-center justify-between gap-1.5">
                  <span
                    dir="ltr"
                    className="rounded bg-white border border-slate-200 px-1.5 py-0.5 text-[9.5px] font-semibold text-slate-600 tabular-nums"
                  >
                    {task.matterRef}
                  </span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold shrink-0 ${
                      task.priority === 'high'
                        ? 'bg-[#fde8e8] text-[#b42318]'
                        : task.priority === 'medium'
                        ? 'bg-slate-200 text-slate-700'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {task.priority === 'high'
                      ? commonT.highPriority
                      : task.priority === 'medium'
                      ? commonT.mediumPriority
                      : commonT.lowPriority}
                  </span>
                </div>
                <p className="text-[12.5px] font-bold text-slate-900 leading-snug">
                  {pick(task.title, task.titleEn)}
                </p>
                <p className="flex items-center gap-1 text-[10.5px] font-medium text-slate-500 tabular-nums">
                  <Calendar className="size-3 text-[#0d9488] shrink-0" />
                  <span className="truncate">{pick(task.deadline, task.deadlineEn)}</span>
                </p>
              </div>
            </div>

            {/* Optional Note Field */}
            <div>
              <label htmlFor="share-note-input" className="sr-only">
                {sheetT.noteAriaLabel}
              </label>
              <textarea
                ref={inputRef}
                id="share-note-input"
                rows={2}
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder={sheetT.notePlaceholder}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-[12px] font-normal leading-[1.6] text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col gap-1.5">
              <button
                type="button"
                onClick={() => onSend(task, note.trim())}
                className="w-full min-h-[44px] rounded-xl bg-[#0d9488] text-white text-[13px] font-bold flex items-center justify-center gap-1.5 hover:bg-[#0b7f75] active:scale-[0.99] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                <Send className="size-3.5" />
                <span>{sheetT.sendBtn}</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="w-full min-h-[44px] rounded-xl text-[12px] font-semibold text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
              >
                {commonT.cancel}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
