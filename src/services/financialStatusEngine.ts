import { FinancialProfileInput, FinancialStatusResult } from '../types';

export function calculateFinancialStatus(input: FinancialProfileInput): FinancialStatusResult {
  const age = Math.max(18, Number(input.age) || 28);
  const monthly_income = Math.max(0, Number(input.monthly_income) || 0);
  const other_income = Math.max(0, Number(input.other_income) || 0);
  const total_monthly_income = monthly_income + other_income;
  const annual_income = total_monthly_income * 12;

  const household_exp = Math.max(0, Number(input.household_exp) || 0);
  const rent = Math.max(0, Number(input.rent) || 0);
  const emi = Math.max(0, Number(input.emi) || 0);
  const education_exp = Math.max(0, Number(input.education_exp) || 0);
  const transport_exp = Math.max(0, Number(input.transport_exp) || 0);
  const food_exp = Math.max(0, Number(input.food_exp) || 0);
  const discretionary_exp = Math.max(0, Number(input.discretionary_exp) || 0);

  const total_monthly_expenses =
    household_exp + rent + emi + education_exp + transport_exp + food_exp + discretionary_exp;

  const bank_savings = Math.max(0, Number(input.bank_savings) || 0);
  const cash_savings = Math.max(0, Number(input.cash_savings) || 0);
  const emergency_fund = Math.max(0, Number(input.emergency_fund) || 0);
  const existing_investments = Math.max(0, Number(input.existing_investments) || 0);
  const total_liquid_reserves = bank_savings + cash_savings + emergency_fund;

  const total_debt = Math.max(0, Number(input.total_debt) || 0);
  const cc_debt = Math.max(0, Number(input.cc_debt) || 0);

  const coverage_amount = Math.max(0, Number(input.coverage_amount) || 0);
  const has_health = Boolean(input.health_insurance);
  const has_life = Boolean(input.life_insurance);
  const dependents = Math.max(0, Number(input.dependents) || 0);
  const income_stability = input.income_stability || 'Stable';
  const goals = input.goals || [];

  const monthly_surplus = total_monthly_income - total_monthly_expenses;
  const savings_rate_pct = total_monthly_income > 0 ? (monthly_surplus / total_monthly_income) * 100 : 0;
  const debt_to_income_pct = total_monthly_income > 0 ? (emi / total_monthly_income) * 100 : 0;
  const emergency_months = total_monthly_expenses > 0 ? total_liquid_reserves / total_monthly_expenses : 0;
  const insurance_multiple = annual_income > 0 ? coverage_amount / annual_income : 0;

  const inflation_rate = 0.06;
  const purchasing_power_loss_pct = Number(((1 - 1 / Math.pow(1 + inflation_rate, 10)) * 100).toFixed(1));

  // 1. Income Health
  let income_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let income_detail = `Steady monthly cash flow of ₹${total_monthly_income.toLocaleString('en-IN')} with ${income_stability.toLowerCase()} stability.`;
  if (total_monthly_income <= 0) {
    income_status = 'NEEDS ATTENTION';
    income_detail = 'No monthly income reported. Financial solvency depends on immediate cash generation.';
  } else if (income_stability === 'Variable' || monthly_surplus < 0) {
    income_status = 'MODERATE';
    income_detail = `Monthly inflow of ₹${total_monthly_income.toLocaleString('en-IN')} with variable stability or tight margins.`;
  }

  // 2. Savings Health
  let savings_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let savings_detail = `Strong savings rate of ${savings_rate_pct.toFixed(1)}%, surpassing the 20% benchmark standard.`;
  if (savings_rate_pct < 10) {
    savings_status = 'NEEDS ATTENTION';
    savings_detail = `Low savings rate (${savings_rate_pct.toFixed(1)}%). Cash reserves are vulnerable to minor expense spikes.`;
  } else if (savings_rate_pct < 20) {
    savings_status = 'MODERATE';
    savings_detail = `Acceptable savings rate of ${savings_rate_pct.toFixed(1)}%. Strive to optimize expenses to reach 20%+.`;
  }

  // 3. Debt Health
  let debt_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let debt_detail = total_debt === 0 && emi === 0
    ? 'Debt-free position. 100% of income is preserved for living expenses, liquidity, and compounding.'
    : `Manageable debt burden of ${debt_to_income_pct.toFixed(1)}% of income with zero revolving credit balances.`;
  if (debt_to_income_pct > 40 || cc_debt > 25000) {
    debt_status = 'NEEDS ATTENTION';
    debt_detail = `High debt servicing commitment (${debt_to_income_pct.toFixed(1)}%). High-interest balances require aggressive payoff.`;
  } else if (debt_to_income_pct > 25 || cc_debt > 0) {
    debt_status = 'MODERATE';
    debt_detail = `Moderate debt level (${debt_to_income_pct.toFixed(1)}% EMI-to-income). Avoid incremental borrowing obligations.`;
  }

  // 4. Emergency Fund
  let emergency_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let emergency_detail = `Solid safety net of ${emergency_months.toFixed(1)} months of essential living costs held in liquid accounts.`;
  if (emergency_months < 3) {
    emergency_status = 'NEEDS ATTENTION';
    emergency_detail = `Critical risk: current reserves cover only ${emergency_months.toFixed(1)} months (recommended minimum is 6 months).`;
  } else if (emergency_months < 6) {
    emergency_status = 'MODERATE';
    emergency_detail = `Fair liquidity covering ${emergency_months.toFixed(1)} months. Target expanding to at least 6 full months.`;
  }

  // 5. Insurance Protection
  let insurance_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let insurance_detail = `Well protected with active health coverage and adequate term life insurance (${insurance_multiple.toFixed(1)}x income).`;
  if (!has_health) {
    insurance_status = 'NEEDS ATTENTION';
    insurance_detail = 'Uninsured against medical emergencies. A single major hospital event could deplete liquid savings.';
  } else if (dependents > 0 && (!has_life || insurance_multiple < 10)) {
    insurance_status = 'MODERATE';
    insurance_detail = `Health policy in place, but term life cover (${insurance_multiple.toFixed(1)}x) is below the recommended 10x–15x rule.`;
  }

  // 6. Inflation Impact
  let inflation_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let inflation_detail = `Active investment allocation counterbalances the projected ${purchasing_power_loss_pct}% 10-year inflation drag.`;
  if (existing_investments === 0) {
    inflation_status = 'NEEDS ATTENTION';
    inflation_detail = `100% idle bank cash. Inflation will silently decay ~${purchasing_power_loss_pct}% of real purchasing power over a decade.`;
  } else if (total_liquid_reserves > existing_investments * 1.5) {
    inflation_status = 'MODERATE';
    inflation_detail = `Substantial cash allocation risks moderate drag from inflation (${purchasing_power_loss_pct}% 10-year cumulative).`;
  }

  // 7. Investment Diversification
  let diversification_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let diversification_detail = `Substantial portfolio of ₹${existing_investments.toLocaleString('en-IN')} contributing to asset accumulation.`;
  if (existing_investments === 0) {
    diversification_status = 'NEEDS ATTENTION';
    diversification_detail = 'Zero market-linked assets. The portfolio lacks growth engines and equity/debt diversification.';
  } else if (existing_investments < total_monthly_income * 3) {
    diversification_status = 'MODERATE';
    diversification_detail = 'Initial investment base established. Broaden exposure across uncorrelated asset classes.';
  }

  // 8. Goal Readiness
  let goal_status: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'HEALTHY';
  let goal_detail = `Predictable monthly surplus of ₹${monthly_surplus.toLocaleString('en-IN')} provides strong capacity to fund target goals.`;
  if (monthly_surplus <= 0) {
    goal_status = 'NEEDS ATTENTION';
    goal_detail = `Cash deficit of ₹${Math.abs(monthly_surplus).toLocaleString('en-IN')} prevents funding long-term goals without debt.`;
  } else if (monthly_surplus < 15000 || savings_rate_pct < 15) {
    goal_status = 'MODERATE';
    goal_detail = `Moderate surplus available to fund goals (${goals.slice(0, 3).join(', ') || 'Wealth Creation'}). Prioritize short-term milestones.`;
  }

  // Overall Score
  const statuses = [
    income_status, savings_status, debt_status, emergency_status,
    insurance_status, inflation_status, diversification_status, goal_status
  ];
  const healthyCount = statuses.filter(s => s === 'HEALTHY').length;
  const attentionCount = statuses.filter(s => s === 'NEEDS ATTENTION').length;

  let overall_classification: 'HEALTHY' | 'MODERATE' | 'NEEDS ATTENTION' = 'MODERATE';
  let overall_badge_class = 'text-amber-400 bg-amber-950/40 border-amber-800';

  if (attentionCount >= 3 || monthly_surplus < 0 || debt_to_income_pct > 50) {
    overall_classification = 'NEEDS ATTENTION';
    overall_badge_class = 'text-rose-400 bg-rose-950/40 border-rose-800';
  } else if (healthyCount >= 5 && attentionCount <= 1) {
    overall_classification = 'HEALTHY';
    overall_badge_class = 'text-emerald-400 bg-emerald-950/40 border-emerald-800';
  }

  // Strengths & Areas Needing Attention
  const strengths: string[] = [];
  if (savings_rate_pct >= 20) strengths.push(`Disciplined Savings: Retaining ${savings_rate_pct.toFixed(1)}% of monthly earnings.`);
  if (debt_to_income_pct <= 25 && cc_debt === 0) strengths.push(`Controlled Leverage: Debt servicing takes only ${debt_to_income_pct.toFixed(1)}% of income with zero revolving credit.`);
  if (emergency_months >= 6) strengths.push(`Robust Buffer: Liquid reserves cover ${emergency_months.toFixed(1)} months of necessary living expenses.`);
  if (existing_investments > 0) strengths.push(`Wealth Compounding: ₹${existing_investments.toLocaleString('en-IN')} deployed in productive investments.`);
  if (has_health && has_life) strengths.push('Risk Hedged: Both comprehensive medical cover and life protection are active.');
  if (strengths.length === 0) strengths.push('Proactive Step: You have initiated an essential diagnostic audit of your financial position.');

  const areas_needing_attention: string[] = [];
  if (monthly_surplus <= 0) areas_needing_attention.push('Monthly Deficit: Expenditures exceed earnings. Pruning non-essential costs is critical.');
  if (savings_rate_pct < 15) areas_needing_attention.push(`Savings Shortfall: Currently saving ${savings_rate_pct.toFixed(1)}% vs target 20%+ benchmark.`);
  if (emergency_months < 3) areas_needing_attention.push(`Insufficient Reserves: Emergency cushion covers only ${emergency_months.toFixed(1)} months (ideal: 6 months).`);
  if (cc_debt > 0) areas_needing_attention.push(`High-Interest Credit: Revolving credit card balance of ₹${cc_debt.toLocaleString('en-IN')} accumulating steep finance charges.`);
  if (!has_health) areas_needing_attention.push('Lack of Health Coverage: Any sudden hospital bill poses an immediate threat to your savings.');
  if (dependents > 0 && insurance_multiple < 10) areas_needing_attention.push(`Life Coverage Gap: Active policy provides only ${insurance_multiple.toFixed(1)}x annual earnings vs recommended 10x-15x.`);
  if (existing_investments === 0 && total_liquid_reserves > 50000) areas_needing_attention.push('Capital Erosion: Idle bank deposits face silent purchasing power loss due to persistent inflation.');

  let final_explanation = '';
  if (overall_classification === 'HEALTHY') {
    final_explanation = `Your financial foundation is healthy and well-balanced. You consistently generate a monthly surplus of ₹${monthly_surplus.toLocaleString('en-IN')} (saving ${savings_rate_pct.toFixed(1)}%), maintain safe debt levels, and retain a reliable liquid emergency fund. Your next milestone is to automate regular investments into diversified low-cost funds to compound wealth over time.`;
  } else if (overall_classification === 'MODERATE') {
    final_explanation = `You have built a workable financial structure with a positive surplus of ₹${monthly_surplus.toLocaleString('en-IN')}, but key protective buffers require reinforcement. Expanding your emergency fund to 6 full months and ensuring adequate medical and life insurance will shield your household before you accelerate market investments.`;
  } else {
    final_explanation = `Your financial position is under noticeable strain due to high outflow commitments or debt obligations. Monthly cash margins are narrow, leaving your household exposed to unexpected disruptions. The immediate priority is to curtail discretionary expenses, eliminate high-interest liabilities, and establish a bare-minimum 3-month emergency reserve.`;
  }

  return {
    total_monthly_income,
    total_monthly_expenses,
    monthly_surplus,
    savings_rate_pct: Number(savings_rate_pct.toFixed(1)),
    debt_to_income_pct: Number(debt_to_income_pct.toFixed(1)),
    emergency_months: Number(emergency_months.toFixed(1)),
    insurance_multiple: Number(insurance_multiple.toFixed(1)),
    purchasing_power_loss_pct,
    overall_classification,
    overall_badge_class,
    cards: {
      income: { status: income_status, detail: income_detail },
      savings: { status: savings_status, detail: savings_detail },
      debt: { status: debt_status, detail: debt_detail },
      emergency: { status: emergency_status, detail: emergency_detail },
      insurance: { status: insurance_status, detail: insurance_detail },
      inflation: { status: inflation_status, detail: inflation_detail },
      diversification: { status: diversification_status, detail: diversification_detail },
      goals: { status: goal_status, detail: goal_detail }
    },
    strengths,
    areas_needing_attention,
    final_explanation
  };
}
