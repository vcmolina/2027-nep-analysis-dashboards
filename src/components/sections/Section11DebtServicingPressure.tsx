import React, { useState } from 'react';
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
import { debtServicingData } from '../../data/budgetData.ts';
import { Scale, AlertOctagon, DollarSign, RefreshCw, TrendingDown, Layers, ShieldAlert } from 'lucide-react';

export const Section11DebtServicingPressure: React.FC = () => {
  const [fxDepreciationSim, setFxDepreciationSim] = useState<number>(0); // 0 to 5 PHP depreciation

  const active2027 = debtServicingData[debtServicingData.length - 1];
  const additionalDebtFromFx = fxDepreciationSim * active2027.fxSensitivityPhp1Depreciation;

  return (
    <div>
      <SectionHeader
        number={11}
        title="Debt Servicing & Fiscal Pressure Points"
        subtitle="Dual-Axis Hybrid: The ₱2.70T Maturity Wall, 'Below-the-Line' Principal Amortization & 72:28 Domestic Borrowing Bias"
        badge="Sovereign Solvency Perimeter"
        metric={{
          value: "₱2,704.2 B",
          label: "Total Debt Servicing Cash Outflow"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">The Silent Killer of the National Budget</h3>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The absolute biggest problem with the proposed 2027 budget isn't even the things we are spending on—it's the things we are forced to pay back. Thanks to the massive borrowing spree during the pandemic, the government is now staring down an unprecedented wall of debt. We are on the hook for a staggering <strong className="font-bold text-white font-mono-data">₱1.590 trillion</strong> just to pay down the principal, plus another <strong className="font-bold text-red-400 font-mono-data">₱1.11 trillion</strong> just for the interest. Combine them, and we are looking at an astronomical ₱2.704 trillion in total debt servicing.
      </p>

      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        Here is the trick the government uses: that ₱1.590 trillion for principal payments is counted "below the line," meaning it isn't even included in the headline <strong className="font-bold text-white font-mono-data">₱7.20 trillion</strong> budget ceiling. The actual cash the government needs to shell out is vastly larger than what they advertise. To pay off these maturing debts and fund their 5.1% deficit, the Bureau of the Treasury has to borrow another <strong className="font-bold text-amber-300 font-mono-data">₱3.304 trillion</strong>. What is even worse is that interest payments alone will eat up over <span className="font-mono-data font-bold text-red-400">15% of the total budget</span>.
      </p>

      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
      The debt has become a massive, silent killer of our economic potential. We are borrowing trillions not to build new schools or hospitals, but simply to pay off old debts and the ballooning interest attached to them. When over 15% of the national budget is instantly vaporized just to pay statutory interest, it means we are systematically starving our most critical social infrastructure just to keep our creditors at bay.
      </p>
      </div>

      {/* Dual Axis Hybrid Chart (Interest Bars + Principal Bars + Debt-to-GDP Trendline) */}
      <div className="bg-[#070D19] border border-slate-800 rounded-xl p-5 mb-6 shadow-xl">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Scale className="w-5 h-5 text-red-400" />
            <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
              Debt Servicing Stacked Outflow vs. Debt-to-GDP Ratio
            </h4>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono-data">
            <span className="flex items-center gap-1.5 text-red-600">
              <span className="w-2.5 h-2.5 bg-[#8B0000] rounded-sm" /> Interest (On-Budget)
            </span>
            <span className="flex items-center gap-1.5 text-red-300">
              <span className="w-2.5 h-2.5 bg-[#CD5C5C] rounded-sm" /> Principal (Below-Line Off-Budget)
            </span>
            <span className="flex items-center gap-1.5 text-white font-bold">
              <span className="w-2.5 h-2.5 rounded-full bg-white" /> Debt-to-GDP (% Line)
            </span>
          </div>
        </div>

        <div className="h-[400px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={debtServicingData} margin={{ top: 20, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              <XAxis dataKey="year" stroke="#64748B" tick={{ fill: '#94A3B8', fontFamily: 'Space Mono', fontSize: 11 }} />
              <YAxis yAxisId="left" stroke="#EF4444" tick={{ fill: '#94A3B8', fontFamily: 'Space Mono', fontSize: 11 }} tickFormatter={(val) => `₱${val}B`} domain={[0, 3000]} />
              <YAxis yAxisId="right" orientation="right" stroke="#CBD5E1" tick={{ fill: '#CBD5E1', fontFamily: 'Space Mono', fontSize: 11 }} tickFormatter={(val) => `${val}%`} domain={[30, 70]} />
              
              <ReferenceLine yAxisId="right" y={60.0} stroke="#EF4444" strokeDasharray="3 3" label={{ value: '60% International Safety Threshold', fill: '#EF4444', position: 'top', fontSize: 10, fontFamily: 'Space Mono' }} />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const d = payload[0].payload;
                    return (
                      <div className="bg-[#0B1120]/95 border border-slate-700 p-4 rounded-lg shadow-2xl font-mono-data text-xs min-w-[270px]">
                        <div className="font-bold text-white text-sm mb-2 border-b border-slate-800 pb-1 flex justify-between">
                          <span>FY {d.year} Debt Metrics</span>
                          <span className="text-white font-bold">{d.debtToGdp}% of GDP</span>
                        </div>
                        <div className="space-y-1.5 text-slate-300">
                          <div className="flex justify-between text-red-500">
                            <span>■ Interest Payments:</span>
                            <span className="font-bold">₱{d.interestPayments.toFixed(1)}B</span>
                          </div>
                          <div className="flex justify-between text-red-300">
                            <span>■ Principal Amortization:</span>
                            <span className="font-bold">₱{d.principalAmortization.toFixed(1)}B</span>
                          </div>
                          <div className="flex justify-between border-t border-slate-800 pt-1 text-white font-bold">
                            <span>Total Debt Service Outflow:</span>
                            <span>₱{d.totalDebtService.toFixed(1)}B</span>
                          </div>
                          <div className="flex justify-between text-amber-400">
                            <span>Total Gross Borrowing:</span>
                            <span>₱{d.grossBorrowing.toFixed(1)}B</span>
                          </div>
                          <div className="flex justify-between text-slate-400 pt-1 border-t border-slate-800">
                            <span>Borrowing Mix:</span>
                            <span>{d.domesticRatio}% Domestic : {d.externalRatio}% External</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              <Bar yAxisId="left" dataKey="interestPayments" name="Interest Payments" stackId="debt" fill="#8B0000" radius={[0, 0, 0, 0]} maxBarSize={55} />
              <Bar yAxisId="left" dataKey="principalAmortization" name="Principal Amortization" stackId="debt" fill="#CD5C5C" radius={[4, 4, 0, 0]} maxBarSize={55} />
              
              <Line yAxisId="right" type="monotone" dataKey="debtToGdp" name="Debt-to-GDP (%)" stroke="#FFFFFF" strokeWidth={3} dot={{ r: 6, fill: '#000000', stroke: '#FFFFFF', strokeWidth: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* FX Sensitivity Simulator & Domestic Borrowing Mix */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Domestic vs External 72:28 Borrowing Program */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs uppercase tracking-wider font-mono-data text-blue-400 font-bold">
                2027 Gross Borrowing Strategy: ₱3.304 Trillion
              </span>
              <span className="text-xs font-mono-data text-slate-400">Targeted 72:28 Ratio</span>
            </div>

            <div className="space-y-4 font-mono-data text-xs mt-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-blue-400 font-bold">Domestic Borrowing (72%):</span>
                  <span className="text-white font-bold">₱2,378.88 Billion</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-blue-600 h-3" style={{ width: '72%' }} />
                </div>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  Treasury bills and Retail Treasury Bonds (RTBs). Crowds out domestic private business credit and elevates interest rates.
                </p>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-amber-400 font-bold">External Foreign Borrowing (28%):</span>
                  <span className="text-white font-bold">₱925.12 Billion</span>
                </div>
                <div className="w-full bg-slate-800 rounded-full h-3 overflow-hidden">
                  <div className="bg-amber-500 h-3" style={{ width: '28%' }} />
                </div>
                <p className="text-[11px] text-slate-400 font-sans mt-1">
                  Multilateral development loans (ADB, World Bank) and US-dollar sovereign global bonds.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-data">
            Deliberately biased toward domestic absorption to insulate against global currency volatility.
          </div>
        </div>

        {/* Foreign Exchange Sensitivity Simulator */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2">
              <span className="text-xs uppercase tracking-wider font-mono-data text-red-400 font-bold flex items-center gap-1.5">
                <AlertOctagon className="w-4 h-4" /> Foreign Exchange Sensitivity Simulator
              </span>
              <span className="text-xs font-mono-data text-slate-400">USD/PHP Shock Test</span>
            </div>

            <p className="text-xs text-slate-300 font-sans leading-relaxed mb-4">
              For every <strong>₱1.00 depreciation of the Philippine Peso against the US Dollar</strong>, the sovereign external debt stock automatically inflates by approximately <strong>₱29.50 billion</strong>.
            </p>

            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3 font-mono-data text-xs">
              <div className="flex justify-between items-center">
                <span className="text-slate-400">Simulate Peso Depreciation:</span>
                <span className="text-red-400 font-bold text-sm">+₱{fxDepreciationSim}.00 / USD</span>
              </div>
              <input
                type="range"
                min={0}
                max={5}
                step={0.5}
                value={fxDepreciationSim}
                onChange={(e) => setFxDepreciationSim(Number(e.target.value))}
                className="w-full accent-red-500 h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-slate-500">
                <span>Baseline (₱58.00)</span>
                <span>+₱2.50 (₱60.50)</span>
                <span>+₱5.00 Shock (₱63.00)</span>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex justify-between items-center text-sm">
                <span className="text-slate-300">Added Sovereign Debt Burden:</span>
                <span className="text-red-400 font-bold text-base">
                  +₱{additionalDebtFromFx.toFixed(2)} Billion
                </span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-data">
            Sensitivity metric derived from Bureau of the Treasury (BTr) Debt Sustainability Assessment.
          </div>
        </div>
      </div>
    </div>
  );
};
