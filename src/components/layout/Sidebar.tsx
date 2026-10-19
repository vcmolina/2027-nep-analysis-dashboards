import React, { useState } from 'react';
import { DASHBOARD_SECTIONS, DashboardSection } from '../../data/budgetData.ts';
import { Search, ChevronRight, Layers, ArrowUpRight } from 'lucide-react';

interface SidebarProps {
  activeSection: string;
  onSelectSection: (id: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSections = DASHBOARD_SECTIONS.filter((s) => {
    const q = searchQuery.toLowerCase();
    return (
      s.navLabel.toLowerCase().includes(q) ||
      s.fullTitle.toLowerCase().includes(q) ||
      s.pageNum.toString().includes(q) ||
      s.highlightTag.toLowerCase().includes(q)
    );
  });

  return (
    <aside className="w-72 xl:w-80 shrink-0 hidden lg:block sticky top-16 h-[calc(100vh-4rem)] border-r border-slate-800 bg-[#070D19]/90 backdrop-blur-md p-4 overflow-y-auto">
      {/* Search Input Filter */}
      <div className="relative mb-4">
        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          placeholder="Filter 15 sections..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 font-mono-data placeholder:text-slate-600 focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Progress / Status Header */}
      <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-500 uppercase tracking-wider mb-2 px-1">
        <span>Analytical Modules</span>
        <span>{filteredSections.length} of 15</span>
      </div>

      {/* Navigation List */}
      <nav className="space-y-1">
        {filteredSections.map((sec) => {
          const isActive = activeSection === sec.id;
          const formattedNum = String(sec.pageNum).padStart(2, '0');

          return (
            <button
              key={sec.id}
              onClick={() => onSelectSection(sec.id)}
              className={`w-full text-left p-2.5 rounded-lg text-xs transition-all flex items-start gap-2.5 group ${
                isActive
                  ? 'bg-blue-600/15 border border-blue-500/40 text-white'
                  : 'text-slate-400 hover:bg-slate-900 hover:text-slate-200 border border-transparent'
              }`}
            >
              <span
                className={`font-mono-data text-[11px] mt-0.5 shrink-0 font-bold ${
                  isActive ? 'text-blue-400' : 'text-slate-600 group-hover:text-slate-400'
                }`}
              >
                {formattedNum}
              </span>

              <div className="min-w-0 flex-1">
                <div
                  className={`font-medium truncate ${
                    isActive ? 'text-blue-200 font-semibold' : 'text-slate-300'
                  }`}
                >
                  {sec.navLabel}
                </div>
                <div className="text-[10px] text-slate-500 font-mono-data truncate mt-0.5 flex items-center justify-between">
                  <span>{sec.highlightTag}</span>
                  <span className="text-slate-400 font-medium">{sec.primaryMetric}</span>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      {/* Sidebar Quick Summary */}
      <div className="mt-6 pt-4 border-t border-slate-800 text-[11px] font-mono-data text-slate-500">
        <div className="text-slate-400 font-bold mb-1">2027 NEP Top-Line:</div>
        <div className="text-white font-bold text-sm">₱7,200.1 Billion</div>
        <div className="text-slate-400 mt-1">21.7% of Nominal GDP · 5.1% Deficit</div>
      </div>
    </aside>
  );
};
