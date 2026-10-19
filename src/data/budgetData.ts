/**
 * 2027 Philippine National Expenditure Program (NEP) Dataset
 * Centralized State Mock Backend & Analytical Briefing Series
 */

export interface MacroFiscalPoint {
  year: number;
  totalBudget: number; // in PHP Billions
  yoyGrowth: number | null; // percentage
  shareGdp: number; // percentage
  revenueTarget: number; // in PHP Billions
  deficitCeiling: number; // % of GDP
  nominalGdp: number; // in PHP Billions (assumption)
  realGdpTarget: string; // text projection
  notes?: string;
}

export interface SectorGridBlock {
  id: string;
  label: string;
  units: number; // Each unit = ₱1.0 Billion
  percentage: number;
  realPurchasingPower2018: number; // PHP Billions
  color: string;
  leadAgency: string;
  leadAgencyAllocation: number;
  leadAgencyShareInSector: number;
  tangibleMetrics: string[];
}

export interface SectorHistoricalPoint {
  year: number;
  socialServices: number;
  economicServices: number;
  generalPublicServices: number;
  debtBurden: number;
  defense: number;
  total: number;
  inflationFactor2018Base: number;
}

export interface DepartmentAllocation {
  rank: number;
  acronym: string;
  name: string;
  totalBudget: number; // PHP Billions
  ps: number; // Personnel Services
  mooe: number; // Maintenance & Other Operating Expenses
  co: number; // Capital Outlays
  finEx: number; // Financial Expenses
  riskSummary: string;
}

export interface EducationDataPoint {
  component: string;
  y2025: number;
  y2026: number;
  y2027: number;
  yoyGrowth2027: number;
  description: string;
  criticalFlag?: string;
}

export interface DpwhMetricPoint {
  year: string;
  totalBudget: number;
  capitalOutlay: number;
  assetPreservation: number;
  disbursementRate: number; // percentage
  isTarget?: boolean;
  unliquidatedDefective?: number; // PHP Billions
  delayedProjectsCount?: number;
}

export interface RiverBasinData {
  id: string;
  name: string;
  island: 'Luzon' | 'Visayas' | 'Mindanao';
  catchmentAreaKm2: number;
  allocationPhpB: number; // 2018-2027 cumulative
  historicalInundationRisk: number; // 1 to 10
  coaFlaggedProjectsCount: number;
  dpwhAllocation2027: number;
  mmdaAllocation2027: number;
  riskNote: string;
  hasDissonanceFlag: boolean;
}

export interface HealthComponentData {
  component: string;
  y2024: number;
  y2025: number;
  y2026: number;
  y2027: number;
  axisKey: string;
  description: string;
  impactAlert?: string;
}

export interface AgriComponentData {
  component: string;
  y2024: number;
  y2025: number;
  y2026: number;
  y2027: number;
  agencyRequested?: number;
  variance2026to2027: number;
  type: 'agency' | 'flagship' | 'support';
  note: string;
}

export interface AyudaDataPoint {
  program: string;
  agency: string;
  y2024: number;
  y2025: number;
  y2026: number;
  y2027: number;
  color: string;
  isConditional: boolean;
  targetingEfficiency: string;
  coaAuditFlags: string;
}

export interface DebtDataPoint {
  year: string;
  interestPayments: number;
  principalAmortization: number;
  totalDebtService: number;
  grossBorrowing: number;
  debtToGdp: number;
  domesticRatio: number; // e.g. 72
  externalRatio: number; // e.g. 28
  fxSensitivityPhp1Depreciation: number; // in PHP Billions
}

export interface LguTransferPoint {
  year: string;
  nta: number;
  lgsf: number;
  barmmBlockGrant: number;
  total: number;
}

export interface CcetDataPoint {
  year: string;
  adaptation: number;
  mitigation: number;
  total: number;
}

export interface LumpSumDataPoint {
  year: string;
  unprogrammedAppropriations: number;
  calamityFund: number;
  pensionGratuityFund: number;
  mpbf: number;
}

export interface CifDataPoint {
  entity: string;
  y2023: number;
  y2024: number;
  y2025: number;
  y2026: number;
  y2027: number;
  confidential2027: number;
  intelligence2027: number;
  share2027Pct: number;
  auditNotes: string;
}

export interface Citation {
  id: number;
  title: string;
  url: string;
  category: 'Official DBM/Gov' | 'Congress & CPBRD' | 'Audit / COA' | 'News & Analysis';
}

// -------------------------------------------------------------
// 1. MACRO FISCAL ENVELOPE (Page 1)
// -------------------------------------------------------------
export const macroFiscalData: MacroFiscalPoint[] = [
  { year: 2018, totalBudget: 3767.0, yoyGrowth: null, shareGdp: 19.5, revenueTarget: 2850.0, deficitCeiling: 3.2, nominalGdp: 19318, realGdpTarget: "6.2%" },
  { year: 2019, totalBudget: 3662.0, yoyGrowth: -2.7, shareGdp: 19.5, revenueTarget: 3137.0, deficitCeiling: 3.2, nominalGdp: 18780, realGdpTarget: "6.0%" },
  { year: 2020, totalBudget: 4100.0, yoyGrowth: 11.9, shareGdp: 21.0, revenueTarget: 2856.0, deficitCeiling: 7.6, nominalGdp: 17939, realGdpTarget: "-9.5% (COVID-19)" },
  { year: 2021, totalBudget: 4506.0, yoyGrowth: 9.9, shareGdp: 24.1, revenueTarget: 3006.0, deficitCeiling: 8.6, nominalGdp: 18701, realGdpTarget: "5.7%" },
  { year: 2022, totalBudget: 5024.0, yoyGrowth: 11.5, shareGdp: 24.0, revenueTarget: 3544.0, deficitCeiling: 7.3, nominalGdp: 20934, realGdpTarget: "7.6%" },
  { year: 2023, totalBudget: 5268.0, yoyGrowth: 4.8, shareGdp: 21.9, revenueTarget: 3824.0, deficitCeiling: 6.2, nominalGdp: 24055, realGdpTarget: "5.5%" },
  { year: 2024, totalBudget: 5768.0, yoyGrowth: 9.5, shareGdp: 22.0, revenueTarget: 4270.0, deficitCeiling: 5.6, nominalGdp: 26218, realGdpTarget: "6.0% - 7.0%" },
  { year: 2025, totalBudget: 6352.0, yoyGrowth: 10.1, shareGdp: 22.1, revenueTarget: 4640.0, deficitCeiling: 5.3, nominalGdp: 28742, realGdpTarget: "6.5% - 7.5%" },
  { year: 2026, totalBudget: 6793.0, yoyGrowth: 6.9, shareGdp: 22.0, revenueTarget: 4810.0, deficitCeiling: 5.3, nominalGdp: 30877, realGdpTarget: "6.5% - 7.5%" },
  { year: 2027, totalBudget: 7200.1, yoyGrowth: 6.0, shareGdp: 21.7, revenueTarget: 5210.0, deficitCeiling: 5.1, nominalGdp: 33180, realGdpTarget: "6.0% - 7.0%" }
];

// -------------------------------------------------------------
// 2. THE 1-BILLION GRID SIMULATION (Page 2)
// -------------------------------------------------------------
export const waffleCategories: SectorGridBlock[] = [
  {
    id: "social",
    label: "Social Services",
    units: 2757,
    percentage: 38.3,
    realPurchasingPower2018: 2120.5,
    color: "#3B82F6", // Bright Blue
    leadAgency: "DepEd",
    leadAgencyAllocation: 975.96,
    leadAgencyShareInSector: 35.4,
    tangibleMetrics: [
      "₱1.0B = ~400 newly constructed modern classrooms",
      "₱1.0B = ~83,000 tertiary student state university subsidies",
      "₱1.0B = ~333,000 specialized indigent outpatient health consultations"
    ]
  },
  {
    id: "economic",
    label: "Economic Services",
    units: 1944,
    percentage: 27.0,
    realPurchasingPower2018: 1495.2,
    color: "#F59E0B", // Amber Gold
    leadAgency: "DPWH",
    leadAgencyAllocation: 644.00,
    leadAgencyShareInSector: 33.1,
    tangibleMetrics: [
      "₱1.0B = ~650 kilometers of paved secondary national roads",
      "₱1.0B = ~133,000 farmer fertilizer and certified seed vouchers",
      "₱1.0B = ~15 major multi-span concrete rural bridges"
    ]
  },
  {
    id: "gps",
    label: "General Public Services",
    units: 1310,
    percentage: 18.2,
    realPurchasingPower2018: 1007.6,
    color: "#94A3B8", // Slate Gray
    leadAgency: "DILG / LGUs",
    leadAgencyAllocation: 332.50,
    leadAgencyShareInSector: 25.4,
    tangibleMetrics: [
      "₱1.0B = ~82 equipped multi-purpose barangay evacuation shelters",
      "₱1.0B = ~18,500 local government civil service frontline personnel years"
    ]
  },
  {
    id: "debt",
    label: "Debt Burden",
    units: 741,
    percentage: 10.3,
    realPurchasingPower2018: 569.8,
    color: "#EF4444", // Crimson Red
    leadAgency: "Bureau of the Treasury (BTr)",
    leadAgencyAllocation: 741.00,
    leadAgencyShareInSector: 100.0,
    tangibleMetrics: [
      "₱1.0B = 100% consumed by statutory debt interest and net lending",
      "Zero direct social or economic infrastructure created"
    ]
  },
  {
    id: "defense",
    label: "Defense",
    units: 448,
    percentage: 6.2,
    realPurchasingPower2018: 344.5,
    color: "#10B981", // Emerald Teal
    leadAgency: "Department of National Defense (DND)",
    leadAgencyAllocation: 328.80,
    leadAgencyShareInSector: 73.4,
    tangibleMetrics: [
      "₱1.0B = Modern radar telemetry and offshore patrol replenishment",
      "₱1.0B = Base pay, pensions, and medical logistics for armed forces"
    ]
  }
];

// -------------------------------------------------------------
// 3. SECTORAL LONGITUDINAL SHIFT (Page 3)
// -------------------------------------------------------------
export const sectoralLongitudinalData: SectorHistoricalPoint[] = [
  {
    year: 2018,
    socialServices: 1425.0,
    economicServices: 1061.0,
    generalPublicServices: 621.0,
    debtBurden: 365.0,
    defense: 155.0,
    total: 3627.0,
    inflationFactor2018Base: 1.000
  },
  {
    year: 2021,
    socialServices: 1695.0,
    economicServices: 1323.0,
    generalPublicServices: 746.0,
    debtBurden: 531.0,
    defense: 211.0,
    total: 4506.0,
    inflationFactor2018Base: 0.902
  },
  {
    year: 2024,
    socialServices: 2116.0,
    economicServices: 1775.0,
    generalPublicServices: 898.6,
    debtBurden: 699.2,
    defense: 278.1,
    total: 5766.9,
    inflationFactor2018Base: 0.812
  },
  {
    year: 2027,
    socialServices: 2757.6,
    economicServices: 1944.0,
    generalPublicServices: 1310.4,
    debtBurden: 741.0,
    defense: 448.0,
    total: 7201.0,
    inflationFactor2018Base: 0.769
  }
];

export const sectoralCagr = [
  { sector: "Social Services", cagr: 7.6, icon: "GraduationCap" },
  { sector: "Economic Services", cagr: 6.9, icon: "Pickaxe" },
  { sector: "General Public Services", cagr: 8.6, icon: "Building2" },
  { sector: "Debt Burden", cagr: 8.2, icon: "Scale" },
  { sector: "Defense", cagr: 12.5, icon: "Shield" }
];

// -------------------------------------------------------------
// 4. DEPARTMENT ALLOCATIONS RANKING (Page 4)
// -------------------------------------------------------------
export const departmentAllocations2027: DepartmentAllocation[] = [
  {
    rank: 1,
    acronym: "DepEd",
    name: "Department of Education",
    totalBudget: 975.96,
    ps: 760.97,
    mooe: 150.49,
    co: 64.50,
    finEx: 0.00,
    riskSummary: "Extremely labor-intensive (78.0% PS). Escallating salaries compress capital classroom outlay."
  },
  {
    rank: 2,
    acronym: "DPWH",
    name: "Public Works and Highways",
    totalBudget: 644.00,
    ps: 25.10,
    mooe: 80.20,
    co: 538.70,
    finEx: 0.00,
    riskSummary: "Capital-intensive (83.6% CO). Severe absorptive bottlenecks (₱138B COA flagged unliquidated/delayed)."
  },
  {
    rank: 3,
    acronym: "DOH",
    name: "Department of Health",
    totalBudget: 353.80,
    ps: 89.10,
    mooe: 204.50,
    co: 60.20,
    finEx: 0.00,
    riskSummary: "MOOE-heavy (57.8%). Cuts to tertiary specialty hospitals & facility upgrades (HFEP -42%)."
  },
  {
    rank: 4,
    acronym: "DILG",
    name: "Interior & Local Government",
    totalBudget: 332.50,
    ps: 265.40,
    mooe: 60.10,
    co: 7.00,
    finEx: 0.00,
    riskSummary: "Police base pay and pension liability consumes 79.8% of total department funds."
  },
  {
    rank: 5,
    acronym: "DND",
    name: "Department of National Defense",
    totalBudget: 328.80,
    ps: 222.80,
    mooe: 65.40,
    co: 40.60,
    finEx: 0.00,
    riskSummary: "Uniformed personnel pension & compensation leaves modest ₱40.6B for equipment modernization."
  },
  {
    rank: 6,
    acronym: "DSWD",
    name: "Social Welfare and Development",
    totalBudget: 241.60,
    ps: 18.50,
    mooe: 220.60,
    co: 2.50,
    finEx: 0.00,
    riskSummary: "Disbursement engine (91.3% MOOE). High risk of unliquidated ayuda grants and targeting leakage."
  },
  {
    rank: 7,
    acronym: "DA",
    name: "Department of Agriculture",
    totalBudget: 172.17,
    ps: 15.20,
    mooe: 120.37,
    co: 36.60,
    finEx: 0.00,
    riskSummary: "Net reduction from 2026. Massive unfulfilled irrigation (NIA requested ₱233B, granted ₱46B)."
  },
  {
    rank: 8,
    acronym: "DOTr",
    name: "Department of Transportation",
    totalBudget: 145.50,
    ps: 8.40,
    mooe: 25.10,
    co: 112.00,
    finEx: 0.00,
    riskSummary: "Capital-driven (77.0% CO). Rail and airport Right-of-Way (ROW) acquisition legal delays."
  },
  {
    rank: 9,
    acronym: "Judiciary",
    name: "Supreme Court & Lower Courts",
    totalBudget: 86.30,
    ps: 65.10,
    mooe: 18.20,
    co: 3.00,
    finEx: 0.00,
    riskSummary: "Magistrate compensation, court hall digitization, and case backlog decongestion."
  },
  {
    rank: 10,
    acronym: "DAR",
    name: "Department of Agrarian Reform",
    totalBudget: 16.94,
    ps: 7.07,
    mooe: 8.61,
    co: 1.25,
    finEx: 0.00,
    riskSummary: "Individual land titling (SPLIT project) and agrarian reform beneficiary support."
  }
];

// -------------------------------------------------------------
// 5. EDUCATION & YOUTH DEVELOPMENT (Page 5)
// -------------------------------------------------------------
export const educationData: EducationDataPoint[] = [
  {
    component: "DepEd Total",
    y2025: 793.00,
    y2026: 1015.31,
    y2027: 975.96,
    yoyGrowth2027: -3.9,
    description: "Includes basic education curriculum, teacher salaries, and operations across 47,000+ public schools.",
    criticalFlag: "-₱39.35B contraction vs 2026 peak"
  },
  {
    component: "SUCs / CHED",
    y2025: 138.50,
    y2026: 165.20,
    y2027: 176.50,
    yoyGrowth2027: 6.8,
    description: "Tertiary education funding and Universal Access to Quality Tertiary Education (UAQTE) free tuition.",
    criticalFlag: "Deep structural funding gap in per-student tertiary subsidy"
  },
  {
    component: "TESDA",
    y2025: 18.40,
    y2026: 20.24,
    y2027: 22.10,
    yoyGrowth2027: 9.1,
    description: "Technical-vocational education, apprenticeship programs, and industry skilling certifications."
  },
  {
    component: "School-Based Feeding (SBFP)",
    y2025: 15.30,
    y2026: 25.60,
    y2027: 11.43,
    yoyGrowth2027: -55.3,
    description: "Nutritional hot meals and fortified milk program for severely wasted and stunted elementary pupils.",
    criticalFlag: "🚨 SEVERE CUT: Feeding days slashed from 180 to 120 days"
  },
  {
    component: "Basic Education Facilities (BEFF)",
    y2025: 36.00,
    y2026: 57.30,
    y2027: 58.25,
    yoyGrowth2027: 1.6,
    description: "New classroom construction, school repairs, and furniture procurement against a 142k-160k unit backlog."
  }
];

// -------------------------------------------------------------
// 6. PUBLIC WORKS & INFRASTRUCTURE PIPELINE (Page 6)
// -------------------------------------------------------------
export const dpwhMetrics: DpwhMetricPoint[] = [
  {
    year: "2024 Actual",
    totalBudget: 822.20,
    capitalOutlay: 715.40,
    assetPreservation: 53.99,
    disbursementRate: 60.10,
    unliquidatedDefective: 138.00,
    delayedProjectsCount: 1435
  },
  {
    year: "2025 GAA",
    totalBudget: 1114.00,
    capitalOutlay: 985.20,
    assetPreservation: 62.10,
    disbursementRate: 58.40,
    unliquidatedDefective: 142.50,
    delayedProjectsCount: 1510
  },
  {
    year: "2026 Prog",
    totalBudget: 881.30,
    capitalOutlay: 760.10,
    assetPreservation: 68.40,
    disbursementRate: 56.18,
    unliquidatedDefective: 155.00,
    delayedProjectsCount: 1620
  },
  {
    year: "2027 NEP",
    totalBudget: 644.00,
    capitalOutlay: 538.70,
    assetPreservation: 75.10,
    disbursementRate: 75.00,
    isTarget: true,
    unliquidatedDefective: 138.00,
    delayedProjectsCount: 1435
  }
];

export const infrastructureTypologies = [
  { id: "highways", name: "Highways & Expressways", share2027: "34%", budgetPhpB: 183.1, coaConcern: "Right-of-Way disputes" },
  { id: "roads", name: "Secondary & Tertiary Roads", share2027: "28%", budgetPhpB: 150.8, coaConcern: "Substandard asphalt mixtures" },
  { id: "bridges", name: "Bridge Construction & Seismic Retrofit", share2027: "16%", budgetPhpB: 86.2, coaConcern: "Scour protection defects" },
  { id: "row", name: "Right-of-Way (ROW) Acquisitions", share2027: "12%", budgetPhpB: 64.6, coaConcern: "Expropriation court delays" },
  { id: "regional", name: "Regional Arterial & Island Connectivity Mega Projects", share2027: "10%", budgetPhpB: 54.0, coaConcern: "Negative slippages >10%" }
];

// -------------------------------------------------------------
// 7. FLOOD CONTROL & DISASTER RESILIENCE (Page 7)
// -------------------------------------------------------------
export const floodBudgetTrend = [
  { year: 2023, dpwh: 185.80, mmda: 15.20, total: 201.00 },
  { year: 2024, dpwh: 215.60, mmda: 18.50, total: 234.10 },
  { year: 2025, dpwh: 350.00, mmda: 22.40, total: 372.40 },
  { year: 2026, dpwh: 103.50, mmda: 24.10, total: 127.60 },
  { year: 2027, dpwh: 83.84, mmda: 25.50, total: 109.34 }
];

export const majorRiverBasins: RiverBasinData[] = [
  { id: "cagayan", name: "Cagayan River Basin", island: "Luzon", catchmentAreaKm2: 27753, allocationPhpB: 48.6, historicalInundationRisk: 9.4, coaFlaggedProjectsCount: 88, dpwhAllocation2027: 12.4, mmdaAllocation2027: 0.0, riskNote: "Severe flash-flooding in Isabela/Cagayan despite billions poured into isolated dikes.", hasDissonanceFlag: true },
  { id: "pampanga", name: "Pampanga River Basin", island: "Luzon", catchmentAreaKm2: 10434, allocationPhpB: 64.2, historicalInundationRisk: 9.2, coaFlaggedProjectsCount: 114, dpwhAllocation2027: 14.8, mmdaAllocation2027: 0.0, riskNote: "Central Luzon recurrent flooding; massive siltation in Candaba swamp.", hasDissonanceFlag: true },
  { id: "pasig_laguna", name: "Pasig-Marikina-Laguna de Bay", island: "Luzon", catchmentAreaKm2: 4678, allocationPhpB: 92.5, historicalInundationRisk: 8.8, coaFlaggedProjectsCount: 142, dpwhAllocation2027: 18.2, mmdaAllocation2027: 25.5, riskNote: "Highest urban density. Coordinated pumping stations vs severe canal encroachment.", hasDissonanceFlag: true },
  { id: "agno", name: "Agno River Basin", island: "Luzon", catchmentAreaKm2: 5952, allocationPhpB: 34.1, historicalInundationRisk: 8.0, coaFlaggedProjectsCount: 52, dpwhAllocation2027: 8.6, mmdaAllocation2027: 0.0, riskNote: "Upstream mining siltation in Bokod/Benguet damages downstream Pangasinan.", hasDissonanceFlag: true },
  { id: "bicol", name: "Bicol River Basin", island: "Luzon", catchmentAreaKm2: 3771, allocationPhpB: 42.0, historicalInundationRisk: 9.5, coaFlaggedProjectsCount: 76, dpwhAllocation2027: 9.4, mmdaAllocation2027: 0.0, riskNote: "Catastrophic typhoon storm surges inundate Naga and Camarines sur regularly.", hasDissonanceFlag: true },
  { id: "abra", name: "Abra River Basin", island: "Luzon", catchmentAreaKm2: 5125, allocationPhpB: 18.4, historicalInundationRisk: 6.2, coaFlaggedProjectsCount: 24, dpwhAllocation2027: 4.1, mmdaAllocation2027: 0.0, riskNote: "Mountainous runoff and landslide-induced river blockage in Cordilleras.", hasDissonanceFlag: false },
  { id: "panay", name: "Panay River Basin", island: "Visayas", catchmentAreaKm2: 2420, allocationPhpB: 22.8, historicalInundationRisk: 7.9, coaFlaggedProjectsCount: 39, dpwhAllocation2027: 5.2, mmdaAllocation2027: 0.0, riskNote: "Capiz and Iloilo agricultural plains submerged during monsoon cycles.", hasDissonanceFlag: true },
  { id: "jalaur", name: "Jalaur River Basin", island: "Visayas", catchmentAreaKm2: 1729, allocationPhpB: 19.5, historicalInundationRisk: 7.1, coaFlaggedProjectsCount: 31, dpwhAllocation2027: 4.8, mmdaAllocation2027: 0.0, riskNote: "Dual irrigation-flood management project experiencing delayed dam completion.", hasDissonanceFlag: false },
  { id: "ilog_hilabangan", name: "Ilog-Hilabangan Basin", island: "Visayas", catchmentAreaKm2: 1945, allocationPhpB: 14.2, historicalInundationRisk: 6.8, coaFlaggedProjectsCount: 22, dpwhAllocation2027: 3.2, mmdaAllocation2027: 0.0, riskNote: "Negros Occidental sugarland drainage congestion.", hasDissonanceFlag: false },
  { id: "mindanao_cotabato", name: "Mindanao (Cotabato) Basin", island: "Mindanao", catchmentAreaKm2: 23169, allocationPhpB: 38.6, historicalInundationRisk: 8.9, coaFlaggedProjectsCount: 64, dpwhAllocation2027: 7.5, mmdaAllocation2027: 0.0, riskNote: "Liguasan Marsh waterhyacinth blockages paralyze Cotabato city.", hasDissonanceFlag: true },
  { id: "agusan", name: "Agusan River Basin", island: "Mindanao", catchmentAreaKm2: 10921, allocationPhpB: 29.4, historicalInundationRisk: 8.4, coaFlaggedProjectsCount: 45, dpwhAllocation2027: 6.1, mmdaAllocation2027: 0.0, riskNote: "Agusan Marsh biodiversity balance vs recurrent Caraga agricultural inundation.", hasDissonanceFlag: true },
  { id: "tagoloan", name: "Tagoloan River Basin", island: "Mindanao", catchmentAreaKm2: 1704, allocationPhpB: 11.2, historicalInundationRisk: 5.8, coaFlaggedProjectsCount: 16, dpwhAllocation2027: 2.3, mmdaAllocation2027: 0.0, riskNote: "Misamis Oriental industrial zone flash floods.", hasDissonanceFlag: false },
  { id: "cagayan_de_oro", name: "Cagayan de Oro Basin", island: "Mindanao", catchmentAreaKm2: 1521, allocationPhpB: 16.8, historicalInundationRisk: 7.8, coaFlaggedProjectsCount: 28, dpwhAllocation2027: 3.8, mmdaAllocation2027: 0.0, riskNote: "Post-Sendong engineered flood walls need continuous maintenance.", hasDissonanceFlag: false },
  { id: "tagum_libuganon", name: "Tagum-Libuganon Basin", island: "Mindanao", catchmentAreaKm2: 2364, allocationPhpB: 15.1, historicalInundationRisk: 7.4, coaFlaggedProjectsCount: 21, dpwhAllocation2027: 3.1, mmdaAllocation2027: 0.0, riskNote: "Davao del Norte banana plantations vulnerable to river overflow.", hasDissonanceFlag: false },
  { id: "davao", name: "Davao River Basin", island: "Mindanao", catchmentAreaKm2: 1623, allocationPhpB: 17.6, historicalInundationRisk: 6.9, coaFlaggedProjectsCount: 29, dpwhAllocation2027: 3.6, mmdaAllocation2027: 0.0, riskNote: "Rapid suburbanization encroaching on upstream buffer zones.", hasDissonanceFlag: false },
  { id: "buayan_malungon", name: "Buayan-Malungon Basin", island: "Mindanao", catchmentAreaKm2: 1434, allocationPhpB: 8.9, historicalInundationRisk: 5.5, coaFlaggedProjectsCount: 12, dpwhAllocation2027: 1.8, mmdaAllocation2027: 0.0, riskNote: "Sarangani/General Santos flash flood control.", hasDissonanceFlag: false },
  { id: "agus", name: "Agus River Basin (Lake Lanao)", island: "Mindanao", catchmentAreaKm2: 1645, allocationPhpB: 12.5, historicalInundationRisk: 5.2, coaFlaggedProjectsCount: 18, dpwhAllocation2027: 2.1, mmdaAllocation2027: 0.0, riskNote: "Hydroelectric reservoir regulation and watershed protection.", hasDissonanceFlag: false },
  { id: "laoag", name: "Laoag River Basin", island: "Luzon", catchmentAreaKm2: 1332, allocationPhpB: 9.8, historicalInundationRisk: 6.0, coaFlaggedProjectsCount: 15, dpwhAllocation2027: 1.9, mmdaAllocation2027: 0.0, riskNote: "Ilocos Norte flood protection and sediment control.", hasDissonanceFlag: false }
];

// -------------------------------------------------------------
// 8. HEALTH SECTOR RESILIENCE (Page 8)
// -------------------------------------------------------------
export const healthComponents: HealthComponentData[] = [
  {
    component: "DOH Operations",
    axisKey: "doh_operations",
    y2024: 73.09,
    y2025: 113.63,
    y2026: 174.60,
    y2027: 214.76,
    description: "Regional hospitals, epidemiology bureau, retained healthcare staff compensation.",
    impactAlert: "Cuts to personnel services in 14 regional retained hospitals."
  },
  {
    component: "PhilHealth Subsidies",
    axisKey: "philhealth_subsidies",
    y2024: 101.50,
    y2025: 75.30,
    y2026: 80.20,
    y2027: 85.50,
    description: "Premium subsidies for indigent families, senior citizens, and PWDs under UHC Act.",
    impactAlert: "Heavy fiscal drain; controversial mid-year sweep of ₱89.9B unused reserves in 2024."
  },
  {
    component: "Specialty Hospitals",
    axisKey: "specialty_hospitals",
    y2024: 12.50,
    y2025: 14.20,
    y2026: 15.60,
    y2027: 11.20,
    description: "NKTI, Philippine Heart Center, Lung Center of the Philippines, PCMC.",
    impactAlert: "🚨 28% CUT: Forces apex tertiary centers to rely on out-of-pocket patient billing."
  },
  {
    component: "Health Facilities (HFEP)",
    axisKey: "health_facilities_hfep",
    y2024: 28.50,
    y2025: 35.37,
    y2026: 25.10,
    y2027: 14.54,
    description: "Infrastructure upgrading of provincial hospitals, rural health units (RHUs), and barangay health stations.",
    impactAlert: "🚨 58% DECIMATION from 2025 peak: Directly undermines regional equity in tertiary care."
  },
  {
    component: "Preventive Programs",
    axisKey: "preventive_programs",
    y2024: 18.40,
    y2025: 22.10,
    y2026: 24.50,
    y2027: 27.80,
    description: "Vaccination programs, tuberculosis mitigation, HIV/AIDS surveillance, and maternal care.",
    impactAlert: "Moderate augmentation (+13.5%), but still below international disease surveillance benchmarks."
  }
];

export const healthRadarData = [
  { axis: "DOH Operations", "2026 Enacted": 174.6, "2027 Proposed": 214.8, max: 250 },
  { axis: "PhilHealth Subsidy", "2026 Enacted": 80.2, "2027 Proposed": 85.5, max: 120 },
  { axis: "Specialty Hospitals", "2026 Enacted": 15.6, "2027 Proposed": 11.2, max: 20 },
  { axis: "Facilities (HFEP)", "2026 Enacted": 25.1, "2027 Proposed": 14.5, max: 40 },
  { axis: "Preventive Programs", "2026 Enacted": 24.5, "2027 Proposed": 27.8, max: 35 }
];

// -------------------------------------------------------------
// 9. AGRICULTURE & FOOD SECURITY (Page 9)
// -------------------------------------------------------------
export const agricultureComponents: AgriComponentData[] = [
  { component: "Department of Agriculture Total", y2024: 167.50, y2025: 225.80, y2026: 216.20, y2027: 172.17, variance2026to2027: -44.03, type: "agency", note: "Net -20.4% contraction despite food inflation crisis." },
  { component: "National Rice Program", y2024: 30.55, y2025: 45.20, y2026: 50.10, y2027: 52.40, variance2026to2027: 2.30, type: "flagship", note: "Production subsidies, hybrid seed inputs, and fertilizer vouchers." },
  { component: "RCEF (Competitiveness)", y2024: 10.00, y2025: 10.00, y2026: 15.00, y2027: 30.00, variance2026to2027: 15.00, type: "flagship", note: "Statutorily doubled to ₱30B from tariff collections for farm mechanization." },
  { component: "FMR (Farm-to-Market Roads)", y2024: 17.20, y2025: 18.50, y2026: 16.00, y2027: 16.50, variance2026to2027: 0.50, type: "support", note: "Piecemeal funding vs 55,000-kilometer nationwide unpaved backlog." },
  { component: "NIA (Irrigation Administration)", y2024: 41.50, y2025: 45.20, y2026: 42.10, y2027: 46.00, agencyRequested: 233.00, variance2026to2027: 3.90, type: "flagship", note: "Heavily truncated: Requested ₱233B to address 1.1M hectare backlog; given ₱46B." }
];

export const agricultureWaterfallSteps = [
  { name: "2026 DA Baseline", value: 216.20, isTotal: true },
  { name: "RCEF Expansion", value: 15.00, isPositive: true },
  { name: "Rice Program Growth", value: 2.30, isPositive: true },
  { name: "NIA Allocation Bump", value: 3.90, isPositive: true },
  { name: "FMR Road Minor Gain", value: 0.50, isPositive: true },
  { name: "DA Operational Cuts", value: -65.73, isNegative: true },
  { name: "2027 DA Ceiling", value: 172.17, isTotal: true }
];

// -------------------------------------------------------------
// 10. SOCIAL PROTECTION & TARGETED "AYUDA" (Page 10)
// -------------------------------------------------------------
export const ayudaPrograms: AyudaDataPoint[] = [
  {
    program: "4Ps (Conditional Cash)",
    agency: "DSWD",
    y2024: 108.80,
    y2025: 114.20,
    y2026: 113.00,
    y2027: 113.80,
    color: "#2563EB", // Steady Dark Blue
    isConditional: true,
    targetingEfficiency: "High (National Household Targeting System / Listahanan)",
    coaAuditFlags: "Minor compliance verification issues; lowest leakage rate in social portfolio."
  },
  {
    program: "AICS (DSWD Crisis Assistance)",
    agency: "DSWD",
    y2024: 35.00,
    y2025: 40.50,
    y2026: 50.20,
    y2027: 63.90,
    color: "#F97316", // Vivid Orange
    isConditional: false,
    targetingEfficiency: "Moderate / Vulnerable to political referral walk-ins",
    coaAuditFlags: "Flagged repeatedly for lack of cross-matching and duplicate manual payouts."
  },
  {
    program: "TUPAD (Emergency Livelihood)",
    agency: "DOLE",
    y2024: 12.50,
    y2025: 15.00,
    y2026: 18.20,
    y2027: 14.82,
    color: "#EAB308", // Yellow
    isConditional: false,
    targetingEfficiency: "Discretionary / LGU and congressional sponsorship channels",
    coaAuditFlags: "COA flagged ghost workers, delayed disbursements, and missing payroll signoffs."
  },
  {
    program: "AKAP (Ayuda sa Kapos ang Kita)",
    agency: "DSWD",
    y2024: 0.00,
    y2025: 25.00,
    y2026: 30.50,
    y2027: 35.00,
    color: "#EC4899", // Magenta Pink
    isConditional: false,
    targetingEfficiency: "Controversial / High political patronization risk",
    coaAuditFlags: "Introduced via legislative insertions; criticized for competing with 4Ps."
  },
  {
    program: "Social Pension for Indigent Seniors",
    agency: "DSWD / NCSC",
    y2024: 25.30,
    y2025: 49.80,
    y2026: 49.80,
    y2027: 50.50,
    color: "#10B981", // Emerald
    isConditional: false,
    targetingEfficiency: "High need / Verifiable age registry",
    coaAuditFlags: "₱1,000/month stipend rollout delayed by validation backlog in local treasuries."
  }
];

export const ayudaTimeline = [
  { year: 2024, "4Ps": 108.80, "AICS": 35.00, "TUPAD": 12.50, "AKAP": 0.00, "Social Pension": 25.30, total: 181.60 },
  { year: 2025, "4Ps": 114.20, "AICS": 40.50, "TUPAD": 15.00, "AKAP": 25.00, "Social Pension": 49.80, total: 244.50 },
  { year: 2026, "4Ps": 113.00, "AICS": 50.20, "TUPAD": 18.20, "AKAP": 30.50, "Social Pension": 49.80, total: 261.70 },
  { year: 2027, "4Ps": 113.80, "AICS": 63.90, "TUPAD": 14.82, "AKAP": 35.00, "Social Pension": 50.50, total: 278.02 }
];

// -------------------------------------------------------------
// 11. DEBT SERVICING & FISCAL PRESSURE POINTS (Page 11)
// -------------------------------------------------------------
export const debtServicingData: DebtDataPoint[] = [
  {
    year: "2018",
    interestPayments: 349.0,
    principalAmortization: 390.5,
    totalDebtService: 739.5,
    grossBorrowing: 950.0,
    debtToGdp: 39.9,
    domesticRatio: 68,
    externalRatio: 32,
    fxSensitivityPhp1Depreciation: 18.2
  },
  {
    year: "2021",
    interestPayments: 429.4,
    principalAmortization: 780.2,
    totalDebtService: 1209.6,
    grossBorrowing: 2580.0,
    debtToGdp: 60.4,
    domesticRatio: 74,
    externalRatio: 26,
    fxSensitivityPhp1Depreciation: 22.4
  },
  {
    year: "2024",
    interestPayments: 699.2,
    principalAmortization: 1019.0,
    totalDebtService: 1718.2,
    grossBorrowing: 2564.5,
    debtToGdp: 60.7,
    domesticRatio: 75,
    externalRatio: 25,
    fxSensitivityPhp1Depreciation: 26.8
  },
  {
    year: "2027 (Est)",
    interestPayments: 1114.2,
    principalAmortization: 1590.0,
    totalDebtService: 2704.2,
    grossBorrowing: 3304.0,
    debtToGdp: 59.6,
    domesticRatio: 72,
    externalRatio: 28,
    fxSensitivityPhp1Depreciation: 29.5
  }
];

// -------------------------------------------------------------
// 12. INTERGOVERNMENTAL FISCAL TRANSFERS & LGUs (Page 12)
// -------------------------------------------------------------
export const lguTransfersData: LguTransferPoint[] = [
  { year: "2021", nta: 695.50, lgsf: 28.50, barmmBlockGrant: 71.60, total: 795.60 },
  { year: "2023", nta: 820.27, lgsf: 31.72, barmmBlockGrant: 74.40, total: 926.39 },
  { year: "2024", nta: 871.38, lgsf: 16.10, barmmBlockGrant: 80.50, total: 967.98 },
  { year: "2026", nta: 1190.50, lgsf: 31.70, barmmBlockGrant: 90.20, total: 1312.40 },
  { year: "2027", nta: 1319.83, lgsf: 35.00, barmmBlockGrant: 95.50, total: 1450.33 }
];

export const ntaFormulaDistribution = [
  { level: "Municipalities", percentage: 34, share2027PhpB: 448.74, unitsCount: 1488, color: "#3B82F6" },
  { level: "Provinces", percentage: 23, share2027PhpB: 303.56, unitsCount: 82, color: "#60A5FA" },
  { level: "Cities", percentage: 23, share2027PhpB: 303.56, unitsCount: 149, color: "#93C5FD" },
  { level: "Barangays", percentage: 20, share2027PhpB: 263.97, unitsCount: 42027, color: "#BFDBFE" }
];

export const regionalLguSamples = [
  { region: "Western Visayas (Region VI)", totalTransfer: 88.4, nta: 81.6, lgsf: 6.8, absorptiveIndex: "74%", note: "Inter-island logistics and agricultural transport network expansion." },
  { region: "Bangsamoro (BARMM)", totalTransfer: 122.5, nta: 27.0, barmmBlockGrant: 95.5, absorptiveIndex: "49%", note: "Special Block Grant autonomy with delayed audit reconciliation." },
  { region: "Central Luzon (Region III)", totalTransfer: 118.2, nta: 112.5, lgsf: 5.7, absorptiveIndex: "82%", note: "High execution capacity across agricultural & industrial hubs." },
  { region: "National Capital Region (NCR)", totalTransfer: 105.4, nta: 102.1, lgsf: 3.3, absorptiveIndex: "91%", note: "Concentrated local tax bases alongside substantial NTA receipt." }
];

// -------------------------------------------------------------
// 13. CLIMATE CHANGE EXPENDITURE TAGGING (CCET) (Page 13)
// -------------------------------------------------------------
export const ccetHistoricalData: CcetDataPoint[] = [
  { year: "2023", adaptation: 374.90, mitigation: 168.60, total: 543.50 },
  { year: "2024", adaptation: 450.50, mitigation: 185.00, total: 635.50 },
  { year: "2025", adaptation: 850.00, mitigation: 150.00, total: 1000.00 },
  { year: "2026", adaptation: 580.00, mitigation: 110.00, total: 690.00 },
  { year: "2027", adaptation: 530.00, mitigation: 108.00, total: 638.00 }
];

export const ccetAgencyBreakdown2027 = [
  {
    agency: "DPWH (Gray Infrastructure)",
    allocationPhpB: 442.0,
    sharePct: 83.4,
    category: "adaptation",
    critique: "Rebranding conventional concrete flood control and dredging as climate adaptation."
  },
  {
    agency: "Department of Agriculture (DA)",
    allocationPhpB: 48.2,
    sharePct: 9.1,
    category: "adaptation",
    critique: "Drought-resilient seeds and solar irrigation projects with historical zero disbursement."
  },
  {
    agency: "DENR (Ecology & Forestry)",
    allocationPhpB: 23.8,
    sharePct: 4.5,
    category: "adaptation",
    critique: "Severely underfunded relative to massive 77% depleted national forest cover."
  },
  {
    agency: "DOST & Climate Commission",
    allocationPhpB: 16.0,
    sharePct: 3.0,
    category: "adaptation",
    critique: "Weather radar stations, hazard modeling, and research."
  }
];

export const ccetMitigationAgencies2027 = [
  { agency: "DOTr (Rail & Green Fleet)", allocationPhpB: 72.4, sharePct: 67.0 },
  { agency: "DOE (Renewable Transition)", allocationPhpB: 24.1, sharePct: 22.3 },
  { agency: "Other Agencies", allocationPhpB: 11.5, sharePct: 10.7 }
];

// -------------------------------------------------------------
// 14. LUMP SUMS & NON-ITEMIZED FUNDS (Page 14)
// -------------------------------------------------------------
export const lumpSumData: LumpSumDataPoint[] = [
  { year: "2021", unprogrammedAppropriations: 251.0, calamityFund: 20.0, pensionGratuityFund: 172.0, mpbf: 45.0 },
  { year: "2023", unprogrammedAppropriations: 807.1, calamityFund: 30.0, pensionGratuityFund: 253.0, mpbf: 61.15 },
  { year: "2025", unprogrammedAppropriations: 731.4, calamityFund: 31.0, pensionGratuityFund: 144.7, mpbf: 96.40 },
  { year: "2026", unprogrammedAppropriations: 531.6, calamityFund: 35.0, pensionGratuityFund: 210.0, mpbf: 110.00 },
  { year: "2027", unprogrammedAppropriations: 111.0, calamityFund: 35.0, pensionGratuityFund: 230.0, mpbf: 115.00 }
];

export const nonItemizedDescriptions = [
  {
    id: "ua",
    name: "Unprogrammed Appropriations (UA)",
    allocation2027: 111.0,
    peakHistorical: 807.1,
    status: "Normalized to historic low",
    triggers: "Strictly requires excess BIR/BOC tax collection above annual DBCC targets or newly approved foreign loan agreements.",
    governanceRisk: "Historically used as shadow budget reservoir for mid-year executive realignments and GOCC dividend sweeps."
  },
  {
    id: "pgf",
    name: "Pension and Gratuity Fund (PGF)",
    allocation2027: 230.0,
    peakHistorical: 253.0,
    status: "Expanding (+9.5% YoY)",
    triggers: "Retirement claims, mandatory pension indexing for military and uniformed personnel (MUP), terminal leave.",
    governanceRisk: "Unfunded actuarial liabilities threaten sovereign budget stability; non-contributory military pension legacy."
  },
  {
    id: "mpbf",
    name: "Miscellaneous Personnel Benefits Fund (MPBF)",
    allocation2027: 115.0,
    peakHistorical: 115.0,
    status: "Record High",
    triggers: "Creation of new government positions, salary standardization law tranches, deficiency in agency personnel services.",
    governanceRisk: "Large floating sum parked outside agency line items; prone to bureaucratic slow disbursement."
  },
  {
    id: "calamity",
    name: "National Disaster Risk Reduction Fund (Calamity)",
    allocation2027: 35.0,
    peakHistorical: 35.0,
    status: "Flatline at ₱35B",
    triggers: "Presidential declaration of State of Calamity upon catastrophic typhoon, earthquake, or volcanic eruption.",
    governanceRisk: "Often depleted within Q3 of each fiscal year due to compounding climate extremes."
  }
];

// -------------------------------------------------------------
// 15. SURVEILLANCE, INTELLIGENCE & CONFIDENTIAL FUNDS (Page 15)
// -------------------------------------------------------------
export const cifEntities: CifDataPoint[] = [
  {
    entity: "Office of the President (OP)",
    y2023: 4500.0,
    y2024: 4500.0,
    y2025: 4500.0,
    y2026: 4500.0,
    y2027: 4500.0,
    confidential2027: 2250.0,
    intelligence2027: 2250.0,
    share2027Pct: 41.77,
    auditNotes: "Directly controlled by the executive. Exceeds frontline military and police intelligence allocations combined."
  },
  {
    entity: "Dept. of National Defense (DND)",
    y2023: 1800.0,
    y2024: 1848.0,
    y2025: 1848.0,
    y2026: 1848.0,
    y2027: 1848.0,
    confidential2027: 348.0,
    intelligence2027: 1500.0,
    share2027Pct: 17.15,
    auditNotes: "External territorial defense, West Philippine Sea maritime reconnaissance, and counter-insurgency operations."
  },
  {
    entity: "DILG / Philippine National Police (PNP)",
    y2023: 906.6,
    y2024: 906.6,
    y2025: 906.6,
    y2026: 906.6,
    y2027: 906.6,
    confidential2027: 100.0,
    intelligence2027: 806.6,
    share2027Pct: 8.42,
    auditNotes: "Internal peace and order, anti-narcotics intelligence, cybercrime forensic monitoring."
  },
  {
    entity: "Department of Justice (DOJ / NBI)",
    y2023: 579.4,
    y2024: 579.4,
    y2025: 579.4,
    y2026: 579.4,
    y2027: 579.4,
    confidential2027: 310.0,
    intelligence2027: 269.4,
    share2027Pct: 5.38,
    auditNotes: "National Bureau of Investigation (NBI), immigration fraud syndicates, witness protection program operations."
  },
  {
    entity: "Civilian & Other Line Agencies",
    y2023: 1296.0,
    y2024: 1366.0,
    y2025: 2936.0,
    y2026: 2939.0,
    y2027: 2939.0,
    confidential2027: 1360.0,
    intelligence2027: 1579.0,
    share2027Pct: 27.28,
    auditNotes: "Includes Anti-Money Laundering Council (AMLC), DOTr port security, custom anti-smuggling units."
  }
];

export const cifTotal2027 = {
  total: 10773.0, // in PHP Millions = ₱10.773 Billion
  confidential: 4368.0,
  intelligence: 6405.0,
  confidentialPct: 40.55,
  intelligencePct: 59.45
};

// -------------------------------------------------------------
// 16. WORKS CITED / BIBLIOGRAPHY (53 References from PDF)
// -------------------------------------------------------------
export const worksCited: Citation[] = [
  { id: 1, title: "DBM submits proposed ₱7.2-trillion 2027 budget to Marcos", url: "https://www.gmanetwork.com/news/topstories/nation/998000/dbm-submits-proposed-p7-2-trillion-2027-budget-to-marcos/story/", category: "Official DBM/Gov" },
  { id: 2, title: "Proposed P7.2-T 2027 nat'l budget to be submitted to Congress", url: "https://www.gmanetwork.com/news/topstories/nation/996851/proposed-p7-2-t-2027-nat-l-budget-to-be-submitted-to-congress-before-aug-14-dbm/story/", category: "News & Analysis" },
  { id: 3, title: "193rd DBCC Statement on the Review of the Medium-Term Macroeconomic Assumptions", url: "https://www.dbm.gov.ph/index.php/management-2/4081-193rd-dbcc-statement-on-the-review-of-the-medium-term-macroeconomic-assumptions-and-fiscal-program", category: "Official DBM/Gov" },
  { id: 4, title: "EXPENDITURE ASSESSMENT PROPOSED FY 2026 NATIONAL BUDGET (CPBRD)", url: "https://cpbrd.congress.gov.ph/wp-content/uploads/2025/08/BB2025-06-EXPENDITURE-ASSESSMENT-final.pdf", category: "Congress & CPBRD" },
  { id: 5, title: "PH debt manageable as gov't cuts deficit, protects growth in 2027 budget", url: "https://www.dbm.gov.ph/index.php/management-2/4170-dbm-ph-debt-manageable-as-gov-t-cuts-deficit-protects-growth-in-proposed-2027-budget", category: "Official DBM/Gov" },
  { id: 6, title: "Marcos economic team proposes record P7.2-trillion 2027 national budget", url: "https://www.gmanetwork.com/news/money/economy/994198/marcos-economic-team-proposes-record-p7-2-trillion-2027-national-budget/story/", category: "News & Analysis" },
  { id: 7, title: "Go confident on BOC hitting P1-trillion revenue goal in 2026", url: "https://business.inquirer.net/574017/go-confident-on-boc-hitting-p1-trillion-revenue-goal-in-2026", category: "News & Analysis" },
  { id: 8, title: "BIR, BoC upbeat on revenue targets", url: "https://bworldonline.com/top-stories/2026/07/20/764408/bir-boc-upbeat-on-revenue-targets/", category: "News & Analysis" },
  { id: 9, title: "Fitch Ratings: Philippines Budget Reflects Growth and Fiscal Consolidation Trade-offs", url: "https://www.fitchratings.com/research/sovereigns/philippines-budget-reflects-growth-fiscal-consolidation-trade-offs-20-08-2026", category: "News & Analysis" },
  { id: 10, title: "2025 ECCP European-Philippine Economic Advocacy Papers", url: "https://www.eccp.com/storage/app/media/2025%20Advocacy%20Papers/2025%20ECCP%20Advocacy%20Papers.pdf", category: "News & Analysis" },
  { id: 11, title: "2026 People's Enacted Budget - Department of Budget and Management", url: "https://www.dbm.gov.ph/wp-content/uploads/Our%20Budget/2026/2026-People's-Enacted-Budget.pdf", category: "Official DBM/Gov" },
  { id: 12, title: "2025 People's Proposed Budget - DBM", url: "https://www.dbm.gov.ph/wp-content/uploads/Our%20Budget/2025/2025-People's-Proposed-Budget-(as-of-10.2).pdf", category: "Official DBM/Gov" },
  { id: 13, title: "People's Enacted Budget 2025 Revised - DBM", url: "https://www.dbm.gov.ph/wp-content/uploads/Our%20Budget/2025/2025-People's-Enacted-(revised-as-of-4.22.25).pdf", category: "Official DBM/Gov" },
  { id: 14, title: "2023 budget 'springboard' for full-speed economic recovery: DBM", url: "https://www.pna.gov.ph/articles/1182279", category: "Official DBM/Gov" },
  { id: 15, title: "DepEd Personnel Services Baseline Analysis", url: "https://www.dbm.gov.ph", category: "Official DBM/Gov" },
  { id: 16, title: "Budgetary Issues and Concerns FY 2027 - CPBRD Congressional Note", url: "https://cpbrd.congress.gov.ph/wp-content/uploads/2026/09/ABN2026-30-BUDGETARY-ISSUES-AND-CONCERNS-FY2027.pdf", category: "Congress & CPBRD" },
  { id: 17, title: "Fiscal Space Assessment: Only P2.8 trillion fiscal space available for 2027 budget", url: "https://www.facebook.com/ONENewsPH/posts/suzara-only-p28-trillion-fiscal-space-available-for-2027-budgetpoliticalbeat-pub/1614225994066079/", category: "News & Analysis" },
  { id: 18, title: "DPWH Agency Budget Notes FY 2027 (CSO-HRep)", url: "https://docs.congress.hrep.online/download/cso/2027/DPWH-ABN-FY2027.pdf", category: "Congress & CPBRD" },
  { id: 19, title: "DBM submits ₱7.2-T 2027 people-centered budget to Congress", url: "https://www.dbm.gov.ph/index.php/management-2/4143-dbm-submits-7-2-t-2027-people-centered-budget-to-congress", category: "Official DBM/Gov" },
  { id: 20, title: "House Appropriations Deliberations on 2027 DSWD Budget", url: "https://www.facebook.com/BicolNewsandUpdatesOfficial/posts/1506495044836489/", category: "News & Analysis" },
  { id: 21, title: "DSWD Agency Budget Notes FY 2027 (CPBRD)", url: "https://cpbrd.congress.gov.ph/wp-content/uploads/2026/09/ABN2026-26-DSWD-FY-2027.pdf", category: "Congress & CPBRD" },
  { id: 22, title: "House of Representatives: Education remains top budget priority", url: "https://www.congress.gov.ph/media/press-releases/10308", category: "Congress & CPBRD" },
  { id: 23, title: "CHED Agency Budget Notes FY 2027 (CPBRD)", url: "https://cpbrd.congress.gov.ph/wp-content/uploads/2026/08/ABN2026-11-CHED-FY2027.pdf", category: "Congress & CPBRD" },
  { id: 24, title: "Department of Finance Annual Report 2024", url: "https://www.dof.gov.ph/wp-content/uploads/2024/12/2024-DOF-ANNUAL-REPORT.pdf", category: "Official DBM/Gov" },
  { id: 25, title: "EDCOM II Year 3 Report: Turning Point in Philippine Education", url: "https://edcom2.gov.ph/media/2026/01/EDCOM-II-Y03-for-web-012626_final.pdf", category: "Congress & CPBRD" },
  { id: 26, title: "NEDA Regional Development Investment Program (RDIP) Guidelines 2023-2028", url: "https://www.scribd.com/document/806752543/RDIP-2023-2028", category: "Official DBM/Gov" },
  { id: 27, title: "COA: DPWH failed to efficiently carry out P138 billion projects", url: "https://www.gmanetwork.com/news/topstories/nation/968362/coa-dpwh-failed-to-efficiently-carry-out-p138-billion-projects-in-2024/story/", category: "Audit / COA" },
  { id: 28, title: "DPWH Budget Historical Analysis 2023 to 2025", url: "https://www.facebook.com/61569052697540/videos/2122921565298972/", category: "News & Analysis" },
  { id: 29, title: "Top 15 Legislative Districts with Largest Proposed DPWH Allocations", url: "https://www.facebook.com/mamimili.sa.canada.2025/posts/122263543982141218/", category: "News & Analysis" },
  { id: 30, title: "DPWH Confirms P289 Billion Worth of Discretionary Insertions", url: "https://www.facebook.com/politics.com.ph/posts/1234322858734109/", category: "News & Analysis" },
  { id: 31, title: "DPWH Plans to Reallocate ₱20 Billion in Infrastructure Funds", url: "https://www.facebook.com/Rise.Strike.Rad/posts/122227782986533850/", category: "News & Analysis" },
  { id: 32, title: "Marcos calls for strict implementation of no-build zone amid widespread flooding", url: "https://www.facebook.com/TheManilaTimes/posts/1528407459327430/", category: "News & Analysis" },
  { id: 33, title: "Philippines proposes US$11 billion (₱638B) in climate-tagged spending for 2027", url: "https://www.facebook.com/EcoBusinessMedia/posts/1549400557199948/", category: "News & Analysis" },
  { id: 34, title: "Enhancing Climate and Disaster Resilience through Nature-based Solutions (ASEAN)", url: "https://asean.org/wp-content/uploads/2026/07/edited-2026-Report-05_ASEAN-NbS-Finance-Report.pdf", category: "News & Analysis" },
  { id: 35, title: "Agno River Siltation and Erosion Control Report (Bokod)", url: "https://www.facebook.com/baguioherald/posts/1542727114541279/", category: "News & Analysis" },
  { id: 36, title: "Health groups rally against proposed P39.3B cuts to public hospitals", url: "https://www.facebook.com/TheManilaTimes/posts/1529455335889309/", category: "News & Analysis" },
  { id: 37, title: "House approval of President's 2027 national budget and PhilHealth reserve absorption", url: "https://www.facebook.com/bncphl/posts/122350147298354398/", category: "News & Analysis" },
  { id: 38, title: "DOH: ₱485B cut from original 2027 budget request", url: "https://www.facebook.com/NewsWatchPlusPH/posts/1452470290341461/", category: "News & Analysis" },
  { id: 39, title: "House questions cuts in health workers' salaries and hazard allowances", url: "https://www.facebook.com/ONENewsPH/posts/1627413092747369/", category: "News & Analysis" },
  { id: 40, title: "DBM allots P69.9B for gov't rice programs under 2027 national budget", url: "https://www.gmanetwork.com/news/money/economy/1000831/dbm-allots-p69-9b-for-gov-t-rice-programs-under-2027-nat-l-budget/story/", category: "News & Analysis" },
  { id: 41, title: "Turnover of Assistance, Benefits and Aid to Marginalized Sectors", url: "https://www.facebook.com/tinambacmps.csppo/posts/3984750705123249/", category: "News & Analysis" },
  { id: 42, title: "Roundtable for Inclusive Development on Fiscal Discipline", url: "https://www.facebook.com/ONENewsPH/posts/1329354515886563/", category: "News & Analysis" },
  { id: 43, title: "National Underspending and Absorptive Constraints Analysis", url: "https://www.facebook.com/philipjr.lustre/posts/2286854701346695/", category: "News & Analysis" },
  { id: 44, title: "Public Debt Sustainability Proposed FY 2027 National Budget (HRep CSO)", url: "https://docs.congress.hrep.online/download/cso/2027/BB2026-04-DEBT%20SUSTAINABILITY%20AND%20THE%202027%20NATIONAL%20BUDGET.pdf", category: "Congress & CPBRD" },
  { id: 45, title: "Public Debt Sustainability Proposed FY 2026 National Budget (CPBRD)", url: "https://cpbrd.congress.gov.ph/wp-content/uploads/2025/08/BB2025-04-PUBLIC-DEBT-SUSTAINABILITY-AND-THE-PROPOSED-FY2026-NATIONAL-BUDGET.pdf", category: "Congress & CPBRD" },
  { id: 46, title: "Bigger LGU budgets seen as NTA projected to hit P1.4 trillion in 2027", url: "https://www.facebook.com/gmanews/posts/1665864678918516/", category: "News & Analysis" },
  { id: 47, title: "Local Budget Memorandum No. 94 - DBM Fiscal Transfers Guidelines", url: "https://www.dbm.gov.ph/wp-content/uploads/Issuances/2026/Local-Budget-Memorandum/LOCAL-BUDGET-MEMORANDUM-NO.-94.pdf", category: "Official DBM/Gov" },
  { id: 48, title: "Eastern Visayas Regional Development Plan 2023-2028", url: "https://www.scribd.com/document/772334637/EV-RDP-2023-2028-1", category: "Official DBM/Gov" },
  { id: 49, title: "Discretionary Budget Insertions and Fiscal Friction", url: "https://www.facebook.com/NileCrownMedia/posts/122143228130979502/", category: "News & Analysis" },
  { id: 50, title: "Special Purpose Funds and Unfilled Positions Audit - COA ABN FY 2027", url: "https://docs.congress.hrep.online/download/cso/2027/COA-ABN-FY2027.pdf", category: "Audit / COA" },
  { id: 51, title: "COMELEC Agency Budget Notes FY 2027 (CPBRD)", url: "https://cpbrd.congress.gov.ph/wp-content/uploads/2026/08/ABN2026-14-COMELEC-FY2027.pdf", category: "Congress & CPBRD" },
  { id: 52, title: "DBM Auto-Release Mechanism for Personnel Services & Mandated Benefits", url: "https://www.facebook.com/gabotafph/posts/1673839004783609/", category: "Official DBM/Gov" },
  { id: 53, title: "P10.773 billion in confidential, intelligence funds eyed for 2027 - Rappler", url: "https://www.facebook.com/rapplerdotcom/posts/1598901852271877/", category: "News & Analysis" }
];

// -------------------------------------------------------------
// SECTION DEFINITIONS & METADATA
// -------------------------------------------------------------
export interface DashboardSection {
  id: string;
  pageNum: number;
  navLabel: string;
  shortTitle: string;
  fullTitle: string;
  subtitle: string;
  primaryMetric: string;
  primaryMetricLabel: string;
  highlightTag: string;
}

export const DASHBOARD_SECTIONS: DashboardSection[] = [
  {
    id: "section-1",
    pageNum: 1,
    navLabel: "Macro Fiscal Envelope",
    shortTitle: "Macro Ceiling",
    fullTitle: "Macro Fiscal Envelope & Top-Line Ceiling",
    subtitle: "Consolidated MTFF Path, Revenue Targets & Deficit Trajectory (2018–2027)",
    primaryMetric: "₱7.200 T",
    primaryMetricLabel: "Total Budget Ceiling (+6.0% YoY)",
    highlightTag: "5.1% Deficit Target"
  },
  {
    id: "section-2",
    pageNum: 2,
    navLabel: "1-Billion Grid Simulation",
    shortTitle: "1-Billion Grid",
    fullTitle: "The 1-Billion Grid Simulation",
    subtitle: "7,200 Micro-Unit Grid Mapping Macro Proportions & Real-World Public Equivalencies",
    primaryMetric: "7,200 Units",
    primaryMetricLabel: "₱1.0B per Interactive Block",
    highlightTag: "38.3% Social Share"
  },
  {
    id: "section-3",
    pageNum: 3,
    navLabel: "Sectoral Longitudinal Shift",
    shortTitle: "Sectoral Shifts",
    fullTitle: "Sectoral Classification & Long-Term Policy Shifts",
    subtitle: "10-Year Decadal Evolution: Social Services Ascendancy vs. Debt Crowding (2018–2027)",
    primaryMetric: "12.5% CAGR",
    primaryMetricLabel: "Fastest Growth: Defense Sector",
    highlightTag: "₱2,757.6B Social"
  },
  {
    id: "section-4",
    pageNum: 4,
    navLabel: "Department Allocations",
    shortTitle: "Top 10 Agencies",
    fullTitle: "Department & Agency Allocations Ranking",
    subtitle: "Horizontal Expense Class Anatomy: PS Rigidity vs. Capital Outlays in Top 10 Portfolios",
    primaryMetric: "₱975.96 B",
    primaryMetricLabel: "DepEd Leading Department",
    highlightTag: "83.6% DPWH Capital"
  },
  {
    id: "section-5",
    pageNum: 5,
    navLabel: "Education & Youth",
    shortTitle: "Education Crisis",
    fullTitle: "Education & Youth Development",
    subtitle: "DepEd Contraction, Basic Classroom Backlogs & the 55% School Feeding Cut",
    primaryMetric: "-55.3% Cut",
    primaryMetricLabel: "School-Based Feeding Reduction",
    highlightTag: "142k Classroom Deficit"
  },
  {
    id: "section-6",
    pageNum: 6,
    navLabel: "Public Works & Pipeline",
    shortTitle: "Infrastructure",
    fullTitle: "Public Works & Infrastructure Pipeline",
    subtitle: "Capital Outlay Recalibration, COA Absorptive Flags & Asset Preservation",
    primaryMetric: "56.18%",
    primaryMetricLabel: "Disbursement Velocity vs 75% Target",
    highlightTag: "₱138B COA Flagged"
  },
  {
    id: "section-7",
    pageNum: 7,
    navLabel: "Flood Control & Basins",
    shortTitle: "Flood Resilience",
    fullTitle: "Flood Control & Disaster Resilience",
    subtitle: "18 Major River Basin Catchments: Capital Density vs. Inundation Dissonance",
    primaryMetric: "₱83.84 B",
    primaryMetricLabel: "DPWH Flood Mgt (Down from ₱350B)",
    highlightTag: "18 Catchment Basins"
  },
  {
    id: "section-8",
    pageNum: 8,
    navLabel: "Health Sector Resilience",
    shortTitle: "Health Resilience",
    fullTitle: "Health Sector Resilience",
    subtitle: "Spider-Web Analysis: Regional Hospital Personnel, HFEP Facilities & Apex Subsidies",
    primaryMetric: "-42.1%",
    primaryMetricLabel: "HFEP Facility Upgrades Cut",
    highlightTag: "₱353.8B DOH Total"
  },
  {
    id: "section-9",
    pageNum: 9,
    navLabel: "Agriculture & Food",
    shortTitle: "Food Security",
    fullTitle: "Agriculture & Food Security",
    subtitle: "Fiscal Waterfall: RCEF Expansion vs. ₱187B Truncated Irrigation Requests",
    primaryMetric: "₱172.17 B",
    primaryMetricLabel: "Total DA (-20.4% vs 2026)",
    highlightTag: "₱30B RCEF Double"
  },
  {
    id: "section-10",
    pageNum: 10,
    navLabel: "Targeted Ayuda Programs",
    shortTitle: "Social Protection",
    fullTitle: "Social Protection & Targeted 'Ayuda' Programs",
    subtitle: "4Ps Conditional Anchor vs. Unchecked Surges in Discretionary AICS & AKAP Subsidies",
    primaryMetric: "+27.3%",
    primaryMetricLabel: "AICS Crisis Expansion (₱63.9B)",
    highlightTag: "₱113.8B 4Ps Anchor"
  },
  {
    id: "section-11",
    pageNum: 11,
    navLabel: "Debt Servicing Pressure",
    shortTitle: "Debt Pressures",
    fullTitle: "Debt Servicing & Fiscal Pressure Points",
    subtitle: "Compounding Maturity Wall: ₱1.11T Interest Outflow & 72:28 Domestic Borrowing Bias",
    primaryMetric: "₱2,704.2 B",
    primaryMetricLabel: "Total Debt Servicing Cash Need",
    highlightTag: "59.6% Debt-to-GDP"
  },
  {
    id: "section-12",
    pageNum: 12,
    navLabel: "LGU Transfers & Mandanas",
    shortTitle: "LGU Transfers",
    fullTitle: "Intergovernmental Fiscal Transfers & LGU Allocations",
    subtitle: "Multi-Tiered Sankey Flow: ₱1.32T NTA Surge, Devolution Bottlenecks & Local Multipliers",
    primaryMetric: "₱1,319.8 B",
    primaryMetricLabel: "National Tax Allotment (+10.86%)",
    highlightTag: "₱1.45T Total to LGUs"
  },
  {
    id: "section-13",
    pageNum: 13,
    navLabel: "Climate Finance (CCET)",
    shortTitle: "Climate Finance",
    fullTitle: "Climate Change Expenditures (CCET)",
    subtitle: "The $11B Climate Tagging Reality: Gray DPWH Infrastructure vs. True Natural Ecology",
    primaryMetric: "83.4%",
    primaryMetricLabel: "DPWH Gray Works in Adaptation",
    highlightTag: "₱638B Total CCET"
  },
  {
    id: "section-14",
    pageNum: 14,
    navLabel: "Non-Itemized Lump Sums",
    shortTitle: "Shadow Budget",
    fullTitle: "Non-Itemized Funds, Lump Sums & 'Pork Barrel' Indicators",
    subtitle: "Unprogrammed Appropriations Normalization vs. Surging Pension Liabilities",
    primaryMetric: "₱111.0 B",
    primaryMetricLabel: "Unprogrammed Drop (from ₱807B)",
    highlightTag: "₱230B Military Pension"
  },
  {
    id: "section-15",
    pageNum: 15,
    navLabel: "Surveillance & CIF Funds",
    shortTitle: "Confidential / Intel",
    fullTitle: "Surveillance, Intelligence & Confidential Funds",
    subtitle: "₱10.77B Executive Plateau: OP Monopolization & COA JC 2015-01 Sealed Opacity",
    primaryMetric: "₱4,500.0 M",
    primaryMetricLabel: "Office of the President CIF Share",
    highlightTag: "₱10.773B Gov-Wide"
  }
];
