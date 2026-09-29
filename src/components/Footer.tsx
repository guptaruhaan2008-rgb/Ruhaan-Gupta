import React from 'react';
import { TrendingUp, ShieldAlert, Sparkles, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800/80 pt-14 pb-10 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center font-black text-slate-950 text-lg">
                <TrendingUp className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-xl font-extrabold tracking-tight text-white">FINVEXA</span>
            </div>
            <p className="text-base text-slate-200 font-medium">
              “Understand. Analyze. Invest Smarter.”
            </p>
            <p className="text-sm text-slate-400 max-w-md">
              “Built at the intersection of finance, data and intelligence.”
            </p>
            <div className="flex items-center gap-2 pt-2 text-xs font-mono text-emerald-400">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Created by Ruhaan. Nimish. Raman</span>
            </div>
          </div>

          {/* Col 2: Platform Pillars */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Analytical Modules</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">1. My Financial Status</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">2. Find My Investment</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">3. Investment Research</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">4. Compare Investments</li>
              <li className="hover:text-emerald-400 cursor-pointer transition-colors">5. Finance Knowledge</li>
            </ul>
          </div>

          {/* Col 3: Research Datasets */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">Data Coverage</h4>
            <ul className="text-xs space-y-2 text-slate-400">
              <li>Equities (Large, Mid & Small Cap)</li>
              <li>Sovereign G-Secs & Corporate Bonds</li>
              <li>Gold (SGB, ETFs & Bullion)</li>
              <li>Mutual Funds & Index ETFs</li>
              <li>Commercial REITs & Government PPF/NPS</li>
            </ul>
          </div>
        </div>

        {/* Legal & Educational Financial Disclaimer */}
        <div className="border-t border-slate-900 pt-8 space-y-4">
          <div className="bg-slate-900/50 border border-slate-800/80 rounded-xl p-4 flex items-start gap-3 text-xs leading-relaxed text-slate-400">
            <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-slate-300">Mandatory Financial Disclaimer: </span>
              “FINVEXA is an educational financial analysis and research platform. Its outputs are based on the information and datasets provided and should not be treated as guaranteed investment advice or a promise of future returns. Users should independently verify information and consider qualified professional advice where appropriate.”
              <div className="font-semibold text-amber-400/90 mt-1">
                “Past performance does not guarantee future results.”
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4 pt-2">
            <div>
              © {new Date().getFullYear()} FINVEXA. All rights reserved. Educational financial analysis platform.
            </div>
            <div className="flex items-center gap-1 text-slate-400">
              Engineered with precision by <span className="text-emerald-400 font-medium">Ruhaan. Nimish. Raman</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
