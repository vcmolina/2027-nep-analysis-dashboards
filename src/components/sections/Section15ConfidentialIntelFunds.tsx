import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { cifEntities, cifTotal2027 } from '../../data/budgetData.ts';
import { EyeOff, ShieldAlert, Lock, AlertTriangle, FileText, Info, HelpCircle } from 'lucide-react';

interface SunburstSlice {
  name: string;
  category: string;
  value: number; // in PHP Millions
  color: string;
  description: string;
  coaLimitations: string;
}

export const Section15ConfidentialIntelFunds: React.FC = () => {
  const [selectedEntity, setSelectedEntity] = useState<string>('Office of the President (OP)');
  const [showCoaModal, setShowCoaModal] = useState(false);

  const activeEntityData = cifEntities.find(e => e.entity === selectedEntity) || cifEntities[0];

  return (
    <div>
      <SectionHeader
        number={15}
        title="Surveillance, Intelligence & Confidential Funds"
        subtitle="Sunburst Hierarchy: ₱10.77B Executive Plateau, Office of the President Hegemony & COA JC 2015-01 Sealed Opacity"
        badge="State-Sanctioned Opacity"
        metric={{
          value: "₱10.773 B",
          label: "Total National CIF Envelope"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">The President's Shadow Ledger</h3>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
  The budget for <strong className="font-bold text-[#60A5FA]">Confidential and Intelligence Funds (CIF)</strong> is always the most fiercely debated and heavily guarded secret in the national budget. For 2027, the administration is asking for a massive <strong className="font-bold text-white font-mono-data">₱10.773 billion</strong>. This is split into <strong className="font-bold text-emerald-400 font-mono-data">₱4.368 billion</strong> for Confidential Expenses and <strong className="font-bold text-emerald-400 font-mono-data">₱6.405 billion</strong> for Intelligence Expenses. Despite massive public outrage and intense congressional hearings, this massive total hasn't really budged from the historic highs set a few years ago.
    </p>
    <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
  The real shocker is where this money is actually going. Instead of funding frontline defense, surveillance power is heavily centralized right in the executive branch. The <strong className="font-bold text-white">Office of the President (OP)</strong> alone is swallowing up <strong className="font-bold text-red-400 font-mono-data">₱4.500 billion</strong>—a staggering <span className="font-mono-data font-bold text-white">41.8% of the entire national CIF budget</span>. To put that in perspective, the President's office gets vastly more intelligence money than the actual military (<strong className="font-bold text-white font-mono-data">₱1.848 billion</strong>) and the national police (<strong className="font-bold text-white font-mono-data">₱906.6 million</strong>) combined. Worse, because these funds are legally shielded from standard public audits under COA rules and rely on sealed envelopes, it is practically impossible for the public to know if this ₱10.77 billion is actually keeping the country safe or just avoiding democratic scrutiny.
    </p>
<p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
Giving the Office of the President more secret funds than the entire armed forces and police combined fundamentally warps the concept of national security. When over 40% of the country's shadow ledger sits on one desk, completely immune from public audits, it stops looking like an intelligence budget and starts looking like an unchecked executive slush fund. If we can't see the receipts, we can't trust the results.
</p>
      </div>

      {/* Sunburst Radial Hierarchy Visualization (SVG) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* SVG Sunburst Diagram */}
        <div className="lg:col-span-7 bg-[#070D19] border border-slate-800 rounded-xl p-6 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2">
              <EyeOff className="w-5 h-5 text-purple-400" />
              <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
                Sunburst Concentric Hierarchy: Total → Classification → Agency
              </h4>
            </div>
            <button
              onClick={() => setShowCoaModal(true)}
              className="text-xs font-mono-data text-blue-400 hover:text-blue-300 flex items-center gap-1 bg-slate-900 px-2 py-1 rounded border border-slate-800"
            >
              <HelpCircle className="w-3.5 h-3.5" /> COA JC 2015-01 Rules
            </button>
          </div>

          <div className="relative w-full aspect-square max-h-[440px] flex items-center justify-center">
            <svg viewBox="0 0 500 500" className="w-full h-full overflow-visible">
              <g transform="translate(250, 250)">
                {/* Center Core: Total ₱10.773 Billion */}
                <circle cx={0} cy={0} r={55} fill="#0F172A" stroke="#475569" strokeWidth={2} />
                <text x={0} y={-8} fill="#E2E8F0" fontSize={11} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">TOTAL CIF</text>
                <text x={0} y={12} fill="#A855F7" fontSize={14} fontWeight="bold" textAnchor="middle" fontFamily="Space Mono">₱10.77B</text>
                <text x={0} y={26} fill="#64748B" fontSize={8} textAnchor="middle" fontFamily="Space Mono">2027 Proposed</text>

                {/* Ring 1: Legal Classifications */}
                {/* Confidential Fund (40.55% = ~146 deg) */}
                <path
                  d="M 0 -60 A 95 95 0 0 1 93 18 L 68 13 A 70 70 0 0 0 0 -60 Z"
                  fill="#7C3AED" fillOpacity={0.8} stroke="#4C1D95" strokeWidth={1}
                />
                <text x={45} y={-45} fill="#EDE9FE" fontSize={9} fontWeight="bold" fontFamily="Space Mono">Confidential (₱4.37B)</text>

                {/* Intelligence Fund (59.45% = ~214 deg) */}
                <path
                  d="M 93 18 A 95 95 0 1 1 0 -60 L 0 -70 A 95 95 0 1 0 93 18 Z"
                  fill="#DC2626" fillOpacity={0.8} stroke="#991B1B" strokeWidth={1}
                />
                <text x={-60} y={30} fill="#FEE2E2" fontSize={9} fontWeight="bold" fontFamily="Space Mono">Intelligence (₱6.41B)</text>

                {/* Ring 2: Recipient Agencies (Outer Ring) */}
                {/* Office of the President OP (41.8% = 150 deg arc) */}
                <path
                  d="M 0 -105 A 175 175 0 0 1 168 45 L 125 33 A 130 130 0 0 0 0 -105 Z"
                  fill={selectedEntity.includes('President') ? '#F59E0B' : '#D97706'}
                  stroke={selectedEntity.includes('President') ? '#FFFFFF' : '#92400E'}
                  strokeWidth={selectedEntity.includes('President') ? 2 : 1}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedEntity('Office of the President (OP)')}
                />
                <text x={95} y={-55} fill="#FFFFFF" fontSize={11} fontWeight="bold" fontFamily="Space Mono">
                  OP: ₱4,500M (41.8%)
                </text>

                {/* Dept of National Defense DND (17.2%) */}
                <path
                  d="M 168 45 A 175 175 0 0 1 70 160 L 52 119 A 130 130 0 0 0 125 33 Z"
                  fill={selectedEntity.includes('Defense') ? '#10B981' : '#059669'}
                  stroke={selectedEntity.includes('Defense') ? '#FFFFFF' : '#047857'}
                  strokeWidth={selectedEntity.includes('Defense') ? 2 : 1}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedEntity('Dept. of National Defense (DND)')}
                />
                <text x={115} y={115} fill="#FFFFFF" fontSize={9} fontWeight="bold" fontFamily="Space Mono">
                  DND: ₱1,848M
                </text>

                {/* DILG / PNP (8.4%) */}
                <path
                  d="M 70 160 A 175 175 0 0 1 -35 171 L -26 127 A 130 130 0 0 0 52 119 Z"
                  fill={selectedEntity.includes('DILG') ? '#3B82F6' : '#2563EB'}
                  stroke={selectedEntity.includes('DILG') ? '#FFFFFF' : '#1D4ED8'}
                  strokeWidth={selectedEntity.includes('DILG') ? 2 : 1}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedEntity('DILG / Philippine National Police (PNP)')}
                />
                <text x={0} y={150} fill="#FFFFFF" fontSize={8} fontWeight="bold" fontFamily="Space Mono">
                  PNP: ₱907M
                </text>

                {/* DOJ / NBI (5.4%) */}
                <path
                  d="M -35 171 A 175 175 0 0 1 -115 131 L -85 97 A 130 130 0 0 0 -26 127 Z"
                  fill={selectedEntity.includes('Justice') ? '#8B5CF6' : '#6D28D9'}
                  stroke={selectedEntity.includes('Justice') ? '#FFFFFF' : '#5B21B6'}
                  strokeWidth={selectedEntity.includes('Justice') ? 2 : 1}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedEntity('Department of Justice (DOJ / NBI)')}
                />
                <text x={-95} y={125} fill="#FFFFFF" fontSize={8} fontWeight="bold" fontFamily="Space Mono">
                  DOJ: ₱579M
                </text>

                {/* Other Agencies / Civilian (27.3%) */}
                <path
                  d="M -115 131 A 175 175 0 0 1 0 -175 L 0 -130 A 130 130 0 0 0 -85 97 Z"
                  fill={selectedEntity.includes('Civilian') ? '#64748B' : '#475569'}
                  stroke={selectedEntity.includes('Civilian') ? '#FFFFFF' : '#334155'}
                  strokeWidth={selectedEntity.includes('Civilian') ? 2 : 1}
                  className="cursor-pointer transition-all hover:opacity-90"
                  onClick={() => setSelectedEntity('Civilian & Other Line Agencies')}
                />
                <text x={-110} y={-40} fill="#FFFFFF" fontSize={9} fontWeight="bold" fontFamily="Space Mono">
                  Others: ₱2,939M (27.3%)
                </text>
              </g>
            </svg>
          </div>

          <div className="text-[11px] font-mono-data text-slate-400 text-center border-t border-slate-800 pt-2">
            Click any agency arc on the outer ring to inspect internal intelligence allocation.
          </div>
        </div>

        {/* Selected Agency Forensic Profile */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono-data text-amber-400">
                  Recipient Portfolio
                </span>
                <h4 className="text-xl font-bold text-white font-display mt-0.5">
                  {activeEntityData.entity}
                </h4>
              </div>
              <span className="text-xl font-bold font-mono-data text-amber-400">
                ₱{activeEntityData.y2027.toFixed(1)} M
              </span>
            </div>

            <div className="space-y-3 font-mono-data text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">National CIF Share:</span>
                <span className="text-white font-bold">{activeEntityData.share2027Pct}%</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-purple-400">Confidential Share:</span>
                <span className="text-white font-bold">₱{activeEntityData.confidential2027.toFixed(1)} Million</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-red-400">Intelligence Share:</span>
                <span className="text-white font-bold">₱{activeEntityData.intelligence2027.toFixed(1)} Million</span>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
              <div className="text-[11px] uppercase tracking-wider font-mono-data text-slate-400 mb-1 flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-amber-400" /> Operational Mandate & Audit Constraints
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {activeEntityData.auditNotes}
              </p>
            </div>

            <div className="mt-4 p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-xs font-mono-data text-red-300">
              <div className="font-bold flex items-center gap-1.5 mb-1">
                <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Executive Monopoly Note
              </div>
              The Office of the President commands more confidential & intelligence cash than the DND, AFP, and PNP combined.
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-data">
            Governed under COA-DBM-DILG-GCG-DND Joint Circular 2015-01.
          </div>
        </div>
      </div>

      {/* Attribution Banner at the Last Slide */}
      <div className="mt-10 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-6 sm:p-8 rounded-2xl border border-slate-800/80 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="h-12 w-1.5 bg-gradient-to-b from-blue-500 via-indigo-500 to-emerald-400 rounded-full" />
          <div>
            <span className="text-[11px] uppercase tracking-widest font-mono-data text-slate-400 block mb-0.5">
              2027 NEP Sovereign Financial Briefing
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white font-display tracking-tight">
              Dashboard by Val Cymon Molina
            </h3>
          </div>
        </div>
        <div className="text-xs text-slate-400 font-mono-data bg-[#070D19] border border-slate-700/80 px-4 py-2 rounded-xl text-center">
          Open Sovereign Fiscal Architecture
        </div>
      </div>

      {/* COA Joint Circular 2015-01 Info Modal */}
      {showCoaModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#0B1120] border border-slate-700 max-w-xl w-full rounded-2xl p-6 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-5 h-5 text-red-400" />
                <h3 className="text-base font-bold text-white font-display">
                  COA Joint Circular 2015-01: The Legal Mechanics of Opacity
                </h3>
              </div>
              <button
                onClick={() => setShowCoaModal(false)}
                className="text-slate-400 hover:text-white font-mono-data text-xs"
              >
                [CLOSE]
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300 leading-relaxed font-sans">
              <p>
                Under <strong>COA-DBM-DILG-GCG-DND Joint Circular No. 2015-01</strong>, Confidential and Intelligence Funds are audited through segregated, non-public procedures:
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-slate-400">
                <li><strong className="text-white">Sealed Transmittals:</strong> Vouchers and liquidation reports are enclosed in sealed envelopes marked &apos;CONFIDENTIAL&apos; and submitted solely to the Intelligence and Confidential Fund Audit Office (ICFAO).</li>
                <li><strong className="text-white">Exemption from Itemized Audit:</strong> Unlike standard government expenditures, public line-by-line official receipts (ORs) and contractor bids are completely suppressed.</li>
                <li><strong className="text-white">Restricted Peer Review:</strong> Resident COA auditors embedded within departments are barred from reviewing or disallowing CIF expenditures.</li>
              </ul>
              <p className="pt-2 text-slate-400 border-t border-slate-800 font-mono-data text-[11px]">
                Conclusion: This statutory framework prevents public econometric validation, creating a structural democratic friction between executive discretion and legislative transparency.
              </p>
            </div>

            <div className="mt-5 text-right">
              <button
                onClick={() => setShowCoaModal(false)}
                className="px-4 py-1.5 bg-blue-600 text-white rounded text-xs font-mono-data font-bold hover:bg-blue-500"
              >
                Acknowledge Audit Restrictions
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
