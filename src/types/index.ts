export type ViewMode = 
  | 'home'
  | 'financial_status'
  | 'find_investment'
  | 'research'
  | 'compare'
  | 'knowledge'
  | 'source_code';

export interface FinancialProfileInput {
  age: number;
  occupation: string;
  dependents: number;
  expected_major_expenses: string;
  monthly_income: number;
  other_income: number;
  annual_income?: number;
  income_stability: 'High' | 'Stable' | 'Moderate' | 'Variable';
  expected_income_growth: string;
  household_exp: number;
  rent: number;
  emi: number;
  education_exp: number;
  transport_exp: number;
  food_exp: number;
  discretionary_exp: number;
  bank_savings: number;
  cash_savings: number;
  emergency_fund: number;
  monthly_savings: number;
  existing_investments: number;
  total_debt: number;
  interest_rate: number;
  cc_debt: number;
  remaining_loan_duration_months: number;
  health_insurance: boolean;
  life_insurance: boolean;
  other_insurance: boolean;
  coverage_amount: number;
  goals: string[];
  is_demo?: boolean;
  scenario_label?: string;
}

export interface FinancialStatusResult {
  total_monthly_income: number;
  total_monthly_expenses: number;
  monthly_surplus: number;
  savings_rate_pct: number;
  debt_to_income_pct: number;
  emergency_months: number;
  insurance_multiple: number;
  purchasing_power_loss_pct: number;
  overall_classification: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION';
  overall_badge_class: string;
  cards: {
    income: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
    savings: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
    debt: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
    emergency: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
    insurance: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
    inflation: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
    diversification: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
    goals: { status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION'; detail: string };
  };
  strengths: string[];
  areas_needing_attention: string[];
  final_explanation: string;
}

export interface InvestorProfileInput {
  age: number;
  monthly_income: number;
  monthly_expenses: number;
  savings: number;
  amount_to_invest: number;
  existing_investments: number;
  debt: number;
  dependents: number;
  risk_tolerance: 'Low' | 'Moderate' | 'High';
  duration: 'Less than 1 year' | '1–3 years' | '3–5 years' | '5–10 years' | '10+ years';
  financial_goal: string;
  liquidity_requirement: 'High' | 'Moderate' | 'Low';
  investment_experience: 'Beginner' | 'Intermediate' | 'Experienced';
  loss_tolerance: string;
  investment_preferences: string;
  is_demo?: boolean;
  scenario_label?: string;
}

export interface InvestmentAvenueMatch {
  id: string;
  name: string;
  category: string;
  risk_level: string;
  ideal_horizon: string;
  min_horizon_years: number;
  liquidity: string;
  historical_return_range: string;
  summary: string;
  suitable_for: string[];
  compatibility_score: number;
  compatibility_status: string;
  tag_class: string;
  fit_level: string;
  rationale: string;
}

export interface StockData {
  symbol: string;
  name: string;
  industry: string;
  market_cap_category: string;
  market_cap_cr: number;
  current_price: number;
  high_52w: number;
  low_52w: number;
  pe_ratio: number;
  pb_ratio: number;
  roe_pct: number;
  roce_pct: number;
  debt_to_equity: number;
  profit_margin_pct: number;
  dividend_yield_pct: number;
  revenue_cr: number;
  operating_profit_cr: number;
  net_profit_cr: number;
  eps: number;
  debt_cr: number;
  free_cash_flow_cr: number;
  description: string;
  market_position: string;
  growth_factors: string;
  major_risks: string;
}

export interface BondData {
  bond_id: string;
  name: string;
  issuer: string;
  bond_type: string;
  credit_rating: string;
  coupon_rate_pct: number;
  current_yield_pct: number;
  maturity_date: string;
  face_value: number;
  min_investment: number;
  duration_years: number;
  interest_payout_frequency: string;
  liquidity_rating: string;
  advantages: string;
  risks: string;
}

export interface MutualFundData {
  fund_id: string;
  name: string;
  category: string;
  fund_house: string;
  nav: number;
  aum_cr: number;
  expense_ratio_pct: number;
  return_1y_pct: number;
  return_3y_pct: number;
  return_5y_pct: number;
  benchmark: string;
  risk_grade: string;
  manager: string;
  top_holdings: string;
  equity_pct: number;
  debt_pct: number;
  cash_pct: number;
}

export interface GoldData {
  instrument_id: string;
  instrument_type: string;
  product_name: string;
  provider_or_authority: string;
  current_price_per_10g: number;
  historical_cagr_5y: number;
  storage_or_making_cost: string;
  purity: string;
  tax_treatment: string;
  liquidity: string;
  advantages: string;
  risks: string;
}

export interface FDData {
  fd_id: string;
  institution: string;
  institution_type: string;
  rate_general_1y_pct: number;
  rate_general_3y_pct: number;
  rate_general_5y_pct: number;
  senior_citizen_bonus_pct: number;
  compounding_freq: string;
  dicgc_insured: string;
  premature_withdrawal_penalty: string;
  inflation_real_return_est: string;
  key_features: string;
}
