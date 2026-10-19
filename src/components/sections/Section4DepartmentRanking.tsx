import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid
} from 'recharts';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { departmentAllocations2027, DepartmentAllocation } from '../../data/budgetData.ts';
import { ArrowUpDown, AlertCircle, Briefcase, Building, Layers } from 'lucide-react';

export const Section4DepartmentRanking: React.FC = () => {
  const [sortKey, setSortKey] = useState<'total' | 'co' | 'ps' | 'mooe'>('total');
  const [selectedDept, setSelectedDept] = useState<DepartmentAllocation | null>(departmentAllocations2027[0]);

  const sortedData = useMemo(() => {
    const list = [...departmentAllocations2027];
    if (sortKey === 'total') {
      return list.sort((a, b) => b.totalBudget - a.totalBudget);
    } else if (sortKey === 'co') {
      return list.sort((a, b) => b.co - a.co);
    } else if (sortKey === 'ps') {
      return list.sort((a, b) => b.ps - a.ps);
    } else {
      return list.sort((a, b) => b.mooe - a.mooe);
    }
  }, [sortKey]);

  return (
    <div>
      <SectionHeader
        number={4}
        title="Department & Agency Allocations Ranking"
        subtitle="Horizontal Stacked Expense Classes: Personnel Services (PS) Rigidity vs. Capital Outlays (CO)"
        badge="Top 10 Line Portfolios"
        metric={{
          value: "₱975.96 B",
          label: "DepEd #1 Sovereign Baseline"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-lg font-semibold text-white mb-2 font-display">
          Labor-Intensive Giants vs. Capital-Heavy Portfolios
        </h3>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        When you look closely at the 2027 budget, you can see two completely different ways the government spends its money. On one side is the <strong className="font-bold text-[#60A5FA]">Department of Education (DepEd)</strong>, which has the largest budget at <span className="font-mono-data font-bold text-white">₱975.96 billion</span>. DepEd operates like a massive employer: nearly 80% of its budget goes straight to paying salaries for over a million teachers and staff. On the flip side is the <strong className="font-bold text-[#60A5FA]">Department of Public Works and Highways (DPWH)</strong>. Out of its <span className="font-mono-data font-bold text-white">₱644.0 billion</span> budget, it pours a massive 83.6% strictly into building physical infrastructure.
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          Other departments face their own unique budget traps. The <strong className="font-bold text-white">DSWD</strong> relies heavily on operating funds just to handle the immense logistics of delivering aid. Meanwhile, the budgets for the police (<strong className="font-bold text-white">DILG</strong>) and military (<strong className="font-bold text-white">DND</strong>) are heavily bogged down by inflexible payrolls and soaring pension costs, which swallows up the cash they desperately need to upgrade their equipment and modernize.
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
        A department's total budget ceiling can be deceiving. Having a massive budget doesn't mean a department has the flexibility to innovate if 80% of its money is already locked into salaries, pensions, or rigid administrative costs. The structural traps of our bureaucracy mean that most agencies are just trying to keep the lights on and pay their people, rather than investing in future capabilities.
        </p>
      </div>

      {/* Sorting Bar & Interactive Controls */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl mb-6">
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-blue-400" />
          <span className="text-xs uppercase tracking-wider font-mono-data text-slate-300">
            Sort Hierarchy:
          </span>
          <div className="flex flex-wrap items-center gap-1.5 bg-slate-800 p-1 rounded-lg">
            <button
              onClick={() => setSortKey('total')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                sortKey === 'total' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Highest Total Budget
            </button>
            <button
              onClick={() => setSortKey('co')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                sortKey === 'co' ? 'bg-emerald-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Highest Capital Outlay (CO)
            </button>
            <button
              onClick={() => setSortKey('ps')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                sortKey === 'ps' ? 'bg-blue-500 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Highest Personnel Services (PS)
            </button>
            <button
              onClick={() => setSortKey('mooe')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                sortKey === 'mooe' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Highest MOOE
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 text-xs font-mono-data">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-blue-500 rounded-sm" />
            <span className="text-slate-300">PS (Personnel)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-amber-500 rounded-sm" />
            <span className="text-slate-300">MOOE (Operations)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 bg-emerald-500 rounded-sm" />
            <span className="text-slate-300">CO (Capital)</span>
          </div>
        </div>
      </div>

      {/* Main Chart + Detail Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Horizontal Stacked Bar Chart */}
        <div className="lg:col-span-8 bg-[#070D19] border border-slate-800 rounded-xl p-5 shadow-xl">
          <div className="h-[520px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                layout="vertical"
                data={sortedData}
                margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
                onClick={(e: any) => {
                  if (e && e.activePayload && e.activePayload.length) {
                    setSelectedDept(e.activePayload[0].payload as DepartmentAllocation);
                  }
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" horizontal={false} />
                <XAxis
                  type="number"
                  stroke="#64748B"
                  tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Space Mono' }}
                  tickFormatter={(val) => `₱${val}B`}
                />
                <YAxis
                  type="category"
                  dataKey="acronym"
                  stroke="#64748B"
                  tick={{ fill: '#E2E8F0', fontSize: 12, fontFamily: 'Space Mono', fontWeight: 'bold' }}
                  width={75}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload as DepartmentAllocation;
                      return (
                        <div className="bg-[#0B1120]/95 border border-slate-700 p-4 rounded-lg shadow-2xl backdrop-blur-md font-mono-data text-xs min-w-[260px]">
                          <div className="font-bold text-white text-sm mb-1">{d.name} ({d.acronym})</div>
                          <div className="text-blue-400 font-bold mb-2">Total: ₱{d.totalBudget.toFixed(2)} Billion</div>
                          <div className="space-y-1.5 text-slate-300 border-t border-slate-800 pt-2">
                            <div className="flex justify-between">
                              <span className="text-blue-400">■ Personnel Services (PS):</span>
                              <span className="font-bold text-white">₱{d.ps.toFixed(2)}B ({((d.ps/d.totalBudget)*100).toFixed(1)}%)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-amber-400">■ Operating Expenses (MOOE):</span>
                              <span className="font-bold text-white">₱{d.mooe.toFixed(2)}B ({((d.mooe/d.totalBudget)*100).toFixed(1)}%)</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-emerald-400">■ Capital Outlays (CO):</span>
                              <span className="font-bold text-white">₱{d.co.toFixed(2)}B ({((d.co/d.totalBudget)*100).toFixed(1)}%)</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar dataKey="ps" name="Personnel Services" stackId="a" fill="#3B82F6" radius={[0, 0, 0, 0]} />
                <Bar dataKey="mooe" name="MOOE" stackId="a" fill="#F59E0B" radius={[0, 0, 0, 0]} />
                <Bar dataKey="co" name="Capital Outlays" stackId="a" fill="#10B981" radius={[0, 4, 4, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Selected Department Forensic Card */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          {selectedDept ? (
            <div>
              <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
                <div>
                  <span className="text-xs uppercase tracking-wider font-mono-data text-blue-400">
                    Department #{selectedDept.rank}
                  </span>
                  <h4 className="text-xl font-bold text-white font-display">
                    {selectedDept.acronym}
                  </h4>
                </div>
                <div className="text-right">
                  <span className="text-xs text-slate-400 block font-mono-data">2027 Allocation</span>
                  <span className="text-lg font-bold text-emerald-400 font-mono-data">
                    ₱{selectedDept.totalBudget.toFixed(2)} B
                  </span>
                </div>
              </div>

              <div className="text-xs text-slate-300 mb-4 font-sans font-medium">
                {selectedDept.name}
              </div>

              {/* Progress Breakdown Bars */}
              <div className="space-y-3 font-mono-data text-xs">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-blue-400">Personnel Services (PS)</span>
                    <span className="text-white font-bold">₱{selectedDept.ps.toFixed(2)}B ({((selectedDept.ps / selectedDept.totalBudget) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-blue-500 h-1.5" style={{ width: `${(selectedDept.ps / selectedDept.totalBudget) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-amber-400">Operating Expenses (MOOE)</span>
                    <span className="text-white font-bold">₱{selectedDept.mooe.toFixed(2)}B ({((selectedDept.mooe / selectedDept.totalBudget) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-amber-500 h-1.5" style={{ width: `${(selectedDept.mooe / selectedDept.totalBudget) * 100}%` }} />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-emerald-400">Capital Outlays (CO)</span>
                    <span className="text-white font-bold">₱{selectedDept.co.toFixed(2)}B ({((selectedDept.co / selectedDept.totalBudget) * 100).toFixed(1)}%)</span>
                  </div>
                  <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-emerald-500 h-1.5" style={{ width: `${(selectedDept.co / selectedDept.totalBudget) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Risk Summary */}
              <div className="mt-6 p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
                <div className="text-xs uppercase tracking-wider font-mono-data text-amber-400 mb-1 flex items-center gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5" /> Absorptive & Fiscal Risk
                </div>
                <p className="text-xs text-slate-300 leading-relaxed font-sans">
                  {selectedDept.riskSummary}
                </p>
              </div>
            </div>
          ) : (
            <div className="text-center text-slate-500 py-12 text-xs font-mono-data">
              Click a department bar on the chart to inspect its forensic class breakdown.
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-data">
            Source: 2027 National Expenditure Program (NEP) Agency Tables.
          </div>
        </div>
      </div>
    </div>
  );
};
