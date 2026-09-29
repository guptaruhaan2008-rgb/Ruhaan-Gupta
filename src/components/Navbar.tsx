import React, { useState } from 'react';
import { ViewMode } from '../types';
import { 
  BarChart3, 
  Compass, 
  Search, 
  Scale, 
  GraduationCap, 
  Code2, 
  Menu, 
  X,
  TrendingUp
} from 'lucide-react';

interface NavbarProps {
  currentView: ViewMode;
  onNavigate: (view: ViewMode) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'financial_status' as ViewMode, label: '1. My Financial Status', icon: BarChart3 },
    { id: 'find_investment' as ViewMode, label: '2. Find My Investment', icon: Compass },
    { id: 'research' as ViewMode, label: '3. Investment Research', icon: Search },
    { id: 'compare' as ViewMode, label: '4. Compare Investments', icon: Scale },
    { id: 'knowledge' as ViewMode, label: '5. Finance Knowledge', icon: GraduationCap },
    { id: 'source_code' as ViewMode, label: '</> View Source Code', icon: Code2, isCode: true }
  ];

  return (
    <header className="sticky top-0 z-50 bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <button 
          onClick={() => onNavigate('home')}
          className="flex items-center space-x-2.5 text-left group focus:outline-none"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-500 via-teal-500 to-cyan-500 flex items-center justify-center font-black text-slate-950 text-xl shadow-lg shadow-emerald-500/10 group-hover:scale-105 transition-transform">
            <TrendingUp className="w-5 h-5 text-slate-950 stroke-[2.5]" />
          </div>
          <div>
            <div className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
              FINVEXA
            </div>
            <div className="text-[10px] text-slate-400 font-medium tracking-wider hidden sm:block -mt-1">
              FINANCE • DATA • INTELLIGENCE
            </div>
          </div>
        </button>

        {/* Desktop Nav Items */}
        <nav className="hidden lg:flex items-center space-x-1 text-sm font-medium">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  item.isCode
                    ? isActive 
                      ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                      : 'text-cyan-400 hover:text-cyan-300 hover:bg-cyan-950/40'
                    : isActive
                      ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-900/60'
                }`}
              >
                <Icon className="w-3.5 h-3.5 opacity-80" />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Action Button & Mobile Menu Toggle */}
        <div className="flex items-center space-x-3">
          <button
            onClick={() => onNavigate('financial_status')}
            className="hidden sm:inline-flex items-center gap-1.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-bold px-4 py-2 rounded-xl text-xs shadow-md shadow-emerald-950/50 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            Start Financial Analysis
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-white hover:bg-slate-900 focus:outline-none"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/95 border-b border-slate-800 px-4 pt-2 pb-6 space-y-2 backdrop-blur-xl">
          {navItems.map(item => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  onNavigate(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium flex items-center gap-2.5 ${
                  isActive
                    ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                    : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </button>
            );
          })}
          <div className="pt-2">
            <button
              onClick={() => {
                onNavigate('financial_status');
                setMobileMenuOpen(false);
              }}
              className="w-full text-center bg-emerald-500 text-slate-950 font-bold py-2.5 rounded-xl text-sm"
            >
              Start Financial Analysis
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
