import React from 'react';
import { DASHBOARD_SECTIONS, DashboardSection } from '../../data/budgetData.ts';

interface TimelineSidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
  onHoverSection: (section: DashboardSection | null) => void;
}

export const TimelineSidebar: React.FC<TimelineSidebarProps> = ({
  activeSection,
  onSelectSection,
  onHoverSection
}) => {
  const activeIndex = DASHBOARD_SECTIONS.findIndex(s => s.id === activeSection);
  const currentActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  // Percentage along the timeline for the sliding line (from top 0 to bottom)
  const activeProgressPct = (currentActiveIndex / (DASHBOARD_SECTIONS.length - 1)) * 100;

  return (
    <aside
      className="hidden md:flex fixed left-5 lg:left-8 top-0 bottom-0 h-screen z-50 flex-col items-center select-none pointer-events-none"
      aria-label="White Vertical Timeline Navigation"
    >
      <div className="relative flex flex-col items-center justify-between h-full w-8 py-8 sm:py-10">
        {/* Continuous Thin White Line: Spans fully from top-0 to bottom-0 */}
        <div
          className="absolute top-0 bottom-0 w-[1px] bg-white/20 left-1/2 -translate-x-1/2"
          aria-hidden="true"
        />

        {/* Sliding Active White Progress Line: Starts from top-0 to current position */}
        <div
          className="absolute top-0 w-[1.5px] bg-white left-1/2 -translate-x-1/2 transition-all duration-500 ease-out shadow-[0_0_8px_rgba(255,255,255,0.6)]"
          style={{
            height: `calc(2rem + ${activeProgressPct * 0.88}%)`
          }}
          aria-hidden="true"
        />

        {/* 15 Circles Spread Out Across Full Height, Smaller Size */}
        {DASHBOARD_SECTIONS.map((sec, idx) => {
          const isActive = idx === currentActiveIndex;
          const isPast = idx < currentActiveIndex;

          return (
            <div
              key={sec.id}
              className="relative flex items-center justify-center my-auto pointer-events-auto"
              onMouseEnter={() => onHoverSection(sec)}
              onMouseLeave={() => onHoverSection(null)}
            >
              {/* Hit area button: larger for easy click/touch, while the visible dot is delicate and small */}
              <button
                onClick={() => {
                  onSelectSection(sec.id);
                  onHoverSection(null);
                }}
                className="w-6 h-6 flex items-center justify-center cursor-pointer focus:outline-none"
                aria-label={`Jump to Section ${sec.pageNum}: ${sec.navLabel}`}
              >
                {/* Visual Circle (Dramatically smaller, pure white) */}
                <span
                  className={`rounded-full transition-all duration-300 block ${
                    isActive
                      ? 'w-2.5 h-2.5 bg-white ring-2 ring-white/40 shadow-[0_0_8px_rgba(255,255,255,0.9)] scale-110'
                      : isPast
                      ? 'w-1.5 h-1.5 bg-white/40 opacity-40 hover:opacity-100 hover:scale-125'
                      : 'w-1.5 h-1.5 bg-transparent border border-white/40 opacity-50 hover:opacity-100 hover:border-white hover:bg-white/30 hover:scale-125'
                  }`}
                />
              </button>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
