import React, { useState, useMemo } from 'react';
import { StockData } from '../types';
import { STOCKS_DATA, BONDS_DATA, MUTUAL_FUNDS_DATA, GOLD_DATA, FDS_DATA } from '../data/mockData';
import { generateRandomResearchCase } from '../services/autoFillService';
import { 
  Sparkles, 
  Search, 
  TrendingUp, 
  DollarSign, 
  BarChart2, 
  Layers, 
  HelpCircle, 
  ShieldCheck, 
  AlertTriangle, 
  Info,
  Calendar,
  ExternalLink,
  ChevronDown
} from 'lucide-react';

interface InvestmentResearchViewProps {
  initialSymbol?: string;
}

export const InvestmentResearchView: React.FC<InvestmentResearchViewProps> = ({ initialSymbol = 'RELIANCE' }) => {
  const [selectedSymbol, setSelectedSymbol] = useState<string>(initialSymbol);
  const [timeframe, setTimeframe] = useState<'1Y' | '3Y' | '5Y' | '10Y'>('3Y');
  const [activeMetricTab, setActiveMetricTab] = useState<'price' | 'revenue' | 'profit' | 'cashflow'>('price');
  const [isDemoCase, setIsDemoCase] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // Find the selected stock or fallback to Reliance
  const stock = useMemo(() => {
    return STOCKS_DATA.find(s => s.symbol.toUpperCase() === selectedSymbol.toUpperCase()) || STOCKS_DATA[0];
  }, [selectedSymbol]);

  // Determine financial strength classification
  const financialStrength = useMemo(() => {
    if (stock.debt_to_equity <= 0.4 && stock.roe_pct >= 18) {
      return { rating: 'Strong', badgeClass: 'bg-emerald-950/60 text-emerald-400 border-emerald-800' };
    }
    if (stock.debt_to_equity <= 0.9 && stock.roe_pct >= 10) {
      return { rating: 'Moderate', badgeClass: 'bg-sky-950/60 text-sky-400 border-sky-800' };
    }
    return { rating: 'Weak', badgeClass: 'bg-amber-950/60 text-amber-400 border-amber-800' };
  }, [stock]);

  // Handle Auto-Fill Research Case
  const handleAutoFill = () => {
    const randomCase = generateRandomResearchCase();
    setSelectedSymbol(randomCase.symbol);
    setIsDemoCase(true);
  };

  // Synthetic Historical Chart Generator
  const chartData = useMemo(() => {
    const basePrice = stock.current_price;
    const baseRev = stock.revenue_cr;
    const baseProf = stock.net_profit_cr;
    const baseCf = stock.free_cash_flow_cr;

    if (timeframe === '1Y') {
      return [
        { label: 'Q1-23', price: basePrice * 0.88, rev: baseRev * 0.23, prof: baseProf * 0.22, cf: baseCf * 0.21 },
        { label: 'Q2-23', price: basePrice * 0.91, rev: baseRev * 0.24, prof: baseProf * 0.24, cf: baseCf * 0.23 },
        { label: 'Q3-23', price: basePrice * 0.96, rev: baseRev * 0.26, prof: baseProf * 0.26, cf: baseCf * 0.27 },
        { label: 'Q4-23', price: basePrice, rev: baseRev * 0.27, prof: baseProf * 0.28, cf: baseCf * 0.29 }
      ];
    } else if (timeframe === '3Y') {
      return [
        { label: 'FY22', price: basePrice * 0.72, rev: baseRev * 0.76, prof: baseProf * 0.71, cf: baseCf * 0.68 },
        { label: 'FY23', price: basePrice * 0.85, rev: baseRev * 0.88, prof: baseProf * 0.84, cf: baseCf * 0.82 },
        { label: 'FY24', price: basePrice, rev: baseRev, prof: baseProf, cf: baseCf }
      ];
    } else if (timeframe === '5Y') {
      return [
        { label: 'FY20', price: basePrice * 0.50, rev: baseRev * 0.58, prof: baseProf * 0.52, cf: baseCf * 0.48 },
        { label: 'FY21', price: basePrice * 0.62, rev: baseRev * 0.68, prof: baseProf * 0.63, cf: baseCf * 0.59 },
        { label: 'FY22', price: basePrice * 0.72, rev: baseRev * 0.76, prof: baseProf * 0.71, cf: baseCf * 0.68 },
        { label: 'FY23', price: basePrice * 0.85, rev: baseRev * 0.88, prof: baseProf * 0.84, cf: baseCf * 0.82 },
        { label: 'FY24', price: basePrice, rev: baseRev, prof: baseProf, cf: baseCf }
      ];
    } else {
      // 10Y
      return [
        { label: 'FY15', price: basePrice * 0.24, rev: baseRev * 0.32, prof: baseProf * 0.28, cf: baseCf * 0.22 },
        { label: 'FY17', price: basePrice * 0.35, rev: baseRev * 0.44, prof: baseProf * 0.38, cf: baseCf * 0.31 },
        { label: 'FY19', price: basePrice * 0.48, rev: baseRev * 0.55, prof: baseProf * 0.49, cf: baseCf * 0.42 },
        { label: 'FY21', price: basePrice * 0.62, rev: baseRev * 0.68, prof: baseProf * 0.63, cf: baseCf * 0.59 },
        { label: 'FY24', price: basePrice, rev: baseRev, prof: baseProf, cf: baseCf }
      ];
    }
  }, [stock, timeframe]);

  // Normalized max value for SVG charting
  const currentMetricValues = chartData.map(d => {
    if (activeMetricTab === 'price') return d.price;
    if (activeMetricTab === 'revenue') return d.rev;
    if (activeMetricTab === 'profit') return d.prof;
    return d.cf;
  });
  const maxVal = Math.max(...currentMetricValues, 1);
  const minVal = Math.min(...currentMetricValues, 0);

  // Ratio definitions with educational tooltips
  const ratioDetails = [
    {
      key: 'pe_ratio',
      label: 'Price-to-Earnings (P/E)',
      value: `${stock.pe_ratio}`,
      meaning: 'Ratio of stock price to earnings per share.',
      whyMatters: 'Indicates how many rupees investors pay for each rupee of annual net profit.',
      interpretation: 'Lower P/E vs sector average may indicate value; high P/E implies steep growth expectations.'
    },
    {
      key: 'pb_ratio',
      label: 'Price-to-Book (P/B)',
      value: `${stock.pb_ratio}`,
      meaning: 'Compares market valuation to net asset book value.',
      whyMatters: 'Reflects market premium over the company\'s underlying tangible equity.',
      interpretation: '< 1.0 signals deep discount or asset distress; tech/service firms typically trade at elevated P/B.'
    },
    {
      key: 'roe_pct',
      label: 'Return on Equity (ROE)',
      value: `${stock.roe_pct}%`,
      meaning: 'Net income generated per unit of shareholders\' equity.',
      whyMatters: 'Direct measure of capital efficiency and compounding strength.',
      interpretation: 'Sustainable ROE above 15%–20% is hallmark of competitive economic moats.'
    },
    {
      key: 'roce_pct',
      label: 'Return on Capital (ROCE)',
      value: `${stock.roce_pct}%`,
      meaning: 'Operating profit divided by total capital employed (debt + equity).',
      whyMatters: 'Tests whether total deployed debt and equity yield returns above borrowing costs.',
      interpretation: 'ROCE exceeding borrowing rates by 5%+ confirms positive economic value creation.'
    },
    {
      key: 'debt_to_equity',
      label: 'Debt-to-Equity (D/E)',
      value: `${stock.debt_to_equity}`,
      meaning: 'Total interest-bearing debt relative to equity.',
      whyMatters: 'Measures insolvency risk and financial vulnerability in rising rate environments.',
      interpretation: '< 0.5 is conservative; > 1.2 indicates leveraged capital structure.'
    },
    {
      key: 'profit_margin_pct',
      label: 'Net Profit Margin',
      value: `${stock.profit_margin_pct}%`,
      meaning: 'Percentage of revenue converted into clean net profit.',
      whyMatters: 'Demonstrates pricing power and buffer against raw material inflation.',
      interpretation: 'Higher and expanding margins signal industry leadership and pricing dominance.'
    },
    {
      key: 'dividend_yield_pct',
      label: 'Dividend Yield',
      value: `${stock.dividend_yield_pct}%`,
      meaning: 'Annual cash dividend distribution relative to current share price.',
      whyMatters: 'Cash return realized without selling underlying equity units.',
      interpretation: 'A stable 2%–4% yield provides downside support during volatile markets.'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header bar */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-violet-950/60 border border-violet-800 text-violet-400 text-xs font-semibold mb-2">
            <span>Feature 3: Quantitative Equity & Asset Research</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Investment Research Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">
            Deep-dive financial statements, valuation multiples, historical growth, and scenario modeling.
          </p>
        </div>

        {/* Auto-fill Button */}
        <div className="flex items-center gap-3">
          {isDemoCase && (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-950/80 border border-amber-600/80 text-amber-300 text-xs font-bold animate-pulse">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Fictional Demo Research Case</span>
            </span>
          )}
          <button
            onClick={handleAutoFill}
            className="bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-bold px-4 py-2.5 rounded-xl text-xs shadow-md shadow-amber-950/50 flex items-center gap-2 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Sparkles className="w-4 h-4 fill-slate-950" />
            <span>✨ AUTO-FILL RESEARCH CASE</span>
          </button>
        </div>
      </div>

      {/* Asset Selection & Search Bar */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {STOCKS_DATA.map(s => (
            <button
              key={s.symbol}
              onClick={() => {
                setSelectedSymbol(s.symbol);
                setIsDemoCase(false);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedSymbol === s.symbol
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-900/50 scale-105'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {s.symbol}
            </button>
          ))}
        </div>

        {/* Live Data Disclaimer Banner */}
        <div className="text-[11px] text-slate-400 flex items-center gap-1.5 bg-slate-950 px-3 py-1.5 rounded-lg border border-slate-800">
          <Info className="w-3.5 h-3.5 text-slate-500" />
          <span>Live data unavailable — displaying available dataset information. (Source: FINVEXA Research • Date: Q3 Fiscal)</span>
        </div>
      </div>

      {/* Company Overview Header Card */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 pb-6 border-b border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <h2 className="text-2xl font-black text-white">{stock.name}</h2>
              <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-md bg-slate-800 text-slate-300">
                {stock.symbol}
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800/80 text-cyan-400 border border-slate-700">
                {stock.market_cap_category}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-2xl leading-relaxed">
              {stock.description}
            </p>
            <div className="text-xs text-slate-300">
              <strong className="text-slate-400">Market Position:</strong> {stock.market_position}
            </div>
          </div>

          <div className="text-left md:text-right bg-slate-950/70 p-4 rounded-xl border border-slate-800 shrink-0">
            <div className="text-xs text-slate-400">Current Share Price</div>
            <div className="text-3xl font-black text-emerald-400 mt-0.5">
              ₹{stock.current_price.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              52W Range: <span className="text-slate-300">₹{stock.low_52w}</span> – <span className="text-slate-300">₹{stock.high_52w}</span>
            </div>
          </div>
        </div>

        {/* Fundamentals Stats Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-6 text-xs">
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-slate-500">Market Cap</div>
            <div className="font-bold text-white mt-0.5">₹{(stock.market_cap_cr / 1000).toFixed(1)}k Cr</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-slate-500">Revenue (TTM)</div>
            <div className="font-bold text-white mt-0.5">₹{(stock.revenue_cr / 1000).toFixed(1)}k Cr</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-slate-500">Net Profit</div>
            <div className="font-bold text-emerald-400 mt-0.5">₹{(stock.net_profit_cr / 1000).toFixed(1)}k Cr</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-slate-500">EPS</div>
            <div className="font-bold text-white mt-0.5">₹{stock.eps}</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-slate-500">Total Debt</div>
            <div className="font-bold text-sky-400 mt-0.5">₹{(stock.debt_cr / 1000).toFixed(1)}k Cr</div>
          </div>
          <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800/80">
            <div className="text-slate-500">Free Cash Flow</div>
            <div className="font-bold text-teal-400 mt-0.5">₹{(stock.free_cash_flow_cr / 1000).toFixed(1)}k Cr</div>
          </div>
        </div>
      </div>

      {/* Interactive Historical Chart & Ratios */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Interactive Multi-Metric Chart (7 cols) */}
        <div className="lg:col-span-7 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-violet-400" />
                <span>Historical Performance Trajectory</span>
              </h3>
              <p className="text-xs text-slate-400">Interactive trendlines across financial reporting periods</p>
            </div>

            {/* Timeframe Selector */}
            <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              {(['1Y', '3Y', '5Y', '10Y'] as const).map(tf => (
                <button
                  key={tf}
                  onClick={() => setTimeframe(tf)}
                  className={`px-2.5 py-1 rounded-lg font-semibold transition-all ${
                    timeframe === tf
                      ? 'bg-violet-600 text-white shadow-sm'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {tf}
                </button>
              ))}
            </div>
          </div>

          {/* Metric Tab Selector */}
          <div className="flex flex-wrap gap-2 text-xs">
            <button
              onClick={() => setActiveMetricTab('price')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                activeMetricTab === 'price'
                  ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Share Price (₹)
            </button>
            <button
              onClick={() => setActiveMetricTab('revenue')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                activeMetricTab === 'revenue'
                  ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/50'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Revenue (₹ Cr)
            </button>
            <button
              onClick={() => setActiveMetricTab('profit')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                activeMetricTab === 'profit'
                  ? 'bg-violet-500/20 text-violet-300 border-violet-500/50'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Net Profit (₹ Cr)
            </button>
            <button
              onClick={() => setActiveMetricTab('cashflow')}
              className={`px-3 py-1.5 rounded-lg border font-semibold transition-all ${
                activeMetricTab === 'cashflow'
                  ? 'bg-teal-500/20 text-teal-300 border-teal-500/50'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              Free Cash Flow
            </button>
          </div>

          {/* Clean High-Precision SVG Bar/Trend Visualization */}
          <div className="bg-slate-950/80 p-5 rounded-xl border border-slate-800/80 h-64 flex flex-col justify-between">
            <div className="flex justify-between items-center text-[11px] text-slate-500 font-mono">
              <span>Peak: ₹{maxVal.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
              <span className="capitalize">{activeMetricTab} Trendline</span>
            </div>

            <div className="flex items-end justify-between gap-4 h-44 px-4 pt-4">
              {chartData.map((point, idx) => {
                const val = activeMetricTab === 'price' ? point.price :
                            activeMetricTab === 'revenue' ? point.rev :
                            activeMetricTab === 'profit' ? point.prof : point.cf;
                const heightPercent = Math.max(15, Math.round((val / maxVal) * 100));

                return (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-2 group">
                    <div className="text-[10px] font-mono text-slate-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      ₹{val.toLocaleString('en-IN', { maximumFractionDigits: 0 })}
                    </div>
                    <div className="w-full bg-slate-900 rounded-t-lg h-36 flex items-end overflow-hidden p-0.5">
                      <div
                        style={{ height: `${heightPercent}%` }}
                        className={`w-full rounded-t transition-all duration-500 ${
                          activeMetricTab === 'price' ? 'bg-gradient-to-t from-emerald-600 to-emerald-400' :
                          activeMetricTab === 'revenue' ? 'bg-gradient-to-t from-cyan-600 to-cyan-400' :
                          activeMetricTab === 'profit' ? 'bg-gradient-to-t from-violet-600 to-violet-400' :
                          'bg-gradient-to-t from-teal-600 to-teal-400'
                        }`}
                      />
                    </div>
                    <span className="text-[11px] font-mono text-slate-400">{point.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Ratios with Interactive Tooltips (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="pb-3 border-b border-slate-800 flex items-center justify-between">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Financial Ratios & Valuation</span>
            </h3>
            <span className="text-[11px] text-slate-500">Hover for definitions</span>
          </div>

          <div className="space-y-3">
            {ratioDetails.map(ratio => (
              <div
                key={ratio.key}
                className="group relative bg-slate-950/70 p-3 rounded-xl border border-slate-800/80 hover:border-slate-700 transition-all flex items-center justify-between cursor-help"
              >
                <div>
                  <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                    <span>{ratio.label}</span>
                    <HelpCircle className="w-3.5 h-3.5 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                  </div>
                  <div className="text-[10px] text-slate-500">{ratio.meaning}</div>
                </div>

                <div className="text-sm font-black text-white font-mono">
                  {ratio.value}
                </div>

                {/* Rich Educational Hover Tooltip */}
                <div className="absolute bottom-full left-0 right-0 mb-2 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl text-[11px] text-slate-300 space-y-1.5 opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity z-30">
                  <div className="font-bold text-cyan-400">{ratio.label}</div>
                  <div><strong className="text-slate-400">Why it matters:</strong> {ratio.whyMatters}</div>
                  <div><strong className="text-slate-400">Interpretation:</strong> {ratio.interpretation}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Market, Industry & Future Outlook Scenarios */}
      <div className="bg-slate-900/60 backdrop-blur-sm border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>Future Outlook & Scenario Analysis</span>
            </h3>
            <p className="text-xs text-slate-400">
              Objective scenarios based on market dynamics (No guaranteed price forecasts provided).
            </p>
          </div>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${financialStrength.badgeClass}`}>
            Financial Strength: {financialStrength.rating}
          </span>
        </div>

        {/* 3 Scenarios: Bull, Base, Bear */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-xl p-5 space-y-2.5">
            <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
              1. Positive Scenario (Bull Case)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Rapid rollout of 5G, consumer retail store expansion, and high operating margin recovery in petrochemicals.
            </p>
            <div className="text-[11px] text-emerald-400/90 pt-2 border-t border-emerald-900/40">
              Driver: {stock.growth_factors}
            </div>
          </div>

          <div className="bg-sky-950/20 border border-sky-900/50 rounded-xl p-5 space-y-2.5">
            <div className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              2. Neutral Scenario (Base Case)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Steady domestic consumption matching GDP expansion (6%–7%), balanced capital expenditures, and predictable dividend yields.
            </p>
            <div className="text-[11px] text-sky-400/90 pt-2 border-t border-sky-900/40">
              Driver: Normalized enterprise demand and organic market share retention.
            </div>
          </div>

          <div className="bg-rose-950/20 border border-rose-900/50 rounded-xl p-5 space-y-2.5">
            <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">
              3. Risk Scenario (Bear Case)
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Global crude refining margin compression, elevated interest rates delaying payback on green capex, and regulatory interventions.
            </p>
            <div className="text-[11px] text-rose-400/90 pt-2 border-t border-rose-900/40">
              Driver: {stock.major_risks}
            </div>
          </div>
        </div>

        {/* Final Neutral Conclusion */}
        <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
          <strong className="text-white">Research Summary & Synthesis: </strong>
          {stock.name} demonstrates a {financialStrength.rating.toLowerCase()} financial profile with an entrenched position as {stock.market_position}. Investors evaluating this instrument should weigh current valuation multiples ({stock.pe_ratio} P/E) against execution progress on {stock.growth_factors}.
        </div>
      </div>
    </div>
  );
};
