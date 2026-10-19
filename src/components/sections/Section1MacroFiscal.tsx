import React, { useState, useMemo } from 'react';
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
  ReferenceLine
} from 'recharts';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { macroFiscalData, MacroFiscalPoint } from '../../data/budgetData.ts';
import { Info, Sliders, TrendingUp, DollarSign, AlertCircle, BarChart3 } from 'lucide-react';

export const Section1MacroFiscal: React.FC = () => {
  const [yearRange, setYearRange] = useState<[number, number]>([2018, 2027]);
  const [highlightedYear, setHighlightedYear] = useState<number | null>(2027);
  const [viewMetric, setViewMetric] = useState<'nominal' | 'percentGdp'>('nominal');

  const filteredData = useMemo(() => {
    return macroFiscalData.filter(
      d => d.year >= yearRange[0] && d.year <= yearRange[1]
    );
  }, [yearRange]);

  const activePoint: MacroFiscalPoint = useMemo(() => {
    return (
      macroFiscalData.find(d => d.year === highlightedYear) ||
      macroFiscalData[macroFiscalData.length - 1]
    );
  }, [highlightedYear]);

  return (
    <div>
      <SectionHeader
        number={1}
        title="10-Year Budget, Revenue, and Deficit Trends"
        subtitle="What are the changes in the past 10 years of budgeting?"
        badge="Medium-Term Fiscal Framework (MTFF)"
        metric={{
          value: "₱7.200 T",
          label: "2027 NEP Top-Line Ceiling"
        }}
      />

      {/* Analytical Narrative Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800/80 rounded-xl p-6 lg:p-8 relative overflow-hidden">
          <div className="text-[0.75rem] font-mono-data uppercase tracking-[0.1em] text-[#60A5FA] mb-3 flex items-center gap-2">
            <Info className="w-3.5 h-3.5" />
            MACRO FISCAL OVERVIEW
          </div>
         <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          When you look back at how the government has sliced up the budget over the last ten years, you start to see some major, lasting changes in what our country actually prioritizes. Early in the decade, economic managers heavily prioritized <strong className="font-bold text-[#60A5FA]">Economic Services</strong>, pouring massive, debt-financed funds into infrastructure projects. However, the economic shock of the pandemic forced a sharp pivot toward <strong className="font-bold text-[#60A5FA]">Social Services</strong> to fund critical safety nets and cash transfers. This reallocation stuck; by 2027, Social Services is proposed to claim a commanding <span className="font-mono-data font-bold text-white">38.3% of the entire fiscal envelope (₱2,757.6 billion)</span>, cementing human capital and basic welfare as the state's paramount funding priority.
          </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          Despite this focus on social welfare, a <strong className="font-bold text-red-400">concerning structural rigidness</strong> is quietly eroding the government's fiscal flexibility. The cost of simply servicing the <strong className="font-bold text-red-400">national debt</strong> has stabilized at alarmingly high nominal levels, effectively crowding out potential investments in faster economic growth. Simultaneously, the cost of <strong className="font-bold text-white">General Public Services</strong> has surged, growing at an <span className="font-mono-data font-bold text-emerald-400">8.6% compound annual rate</span> over the decade, largely due to mandatory, formula-based cash transfers (NTA) to Local Government Units following the Mandanas ruling. Most striking is the explosion of the <strong className="font-bold text-white">National Defense</strong> budget, which compounded at a staggering <span className="font-mono-data font-bold text-emerald-400">12.5% annually</span> over 10 years, driven by military salary standardization and external maritime modernization.
        </p>
        </div>

        {/* Live Selected Year Data Card */}
        <div className="lg:col-span-4 bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <span className="text-[0.75rem] font-mono-data uppercase tracking-[0.1em] text-[#6B7280]">
                FISCAL SNAPSHOT
              </span>
              <span className="text-[0.875rem] font-bold font-mono-data text-[#60A5FA] bg-blue-500/10 px-2.5 py-0.5 rounded">
                FY {activePoint.year}
              </span>
            </div>

            <div className="space-y-3 font-mono-data">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Total Budget (Ceiling):</span>
                <span className="text-white font-bold">₱{activePoint.totalBudget.toLocaleString()} B</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Revenue Target:</span>
                <span className="text-emerald-400 font-bold">₱{activePoint.revenueTarget.toLocaleString()} B</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Fiscal Gap / Deficit:</span>
                <span className="text-red-400 font-bold">
                  -₱{(activePoint.totalBudget - activePoint.revenueTarget).toFixed(1)} B
                </span>
              </div>
              <div className="flex items-center justify-between text-sm border-t border-slate-800/80 pt-2">
                <span className="text-slate-400">Deficit % of GDP:</span>
                <span className="text-red-300 font-bold">{activePoint.deficitCeiling}%</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">YoY Expansion:</span>
                <span className="text-slate-200">
                  {activePoint.yoyGrowth !== null ? `${activePoint.yoyGrowth > 0 ? '+' : ''}${activePoint.yoyGrowth}%` : 'Base Year'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Nominal GDP Base:</span>
                <span className="text-slate-200">₱{activePoint.nominalGdp.toLocaleString()} B</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-400">Real GDP Growth Target:</span>
                <span className="text-blue-300 font-medium">{activePoint.realGdpTarget}</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-500 font-mono-data">
            Hover over chart nodes or use the slider below to inspect historical assumptions.
          </div>
        </div>
      </div>

      {/* Chart Interactive Controls */}
      <div className="bg-slate-900/40 border border-slate-800 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-blue-400" />
            <span className="text-xs uppercase tracking-wider font-mono-data text-slate-300">
              Timeline Brush & Zoom: {yearRange[0]} — {yearRange[1]}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setYearRange([2018, 2027])}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                yearRange[0] === 2018 && yearRange[1] === 2027
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Full 10-Yr (2018–2027)
            </button>
            <button
              onClick={() => setYearRange([2022, 2027])}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                yearRange[0] === 2022 && yearRange[1] === 2027
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Post-Pandemic (2022–2027)
            </button>
            <button
              onClick={() => setYearRange([2025, 2027])}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                yearRange[0] === 2025 && yearRange[1] === 2027
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              Current Triennium (2025–2027)
            </button>
          </div>
        </div>

        {/* Dual Axis Combination Chart */}
        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
              data={filteredData}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
              onMouseMove={(e: any) => {
                if (e && e.activePayload && e.activePayload.length) {
                  const p = e.activePayload[0].payload as MacroFiscalPoint;
                  setHighlightedYear(p.year);
                }
              }}
            >
              <defs>
                <linearGradient id="expenditureGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#1E3A8A" stopOpacity={0.7} />
                </linearGradient>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10B981" stopOpacity={0.9} />
                  <stop offset="100%" stopColor="#065F46" stopOpacity={0.7} />
                </linearGradient>
              </defs>

              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              
              <XAxis
                dataKey="year"
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 12, fontFamily: 'Space Mono' }}
                tickLine={{ stroke: '#334155' }}
              />

              {/* Primary Y Axis: Nominal PHP Billions */}
              <YAxis
                yAxisId="left"
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Space Mono' }}
                tickFormatter={(val) => `₱${(val / 1000).toFixed(1)}T`}
                domain={[0, 8000]}
              />

              {/* Secondary Y Axis: Deficit Ceiling % of GDP */}
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="#EF4444"
                tick={{ fill: '#EF4444', fontSize: 11, fontFamily: 'Space Mono' }}
                tickFormatter={(val) => `${val}%`}
                domain={[0, 10]}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload as MacroFiscalPoint;
                    const fiscalGap = data.totalBudget - data.revenueTarget;
                    return (
                      <div className="bg-[#0B1120]/95 border border-slate-700 p-4 rounded-lg shadow-2xl backdrop-blur-md font-mono-data text-xs min-w-[240px]">
                        <div className="font-bold text-white text-sm mb-2 border-b border-slate-800 pb-1 flex justify-between">
                          <span>FY {data.year} Envelope</span>
                          <span className="text-blue-400">{data.shareGdp}% of GDP</span>
                        </div>
                        <div className="space-y-1.5 text-slate-300">
                          <div className="flex justify-between">
                            <span className="text-blue-400">■ Total Expenditure:</span>
                            <span className="font-bold text-white">₱{data.totalBudget.toLocaleString()} B</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-emerald-400">■ Revenue Target:</span>
                            <span className="font-bold text-white">₱{data.revenueTarget.toLocaleString()} B</span>
                          </div>
                          <div className="flex justify-between border-t border-slate-800/80 pt-1">
                            <span className="text-red-400">Fiscal Gap (Deficit):</span>
                            <span className="font-bold text-red-400">-₱{fiscalGap.toFixed(1)} B</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-red-400">● Deficit Ceiling:</span>
                            <span className="font-bold text-red-300">{data.deficitCeiling}% of GDP</span>
                          </div>
                          <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800/80">
                            <span>YoY Expansion:</span>
                            <span>{data.yoyGrowth !== null ? `${data.yoyGrowth}%` : 'Base Year'}</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Nominal GDP:</span>
                            <span>₱{data.nominalGdp.toLocaleString()} B</span>
                          </div>
                          <div className="flex justify-between text-slate-400">
                            <span>Real GDP Target:</span>
                            <span className="text-blue-300">{data.realGdpTarget}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Legend
                wrapperStyle={{ paddingTop: '15px', fontFamily: 'Space Mono', fontSize: '12px' }}
                formatter={(val) => {
                  if (val === 'totalBudget') return <span className="text-blue-400 mr-4">Total Budget (Expenditure, ₱B)</span>;
                  if (val === 'revenueTarget') return <span className="text-emerald-400 mr-4">Revenue Target (₱B)</span>;
                  if (val === 'deficitCeiling') return <span className="text-red-400">Deficit Ceiling (% of GDP)</span>;
                  return val;
                }}
              />

              <ReferenceLine yAxisId="right" y={5.1} stroke="#EF4444" strokeDasharray="3 3" opacity={0.5} />

              <Bar
                yAxisId="left"
                dataKey="totalBudget"
                fill="url(#expenditureGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              />

              <Bar
                yAxisId="left"
                dataKey="revenueTarget"
                fill="url(#revenueGradient)"
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              />

              <Line
                yAxisId="right"
                type="monotone"
                dataKey="deficitCeiling"
                stroke="#EF4444"
                strokeWidth={3}
                dot={{ r: 5, fill: '#EF4444', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                activeDot={{ r: 8, fill: '#DC2626', stroke: '#F87171', strokeWidth: 2 }}
              />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Chronological Slider Range Input */}
        <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-data text-slate-400">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span>Range Start: {yearRange[0]}</span>
            <input
              type="range"
              min={2018}
              max={2026}
              value={yearRange[0]}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val < yearRange[1]) {
                  setYearRange([val, yearRange[1]]);
                }
              }}
              className="accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span>Range End: {yearRange[1]}</span>
            <input
              type="range"
              min={2019}
              max={2027}
              value={yearRange[1]}
              onChange={(e) => {
                const val = Number(e.target.value);
                if (val > yearRange[0]) {
                  setYearRange([yearRange[0], val]);
                }
              }}
              className="accent-blue-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Structural Commentary Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono-data">
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg">
          <div className="text-slate-400 uppercase tracking-wider mb-1">Fiscal Gap Sensitivity</div>
          <div className="text-lg font-bold text-red-400">₱1.990 Trillion</div>
          <p className="mt-2 text-slate-400 leading-normal font-sans">
            Difference between proposed spending and targeted tax collections in 2027 requiring borrowing.
          </p>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg">
          <div className="text-slate-400 uppercase tracking-wider mb-1">Decadal Doubling</div>
          <div className="text-lg font-bold text-blue-400">+91.1% Surge</div>
          <p className="mt-2 text-slate-400 leading-normal font-sans">
            Nominal spending climbed from ₱3.767T in 2018 to ₱7.200T in 2027, outpacing tax collection speed.
          </p>
        </div>
        <div className="p-4 bg-slate-900/40 border border-slate-800/80 rounded-lg">
          <div className="text-slate-400 uppercase tracking-wider mb-1">Consolidation Velocity</div>
          <div className="text-lg font-bold text-amber-400">5.1% vs 4.8% Target</div>
          <p className="mt-2 text-slate-400 leading-normal font-sans">
            Consolidation pace has slowed due to mandatory non-discretionary costs and LGU transfers.
          </p>
        </div>
      </div>
    </div>
  );
};
