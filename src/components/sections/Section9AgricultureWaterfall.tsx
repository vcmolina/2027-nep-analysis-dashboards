import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { agricultureComponents, agricultureWaterfallSteps } from '../../data/budgetData.ts';
import { Sprout, TrendingDown, TrendingUp, AlertTriangle, Droplet, ArrowRight, ShieldAlert } from 'lucide-react';

export const Section9AgricultureWaterfall: React.FC = () => {
  const [showNiaAnalysis, setShowNiaAnalysis] = useState(true);

  // SVG Waterfall Chart calculation
  // Baseline: 216.20B -> RCEF +15 -> Rice +2.3 -> NIA +3.9 -> FMR +0.5 -> DA Ops -65.73 -> Final 172.17B
  const maxVal = 250;
  const chartHeight = 320;
  const scaleY = (val: number) => chartHeight - (val / maxVal) * chartHeight;

  // Compute waterfall running steps
  const computedSteps = [
    { name: "2026 Baseline", value: 216.20, start: 0, end: 216.20, color: "#3B82F6", isTotal: true },
    { name: "RCEF Boost", value: 15.00, start: 216.20, end: 231.20, color: "#10B981", isTotal: false },
    { name: "Rice Program", value: 2.30, start: 231.20, end: 233.50, color: "#10B981", isTotal: false },
    { name: "NIA Allocation", value: 3.90, start: 233.50, end: 237.40, color: "#10B981", isTotal: false },
    { name: "FMR Roads", value: 0.50, start: 237.40, end: 237.90, color: "#10B981", isTotal: false },
    { name: "DA Reductions", value: -65.73, start: 237.90, end: 172.17, color: "#EF4444", isTotal: false },
    { name: "2027 Ceiling", value: 172.17, start: 0, end: 172.17, color: "#3B82F6", isTotal: true }
  ];

  return (
    <div>
      <SectionHeader
        number={9}
        title="Agriculture & Food Security"
        subtitle="Strict Waterfall Variance: RCEF Tariff Expansion vs. Truncated Irrigation (₱233B Requested vs ₱46B Ceiling)"
        badge="Supply-Side Food Shock Risk"
        metric={{
          value: "₱172.17 B",
          label: "2027 Proposed DA (-20.4% YoY)"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">Empty Promises for Food Security</h3>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The government constantly talks about prioritizing local farming and achieving food security, but the proposed 2027 <strong className="font-bold text-[#60A5FA]">Department of Agriculture (DA)</strong> budget tells a completely different story. The total DA budget dropped to just <strong className="font-bold text-red-400 font-mono-data">₱172.17 billion</strong>. Instead of getting the massive boost it needs to thrive, the agriculture sector continues to suffer from severe underfunding that leaves farmers struggling to produce enough food.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The biggest proof of this disconnect is the <strong className="font-bold text-white">National Irrigation Administration (NIA)</strong>. Based on data, the NIA requested <strong className="font-bold text-white font-mono-data">₱233.0 billion</strong> to finally fix decades of broken irrigation systems and water backlogs. Instead, the budget department slashed their ceiling down to a heavily constrained <strong className="font-bold text-red-400 font-mono-data">₱46.0 billion</strong>, leaving a massive ₱187.0 billion hole. On top of this severe water shortage, the country is facing a nationwide backlog of <strong className="font-bold text-amber-300 font-mono-data">55,000 kilometers</strong> of Farm-to-Market Roads, which is only getting a meager piecemeal funding of <strong className="font-bold text-red-400 font-mono-data">₱16.50 billion</strong>. Meanwhile, the budget for the <strong className="font-bold text-emerald-400">Rice Competitiveness Enhancement Fund (RCEF)</strong> was doubled to <strong className="font-bold text-emerald-400 font-mono-data">₱30.0 billion</strong> using money collected from rice import tariffs.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
      The government’s grand promises of food security ring hollow when you look at the actual numbers. We are deliberately starving the very infrastructure—water irrigation and rural roads—that our farmers desperately need to survive and transport their crops. Doubling the RCEF budget using import tariffs might look good on paper, but it is just a band-aid solution. You cannot build a resilient, food-secure nation if you refuse to fund the most basic physical foundations of agriculture.
      </p>
      </div>

      {/* Strict Waterfall Chart Visualizer */}
      <div className="bg-[#070D19] border border-slate-800 rounded-xl p-5 mb-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Sprout className="w-5 h-5 text-emerald-400" />
            <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
              Net Agricultural Envelope Variance (2026 Baseline → 2027 Proposed)
            </h4>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono-data">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <span className="w-2.5 h-2.5 bg-emerald-500 rounded-sm" /> Augmentations (+)
            </span>
            <span className="flex items-center gap-1.5 text-red-400">
              <span className="w-2.5 h-2.5 bg-red-500 rounded-sm" /> Cascading Reductions (-)
            </span>
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-2.5 h-2.5 bg-blue-500 rounded-sm" /> Baseline / Total
            </span>
          </div>
        </div>

        {/* SVG Waterfall Diagram */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[700px] h-[360px] relative px-4 pt-6">
            <svg viewBox="0 0 740 340" className="w-full h-full overflow-visible">
              {/* Gridlines */}
              {[0, 50, 100, 150, 200, 250].map((tick) => {
                const y = scaleY(tick);
                return (
                  <g key={tick}>
                    <line x1="60" y1={y} x2="720" y2={y} stroke="#1E293B" strokeDasharray="3 3" />
                    <text x="50" y={y + 4} fill="#64748B" fontSize="10" textAnchor="end" fontFamily="Space Mono">
                      ₱{tick}B
                    </text>
                  </g>
                );
              })}

              {/* Waterfall Columns */}
              {computedSteps.map((step, idx) => {
                const colWidth = 68;
                const colGap = 26;
                const x = 70 + idx * (colWidth + colGap);

                const top = Math.min(scaleY(step.start), scaleY(step.end));
                const bottom = Math.max(scaleY(step.start), scaleY(step.end));
                const height = Math.max(bottom - top, 3);

                return (
                  <g key={step.name} className="transition-all hover:opacity-90">
                    {/* Connecting dotted line to next step */}
                    {idx < computedSteps.length - 1 && (
                      <line
                        x1={x + colWidth}
                        y1={scaleY(step.end)}
                        x2={x + colWidth + colGap}
                        y2={scaleY(step.end)}
                        stroke="#475569"
                        strokeDasharray="2 2"
                      />
                    )}

                    {/* Bar rectangle */}
                    <rect
                      x={x}
                      y={top}
                      width={colWidth}
                      height={height}
                      fill={step.color}
                      rx={4}
                      className="cursor-pointer shadow-md"
                    />

                    {/* Value label on top of bar */}
                    <text
                      x={x + colWidth / 2}
                      y={top - 8}
                      fill="#FFFFFF"
                      fontSize="10"
                      fontWeight="bold"
                      textAnchor="middle"
                      fontFamily="Space Mono"
                    >
                      {step.isTotal ? `₱${step.value.toFixed(1)}B` : `${step.value > 0 ? '+' : ''}${step.value.toFixed(1)}B`}
                    </text>

                    {/* Step Name X-label */}
                    <text
                      x={x + colWidth / 2}
                      y={330}
                      fill="#94A3B8"
                      fontSize="9.5"
                      textAnchor="middle"
                      fontFamily="Space Mono"
                    >
                      {step.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* The NIA ₱233B vs ₱46B Unfunded Irrigation Abyss */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-8 bg-slate-900/90 border border-slate-800 rounded-xl p-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Droplet className="w-5 h-5 text-blue-400" />
              <h4 className="text-base font-bold text-white font-display">
                The Irrigation Deficit: Agency Proposal vs. Enacted DBM Ceiling
              </h4>
            </div>
            <span className="text-xs font-mono-data text-red-400 font-bold bg-red-950/60 px-2.5 py-1 rounded border border-red-900">
              ₱187.0B Unfunded Gap
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed font-sans mb-4">
            The National Irrigation Administration (NIA) submitted an optimal, engineer-backed proposal of <strong>₱233.0 billion</strong> to construct climate-resilient water impounding dams, solar pumps, and line 1.1 million hectares of rain-dependent farmlands. Instead, the DBM allocated just <strong>₱46.0 billion</strong>, guaranteeing prolonged vulnerability to recurring El Niño droughts.
          </p>

          {/* Visual Bar Comparison */}
          <div className="space-y-3 font-mono-data text-xs">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-slate-400">NIA Requested Requirement (Full Modernization):</span>
                <span className="text-white font-bold">₱233.00 Billion (100%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-blue-500 h-3" style={{ width: '100%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-emerald-400 font-bold">2027 Proposed Ceiling (DBM Approved):</span>
                <span className="text-emerald-400 font-bold">₱46.00 Billion (19.7%)</span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                <div className="bg-emerald-500 h-3" style={{ width: '19.7%' }} />
              </div>
            </div>
          </div>
        </div>

        {/* Absorptive & Farm-to-Market Backlog Box */}
        <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between text-xs font-mono-data">
          <div>
            <div className="text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> Absorption Vulnerability
            </div>
            <div className="text-2xl font-bold text-white mb-1">55,000 km</div>
            <div className="text-slate-400 mb-3">Farm-to-Market Road (FMR) Backlog</div>
            <p className="text-slate-300 font-sans leading-relaxed text-[11px]">
              With only ₱16.5B allocated for FMR in 2027, clearing the physical rural connectivity deficit will require over 30 years at current pace, sustaining supply-chain friction between farmgates and urban wet markets.
            </p>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[10px] text-slate-500">
            Source: DBM 2027 Budget Message & DA Legislative Briefings.
          </div>
        </div>
      </div>
    </div>
  );
};
