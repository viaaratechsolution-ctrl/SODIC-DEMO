import React from 'react';
import { LayoutGrid, ListChecks, MessageSquare, TrendingUp } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';
import { DemoScreenId } from '../demoTypes';

interface DemoBottomNavProps {
  currentScreen: DemoScreenId;
  onNavigate: (screen: DemoScreenId) => void;
  unreadChatCount?: number;
}

export const DemoBottomNav: React.FC<DemoBottomNavProps> = ({
  currentScreen,
  onNavigate,
  unreadChatCount = 0,
}) => {
  const { t } = useLanguage();
  const navT = t.demoUi.navTabs;

  const activeTab: DemoScreenId =
    currentScreen === 'task-details' ||
    currentScreen === 'create-task' ||
    currentScreen === 'my-task'
      ? 'tasks'
      : currentScreen;

  // CSS grid automatically flows right-to-left in dir="rtl" and left-to-right in dir="ltr"
  const items: { id: DemoScreenId; label: string; icon: React.FC<{ className?: string }> }[] = [
    { id: 'home', label: navT.home, icon: LayoutGrid },
    { id: 'tasks', label: navT.tasks, icon: ListChecks },
    { id: 'team-chat', label: navT.chat, icon: MessageSquare },
    { id: 'performance', label: navT.performance, icon: TrendingUp },
  ];

  return (
    <nav
      aria-label={navT.ariaLabel}
      className="shrink-0 bg-white border-t border-slate-100 px-2 py-1 grid grid-cols-4 items-center z-20"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onNavigate(item.id)}
            aria-current={isActive ? 'page' : undefined}
            className={`relative min-h-[46px] flex flex-col items-center justify-center gap-1 rounded-xl transition cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 ${
              isActive
                ? 'text-[#0d9488]'
                : 'text-slate-500 hover:text-slate-800 hover:bg-slate-50'
            }`}
          >
            <span className="relative">
              <Icon className={`size-[18px] ${isActive ? 'stroke-[2.3]' : 'stroke-[1.8]'}`} />
              {item.id === 'team-chat' && unreadChatCount > 0 && (
                <span className="absolute -top-1 -end-1.5 min-w-[14px] h-[14px] px-1 rounded-full bg-[#0d9488] text-white text-[9px] font-bold flex items-center justify-center leading-none">
                  {unreadChatCount}
                </span>
              )}
            </span>
            <span className={`text-[10.5px] leading-none ${isActive ? 'font-bold' : 'font-medium'}`}>
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};
