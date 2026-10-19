import React from 'react';
import { X, BookOpen } from 'lucide-react';

interface GlossaryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const GlossaryModal: React.FC<GlossaryModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const glossaryTerms = [
    {
      term: "NEP (National Expenditure Program)",
      definition: "The President's proposed national budget submitted annually to Congress pursuant to the Constitution. It represents the Executive branch's baseline spending plan before legislative congressional deliberation."
    },
    {
      term: "GAA (General Appropriations Act)",
      definition: "The enacted law passed by Congress and signed by the President that authorizes the disbursement of public funds from the National Treasury."
    },
    {
      term: "PS (Personnel Services)",
      definition: "Appropriations for salaries, wages, allowances, pensions, hazard pay, and other mandated compensation of government officials and employees (both civilian and military)."
    },
    {
      term: "MOOE (Maintenance & Other Operating Expenses)",
      definition: "Expenditures for goods and services consumed in operational governance, such as supplies, utilities, travel, fuel, repairs, and social welfare cash transfers (AICS, 4Ps subsidies)."
    },
    {
      term: "CO (Capital Outlays)",
      definition: "Appropriations for the creation, construction, or acquisition of physical infrastructure assets (highways, bridges, flood control dikes, school buildings, hospitals, and national defense vessels)."
    },
    {
      term: "NTA (National Tax Allotment)",
      definition: "The constitutionally mandated automatic share of Local Government Units (LGUs) derived from 40% of all national tax collections (BIR internal revenue and BOC customs duties) from three fiscal years prior, expanded under the historic Mandanas-Garcia Supreme Court ruling."
    },
    {
      term: "CCET (Climate Change Expenditure Tagging)",
      definition: "The state accounting taxonomy that classifies government programs as Climate Adaptation or Climate Mitigation. Under heavy public criticism because over 83% of adaptation funds are captured by gray concrete civil works."
    },
    {
      term: "CIF (Confidential & Intelligence Funds)",
      definition: "Lump-sum funds allocated for surveillance and national security activities. Governed by COA-DBM-DILG-GCG-DND Joint Circular 2015-01, which mandates sealed audit envelopes and suppresses public receipts."
    },
    {
      term: "UA (Unprogrammed Appropriations)",
      definition: "Standby expenditure authorities that can only be released upon the realization of excess tax revenue collections or newly approved foreign loan proceeds. Historically criticized as an oversized shadow budget."
    },
    {
      term: "SPF (Special Purpose Funds)",
      definition: "Lump-sum appropriations parked outside regular department line items, including the Pension and Gratuity Fund (PGF), Miscellaneous Personnel Benefits Fund (MPBF), and Calamity Fund (NDRRMF)."
    },
    {
      term: "MTFF (Medium-Term Fiscal Framework)",
      definition: "The government's multi-year macro blueprint targeting fiscal deficit reduction (aiming toward 5.1% in 2027), debt-to-GDP sustainability under 60%, and 6.0% to 7.0% annual real economic growth."
    }
  ];

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-[#0B1120] border border-slate-700 max-w-3xl w-full max-h-[85vh] rounded-2xl flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <BookOpen className="w-5 h-5 text-blue-400" />
            <div>
              <h3 className="text-lg font-bold text-white font-display">
                Philippine Public Finance Glossary
              </h3>
              <p className="text-xs text-slate-400 font-mono-data">
                Key Budget Acronyms, Constitutional Formulas & Legal Terms
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto space-y-4">
          {glossaryTerms.map((item) => (
            <div key={item.term} className="p-4 bg-slate-900/50 border border-slate-800 rounded-xl">
              <h4 className="text-sm font-bold font-mono-data text-blue-400 mb-1">
                {item.term}
              </h4>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans">
                {item.definition}
              </p>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-slate-800 bg-slate-900/80 text-[11px] font-mono-data text-slate-500 text-center shrink-0">
          Compiled from the DBM Budget Operations Manual and the 1987 Philippine Constitution.
        </div>
      </div>
    </div>
  );
};
