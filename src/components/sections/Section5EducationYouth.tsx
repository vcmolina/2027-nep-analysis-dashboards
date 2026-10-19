import React, { useState } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ComposedChart
} from 'recharts';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { educationData } from '../../data/budgetData.ts';
import { GraduationCap, AlertTriangle, Utensils, School, BookOpen, Clock } from 'lucide-react';

export const Section5EducationYouth: React.FC = () => {
  const [selectedPanel, setSelectedPanel] = useState<'all' | 'feeding' | 'backlog'>('all');

  // Multi-year comparison data
  const comparisonData = [
    { year: '2025', DepEd: 793.00, SUCs_CHED: 138.50, TESDA: 18.40, BEFF: 36.00, SBFP: 15.30 },
    { year: '2026', DepEd: 1015.31, SUCs_CHED: 165.20, TESDA: 20.24, BEFF: 57.30, SBFP: 25.60 },
    { year: '2027', DepEd: 975.96, SUCs_CHED: 176.50, TESDA: 22.10, BEFF: 58.25, SBFP: 11.43 }
  ];

  // Per-student spending vs classroom backlog data
  const studentBacklogData = [
    { year: '2024', spendingPerStudent: 26400, classroomBacklog: 168000 },
    { year: '2025', spendingPerStudent: 29800, classroomBacklog: 155000 },
    { year: '2026', spendingPerStudent: 36100, classroomBacklog: 148000 },
    { year: '2027 (NEP)', spendingPerStudent: 34500, classroomBacklog: 142000 }
  ];

  // SBFP Downward Waterfall Steps
  const sbfpWaterfall = [
    { label: '2026 Enacted SBFP', value: 25.60, display: '₱25.60B', type: 'base' },
    { label: 'Nutritional Meal Reduction', value: -9.80, display: '-₱9.80B', type: 'cut' },
    { label: 'Fortified Milk Squeeze', value: -4.37, display: '-₱4.37B', type: 'cut' },
    { label: '2027 Proposed SBFP', value: 11.43, display: '₱11.43B', type: 'final' }
  ];

  return (
    <div>
      <SectionHeader
        number={5}
        title="Education & Youth Development"
        subtitle="Multi-Panel Architecture: DepEd Contraction, Chronic 142k Classroom Backlog & The 55% School Feeding Slash"
        badge="Constitutional Priority #1"
        metric={{
          value: "-55.3%",
          label: "School Feeding Cut (180 → 120 Days)"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">The Hidden Cuts Behind DepEd's Massive Budget</h3>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          The Constitution requires education to get the biggest slice of the national pie, and at first glance, the <strong className="font-bold text-[#60A5FA]">Department of Education (DepEd)</strong> seems well-funded with an imposing <span className="font-mono-data font-bold text-white">₱975.96 billion</span>. But if you look closer, this actually represents a <strong className="font-bold text-red-400">₱39.35 billion budget cut</strong> compared to the previous year's historic highs.
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          The most painful hit is to the <strong className="font-bold text-white">School-Based Feeding Program</strong>. Its budget was slashed by more than half—plummeting from <strong className="font-bold text-white font-mono-data">₱25.6 billion</strong> down to just <strong className="font-bold text-red-400 font-mono-data">₱11.43 billion</strong>. Because of this, the government can only afford to feed malnourished grade schoolers for 120 days instead of the recommended 180 days, putting their cognitive development and ability to learn at serious risk. At the same time, the <strong className="font-bold text-white font-mono-data">₱58.25 billion</strong> budget for building and fixing schools isn't nearly enough to solve the massive backlog of up to <strong className="font-bold text-amber-300 font-mono-data">160,000 classrooms</strong>, a problem made worse by land disputes and agonizingly slow procurement.
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
        It is easy for policymakers to point to DepEd's massive top-line budget as proof that human capital remains the ultimate priority. However, the reality is that the most vulnerable students are quietly paying the price for these internal austerity measures. Slashing a critical safety net like the school feeding program by 55% is a dangerous trade-off, and watching the basic infrastructure fund struggle against an insurmountable classroom shortage shows a system stretched to its breaking point.
        </p>
      </div>

      {/* 3-Panel Education Dashboard Layout */}
      <div className="space-y-6">
        {/* Panel 1: 3-Year Rolling Grouped Bar Chart (DepEd, SUCs, CHED, TESDA) */}
        <div className="bg-[#070D19] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-blue-400" />
              <h4 className="text-sm uppercase tracking-wider font-mono-data text-white font-bold">
                Panel 1: Structural Allocations across Education Pillars (2025–2027)
              </h4>
            </div>
            <div className="text-xs font-mono-data text-slate-400">
              Values in PHP Billions
            </div>
          </div>

          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={comparisonData}
                margin={{ top: 20, right: 30, left: 10, bottom: 10 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                <XAxis dataKey="year" stroke="#64748B" tick={{ fill: '#94A3B8', fontFamily: 'Space Mono' }} />
                <YAxis stroke="#64748B" tick={{ fill: '#94A3B8', fontFamily: 'Space Mono' }} tickFormatter={(val) => `₱${val}B`} />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      return (
                        <div className="bg-[#0B1120]/95 border border-slate-700 p-3 rounded-lg shadow-xl font-mono-data text-xs">
                          <div className="font-bold text-white mb-2 border-b border-slate-800 pb-1">FY {d.year} Education Allocations</div>
                          <div className="space-y-1 text-slate-300">
                            <div className="flex justify-between"><span className="text-blue-400">DepEd Total:</span> <span className="text-white font-bold">₱{d.DepEd}B</span></div>
                            <div className="flex justify-between"><span className="text-amber-400">SUCs / CHED:</span> <span className="text-white font-bold">₱{d.SUCs_CHED}B</span></div>
                            <div className="flex justify-between"><span className="text-emerald-400">BEFF (Classrooms):</span> <span className="text-white font-bold">₱{d.BEFF}B</span></div>
                            <div className="flex justify-between"><span className="text-purple-400">TESDA (Vocational):</span> <span className="text-white font-bold">₱{d.TESDA}B</span></div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend wrapperStyle={{ fontFamily: 'Space Mono', fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="DepEd" name="DepEd Total" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="SUCs_CHED" name="SUCs / CHED" fill="#F59E0B" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="BEFF" name="BEFF Facilities" fill="#10B981" radius={[4, 4, 0, 0]} maxBarSize={40} />
                <Bar dataKey="TESDA" name="TESDA" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={40} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Dual Sub-Panels: Per-Student Spending vs Backlog + Crimson SBFP Waterfall */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel 2: Per-Student Spending vs Classroom Backlog */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <School className="w-4 h-4 text-emerald-400" />
                  <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
                    Panel 2: Per-Student Spending vs. Classroom Backlog
                  </h4>
                </div>
                <span className="text-[11px] font-mono-data text-amber-400">142,000 Unit Deficit</span>
              </div>

              <div className="h-[220px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={studentBacklogData} margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
                    <XAxis dataKey="year" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Space Mono' }} />
                    <YAxis yAxisId="left" stroke="#3B82F6" tick={{ fill: '#3B82F6', fontSize: 10, fontFamily: 'Space Mono' }} tickFormatter={(val) => `₱${(val/1000).toFixed(0)}k`} />
                    <YAxis yAxisId="right" orientation="right" stroke="#EF4444" tick={{ fill: '#EF4444', fontSize: 10, fontFamily: 'Space Mono' }} tickFormatter={(val) => `${(val/1000).toFixed(0)}k`} />
                    <Tooltip
                      content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                          const d = payload[0].payload;
                          return (
                            <div className="bg-[#0B1120] border border-slate-700 p-3 rounded font-mono-data text-xs">
                              <div className="text-white font-bold mb-1">{d.year}</div>
                              <div className="text-blue-400">Spending/Student: ₱{d.spendingPerStudent.toLocaleString()}</div>
                              <div className="text-red-400">Classroom Backlog: {d.classroomBacklog.toLocaleString()} units</div>
                            </div>
                          );
                        }
                        return null;
                      }}
                    />
                    <Bar yAxisId="left" dataKey="spendingPerStudent" name="Annual Spend/Student (₱)" fill="#3B82F6" radius={[4, 4, 0, 0]} maxBarSize={32} />
                    <Line yAxisId="right" type="monotone" dataKey="classroomBacklog" name="Classroom Backlog (units)" stroke="#EF4444" strokeWidth={2.5} dot={{ r: 4 }} />
                  </ComposedChart>
                </ResponsiveContainer>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono-data mt-2 border-t border-slate-800/80 pt-2">
              Spending per student dips in 2027 to ₱34,500 due to basic enrollment growth outpacing capital classroom outlays.
            </p>
          </div>

          {/* Panel 3: Crimson SBFP Downward Waterfall & Feeding Days Cut */}
          <div className="bg-red-950/20 border border-red-900/50 rounded-xl p-5 shadow-lg flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Utensils className="w-4 h-4 text-red-400" />
                  <h4 className="text-xs uppercase tracking-wider font-mono-data text-red-300 font-bold">
                    Panel 3: Severe SBFP Feeding Decimation (-55.3%)
                  </h4>
                </div>
                <span className="text-[11px] font-mono-data text-red-400 bg-red-950 px-2 py-0.5 rounded border border-red-800">
                  CRITICAL IMPACT
                </span>
              </div>

              {/* Waterfall Steps */}
              <div className="space-y-2.5 my-3 font-mono-data">
                {sbfpWaterfall.map((step, idx) => (
                  <div key={step.label} className="flex items-center justify-between p-2.5 bg-slate-900/80 border border-slate-800 rounded-lg text-xs">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${
                        step.type === 'base' ? 'bg-blue-400' : step.type === 'cut' ? 'bg-red-500' : 'bg-red-400'
                      }`} />
                      <span className="text-slate-300">{step.label}</span>
                    </div>
                    <span className={`font-bold ${
                      step.type === 'cut' ? 'text-red-400' : 'text-white'
                    }`}>
                      {step.display}
                    </span>
                  </div>
                ))}
              </div>

              {/* Feeding Days Impact Alert */}
              <div className="p-3 bg-red-900/30 border border-red-800/60 rounded-lg flex items-center justify-between text-xs font-mono-data">
                <div className="flex items-center gap-2 text-red-200">
                  <Clock className="w-4 h-4 text-red-400 shrink-0" />
                  <span>Mandated Feeding Days:</span>
                </div>
                <div className="text-right">
                  <span className="line-through text-slate-500 mr-2">180 days</span>
                  <span className="text-red-400 font-bold text-sm">→ 120 days (-33.3%)</span>
                </div>
              </div>
            </div>

            <p className="text-[11px] text-slate-400 font-mono-data mt-3 border-t border-red-900/40 pt-2">
              Slashes nutritional hot meals and fortified milk for 3.5 million stunted and severely wasted children nationwide.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
