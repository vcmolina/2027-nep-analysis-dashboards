import React from 'react';
import { TrendingUp, AlertTriangle, Scale, Shield, Building, Compass } from 'lucide-react';

export const ExecutiveHeader: React.FC = () => {
  const kpis = [
    {
      label: "Top-Line Expenditure",
      value: "₱7,200.1 B",
      sub: "+6.0% YoY · 21.7% of GDP",
      color: "text-[#60A5FA]"
    },
    {
      label: "Revenue Target",
      value: "₱5,210.0 B",
      sub: "BIR & BOC Collections",
      color: "text-emerald-400"
    },
    {
      label: "Deficit Ceiling",
      value: "5.1% GDP",
      sub: "-₱1,990.1B Fiscal Gap",
      color: "text-red-400"
    },
    {
      label: "Debt Servicing",
      value: "₱2,704.2 B",
      sub: "₱1.11T Int + ₱1.59T Principal",
      color: "text-red-300"
    },
    {
      label: "NTA LGU Transfers",
      value: "₱1,319.8 B",
      sub: "+10.86% Mandanas Formula",
      color: "text-blue-300"
    },
    {
      label: "1-Billion Grid",
      value: "7,200 Units",
      sub: "38.3% Social · 27.0% Econ",
      color: "text-amber-400"
    }
  ];

  return (
    <div id="executive-hero" className="border-b border-slate-800/80 pb-12 mb-16 pt-6">
      {/* Eyebrow Text / Small Top Label: Font 'Space Mono', Size 0.75rem (12px), UPPERCASE with wide letter-spacing (0.1em), Color #60A5FA */}
      <div className="flex items-center gap-2 text-[0.75rem] font-mono-data uppercase tracking-[0.1em] text-[#60A5FA] mb-4">
        <span>REPUBLIC OF THE PHILIPPINES</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>NATIONAL EXPENDITURE PROGRAM</span>
        <span aria-hidden="true" className="text-slate-600">·</span>
        <span>FY 2027 BRIEFING</span>
      </div>

      {/* Main Hero Title: Font 'Playfair Display', Size Very large (5rem / 80px on desktop), Weight Regular (400), Color Pure White (#FFFFFF) */}
      <h1 className="text-4xl sm:text-6xl lg:text-[5rem] lg:leading-[1.05] font-display font-normal text-[#FFFFFF] tracking-tight max-w-6xl">
        The 2027 Philippine National Budget
      </h1>

      {/* Hero Subtitle: Font 'Playfair Display', Size Large (4rem / 64px on desktop), Style Italicized, Color Vibrant Light Blue (#60A5FA) */}
      <p className="mt-3 text-2xl sm:text-4xl lg:text-[4rem] lg:leading-[1.1] font-display italic text-[#60A5FA] max-w-6xl">
        A Macroeconomic Balance Sheet
      </p>

      {/* Body Text & Summaries: Font 'Inter', Size Highly readable (1.125rem / 18px), Line-height Relaxed (1.75), Color Soft Light Grey (#D1D5DB) */}
      <p className="mt-6 text-[1.125rem] leading-[1.75] text-[#D1D5DB] max-w-5xl font-sans">
        This comprehensive analytical dashboard translates the <strong className="font-bold text-white">₱7.200-trillion sovereign spending program</strong> into 15 forensic modules. Grounded in official submissions from the <strong className="font-bold text-white">Development Budget Coordination Committee (DBCC)</strong>, the <strong className="font-bold text-white">Department of Budget and Management (DBM)</strong>, and independent audit reports from the <strong className="font-bold text-white">Commission on Audit (COA)</strong>, this portal unpacks the constitutional allocation choices, fiscal space constraints, and systemic governance risks dictating the nation&apos;s fiscal architecture.
      </p>

      {/* 6-Column KPI Strip with Space Mono Data Labels */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mt-10">
        {kpis.map((kpi) => (
          <div
            key={kpi.label}
            className="p-3.5 bg-slate-900/80 border border-slate-800/90 rounded-xl flex flex-col justify-between"
          >
            {/* Data Label: Font 'Space Mono', Size Small (0.875rem / 14px), Color Muted Grey #6B7280 */}
            <div className="text-[0.875rem] font-mono-data text-[#6B7280]">
              {kpi.label}
            </div>
            <div className={`text-xl sm:text-2xl font-bold font-mono-data my-1.5 ${kpi.color}`}>
              {kpi.value}
            </div>
            <div className="text-[0.75rem] font-mono-data text-slate-500 truncate tracking-tight">
              {kpi.sub}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
