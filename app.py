"""
FINVEXA - Main Flask Web Application
Authors: Ruhaan. Nimish. Raman
Tagline: “Understand. Analyze. Invest Smarter.”
Brand Statement: “Built at the intersection of finance, data and intelligence.”

Primary Flask server powering FINVEXA financial diagnostics, investment discovery,
research dossiers, comparative matrix, financial education, and source explorer.
"""

import os
import sqlite3
from flask import Flask, render_template, request, jsonify, abort, send_file
from analysis.financial_status import calculate_financial_status
from analysis.investment_finder import match_investments
from analysis.investment_research import get_stock_research, load_dataset
from analysis.comparison import compare_two_investments
from demo.auto_fill import (
    generate_financial_profile,
    generate_investor_profile,
    generate_research_case,
    generate_comparison_case
)

app = Flask(__name__)
app.config['SECRET_KEY'] = os.environ.get('FINVEXA_SECRET_KEY', 'finvexa_production_secret_key_2026')

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
INSTANCE_DIR = os.path.join(BASE_DIR, 'instance')
os.makedirs(INSTANCE_DIR, exist_ok=True)
DB_PATH = os.path.join(INSTANCE_DIR, 'finvexa.db')


def init_db():
    """Initializes local SQLite database for caching and session state."""
    conn = sqlite3.connect(DB_PATH)
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS audit_log (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            module TEXT NOT NULL,
            action TEXT NOT NULL,
            timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)
    conn.commit()
    conn.close()


init_db()


# -------------------------------------------------------------
# 1. HOMEPAGE
# -------------------------------------------------------------
@app.route('/')
def index():
    return render_template('index.html')


# -------------------------------------------------------------
# 2. FEATURE 1 — MY FINANCIAL STATUS
# -------------------------------------------------------------
@app.route('/financial-status', methods=['GET', 'POST'])
def financial_status():
    if request.method == 'POST':
        is_autofill = request.form.get('autofill') == 'true'
        if is_autofill:
            profile_data = generate_financial_profile()
        else:
            profile_data = {
                'age': int(request.form.get('age', 28)),
                'occupation': request.form.get('occupation', 'Professional'),
                'dependents': int(request.form.get('dependents', 0)),
                'monthly_income': float(request.form.get('monthly_income', 85000)),
                'other_income': float(request.form.get('other_income', 0)),
                'income_stability': request.form.get('income_stability', 'Stable'),
                'household_exp': float(request.form.get('household_exp', 25000)),
                'rent': float(request.form.get('rent', 20000)),
                'emi': float(request.form.get('emi', 12000)),
                'education_exp': float(request.form.get('education_exp', 0)),
                'transport_exp': float(request.form.get('transport_exp', 5000)),
                'food_exp': float(request.form.get('food_exp', 10000)),
                'discretionary_exp': float(request.form.get('discretionary_exp', 6000)),
                'bank_savings': float(request.form.get('bank_savings', 120000)),
                'cash_savings': float(request.form.get('cash_savings', 10000)),
                'emergency_fund': float(request.form.get('emergency_fund', 150000)),
                'existing_investments': float(request.form.get('existing_investments', 350000)),
                'total_debt': float(request.form.get('total_debt', 450000)),
                'interest_rate': float(request.form.get('interest_rate', 8.5)),
                'cc_debt': float(request.form.get('cc_debt', 0)),
                'health_insurance': bool(request.form.get('health_insurance')),
                'life_insurance': bool(request.form.get('life_insurance')),
                'coverage_amount': float(request.form.get('coverage_amount', 10000000)),
                'goals': request.form.getlist('goals') or ['Wealth creation', 'Emergency fund']
            }
        result = calculate_financial_status(profile_data)
        return render_template('financial_status.html', form=profile_data, result=result)

    # Initial GET request with realistic default profile
    default_profile = generate_financial_profile()
    result = calculate_financial_status(default_profile)
    return render_template('financial_status.html', form=default_profile, result=result)


# -------------------------------------------------------------
# 3. FEATURE 2 — FIND MY INVESTMENT
# -------------------------------------------------------------
@app.route('/find-investment', methods=['GET', 'POST'])
def find_investment():
    if request.method == 'POST' and request.form.get('autofill') == 'true':
        profile = generate_investor_profile()
    else:
        profile = {
            'risk_tolerance': request.form.get('risk_tolerance', 'Moderate'),
            'duration': request.form.get('duration', '3–5 years'),
            'financial_goal': request.form.get('financial_goal', 'Long-term growth'),
            'liquidity_requirement': request.form.get('liquidity_requirement', 'Moderate'),
            'loss_tolerance': request.form.get('loss_tolerance', 'Moderate')
        }
    matched = match_investments(profile)
    return render_template('find_investment.html', profile=profile, matched_avenues=matched)


# -------------------------------------------------------------
# 4. FEATURE 3 — INVESTMENT RESEARCH
# -------------------------------------------------------------
@app.route('/research')
def research():
    is_autofill = request.args.get('autofill') == 'true'
    if is_autofill:
        case = generate_research_case()
        symbol = case['id']
    else:
        symbol = request.args.get('symbol', 'RELIANCE')

    stock_data = get_stock_research(symbol)
    return render_template('research.html', stock=stock_data)


# -------------------------------------------------------------
# 5. FEATURE 4 — COMPARE INVESTMENTS
# -------------------------------------------------------------
@app.route('/compare')
def compare():
    is_autofill = request.args.get('autofill') == 'true'
    if is_autofill:
        demo_pair = generate_comparison_case()
        id_a = demo_pair['id_a']
        id_b = demo_pair['id_b']
    else:
        id_a = request.args.get('a', 'gold')
        id_b = request.args.get('b', 'fds')

    # Example object representation for comparison
    item_a = {
        'name': 'Gold (SGB / Sovereign)',
        'category': 'Precious Metals & Commodities',
        'risk_level': 'Moderate',
        'return_display': '11% – 14% (5Y CAGR)',
        'liquidity': 'Moderate (8-yr maturity with secondary trading)',
        'income_type': '2.5% p.a. Semi-annual Interest',
        'ideal_horizon': '3–8 Years',
        'tax_info': '100% Tax-Free capital gains at 8Y maturity',
        'advantage': 'Exceptional hedge against currency depreciation and high inflation.',
        'risk': 'Price volatility in short horizons; no dividend compounding.'
    }
    item_b = {
        'name': 'Fixed Deposit (Bank Term Deposit)',
        'category': 'Cash Equivalents & Debt',
        'risk_level': 'Low',
        'return_display': '6.8% – 7.2% Fixed',
        'liquidity': 'High (Subject to 0.5%–1% premature penalty)',
        'income_type': 'Guaranteed Periodic Interest',
        'ideal_horizon': '1–3 Years',
        'tax_info': 'Interest taxed as per individual income slab',
        'advantage': 'Guaranteed principal safety insured up to ₹5 Lakh by DICGC.',
        'risk': 'Real returns may fall behind inflation post tax.'
    }

    comparison = compare_two_investments(item_a, item_b)
    return render_template('compare.html', comparison=comparison)


# -------------------------------------------------------------
# 6. FEATURE 5 — FINANCE KNOWLEDGE (NO AUTO-FILL)
# -------------------------------------------------------------
@app.route('/knowledge')
def knowledge():
    return render_template('knowledge.html')


# -------------------------------------------------------------
# 7. SOURCE CODE VIEWER
# -------------------------------------------------------------
@app.route('/source-code')
def source_code():
    return render_template('source_code.html')


@app.route('/api/source-file')
def api_source_file():
    """Safely serves source files for the in-browser syntax explorer."""
    req_path = request.args.get('path', 'app.py').replace('..', '')
    safe_path = os.path.join(BASE_DIR, req_path)
    if os.path.exists(safe_path) and os.path.isfile(safe_path):
        with open(safe_path, 'r', encoding='utf-8', errors='ignore') as f:
            return f.read()
    abort(404)


# -------------------------------------------------------------
# API AUTO-FILL JSON ENDPOINTS
# -------------------------------------------------------------
@app.route('/api/demo/financial-status')
def api_demo_financial():
    data = generate_financial_profile()
    analysis = calculate_financial_status(data)
    return jsonify({'profile': data, 'analysis': analysis})


@app.route('/api/demo/investor-profile')
def api_demo_investor():
    profile = generate_investor_profile()
    matched = match_investments(profile)
    return jsonify({'profile': profile, 'matched': matched})


@app.route('/api/demo/research-case')
def api_demo_research():
    case = generate_research_case()
    research_dossier = get_stock_research(case['id'])
    return jsonify({'case': case, 'dossier': research_dossier})


@app.route('/api/demo/comparison')
def api_demo_comparison():
    return jsonify(generate_comparison_case())


# -------------------------------------------------------------
# ERROR HANDLERS (404 and 500)
# -------------------------------------------------------------
@app.errorhandler(404)
def page_not_found(e):
    return (
        "<div style='background:#030712;color:#f3f4f6;padding:50px;text-align:center;font-family:sans-serif;'>"
        "<h1>404 — Page not found.</h1>"
        "<p>The requested financial analysis resource does not exist.</p>"
        "<a href='/' style='color:#10b981;text-decoration:none;'>Return to FINVEXA Home</a>"
        "</div>",
        404
    )


@app.errorhandler(500)
def internal_server_error(e):
    return (
        "<div style='background:#030712;color:#f3f4f6;padding:50px;text-align:center;font-family:sans-serif;'>"
        "<h1>500 — Something went wrong. Please try again.</h1>"
        "<p>Our financial data engine encountered an unexpected condition. Please refresh or retry shortly.</p>"
        "<a href='/' style='color:#10b981;text-decoration:none;'>Return to FINVEXA Home</a>"
        "</div>",
        500
    )


if __name__ == '__main__':
    print("FINVEXA Financial Engine starting on port 5000...")
    print("Understand. Analyze. Invest Smarter.")
    print("Creators: Ruhaan. Nimish. Raman")
    app.run(host='0.0.0.0', port=5000, debug=True)
