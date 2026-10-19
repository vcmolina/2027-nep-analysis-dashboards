import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
  Legend
} from 'recharts';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { healthComponents, healthRadarData } from '../../data/budgetData.ts';
import { Activity, AlertTriangle, Hospital, ShieldCheck, HeartPulse, Stethoscope } from 'lucide-react';

export const Section8HealthSectorRadar: React.FC = () => {
  const [selectedAxis, setSelectedAxis] = useState<string | null>(null);

  const activeComponent = selectedAxis
    ? healthComponents.find(c => c.component.toLowerCase().includes(selectedAxis.toLowerCase()))
    : null;

  return (
    <div>
      <SectionHeader
        number={8}
        title="Health Sector Resilience"
        subtitle="Spider-Web Radar Analysis: DOH Topline Growth Masking Severe Inward Contractions in Facilities (HFEP) & Apex Hospitals"
        badge="Universal Healthcare (UHC) Stress"
        metric={{
          value: "-42.1%",
          label: "HFEP Facility Upgrades Cut (₱25.1B → ₱14.5B)"
        }}
      />

      {/* Analytical Narrative */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 mb-8">
        <h3 className="text-xl font-bold text-white mb-4 font-sans">The Illusion of a Budget Increase</h3>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        At first glance, the overall health budget seems to be growing, bumping up to <strong className="font-bold text-white font-mono-data">₱353.80 billion</strong> from ₱320.50 billion. But this top-line number is a clever illusion hiding massive, dangerous cuts on the ground. The most brutal hit is to the program that fixes and upgrades our dilapidated provincial and municipal clinics. Its budget was slashed from a peak of <strong className="font-bold text-white font-mono-data">₱35.37 billion</strong> down to just <strong className="font-bold text-red-400 font-mono-data">₱14.54 billion</strong>. By starving these local health centers of funds, the government is essentially forcing patients in far-flung and island provinces to travel all the way to already-congested city hospitals just to get basic care.
      </p>
      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
        The problem is, those major city hospitals are also taking a massive hit. Direct subsidies for Metro Manila's premier specialty centers—like the Kidney, Heart, Lung, and Children's hospitals—have been slashed from <strong className="font-bold text-white font-mono-data">₱15.60 billion</strong> down to <strong className="font-bold text-red-400 font-mono-data">₱11.20 billion</strong>. This guarantees that these public institutions will be forced to pass those costs on, making desperate patients pay more <strong className="font-bold text-amber-300">out-of-pocket</strong> just to survive. On top of all this, the <strong className="font-bold text-[#60A5FA]">Department of Health (DOH)</strong> is dealing with painful cuts to the salary funds of healthcare workers across 14 regional hospitals, which will likely push even more of our overworked nurses and doctors to pack up and work abroad.
      </p>

      <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
      The health budget is a masterclass in masking austerity. Economic managers inflated the top-line number while quietly gutting the exact programs that keep rural clinics open, specialized public hospitals affordable, and nurses in the country. Slashing local clinic funding while simultaneously cutting subsidies for the apex hospitals creates a deadly squeeze for the poorest patients who now have nowhere to turn.
      </p>
      </div>

      {/* Radar Chart & Axis Inspection Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-6">
        {/* Radar Spider-Web Visualizer */}
        <div className="lg:col-span-7 bg-[#070D19] border border-slate-800 rounded-xl p-5 shadow-xl flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Activity className="w-5 h-5 text-teal-400" />
              <h4 className="text-xs uppercase tracking-wider font-mono-data text-white font-bold">
                Pentagonal Radar: 2026 Enacted vs. 2027 Proposed
              </h4>
            </div>
            <div className="text-xs font-mono-data text-slate-400 flex items-center gap-3">
              <span className="flex items-center gap-1.5 text-slate-400">
                <span className="w-2.5 h-2.5 bg-slate-500 rounded-full" /> 2026 Enacted
              </span>
              <span className="flex items-center gap-1.5 text-teal-400 font-bold">
                <span className="w-2.5 h-2.5 bg-teal-400 rounded-full" /> 2027 Proposed
              </span>
            </div>
          </div>

          <div className="h-[400px] w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="75%" data={healthRadarData}>
                <PolarGrid stroke="#1E293B" />
                <PolarAngleAxis
                  dataKey="axis"
                  tick={{ fill: '#E2E8F0', fontSize: 11, fontFamily: 'Space Mono' }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[0, 250]}
                  stroke="#475569"
                  tick={{ fill: '#64748B', fontSize: 9, fontFamily: 'Space Mono' }}
                  tickFormatter={(val) => `₱${val}B`}
                />
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const d = payload[0].payload;
                      const diff = d["2027 Proposed"] - d["2026 Enacted"];
                      return (
                        <div className="bg-[#0B1120]/95 border border-slate-700 p-3 rounded-lg shadow-xl font-mono-data text-xs">
                          <div className="font-bold text-white mb-1">{d.axis}</div>
                          <div className="text-slate-400">2026 Enacted: ₱{d["2026 Enacted"]}B</div>
                          <div className="text-teal-400 font-bold">2027 Proposed: ₱{d["2027 Proposed"]}B</div>
                          <div className={`mt-1 pt-1 border-t border-slate-800 font-bold ${diff >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                            Net Variance: {diff > 0 ? '+' : ''}{diff.toFixed(1)}B ({((diff / d["2026 Enacted"]) * 100).toFixed(1)}%)
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Radar
                  name="2026 Enacted"
                  dataKey="2026 Enacted"
                  stroke="#64748B"
                  fill="#64748B"
                  fillOpacity={0.25}
                  strokeWidth={2}
                />
                <Radar
                  name="2027 Proposed"
                  dataKey="2027 Proposed"
                  stroke="#14B8A6"
                  fill="#14B8A6"
                  fillOpacity={0.65}
                  strokeWidth={3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] font-mono-data text-slate-400 text-center mt-2">
            Notice the inward collapse on <strong className="text-red-400">Specialty Hospitals</strong> and <strong className="text-red-400">Facilities (HFEP)</strong> contrasting against outward expansion in DOH Operations.
          </div>
        </div>

        {/* 5 Health Component Breakdown Cards */}
        <div className="lg:col-span-5 space-y-3">
          {healthComponents.map((item) => {
            const diff = item.y2027 - item.y2026;
            const pct = ((diff / item.y2026) * 100).toFixed(1);
            const isNegative = diff < 0;

            return (
              <div
                key={item.component}
                onClick={() => setSelectedAxis(item.component)}
                className={`p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isNegative
                    ? 'bg-red-950/20 border-red-900/40 hover:bg-red-950/30'
                    : 'bg-slate-900/60 border-slate-800 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold font-mono-data text-white">
                    {item.component}
                  </span>
                  <span className={`text-xs font-mono-data font-bold ${isNegative ? 'text-red-400' : 'text-emerald-400'}`}>
                    ₱{item.y2027.toFixed(2)}B ({isNegative ? '' : '+'}{pct}%)
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] font-mono-data text-slate-400 mb-2">
                  <span>2026: ₱{item.y2026.toFixed(2)}B</span>
                  <span>2025: ₱{item.y2025.toFixed(2)}B</span>
                  <span>2024: ₱{item.y2024.toFixed(2)}B</span>
                </div>
                {item.impactAlert && (
                  <div className="text-[11px] text-slate-300 font-sans leading-tight">
                    {item.impactAlert}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
