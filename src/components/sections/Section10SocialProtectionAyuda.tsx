import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { ayudaPrograms, ayudaTimeline } from '../../data/budgetData.ts';
import { HeartHandshake, AlertCircle, ShieldAlert, CheckCircle2, TrendingUp, Filter } from 'lucide-react';

export const Section10SocialProtectionAyuda: React.FC = () => {
  const [viewMetric, setViewMetric] = useState<'nominal' | 'percent'>('nominal');
  const [selectedProgram, setSelectedProgram] = useState<string | null>(null);

  // Compute transformed percentage or nominal data
  const chartData = useMemo(() => {
    return ayudaTimeline.map((item) => {
      if (viewMetric === 'nominal') {
        return item;
      } else {
        const t = item.total;
        return {
          year: item.year,
          "4Ps": Number(((item["4Ps"] / t) * 100).toFixed(1)),
          "AICS": Number(((item["AICS"] / t) * 100).toFixed(1)),
          "TUPAD": Number(((item["TUPAD"] / t) * 100).toFixed(1)),
          "AKAP": Number(((item["AKAP"] / t) * 100).toFixed(1)),
          "Social Pension": Number(((item["Social Pension"] / t) * 100).toFixed(1)),
          total: 100
        };
      }
    });
  }, [viewMetric]);

  const activeProgramDetails = useMemo(() => {
    if (!selectedProgram) return null;
    return ayudaPrograms.find(p => p.program.includes(selectedProgram)) || null;
  }, [selectedProgram]);

  return (
    <div>
      <SectionHeader
        number={10}
        title="Social Protection & Targeted 'Ayuda' Programs"
        subtitle="Stacked Area Anatomy: 4Ps Conditional Baseline vs. Unchecked Proliferation of Discretionary Subsidies"
        badge="Political Patronage & Leakage Hazards"
        metric={{
          value: "₱278.0 B",
          label: "Total Direct Cash Transfer Portfolio"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">The Dangerous Shift from Strict Welfare to Loose "Ayuda"</h3>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The government's flagship cash aid program, the <strong className="font-bold text-[#60A5FA]">Pantawid Pamilyang Pilipino Program (4Ps)</strong>, remains the solid anchor of our social safety net. It strictly targets the poorest families using a verified database, handing out <span className="font-mono-data font-bold text-white">₱113.8 billion</span>. But there is a catch: families only get this money if they meet strict conditions, like keeping their kids in school and getting regular medical checkups.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
      However, the 2027 budget reveals a massive, undeniable pivot toward handing out cash with far fewer rules. The budget for <strong className="font-bold text-white">Assistance to Individuals in Crisis Situations (AICS)</strong> has exploded to <strong className="font-bold text-amber-300 font-mono-data">₱63.9 billion</strong> (an 82.5% jump since 2024), while a newer program called <strong className="font-bold text-white">AKAP</strong> climbed to <strong className="font-bold text-amber-300 font-mono-data">₱35.0 billion</strong>. Unlike the strict monitoring of the 4Ps, these massive "ayuda" programs don't have rigid targeting systems. Because politicians and agencies have a lot of discretion over who gets this money, it leaves the door wide open for <strong className="font-bold text-red-400">political patronage, favoritism, and duplicate payouts</strong>.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
      While giving out emergency cash sounds good on paper, we are slowly eroding a strictly monitored, poverty-busting system in favor of what essentially looks like massive political slush funds. Pumping nearly ₱100 billion into loose programs like AICS and AKAP without strict conditions means we are handing out a blank check to distribute "ayuda" based on political loyalty rather than genuine, data-driven poverty reduction.
      </p>
      </div>

      {/* Interactive Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl mb-6">
        <div className="flex items-center gap-2">
          <HeartHandshake className="w-4 h-4 text-blue-400" />
          <span className="text-xs uppercase tracking-wider font-mono-data text-slate-300">
            Display Mode:
          </span>
          <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setViewMetric('nominal')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                viewMetric === 'nominal' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Absolute PHP Billions
            </button>
            <button
              onClick={() => setViewMetric('percent')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                viewMetric === 'percent' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              % of Cash Transfer Portfolio
            </button>
          </div>
        </div>

        {/* Legend / Filter tags */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data">
          <span className="text-slate-500">Program Layers:</span>
          {ayudaPrograms.map((p) => {
            const shortName = p.program.split(' ')[0];
            return (
              <button
                key={p.program}
                onClick={() => setSelectedProgram(selectedProgram === shortName ? null : shortName)}
                className={`px-2 py-0.5 rounded transition-all flex items-center gap-1.5 ${
                  selectedProgram === shortName ? 'ring-2 ring-white text-white font-bold' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                style={{ borderLeft: `3px solid ${p.color}` }}
              >
                <span>{shortName}</span>
                <span className="text-slate-400">₱{p.y2027}B</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Stacked Area Chart */}
      <div className="bg-[#070D19] border border-slate-800 rounded-xl p-5 mb-6 shadow-xl">
        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="year" stroke="#64748B" tick={{ fill: '#94A3B8', fontFamily: 'Space Mono', fontSize: 11 }} />
              <YAxis
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontFamily: 'Space Mono', fontSize: 11 }}
                tickFormatter={(val) => viewMetric === 'nominal' ? `₱${val}B` : `${val}%`}
              />
              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-[#0B1120]/95 border border-slate-700 p-4 rounded-lg shadow-2xl font-mono-data text-xs min-w-[260px]">
                        <div className="font-bold text-white text-sm mb-2 border-b border-slate-800 pb-1 flex justify-between">
                          <span>FY {d.year} Ayuda Total</span>
                          <span className="text-blue-400">
                            {viewMetric === 'nominal' ? `₱${d.total.toFixed(1)}B` : '100%'}
                          </span>
                        </div>
                        <div className="space-y-1.5 text-slate-300">
                          <div className="flex justify-between text-blue-400">
                            <span>■ 4Ps (Conditional):</span>
                            <span className="font-bold">{d["4Ps"]}{viewMetric === 'nominal' ? 'B' : '%'}</span>
                          </div>
                          <div className="flex justify-between text-orange-400">
                            <span>■ AICS (Crisis):</span>
                            <span className="font-bold">{d["AICS"]}{viewMetric === 'nominal' ? 'B' : '%'}</span>
                          </div>
                          <div className="flex justify-between text-pink-400">
                            <span>■ AKAP (Low Income):</span>
                            <span className="font-bold">{d["AKAP"]}{viewMetric === 'nominal' ? 'B' : '%'}</span>
                          </div>
                          <div className="flex justify-between text-emerald-400">
                            <span>■ Social Pension:</span>
                            <span className="font-bold">{d["Social Pension"]}{viewMetric === 'nominal' ? 'B' : '%'}</span>
                          </div>
                          <div className="flex justify-between text-yellow-400">
                            <span>■ TUPAD (DOLE):</span>
                            <span className="font-bold">{d["TUPAD"]}{viewMetric === 'nominal' ? 'B' : '%'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend wrapperStyle={{ fontFamily: 'Space Mono', fontSize: '11px', paddingTop: '10px' }} />
              {/* Layers */}
              <Area type="monotone" dataKey="4Ps" stackId="1" stroke="#2563EB" fill="#2563EB" fillOpacity={0.8} />
              <Area type="monotone" dataKey="AICS" stackId="1" stroke="#F97316" fill="#F97316" fillOpacity={0.8} />
              <Area type="monotone" dataKey="AKAP" stackId="1" stroke="#EC4899" fill="#EC4899" fillOpacity={0.8} />
              <Area type="monotone" dataKey="Social Pension" stackId="1" stroke="#10B981" fill="#10B981" fillOpacity={0.8} />
              <Area type="monotone" dataKey="TUPAD" stackId="1" stroke="#EAB308" fill="#EAB308" fillOpacity={0.8} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Program Governance Audit Comparison Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ayudaPrograms.map((prog) => (
          <div key={prog.program} className="p-4 bg-slate-900/60 border border-slate-800 rounded-xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold font-mono-data text-white flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: prog.color }} />
                  {prog.program.split(' ')[0]}
                </span>
                <span className="text-xs font-mono-data text-blue-400 font-bold">
                  ₱{prog.y2027.toFixed(2)}B
                </span>
              </div>
              <div className="text-[11px] text-slate-400 font-mono-data mb-3">
                Agency: {prog.agency} · Conditionality: {prog.isConditional ? 'Strict (Education/Health)' : 'Discretionary / Unconditioned'}
              </div>

              <div className="space-y-2 text-xs">
                <div className="p-2 bg-slate-950/80 rounded border border-slate-800/80">
                  <div className="text-[10px] uppercase font-mono-data text-slate-400 mb-0.5">Targeting Mechanism</div>
                  <div className="text-slate-300 font-sans">{prog.targetingEfficiency}</div>
                </div>

                <div className="p-2 bg-slate-950/80 rounded border border-slate-800/80">
                  <div className="text-[10px] uppercase font-mono-data text-amber-400 mb-0.5 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> COA Audit Findings
                  </div>
                  <div className="text-slate-300 font-sans leading-relaxed">{prog.coaAuditFlags}</div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
