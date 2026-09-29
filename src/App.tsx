/**
 * FINVEXA — Master Application Root
 * Brand: FINVEXA
 * Tagline: “Understand. Analyze. Invest Smarter.”
 * Statement: “Built at the intersection of finance, data and intelligence.”
 * Creators: Ruhaan. Nimish. Raman
 */

import React, { useState, useEffect } from 'react';
import { ViewMode } from './types';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomeHero } from './components/HomeHero';
import { FinancialStatusView } from './components/FinancialStatusView';
import { FindInvestmentView } from './components/FindInvestmentView';
import { InvestmentResearchView } from './components/InvestmentResearchView';
import { CompareInvestmentsView } from './components/CompareInvestmentsView';
import { FinanceKnowledgeView } from './components/FinanceKnowledgeView';
import { SourceCodeView } from './components/SourceCodeView';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [researchSymbol, setResearchSymbol] = useState<string>('RELIANCE');

  // Scroll to top when view changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  const handleNavigateToResearch = (symbolOrId: string) => {
    setResearchSymbol(symbolOrId);
    setCurrentView('research');
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col antialiased selection:bg-emerald-500/25 selection:text-emerald-300">
      {/* Sticky Navigation */}
      <Navbar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content Area */}
      <main className="flex-grow">
        {currentView === 'home' && <HomeHero onNavigate={setCurrentView} />}
        {currentView === 'financial_status' && <FinancialStatusView />}
        {currentView === 'find_investment' && (
          <FindInvestmentView onNavigateToResearch={handleNavigateToResearch} />
        )}
        {currentView === 'research' && (
          <InvestmentResearchView initialSymbol={researchSymbol} />
        )}
        {currentView === 'compare' && <CompareInvestmentsView />}
        {currentView === 'knowledge' && <FinanceKnowledgeView />}
        {currentView === 'source_code' && <SourceCodeView />}
      </main>

      {/* Institutional Fintech Footer */}
      <Footer />
    </div>
  );
}
