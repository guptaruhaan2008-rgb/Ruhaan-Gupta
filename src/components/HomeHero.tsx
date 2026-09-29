import React from 'react';
import { ViewMode } from '../types';
import { 
  BarChart3, 
  Compass, 
  Search, 
  Scale, 
  GraduationCap, 
  Code2, 
  ArrowRight, 
  ShieldCheck, 
  Layers, 
  Database,
  Cpu
} from 'lucide-react';

interface HomeHeroProps {
  onNavigate: (view: ViewMode) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate }) => {
  const cards = [
    {
      id: 'financial_status' as ViewMode,
      icon: BarChart3,
      tag: 'Personal Diagnostic',
      heading: 'MY FINANCIAL STATUS',
      description: 'Analyze income, expenses, savings, debt, insurance and goals to determine your financial health score.',
      btnText: 'Start Analysis',
      borderHover: 'hover:border-emerald-500/60',
      glowColor: 'group-hover:text-emerald-400',
      badgeColor: 'bg-emerald-950/60 text-emerald-400 border-emerald-800/80'
    },
    {
      id: 'find_investment' as ViewMode,
      icon: Compass,
      tag: 'Suitability Matching',
      heading: 'FIND MY INVESTMENT',
      description: 'Explore investment avenues based on a user\'s selected profile, horizon, liquidity needs, and risk tolerance.',
      btnText: 'Discover Avenues',
      borderHover: 'hover:border-cyan-500/60',
      glowColor: 'group-hover:text-cyan-400',
      badgeColor: 'bg-cyan-950/60 text-cyan-400 border-cyan-800/80'
    },
    {
      id: 'research' as ViewMode,
      icon: Search,
      tag: 'Quantitative Dossiers',
      heading: 'INVESTMENT RESEARCH',
      description: 'Research specific financial instruments and companies with balance sheet data, valuation ratios, and scenarios.',
      btnText: 'Launch Research',
      borderHover: 'hover:border-violet-500/60',
      glowColor: 'group-hover:text-violet-400',
      badgeColor: 'bg-violet-950/60 text-violet-400 border-violet-800/80'
    },
    {
      id: 'compare' as ViewMode,
      icon: Scale,
      tag: 'Objective Matrix',
      heading: 'COMPARE INVESTMENTS',
      description: 'Compare two investments across relevant characteristics like risk, liquidity, yield, volatility, and tax status.',
      btnText: 'Run Comparison',
      borderHover: 'hover:border-amber-500/60',
      glowColor: 'group-hover:text-amber-400',
      badgeColor: 'bg-amber-950/60 text-amber-400 border-amber-800/80'
    },
    {
      id: 'knowledge' as ViewMode,
      icon: GraduationCap,
      tag: 'Encyclopedia & Calculators',
      heading: 'FINANCE KNOWLEDGE',
      description: 'Learn important financial and investment concepts including compounding, inflation, and fundamental analysis.',
      btnText: 'Explore Knowledge',
      borderHover: 'hover:border-teal-500/60',
      glowColor: 'group-hover:text-teal-400',
      badgeColor: 'bg-teal-950/60 text-teal-400 border-teal-800/80'
    },
    {
      id: 'source_code' as ViewMode,
      icon: Code2,
      tag: 'Transparent Codebase',
      heading: 'FINVEXA SOURCE CODE',
      description: 'Inspect the actual Python analysis modules, Flask architecture, datasets, and download the full project package.',
      btnText: 'View Source Code',
      borderHover: 'hover:border-sky-500/60',
      glowColor: 'group-hover:text-sky-400',
      badgeColor: 'bg-sky-950/60 text-sky-400 border-sky-800/80'
    }
  ];

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative pt-16 pb-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center">
        {/* Glow backdrop effect */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-slate-800 text-slate-300 text-xs font-semibold mb-8 shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>FINVEXA Financial Intelligence</span>
          <span className="text-slate-600">|</span>
          <span className="text-emerald-400 font-mono">By Ruhaan, Nimish, Raman</span>
        </div>

        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white mb-6 leading-tight sm:leading-none">
          Understand. Analyze.<br />
          <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
            Invest Smarter.
          </span>
        </h1>

        <p className="text-lg sm:text-xl text-slate-300 font-medium max-w-2xl mx-auto mb-4 leading-relaxed">
          “Built at the intersection of finance, data and intelligence.”
        </p>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
          Analyze your financial position, explore investment avenues, research financial instruments, compare opportunities and understand important financial concepts — all in one place.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('financial_status')}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-8 py-3.5 rounded-xl shadow-lg shadow-emerald-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 text-sm"
          >
            <span>Start Financial Analysis</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('research')}
            className="w-full sm:w-auto bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 hover:border-slate-700 font-semibold px-7 py-3.5 rounded-xl transition-all hover:scale-[1.02] active:scale-[0.98] text-sm"
          >
            Explore Investment Research
          </button>
        </div>

        {/* Highlight Stats / Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto pt-8 border-t border-slate-800/60 text-left">
          <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Diagnostic</span>
            </div>
            <div className="text-sm font-bold text-white">8-Pillar Status Health</div>
          </div>
          <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Asset Classes</span>
            </div>
            <div className="text-sm font-bold text-white">10 Avenues Covered</div>
          </div>
          <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Database className="w-3.5 h-3.5 text-violet-400" />
              <span>Research Data</span>
            </div>
            <div className="text-sm font-bold text-white">Curated Datasets</div>
          </div>
          <div className="bg-slate-900/40 p-3.5 rounded-xl border border-slate-800/60">
            <div className="flex items-center gap-2 text-xs text-slate-400 mb-1">
              <Cpu className="w-3.5 h-3.5 text-amber-400" />
              <span>Intelligence</span>
            </div>
            <div className="text-sm font-bold text-white">Python Core Engine</div>
          </div>
        </div>
      </section>

      {/* Feature Cards Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            Integrated Financial Intelligence Suite
          </h2>
          <p className="text-sm text-slate-400 mt-2">
            Engineered to empower beginners and experienced investors alike.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map(card => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                onClick={() => onNavigate(card.id)}
                className={`group relative bg-slate-900/60 backdrop-blur-sm border border-slate-800/90 rounded-2xl p-6 transition-all duration-300 ${card.borderHover} hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-950/60 flex flex-col justify-between cursor-pointer`}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center justify-center text-slate-300 group-hover:scale-110 group-hover:border-slate-600 transition-all">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${card.badgeColor}`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className={`text-lg font-bold text-white mb-2.5 transition-colors ${card.glowColor}`}>
                    {card.heading}
                  </h3>

                  <p className="text-xs text-slate-400 leading-relaxed mb-6">
                    {card.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-semibold">
                  <span className={`flex items-center gap-1.5 transition-colors ${card.glowColor}`}>
                    {card.btnText}
                  </span>
                  <div className="w-7 h-7 rounded-lg bg-slate-800/60 flex items-center justify-center text-slate-400 group-hover:translate-x-1 group-hover:text-white transition-all">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
