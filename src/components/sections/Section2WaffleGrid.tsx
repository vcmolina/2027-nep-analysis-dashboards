import React, { useState, useMemo, useRef, useEffect } from 'react';
import { SectionHeader } from '../ui/SectionHeader.tsx';
import { waffleCategories, SectorGridBlock } from '../../data/budgetData.ts';
import { Layers, ZoomIn, RotateCcw, Filter, Eye, CheckCircle2, AlertTriangle, ShieldCheck } from 'lucide-react';

interface DrillDownAgency {
  name: string;
  acronym: string;
  blocks: number;
  percentageInSector: number;
  sectorId: string;
  description: string;
}

const drillDownAgencies: Record<string, DrillDownAgency[]> = {
  social: [
    { acronym: "DepEd", name: "Department of Education", blocks: 976, percentageInSector: 35.4, sectorId: "social", description: "Teacher salaries, basic classroom instruction, school supplies" },
    { acronym: "DOH", name: "Department of Health", blocks: 354, percentageInSector: 12.8, sectorId: "social", description: "Hospital operations, public immunization, specialty subsidies" },
    { acronym: "DSWD", name: "Social Welfare & Development", blocks: 242, percentageInSector: 8.8, sectorId: "social", description: "4Ps conditional cash, crisis assistance (AICS), social pensions" },
    { acronym: "CHED/SUCs", name: "Higher Education & SUCs", blocks: 177, percentageInSector: 6.4, sectorId: "social", description: "Universal Access to Quality Tertiary Education (Free Tuition)" },
    { acronym: "Other Social", name: "Other Social Programs & PhilHealth", blocks: 1008, percentageInSector: 36.6, sectorId: "social", description: "PhilHealth indigency subsidies, TESDA, labor development" }
  ],
  economic: [
    { acronym: "DPWH", name: "Public Works and Highways", blocks: 644, percentageInSector: 33.1, sectorId: "economic", description: "National highways, bypass roads, bridges, flood control" },
    { acronym: "DA", name: "Department of Agriculture", blocks: 172, percentageInSector: 8.9, sectorId: "economic", description: "National rice program, RCEF mechanization, irrigation (NIA)" },
    { acronym: "DOTr", name: "Department of Transportation", blocks: 146, percentageInSector: 7.5, sectorId: "economic", description: "Rail transit systems, airport modernization, maritime ports" },
    { acronym: "Other Econ", name: "Energy, Tourism, Trade, ICT", blocks: 982, percentageInSector: 50.5, sectorId: "economic", description: "Electrification, broadband rollout, industry assistance" }
  ],
  gps: [
    { acronym: "DILG", name: "Interior & Local Government", blocks: 333, percentageInSector: 25.4, sectorId: "gps", description: "Philippine National Police (PNP) personnel, fire protection" },
    { acronym: "Judiciary", name: "Supreme Court & Lower Courts", blocks: 86, percentageInSector: 6.6, sectorId: "gps", description: "Magistrate compensation, court hall computerization" },
    { acronym: "NTA/LGU", name: "LGU Formula Transfers (GPS share)", blocks: 891, percentageInSector: 68.0, sectorId: "gps", description: "Mandanas-Garcia devolved public services funding" }
  ],
  debt: [
    { acronym: "BTr Interest", name: "Statutory Interest Payments", blocks: 741, percentageInSector: 100.0, sectorId: "debt", description: "Non-discretionary interest owed on sovereign domestic & foreign bonds" }
  ],
  defense: [
    { acronym: "AFP/DND", name: "Armed Forces & Defense HQ", blocks: 329, percentageInSector: 73.4, sectorId: "defense", description: "Soldier compensation, territorial defense, naval patrols" },
    { acronym: "Modernization", name: "Horizon Capability Upgrades", blocks: 119, percentageInSector: 26.6, sectorId: "defense", description: "Radar systems, multi-role jet fighters, offshore patrol assets" }
  ]
};

export const Section2WaffleGrid: React.FC = () => {
  const [selectedSector, setSelectedSector] = useState<string | null>(null);
  const [selectedAgency, setSelectedAgency] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'nominal' | 'real2018'>('nominal');
  const [hoveredUnitIndex, setHoveredUnitIndex] = useState<number | null>(null);
  const [hoveredSector, setHoveredSector] = useState<SectorGridBlock | null>(null);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Active sector metadata
  const activeSectorData = useMemo(() => {
    if (!selectedSector) return null;
    return waffleCategories.find(c => c.id === selectedSector) || null;
  }, [selectedSector]);

  // Aggregate blocks to display
  // 7,200 blocks total. On canvas: grid of 120 columns x 60 rows = 7,200 units!
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high DPI
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const cols = 120;
    const rows = 60;
    const cellWidth = width / cols;
    const cellHeight = height / rows;
    const gap = 1;

    let unitCounter = 0;

    waffleCategories.forEach((cat) => {
      const isSectorActive = !selectedSector || selectedSector === cat.id;
      const agencyList = drillDownAgencies[cat.id] || [];
      const isAgencySelected = selectedAgency !== null;

      // Real 2018 inflation contraction scale:
      // If real2018 is active, only draw blocks up to realPurchasingPower2018; remaining blocks drawn as hatched or dimmed ghost blocks
      const effectiveUnits = viewMode === 'real2018' ? Math.round(cat.realPurchasingPower2018) : cat.units;
      const inflationLostUnits = cat.units - effectiveUnits;

      for (let i = 0; i < cat.units; i++) {
        const col = unitCounter % cols;
        const row = Math.floor(unitCounter / cols);
        const x = col * cellWidth;
        const y = row * cellHeight;

        let fillStyle = cat.color;
        let opacity = 0.85;

        if (selectedSector && selectedSector !== cat.id) {
          opacity = 0.12; // Faded out
        } else if (selectedAgency && selectedSector === cat.id) {
          // Check if this block belongs to the selected agency
          const targetAgency = agencyList.find(a => a.acronym === selectedAgency);
          if (targetAgency) {
            const agencyBlocks = targetAgency.blocks;
            if (i >= agencyBlocks) {
              opacity = 0.2; // Not in this agency
            } else {
              opacity = 1.0;
            }
          }
        }

        // Inflation erosion mode
        if (viewMode === 'real2018' && i >= effectiveUnits) {
          ctx.fillStyle = '#1E293B';
          ctx.fillRect(x + gap, y + gap, cellWidth - gap * 2, cellHeight - gap * 2);
          // Red diagonal marker for inflation erosion
          ctx.strokeStyle = '#EF4444';
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(x + gap, y + gap);
          ctx.lineTo(x + cellWidth - gap, y + cellHeight - gap);
          ctx.stroke();
        } else {
          ctx.fillStyle = fillStyle;
          ctx.globalAlpha = opacity;
          ctx.fillRect(x + gap, y + gap, cellWidth - gap * 2, cellHeight - gap * 2);
          ctx.globalAlpha = 1.0;
        }

        // Highlight hovered unit
        if (hoveredUnitIndex === unitCounter) {
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 2;
          ctx.strokeRect(x, y, cellWidth, cellHeight);
        }

        unitCounter++;
      }
    });
  }, [selectedSector, selectedAgency, viewMode, hoveredUnitIndex]);

  // Handle canvas mouse move to locate hovered unit
  const handleCanvasMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cols = 120;
    const rows = 60;
    const cellWidth = rect.width / cols;
    const cellHeight = rect.height / rows;

    const col = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight);

    if (col >= 0 && col < cols && row >= 0 && row < rows) {
      const index = row * cols + col;
      if (index < 7200) {
        setHoveredUnitIndex(index);
        // Find which sector this index belongs to
        let accumulated = 0;
        for (const cat of waffleCategories) {
          if (index < accumulated + cat.units) {
            setHoveredSector(cat);
            break;
          }
          accumulated += cat.units;
        }
      }
    }
  };

  const handleCanvasMouseLeave = () => {
    setHoveredUnitIndex(null);
    setHoveredSector(null);
  };

  // Real world equivalent text
  const currentEquiv = useMemo(() => {
    if (!hoveredSector) {
      return "₱1.0 Billion = ~650 kilometers of paved secondary national roads or ~400 modern public school classrooms.";
    }
    return hoveredSector.tangibleMetrics[0];
  }, [hoveredSector]);

  return (
    <div>
      <SectionHeader
        number={2}
        title="PHP 7.2 trillion, drawn one billion at a time"
        subtitle="What services were given the highest priority?"        
        badge="Zero-Sum Fiscal Space"
        metric={{
          value: "7,200 Units",
          label: "1 Unit = ₱1.0 Billion"
        }}
      />

      {/* Analytical Briefing Text */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 lg:p-8 mb-8">
        <div className="text-[0.75rem] font-mono-data uppercase tracking-[0.1em] text-[#60A5FA] mb-3">
          ZERO-SUM RESOURCE ALLOCATION
        </div>
        <h3 className="text-xl lg:text-2xl font-normal text-[#F8FAFC] mb-3 font-display">
          Democratizing Trillion-Scale Comprehension
        </h3>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] mb-4 font-sans">
          To wrap our heads around a massive ₱7.2 trillion national budget, we can picture it as a simple grid made of 7,200 blocks, where every single block represents exactly ₱1 billion. When you map out the spending this way, <strong className="font-bold text-[#60A5FA]">Social Services</strong> takes up the largest chunk of the board, claiming <span className="font-mono-data font-bold text-white">2,757 blocks (or 38.3%)</span> to fund constitutional priorities like basic education, universal health care, and cash aid for vulnerable families.
        </p>
        <p className="text-[0.75rem] leading-[1.75] text-[#D1D5DB] font-sans">
          But this visual grid also reveals a harsh reality about how inflexible our public finances have become. Before lawmakers even begin debating new policies, <strong className="font-bold text-amber-300">nearly a third of the entire board is already locked in</strong>: <strong className="font-bold text-white font-mono-data">741 blocks</strong> go straight to paying just the interest on our national debt, <strong className="font-bold text-white font-mono-data">1,310 blocks</strong> keep basic government operations running, and <strong className="font-bold text-white font-mono-data">448 blocks</strong> are reserved for national defense. This leaves surprisingly little wiggle room for discretionary spending and highlights the <strong className="font-bold text-red-400">tough structural limits on the government&apos;s wallet</strong>.
        </p>
      </div>

      {/* Control Strip */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 mb-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* Sector Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono-data text-slate-400 mr-2 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-blue-400" /> Filter Sector:
            </span>
            <button
              onClick={() => { setSelectedSector(null); setSelectedAgency(null); }}
              className={`px-3 py-1.5 text-xs font-mono-data rounded-md transition-colors ${
                selectedSector === null
                  ? 'bg-blue-600 text-white font-bold'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              All 7,200 Blocks
            </button>
            {waffleCategories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  if (selectedSector === cat.id) {
                    setSelectedSector(null);
                    setSelectedAgency(null);
                  } else {
                    setSelectedSector(cat.id);
                    setSelectedAgency(null);
                  }
                }}
                className={`px-3 py-1.5 text-xs font-mono-data rounded-md transition-all flex items-center gap-1.5 ${
                  selectedSector === cat.id
                    ? 'ring-2 ring-white text-white font-bold'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-700'
                }`}
                style={{
                  borderLeft: `4px solid ${cat.color}`,
                  backgroundColor: selectedSector === cat.id ? `${cat.color}33` : undefined
                }}
              >
                <span>{cat.label}</span>
                <span className="text-slate-400">({cat.units})</span>
              </button>
            ))}
          </div>

          {/* Real Purchasing Power Toggle */}
          <div className="flex items-center gap-2 bg-slate-800/80 p-1 rounded-lg">
            <button
              onClick={() => setViewMode('nominal')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                viewMode === 'nominal' ? 'bg-blue-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Nominal ₱7.2T
            </button>
            <button
              onClick={() => setViewMode('real2018')}
              className={`px-3 py-1 text-xs font-mono-data rounded transition-colors ${
                viewMode === 'real2018' ? 'bg-amber-600 text-white font-bold' : 'text-slate-400 hover:text-white'
              }`}
            >
              Real 2018 Value (₱5.54T)
            </button>
          </div>
        </div>

        {/* Agency Semantic Drill-down Strip (When Sector is Isolated) */}
        {selectedSector && drillDownAgencies[selectedSector] && (
          <div className="mt-4 pt-4 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
            <span className="text-xs uppercase tracking-wider font-mono-data text-blue-400 mr-2 flex items-center gap-1">
              <ZoomIn className="w-3.5 h-3.5" /> Department Drill-down:
            </span>
            <button
              onClick={() => setSelectedAgency(null)}
              className={`px-2.5 py-1 text-xs font-mono-data rounded ${
                selectedAgency === null ? 'bg-slate-700 text-white font-bold' : 'bg-slate-800/60 text-slate-400 hover:text-white'
              }`}
            >
              Entire Sector Cluster
            </button>
            {drillDownAgencies[selectedSector].map((agency) => (
              <button
                key={agency.acronym}
                onClick={() => setSelectedAgency(agency.acronym)}
                className={`px-2.5 py-1 text-xs font-mono-data rounded transition-colors ${
                  selectedAgency === agency.acronym
                    ? 'bg-blue-500 text-white font-bold shadow-md'
                    : 'bg-slate-800/60 text-slate-300 hover:bg-slate-700 hover:text-white'
                }`}
              >
                {agency.acronym} ({agency.blocks} blocks · {agency.percentageInSector}%)
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main 7,200 Interactive Canvas Grid */}
      <div className="bg-[#070D19] border border-slate-800 rounded-xl p-4 relative shadow-2xl overflow-hidden">
        <div className="flex items-center justify-between text-xs font-mono-data text-slate-400 mb-2 px-1">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-blue-400"></span>
            <span>120 Columns × 60 Rows = 7,200 Total Sovereign Units</span>
          </div>
          <div className="text-slate-400">
            {viewMode === 'real2018' ? (
              <span className="text-amber-400">
                Striated / Hatched blocks indicate ~23.1% inflation purchasing power erosion since 2018
              </span>
            ) : (
              <span>Move cursor over canvas to inspect block specifications</span>
            )}
          </div>
        </div>

        <div className="w-full aspect-[2/1] max-h-[480px] min-h-[300px]">
          <canvas
            ref={canvasRef}
            onMouseMove={handleCanvasMouseMove}
            onMouseLeave={handleCanvasMouseLeave}
            className="w-full h-full cursor-crosshair block rounded border border-slate-900"
          />
        </div>

        {/* Real-world Public Goods Equivalency Banner */}
        <div className="mt-4 p-3 bg-slate-900/90 border border-slate-800/90 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-data">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span className="text-slate-400">Real-World Equivalency:</span>
            <span className="text-white font-medium">{currentEquiv}</span>
          </div>
          {hoveredSector && (
            <div className="flex items-center gap-2 shrink-0">
              <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: hoveredSector.color }} />
              <span className="text-white font-bold">{hoveredSector.label}:</span>
              <span className="text-slate-300">₱{hoveredSector.units.toLocaleString()}B ({hoveredSector.percentage}%)</span>
            </div>
          )}
        </div>
      </div>

      {/* Sector Breakdown & Zero-Sum Inflexibility Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mt-4">
        {waffleCategories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => setSelectedSector(selectedSector === cat.id ? null : cat.id)}
            className={`p-4 rounded-xl border transition-all cursor-pointer ${
              selectedSector === cat.id
                ? 'bg-slate-900 border-blue-500 shadow-lg'
                : 'bg-slate-900/50 border-slate-800/80 hover:bg-slate-900/80'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono-data text-slate-400 font-semibold">{cat.label}</span>
              <span className="w-3 h-3 rounded-full" style={{ backgroundColor: cat.color }} />
            </div>
            <div className="text-xl font-bold font-mono-data text-white">
              {cat.units} <span className="text-xs font-normal text-slate-400">blocks</span>
            </div>
            <div className="text-xs font-mono-data text-slate-400 mt-1 flex justify-between">
              <span>{cat.percentage}% share</span>
              <span className="text-slate-500">PPV: ₱{cat.realPurchasingPower2018.toFixed(0)}B</span>
            </div>
            <div className="mt-3 pt-2 border-t border-slate-800/80 text-[11px] text-slate-400 font-mono-data">
              Lead: <strong className="text-slate-200">{cat.leadAgency}</strong> ({cat.leadAgencyAllocation}B)
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
