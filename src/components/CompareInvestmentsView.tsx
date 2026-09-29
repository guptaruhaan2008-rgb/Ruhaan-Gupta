import React, { useState, useMemo } from 'react';
import { COMPARISON_CATALOG, compareInvestments } from '../services/comparisonEngine';
import { generateRandomComparisonPair } from '../services/autoFillService';
import { 
  Sparkles, 
  Scale, 
  ArrowLeftRight, 
  ShieldCheck, 
  AlertTriangle, 
  Info,
  CheckCircle2,
  TrendingUp,
  Percent
} from 'lucide-react';

export const CompareInvestmentsView: React.FC = () => {
  const [selectedA, setSelectedA] = useState<string>('gold');
  const [selectedB, setSelectedB] = useState<string>('fds');
  const [isDemoComparison, setIsDemoComparison] = useState(false);

  const comparison = useMemo(() => {
    return compareInvestments(selectedA, selectedB);
  }, [selectedA, selectedB]);

  const handleAutoFill = () => {
    const pair = generateRandomComparisonPair();
    setSelectedA(pair.idA);
    setSelectedB(pair.idB);
    setIsDemoComparison(true);
  };

  const catalogOptions = Object.values(COMPARISON_CATALOG);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-amber-950/60 border border-amber-800 text-amber-400 text-xs font-semibold mb-2">
            <span>Feature 4: Objective Comparative Analysis</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Compare Investments</h1>
          <p className="text-sm text-slate-400 mt-1">
            Evaluate two financial instruments side-by-side across risk, yield, liquidity, and tax treatment.
          </p>
        </div>

        {/* Auto-fill Button */}
        <div className="flex items-center gap-3">
          {isDemoComparison && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/80 text-amber-300 text-xs font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fictional Demo Comparison</span>
            </span>
          )}
          <button
            onClick={handleAutoFill}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-amber-950/50 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>✨ AUTO-FILL COMPARISON</span>
          </button>
        </div>
      </div>

      {/* Selectors Bar */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              Primary Instrument (Asset A)
            </label>
            <select
              value={selectedA}
              onChange={e => {
                setSelectedA(e.target.value);
                setIsDemoComparison(false);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-medium focus:border-emerald-500"
            >
              {catalogOptions.map(opt => (
                <option key={opt.id} value={opt.id} disabled={opt.id === selectedB}>
                  {opt.name} ({opt.category})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-cyan-400 mb-2">
              Comparative Instrument (Asset B)
            </label>
            <select
              value={selectedB}
              onChange={e => {
                setSelectedB(e.target.value);
                setIsDemoComparison(false);
              }}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-white font-medium focus:border-cyan-500"
            >
              {catalogOptions.map(opt => (
                <option key={opt.id} value={opt.id} disabled={opt.id === selectedA}>
                  {opt.name} ({opt.category})
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Side-by-Side Comparison Matrix Table */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
        <div className="grid grid-cols-12 bg-slate-900 p-4 border-b border-slate-800 text-xs font-bold uppercase tracking-wider text-slate-400">
          <div className="col-span-4 sm:col-span-3">Dimension</div>
          <div className="col-span-4 sm:col-span-4 text-emerald-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span>{comparison.itemA.name}</span>
          </div>
          <div className="col-span-4 sm:col-span-5 text-cyan-400 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
            <span>{comparison.itemB.name}</span>
          </div>
        </div>

        <div className="divide-y divide-slate-800/60 text-xs">
          {comparison.dimensions.map((row, idx) => (
            <div key={idx} className="grid grid-cols-12 p-4 hover:bg-slate-900/40 transition-colors items-center gap-2">
              <div className="col-span-4 sm:col-span-3">
                <span className="font-bold text-white block">{row.dimension}</span>
                <span className="text-[10px] text-slate-500 hidden sm:block">{row.note}</span>
              </div>
              <div className="col-span-4 sm:col-span-4 text-slate-300 font-medium leading-relaxed pr-2">
                {row.a}
              </div>
              <div className="col-span-4 sm:col-span-5 text-slate-300 font-medium leading-relaxed">
                {row.b}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Key Differences Section (DO NOT DECLARE A WINNER) */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
          <Scale className="w-5 h-5 text-amber-400" />
          <h2 className="text-base font-bold text-white uppercase tracking-wider">
            KEY DIFFERENCES & TRADE-OFFS
          </h2>
        </div>

        <ul className="space-y-3 text-xs text-slate-300 leading-relaxed">
          {comparison.keyDifferences.map((diff, idx) => (
            <li key={idx} className="flex items-start gap-2.5 bg-slate-950/60 p-3.5 rounded-xl border border-slate-800/80">
              <span className="text-emerald-400 font-bold mt-0.5">•</span>
              <span>{diff}</span>
            </li>
          ))}
        </ul>

        {/* Mandatory Neutral Disclaimer */}
        <div className="pt-4 border-t border-slate-800/80 flex items-start gap-2 text-xs text-slate-500 italic">
          <Info className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
          <span>{comparison.disclaimer}</span>
        </div>
      </div>
    </div>
  );
};
