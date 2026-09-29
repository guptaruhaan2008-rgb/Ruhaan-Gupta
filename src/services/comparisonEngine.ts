export interface ComparisonItem {
  id: string;
  name: string;
  category: string;
  risk_level: string;
  return_display: string;
  liquidity: string;
  volatility: string;
  growth_char: string;
  income_type: string;
  financial_strength: string;
  advantages: string;
  risks: string;
  ideal_horizon: string;
  tax_info: string;
}

export const COMPARISON_CATALOG: Record<string, ComparisonItem> = {
  'gold': {
    id: 'gold',
    name: 'Gold (Sovereign Gold Bond / ETF)',
    category: 'Precious Metals & Commodities',
    risk_level: 'Moderate',
    return_display: '11% – 14% (5Y CAGR)',
    liquidity: 'Moderate (Stock Exchange secondary trading)',
    volatility: 'Moderate (Influenced by geopolitical & currency shifts)',
    growth_char: 'Capital preservation & inflation hedge',
    income_type: '2.50% p.a. Semi-annual interest on SGB',
    financial_strength: 'Sovereign / Physical Reserve Backed',
    advantages: 'Zero default risk, historic hedge against currency depreciation and systemic crises, tax exemption on SGB maturity.',
    risks: 'No corporate earnings or business cash flows, price fluctuations based on global interest rate cycles.',
    ideal_horizon: '3–8 Years',
    tax_info: '100% Tax-Free capital gains at 8Y maturity for SGB; ETF taxed as capital gains.'
  },
  'fds': {
    id: 'fds',
    name: 'Fixed Deposit (Bank Term Deposit)',
    category: 'Cash Equivalents & Debt',
    risk_level: 'Low',
    return_display: '6.8% – 7.2% Fixed',
    liquidity: 'High (Instant premature liquidation with 0.5%–1% penalty)',
    volatility: 'Zero (Fixed principal and contracted interest rate)',
    growth_char: 'Linear capital protection',
    income_type: 'Contracted Periodic Interest (Monthly/Quarterly/Annual)',
    financial_strength: 'DICGC Insured up to ₹5 Lakh per bank',
    advantages: 'Complete certainty of cash flows and principal redemption value, simple and universally understood structure.',
    risks: 'Post-tax returns frequently lag behind real inflation, premature closure penalties apply.',
    ideal_horizon: '1–3 Years',
    tax_info: 'Interest is added to taxable income and taxed at the investor\'s marginal slab rate.'
  },
  'RELIANCE': {
    id: 'RELIANCE',
    name: 'Reliance Industries Ltd',
    category: 'Large-Cap Equities',
    risk_level: 'Moderate-High',
    return_display: '16.4% (5Y CAGR)',
    liquidity: 'Very High (Top turnover on NSE/BSE)',
    volatility: 'Moderate-High (Beta ~ 1.05)',
    growth_char: 'Conglomerate growth across Telecom 5G, Retail, and Green Energy',
    income_type: 'Modest dividend yield (0.35%) + share price compounding',
    financial_strength: 'AAA Domestic Rating, Net Debt-to-Equity 0.38',
    advantages: 'Pervasive market dominance in telecom (Jio) and retail, world-scale refining asset efficiency.',
    risks: 'Large ongoing capex requirements, refining margin volatility, regulatory policies.',
    ideal_horizon: '5+ Years',
    tax_info: 'Equity capital gains: 12.5% Long-Term (exceeding ₹1.25L), 20% Short-Term.'
  },
  'TCS': {
    id: 'TCS',
    name: 'Tata Consultancy Services',
    category: 'Large-Cap Technology',
    risk_level: 'Moderate',
    return_display: '14.2% (5Y CAGR)',
    liquidity: 'Very High (Bluechip institutional liquidity)',
    volatility: 'Moderate (Beta ~ 0.82)',
    growth_char: 'Global enterprise digital transformation and AI integration',
    income_type: 'Substantial dividend yield (1.38%) + periodic share buybacks',
    financial_strength: 'AAA Pristine Balance Sheet, Virtually Zero Debt (D/E 0.02)',
    advantages: 'Exceptional Return on Capital Employed (59.1%), diversified global client base, high cash generation.',
    risks: 'US and European IT budget freezes, currency fluctuations, competitive pressure.',
    ideal_horizon: '3–5 Years',
    tax_info: 'Equity capital gains rules apply; dividends taxed at investor slab rate.'
  },
  'BOND001': {
    id: 'BOND001',
    name: '7.18% GOI 2033 Sovereign Bond',
    category: 'Sovereign Debt (G-Sec)',
    risk_level: 'Low',
    return_display: '7.09% Current Yield',
    liquidity: 'High (Benchmark sovereign curve)',
    volatility: 'Low-Moderate (Duration sensitivity ~ 6.8 years)',
    growth_char: 'Capital stability with semi-annual coupon distributions',
    income_type: 'Semi-annual fixed interest (7.18% p.a.)',
    financial_strength: '100% Sovereign Guarantee of India',
    advantages: 'Zero credit default risk, sovereign institutional backing, predictable semi-annual income.',
    risks: 'Market price falls if benchmark interest rates rise before maturity.',
    ideal_horizon: '7–10 Years',
    tax_info: 'Coupons taxed at income tax slab; capital gains rules apply if sold before maturity.'
  },
  'BOND002': {
    id: 'BOND002',
    name: 'HDFC Bank Tier-II Subordinated Bond',
    category: 'Corporate Banking Debt',
    risk_level: 'Low-Moderate',
    return_display: '7.68% Current Yield',
    liquidity: 'Moderate',
    volatility: 'Low (Duration ~ 7.1 years)',
    growth_char: 'Higher fixed yield pickup over sovereign benchmark',
    income_type: 'Annual fixed coupon (7.75% p.a.)',
    financial_strength: 'CRISIL AAA Rating',
    advantages: '60 bps yield premium over government securities, issued by India\'s premier private bank.',
    risks: 'Subordinated claim status relative to senior deposits in crisis scenarios.',
    ideal_horizon: '5–10 Years',
    tax_info: 'Coupon income fully taxable at investor personal slab.'
  },
  'MF001': {
    id: 'MF001',
    name: 'Parag Parikh Flexi Cap Fund',
    category: 'Flexi-Cap Equity Fund',
    risk_level: 'Very High',
    return_display: '21.5% (5Y CAGR)',
    liquidity: 'High (T+2 Redemption with 1% exit load for year 1)',
    volatility: 'Moderate-High (Standard Deviation ~ 12.8)',
    growth_char: 'Active global value investing across Indian and international leaders',
    income_type: 'Capital compounding via growth option',
    financial_strength: 'AUM > ₹68,000 Cr, managed by seasoned fiduciary team',
    advantages: 'International diversification (Alphabet, Microsoft) alongside Indian bluechips, cash management in rich markets.',
    risks: 'Market drawdown vulnerability, potential underperformance in speculative momentum rallies.',
    ideal_horizon: '5+ Years',
    tax_info: 'Equity mutual fund taxation (12.5% LTCG > ₹1.25L, 20% STCG).'
  },
  'MF004': {
    id: 'MF004',
    name: 'ICICI Prudential Balanced Advantage Fund',
    category: 'Dynamic Asset Allocation (Hybrid)',
    risk_level: 'Moderate',
    return_display: '13.8% (5Y CAGR)',
    liquidity: 'High (T+2 settlement)',
    volatility: 'Low-Moderate (Dynamic equity allocation 30%–80%)',
    growth_char: 'Model-driven countercyclical equity and debt allocation',
    income_type: 'Regular dividend option or tax-efficient capital growth',
    financial_strength: 'AUM > ₹56,000 Cr, top tier fund house backing',
    advantages: 'Automatically sells equity when markets become expensive and buys during market corrections, curtailing drawdowns.',
    risks: 'Lower upside participation during steep one-way bull markets.',
    ideal_horizon: '3+ Years',
    tax_info: 'Enjoys equity taxation status due to gross equity + arbitrage derivatives exposure.'
  }
};

export function compareInvestments(idA: string, idB: string) {
  const itemA = COMPARISON_CATALOG[idA] || COMPARISON_CATALOG['gold'];
  const itemB = COMPARISON_CATALOG[idB] || COMPARISON_CATALOG['fds'];

  const dimensions = [
    {
      dimension: 'Asset Class Category',
      a: itemA.category,
      b: itemB.category,
      note: 'Fundamental economic structure and investment objective.'
    },
    {
      dimension: 'Risk & Volatility Level',
      a: `${itemA.risk_level} • ${itemA.volatility}`,
      b: `${itemB.risk_level} • ${itemB.volatility}`,
      note: 'Downside exposure and portfolio fluctuations.'
    },
    {
      dimension: 'Historical Performance / Yield',
      a: itemA.return_display,
      b: itemB.return_display,
      note: 'Past historical return rates (past returns do not guarantee future performance).'
    },
    {
      dimension: 'Liquidity & Redemptions',
      a: itemA.liquidity,
      b: itemB.liquidity,
      note: 'Speed of cash realization and potential exit penalty.'
    },
    {
      dimension: 'Income vs Compounding',
      a: itemA.income_type,
      b: itemB.income_type,
      note: 'Suitability for regular income needs vs capital accumulation.'
    },
    {
      dimension: 'Recommended Time Horizon',
      a: itemA.ideal_horizon,
      b: itemB.ideal_horizon,
      note: 'Minimum recommended holding duration to ride through economic cycles.'
    },
    {
      dimension: 'Tax Implications',
      a: itemA.tax_info,
      b: itemB.tax_info,
      note: 'Impact on net post-tax returns depending on investor tax slab.'
    },
    {
      dimension: 'Major Advantages',
      a: itemA.advantages,
      b: itemB.advantages,
      note: 'Strategic asset role within an optimized allocation.'
    },
    {
      dimension: 'Major Risks & Downside',
      a: itemA.risks,
      b: itemB.risks,
      note: 'Key risks requiring proactive monitoring.'
    }
  ];

  const keyDifferences = [
    `Risk vs Stability: ${itemA.name} is oriented toward ${itemA.growth_char.toLowerCase()} with ${itemA.risk_level.toLowerCase()} volatility, whereas ${itemB.name} emphasizes ${itemB.growth_char.toLowerCase()} with ${itemB.risk_level.toLowerCase()} volatility.`,
    `Cash Flow Nature: ${itemA.name} provides ${itemA.income_type.toLowerCase()}, while ${itemB.name} generates ${itemB.income_type.toLowerCase()}.`,
    `Inflation Resilience: Over a 5+ year timeline, ${itemA.name} has historically shown greater capacity to preserve purchasing power against inflation, whereas ${itemB.name} delivers short-term nominal certainty.`,
    `Portfolio Decision: Choose ${itemA.name} if you have a sufficient time horizon to absorb market fluctuations for higher compounding. Choose ${itemB.name} if capital preservation and immediate liquidity are non-negotiable.`
  ];

  return {
    itemA,
    itemB,
    dimensions,
    keyDifferences,
    disclaimer: 'FINVEXA does not declare a universal winner. Factual trade-offs should guide allocation based on personal goals.'
  };
}
