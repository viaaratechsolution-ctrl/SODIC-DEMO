import React, { useEffect, useRef, useState } from 'react';
import { Wifi, Signal, BatteryMedium } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useLanguage } from '../i18n/LanguageContext';

export interface DemoToastData {
  id?: number;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface DeviceFrameProps {
  children: React.ReactNode;
  header?: React.ReactNode;
  bottomNav?: React.ReactNode;
  overlay?: React.ReactNode;
  toast?: DemoToastData | null;
  currentTime?: string;
  onSwipeNext?: () => void;
  onSwipePrev?: () => void;
  onInteract?: () => void;
  isFocusMode?: boolean;
  resetScrollKey?: string | number;
  lockOuterScroll?: boolean;
  hideHomeIndicator?: boolean;
}

const BASE_PHONE_WIDTH = 360;
const BASE_PHONE_HEIGHT = 760;
const EXPANDED_PHONE_WIDTH = 400;
const EXPANDED_PHONE_HEIGHT = 844;

export const DeviceFrame: React.FC<DeviceFrameProps> = ({
  children,
  header,
  bottomNav,
  overlay,
  toast,
  currentTime = '9:41',
  onSwipeNext,
  onSwipePrev,
  onInteract,
  isFocusMode = false,
  resetScrollKey,
  lockOuterScroll = false,
  hideHomeIndicator = false,
}) => {
  const { dir, isRtl } = useLanguage();
  const touchStartX = useRef<number | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);

  const designWidth = isFocusMode ? EXPANDED_PHONE_WIDTH : BASE_PHONE_WIDTH;
  const designHeight = isFocusMode ? EXPANDED_PHONE_HEIGHT : BASE_PHONE_HEIGHT;

  const [scale, setScale] = useState<number>(1);

  useEffect(() => {
    const el = measureRef.current;
    if (!el) return;

    const updateScale = () => {
      const availableWidth = el.getBoundingClientRect().width;
      if (availableWidth > 0) {
        setScale(Math.min(1, availableWidth / designWidth));
      }
    };

    updateScale();

    if (typeof ResizeObserver === 'undefined') {
      window.addEventListener('resize', updateScale);
      return () => window.removeEventListener('resize', updateScale);
    }

    const observer = new ResizeObserver(updateScale);
    observer.observe(el);
    return () => observer.disconnect();
  }, [designWidth]);

  useEffect(() => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [resetScrollKey]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    onInteract?.();
  };

  // Swipe direction mirrors naturally with RTL vs LTR reading order
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;

    if (Math.abs(deltaX) > 48) {
      const isForwardSwipe = isRtl ? deltaX > 0 : deltaX < 0;
      if (isForwardSwipe) {
        onSwipeNext?.();
      } else {
        onSwipePrev?.();
      }
    }
  };

  const scaledHeight = Math.round(designHeight * scale);

  return (
    <div
      ref={measureRef}
      style={{ width: isFocusMode ? 'min(100%, 400px)' : 'min(100%, 360px)' }}
      className="mx-auto max-w-full min-w-0 flex justify-center touch-pan-y select-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onPointerDown={() => onInteract?.()}
    >
      {/* Scaled container preserves exact phone proportions */}
      <div
        className="relative"
        style={{
          width: `${Math.round(designWidth * scale)}px`,
          height: `${scaledHeight}px`,
        }}
      >
        {/* Glow behind the phone */}
        <div
          className="pointer-events-none absolute -inset-6 sm:-inset-8 rounded-[4rem] bg-gradient-brand opacity-20 blur-3xl"
          aria-hidden="true"
        />

        <div
          className="absolute left-0 top-0 origin-top-left transition-transform duration-200 motion-reduce:transition-none"
          style={{
            width: `${designWidth}px`,
            height: `${designHeight}px`,
            transform: scale < 1 ? `scale(${scale})` : undefined,
          }}
        >
          {/* Side physical buttons */}
          <span
            className="hidden sm:block absolute -left-[3px] top-28 h-8 w-[3px] rounded-l bg-zinc-700"
            aria-hidden="true"
          />
          <span
            className="hidden sm:block absolute -left-[3px] top-40 h-14 w-[3px] rounded-l bg-zinc-700"
            aria-hidden="true"
          />
          <span
            className="hidden sm:block absolute -left-[3px] top-56 h-14 w-[3px] rounded-l bg-zinc-700"
            aria-hidden="true"
          />
          <span
            className="hidden sm:block absolute -right-[3px] top-44 h-20 w-[3px] rounded-r bg-zinc-700"
            aria-hidden="true"
          />

          {/* Outer Bezel */}
          <div className="relative h-full w-full rounded-[3.25rem] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-700 p-[3px] shadow-[0_40px_80px_-30px_rgba(0,0,0,0.8)]">
            <div className="h-full w-full rounded-[3.1rem] bg-zinc-950 p-[10px]">
              {/* Fixed 9:19 display screen inside bezel */}
              <div
                dir={dir}
                className="demo-phone relative flex h-full w-full flex-col overflow-hidden rounded-[2.5rem] bg-[#f8fafc] text-slate-900 shadow-inner"
              >
                {/* Status Bar (always LTR physical icon layout for phone hardware top bar) */}
                <div
                  dir="ltr"
                  className="relative z-30 flex h-11 shrink-0 items-center justify-between bg-white px-7 pt-1 text-[13px] font-semibold text-slate-900 select-none"
                >
                  <span className="tabular-nums">{currentTime}</span>

                  {/* Dynamic Island */}
                  <span
                    className="absolute left-1/2 top-2 h-[26px] w-[96px] -translate-x-1/2 rounded-full bg-black shadow-sm"
                    aria-hidden="true"
                  />

                  {/* Status Icons */}
                  <span className="flex items-center gap-1" aria-hidden="true">
                    <Signal className="size-3.5" />
                    <Wifi className="size-3.5" />
                    <BatteryMedium className="size-4" />
                  </span>
                </div>

                {/* Sticky App Header */}
                {header}

                {/* Internal App Viewport */}
                <div
                  ref={viewportRef}
                  dir={dir}
                  className={
                    lockOuterScroll
                      ? 'relative min-h-0 flex-1 flex flex-col overflow-hidden bg-[#f8fafc] select-text'
                      : 'relative min-h-0 flex-1 overflow-y-auto touch-scroll no-scrollbar bg-[#f8fafc] select-text'
                  }
                >
                  {children}
                </div>

                {/* In-Phone Toast Notification with optional inline action */}
                <AnimatePresence>
                  {toast && (
                    <motion.div
                      key={toast.id ?? toast.message}
                      role="status"
                      aria-live="polite"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18 }}
                      className={`absolute inset-x-3 z-40 rounded-xl bg-slate-900/95 text-white px-3 py-2 text-[11.5px] font-semibold shadow-lg flex items-center justify-between gap-2 ${
                        bottomNav ? 'bottom-16' : 'bottom-20'
                      }`}
                    >
                      <span className="flex items-center gap-2 min-w-0">
                        <span
                          className="size-2 rounded-full bg-[#1ad1d1] shrink-0"
                          aria-hidden="true"
                        />
                        <span className="truncate">{toast.message}</span>
                      </span>
                      {toast.actionLabel && toast.onAction && (
                        <button
                          type="button"
                          onClick={toast.onAction}
                          className="shrink-0 rounded-lg bg-[#0d9488] px-2.5 py-1 text-[11px] font-bold text-white hover:bg-[#0b7f75] transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1ad1d1]"
                        >
                          {toast.actionLabel}
                        </button>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Sticky Bottom Tab Bar */}
                {bottomNav}

                {/* Home Indicator with safe-area padding */}
                {!hideHomeIndicator && (
                  <div
                    className="z-30 flex h-5 shrink-0 items-start justify-center bg-white pb-[env(safe-area-inset-bottom)] select-none"
                    aria-hidden="true"
                  >
                    <span className="mt-1.5 h-1 w-28 rounded-full bg-slate-300" />
                  </div>
                )}

                {/* In-Phone Modal / Bottom Sheet Overlay Slot */}
                {overlay}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
