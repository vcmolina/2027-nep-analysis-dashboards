import React, { useState } from 'react';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { floodBudgetTrend, majorRiverBasins, RiverBasinData } from '../../data/budgetData.ts';
import { Waves, AlertTriangle, MapPin, ShieldAlert, ArrowDownRight, Droplets, Info } from 'lucide-react';

export const Section7FloodControlBasins: React.FC = () => {
  const [selectedBasin, setSelectedBasin] = useState<RiverBasinData>(majorRiverBasins[0]);
  const [filterIsland, setFilterIsland] = useState<'all' | 'Luzon' | 'Visayas' | 'Mindanao'>('all');

  const filteredBasins = filterIsland === 'all'
    ? majorRiverBasins
    : majorRiverBasins.filter(b => b.island === filterIsland);

  // Compute total 2027 DPWH flood allocation vs 2025 peak
  return (
    <div>
      <SectionHeader
        number={7}
        title="Flood Control & Disaster Resilience"
        subtitle="18 Major River Basin Catchments: Capital Density vs. Inundation Dissonance & The ₱83.8B Rationalization"
        badge="Disaster Risk Governance"
        metric={{
          value: "₱83.84 B",
          label: "2027 DPWH Flood Budget (Peak: ₱350B)"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">Moving Beyond Concrete Patchwork</h3>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The government's <strong className="font-bold text-[#60A5FA]">flood control budget</strong> is often one of the most controversial and confusing parts of national spending. Over the last ten years, hundreds of billions have been poured into the DPWH Flood Management Program, hitting a massive <strong className="font-bold text-white font-mono-data">₱350.0 billion</strong> in 2025. Yet, despite this massive spending, our cities and farms keep drowning every time a major typhoon hits. For 2027, Congress pushed back hard against this broken system, drastically slashing the proposed budget down to <strong className="font-bold text-red-400 font-mono-data">₱83.84 billion</strong> to stop the flow of inefficient and opaque funding.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The main reason we aren't seeing real protection is that the government is treating a massive disease with local band-aids. Instead of designing a holistic engineering plan for entire river systems from the mountains down to the sea, they just build random <strong className="font-bold text-red-400">concrete dikes</strong> or dredge small sections of rivers in isolated towns. As climate change makes typhoons stronger, this fragmented approach is simply failing. The 2027 budget cut signals an urgent need to stop relying only on concrete and start investing in <strong className="font-bold text-emerald-400">nature-based solutions (NbS)</strong>—like planting trees in the uplands and continuously clearing out river silt.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
      We have been throwing hundreds of billions of pesos into a literal sinkhole. Building an expensive concrete dike in one town does nothing if the water just overflows into the next town downstream because the entire river basin wasn't engineered to handle the volume. Slashing this budget is a massive wake-up call that we can no longer concrete our way out of climate disasters without a unified, nature-based master plan.
      </p>
      </div>

      {/* Flood Budget Trend Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-6 font-mono-data text-xs">
        {floodBudgetTrend.map((t) => (
          <div key={t.year} className={`p-3 rounded-xl border ${t.year === 2027 ? 'bg-blue-950/40 border-blue-500 font-bold' : 'bg-slate-900/60 border-slate-800'}`}>
            <div className="text-slate-400 mb-1">FY {t.year} Combined</div>
            <div className="text-base text-white">₱{t.total.toFixed(2)}B</div>
            <div className="text-[10px] text-slate-400 mt-1 flex justify-between">
              <span className="text-blue-400">DPWH: {t.dpwh}B</span>
              <span className="text-amber-400">MMDA: {t.mmda}B</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Basin Map & Catchment Explorer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Interactive Catchment Map Visualizer (SVG) */}
        <div className="lg:col-span-7 bg-[#070D19] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Waves className="w-5 h-5 text-blue-400" />
              <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
                Archipelagic Catchment Density Map
              </h4>
            </div>
            {/* Island Filter Tabs */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg text-xs font-mono-data">
              {(['all', 'Luzon', 'Visayas', 'Mindanao'] as const).map(isl => (
                <button
                  key={isl}
                  onClick={() => setFilterIsland(isl)}
                  className={`px-2 py-0.5 rounded transition-colors ${
                    filterIsland === isl ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {isl === 'all' ? 'All (18)' : isl}
                </button>
              ))}
            </div>
          </div>

          {/* SVG Stylized Map of Philippines River Basins */}
          <div className="relative w-full aspect-[4/3] bg-slate-950/80 rounded-xl border border-slate-900 p-2 overflow-hidden flex items-center justify-center">
            <svg viewBox="0 0 500 650" className="w-full h-full max-h-[500px]">
              {/* Archipelagic outline stylized backdrop */}
              <path
                d="M 180 80 Q 240 100 230 180 Q 200 240 160 260 Q 220 320 280 340 Q 320 400 300 480 Q 260 550 200 580 Q 150 560 180 500 Q 190 420 160 380 Q 140 320 150 250 Q 130 180 180 80 Z"
                fill="#0F172A"
                stroke="#1E293B"
                strokeWidth="1.5"
                opacity="0.6"
              />

              {/* Coordinates of the 18 Major River Basins */}
              {/* Luzon Basins */}
              <g className="cursor-pointer">
                {/* Cagayan */}
                <circle
                  cx={230} cy={110} r={selectedBasin.id === 'cagayan' ? 24 : 18}
                  fill="#1E3A8A" stroke={selectedBasin.id === 'cagayan' ? '#60A5FA' : '#3B82F6'} strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'cagayan')!)}
                />
                <text x={230} y={114} fill="#FFF" fontSize={9} textAnchor="middle" fontFamily="Space Mono">CAGAYAN</text>

                {/* Agno */}
                <circle
                  cx={180} cy={150} r={selectedBasin.id === 'agno' ? 20 : 15}
                  fill="#1E3A8A" stroke={selectedBasin.id === 'agno' ? '#60A5FA' : '#3B82F6'} strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'agno')!)}
                />
                <text x={180} y={154} fill="#FFF" fontSize={8} textAnchor="middle" fontFamily="Space Mono">AGNO</text>

                {/* Pampanga */}
                <circle
                  cx={210} cy={190} r={selectedBasin.id === 'pampanga' ? 26 : 20}
                  fill="#1E293B" stroke={selectedBasin.id === 'pampanga' ? '#F59E0B' : '#60A5FA'} strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'pampanga')!)}
                />
                <text x={210} y={194} fill="#FFF" fontSize={8} textAnchor="middle" fontFamily="Space Mono">PAMPANGA</text>

                {/* Pasig-Laguna */}
                <circle
                  cx={220} cy={230} r={selectedBasin.id === 'pasig_laguna' ? 28 : 22}
                  fill="#312E81" stroke="#818CF8" strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'pasig_laguna')!)}
                />
                <text x={220} y={233} fill="#FFF" fontSize={8} textAnchor="middle" fontFamily="Space Mono">PASIG</text>

                {/* Bicol */}
                <circle
                  cx={280} cy={280} r={selectedBasin.id === 'bicol' ? 22 : 16}
                  fill="#1E3A8A" stroke="#3B82F6" strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'bicol')!)}
                />
                <text x={280} y={284} fill="#FFF" fontSize={8} textAnchor="middle" fontFamily="Space Mono">BICOL</text>

                {/* Visayas Basins */}
                {/* Panay */}
                <circle
                  cx={210} cy={350} r={selectedBasin.id === 'panay' ? 18 : 13}
                  fill="#1E3A8A" stroke="#3B82F6" strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'panay')!)}
                />
                <text x={210} y={353} fill="#FFF" fontSize={7} textAnchor="middle" fontFamily="Space Mono">PANAY</text>

                {/* Jalaur */}
                <circle
                  cx={235} cy={375} r={selectedBasin.id === 'jalaur' ? 16 : 12}
                  fill="#1E3A8A" stroke="#3B82F6" strokeWidth={1.5}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'jalaur')!)}
                />
                <text x={235} y={378} fill="#FFF" fontSize={7} textAnchor="middle" fontFamily="Space Mono">JALAUR</text>

                {/* Ilog-Hilabangan */}
                <circle
                  cx={245} cy={410} r={selectedBasin.id === 'ilog_hilabangan' ? 16 : 12}
                  fill="#1E3A8A" stroke="#3B82F6" strokeWidth={1.5}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'ilog_hilabangan')!)}
                />
                <text x={245} y={413} fill="#FFF" fontSize={7} textAnchor="middle" fontFamily="Space Mono">ILOG</text>

                {/* Mindanao Basins */}
                {/* Agusan */}
                <circle
                  cx={340} cy={480} r={selectedBasin.id === 'agusan' ? 22 : 17}
                  fill="#1E3A8A" stroke="#3B82F6" strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'agusan')!)}
                />
                <text x={340} y={484} fill="#FFF" fontSize={8} textAnchor="middle" fontFamily="Space Mono">AGUSAN</text>

                {/* Mindanao / Cotabato */}
                <circle
                  cx={280} cy={530} r={selectedBasin.id === 'mindanao_cotabato' ? 26 : 20}
                  fill="#312E81" stroke="#818CF8" strokeWidth={2}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'mindanao_cotabato')!)}
                />
                <text x={280} y={533} fill="#FFF" fontSize={8} textAnchor="middle" fontFamily="Space Mono">COTABATO</text>

                {/* Davao */}
                <circle
                  cx={330} cy={545} r={selectedBasin.id === 'davao' ? 16 : 12}
                  fill="#1E3A8A" stroke="#3B82F6" strokeWidth={1.5}
                  onClick={() => setSelectedBasin(majorRiverBasins.find(b => b.id === 'davao')!)}
                />
                <text x={330} y={548} fill="#FFF" fontSize={7} textAnchor="middle" fontFamily="Space Mono">DAVAO</text>
              </g>

              {/* Dissonance Red Warning Overlay Icons */}
              <g>
                {/* Cagayan Dissonance */}
                <circle cx={250} cy={100} r={5} fill="#EF4444" className="animate-pulse" />
                {/* Pampanga Dissonance */}
                <circle cx={232} cy={180} r={5} fill="#EF4444" className="animate-pulse" />
                {/* Bicol Dissonance */}
                <circle cx={300} cy={270} r={5} fill="#EF4444" className="animate-pulse" />
                {/* Cotabato Dissonance */}
                <circle cx={302} cy={520} r={5} fill="#EF4444" className="animate-pulse" />
              </g>
            </svg>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400 mt-2">
            <span className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" /> Red Node: Catastrophic Inundation Dissonance
            </span>
            <span>Click any basin circle to inspect telemetry</span>
          </div>
        </div>

        {/* Selected Basin Forensic Card */}
        <div className="lg:col-span-5 bg-slate-900/90 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-4">
              <div>
                <span className="text-xs uppercase tracking-wider font-mono-data text-blue-400">
                  {selectedBasin.island} Catchment System
                </span>
                <h4 className="text-xl font-bold text-white font-display">
                  {selectedBasin.name}
                </h4>
              </div>
              {selectedBasin.hasDissonanceFlag && (
                <div className="flex items-center gap-1 bg-red-950 text-red-300 border border-red-800 px-2 py-1 rounded text-[11px] font-mono-data">
                  <AlertTriangle className="w-3.5 h-3.5 text-red-400" />
                  <span>Dissonance Flag</span>
                </div>
              )}
            </div>

            <div className="space-y-3 font-mono-data text-xs">
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Catchment Area:</span>
                <span className="text-white font-bold">{selectedBasin.catchmentAreaKm2.toLocaleString()} km²</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">2018–2027 Cumulative Outlay:</span>
                <span className="text-blue-400 font-bold">₱{selectedBasin.allocationPhpB.toFixed(1)} Billion</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">2027 DPWH Flood Allocation:</span>
                <span className="text-emerald-400 font-bold">₱{selectedBasin.dpwhAllocation2027.toFixed(1)} Billion</span>
              </div>
              {selectedBasin.mmdaAllocation2027 > 0 && (
                <div className="flex justify-between py-1 border-b border-slate-800/60">
                  <span className="text-slate-400">2027 MMDA Urban Drainage:</span>
                  <span className="text-amber-400 font-bold">₱{selectedBasin.mmdaAllocation2027.toFixed(1)} Billion</span>
                </div>
              )}
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">Historical Inundation Risk:</span>
                <span className={`font-bold ${selectedBasin.historicalInundationRisk >= 8 ? 'text-red-400' : 'text-amber-400'}`}>
                  {selectedBasin.historicalInundationRisk} / 10 Index
                </span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-800/60">
                <span className="text-slate-400">COA Flagged Projects:</span>
                <span className="text-red-400 font-bold">{selectedBasin.coaFlaggedProjectsCount} delayed/defective assets</span>
              </div>
            </div>

            <div className="mt-5 p-3.5 bg-slate-950/80 border border-slate-800 rounded-lg">
              <div className="text-[11px] uppercase tracking-wider font-mono-data text-blue-400 mb-1 flex items-center gap-1.5">
                <Info className="w-3.5 h-3.5" /> Environmental Diagnostics
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-sans">
                {selectedBasin.riskNote}
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] text-slate-500 font-mono-data">
            Catchment boundaries defined under Presidential Decree 1067 (Water Code) & DENR River Basin Control Office.
          </div>
        </div>
      </div>
    </div>
  );
};
