# FINVEXA

> **“Understand. Analyze. Invest Smarter.”**  
> *“Built at the intersection of finance, data and intelligence.”*  
> **Creators:** Ruhaan. Nimish. Raman

---

## 1. Project Overview

**FINVEXA** is an educational financial analysis and investment research platform designed to provide intuitive yet mathematically rigorous insights for personal finance, investment discovery, asset research, side-by-side instrument comparison, and financial education.

FINVEXA provides five core analytical modules:
1. **My Financial Status:** Comprehensive personal diagnostic evaluating cash-flow solvency, savings rate, debt-to-income burden, emergency reserve coverage, insurance protection multiple, inflation purchasing power decay, diversification, and milestone readiness with an overall health classification (`HEALTHY`, `MODERATE`, or `NEEDS ATTENTION`).
2. **Find My Investment:** Multi-factor suitability matching across 10 asset classes (Equities, Bonds, Gold, Fixed Deposits, Mutual Funds, ETFs, G-Secs, REITs, PPF, NPS) with deep category drill-downs.
3. **Investment Research:** In-depth quantitative equity and asset research dossiers featuring live/dataset pricing, 52-week ranges, balance sheet fundamentals, ratio metrics with educational tooltips, historical interactive charts (1Y, 3Y, 5Y), scenario forecasting (Bull, Base, Bear), and financial strength ratings.
4. **Compare Investments:** Side-by-side factual comparison across volatility, liquidity, risk, income generation, and tax implications, synthesizing key differences without declaring a biased single winner.
5. **Finance Knowledge:** An educational knowledge repository defining fundamental investment instruments, financial concepts, and analytical ratios with step-by-step examples and formulas (strictly no auto-fill, as specified).
6. **Source Code Explorer (`</> View Source Code`):** Real-time project code viewer with line numbers, syntax highlighting, search, and one-click ZIP download.

---

## 2. Technical Stack

- **Core Backend:** Python 3.10+
- **Web Framework:** Flask 3.0+
- **Data Engineering & Analysis:** Pandas, NumPy
- **Relational Data Layer:** SQLite3 (`instance/finvexa.db`) and CSV Datasets (`data/`)
- **Frontend Presentation:** HTML5, Modern CSS (Tailwind CSS fintech palette), Vanilla JavaScript, Chart.js for data visualizations
- **Demo & Auto-Fill Engine:** Python-based randomized scenario generation for Features 1–4

---

## 3. Required Python Version

- **Python 3.10** or higher is required.  
  Verify your installed version:
  ```bash
  python3 --version
  ```

---

## 4. Local Installation & Setup

### Step 1: Clone or Extract Repository
```bash
git clone <repository-url>
cd FINVEXA
```

### Step 2: Create a Virtual Environment (Recommended)
```bash
python3 -m venv venv

# On macOS/Linux:
source venv/bin/activate

# On Windows:
venv\Scripts\activate
```

### Step 3: Install Dependencies
```bash
pip install -r requirements.txt
```

---

## 5. How to Start the Application

Run the application entry point:
```bash
python app.py
```

Output:
```text
 * Serving Flask app 'app'
 * Debug mode: on
 * Running on http://127.0.0.1:5000 (Press CTRL+C to quit)
```

---

## 6. How to Open in a Browser

Open your preferred web browser (Google Chrome, Firefox, Safari, or Microsoft Edge) and navigate to:
```
http://127.0.0.1:5000
```
or
```
http://localhost:5000
```

---

## 7. Project Structure

```text
FINVEXA/
│
├── app.py                      # Primary Flask application router & API gateway
├── requirements.txt            # Python dependencies specification
├── README.md                   # Complete system documentation
│
├── data/                       # Structured financial datasets
│   ├── stocks.csv              # Equities (large/mid/small cap, ratios, financials)
│   ├── bonds.csv               # Sovereign, PSU, and corporate bonds
│   ├── mutual_funds.csv        # Active & passive mutual fund schemes
│   ├── gold.csv                # SGBs, Gold ETFs, digital gold, and physical bullion
│   ├── fds.csv                 # Fixed deposit products & interest matrices
│   ├── etfs.csv                # Index and sectoral exchange-traded funds
│   ├── government_securities.csv # G-Secs, T-Bills, and State Development Loans
│   ├── reits.csv               # Real estate investment trusts
│   ├── ppf.csv                 # Public Provident Fund parameters
│   └── nps.csv                 # National Pension System tiers and allocations
│
├── analysis/                   # Modular algorithmic engines
│   ├── financial_status.py     # Solvency, ratios, health classification
│   ├── investment_finder.py    # Risk-profile matching & compatibility scoring
│   ├── investment_research.py  # Deep research dossiers & scenario modeling
│   └── comparison.py           # Multi-asset side-by-side comparative analysis
│
├── demo/                       # Educational demo generator
│   └── auto_fill.py            # Dynamic non-repeating scenario generators (1-4)
│
├── templates/                  # Jinja2 HTML templates
│   ├── index.html              # Homepage landing page
│   ├── financial_status.html   # Personal financial analysis module
│   ├── find_investment.html    # Investment discovery & drill-down module
│   ├── research.html           # In-depth asset research dashboard
│   ├── compare.html            # Side-by-side asset comparison tool
│   ├── knowledge.html          # Educational financial encyclopedia
│   └── source_code.html        # Interactive code browser
│
├── static/                     # Web assets
│   ├── css/
│   │   └── style.css           # Custom fintech dark-mode stylesheet
│   └── js/
│       └── script.js           # Interactive UI, charts, and AJAX controllers
│
└── instance/
    └── finvexa.db              # Local SQLite database cache
```

---

## 8. How Datasets Work

All financial datasets in FINVEXA reside in the `/data/` directory as structured CSV tables.
- **Sample vs. Live Data Notice:** As per financial transparency guidelines, all data points are tagged with their origin and timestamp. If an active market connection is offline, the interface displays:  
  *“Live data unavailable — displaying available dataset information.”*
- **Extensibility:** The data ingestion functions in `analysis/investment_research.py` and `app.py` read via standard Python `csv` and `pandas` readers. This modular architecture allows connecting real-time financial APIs (e.g., NSE, AlphaVantage, Yahoo Finance, RBI) by updating the retrieval adapters.

---

## 9. Auto-Fill Feature Details

As requested by the specification:
- **Features 1, 2, 3, and 4** contain dedicated **✨ Auto-Fill** buttons that generate completely randomized, non-repeating fictional educational scenarios upon every click.
- Each scenario is visibly tagged: `Fictional Demo Scenario`, `Fictional Demo Research Case`, or `Fictional Demo Comparison`.
- **Feature 5 (Finance Knowledge)** strictly contains **NO** auto-fill button.

---

## 10. Financial Disclaimer

> **FINVEXA is an educational financial analysis and research platform.** Its outputs are based on the information and datasets provided and should not be treated as guaranteed investment advice or a promise of future returns. Users should independently verify information and consider qualified professional advice where appropriate.  
> **Past performance does not guarantee future results.**

---

## 11. Authors & Attribution

Created by:  
**Ruhaan. Nimish. Raman**
