import React from 'react';
import { BookOpen, Search, FileText } from 'lucide-react';

interface NavbarProps {
  onOpenCitations: () => void;
  onOpenGlossary: () => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenCitations,
  onOpenGlossary,
  activeSection
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-[#0B1120]/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-4 sm:px-6 py-3.5">
        {/* Zone 1: Single text element wordmark in Display face */}
        <a
          href="#executive-hero"
          className="text-base sm:text-lg font-bold tracking-tight text-white font-display whitespace-nowrap shrink-0 hover:text-blue-400 transition-colors"
        >
          NEP 2027 Dashboard
        </a>

        {/* Zone 2: 4–5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono-data text-slate-300">
          <a
            href="#section-1"
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
              activeSection === 'section-1' ? 'text-blue-400 font-bold' : ''
            }`}
          >
            01 Macro Ceiling
          </a>
          <a
            href="#section-2"
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
              activeSection === 'section-2' ? 'text-blue-400 font-bold' : ''
            }`}
          >
            02 1-Billion Grid
          </a>
          <a
            href="#section-4"
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
              activeSection === 'section-4' ? 'text-blue-400 font-bold' : ''
            }`}
          >
            04 Agencies
          </a>
          <a
            href="#section-11"
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
              activeSection === 'section-11' ? 'text-blue-400 font-bold' : ''
            }`}
          >
            11 Debt Wall
          </a>
          <a
            href="#section-12"
            className={`whitespace-nowrap shrink-0 hover:text-white transition-colors ${
              activeSection === 'section-12' ? 'text-blue-400 font-bold' : ''
            }`}
          >
            12 LGU Sankey
          </a>
        </nav>

        {/* Zone 3: Primary action button + Glossary affordance */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={onOpenGlossary}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono-data text-slate-300 bg-slate-900 border border-slate-700/80 rounded-lg hover:bg-slate-800 transition-colors whitespace-nowrap shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5 text-blue-400" />
            <span>Budget Glossary</span>
          </button>

          <button
            onClick={onOpenCitations}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-mono-data font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-500 transition-colors whitespace-nowrap shrink-0 shadow-sm"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>53 Works Cited</span>
          </button>
        </div>
      </div>
    </header>
  );
};
