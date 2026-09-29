"""
FINVEXA - Fictional Scenario Generator (Auto-Fill Engine)
Authors: Ruhaan, Nimish, Raman
Brand: FINVEXA — Understand. Analyze. Invest Smarter.

Generates realistic, completely randomized, educational demo scenarios
for Feature 1 (Financial Status), Feature 2 (Find Investment),
Feature 3 (Investment Research), and Feature 4 (Comparison).
"""

import random
from typing import Dict, Any


OCCUPATIONS = [
    'Software Engineer', 'Product Manager', 'Data Scientist',
    'Financial Analyst', 'Civil Engineer', 'Chartered Accountant',
    'Physician / Doctor', 'Marketing Director', 'Small Business Owner',
    'Operations Manager', 'High School Educator', 'Architect'
]

GOALS_POOL = [
    'Emergency fund', 'Wealth creation', 'House', 'Education',
    'Retirement', 'Vehicle', 'Other'
]


def generate_financial_profile() -> Dict[str, Any]:
    """Generates a randomized, realistic scenario for Feature 1 (My Financial Status)."""
    age = random.choice([24, 27, 30, 34, 38, 42, 48, 55])
    occupation = random.choice(OCCUPATIONS)
    dependents = random.choice([0, 1, 2, 3]) if age > 25 else 0

    # Base income scaled loosely by age
    if age < 30:
        base_income = random.choice([45000, 65000, 85000, 110000])
    elif age < 40:
        base_income = random.choice([95000, 135000, 180000, 240000])
    else:
        base_income = random.choice([140000, 210000, 320000, 450000])

    other_income = random.choice([0, 5000, 12000, 25000, 0, 0])
    total_in = base_income + other_income

    # Realistic expense fractions
    rent = round(total_in * random.uniform(0.15, 0.28) / 1000) * 1000
    household = round(total_in * random.uniform(0.10, 0.20) / 1000) * 1000
    food = round(total_in * random.uniform(0.08, 0.14) / 1000) * 1000
    transport = round(total_in * random.uniform(0.04, 0.08) / 1000) * 1000
    education = round(total_in * random.uniform(0.05, 0.12) / 1000) * 1000 if dependents > 0 else 0
    discretionary = round(total_in * random.uniform(0.05, 0.12) / 1000) * 1000

    has_debt = random.choice([True, False, True])
    if has_debt:
        emi = round(total_in * random.uniform(0.12, 0.32) / 1000) * 1000
        total_debt = emi * random.randint(24, 84)
        interest_rate = random.choice([8.5, 9.2, 10.5, 12.0])
        cc_debt = random.choice([0, 0, 15000, 35000]) if random.random() < 0.3 else 0
    else:
        emi = 0
        total_debt = 0
        interest_rate = 0.0
        cc_debt = 0

    # Savings & assets
    bank_savings = round(total_in * random.uniform(0.5, 2.5) / 5000) * 5000
    cash_savings = random.choice([5000, 10000, 25000, 40000])
    emergency_fund = round(total_in * random.uniform(0.5, 4.0) / 10000) * 10000
    existing_investments = round(total_in * random.uniform(2.0, 18.0) / 25000) * 25000

    # Insurance
    has_health = random.choice([True, True, False])
    has_life = random.choice([True, False]) if dependents > 0 else random.choice([True, False, False])
    coverage_amount = (total_in * 12 * random.choice([5, 10, 15, 20])) if has_life else 0

    # Sample 2-4 goals
    sample_size = random.randint(2, 4)
    selected_goals = random.sample(GOALS_POOL, sample_size)

    return {
        'is_demo': True,
        'scenario_label': 'Fictional Demo Scenario',
        'age': age,
        'occupation': occupation,
        'dependents': dependents,
        'monthly_income': base_income,
        'other_income': other_income,
        'income_stability': random.choice(['Stable', 'High', 'Moderate']),
        'household_exp': household,
        'rent': rent,
        'emi': emi,
        'education_exp': education,
        'transport_exp': transport,
        'food_exp': food,
        'discretionary_exp': discretionary,
        'bank_savings': bank_savings,
        'cash_savings': cash_savings,
        'emergency_fund': emergency_fund,
        'monthly_savings': max(0, total_in - (rent + household + food + transport + education + discretionary + emi)),
        'existing_investments': existing_investments,
        'total_debt': total_debt,
        'interest_rate': interest_rate,
        'cc_debt': cc_debt,
        'health_insurance': has_health,
        'life_insurance': has_life,
        'coverage_amount': coverage_amount,
        'goals': selected_goals
    }


def generate_investor_profile() -> Dict[str, Any]:
    """Generates a randomized fictional investor profile for Feature 2 (Find My Investment)."""
    age = random.choice([23, 28, 33, 39, 45, 52])
    income = random.choice([50000, 85000, 120000, 175000, 250000])
    expenses = round(income * random.uniform(0.40, 0.65) / 5000) * 5000
    savings = round(income * random.uniform(1.5, 8.0) / 10000) * 10000
    invest_amount = round(income * random.uniform(0.8, 3.5) / 10000) * 10000

    risk_tolerance = random.choice(['Low', 'Moderate', 'High'])
    duration = random.choice(['Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'])
    goals = ['Capital stability', 'Regular income', 'Long-term growth', 'Inflation protection', 'Wealth creation', 'Diversification']
    goal = random.choice(goals)

    preferences = ['Capital stability', 'Regular income', 'Growth', 'Inflation protection', 'Liquidity', 'Diversification']
    pref = random.choice(preferences)

    return {
        'is_demo': True,
        'scenario_label': 'Fictional Demo Scenario',
        'age': age,
        'monthly_income': income,
        'monthly_expenses': expenses,
        'savings': savings,
        'amount_to_invest': invest_amount,
        'existing_investments': savings * random.choice([0.5, 1.2, 2.5]),
        'debt': random.choice([0, 150000, 450000, 1200000]),
        'dependents': random.choice([0, 1, 2]),
        'risk_tolerance': risk_tolerance,
        'duration': duration,
        'financial_goal': goal,
        'liquidity_requirement': random.choice(['High', 'Moderate', 'Low']),
        'investment_experience': random.choice(['Beginner', 'Intermediate', 'Experienced']),
        'loss_tolerance': random.choice(['Minimal (Capital safety priority)', 'Moderate (Can tolerate 10-15% dips)', 'High (Focused on maximum long-term return)']),
        'investment_preferences': pref
    }


def generate_research_case() -> Dict[str, Any]:
    """Generates a randomized research case for Feature 3 (Investment Research)."""
    options = [
        {'type': 'shares', 'id': 'RELIANCE', 'label': 'Reliance Industries Ltd (Shares)'},
        {'type': 'shares', 'id': 'TCS', 'label': 'Tata Consultancy Services (Shares)'},
        {'type': 'shares', 'id': 'HDFCBANK', 'label': 'HDFC Bank Ltd (Shares)'},
        {'type': 'shares', 'id': 'TATAMOTORS', 'label': 'Tata Motors Ltd (Shares)'},
        {'type': 'shares', 'id': 'ITC', 'label': 'ITC Ltd (Shares)'},
        {'type': 'gold', 'id': 'GOLD001', 'label': 'Sovereign Gold Bond - SGB (Gold)'},
        {'type': 'bonds', 'id': 'BOND001', 'label': '7.18% GOI 2033 Sovereign Bond (Bonds)'},
        {'type': 'mutual_funds', 'id': 'MF001', 'label': 'Parag Parikh Flexi Cap Fund (Mutual Funds)'},
        {'type': 'fds', 'id': 'FD001', 'label': 'SBI Regular Term Deposit (Fixed Deposits)'},
        {'type': 'etfs', 'id': 'NIFTYBEES', 'label': 'Nippon India ETF Nifty BeES (ETFs)'}
    ]
    pick = random.choice(options)
    return {
        'is_demo': True,
        'scenario_label': 'Fictional Demo Research Case',
        'type': pick['type'],
        'id': pick['id'],
        'label': pick['label']
    }


def generate_comparison_case() -> Dict[str, Any]:
    """Generates a randomized comparison case for Feature 4 (Compare Investments)."""
    pairs = [
        ('gold', 'fds', 'Gold vs Fixed Deposit'),
        ('RELIANCE', 'TCS', 'Reliance Industries vs Tata Consultancy Services'),
        ('BOND001', 'BOND002', '7.18% Sovereign GOI Bond vs HDFC Tier-II Bond'),
        ('MF001', 'MF004', 'Parag Parikh Flexi Cap vs ICICI Balanced Advantage'),
        ('NIFTYBEES', 'GOLDBEES', 'Nifty 50 BeES ETF vs Gold BeES ETF'),
        ('fds', 'mutual_funds', 'Bank Fixed Deposit vs Corporate Bond Mutual Fund'),
        ('HDFCBANK', 'TATAMOTORS', 'HDFC Bank Ltd vs Tata Motors Ltd')
    ]
    pair = random.choice(pairs)
    return {
        'is_demo': True,
        'scenario_label': 'Fictional Demo Comparison',
        'id_a': pair[0],
        'id_b': pair[1],
        'label': pair[2]
    }
