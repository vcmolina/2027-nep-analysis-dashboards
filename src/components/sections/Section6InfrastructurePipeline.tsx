import React, { useState } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { dpwhMetrics, infrastructureTypologies } from '../../data/budgetData.ts';
import { HardHat, AlertTriangle, Filter, MapPin, Gauge, Construction } from 'lucide-react';

export const Section6InfrastructurePipeline: React.FC = () => {
  const [selectedTypology, setSelectedTypology] = useState<string | null>(null);

  const activeTypology = selectedTypology
    ? infrastructureTypologies.find(t => t.id === selectedTypology)
    : null;

  return (
    <div>
      <SectionHeader
        number={6}
        title="Public Works & Infrastructure Pipeline"
        subtitle="Scatter-Line Hybrid: Capital Outlay Downscaling, The 56.18% Disbursement Deficit & Asset Preservation Pivot"
        badge="Absorptive Capacity Crisis"
        metric={{
          value: "56.18%",
          label: "DPWH Disbursement Rate (Target: 75%)"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">The Cost of Chronic Delays</h3>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
      The <strong className="font-bold text-[#60A5FA]">Department of Public Works and Highways (DPWH)</strong> is the government's primary builder, but its proposed 2027 budget took a massive hit, dropping to <span className="font-mono-data font-bold text-white">₱644.0 billion</span> (down from ₱1.114 trillion in 2025). The real crisis here isn't a lack of funds; it's that the agency simply cannot spend the money it already has—a problem known as <strong className="font-bold text-red-400">poor absorptive capacity</strong>. State auditors uncovered a staggering <strong className="font-bold text-red-400 font-mono-data">₱138 billion</strong> stuck in suspended, delayed, or poorly built projects.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
      By mid-2026, the DPWH had only managed to actually disburse <strong className="font-bold text-amber-300 font-mono-data">56.18%</strong> of its funds. Major expressway and trade projects are paralyzed by never-ending <strong className="font-bold text-white">Right-of-Way (ROW)</strong> land disputes. Because they cannot get new projects off the ground efficiently, the 2027 strategy is shifting gears: pouring <strong className="font-bold text-emerald-400 font-mono-data">₱75.10 billion</strong> into <strong className="font-bold text-emerald-400">Asset Preservation</strong> just to fix and maintain the roads we already have, rather than chasing new mega-structures.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
      Throwing more money at the DPWH won't fix our infrastructure gap if the agency's internal engine is broken. A 56% disbursement rate means that nearly half of the economic boost promised by Congress never actually reaches the ground. Pivoting to road repairs is a necessary reality check, proving that basic right-of-way issues and bureaucratic delays are killing our flagship projects.
      </p>
      </div>

      {/* Typology and Geography Filter Strip */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-blue-400" />
            <span className="text-xs uppercase tracking-wider font-mono-data text-slate-300">
              Infrastructure Typology & Regional Filter:
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedTypology(null)}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                selectedTypology === null
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All Typologies
            </button>
            {infrastructureTypologies.map((t) => (
              <button
                key={t.id}
                onClick={() => setSelectedTypology(selectedTypology === t.id ? null : t.id)}
                className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                  selectedTypology === t.id
                    ? 'bg-blue-500 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {t.name.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {activeTypology && (
          <div className="mt-3 pt-3 border-t border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between text-xs font-mono-data text-slate-300 gap-2">
            <div className="flex items-center gap-2">
              <span className="text-blue-400 font-bold">{activeTypology.name}:</span>
              <span>2027 Envelope: <strong>₱{activeTypology.budgetPhpB}B</strong> ({activeTypology.share2027})</span>
            </div>
            <div className="text-amber-400">
              COA Bottleneck: {activeTypology.coaConcern}
            </div>
          </div>
        )}
      </div>

      {/* Hybrid Dual-Axis Chart with Bubble Indicators */}
      <div className="bg-[#070D19] border border-slate-800 rounded-xl p-5 mb-6 shadow-xl">
        <div className="flex items-center justify-between text-xs font-mono-data text-slate-400 mb-4">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 text-blue-400">
              <span className="w-3 h-3 bg-blue-500 rounded-sm" /> Capital Outlay (₱B, Left Axis)
            </span>
            <span className="flex items-center gap-1.5 text-amber-400">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400" /> Disbursement Velocity (%, Right Axis)
            </span>
          </div>
          <div className="text-red-400 flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-red-500 bg-red-500/20" /> Bubble Size = COA Flagged Unliquidated (₱138B)
          </div>
        </div>

        <div className="h-[380px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={dpwhMetrics} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="year" stroke="#64748B" tick={{ fill: '#94A3B8', fontFamily: 'Space Mono', fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#3B82F6" tick={{ fill: '#94A3B8', fontFamily: 'Space Mono', fontSize: 11 }} tickFormatter={(val) => `₱${val}B`} domain={[0, 1100]} />
              <YAxis yAxisId="right" orientation="right" stroke="#F59E0B" tick={{ fill: '#F59E0B', fontFamily: 'Space Mono', fontSize: 11 }} tickFormatter={(val) => `${val}%`} domain={[0, 100]} />
              
              <ReferenceLine yAxisId="right" y={75} stroke="#10B981" strokeDasharray="4 4" label={{ value: 'Target 75%', fill: '#10B981', position: 'right', fontSize: 10, fontFamily: 'Space Mono' }} />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-[#0B1120]/95 border border-slate-700 p-4 rounded-lg shadow-2xl font-mono-data text-xs min-w-[260px]">
                        <div className="font-bold text-white text-sm mb-2 border-b border-slate-800 pb-1">{d.year} DPWH Portfolio</div>
                        <div className="space-y-1.5 text-slate-300">
                          <div className="flex justify-between"><span className="text-blue-400">Total DPWH:</span> <span className="font-bold text-white">₱{d.totalBudget}B</span></div>
                          <div className="flex justify-between"><span className="text-emerald-400">Capital Outlay:</span> <span className="font-bold text-white">₱{d.capitalOutlay}B</span></div>
                          <div className="flex justify-between"><span className="text-purple-400">Asset Preservation:</span> <span className="font-bold text-white">₱{d.assetPreservation}B</span></div>
                          <div className="flex justify-between border-t border-slate-800/80 pt-1">
                            <span className="text-amber-400">Disbursement Rate:</span>
                            <span className="font-bold text-amber-300">{d.disbursementRate}% {d.isTarget ? '(Target)' : ''}</span>
                          </div>
                          {d.unliquidatedDefective && (
                            <div className="flex justify-between text-red-400 pt-1">
                              <span>COA Flagged Projects:</span>
                              <span className="font-bold">₱{d.unliquidatedDefective}B ({d.delayedProjectsCount} delayed)</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar yAxisId="left" dataKey="capitalOutlay" name="Capital Outlay (₱B)" fill="#1E40AF" radius={[4, 4, 0, 0]} maxBarSize={48} />
              <Bar yAxisId="left" dataKey="assetPreservation" name="Asset Preservation (₱B)" fill="#059669" radius={[4, 4, 0, 0]} maxBarSize={48} />
              
              <Line yAxisId="right" type="monotone" dataKey="disbursementRate" name="Disbursement Rate (%)" stroke="#F59E0B" strokeWidth={3} dot={{ r: 7, fill: '#F59E0B' }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Forensics Stats Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono-data">
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-slate-400 mb-1">COA Sunk Asset Flag</div>
          <div className="text-xl font-bold text-red-400">₱138.0 Billion</div>
          <p className="mt-1 text-slate-400 font-sans">
            1,435 severely delayed initiatives and 491 with &gt;10% negative slippage.
          </p>
        </div>
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-slate-400 mb-1">Asset Preservation Shift</div>
          <div className="text-xl font-bold text-emerald-400">₱75.10 Billion</div>
          <p className="mt-1 text-slate-400 font-sans">
            Prioritizes road reblocking, seismic bridge strengthening over new mega-works.
          </p>
        </div>
        <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg">
          <div className="text-slate-400 mb-1">ROW Pipeline Bottlenecks</div>
          <div className="text-xl font-bold text-blue-400">Arterial Highways</div>
          <p className="mt-1 text-slate-400 font-sans">
            Major arterial corridor links paralyzed by land expropriation disputes and court backlogs.
          </p>
        </div>
      </div>
    </div>
  );
};
