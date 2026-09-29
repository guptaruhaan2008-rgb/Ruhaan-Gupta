// Real project source files imported with Vite ?raw
import appPy from '../../app.py?raw';
import requirementsTxt from '../../requirements.txt?raw';
import readmeMd from '../../README.md?raw';

import financialStatusPy from '../../analysis/financial_status.py?raw';
import investmentFinderPy from '../../analysis/investment_finder.py?raw';
import investmentResearchPy from '../../analysis/investment_research.py?raw';
import comparisonPy from '../../analysis/comparison.py?raw';

import autoFillPy from '../../demo/auto_fill.py?raw';

import stocksCsv from '../../data/stocks.csv?raw';
import bondsCsv from '../../data/bonds.csv?raw';
import mutualFundsCsv from '../../data/mutual_funds.csv?raw';
import goldCsv from '../../data/gold.csv?raw';
import fdsCsv from '../../data/fds.csv?raw';
import etfsCsv from '../../data/etfs.csv?raw';
import gsecCsv from '../../data/government_securities.csv?raw';
import reitsCsv from '../../data/reits.csv?raw';
import ppfCsv from '../../data/ppf.csv?raw';
import npsCsv from '../../data/nps.csv?raw';

import indexHtml from '../../templates/index.html?raw';
import financialStatusHtml from '../../templates/financial_status.html?raw';
import findInvestmentHtml from '../../templates/find_investment.html?raw';
import researchHtml from '../../templates/research.html?raw';
import compareHtml from '../../templates/compare.html?raw';
import knowledgeHtml from '../../templates/knowledge.html?raw';
import sourceCodeHtml from '../../templates/source_code.html?raw';

import styleCss from '../../static/css/style.css?raw';
import scriptJs from '../../static/js/script.js?raw';

export interface SourceFileItem {
  path: string;
  category: 'Root' | 'Analysis' | 'Demo' | 'Data' | 'Templates' | 'Static';
  language: 'python' | 'markdown' | 'text' | 'html' | 'css' | 'javascript' | 'csv';
  content: string;
}

export const PROJECT_SOURCE_FILES: SourceFileItem[] = [
  { path: 'app.py', category: 'Root', language: 'python', content: appPy },
  { path: 'requirements.txt', category: 'Root', language: 'text', content: requirementsTxt },
  { path: 'README.md', category: 'Root', language: 'markdown', content: readmeMd },

  { path: 'analysis/financial_status.py', category: 'Analysis', language: 'python', content: financialStatusPy },
  { path: 'analysis/investment_finder.py', category: 'Analysis', language: 'python', content: investmentFinderPy },
  { path: 'analysis/investment_research.py', category: 'Analysis', language: 'python', content: investmentResearchPy },
  { path: 'analysis/comparison.py', category: 'Analysis', language: 'python', content: comparisonPy },

  { path: 'demo/auto_fill.py', category: 'Demo', language: 'python', content: autoFillPy },

  { path: 'data/stocks.csv', category: 'Data', language: 'csv', content: stocksCsv },
  { path: 'data/bonds.csv', category: 'Data', language: 'csv', content: bondsCsv },
  { path: 'data/mutual_funds.csv', category: 'Data', language: 'csv', content: mutualFundsCsv },
  { path: 'data/gold.csv', category: 'Data', language: 'csv', content: goldCsv },
  { path: 'data/fds.csv', category: 'Data', language: 'csv', content: fdsCsv },
  { path: 'data/etfs.csv', category: 'Data', language: 'csv', content: etfsCsv },
  { path: 'data/government_securities.csv', category: 'Data', language: 'csv', content: gsecCsv },
  { path: 'data/reits.csv', category: 'Data', language: 'csv', content: reitsCsv },
  { path: 'data/ppf.csv', category: 'Data', language: 'csv', content: ppfCsv },
  { path: 'data/nps.csv', category: 'Data', language: 'csv', content: npsCsv },

  { path: 'templates/index.html', category: 'Templates', language: 'html', content: indexHtml },
  { path: 'templates/financial_status.html', category: 'Templates', language: 'html', content: financialStatusHtml },
  { path: 'templates/find_investment.html', category: 'Templates', language: 'html', content: findInvestmentHtml },
  { path: 'templates/research.html', category: 'Templates', language: 'html', content: researchHtml },
  { path: 'templates/compare.html', category: 'Templates', language: 'html', content: compareHtml },
  { path: 'templates/knowledge.html', category: 'Templates', language: 'html', content: knowledgeHtml },
  { path: 'templates/source_code.html', category: 'Templates', language: 'html', content: sourceCodeHtml },

  { path: 'static/css/style.css', category: 'Static', language: 'css', content: styleCss },
  { path: 'static/js/script.js', category: 'Static', language: 'javascript', content: scriptJs }
];
