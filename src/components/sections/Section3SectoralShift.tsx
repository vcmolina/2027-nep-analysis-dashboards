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
import { sectoralLongitudinalData, sectoralCagr } from '../../data/budgetData.ts';
import { Layers, TrendingUp, AlertCircle, Eye, EyeOff } from 'lucide-react';

export const Section3SectoralShift: React.FC = () => {
  const [viewType, setViewType] = useState<'percent' | 'realValue'>('percent');
  const [activeSector, setActiveSector] = useState<string | null>(null);

  // Compute 100% normalized percentages or real purchasing power values
  const transformedData = useMemo(() => {
    return sectoralLongitudinalData.map((d) => {
      const total = d.socialServices + d.economicServices + d.generalPublicServices + d.debtBurden + d.defense;
      
      if (viewType === 'percent') {
        return {
          year: d.year,
          socialServices: Number(((d.socialServices / total) * 100).toFixed(1)),
          economicServices: Number(((d.economicServices / total) * 100).toFixed(1)),
          generalPublicServices: Number(((d.generalPublicServices / total) * 100).toFixed(1)),
          debtBurden: Number(((d.debtBurden / total) * 100).toFixed(1)),
          defense: Number(((d.defense / total) * 100).toFixed(1)),
          total: 100
        };
      } else {
        // Real purchasing power value adjusted for 2018 base inflation
        return {
          year: d.year,
          socialServices: Number((d.socialServices * d.inflationFactor2018Base).toFixed(1)),
          economicServices: Number((d.economicServices * d.inflationFactor2018Base).toFixed(1)),
          generalPublicServices: Number((d.generalPublicServices * d.inflationFactor2018Base).toFixed(1)),
          debtBurden: Number((d.debtBurden * d.inflationFactor2018Base).toFixed(1)),
          defense: Number((d.defense * d.inflationFactor2018Base).toFixed(1)),
          total: Number((total * d.inflationFactor2018Base).toFixed(1))
        };
      }
    });
  }, [viewType]);

  const sectors = [
    { key: 'defense', label: 'Defense', color: '#10B981', cagr: '12.5%' },
    { key: 'debtBurden', label: 'Debt Burden (Interest)', color: '#EF4444', cagr: '8.2%' },
    { key: 'generalPublicServices', label: 'General Public Services', color: '#94A3B8', cagr: '8.6%' },
    { key: 'economicServices', label: 'Economic Services', color: '#F59E0B', cagr: '6.9%' },
    { key: 'socialServices', label: 'Social Services', color: '#3B82F6', cagr: '7.6%' }
  ];

  return (
    <div>
      <SectionHeader
        number={3}
        title="Sectoral Classification & Long-Term Policy Shifts"
        subtitle="100% Stacked Area Trajectory: The Post-2020 Social Pivot & The Crowding Out of Economic Multipliers"
        badge="10-Year Decadal Shift"
        metric={{
          value: "38.3%",
          label: "Social Services 2027 Share"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 lg:p-8 mb-8">
        <div className="text-[0.75rem] font-mono-data uppercase tracking-[0.1em] text-[#60A5FA] mb-3">
          LONGITUDINAL REALLOCATION
        </div>
        <h3 className="text-xl lg:text-2xl font-normal text-[#F8FAFC] mb-3 font-display">
          Decadal Transformation & Mandatory Administrative Creep
        </h3>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          A longitudinal examination of sectoral classifications from 2018 to 2027 reveals profound, perhaps irreversible, structural policy shifts within the Philippine national budget. Early in the decade, fiscal policy maintained a heavy bias toward <strong className="font-bold text-[#F59E0B]">Economic Services</strong>, aligning with aggressive, debt-financed infrastructure mandates. However, a decisive pivot occurred post-2020, catalyzed by the pandemic and solidifying <strong className="font-bold text-[#60A5FA]">Social Services</strong> as the paramount funding priority. By 2027, Social Services is programmed to capture <span className="font-mono-data font-bold text-white">over 38% of the fiscal envelope</span> (₱2,757.6 billion).
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
          This progressive pivot, however, occurs alongside an alarming compounding effect in non-productive and administrative sectors. The <strong className="font-bold text-red-400">Debt Burden category</strong> has seen its proportional share stabilize at unsustainably high nominal levels, fundamentally crowding out faster growth in Economic Services. Furthermore, <strong className="font-bold text-white">General Public Services</strong> has expanded rapidly (CAGR 8.6%), primarily driven by escalating formula-based allocations to Local Government Units (NTA) following the Mandanas ruling. The fastest single compounding sector over the decade is <strong className="font-bold text-emerald-400">National Defense</strong> with a staggering <span className="font-mono-data font-bold text-emerald-300">12.5% 10-Yr CAGR</span>, driven by military salary standardization and external maritime modernization.
        </p>
      </div>

      {/* Interactive Controls & 10-Yr CAGR Strip */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Toggle Mode */}
        <div className="lg:col-span-12 flex flex-wrap items-center justify-between gap-4 bg-slate-900/80 border border-slate-800 p-4 rounded-xl">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono-data text-slate-400">
              Metric Transformation:
            </span>
            <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
              <button
                onClick={() => setViewType('percent')}
                className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                  viewType === 'percent' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                100% Proportional Share (%)
              </button>
              <button
                onClick={() => setViewType('realValue')}
                className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                  viewType === 'realValue' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Real Purchasing-Power Values (Base 2018 ₱B)
              </button>
            </div>
          </div>

          {/* Interactive Legend with Opacity Isolation */}
          <div className="flex flex-wrap items-center gap-2 text-xs font-mono-data">
            <span className="text-slate-500 mr-1">Isolate Sector:</span>
            {sectors.map((s) => (
              <button
                key={s.key}
                onClick={() => setActiveSector(activeSector === s.key ? null : s.key)}
                className={`px-2.5 py-1 rounded transition-all flex items-center gap-1.5 ${
                  activeSector === s.key
                    ? 'ring-2 ring-white text-white font-bold'
                    : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                style={{
                  borderLeft: `3px solid ${s.color}`,
                  opacity: activeSector && activeSector !== s.key ? 0.35 : 1
                }}
              >
                <span>{s.label}</span>
                <span className="text-slate-400">({s.cagr})</span>
              </button>
            ))}
            {activeSector && (
              <button
                onClick={() => setActiveSector(null)}
                className="px-2 py-1 text-slate-400 hover:text-white underline text-[11px]"
              >
                Reset
              </button>
            )}
          </div>
        </div>
      </div>

      {/* 100% Stacked Area Chart */}
      <div className="bg-[#070D19] border border-slate-800 rounded-xl p-5 mb-6 shadow-xl">
        <div className="h-[420px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={transformedData}
              margin={{ top: 20, right: 30, left: 10, bottom: 20 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
              
              <XAxis
                dataKey="year"
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 12, fontFamily: 'Space Mono' }}
              />

              <YAxis
                stroke="#64748B"
                tick={{ fill: '#94A3B8', fontSize: 11, fontFamily: 'Space Mono' }}
                tickFormatter={(val) => viewType === 'percent' ? `${val}%` : `₱${val}B`}
                domain={viewType === 'percent' ? [0, 100] : ['auto', 'auto']}
              />

              <Tooltip
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-[#0B1120]/95 border border-slate-700 p-4 rounded-lg shadow-2xl backdrop-blur-md font-mono-data text-xs min-w-[260px]">
                        <div className="font-bold text-white text-sm mb-2 border-b border-slate-800 pb-1 flex justify-between">
                          <span>FY {data.year} Sector Distribution</span>
                          <span className="text-slate-400">{viewType === 'percent' ? '100% Share' : 'Real 2018 ₱B'}</span>
                        </div>
                        <div className="space-y-1.5 text-slate-300">
                          {sectors.map((s) => (
                            <div key={s.key} className="flex justify-between items-center">
                              <span className="flex items-center gap-1.5" style={{ color: s.color }}>
                                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: s.color }} />
                                {s.label}:
                              </span>
                              <span className="font-bold text-white">
                                {data[s.key]}{viewType === 'percent' ? '%' : ' B'}
                              </span>
                            </div>
                          ))}
                          <div className="flex justify-between border-t border-slate-800 pt-1 text-slate-400 font-bold">
                            <span>Total:</span>
                            <span className="text-white">{data.total}{viewType === 'percent' ? '%' : ' B'}</span>
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />

              {sectors.map((s) => {
                const isSelected = !activeSector || activeSector === s.key;
                const opacity = isSelected ? 0.85 : 0.20;

                return (
                  <Area
                    key={s.key}
                    type="monotone"
                    dataKey={s.key}
                    stackId="1"
                    stroke={s.color}
                    fill={s.color}
                    fillOpacity={opacity}
                    strokeWidth={isSelected ? 2 : 1}
                  />
                );
              })}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* 10-Yr CAGR Comparison Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-xs font-mono-data">
        {sectoralCagr.map((item) => (
          <div key={item.sector} className="p-3 bg-slate-900/60 border border-slate-800 rounded-lg">
            <div className="text-slate-400 text-[11px] truncate mb-1">{item.sector}</div>
            <div className="text-lg font-bold text-white flex items-center justify-between">
              <span>{item.cagr}%</span>
              <span className="text-[10px] text-blue-400 font-normal">10-Yr CAGR</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
