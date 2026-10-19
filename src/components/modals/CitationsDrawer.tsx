import React, { useState } from 'react';
import { worksCited, Citation } from '../../data/budgetData.ts';
import { ExternalLink, Search, X, BookOpen, Filter } from 'lucide-react';

interface CitationsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const CitationsDrawer: React.FC<CitationsDrawerProps> = ({ isOpen, onClose }) => {
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  if (!isOpen) return null;

  const categories = ['all', 'Official DBM/Gov', 'Congress & CPBRD', 'Audit / COA', 'News & Analysis'] as const;

  const filteredCitations = worksCited.filter((c) => {
    const matchesCat = filterCategory === 'all' || c.category === filterCategory;
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          c.id.toString() === searchQuery.trim();
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1120] border border-slate-700 max-w-4xl w-full h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Works Cited & Official References Directory
              </h3>
              <p className="text-xs text-slate-400 font-mono-data">
                53 Primary Documentation Sources (DBM, Congress, COA, DOF, Media)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="p-4 border-b border-slate-800/80 bg-slate-900/30 shrink-0 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search citations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 font-mono-data focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs font-mono-data w-full sm:w-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded transition-colors ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white font-bold'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                {cat === 'all' ? `All (${worksCited.length})` : cat}
              </button>
            ))}
          </div>
        </div>

        {/* Citation List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2.5 font-mono-data text-xs">
          {filteredCitations.map((c) => (
            <div
              key={c.id}
              className="p-3 bg-slate-900/50 hover:bg-slate-900 border border-slate-800/80 rounded-lg flex items-start justify-between gap-4 transition-colors"
            >
              <div className="flex items-start gap-3">
                <span className="text-blue-400 font-bold shrink-0 mt-0.5 w-6 text-right">
                  [{c.id}]
                </span>
                <div>
                  <div className="text-white font-sans text-xs font-medium leading-relaxed">
                    {c.title}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-2">
                    <span className="text-amber-400">{c.category}</span>
                    <span className="truncate max-w-md text-slate-600">{c.url}</span>
                  </div>
                </div>
              </div>

              <a
                href={c.url}
                target="_blank"
                rel="noreferrer noopener"
                className="shrink-0 p-1.5 bg-slate-800 hover:bg-blue-600 text-slate-300 hover:text-white rounded transition-colors"
                title="Open Source Link"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}

          {filteredCitations.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No citations matched your filter query.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-[11px] font-mono-data text-slate-500 text-center shrink-0">
          All references verbatim from the 2027 National Expenditure Program Analytical Briefing Works Cited.
        </div>
      </div>
    </div>
  );
};
