import React, { useState, useMemo } from 'react';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { lguTransfersData, ntaFormulaDistribution, regionalLguSamples } from '../../data/budgetData.ts';
import { GitFork, MapPin, Building, AlertTriangle, ArrowRight, ShieldAlert, Sparkles } from 'lucide-react';

interface SankeyNode {
  id: string;
  name: string;
  stage: number; // 0: Source, 1: Fund, 2: LGU Level
  value: number; // PHP Billions
  color: string;
  percentage?: number;
  description: string;
}

interface SankeyLink {
  source: string;
  target: string;
  value: number;
  color: string;
}

export const Section12LguSankeyTransfers: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  // Sankey Layout data
  const nodes: SankeyNode[] = [
    // Stage 0: National Origin
    {
      id: "national_rev",
      name: "National Tax Collections (BIR & BOC)",
      stage: 0,
      value: 1450.33,
      color: "#10B981",
      description: "Computed from the 3-year trailing average of national internal revenue and customs collections."
    },
    // Stage 1: Central Intergovernmental Transfer Mechanisms
    {
      id: "nta",
      name: "National Tax Allotment (NTA)",
      stage: 1,
      value: 1319.83,
      percentage: 91.0,
      color: "#3B82F6",
      description: "Automatic, non-discretionary constitutional formula transfer following the Mandanas-Garcia Supreme Court ruling."
    },
    {
      id: "barmm",
      name: "Bangsamoro Special Block Grant",
      stage: 1,
      value: 95.50,
      percentage: 6.6,
      color: "#F59E0B",
      description: "Statutory annual block grant mandated by the Bangsamoro Organic Law (BOL) for autonomous regional governance."
    },
    {
      id: "lgsf",
      name: "Local Government Support Fund (LGSF)",
      stage: 1,
      value: 35.00,
      percentage: 2.4,
      color: "#8B5CF6",
      description: "Discretionary financial assistance for local infrastructure, disaster rehabilitation, and water projects."
    },
    // Stage 2: LGC Legal Formula Breakdown (NTA Sub-streams)
    {
      id: "municipalities",
      name: "Municipalities (1,488 Units)",
      stage: 2,
      value: 448.74,
      percentage: 34.0,
      color: "#60A5FA",
      description: "34% of NTA. Distributed 50% population, 25% land area, 25% equal sharing."
    },
    {
      id: "provinces",
      name: "Provinces (82 Units)",
      stage: 2,
      value: 303.56,
      percentage: 23.0,
      color: "#93C5FD",
      description: "23% of NTA. Regional provincial health systems and secondary provincial roads."
    },
    {
      id: "cities",
      name: "Cities (149 Highly Urbanized & Component)",
      stage: 2,
      value: 303.56,
      percentage: 23.0,
      color: "#38BDF8",
      description: "23% of NTA. Urban centers with high own-source revenue mobilization."
    },
    {
      id: "barangays",
      name: "Barangays (42,027 Villages)",
      stage: 2,
      value: 263.97,
      percentage: 20.0,
      color: "#BAE6FD",
      description: "20% of NTA. Grassroots peace, order, sanitation, and basic dispute resolution."
    }
  ];

  const links: SankeyLink[] = [
    // Source -> Transfers
    { source: "national_rev", target: "nta", value: 1319.83, color: "rgba(59, 130, 246, 0.4)" },
    { source: "national_rev", target: "barmm", value: 95.50, color: "rgba(245, 158, 11, 0.4)" },
    { source: "national_rev", target: "lgsf", value: 35.00, color: "rgba(139, 92, 246, 0.4)" },
    // NTA -> 4 Sub-tiers
    { source: "nta", target: "municipalities", value: 448.74, color: "rgba(96, 165, 250, 0.4)" },
    { source: "nta", target: "provinces", value: 303.56, color: "rgba(147, 197, 253, 0.4)" },
    { source: "nta", target: "cities", value: 303.56, color: "rgba(56, 189, 248, 0.4)" },
    { source: "nta", target: "barangays", value: 263.97, color: "rgba(186, 230, 253, 0.4)" }
  ];

  // Coordinates for SVG rendering
  // Canvas width 880, height 400
  const stage0X = 40;
  const stage1X = 350;
  const stage2X = 660;
  const nodeWidth = 24;

  // Compute node Y positions
  const nodeLayout = useMemo(() => {
    // Stage 0
    const stage0 = [{ id: "national_rev", y: 40, height: 320 }];

    // Stage 1
    const stage1 = [
      { id: "nta", y: 40, height: 240 },
      { id: "barmm", y: 295, height: 42 },
      { id: "lgsf", y: 350, height: 22 }
    ];

    // Stage 2
    const stage2 = [
      { id: "municipalities", y: 40, height: 105 },
      { id: "provinces", y: 160, height: 72 },
      { id: "cities", y: 246, height: 72 },
      { id: "barangays", y: 332, height: 58 }
    ];

    return {
      national_rev: { x: stage0X, y: 40, height: 320 },
      nta: { x: stage1X, y: 40, height: 235 },
      barmm: { x: stage1X, y: 290, height: 42 },
      lgsf: { x: stage1X, y: 345, height: 22 },
      municipalities: { x: stage2X, y: 40, height: 100 },
      provinces: { x: stage2X, y: 155, height: 70 },
      cities: { x: stage2X, y: 240, height: 70 },
      barangays: { x: stage2X, y: 325, height: 55 }
    };
  }, []);

  return (
    <div>
      <SectionHeader
        number={12}
        title="Intergovernmental Fiscal Transfers & LGU Allocations"
        subtitle="Multi-Tiered Sankey Flow: ₱1.32T NTA Surge, Mandanas Formula Streams & Devolution Inefficiencies"
        badge="Post-Mandanas Doctrine"
        metric={{
          value: "₱1,450.3 B",
          label: "Total Transfers to LGUs"
        }}
      />

      {/* Analytical Briefing Text */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 lg:p-8 mb-8">
        <div className="text-[0.75rem] font-mono-data uppercase tracking-[0.1em] text-[#60A5FA] mb-3">
          INTERGOVERNMENTAL MANDANAS TRANSFERS
        </div>
        <h3 className="text-xl font-bold text-white mb-4 font-sans">The Danger of Dumping Funds Without Capacity</h3>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          The <strong className="font-bold text-[#60A5FA]">Mandanas ruling</strong> completely changed how the government shares its money, and the 2027 budget cements this new reality. Because of this ruling, Local Government Units (LGUs) are now guaranteed a much larger, permanent cut of all national taxes collected by the BIR and BOC. For 2027, the <strong className="font-bold text-white">National Tax Allotment (NTA)</strong> is projected to surge to <strong className="font-bold text-white font-mono-data">₱1.319 trillion</strong>—a nearly 11% jump from the previous year. When you add in discretionary support funds (₱35.0 billion) and autonomous grants for regions like the Bangsamoro (₱95.5 billion), the central government is transferring a massive <strong className="font-bold text-white font-mono-data">₱1.450 trillion</strong> straight to local governments.
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          But there is a massive, dangerous catch. The plan was for the national government to hand over both the money <em>and</em> the responsibility for basic services (like local roads, farming support, and clinics) to the LGUs through <strong className="font-bold text-white">Devolution Transition Plans</strong>. That plan has hit a severe bottleneck. While wealthy cities can handle this, poorer municipalities simply don't have the engineers, procurement experts, or technical skills to spend this massive influx of cash efficiently. The money is sitting there, but the local governments can't absorb it.
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
        We have essentially dumped over a trillion pesos onto local governments without making sure they actually know how to build a clinic or run an agricultural program. This creates a dual burden: the national government is forced to give away its funds, but the local governments are paralyzed by their lack of technical capacity. Instead of speeding up national growth, this massive transfer of wealth risks stalling our most critical local services. To monitor how these NTA allocations are distributed and whether devolution plans are progressing, you can refer to the <strong className="font-bold text-[#60A5FA]">2027 Data Analysis Budget Tracker</strong>.
        </p>
      </div>

      {/* Regional Explorer Controls */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 mb-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4 text-blue-400" />
            <span className="text-xs uppercase tracking-wider font-mono-data text-slate-300">
              Regional Footprint Inspection (Spotlight on Western Visayas, BARMM & Central Luzon)
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setSelectedRegion(null)}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                selectedRegion === null ? 'bg-blue-600 text-white font-bold' : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              National Aggregate
            </button>
            {regionalLguSamples.map((r) => (
              <button
                key={r.region}
                onClick={() => setSelectedRegion(selectedRegion === r.region ? null : r.region)}
                className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                  selectedRegion === r.region
                    ? 'bg-blue-500 text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {r.region.split(' (')[0]}
              </button>
            ))}
          </div>
        </div>

        {/* Selected Region Spotlight Banner */}
        {selectedRegion && (
          <div className="p-3 bg-blue-950/40 border border-blue-800/80 rounded-lg text-xs font-mono-data mb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-blue-300 font-bold">{selectedRegion}:</span>
              <span className="text-slate-300 ml-2">
                {regionalLguSamples.find(r => r.region === selectedRegion)?.note}
              </span>
            </div>
            <div className="flex items-center gap-4 text-slate-300">
              <span>Transfer: <strong>₱{regionalLguSamples.find(r => r.region === selectedRegion)?.totalTransfer}B</strong></span>
              <span>Absorptive Index: <strong className="text-amber-400">{regionalLguSamples.find(r => r.region === selectedRegion)?.absorptiveIndex}</strong></span>
            </div>
          </div>
        )}

        {/* Sankey Flow Canvas (SVG) */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[800px] bg-[#070D19] border border-slate-800/80 rounded-xl p-6 relative">
            <div className="flex items-center justify-between text-xs font-mono-data text-slate-400 mb-6 border-b border-slate-800 pb-2">
              <span className="w-1/3">Stage 0: National Revenue Pool</span>
              <span className="w-1/3 text-center">Stage 1: Statutory Allocation Streams</span>
              <span className="w-1/3 text-right">Stage 2: LGC Tier Distribution (NTA)</span>
            </div>

            <svg viewBox="0 0 840 400" className="w-full h-auto overflow-visible">
              <defs>
                {/* Gradients for ribbons */}
                <linearGradient id="grad-nta" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="grad-barmm" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.6" />
                </linearGradient>
                <linearGradient id="grad-lgsf" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#10B981" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.6" />
                </linearGradient>

                <linearGradient id="grad-muni" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#60A5FA" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="grad-prov" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="grad-cities" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.7" />
                </linearGradient>
                <linearGradient id="grad-brgy" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.7" />
                </linearGradient>
              </defs>

              {/* Ribbon 1: National -> NTA */}
              <path
                d="M 64 60 C 200 60, 200 60, 350 60 L 350 260 C 200 260, 200 310, 64 310 Z"
                fill="url(#grad-nta)"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* Ribbon 2: National -> BARMM */}
              <path
                d="M 64 312 C 200 312, 200 295, 350 295 L 350 332 C 200 332, 200 338, 64 338 Z"
                fill="url(#grad-barmm)"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* Ribbon 3: National -> LGSF */}
              <path
                d="M 64 340 C 200 340, 200 350, 350 350 L 350 367 C 200 367, 200 360, 64 360 Z"
                fill="url(#grad-lgsf)"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* Ribbon 4: NTA -> Municipalities (34%) */}
              <path
                d="M 374 60 C 500 60, 500 50, 660 50 L 660 135 C 500 135, 500 120, 374 120 Z"
                fill="url(#grad-muni)"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* Ribbon 5: NTA -> Provinces (23%) */}
              <path
                d="M 374 125 C 500 125, 500 160, 660 160 L 660 220 C 500 220, 500 175, 374 175 Z"
                fill="url(#grad-prov)"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* Ribbon 6: NTA -> Cities (23%) */}
              <path
                d="M 374 180 C 500 180, 500 245, 660 245 L 660 305 C 500 305, 500 225, 374 225 Z"
                fill="url(#grad-cities)"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* Ribbon 7: NTA -> Barangays (20%) */}
              <path
                d="M 374 230 C 500 230, 500 330, 660 330 L 660 375 C 500 375, 500 265, 374 265 Z"
                fill="url(#grad-brgy)"
                className="hover:opacity-90 transition-opacity cursor-pointer"
              />

              {/* Nodes Rendering */}
              {Object.entries(nodeLayout).map(([id, coord]) => {
                const node = nodes.find(n => n.id === id);
                if (!node) return null;
                const isHovered = hoveredNode === id;

                return (
                  <g
                    key={id}
                    onMouseEnter={() => setHoveredNode(id)}
                    onMouseLeave={() => setHoveredNode(null)}
                    className="cursor-pointer"
                  >
                    <rect
                      x={coord.x}
                      y={coord.y}
                      width={nodeWidth}
                      height={coord.height}
                      fill={node.color}
                      rx={4}
                      className={`transition-all ${isHovered ? 'stroke-white stroke-2' : ''}`}
                    />
                    {/* Node Label Text */}
                    <text
                      x={coord.x < 300 ? coord.x + 30 : coord.x > 500 ? coord.x - 12 : coord.x + 30}
                      y={coord.y + Math.min(20, coord.height / 2)}
                      textAnchor={coord.x > 500 ? "end" : "start"}
                      fill="#FFFFFF"
                      fontSize={11}
                      fontWeight="bold"
                      fontFamily="Space Mono"
                    >
                      {node.name.split(' (')[0]}
                    </text>
                    <text
                      x={coord.x < 300 ? coord.x + 30 : coord.x > 500 ? coord.x - 12 : coord.x + 30}
                      y={coord.y + Math.min(20, coord.height / 2) + 14}
                      textAnchor={coord.x > 500 ? "end" : "start"}
                      fill="#94A3B8"
                      fontSize={10}
                      fontFamily="Space Mono"
                    >
                      ₱{node.value.toFixed(1)}B {node.percentage ? `(${node.percentage}%)` : ''}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Node Detail Popup when hovered */}
        {hoveredNode && (
          <div className="mt-4 p-4 bg-slate-900 border border-blue-500/50 rounded-lg text-xs font-mono-data">
            <div className="flex items-center justify-between text-white font-bold mb-1">
              <span>{nodes.find(n => n.id === hoveredNode)?.name}</span>
              <span className="text-blue-400">₱{nodes.find(n => n.id === hoveredNode)?.value.toFixed(2)} Billion</span>
            </div>
            <p className="text-slate-300 font-sans text-xs">
              {nodes.find(n => n.id === hoveredNode)?.description}
            </p>
          </div>
        )}
      </div>

      {/* Historical NTA Evolution Table */}
      <div className="overflow-x-auto bg-slate-900/60 border border-slate-800 rounded-xl p-4">
        <div className="text-xs font-mono-data text-slate-400 mb-3 flex items-center justify-between">
          <span>Decadal Trajectory of Sovereign Intergovernmental Transfers (₱ Billions)</span>
          <span className="text-blue-400">Mandanas-Garcia Effect</span>
        </div>
        <table className="w-full text-left text-xs font-mono-data">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400">
              <th className="py-2">Fiscal Year</th>
              <th className="py-2">NTA (Mandated)</th>
              <th className="py-2">LGSF (Discretionary)</th>
              <th className="py-2">BARMM Block Grant</th>
              <th className="py-2 text-right">Total Transfers to LGUs</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60 text-slate-200">
            {lguTransfersData.map((row) => (
              <tr key={row.year} className={row.year === '2027' ? 'bg-blue-500/10 font-bold text-white' : ''}>
                <td className="py-2.5">{row.year}</td>
                <td className="py-2.5 text-blue-400">₱{row.nta.toFixed(2)} B</td>
                <td className="py-2.5 text-purple-400">₱{row.lgsf.toFixed(2)} B</td>
                <td className="py-2.5 text-amber-400">₱{row.barmmBlockGrant.toFixed(2)} B</td>
                <td className="py-2.5 text-right font-bold text-white">₱{row.total.toFixed(2)} B</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
