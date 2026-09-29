import React, { useState, useMemo } from 'react';
import { FinancialProfileInput } from '../types';
import { calculateFinancialStatus } from '../services/financialStatusEngine';
import { generateRandomFinancialProfile } from '../services/autoFillService';
import { 
  Sparkles, 
  CheckCircle2, 
  AlertTriangle, 
  HelpCircle, 
  ShieldCheck, 
  TrendingUp, 
  Wallet, 
  PieChart as PieIcon, 
  Activity,
  ArrowUpRight,
  Info
} from 'lucide-react';

const INITIAL_PROFILE: FinancialProfileInput = {
  age: 29,
  occupation: 'Software Engineer',
  dependents: 1,
  expected_major_expenses: 'Home purchase in 3 years',
  monthly_income: 85000,
  other_income: 10000,
  income_stability: 'Stable',
  expected_income_growth: '10% annually',
  household_exp: 20000,
  rent: 18000,
  emi: 8000,
  education_exp: 5000,
  transport_exp: 4000,
  food_exp: 9000,
  discretionary_exp: 5000,
  bank_savings: 140000,
  cash_savings: 15000,
  emergency_fund: 160000,
  monthly_savings: 26000,
  existing_investments: 320000,
  total_debt: 280000,
  interest_rate: 8.5,
  cc_debt: 0,
  remaining_loan_duration_months: 36,
  health_insurance: true,
  life_insurance: true,
  other_insurance: false,
  coverage_amount: 10000000,
  goals: ['Emergency fund', 'Wealth creation', 'House']
};

export const FinancialStatusView: React.FC = () => {
  const [profile, setProfile] = useState<FinancialProfileInput>(INITIAL_PROFILE);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const result = useMemo(() => {
    return calculateFinancialStatus(profile);
  }, [profile]);

  const handleInputChange = (field: keyof FinancialProfileInput, value: any) => {
    // Basic validation
    if (typeof value === 'number' && value < 0) {
      setErrors(prev => ({ ...prev, [field]: 'Must be a non-negative value' }));
      return;
    }
    setErrors(prev => {
      const copy = { ...prev };
      delete copy[field];
      return copy;
    });

    setProfile(prev => ({
      ...prev,
      [field]: value,
      is_demo: false // clear demo tag if manually modified
    }));
  };

  const handleAutoFill = () => {
    const newDemo = generateRandomFinancialProfile();
    setErrors({});
    setProfile(newDemo);
  };

  const toggleGoal = (goal: string) => {
    const current = profile.goals || [];
    if (current.includes(goal)) {
      setProfile(prev => ({ ...prev, goals: current.filter(g => g !== goal) }));
    } else {
      setProfile(prev => ({ ...prev, goals: [...current, goal] }));
    }
  };

  const goalOptions = [
    'Education', 'House', 'Vehicle', 'Retirement', 'Emergency fund', 'Wealth creation', 'Other'
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-emerald-950/60 border border-emerald-800 text-emerald-400 text-xs font-semibold mb-2">
            <span>Feature 1: Diagnostic Health Audit</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">My Financial Status</h1>
          <p className="text-sm text-slate-400 mt-1">
            Analyze income, expenses, savings, debt, insurance, and milestones to generate your diagnostic rating.
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
            <span>✨ AUTO-FILL FINANCIAL PROFILE</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Form Inputs vs Diagnostics Output */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Structured Form Inputs (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 space-y-6 shadow-xl">
            <h2 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
              <Wallet className="w-4 h-4 text-emerald-400" />
              <span>Personal & Financial Data</span>
            </h2>

            {/* 1. Personal Information */}
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">1. Personal Information</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="18"
                    max="100"
                    value={profile.age}
                    onChange={e => handleInputChange('age', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-white"
                  />
                  {errors.age && <p className="text-[10px] text-rose-400 mt-0.5">{errors.age}</p>}
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Occupation / Status</label>
                  <input
                    type="text"
                    value={profile.occupation}
                    onChange={e => handleInputChange('occupation', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Dependents</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.dependents}
                    onChange={e => handleInputChange('dependents', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Major Future Outlay</label>
                  <input
                    type="text"
                    value={profile.expected_major_expenses}
                    onChange={e => handleInputChange('expected_major_expenses', e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-white"
                  />
                </div>
              </div>
            </div>

            {/* 2. Income */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">2. Income Breakdown</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Monthly Inflow (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={profile.monthly_income}
                    onChange={e => handleInputChange('monthly_income', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Other / Freelance (₹)</label>
                  <input
                    type="number"
                    min="0"
                    step="1000"
                    value={profile.other_income}
                    onChange={e => handleInputChange('other_income', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-white"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-slate-400 mb-1">Income Stability</label>
                  <select
                    value={profile.income_stability}
                    onChange={e => handleInputChange('income_stability', e.target.value as any)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-emerald-500 rounded-lg p-2.5 text-white"
                  >
                    <option value="High">High Stability (Govt / Tenured MNC)</option>
                    <option value="Stable">Stable (Corporate Salaried)</option>
                    <option value="Moderate">Moderate (Growth Firm / Tech)</option>
                    <option value="Variable">Variable (Commission / Business)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* 3. Monthly Expenses */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">3. Monthly Outflows</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Household (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.household_exp}
                    onChange={e => handleInputChange('household_exp', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Rent / Housing (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.rent}
                    onChange={e => handleInputChange('rent', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Debt EMIs (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.emi}
                    onChange={e => handleInputChange('emi', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Food & Groceries (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.food_exp}
                    onChange={e => handleInputChange('food_exp', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Transport (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.transport_exp}
                    onChange={e => handleInputChange('transport_exp', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Discretionary (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.discretionary_exp}
                    onChange={e => handleInputChange('discretionary_exp', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>
            </div>

            {/* 4. Savings, Debt & Insurance */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">4. Reserves, Debt & Insurance</span>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 mb-1">Bank Savings (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.bank_savings}
                    onChange={e => handleInputChange('bank_savings', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Emergency Fund (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.emergency_fund}
                    onChange={e => handleInputChange('emergency_fund', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Existing Assets (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.existing_investments}
                    onChange={e => handleInputChange('existing_investments', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Total Loan Balance (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.total_debt}
                    onChange={e => handleInputChange('total_debt', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Credit Card Balance (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.cc_debt}
                    onChange={e => handleInputChange('cc_debt', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 mb-1">Insurance Cover (₹)</label>
                  <input
                    type="number"
                    min="0"
                    value={profile.coverage_amount}
                    onChange={e => handleInputChange('coverage_amount', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-white"
                  />
                </div>
              </div>

              <div className="flex gap-4 pt-2 text-xs text-slate-300">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.health_insurance}
                    onChange={e => handleInputChange('health_insurance', e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Health Insurance</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.life_insurance}
                    onChange={e => handleInputChange('life_insurance', e.target.checked)}
                    className="rounded bg-slate-950 border-slate-800 text-emerald-500 focus:ring-emerald-500"
                  />
                  <span>Life Insurance</span>
                </label>
              </div>
            </div>

            {/* 5. Financial Goals Selection */}
            <div className="space-y-3 pt-2 border-t border-slate-800/80">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">5. Target Financial Goals</span>
              <div className="flex flex-wrap gap-2 text-xs">
                {goalOptions.map(goal => {
                  const isSelected = profile.goals?.includes(goal);
                  return (
                    <button
                      key={goal}
                      type="button"
                      onClick={() => toggleGoal(goal)}
                      className={`px-2.5 py-1 rounded-lg border transition-all ${
                        isSelected
                          ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50 font-semibold'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-slate-300'
                      }`}
                    >
                      {goal}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Diagnostic Dashboard & 8 Health Cards (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Main Health Diagnostic Banner */}
          <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800/80 rounded-2xl p-6 shadow-xl relative overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
              <div>
                <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">Diagnostic Solvency Rating</span>
                <div className="text-2xl font-black text-white mt-1 flex items-center gap-2">
                  <span>Overall Financial Health:</span>
                  <span className={`px-3 py-1 rounded-xl text-sm font-extrabold border ${result.overall_badge_class}`}>
                    {result.overall_classification}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 bg-slate-950/70 p-3 rounded-xl border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 text-[11px]">Monthly Surplus</div>
                  <div className={`text-base font-bold ${result.monthly_surplus >= 0 ? 'text-emerald-400' : 'text-rose-400'}`}>
                    ₹{result.monthly_surplus.toLocaleString('en-IN')}
                  </div>
                </div>
                <div className="w-px h-8 bg-slate-800" />
                <div>
                  <div className="text-slate-400 text-[11px]">Savings Rate</div>
                  <div className="text-base font-bold text-cyan-400">{result.savings_rate_pct}%</div>
                </div>
              </div>
            </div>

            {/* Beginner Explanation */}
            <div className="mt-5 bg-slate-950/50 border border-slate-800/80 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
                <Info className="w-4 h-4 text-emerald-400" />
                <span>FINAL SIMPLE EXPLANATION</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {result.final_explanation}
              </p>
            </div>
          </div>

          {/* 8 Specific Health Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {Object.entries(result.cards).map(([key, card]) => {
              const statusColor = 
                card.status === 'HEALTHY' ? 'text-emerald-400 bg-emerald-950/30 border-emerald-800/60' :
                card.status === 'MODERATE' ? 'text-amber-400 bg-amber-950/30 border-amber-800/60' :
                'text-rose-400 bg-rose-950/30 border-rose-800/60';

              const titleMap: Record<string, string> = {
                income: 'Income Health',
                savings: 'Savings Health',
                debt: 'Debt Health',
                emergency: 'Emergency Fund',
                insurance: 'Insurance Protection',
                inflation: 'Inflation Impact',
                diversification: 'Investment Diversification',
                goals: 'Goal Readiness'
              };

              return (
                <div key={key} className="bg-slate-900/60 border border-slate-800/90 rounded-xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-white">{titleMap[key] || key}</span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${statusColor}`}>
                        {card.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {card.detail}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Strengths & Areas Needing Attention */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>IDENTIFIED STRENGTHS</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {result.strengths.map((str, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-emerald-400 shrink-0">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-5 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>AREAS NEEDING ATTENTION</span>
              </h3>
              <ul className="space-y-2 text-xs text-slate-300">
                {result.areas_needing_attention.map((area, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-rose-400 shrink-0">•</span>
                    <span>{area}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
