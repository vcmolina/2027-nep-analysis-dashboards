import React, { useState, useEffect } from 'react';
import { TimelineSidebar } from './components/layout/TimelineSidebar.tsx';
import { ExecutiveHeader } from './components/layout/ExecutiveHeader.tsx';
import { SectionWindow } from './components/layout/SectionWindow.tsx';

// 15 Distinct Section Components
import { Section1MacroFiscal } from './components/sections/Section1MacroFiscal.tsx';
import { Section2WaffleGrid } from './components/sections/Section2WaffleGrid.tsx';
import { Section3SectoralShift } from './components/sections/Section3SectoralShift.tsx';
import { Section4DepartmentRanking } from './components/sections/Section4DepartmentRanking.tsx';
import { Section5EducationYouth } from './components/sections/Section5EducationYouth.tsx';
import { Section6InfrastructurePipeline } from './components/sections/Section6InfrastructurePipeline.tsx';
import { Section7FloodControlBasins } from './components/sections/Section7FloodControlBasins.tsx';
import { Section8HealthSectorRadar } from './components/sections/Section8HealthSectorRadar.tsx';
import { Section9AgricultureWaterfall } from './components/sections/Section9AgricultureWaterfall.tsx';
import { Section10SocialProtectionAyuda } from './components/sections/Section10SocialProtectionAyuda.tsx';
import { Section11DebtServicingPressure } from './components/sections/Section11DebtServicingPressure.tsx';
import { Section12LguSankeyTransfers } from './components/sections/Section12LguSankeyTransfers.tsx';
import { Section13ClimateFinanceCcet } from './components/sections/Section13ClimateFinanceCcet.tsx';
import { Section14LumpSumsPorkBarrel } from './components/sections/Section14LumpSumsPorkBarrel.tsx';
import { Section15ConfidentialIntelFunds } from './components/sections/Section15ConfidentialIntelFunds.tsx';

// Modals
import { CitationsDrawer } from './components/modals/CitationsDrawer.tsx';
import { GlossaryModal } from './components/modals/GlossaryModal.tsx';
import { DASHBOARD_SECTIONS, DashboardSection } from './data/budgetData.ts';
import { ChevronLeft, ChevronRight, ArrowUp } from 'lucide-react';

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('section-1');
  const [hoveredSection, setHoveredSection] = useState<DashboardSection | null>(null);
  const [isCitationsOpen, setIsCitationsOpen] = useState(false);
  const [isGlossaryOpen, setIsGlossaryOpen] = useState(false);

  const activeIndex = DASHBOARD_SECTIONS.findIndex(s => s.id === activeSection);
  const currentActiveIndex = activeIndex === -1 ? 0 : activeIndex;

  // Accurate Viewport Scroll Listener for Vertical Timeline
  useEffect(() => {
    const handleScroll = () => {
      const triggerLine = window.innerHeight * 0.35;
      const sectionElements = DASHBOARD_SECTIONS.map(s => document.getElementById(s.id));

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= triggerLine) {
            setActiveSection(el.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const yOffset = -40;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      setActiveSection(id);
      setHoveredSection(null);
    }
  };

  const goToPreviousSection = () => {
    if (currentActiveIndex > 0) {
      scrollToSection(DASHBOARD_SECTIONS[currentActiveIndex - 1].id);
    }
  };

  const goToNextSection = () => {
    if (currentActiveIndex < DASHBOARD_SECTIONS.length - 1) {
      scrollToSection(DASHBOARD_SECTIONS[currentActiveIndex + 1].id);
    }
  };

  // Keyboard arrow listener for page switching
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === 'ArrowLeft') {
        goToPreviousSection();
      } else if (e.key === 'ArrowRight') {
        goToNextSection();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentActiveIndex]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#0B1120] text-slate-100 flex flex-col font-sans selection:bg-white/20 selection:text-white relative">
      
      {/* 
        ====================================================================
        TWO ARROW BUTTONS TO SWITCH PAGES (LEFT & RIGHT)
        ====================================================================
      */}
      <div
        className="fixed top-6 right-6 sm:right-10 z-50 flex items-center gap-1.5 bg-[#070D19]/90 border border-white/20 backdrop-blur-md rounded-full p-1.5 shadow-2xl"
        role="navigation"
        aria-label="Page Switcher"
      >
        {/* Left Arrow Button */}
        <button
          onClick={goToPreviousSection}
          disabled={currentActiveIndex === 0}
          className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
            currentActiveIndex === 0
              ? 'opacity-25 cursor-not-allowed text-white/40'
              : 'text-white hover:bg-white/20 active:scale-95 cursor-pointer'
          }`}
          aria-label="Previous Section (Left Arrow)"
          title="Previous Section (Left Arrow)"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Right Arrow Button */}
        <button
          onClick={goToNextSection}
          disabled={currentActiveIndex === DASHBOARD_SECTIONS.length - 1}
          className={`p-2 rounded-full transition-all duration-200 flex items-center justify-center ${
            currentActiveIndex === DASHBOARD_SECTIONS.length - 1
              ? 'opacity-25 cursor-not-allowed text-white/40'
              : 'text-white hover:bg-white/20 active:scale-95 cursor-pointer'
          }`}
          aria-label="Next Section (Right Arrow)"
          title="Next Section (Right Arrow)"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* 
        ====================================================================
        SECTION TAG MODAL (SHOWS WHEN HOVERING TIMELINE CIRCLES)
        ====================================================================
      */}
      {hoveredSection && (
        <div className="fixed top-12 left-1/2 -translate-x-1/2 z-50 w-[92vw] sm:w-[620px] bg-[#070D19]/95 border border-white/30 rounded-2xl p-6 shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-300">
          <div className="flex items-center justify-between text-[0.75rem] font-mono-data uppercase tracking-[0.1em] text-white/70 mb-2 border-b border-white/10 pb-2">
            <span>SECTION {String(hoveredSection.pageNum).padStart(2, '0')} • 2027 NEP ANALYTICAL BRIEFING</span>
            <span className="text-white font-bold">{hoveredSection.highlightTag}</span>
          </div>

          <h3 className="text-xl sm:text-2xl font-display font-normal text-white mt-1">
            {hoveredSection.fullTitle}
          </h3>

          <p className="mt-2 text-sm text-slate-400 font-serif italic">
            {hoveredSection.subtitle}
          </p>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <div>
              <span className="text-[0.75rem] font-mono-data text-slate-400 uppercase tracking-[0.1em] block">
                {hoveredSection.primaryMetricLabel}
              </span>
              <span className="text-lg font-bold font-mono-data text-white">
                {hoveredSection.primaryMetric}
              </span>
            </div>

            <button
              onClick={() => scrollToSection(hoveredSection.id)}
              className="px-4 py-1.5 rounded-lg bg-white text-[#0B1120] font-mono-data text-xs font-bold hover:bg-slate-200 transition-colors shadow-md cursor-pointer"
            >
              Jump to Chapter
            </button>
          </div>
        </div>
      )}

      {/* 
        ====================================================================
        LEFT SIDE: WHITE VERTICAL TIMELINE NAVIGATOR (FULL-HEIGHT WHITE LINE & CIRCLES)
        ====================================================================
      */}
      <TimelineSidebar
        activeSection={activeSection}
        onSelectSection={scrollToSection}
        onHoverSection={setHoveredSection}
      />

      {/* 
        ====================================================================
        MAIN SCREEN VIEWPORT (BLURS WHEN HOVERED SECTION TAG IS SHOWING)
        ====================================================================
      */}
      <div
        className={`flex-1 w-full mx-auto transition-all duration-300 ${
          hoveredSection ? 'filter blur-md opacity-40 pointer-events-none select-none scale-[0.99]' : 'filter blur-0 opacity-100'
        }`}
      >
        <main className="px-4 sm:px-8 md:pl-20 lg:pl-24 lg:pr-12 py-10 max-w-[1540px] w-full mx-auto">
          {/* Executive Hero & KPI Strip */}
          <ExecutiveHeader />

          {/* 15 Analytical Modules in Window Containers */}
          <div className="space-y-16 lg:space-y-24">
            <SectionWindow
              id="section-1"
              section={DASHBOARD_SECTIONS[0]}
              index={0}
              isActive={currentActiveIndex === 0}
              isPast={0 < currentActiveIndex}
            >
              <Section1MacroFiscal />
            </SectionWindow>

            <SectionWindow
              id="section-2"
              section={DASHBOARD_SECTIONS[1]}
              index={1}
              isActive={currentActiveIndex === 1}
              isPast={1 < currentActiveIndex}
            >
              <Section2WaffleGrid />
            </SectionWindow>

            <SectionWindow
              id="section-3"
              section={DASHBOARD_SECTIONS[2]}
              index={2}
              isActive={currentActiveIndex === 2}
              isPast={2 < currentActiveIndex}
            >
              <Section3SectoralShift />
            </SectionWindow>

            <SectionWindow
              id="section-4"
              section={DASHBOARD_SECTIONS[3]}
              index={3}
              isActive={currentActiveIndex === 3}
              isPast={3 < currentActiveIndex}
            >
              <Section4DepartmentRanking />
            </SectionWindow>

            <SectionWindow
              id="section-5"
              section={DASHBOARD_SECTIONS[4]}
              index={4}
              isActive={currentActiveIndex === 4}
              isPast={4 < currentActiveIndex}
            >
              <Section5EducationYouth />
            </SectionWindow>

            <SectionWindow
              id="section-6"
              section={DASHBOARD_SECTIONS[5]}
              index={5}
              isActive={currentActiveIndex === 5}
              isPast={5 < currentActiveIndex}
            >
              <Section6InfrastructurePipeline />
            </SectionWindow>

            <SectionWindow
              id="section-7"
              section={DASHBOARD_SECTIONS[6]}
              index={6}
              isActive={currentActiveIndex === 6}
              isPast={6 < currentActiveIndex}
            >
              <Section7FloodControlBasins />
            </SectionWindow>

            <SectionWindow
              id="section-8"
              section={DASHBOARD_SECTIONS[7]}
              index={7}
              isActive={currentActiveIndex === 7}
              isPast={7 < currentActiveIndex}
            >
              <Section8HealthSectorRadar />
            </SectionWindow>

            <SectionWindow
              id="section-9"
              section={DASHBOARD_SECTIONS[8]}
              index={8}
              isActive={currentActiveIndex === 8}
              isPast={8 < currentActiveIndex}
            >
              <Section9AgricultureWaterfall />
            </SectionWindow>

            <SectionWindow
              id="section-10"
              section={DASHBOARD_SECTIONS[9]}
              index={9}
              isActive={currentActiveIndex === 9}
              isPast={9 < currentActiveIndex}
            >
              <Section10SocialProtectionAyuda />
            </SectionWindow>

            <SectionWindow
              id="section-11"
              section={DASHBOARD_SECTIONS[10]}
              index={10}
              isActive={currentActiveIndex === 10}
              isPast={10 < currentActiveIndex}
            >
              <Section11DebtServicingPressure />
            </SectionWindow>

            <SectionWindow
              id="section-12"
              section={DASHBOARD_SECTIONS[11]}
              index={11}
              isActive={currentActiveIndex === 11}
              isPast={11 < currentActiveIndex}
            >
              <Section12LguSankeyTransfers />
            </SectionWindow>

            <SectionWindow
              id="section-13"
              section={DASHBOARD_SECTIONS[12]}
              index={12}
              isActive={currentActiveIndex === 12}
              isPast={12 < currentActiveIndex}
            >
              <Section13ClimateFinanceCcet />
            </SectionWindow>

            <SectionWindow
              id="section-14"
              section={DASHBOARD_SECTIONS[13]}
              index={13}
              isActive={currentActiveIndex === 13}
              isPast={13 < currentActiveIndex}
            >
              <Section14LumpSumsPorkBarrel />
            </SectionWindow>

            <SectionWindow
              id="section-15"
              section={DASHBOARD_SECTIONS[14]}
              index={14}
              isActive={currentActiveIndex === 14}
              isPast={14 < currentActiveIndex}
            >
              <Section15ConfidentialIntelFunds />
            </SectionWindow>
          </div>

          {/* Concluding Footnote & Citations Banner */}
          <footer className="border-t border-slate-800/80 pt-12 pb-24 mt-24 text-[0.875rem] text-[#6B7280] font-mono-data">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-white font-bold">2027 Philippine National Expenditure Program (NEP)</span>
                <span className="mx-2">·</span>
                <span>Analytical Briefing & Sovereign Data Architecture</span>
                <div className="text-slate-300 font-semibold text-sm mt-1">
                  Dashboard by Val Cymon Molina
                </div>
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsGlossaryOpen(true)}
                  className="hover:text-white transition-colors cursor-pointer"
                >
                  Budget Glossary
                </button>
                <button
                  onClick={() => setIsCitationsOpen(true)}
                  className="hover:text-white transition-colors text-white font-bold cursor-pointer"
                >
                  53 Works Cited Directory
                </button>
                <button
                  onClick={scrollToTop}
                  className="flex items-center gap-1 hover:text-white transition-colors ml-2 cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" /> Top
                </button>
              </div>
            </div>
            <p className="mt-4 text-[#9CA3AF] font-sans leading-[1.75] text-[1rem]">
              Data compiled from official submissions of the Development Budget Coordination Committee (DBCC), Department of Budget and Management (DBM), Congressional Policy and Budget Research Department (CPBRD), Commission on Audit (COA), Bureau of the Treasury (BTr), and accredited press records.
            </p>
          </footer>
        </main>
      </div>

      {/* Floating Scroll-to-Top Button for Mobile */}
      <button
        onClick={scrollToTop}
        className="md:hidden fixed bottom-6 right-6 z-30 p-3 bg-white text-[#0B1120] rounded-full shadow-2xl hover:bg-slate-200 transition-colors"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-4 h-4" />
      </button>

      {/* Works Cited Drawer Modal */}
      <CitationsDrawer
        isOpen={isCitationsOpen}
        onClose={() => setIsCitationsOpen(false)}
      />

      {/* Public Finance Glossary Modal */}
      <GlossaryModal
        isOpen={isGlossaryOpen}
        onClose={() => setIsGlossaryOpen(false)}
      />
    </div>
  );
}
