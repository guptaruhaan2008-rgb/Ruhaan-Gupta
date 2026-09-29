import React, { useState } from 'react';
import { 
  GraduationCap, 
  BookOpen, 
  Calculator, 
  HelpCircle, 
  Check, 
  ChevronRight,
  TrendingUp,
  Percent,
  Layers,
  Sparkles
} from 'lucide-react';

export const FinanceKnowledgeView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'basics' | 'concepts' | 'ratios' | 'calculator'>('basics');
  
  // Interactive Compound Interest Calculator State
  const [calcPrincipal, setCalcPrincipal] = useState(100000);
  const [calcRate, setCalcRate] = useState(12);
  const [calcYears, setCalcYears] = useState(10);
  const [calcMonthly, setCalcMonthly] = useState(5000);

  // Compute compound interest
  const futureValue = React.useMemo(() => {
    const r = calcRate / 100 / 12;
    const n = calcYears * 12;
    const lumpSumFV = calcPrincipal * Math.pow(1 + calcRate / 100, calcYears);
    const sipFV = r > 0 ? calcMonthly * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : calcMonthly * n;
    const totalInvested = calcPrincipal + (calcMonthly * n);
    const totalFV = lumpSumFV + sipFV;
    const totalGains = totalFV - totalInvested;
    return {
      totalInvested: Math.round(totalInvested),
      totalFV: Math.round(totalFV),
      totalGains: Math.round(totalGains)
    };
  }, [calcPrincipal, calcRate, calcYears, calcMonthly]);

  // Data collections for each knowledge topic
  const investmentBasics = [
    {
      title: 'Shares (Equities)',
      definition: 'A unit of ownership in a corporation conferring voting rights and claim on residual profits.',
      explanation: 'When you buy shares of a business, you become a part-owner. As the company increases its sales and earnings, the value of your ownership grows, and you may receive regular cash payouts called dividends.',
      formula: 'Return = ((Sale Price - Purchase Price) + Dividends) / Purchase Price',
      example: 'Buying 100 shares of Infosys at ₹1,500 each for ₹1.5 Lakh. If the stock price rises to ₹1,800 in 2 years and pays ₹60/share dividend, your total return is ₹36,000 (24%).',
      whyMatters: 'Equities historically deliver the highest long-term returns above consumer inflation, making them essential for generational wealth accumulation.'
    },
    {
      title: 'Bonds (Fixed Income)',
      definition: 'A formal debt obligation issued by governments or corporations to raise capital from investors in return for interest.',
      explanation: 'Unlike buying stock where you are an owner, buying a bond makes you a lender. The issuer is legally obligated to pay you regular interest (coupons) and repay the original principal on maturity.',
      formula: 'Current Yield = Annual Coupon Payment / Bond Current Market Price',
      example: 'Lending ₹1,00,000 to the Government of India in a 7.18% 10-year G-Sec. You receive ₹7,180 annually in semi-annual installments, and your ₹1,00,000 principal back on maturity.',
      whyMatters: 'Provides predictable income, capital preservation, and shields portfolios against severe equity market drawdowns.'
    },
    {
      title: 'Fixed Deposits (FDs)',
      definition: 'A guaranteed bank deposit with a set tenor and fixed contracted interest rate.',
      explanation: 'You deposit money with a bank for a fixed duration (e.g., 1 to 5 years). The bank uses these funds for lending and pays you guaranteed compounded interest regardless of market fluctuations.',
      formula: 'A = P * (1 + r/n)^(nt)',
      example: 'Depositing ₹2,00,000 in SBI at 7.0% compounded quarterly for 3 years matures to approximately ₹2,46,288.',
      whyMatters: 'Unrivaled capital certainty insured up to ₹5 Lakh per depositor by DICGC. Ideal for short-term liquidity and emergency reserves.'
    },
    {
      title: 'Gold (SGB, ETFs & Bullion)',
      definition: 'A tangible precious metal asset globally recognized as a store of value and currency hedge.',
      explanation: 'Gold produces no dividends or business earnings, but its finite global supply protects purchasing power when paper currencies depreciate or geopolitical uncertainty spikes.',
      formula: 'Real Return = Gold Price Appreciation - Annual Inflation Rate',
      example: 'Allocating 10% of portfolio to Sovereign Gold Bonds (SGB) earning 2.5% annual coupon with tax-free capital appreciation at maturity.',
      whyMatters: 'Negative correlation with equities during market crises; dampens overall portfolio volatility.'
    },
    {
      title: 'Mutual Funds',
      definition: 'A collective investment vehicle pooling money from multiple investors to purchase a professionally diversified portfolio.',
      explanation: 'Instead of picking 30 stocks yourself, you pool capital with a SEBI-registered Asset Management Company (AMC) overseen by a dedicated fund manager.',
      formula: 'NAV = (Total Assets - Liabilities) / Total Units Outstanding',
      example: 'Investing ₹5,000 monthly via SIP in a Flexi Cap Fund holding 40 leading domestic and multinational corporations.',
      whyMatters: 'Allows retail investors to achieve institutional-grade diversification and professional management with as little as ₹500.'
    },
    {
      title: 'Exchange Traded Funds (ETFs)',
      definition: 'Marketable securities tracking a benchmark index that trade on stock exchanges throughout the day like individual shares.',
      explanation: 'Combines the simplicity of a stock with the diversification of an index mutual fund. Has ultra-low expense ratios (0.04%–0.20%).',
      formula: 'Tracking Error = Standard Deviation of (ETF Return - Index Return)',
      example: 'Purchasing Nippon Nifty BeES on the NSE to instantly own the top 50 bluechip companies in India for a 0.04% annual fee.',
      whyMatters: 'Minimizes manager selection risk and management fees, delivering pure market returns.'
    },
    {
      title: 'REITs (Real Estate Investment Trusts)',
      definition: 'Companies that own, operate, or finance income-producing commercial real estate across office parks and malls.',
      explanation: 'Allows anyone to earn commercial rental yields and capital gains without having to buy an entire office building.',
      formula: 'Distribution Yield = Annual Cash Distributions / REIT Unit Price',
      example: 'Buying Embassy REIT units yielding ~6.8% distributed quarterly from corporate leases to Google, JPMorgan, and Microsoft.',
      whyMatters: 'Bridges the gap between stock liquidity and prime physical commercial property yields.'
    },
    {
      title: 'Government Securities (G-Secs)',
      definition: 'Sovereign debt papers issued by the Reserve Bank of India on behalf of the Central and State Governments.',
      explanation: 'The highest credit quality paper in the domestic financial system with zero credit default probability.',
      formula: 'Yield to Maturity (YTM) discount discounting future cash flows to present price',
      example: 'Holding 91-Day Treasury Bills for liquidity parking or 10-Year Benchmark Bonds for guaranteed cash flow.',
      whyMatters: 'Forms the baseline risk-free rate of return for the entire economy.'
    },
    {
      title: 'Public Provident Fund (PPF)',
      definition: 'A government-backed long-term small savings scheme with complete EEE (Exempt-Exempt-Exempt) tax benefits.',
      explanation: 'Deposits, interest, and the final maturity proceeds after 15 years are 100% tax-free under Indian income tax laws.',
      formula: 'Interest calculated on lowest balance between 5th and end of each month',
      example: 'Depositing ₹1.5 Lakh annually at 7.1% interest compounds into over ₹40.6 Lakh tax-free upon maturity.',
      whyMatters: 'Unbeatable risk-adjusted, tax-free compounding vehicle for conservative retirement cushions.'
    },
    {
      title: 'National Pension System (NPS)',
      definition: 'A voluntary, low-cost defined-contribution pension scheme regulated by PFRDA designed for retirement security.',
      explanation: 'Allows you to allocate funds across Equity (E), Corporate Bonds (C), and G-Secs (G) with additional exclusive ₹50,000 tax deduction.',
      formula: 'Blended Return = (% Equity * Ret_E) + (% Corporate * Ret_C) + (% Govt * Ret_G)',
      example: 'Contributing ₹50,000 annually under 80CCD(1B), saving ₹15,600 in tax (30% slab) while compounding in low-cost index funds.',
      whyMatters: 'Provides a disciplined retirement lock-in with mandatory annuity pension for lifelong income.'
    }
  ];

  const financialConcepts = [
    {
      title: 'Compounding',
      definition: 'The process where an asset’s earnings are reinvested to generate their own additional earnings over time.',
      explanation: 'Albert Einstein famously called compound interest the eighth wonder of the world. In the early years, growth looks slow, but over decades, the curve goes exponential.',
      formula: 'A = P * (1 + r/n)^(nt)',
      example: '₹1 Lakh invested at 12% CAGR becomes ₹3.1 Lakh in 10 years, ₹9.6 Lakh in 20 years, and ₹30 Lakh in 30 years.',
      whyMatters: 'Time in the market is vastly more powerful than timing the market.'
    },
    {
      title: 'Inflation',
      definition: 'The persistent rise in general prices leading to a gradual loss in the purchasing power of money.',
      explanation: 'If a coffee costs ₹100 today and inflation is 6%, that same coffee will cost ₹179 in 10 years. Cash kept in a zero-interest locker loses half its value every 12 years.',
      formula: 'Future Cost = Present Cost * (1 + Inflation Rate)^Years',
      example: 'At 6% annual inflation, ₹10 Lakh in a bank account has only ₹5.58 Lakh of real purchasing power after 10 years.',
      whyMatters: 'Any investment whose post-tax return is lower than inflation actually loses you real wealth.'
    },
    {
      title: 'Risk vs Return Spectrum',
      definition: 'The fundamental principle that higher potential returns entail taking on greater potential variability and downside risk.',
      explanation: 'There is no free lunch in finance. To achieve 15% annual compounding in equities, you must accept temporary drawdowns of 20%–30% during bear markets.',
      formula: 'Sharpe Ratio = (Portfolio Return - Risk Free Rate) / Standard Deviation',
      example: 'A government bond offers 7% guaranteed return, while a small-cap stock can return 30% or drop 40% in a single year.',
      whyMatters: 'Protects you from falling for fraudulent schemes promising guaranteed 20%+ returns with zero risk.'
    },
    {
      title: 'Diversification',
      definition: 'The practice of spreading investments across varied assets to reduce exposure to any single economic risk.',
      explanation: '“Don\'t put all your eggs in one basket.” If you own only tech stocks, a tech downturn hurts your entire portfolio. Owning bonds, gold, and FMCG balances the shock.',
      formula: 'Portfolio Variance < Weighted Average of Individual Variances (when correlation < 1)',
      example: 'Holding 60% equities, 25% debt, and 15% gold produces smoother, more consistent returns than 100% in a single stock.',
      whyMatters: 'Reduces unsystematic risk without sacrificing long-term expected returns.'
    },
    {
      title: 'Liquidity',
      definition: 'The ease and speed with which an asset can be converted into ready cash without suffering a significant loss in value.',
      explanation: 'Cash in a savings bank is immediately liquid. Real estate is illiquid because finding a buyer and completing registration takes months.',
      formula: 'Bid-Ask Spread & Settlement Cycle (e.g., T+1 for stocks)',
      example: 'Emergency funds must always be in highly liquid accounts (savings, liquid funds, FDs), not locked in 10-year property.',
      whyMatters: 'Prevents you from being forced to sell long-term investments at a loss to pay unexpected bills.'
    },
    {
      title: 'Volatility',
      definition: 'The rate and magnitude at which the price of an asset fluctuates around its historical average.',
      explanation: 'Volatility is often measured by standard deviation or beta. High volatility means frequent price swings, but volatility is not the same as permanent loss of capital.',
      formula: 'Beta = Covariance(Asset, Market) / Variance(Market)',
      example: 'A stock with a beta of 1.3 fluctuates 30% more than the Nifty 50 benchmark in either direction.',
      whyMatters: 'Knowing your tolerance for volatility prevents panic selling during routine market corrections.'
    }
  ];

  const financialRatios = [
    {
      title: 'P/E (Price-to-Earnings Ratio)',
      definition: 'Ratio measuring current share price relative to per-share earnings.',
      formula: 'P/E = Market Price per Share / Earnings per Share (EPS)',
      example: 'If a company\'s stock price is ₹1,000 and EPS is ₹50, its P/E is 20.',
      whyMatters: 'Shows how many rupees the market pays for ₹1 of corporate net earnings.'
    },
    {
      title: 'P/B (Price-to-Book Ratio)',
      definition: 'Ratio comparing market valuation to book value (net tangible asset worth).',
      formula: 'P/B = Market Price per Share / Book Value per Share',
      example: 'A bank trading at ₹500 with a net asset book value of ₹250 has a P/B of 2.0.',
      whyMatters: 'Crucial for valuing financial institutions, manufacturing plants, and distressed assets.'
    },
    {
      title: 'ROE (Return on Equity %)',
      definition: 'Percentage measure of net profit generated from shareholders\' equity.',
      formula: 'ROE = (Net Income / Shareholders\' Equity) * 100',
      example: 'TCS generates ₹46,000 Cr profit on ₹95,000 Cr equity, delivering an ROE of ~48%.',
      whyMatters: 'High sustained ROE (>20%) signals a powerful economic moat and management capital efficiency.'
    },
    {
      title: 'ROCE (Return on Capital Employed %)',
      definition: 'Ratio comparing operating earnings (EBIT) to total capital employed (debt + equity).',
      formula: 'ROCE = (Operating Profit / Total Capital Employed) * 100',
      example: 'L&T generating ₹25,000 Cr operating profit on ₹1,50,000 Cr capital employed gives a ROCE of 16.7%.',
      whyMatters: 'Essential for capital-intensive companies to ensure profits exceed the borrowing rate.'
    },
    {
      title: 'Debt-to-Equity (D/E)',
      definition: 'Ratio of total interest-bearing liabilities to total shareholders\' equity.',
      formula: 'D/E = Total Debt / Total Shareholders\' Equity',
      example: 'A firm with ₹5,000 Cr debt and ₹10,000 Cr equity has a D/E of 0.5.',
      whyMatters: 'Key indicator of bankruptcy risk during economic down-cycles or interest rate hikes.'
    },
    {
      title: 'Dividend Yield %',
      definition: 'Ratio of annual dividend payout per share divided by the stock\'s current price.',
      formula: 'Dividend Yield = (Annual Dividend per Share / Current Share Price) * 100',
      example: 'ITC trading at ₹412 paying ₹13.75 total annual dividend provides a dividend yield of 3.33%.',
      whyMatters: 'Provides direct cash flow return independent of stock market price changes.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar (STRICTLY NO AUTO-FILL AS SPECIFIED) */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-teal-950/60 border border-teal-800 text-teal-400 text-xs font-semibold mb-2">
            <span>Feature 5: Educational Financial Knowledge</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Finance Knowledge & Concept Academy</h1>
          <p className="text-sm text-slate-400 mt-1">
            Learn core investment instruments, fundamental concepts, and quantitative valuation metrics with examples.
          </p>
        </div>

        {/* Academic Reference Tag (Strictly No Auto-fill) */}
        <div className="text-xs text-slate-400 font-mono flex items-center gap-1.5 bg-slate-900 px-3 py-1.5 rounded-lg border border-slate-800">
          <BookOpen className="w-3.5 h-3.5 text-teal-400" />
          <span>Academic Knowledge Repository</span>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-800 pb-3 text-xs font-bold">
        <button
          onClick={() => setActiveTab('basics')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'basics'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          1. Investment Basics (10 Instruments)
        </button>
        <button
          onClick={() => setActiveTab('concepts')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'concepts'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          2. Financial Concepts
        </button>
        <button
          onClick={() => setActiveTab('ratios')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'ratios'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          3. Financial Analysis & Ratios
        </button>
        <button
          onClick={() => setActiveTab('calculator')}
          className={`px-4 py-2 rounded-xl transition-all ${
            activeTab === 'calculator'
              ? 'bg-teal-500 text-slate-950 shadow-md shadow-teal-950/50'
              : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
          }`}
        >
          4. Interactive Compounding Calculator
        </button>
      </div>

      {/* Tab 1: Investment Basics */}
      {activeTab === 'basics' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {investmentBasics.map((item, idx) => (
            <div key={idx} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <h3 className="text-base font-bold text-white flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-400 flex items-center justify-center text-xs font-mono">
                    {idx + 1}
                  </span>
                  <span>{item.title}</span>
                </h3>
              </div>

              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <strong className="text-teal-400">Definition: </strong>
                  <span className="text-slate-300">{item.definition}</span>
                </div>
                <div>
                  <strong className="text-slate-400">Easy Explanation: </strong>
                  <span className="text-slate-300">{item.explanation}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-400">
                  Formula: {item.formula}
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-slate-400">
                  <strong className="text-slate-300">Simple Example: </strong>
                  {item.example}
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-emerald-400">
                  <strong>Why it matters: </strong>
                  <span className="text-slate-300">{item.whyMatters}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 2: Financial Concepts */}
      {activeTab === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {financialConcepts.map((concept, idx) => (
            <div key={idx} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-4 hover:border-slate-700 transition-all">
              <h3 className="text-base font-bold text-white flex items-center gap-2 pb-3 border-b border-slate-800">
                <span className="w-6 h-6 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center text-xs font-mono">
                  {idx + 1}
                </span>
                <span>{concept.title}</span>
              </h3>
              <div className="space-y-3 text-xs leading-relaxed">
                <div>
                  <strong className="text-cyan-400">Definition: </strong>
                  <span className="text-slate-300">{concept.definition}</span>
                </div>
                <div>
                  <strong className="text-slate-400">Easy Explanation: </strong>
                  <span className="text-slate-300">{concept.explanation}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-400">
                  Formula: {concept.formula}
                </div>
                <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-slate-400">
                  <strong className="text-slate-300">Simple Example: </strong>
                  {concept.example}
                </div>
                <div className="pt-2 border-t border-slate-800/80 text-emerald-400">
                  <strong>Why it matters: </strong>
                  <span className="text-slate-300">{concept.whyMatters}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 3: Financial Ratios */}
      {activeTab === 'ratios' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {financialRatios.map((ratio, idx) => (
            <div key={idx} className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 space-y-3 flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-bold text-white mb-2">{ratio.title}</h3>
                <p className="text-xs text-slate-400 mb-3 leading-relaxed">{ratio.definition}</p>
                <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 font-mono text-[11px] text-emerald-400 mb-3">
                  {ratio.formula}
                </div>
                <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/60">
                  <strong className="text-slate-400">Example: </strong>
                  {ratio.example}
                </div>
              </div>
              <div className="pt-3 border-t border-slate-800 text-[11px] text-teal-400">
                <strong>Why it matters: </strong>
                <span className="text-slate-300">{ratio.whyMatters}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Interactive Compounding Calculator */}
      {activeTab === 'calculator' && (
        <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl space-y-8">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Calculator className="w-5 h-5 text-teal-400" />
              <span>Interactive Wealth Compounding Simulation</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Visualize the mathematical impact of consistent investing, rate of return, and time duration.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Input Sliders */}
            <div className="lg:col-span-6 space-y-6 text-xs">
              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="font-semibold">Initial Lump Sum Investment:</span>
                  <span className="font-mono text-emerald-400 font-bold">₹{calcPrincipal.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1000000"
                  step="10000"
                  value={calcPrincipal}
                  onChange={e => setCalcPrincipal(parseInt(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="font-semibold">Monthly SIP Contribution:</span>
                  <span className="font-mono text-cyan-400 font-bold">₹{calcMonthly.toLocaleString('en-IN')}</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="1000"
                  value={calcMonthly}
                  onChange={e => setCalcMonthly(parseInt(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="font-semibold">Expected Annual CAGR (%):</span>
                  <span className="font-mono text-violet-400 font-bold">{calcRate}%</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="20"
                  step="0.5"
                  value={calcRate}
                  onChange={e => setCalcRate(parseFloat(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>

              <div>
                <div className="flex justify-between text-slate-300 mb-1.5">
                  <span className="font-semibold">Time Horizon (Years):</span>
                  <span className="font-mono text-amber-400 font-bold">{calcYears} Years</span>
                </div>
                <input
                  type="range"
                  min="1"
                  max="35"
                  step="1"
                  value={calcYears}
                  onChange={e => setCalcYears(parseInt(e.target.value))}
                  className="w-full accent-teal-500"
                />
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-6 bg-slate-950 p-6 rounded-2xl border border-slate-800 space-y-4">
              <div className="text-xs uppercase tracking-wider text-slate-400 font-bold">Projected Future Wealth</div>
              <div className="text-4xl font-black text-emerald-400">
                ₹{futureValue.totalFV.toLocaleString('en-IN')}
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-900 text-xs">
                <div>
                  <span className="text-slate-500">Total Capital Contributed:</span>
                  <div className="text-sm font-bold text-white mt-1">₹{futureValue.totalInvested.toLocaleString('en-IN')}</div>
                </div>
                <div>
                  <span className="text-slate-500">Total Compounded Wealth Gained:</span>
                  <div className="text-sm font-bold text-teal-400 mt-1">₹{futureValue.totalGains.toLocaleString('en-IN')}</div>
                </div>
              </div>

              <div className="bg-slate-900/60 p-3 rounded-xl border border-slate-800 text-[11px] text-slate-400 leading-relaxed">
                Compound interest accelerates non-linearly: In the final 5 years of a {calcYears}-year horizon, gains typically exceed the entire first decade of contributions.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
