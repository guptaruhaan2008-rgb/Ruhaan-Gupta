import { FinancialProfileInput, InvestorProfileInput } from '../types';

const OCCUPATIONS = [
  'Software Engineer', 'Senior Data Scientist', 'Product Manager',
  'Chartered Accountant', 'Civil Infrastructure Engineer', 'Consultant',
  'Medical Practitioner', 'Operations Specialist', 'Creative Director',
  'Supply Chain Manager', 'High School Educator', 'Architect'
];

const GOAL_OPTIONS = [
  'Emergency fund', 'Wealth creation', 'House', 'Education',
  'Retirement', 'Vehicle', 'Other'
];

export function generateRandomFinancialProfile(): FinancialProfileInput {
  const ages = [24, 27, 30, 34, 38, 42, 48, 55];
  const age = ages[Math.floor(Math.random() * ages.length)];
  const occupation = OCCUPATIONS[Math.floor(Math.random() * OCCUPATIONS.length)];
  const dependents = age > 26 ? Math.floor(Math.random() * 3) : 0;

  let baseIncome = 65000;
  if (age < 30) {
    baseIncome = [50000, 70000, 85000, 110000][Math.floor(Math.random() * 4)];
  } else if (age < 42) {
    baseIncome = [95000, 135000, 175000, 240000][Math.floor(Math.random() * 4)];
  } else {
    baseIncome = [150000, 220000, 310000, 420000][Math.floor(Math.random() * 4)];
  }

  const otherIncome = Math.random() < 0.4 ? [5000, 12000, 25000][Math.floor(Math.random() * 3)] : 0;
  const totalIn = baseIncome + otherIncome;

  const rent = Math.round((totalIn * (0.15 + Math.random() * 0.12)) / 1000) * 1000;
  const household = Math.round((totalIn * (0.10 + Math.random() * 0.10)) / 1000) * 1000;
  const food = Math.round((totalIn * (0.08 + Math.random() * 0.06)) / 1000) * 1000;
  const transport = Math.round((totalIn * (0.04 + Math.random() * 0.04)) / 1000) * 1000;
  const education = dependents > 0 ? Math.round((totalIn * (0.05 + Math.random() * 0.08)) / 1000) * 1000 : 0;
  const discretionary = Math.round((totalIn * (0.05 + Math.random() * 0.08)) / 1000) * 1000;

  const hasDebt = Math.random() < 0.65;
  const emi = hasDebt ? Math.round((totalIn * (0.12 + Math.random() * 0.18)) / 1000) * 1000 : 0;
  const totalDebt = emi > 0 ? emi * (24 + Math.floor(Math.random() * 60)) : 0;
  const ccDebt = hasDebt && Math.random() < 0.35 ? [15000, 28000, 45000][Math.floor(Math.random() * 3)] : 0;
  const interestRate = hasDebt ? [8.5, 9.2, 10.5, 11.8][Math.floor(Math.random() * 4)] : 0;

  const bankSavings = Math.round((totalIn * (0.8 + Math.random() * 2.0)) / 5000) * 5000;
  const cashSavings = [5000, 10000, 20000, 35000][Math.floor(Math.random() * 4)];
  const emergencyFund = Math.round((totalIn * (0.5 + Math.random() * 3.5)) / 10000) * 10000;
  const existingInvestments = Math.round((totalIn * (1.5 + Math.random() * 12.0)) / 25000) * 25000;

  const hasHealth = Math.random() < 0.8;
  const hasLife = dependents > 0 ? Math.random() < 0.75 : Math.random() < 0.35;
  const coverageAmount = hasLife ? totalIn * 12 * [8, 12, 15, 20][Math.floor(Math.random() * 4)] : 0;

  // Pick 2-3 goals
  const shuffledGoals = [...GOAL_OPTIONS].sort(() => 0.5 - Math.random());
  const selectedGoals = shuffledGoals.slice(0, 2 + Math.floor(Math.random() * 2));

  const totalExp = rent + household + food + transport + education + discretionary + emi;
  const monthlySavings = Math.max(0, totalIn - totalExp);

  return {
    is_demo: true,
    scenario_label: 'Fictional Demo Scenario',
    age,
    occupation,
    dependents,
    expected_major_expenses: ['Home renovation in 2 years', 'Child school admission next year', 'Higher studies', 'Vehicle purchase'][Math.floor(Math.random() * 4)],
    monthly_income: baseIncome,
    other_income: otherIncome,
    income_stability: ['Stable', 'High', 'Moderate'][Math.floor(Math.random() * 3)] as any,
    expected_income_growth: '8% – 12% annually',
    household_exp: household,
    rent,
    emi,
    education_exp: education,
    transport_exp: transport,
    food_exp: food,
    discretionary_exp: discretionary,
    bank_savings: bankSavings,
    cash_savings: cashSavings,
    emergency_fund: emergencyFund,
    monthly_savings: monthlySavings,
    existing_investments: existingInvestments,
    total_debt: totalDebt,
    interest_rate: interestRate,
    cc_debt: ccDebt,
    remaining_loan_duration_months: emi > 0 ? 36 + Math.floor(Math.random() * 48) : 0,
    health_insurance: hasHealth,
    life_insurance: hasLife,
    other_insurance: false,
    coverage_amount: coverageAmount,
    goals: selectedGoals
  };
}

export function generateRandomInvestorProfile(): InvestorProfileInput {
  const ages = [23, 27, 32, 38, 44, 52];
  const age = ages[Math.floor(Math.random() * ages.length)];
  const incomes = [48000, 75000, 110000, 160000, 240000];
  const income = incomes[Math.floor(Math.random() * incomes.length)];
  const expenses = Math.round((income * (0.45 + Math.random() * 0.20)) / 5000) * 5000;
  const savings = Math.round((income * (2.0 + Math.random() * 6.0)) / 10000) * 10000;
  const amountToInvest = Math.round((income * (0.8 + Math.random() * 2.5)) / 10000) * 10000;

  const risks: ('Low' | 'Moderate' | 'High')[] = ['Low', 'Moderate', 'High'];
  const horizons: ('Less than 1 year' | '1–3 years' | '3–5 years' | '5–10 years' | '10+ years')[] = [
    'Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'
  ];
  const goals = ['Capital stability', 'Regular income', 'Long-term growth', 'Inflation protection', 'Wealth creation', 'Diversification'];
  const preferences = ['Capital stability', 'Regular income', 'Growth', 'Inflation protection', 'Liquidity', 'Diversification'];

  return {
    is_demo: true,
    scenario_label: 'Fictional Demo Scenario',
    age,
    monthly_income: income,
    monthly_expenses: expenses,
    savings,
    amount_to_invest: amountToInvest,
    existing_investments: savings * (0.5 + Math.random() * 2),
    debt: [0, 120000, 350000, 850000][Math.floor(Math.random() * 4)],
    dependents: age > 28 ? Math.floor(Math.random() * 3) : 0,
    risk_tolerance: risks[Math.floor(Math.random() * risks.length)],
    duration: horizons[Math.floor(Math.random() * horizons.length)],
    financial_goal: goals[Math.floor(Math.random() * goals.length)],
    liquidity_requirement: ['High', 'Moderate', 'Low'][Math.floor(Math.random() * 3)] as any,
    investment_experience: ['Beginner', 'Intermediate', 'Experienced'][Math.floor(Math.random() * 3)] as any,
    loss_tolerance: ['Minimal (Capital safety priority)', 'Moderate (Can tolerate 10-15% dips)', 'High (Focused on maximum long-term return)'][Math.floor(Math.random() * 3)],
    investment_preferences: preferences[Math.floor(Math.random() * preferences.length)]
  };
}

export function generateRandomResearchCase(): { symbol: string; label: string } {
  const cases = [
    { symbol: 'RELIANCE', label: 'Reliance Industries Ltd (Shares)' },
    { symbol: 'TCS', label: 'Tata Consultancy Services (Shares)' },
    { symbol: 'HDFCBANK', label: 'HDFC Bank Ltd (Shares)' },
    { symbol: 'INFY', label: 'Infosys Ltd (Shares)' },
    { symbol: 'TATAMOTORS', label: 'Tata Motors Ltd (Shares)' },
    { symbol: 'ITC', label: 'ITC Ltd (Shares)' }
  ];
  return cases[Math.floor(Math.random() * cases.length)];
}

export function generateRandomComparisonPair(): { idA: string; idB: string; label: string } {
  const pairs = [
    { idA: 'gold', idB: 'fds', label: 'Gold (SGB) vs Fixed Deposit (Bank FD)' },
    { idA: 'RELIANCE', idB: 'TCS', label: 'Reliance Industries vs Tata Consultancy Services' },
    { idA: 'BOND001', idB: 'BOND002', label: '7.18% Sovereign GOI Bond vs HDFC Tier-II Subordinated Bond' },
    { idA: 'MF001', idB: 'MF004', label: 'Parag Parikh Flexi Cap vs ICICI Balanced Advantage' },
    { idA: 'fds', idB: 'BOND001', label: 'Bank Fixed Deposit vs 7.18% GOI Sovereign Bond' }
  ];
  return pairs[Math.floor(Math.random() * pairs.length)];
}
