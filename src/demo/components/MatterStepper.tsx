import React from 'react';
import { Check } from 'lucide-react';
import { useLanguage } from '../../i18n/LanguageContext';

interface MatterStepperProps {
  stages: [string, string, string, string];
  progress: number;
}

export const MatterStepper: React.FC<MatterStepperProps> = ({ stages, progress }) => {
  const { t } = useLanguage();
  const activeStageIdx =
    progress >= 100 ? 4 : progress >= 55 ? 2 : progress > 0 ? 1 : 0;

  return (
    <div className="rounded-2xl bg-white p-4 shadow-[0_2px_10px_rgba(15,23,42,0.04)] border border-slate-100">
      <div className="flex items-center justify-between gap-2 mb-3">
        <span className="text-[11px] font-bold text-slate-500">
          {t.demoUi.stepper.title}
        </span>
        <span className="rounded-full bg-[#e3f5f1] text-[#0b7a6c] px-2.5 py-0.5 text-[10.5px] font-extrabold tabular-nums">
          {progress}%
        </span>
      </div>

      <div className="grid grid-cols-4 gap-1 relative">
        {stages.map((stage, idx) => {
          const isDone = idx < activeStageIdx;
          const isCurrent = idx === activeStageIdx && progress < 100;

          return (
            <div key={`${stage}-${idx}`} className="relative flex flex-col items-center text-center">
              {/* Connector line to next stage (logical start -> end mirrors RTL/LTR automatically) */}
              {idx < stages.length - 1 && (
                <div
                  aria-hidden="true"
                  className={`absolute top-3 start-[calc(50%+12px)] end-[calc(-50%+12px)] h-[2px] ${
                    idx < activeStageIdx - 1 || (idx === activeStageIdx - 1 && progress >= 100)
                      ? 'bg-[#0d9488]'
                      : idx < activeStageIdx
                      ? 'bg-[#0d9488]/60'
                      : 'bg-slate-200'
                  }`}
                />
              )}

              <span
                className={`relative z-10 size-6 rounded-full flex items-center justify-center text-[10px] font-bold border transition tabular-nums ${
                  isDone
                    ? 'bg-[#0d9488] border-[#0d9488] text-white'
                    : isCurrent
                    ? 'bg-[#e6f7f5] border-[#0d9488] text-[#0b7a6c]'
                    : 'bg-white border-slate-200 text-slate-400'
                }`}
              >
                {isDone ? <Check className="size-3.5 stroke-[3]" /> : idx + 1}
              </span>

              <span
                className={`mt-1.5 text-[10px] leading-snug px-0.5 ${
                  isDone || isCurrent ? 'font-bold text-slate-800' : 'font-medium text-slate-400'
                }`}
              >
                {stage}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
