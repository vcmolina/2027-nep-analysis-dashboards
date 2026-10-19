import React, { useState } from 'react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip
} from 'recharts';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { ccetHistoricalData, ccetAgencyBreakdown2027, ccetMitigationAgencies2027 } from '../../data/budgetData.ts';
import { CloudRain, Trees, ShieldAlert, AlertTriangle, Layers, ArrowRight } from 'lucide-react';

export const Section13ClimateFinanceCcet: React.FC = () => {
  const [activeRing, setActiveRing] = useState<'adaptation' | 'mitigation'>('adaptation');

  // Inner ring: Adaptation vs Mitigation
  const innerRingData = [
    { name: "Climate Adaptation", value: 530.00, color: "#2563EB", percentage: "83.1%" },
    { name: "Climate Mitigation", value: 108.00, color: "#10B981", percentage: "16.9%" }
  ];

  // Outer ring data depends on selected quadrant
  const outerRingData = activeRing === 'adaptation'
    ? ccetAgencyBreakdown2027.map(a => ({ name: a.agency, value: a.allocationPhpB, color: a.sharePct > 50 ? '#1E3A8A' : '#3B82F6' }))
    : ccetMitigationAgencies2027.map(a => ({ name: a.agency, value: a.allocationPhpB, color: a.sharePct > 50 ? '#065F46' : '#10B981' }));

  return (
    <div>
      <SectionHeader
        number={13}
        title="Climate Change Expenditures (CCET)"
        subtitle="Concentric Doughnut Anatomy: The $11B Tagging Reality, Gray Civil Works Monopoly vs. 4.5% Ecological Reforestation"
        badge="Climate Taxonomy Critique"
        metric={{
          value: "₱638.0 B",
          label: "Total Tagged CCET (USD ~$11 Billion)"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">Green Tagging or Just Rebranded Concrete?</h3>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The Philippines regularly ranks among the most climate-vulnerable countries in the world, and on paper, the proposed 2027 budget seems to reflect that urgency with roughly <strong className="font-bold text-emerald-400 font-mono-data">₱638 billion ($11 billion)</strong> earmarked under <strong className="font-bold text-white">Climate Change Expenditure Tagging (CCET)</strong>. As expected for an island nation with low global emissions, the overwhelming bulk of this—<span className="font-mono-data font-bold text-white">₱530.0 billion (83.1%)</span>—is tagged as <strong className="font-bold text-[#60A5FA]">Climate Adaptation</strong> to build resilience against worsening typhoons and sea level rise.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The problem is what the government actually calls &quot;adaptation.&quot; Over 83% of that adaptation money—a massive <strong className="font-bold text-white font-mono-data">₱442.0 billion</strong>—goes straight to the <strong className="font-bold text-white">DPWH</strong> to build standard <strong className="font-bold text-amber-300">&quot;gray infrastructure&quot;</strong> like concrete sea walls, river dikes, and dredging projects. Meanwhile, actual ecological restoration—such as replanting depleted upland forests, restoring coastal mangroves, and protecting critical watersheds under the <strong className="font-bold text-white">DENR</strong>—gets a mathematically negligible <strong className="font-bold text-red-400 font-mono-data">₱23.8 billion (just 4.5%)</strong>. By rebranding standard, politically favored concrete contracts as climate resilience, the state can boast impressive climate finance statistics to international observers while leaving real environmental degradation completely unaddressed.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
      We are playing an expensive game of greenwashing. Pouring billions of pesos into concrete along riverbanks is not real climate adaptation if upstream mountains remain completely deforested and natural watersheds continue to collapse. When over 80% of our climate budget is swallowed by traditional DPWH civil works while genuine environmental rehabilitation gets pocket change, we are simply slapping a green label on standard political pork and gray infrastructure.
      </p>
      </div>

      {/* Multi-Level Concentric Doughnut Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        <div className="lg:col-span-7 bg-[#070D19] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CloudRain className="w-5 h-5 text-blue-400" />
              <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
                Concentric Two-Tier Climate Doughnut
              </h4>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveRing('adaptation')}
                className={`px-2.5 py-1 text-xs font-mono-data rounded transition-colors ${
                  activeRing === 'adaptation' ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Adaptation Drill-down
              </button>
              <button
                onClick={() => setActiveRing('mitigation')}
                className={`px-2.5 py-1 text-xs font-mono-data rounded transition-colors ${
                  activeRing === 'mitigation' ? 'bg-emerald-600 text-white font-bold' : 'bg-slate-800 text-slate-400'
                }`}
              >
                Mitigation Drill-down
              </button>
            </div>
          </div>

          <div className="h-[360px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0];
                      return (
                        <div className="bg-[#0B1120]/95 border border-slate-700 p-3 rounded-lg shadow-xl font-mono-data text-xs">
                          <div className="font-bold text-white mb-1">{d.name}</div>
                          <div className="text-blue-400 font-bold">₱{Number(d.value).toFixed(1)} Billion</div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                {/* Inner Ring: Typology */}
                <Pie
                  data={innerRingData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={85}
                  paddingAngle={3}
                  onClick={(entry) => {
                    if (entry && entry.name && entry.name.includes("Adaptation")) setActiveRing("adaptation");
                    else setActiveRing("mitigation");
                  }}
                >
                  {innerRingData.map((entry) => (
                    <Cell key={entry.name} fill={entry.color} className="cursor-pointer" />
                  ))}
                </Pie>

                {/* Outer Ring: Agency Allocation Drilldown */}
                <Pie
                  data={outerRingData}
                  dataKey="value"
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={140}
                  paddingAngle={2}
                >
                  {outerRingData.map((entry, index) => (
                    <Cell key={`outer-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400 border-t border-slate-800 pt-2 px-2">
            <span>Inner Ring: Adaptation (₱530B) vs Mitigation (₱108B)</span>
            <span className="text-blue-400">Outer Ring: Disaggregated Line Agency Share</span>
          </div>
        </div>

        {/* Agency Breakdown Critique List */}
        <div className="lg:col-span-5 space-y-3">
          <div className="text-xs font-mono-data text-slate-400 uppercase tracking-wider mb-2">
            Implementing Agency Captured Shares ({activeRing === 'adaptation' ? 'Adaptation' : 'Mitigation'})
          </div>

          {(activeRing === 'adaptation' ? ccetAgencyBreakdown2027 : ccetMitigationAgencies2027).map((item) => (
            <div
              key={item.agency}
              className={`p-3.5 rounded-xl border ${
                item.sharePct > 50
                  ? 'bg-blue-950/30 border-blue-800/80 shadow-md'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="flex items-center justify-between mb-1 font-mono-data text-xs">
                <span className="text-white font-bold">{item.agency}</span>
                <span className={item.sharePct > 50 ? 'text-blue-400 font-bold' : 'text-slate-300'}>
                  ₱{item.allocationPhpB.toFixed(1)}B ({item.sharePct}%)
                </span>
              </div>
              <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden my-2">
                <div
                  className={`h-1.5 ${item.sharePct > 50 ? 'bg-blue-500' : 'bg-emerald-500'}`}
                  style={{ width: `${item.sharePct}%` }}
                />
              </div>
              {'critique' in item && (
                <div className="text-[11px] text-slate-400 font-sans leading-tight mt-1">
                  {(item as { critique: string }).critique}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Historical CCET Evolution */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 font-mono-data text-xs">
        {ccetHistoricalData.map((d) => (
          <div key={d.year} className={`p-3 rounded-xl border ${d.year === '2027' ? 'bg-blue-950/40 border-blue-500' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="text-slate-400 mb-1">FY {d.year} CCET</div>
            <div className="text-base font-bold text-white">₱{d.total.toFixed(1)}B</div>
            <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
              <span className="text-blue-400">Adapt: {d.adaptation}B</span>
              <span className="text-emerald-400">Mitig: {d.mitigation}B</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
