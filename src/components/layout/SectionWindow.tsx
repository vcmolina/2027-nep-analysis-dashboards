import React from 'react';
import { DashboardSection } from '../../data/budgetData.ts';

interface SectionWindowProps {
  id: string;
  section?: DashboardSection;
  index?: number;
  isActive: boolean;
  isPast?: boolean;
  children: React.ReactNode;
}

export const SectionWindow: React.FC<SectionWindowProps> = ({
  id,
  isActive,
  children
}) => {
  return (
    <section
      id={id}
      className={`scroll-mt-16 transition-all duration-500 ease-out rounded-2xl lg:rounded-3xl overflow-hidden border backdrop-blur-md ${
        isActive
          ? 'bg-[#0D1526]/95 border-slate-700 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8)] ring-1 ring-white/10'
          : 'bg-[#0B1120]/85 border-slate-800/80 shadow-2xl hover:border-slate-700/80'
      }`}
    >
      {/* Window Body Container */}
      <div className="p-6 sm:p-10 lg:p-12">
        {children}
      </div>
    </section>
  );
};
