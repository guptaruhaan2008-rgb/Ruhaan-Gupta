import React, { useState, useMemo } from 'react';
import { InvestorProfileInput, InvestmentAvenueMatch, ViewMode } from '../types';
import { matchInvestments } from '../services/investmentFinderEngine';
import { generateRandomInvestorProfile } from '../services/autoFillService';
import { STOCKS_DATA, BONDS_DATA, MUTUAL_FUNDS_DATA, GOLD_DATA } from '../data/mockData';
import { 
  Sparkles, 
  Compass, 
  Filter, 
  ChevronRight, 
  Sliders, 
  Layers, 
  ArrowRight, 
  X,
  CheckCircle2,
  TrendingUp,
  AlertCircle
} from 'lucide-react';

interface FindInvestmentViewProps {
  onNavigateToResearch: (symbolOrId: string) => void;
}

const INITIAL_INVESTOR_PROFILE: InvestorProfileInput = {
  age: 30,
  monthly_income: 90000,
  monthly_expenses: 45000,
  savings: 300000,
  amount_to_invest: 150000,
  existing_investments: 200000,
  debt: 180000,
  dependents: 1,
  risk_tolerance: 'Moderate',
  duration: '3–5 years',
  financial_goal: 'Long-term growth',
  liquidity_requirement: 'Moderate',
  investment_experience: 'Intermediate',
  loss_tolerance: 'Moderate (Can tolerate 10-15% dips)',
  investment_preferences: 'Growth'
};

export const FindInvestmentView: React.FC<FindInvestmentViewProps> = ({ onNavigateToResearch }) => {
  const [profile, setProfile] = useState<InvestorProfileInput>(INITIAL_INVESTOR_PROFILE);
  const [drillDownAvenue, setDrillDownAvenue] = useState<string | null>(null);

  // Drill-down specific filters
  const [stockCapFilter, setStockCapFilter] = useState('All');
  const [mfCategoryFilter, setMfCategoryFilter] = useState('All');
  const [goldTypeFilter, setGoldTypeFilter] = useState('All');

  const matches = useMemo(() => {
    return matchInvestments(profile);
  }, [profile]);

  const handleAutoFill = () => {
    const newDemo = generateRandomInvestorProfile();
    setProfile(newDemo);
  };

  const handleInputChange = (field: keyof InvestorProfileInput, value: any) => {
    setProfile(prev => ({
      ...prev,
      [field]: value,
      is_demo: false
    }));
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800 text-cyan-400 text-xs font-semibold mb-2">
            <span>Feature 2: Multi-Factor Discovery & Drill-Down</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Find My Investment</h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyze your investment criteria across 10 asset classes to discover potentially compatible avenues.
          </p>
        </div>

        {/* Auto-fill Button */}
        <div className="flex items-center gap-3">
          {profile.is_demo && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/80 text-amber-300 text-xs font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fictional Demo Scenario</span>
            </span>
          )}
          <button
            onClick={handleAutoFill}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-amber-950/50 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>✨ AUTO-FILL INVESTOR PROFILE</span>
          </button>
        </div>
      </div>

      {/* Profile Parameters Control Bar */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-300">
            <Sliders className="w-4 h-4 text-cyan-400" />
            <span>Investor Profile Configuration</span>
          </div>
          <span className="text-[11px] text-slate-400">
            Capital to Deploy: <strong className="text-emerald-400">₹{profile.amount_to_invest.toLocaleString('en-IN')}</strong>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div>
            <label className="block text-slate-400 mb-1">Risk Tolerance</label>
            <select
              value={profile.risk_tolerance}
              onChange={e => handleInputChange('risk_tolerance', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500"
            >
              <option value="Low">Low (Safety First)</option>
              <option value="Moderate">Moderate (Balanced Growth)</option>
              <option value="High">High (Maximum Compounding)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Investment Duration</label>
            <select
              value={profile.duration}
              onChange={e => handleInputChange('duration', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500"
            >
              <option value="Less than 1 year">Less than 1 year (Ultra Short)</option>
              <option value="1–3 years">1–3 years (Short Term)</option>
              <option value="3–5 years">3–5 years (Medium Term)</option>
              <option value="5–10 years">5–10 years (Long Term)</option>
              <option value="10+ years">10+ years (Generational)</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Financial Goal</label>
            <select
              value={profile.financial_goal}
              onChange={e => handleInputChange('financial_goal', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500"
            >
              <option value="Capital stability">Capital stability</option>
              <option value="Regular income">Regular income</option>
              <option value="Long-term growth">Long-term growth</option>
              <option value="Inflation protection">Inflation protection</option>
              <option value="Wealth creation">Wealth creation</option>
              <option value="Diversification">Diversification</option>
            </select>
          </div>

          <div>
            <label className="block text-slate-400 mb-1">Liquidity Requirement</label>
            <select
              value={profile.liquidity_requirement}
              onChange={e => handleInputChange('liquidity_requirement', e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-white focus:border-cyan-500"
            >
              <option value="High">High (Immediate T+1 Access)</option>
              <option value="Moderate">Moderate (Flexible exit)</option>
              <option value="Low">Low (Can lock in for years)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 10 Avenues Compatibility Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <Compass className="w-5 h-5 text-cyan-400" />
            <span>Matched Avenues Ranked by Compatibility</span>
          </h2>
          <span className="text-xs text-slate-500">10 Asset Classes Analyzed</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {matches.map(item => (
            <div
              key={item.id}
              className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider">{item.category}</span>
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${item.tag_class}`}>
                    {item.compatibility_score}% Compatibility
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-cyan-400 transition-colors">
                  {item.name}
                </h3>

                <p className="text-xs text-slate-400 leading-relaxed mb-4">
                  {item.summary}
                </p>

                <div className="bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 space-y-1.5 text-xs mb-4">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Risk Profile:</span>
                    <span className="text-slate-300 font-medium">{item.risk_level}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Ideal Horizon:</span>
                    <span className="text-slate-300 font-medium">{item.ideal_horizon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Hist. Returns:</span>
                    <span className="text-emerald-400 font-semibold">{item.historical_return_range}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800/80 space-y-3">
                <div className="text-[11px] text-slate-400 italic flex items-start gap-1.5">
                  <AlertCircle className="w-3.5 h-3.5 text-slate-500 shrink-0 mt-0.5" />
                  <span>{item.compatibility_status}</span>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setDrillDownAvenue(item.id)}
                    className="w-full bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Drill-Down</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => onNavigateToResearch(item.id === 'shares' ? 'RELIANCE' : item.id === 'bonds' ? 'BOND001' : item.id === 'mutual_funds' ? 'MF001' : 'gold')}
                    className="w-full bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-semibold py-2 rounded-xl text-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>Research</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Drill-Down Modal / Section */}
      {drillDownAvenue && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full p-6 max-h-[90vh] overflow-y-auto space-y-6 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-400 font-bold">
                  ↓
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white capitalize">
                    {drillDownAvenue.replace('_', ' ')} — Drill-Down Exploration
                  </h3>
                  <p className="text-xs text-slate-400">
                    Specific instruments and categories available in the FINVEXA research repository.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setDrillDownAvenue(null)}
                className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drill down for SHARES */}
            {drillDownAvenue === 'shares' && (
              <div className="space-y-4">
                <div className="flex gap-2">
                  {['All', 'Large Cap', 'Mid Cap', 'Small Cap'].map(cap => (
                    <button
                      key={cap}
                      onClick={() => setStockCapFilter(cap)}
                      className={`px-3 py-1 rounded-lg text-xs font-semibold border ${
                        stockCapFilter === cap
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500'
                          : 'bg-slate-950 border-slate-800 text-slate-400'
                      }`}
                    >
                      {cap}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {STOCKS_DATA
                    .filter(s => stockCapFilter === 'All' || s.market_cap_category === stockCapFilter)
                    .map(stock => (
                      <div key={stock.symbol} className="bg-slate-950 p-4 rounded-xl border border-slate-800 flex justify-between items-center">
                        <div>
                          <div className="text-sm font-bold text-white">{stock.name}</div>
                          <div className="text-xs text-slate-500">{stock.industry} • P/E: {stock.pe_ratio}</div>
                          <div className="text-sm font-bold text-emerald-400 mt-1">₹{stock.current_price.toLocaleString('en-IN')}</div>
                        </div>
                        <button
                          onClick={() => {
                            setDrillDownAvenue(null);
                            onNavigateToResearch(stock.symbol);
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-3 py-1.5 rounded-lg text-xs font-bold"
                        >
                          Analyze Stock →
                        </button>
                      </div>
                    ))}
                </div>
              </div>
            )}

            {/* Drill down for GOLD */}
            {drillDownAvenue === 'gold' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {GOLD_DATA.map(gold => (
                  <div key={gold.instrument_id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="flex justify-between items-start">
                      <div className="text-sm font-bold text-white">{gold.product_name}</div>
                      <span className="text-[10px] px-2 py-0.5 rounded bg-amber-950/60 text-amber-400 border border-amber-800">
                        {gold.instrument_type}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">{gold.advantages}</p>
                    <div className="text-xs text-slate-500 pt-2 border-t border-slate-900 flex justify-between">
                      <span>Liquidity: {gold.liquidity}</span>
                      <span className="text-emerald-400 font-semibold">{gold.historical_cagr_5y}% 5Y CAGR</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Drill down for BONDS */}
            {drillDownAvenue === 'bonds' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BONDS_DATA.map(bond => (
                  <div key={bond.bond_id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-sm font-bold text-white">{bond.name}</div>
                    <div className="text-xs text-slate-400">{bond.issuer} • Rating: {bond.credit_rating}</div>
                    <div className="flex justify-between text-xs pt-2">
                      <span className="text-slate-400">Coupon: {bond.coupon_rate_pct}%</span>
                      <span className="text-cyan-400 font-bold">Yield: {bond.current_yield_pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Drill down for MUTUAL FUNDS */}
            {drillDownAvenue === 'mutual_funds' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {MUTUAL_FUNDS_DATA.map(mf => (
                  <div key={mf.fund_id} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                    <div className="text-sm font-bold text-white">{mf.name}</div>
                    <div className="text-xs text-slate-400">{mf.category} • {mf.fund_house}</div>
                    <div className="flex justify-between text-xs pt-2">
                      <span className="text-slate-400">Exp Ratio: {mf.expense_ratio_pct}%</span>
                      <span className="text-emerald-400 font-bold">5Y CAGR: {mf.return_5y_pct}%</span>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Generic fallback for other avenues */}
            {!['shares', 'gold', 'bonds', 'mutual_funds'].includes(drillDownAvenue) && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 text-center space-y-2">
                <div className="text-base font-bold text-white capitalize">{drillDownAvenue.replace('_', ' ')} Instruments</div>
                <p className="text-xs text-slate-400">
                  Detailed instruments for this asset class are indexed in our comparative engine.
                </p>
                <button
                  onClick={() => {
                    setDrillDownAvenue(null);
                    onNavigateToResearch(drillDownAvenue);
                  }}
                  className="mt-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs"
                >
                  Open Research View →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
