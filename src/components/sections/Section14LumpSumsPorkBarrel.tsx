import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { lumpSumData, nonItemizedDescriptions } from '../../data/budgetData.ts';
import { CircleDot, AlertTriangle, ShieldCheck, Key, HelpCircle, Layers, FileWarning } from 'lucide-react';

interface BubbleItem {
  id: string;
  name: string;
  shortName: string;
  value: number; // 2027 PHP Billions
  peakValue: number;
  radius: number;
  color: string;
  category: 'unprogrammed' | 'spf';
  triggers: string;
  governanceRisk: string;
}

export const Section14LumpSumsPorkBarrel: React.FC = () => {
  const [selectedBubble, setSelectedBubble] = useState<string>('ua');

  const bubbles: BubbleItem[] = [
    {
      id: "ua",
      name: "Unprogrammed Appropriations (Standby Authority)",
      shortName: "Unprogrammed (UA)",
      value: 111.0,
      peakValue: 807.1,
      radius: 46, // Scaled down in 2027
      color: "#8B5CF6", // Purple
      category: "unprogrammed",
      triggers: "Excess national revenue collections certified by the BIR/BOC over annual DBCC targets, or newly secured foreign loan inflows.",
      governanceRisk: "Historically ballooned into an ₱800B+ shadow budget circumventing line-item scrutiny; used for GOCC reserve fund sweeps."
    },
    {
      id: "pgf",
      name: "Pension and Gratuity Fund (PGF)",
      shortName: "Pension & Gratuity (PGF)",
      value: 230.0,
      peakValue: 253.0,
      radius: 68, // Aggressively expanded
      color: "#EF4444", // Crimson
      category: "spf",
      triggers: "Mandatory indexation of military & uniformed personnel (MUP) pensions, terminal leave, and judicial retirement packages.",
      governanceRisk: "Non-contributory military pension legacy consumes expanding billions without actuarial reserves."
    },
    {
      id: "mpbf",
      name: "Miscellaneous Personnel Benefits Fund (MPBF)",
      shortName: "Personnel Benefits (MPBF)",
      value: 115.0,
      peakValue: 115.0,
      radius: 48,
      color: "#3B82F6", // Blue
      category: "spf",
      triggers: "Civilian salary standardization law tranches, monetization of leave, performance bonuses, unfilled position staffing.",
      governanceRisk: "Hundreds of billions parked outside agency control; slow bureaucratic release mechanisms."
    },
    {
      id: "calamity",
      name: "National Disaster Risk Reduction & Management Fund (Calamity)",
      shortName: "Calamity Fund (NDRRMF)",
      value: 35.0,
      peakValue: 35.0,
      radius: 28,
      color: "#F59E0B", // Amber
      category: "spf",
      triggers: "Official Presidential declaration of a State of Calamity upon catastrophic typhoon landfall, earthquake, or volcanic eruption.",
      governanceRisk: "Chronically depleted before Q4 due to frequent archipelagic disaster frequencies."
    }
  ];

  const active = bubbles.find(b => b.id === selectedBubble) || bubbles[0];

  return (
    <div>
      <SectionHeader
        number={14}
        title="Non-Itemized Funds, Lump Sums & 'Pork Barrel' Indicators"
        subtitle="Physics Bubble Cluster: Containment of the ₱807B Shadow Budget vs. Expanding Special Purpose Funds (PGF/MPBF)"
        badge="Discretionary Spending Perimeter"
        metric={{
          value: "₱111.0 B",
          label: "Unprogrammed Appropriations (Down from ₱807B)"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">Shrinking the Shadow Budget</h3>
<p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
  The 2027 budget makes a huge, highly publicized move by slashing <strong className="font-bold text-[#60A5FA]">&quot;Unprogrammed Appropriations&quot; (UA)</strong> down to a historic low of <span className="font-mono-data font-bold text-emerald-400">₱111.0 billion</span>. In the past, these standby funds exploded to over ₱800 billion, acting like a massive, hidden shadow budget. Because these funds didn't face the same strict congressional line-item scrutiny as regular budgets, the executive branch could easily maneuver money around mid-year—like when they controversially absorbed PhilHealth reserve funds.
</p>
<p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
  But even with this shadow budget shrinking, huge chunks of money are still sitting in vulnerable <strong className="font-bold text-white">Special Purpose Funds (SPFs)</strong>. For example, the Pension and Gratuity Fund controls a massive <strong className="font-bold text-white font-mono-data">₱230.0 billion</strong>, and the Miscellaneous Personnel Benefits Fund holds another <strong className="font-bold text-white font-mono-data">₱115.0 billion</strong>. On top of that, standard budgets in massive agencies like the DPWH are often used to hide localized <strong className="font-bold text-red-400">&quot;pork barrel&quot;</strong> infrastructure projects for politicians. Without strict open-data tracking by state auditors, billions of taxpayer pesos can still be legally shuffled around mid-year without lawmakers ever voting on it.
</p>
<p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
Bringing the unprogrammed shadow budget down to ₱111.0 billion is a massive win for transparency, but it doesn't completely close the door on political maneuvering. The danger has simply shifted. Instead of relying on a massive standby fund, billions are now sitting quietly inside massive pension funds and disguised within regular DPWH infrastructure budgets. If we don't actively track these vulnerable special purpose funds, politicians will continue to treat the national budget like their own private checkbook. You can explore exactly how these lump-sums are structured by referencing the <strong className="font-bold text-[#60A5FA]">2027 Data Analysis Budget Tracker</strong>.
</p>
      </div>

      {/* Interactive Physics-Style Bubble Cluster Visualizer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* SVG Interactive Bubble Canvas */}
        <div className="lg:col-span-7 bg-[#070D19] border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <CircleDot className="w-5 h-5 text-purple-400" />
              <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
                Geometric Bubble Cluster: Proportional Lump-Sum Allocations
              </h4>
            </div>
            <span className="text-[11px] font-mono-data text-slate-400">Click a bubble to inspect triggers</span>
          </div>

          <div className="relative w-full aspect-[4/3] bg-slate-950/90 rounded-xl border border-slate-900 p-4 flex items-center justify-center overflow-hidden">
            <svg viewBox="0 0 500 380" className="w-full h-full">
              {/* Bubble 1: Pension & Gratuity (PGF) - Largest in 2027 (₱230B) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedBubble('pgf')}
              >
                <circle
                  cx={180} cy={160} r={bubbles[1].radius}
                  fill={bubbles[1].color} fillOpacity={selectedBubble === 'pgf' ? 0.85 : 0.65}
                  stroke={selectedBubble === 'pgf' ? '#FFFFFF' : bubbles[1].color} strokeWidth={selectedBubble === 'pgf' ? 3 : 1.5}
                />
                <text x={180} y={150} fill="#FFF" fontSize={12} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">PGF</text>
                <text x={180} y={166} fill="#FCA5A5" fontSize={11} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">₱230.0B</text>
                <text x={180} y={180} fill="#E2E8F0" fontSize={9} textAnchor="middle" fontFamily="Space Mono">Pension Fund</text>
              </g>

              {/* Bubble 2: Unprogrammed Appropriations (UA) - Shrunk from 807B to 111B */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedBubble('ua')}
              >
                {/* Ghost circle showing 2023 peak of ₱807B */}
                <circle
                  cx={340} cy={130} r={105}
                  fill="none" stroke="#8B5CF6" strokeWidth={1} strokeDasharray="4 4" opacity={0.3}
                />
                <text x={340} y={40} fill="#A78BFA" fontSize={9} textAnchor="middle" fontFamily="Space Mono" opacity={0.6}>
                  2023 Peak: ₱807.1B
                </text>

                {/* Actual 2027 Shrunk Circle (₱111B) */}
                <circle
                  cx={340} cy={130} r={bubbles[0].radius}
                  fill={bubbles[0].color} fillOpacity={selectedBubble === 'ua' ? 0.85 : 0.65}
                  stroke={selectedBubble === 'ua' ? '#FFFFFF' : bubbles[0].color} strokeWidth={selectedBubble === 'ua' ? 3 : 1.5}
                />
                <text x={340} y={122} fill="#FFF" fontSize={11} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">UA</text>
                <text x={340} y={138} fill="#DDD6FE" fontSize={10} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">₱111.0B</text>
                <text x={340} y={150} fill="#E2E8F0" fontSize={8} textAnchor="middle" fontFamily="Space Mono">Unprogrammed</text>
              </g>

              {/* Bubble 3: MPBF (₱115B) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedBubble('mpbf')}
              >
                <circle
                  cx={290} cy={270} r={bubbles[2].radius}
                  fill={bubbles[2].color} fillOpacity={selectedBubble === 'mpbf' ? 0.85 : 0.65}
                  stroke={selectedBubble === 'mpbf' ? '#FFFFFF' : bubbles[2].color} strokeWidth={selectedBubble === 'mpbf' ? 3 : 1.5}
                />
                <text x={290} y={262} fill="#FFF" fontSize={11} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">MPBF</text>
                <text x={290} y={278} fill="#BFDBFE" fontSize={10} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">₱115.0B</text>
                <text x={290} y={290} fill="#E2E8F0" fontSize={8} textAnchor="middle" fontFamily="Space Mono">Civilian Benefits</text>
              </g>

              {/* Bubble 4: Calamity Fund (₱35B) */}
              <g
                className="cursor-pointer transition-transform hover:scale-105"
                onClick={() => setSelectedBubble('calamity')}
              >
                <circle
                  cx={130} cy={280} r={bubbles[3].radius}
                  fill={bubbles[3].color} fillOpacity={selectedBubble === 'calamity' ? 0.85 : 0.65}
                  stroke={selectedBubble === 'calamity' ? '#FFFFFF' : bubbles[3].color} strokeWidth={selectedBubble === 'calamity' ? 3 : 1.5}
                />
                <text x={130} y={276} fill="#FFF" fontSize={10} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">NDRRMF</text>
                <text x={130} y={290} fill="#FEF08A" fontSize={9} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">₱35.0B</text>
              </g>
            </svg>
          </div>

          <div className="text-[11px] font-mono-data text-slate-400 mt-2 flex items-center justify-between">
            <span className="text-purple-400">Dotted ring indicates historical ₱807B UA expansion in 2023</span>
            <span>Geometric volume scales with nominal PHP value</span>
          </div>
        </div>

        {/* Selected Fund Forensic Inspector */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono-data text-slate-400">
                  {active.category === 'unprogrammed' ? 'Standby Authorization' : 'Special Purpose Fund (SPF)'}
                </span>
                <h4 className="text-xl font-bold text-white font-display mt-0.5">
                  {active.shortName}
                </h4>
              </div>
              <span className="text-xl font-bold font-mono-data" style={{ color: active.color }}>
                ₱{active.value.toFixed(1)} B
              </span>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                <div className="text-[10px] uppercase font-mono-data text-blue-400 mb-1 flex items-center gap-1.5">
                  <Key className="w-3.5 h-3.5" /> Strict Legal Release Trigger Conditions
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">
                  {active.triggers}
                </p>
              </div>

              <div className="p-3 bg-slate-950/80 rounded-lg border border-slate-800">
                <div className="text-[10px] uppercase font-mono-data text-amber-400 mb-1 flex items-center gap-1.5">
                  <FileWarning className="w-3.5 h-3.5" /> Systemic Governance Hazard
                </div>
                <p className="text-slate-300 font-sans leading-relaxed">
                  {active.governanceRisk}
                </p>
              </div>

              <div className="flex items-center justify-between text-xs font-mono-data text-slate-400 pt-2 border-t border-slate-800">
                <span>Historical Peak:</span>
                <span className="text-white font-bold">₱{active.peakValue.toFixed(1)} Billion</span>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-data">
            Audited under General Provisions of the General Appropriations Act (GAA).
          </div>
        </div>
      </div>

      {/* Historical Lump Sum Comparison Table */}
      <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div className="text-xs font-mono-data text-slate-400 mb-3 flex items-center justify-between">
          <span>Decadal Trajectory of Major Lump Sums & Standby Authorities (₱ Billions)</span>
          <span className="text-purple-400">Normalized 2027 Ceiling</span>
        </div>
        <table className="w-full text-left text-xs font-mono-data">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Fiscal Year</th>
              <th className="py-2">Unprogrammed (UA)</th>
              <th className="py-2">Pension & Gratuity (PGF)</th>
              <th className="py-2">Misc Personnel (MPBF)</th>
              <th className="py-2 text-right">Calamity (NDRRMF)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {lumpSumData.map((row) => (
              <tr key={row.year} className={row.year === '2027' ? 'bg-purple-950/20 font-bold text-white' : ''}>
                <td className="py-2.5">{row.year}</td>
                <td className="py-2.5 text-purple-400">₱{row.unprogrammedAppropriations.toFixed(1)} B</td>
                <td className="py-2.5 text-red-400">₱{row.pensionGratuityFund.toFixed(1)} B</td>
                <td className="py-2.5 text-blue-400">₱{row.mpbf.toFixed(1)} B</td>
                <td className="py-2.5 text-right text-amber-400">₱{row.calamityFund.toFixed(1)} B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
