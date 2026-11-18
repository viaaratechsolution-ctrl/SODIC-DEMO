import React, { useState } from 'react';
import { ArrowLeft, ArrowRight, Bell, Building2, CheckCircle2, Share2 } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { CURRENT_USER } from '../demoData';
import { DemoNotification } from '../demoTypes';

interface DemoHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  onBack?: () => void;
  notifications: DemoNotification[];
  onNotificationClick: (notif: DemoNotification) => void;
  onMarkAllRead: () => void;
  onShowToast: (msg: string) => void;
  onShareClick?: (triggerEl: HTMLButtonElement) => void;
  rightSlot?: React.ReactNode;
}

export const DemoHeader: React.FC<DemoHeaderProps> = ({
  title,
  subtitle,
  showBack = true,
  onBack,
  notifications,
  onNotificationClick,
  onMarkAllRead,
  onShowToast,
  onShareClick,
  rightSlot,
}) => {
  const { t, isRtl, pick } = useLanguage();
  const h = t.demoUi.header;
  const firm = t.demoUi.firm;
  const [showNotifs, setShowNotifs] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  const unreadCount = notifications.filter((n) => n.unread).length;
  const userName = pick(CURRENT_USER.name, CURRENT_USER.nameEn);
  const userRole = pick(CURRENT_USER.role, CURRENT_USER.roleEn);
  const BackArrow = isRtl ? ArrowRight : ArrowLeft;

  return (
    <header className="relative z-20 shrink-0 bg-white border-b border-slate-100 px-3 py-2 flex items-center justify-between gap-2">
      {/* Start: Back arrow + Title */}
      <div className="flex items-center gap-1.5 min-w-0">
        {showBack && (
          <button
            type="button"
            onClick={onBack}
            aria-label={h.backLabel}
            className="min-w-[44px] min-h-[44px] -ms-1.5 rounded-full flex items-center justify-center text-slate-700 hover:bg-slate-100 active:scale-95 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 shrink-0"
          >
            <BackArrow className="size-4.5" />
          </button>
        )}
        <div className="min-w-0 text-start">
          <h3 className="text-[15px] font-bold text-slate-900 leading-tight truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-[9.5px] font-semibold text-slate-500 truncate mt-0.5 flex items-center gap-1">
              <span
                className="inline-block size-1.5 rounded-full bg-[#0d9488] shrink-0"
                aria-hidden="true"
              />
              <span className="truncate">{subtitle}</span>
            </p>
          )}
        </div>
      </div>

      {/* End: Bell + Avatar + Optional Share */}
      {rightSlot ?? (
        <div className="flex items-center gap-0.5 shrink-0">
          {/* Bell icon */}
          <button
            type="button"
            onClick={() => {
              setShowProfile(false);
              setShowNotifs((prev) => !prev);
            }}
            aria-label={h.notificationsLabel}
            aria-expanded={showNotifs}
            className="relative min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
          >
            <Bell className="size-[18px]" />
            {unreadCount > 0 && (
              <span
                className="absolute top-2.5 end-2.5 size-2 rounded-full bg-[#0d9488] ring-2 ring-white"
                aria-hidden="true"
              />
            )}
          </button>

          {/* Avatar */}
          <button
            type="button"
            onClick={() => {
              setShowNotifs(false);
              setShowProfile((prev) => !prev);
            }}
            aria-label={`${h.profileButtonPrefix} ${userName}`}
            aria-expanded={showProfile}
            className={`min-w-[44px] min-h-[44px] rounded-full flex items-center justify-center hover:bg-slate-100 active:scale-95 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
              onShareClick ? '' : '-me-1.5'
            }`}
          >
            <img
              src={CURRENT_USER.avatar}
              alt={userName}
              className="size-8 rounded-full object-cover ring-1 ring-slate-200"
            />
          </button>

          {onShareClick && (
            <button
              type="button"
              onClick={(e) => {
                setShowNotifs(false);
                setShowProfile(false);
                onShareClick(e.currentTarget);
              }}
              aria-label={h.shareTaskLabel}
              className="min-w-[44px] min-h-[44px] -me-1.5 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-100 hover:text-[#0d9488] active:scale-95 transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <Share2 className="size-[18px]" />
            </button>
          )}
        </div>
      )}

      {/* Notifications Popover */}
      {showNotifs && (
        <div
          role="dialog"
          aria-label={h.notificationsDialogLabel}
          className="absolute end-3 top-14 w-[285px] rounded-2xl bg-white border border-slate-200 shadow-xl p-3 z-40 text-start"
        >
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-100">
            <span className="text-xs font-bold text-slate-900">{h.teamNotificationsTitle}</span>
            <button
              type="button"
              onClick={() => {
                onMarkAllRead();
                setShowNotifs(false);
              }}
              className="text-[11px] font-semibold text-teal-600 hover:text-teal-700 cursor-pointer"
            >
              {h.markAllRead}
            </button>
          </div>
          <ul className="space-y-1.5 max-h-52 overflow-y-auto">
            {notifications.map((notif) => (
              <li key={notif.id}>
                <button
                  type="button"
                  onClick={() => {
                    setShowNotifs(false);
                    onNotificationClick(notif);
                  }}
                  className={`w-full text-start rounded-xl p-2 text-[11px] transition cursor-pointer flex items-start gap-2 ${
                    notif.unread ? 'bg-teal-50/70 hover:bg-teal-50' : 'hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2
                    className={`size-3.5 mt-0.5 shrink-0 ${
                      notif.unread ? 'text-teal-600' : 'text-slate-400'
                    }`}
                  />
                  <span className="flex-1">
                    <span className="block font-medium text-slate-800 leading-relaxed">
                      {pick(notif.title, notif.titleEn)}
                    </span>
                    <span className="block text-[10px] text-slate-400 mt-0.5">
                      {pick(notif.time, notif.timeEn)}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Profile Popover */}
      {showProfile && (
        <div
          role="dialog"
          aria-label={h.profileDialogLabel}
          className="absolute end-3 top-14 w-[245px] rounded-2xl bg-white border border-slate-200 shadow-xl p-3.5 z-40 text-start"
        >
          <div className="flex items-center gap-2.5 pb-2.5 border-b border-slate-100">
            <img
              src={CURRENT_USER.avatar}
              alt={userName}
              className="size-9 rounded-full object-cover"
            />
            <div className="min-w-0">
              <p className="text-xs font-bold text-slate-900 truncate">{userName}</p>
              <p className="text-[10px] text-slate-500 truncate">{userRole}</p>
            </div>
          </div>
          <div className="pt-2.5 space-y-1">
            <button
              type="button"
              onClick={() => {
                setShowProfile(false);
                onShowToast(firm.workspaceTag);
              }}
              className="w-full flex items-center gap-2 rounded-lg px-2 py-1.5 text-[11px] font-medium text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <Building2 className="size-3.5 text-teal-600 shrink-0" />
              <span className="truncate">{firm.workspaceTag}</span>
            </button>
            <button
              type="button"
              onClick={() => {
                setShowProfile(false);
                onShowToast(h.fullVersionToast);
              }}
              className="w-full text-start rounded-lg px-2 py-1.5 text-[11px] font-medium text-slate-500 hover:bg-slate-50 cursor-pointer"
            >
              {h.workspaceSettings}
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
