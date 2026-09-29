"""
FINVEXA - Financial Status Analysis Engine
Authors: Ruhaan, Nimish, Raman
Brand: FINVEXA — Understand. Analyze. Invest Smarter.

Calculates personal financial health metrics, diagnostics, ratios,
and provides educational recommendations.
"""

from typing import Dict, Any, List


def calculate_financial_status(data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Analyzes personal financial metrics and returns structured evaluation.
    Handles income, expenses, debt burden, emergency reserves, insurance protection,
    inflation vulnerability, diversification, and goal readiness.
    """
    # Extract & sanitize numeric values
    age = max(18, int(data.get('age', 28)))
    monthly_income = max(0.0, float(data.get('monthly_income', 0)))
    other_income = max(0.0, float(data.get('other_income', 0)))
    total_monthly_income = monthly_income + other_income
    annual_income = total_monthly_income * 12

    # Expenses breakdown
    household_exp = max(0.0, float(data.get('household_exp', 0)))
    rent = max(0.0, float(data.get('rent', 0)))
    emi = max(0.0, float(data.get('emi', 0)))
    education_exp = max(0.0, float(data.get('education_exp', 0)))
    transport_exp = max(0.0, float(data.get('transport_exp', 0)))
    food_exp = max(0.0, float(data.get('food_exp', 0)))
    discretionary_exp = max(0.0, float(data.get('discretionary_exp', 0)))

    total_monthly_expenses = (
        household_exp + rent + emi + education_exp + transport_exp + food_exp + discretionary_exp
    )

    # Savings & Assets
    bank_savings = max(0.0, float(data.get('bank_savings', 0)))
    cash_savings = max(0.0, float(data.get('cash_savings', 0)))
    emergency_fund = max(0.0, float(data.get('emergency_fund', 0)))
    monthly_savings = max(0.0, float(data.get('monthly_savings', 0)))
    existing_investments = max(0.0, float(data.get('existing_investments', 0)))
    total_liquid_reserves = bank_savings + cash_savings + emergency_fund

    # Debt
    total_debt = max(0.0, float(data.get('total_debt', 0)))
    interest_rate = max(0.0, float(data.get('interest_rate', 0)))
    cc_debt = max(0.0, float(data.get('cc_debt', 0)))

    # Insurance
    coverage_amount = max(0.0, float(data.get('coverage_amount', 0)))
    has_health = bool(data.get('health_insurance', False))
    has_life = bool(data.get('life_insurance', False))
    dependents = max(0, int(data.get('dependents', 0)))

    # Goals & Qualitative
    goals: List[str] = data.get('goals', [])
    income_stability = str(data.get('income_stability', 'Stable'))

    # Core Metrics Calculations
    monthly_surplus = total_monthly_income - total_monthly_expenses
    savings_rate_pct = (monthly_surplus / total_monthly_income * 100) if total_monthly_income > 0 else 0.0
    debt_to_income_pct = (emi / total_monthly_income * 100) if total_monthly_income > 0 else 0.0
    emergency_months = (total_liquid_reserves / total_monthly_expenses) if total_monthly_expenses > 0 else 0.0

    # Insurance sufficiency (Ideal: 10x - 15x annual income if dependents exist)
    insurance_multiple = (coverage_amount / annual_income) if annual_income > 0 else 0.0

    # 10-Year Inflation impact (assuming 6% annual inflation)
    inflation_rate = 0.06
    purchasing_power_loss_10y = 1.0 - (1.0 / ((1.0 + inflation_rate) ** 10))
    purchasing_power_loss_pct = round(purchasing_power_loss_10y * 100, 1)

    # Health Assessments for each individual card
    # 1. Income Health
    if total_monthly_income <= 0:
        income_status = 'NEEDS ATTENTION'
        income_text = 'No monthly income reported. Financial solvency depends on immediate income creation.'
    elif income_stability == 'High' or income_stability == 'Stable':
        income_status = 'HEALTHY' if monthly_surplus > 0 else 'MODERATE'
        income_text = f"Steady monthly cash flow of ₹{total_monthly_income:,.0f} with {income_stability.lower()} stability."
    else:
        income_status = 'MODERATE'
        income_text = f"Monthly inflow of ₹{total_monthly_income:,.0f} with variable or fluctuating stability."

    # 2. Savings Health
    if savings_rate_pct >= 25.0:
        savings_status = 'HEALTHY'
        savings_text = f"Excellent savings rate of {savings_rate_pct:.1f}%, exceeding the benchmark 20% guideline."
    elif savings_rate_pct >= 10.0:
        savings_status = 'MODERATE'
        savings_text = f"Adequate savings rate of {savings_rate_pct:.1f}%. Increasing to 20%+ will accelerate wealth compounding."
    else:
        savings_status = 'NEEDS ATTENTION'
        savings_text = f"Low savings rate ({savings_rate_pct:.1f}%). Monthly cash margins are vulnerable to slight budget overruns."

    # 3. Debt Health
    if total_debt == 0 and emi == 0 and cc_debt == 0:
        debt_status = 'HEALTHY'
        debt_text = 'Debt-free position. 100% of income is retained for consumption, emergency reserves, and investing.'
    elif debt_to_income_pct <= 30.0 and cc_debt == 0:
        debt_status = 'HEALTHY'
        debt_text = f"Manageable EMI burden of {debt_to_income_pct:.1f}% of income with zero high-cost revolving debt."
    elif debt_to_income_pct <= 45.0 and cc_debt < 25000:
        debt_status = 'MODERATE'
        debt_text = f"Moderate debt load ({debt_to_income_pct:.1f}% EMI-to-income). Avoid incremental loans."
    else:
        debt_status = 'NEEDS ATTENTION'
        debt_text = f"High debt burden ({debt_to_income_pct:.1f}%). Revolving credit or excessive EMIs risk cash flow distress."

    # 4. Emergency Fund
    if emergency_months >= 6.0:
        emergency_status = 'HEALTHY'
        emergency_text = f"Robust buffer of {emergency_months:.1f} months of expenses saved in liquid avenues."
    elif emergency_months >= 3.0:
        emergency_status = 'MODERATE'
        emergency_text = f"Fair liquidity covering {emergency_months:.1f} months. Target expanding to at least 6 months."
    else:
        emergency_status = 'NEEDS ATTENTION'
        emergency_text = f"Critical vulnerability: reserves cover only {emergency_months:.1f} months of essential expenses."

    # 5. Insurance Protection
    if has_health and (has_life or dependents == 0) and (insurance_multiple >= 10.0 or dependents == 0):
        insurance_status = 'HEALTHY'
        insurance_text = f"Well protected with health cover and adequate term cover ({insurance_multiple:.1f}x annual income)."
    elif has_health:
        insurance_status = 'MODERATE'
        insurance_text = "Basic health cover in place, but term life cover is absent or below the recommended 10x income standard."
    else:
        insurance_status = 'NEEDS ATTENTION'
        insurance_text = "Uninsured or underinsured. Medical emergencies could force debt or asset liquidation."

    # 6. Inflation Impact
    # If investments are zero, high cash is eaten by inflation
    cash_ratio = (total_liquid_reserves / (total_liquid_reserves + existing_investments)) if (total_liquid_reserves + existing_investments) > 0 else 1.0
    if existing_investments > 0 and cash_ratio < 0.40:
        inflation_status = 'HEALTHY'
        inflation_text = f"Active capital deployed in productive assets helps outpace the projected {purchasing_power_loss_pct}% 10-year inflation drag."
    elif existing_investments > 0:
        inflation_status = 'MODERATE'
        inflation_text = f"Substantial cash in low-yield savings risks purchasing power decay of ~{purchasing_power_loss_pct}% over a decade."
    else:
        inflation_status = 'NEEDS ATTENTION'
        inflation_text = f"100% idle cash reserves. Inflation will silently erode ~{purchasing_power_loss_pct}% real purchasing power over 10 years."

    # 7. Investment Diversification
    if existing_investments > total_monthly_income * 6 and savings_rate_pct >= 15:
        diversification_status = 'HEALTHY'
        diversification_text = f"Healthy investment base of ₹{existing_investments:,.0f} providing multi-channel asset growth."
    elif existing_investments > 0:
        diversification_status = 'MODERATE'
        diversification_text = "Initial investment portfolio initiated. Expand asset classes to lower single-asset risk."
    else:
        diversification_status = 'NEEDS ATTENTION'
        diversification_text = "No active investments identified. Portfolio lacks growth and dividend compounding engines."

    # 8. Goal Readiness
    goal_count = len(goals)
    if goal_count == 0:
        goal_status = 'MODERATE'
        goal_text = 'No specific financial milestones selected. Clear timeline goals enhance disciplined saving.'
    elif monthly_surplus > 15000 and savings_rate_pct >= 20 and emergency_months >= 3:
        goal_status = 'HEALTHY'
        goal_text = f"Strong capacity to fund the {goal_count} designated target goals with persistent monthly surplus."
    elif monthly_surplus > 5000:
        goal_status = 'MODERATE'
        goal_text = f"Moderate progress toward goals ({', '.join(goals[:3])}). Prioritize high-urgency timelines."
    else:
        goal_status = 'NEEDS ATTENTION'
        goal_text = f"Limited surplus cash to fund selected goals ({', '.join(goals[:2])}). Requires expense optimization."

    # Overall Score & Classification
    statuses = [
        income_status, savings_status, debt_status, emergency_status,
        insurance_status, inflation_status, diversification_status, goal_status
    ]
    healthy_count = statuses.count('HEALTHY')
    moderate_count = statuses.count('MODERATE')
    attention_count = statuses.count('NEEDS ATTENTION')

    if attention_count >= 3 or monthly_surplus < 0 or debt_to_income_pct > 50:
        overall_classification = 'NEEDS ATTENTION'
        overall_badge_class = 'text-rose-400 bg-rose-950/40 border-rose-800'
    elif healthy_count >= 5 and attention_count <= 1:
        overall_classification = 'HEALTHY'
        overall_badge_class = 'text-emerald-400 bg-emerald-950/40 border-emerald-800'
    else:
        overall_classification = 'MODERATE'
        overall_badge_class = 'text-amber-400 bg-amber-950/40 border-amber-800'

    # Synthesize Strengths and Areas Needing Attention
    strengths = []
    if savings_rate_pct >= 20:
        strengths.append(f"Strong savings habit: Retaining {savings_rate_pct:.1f}% of income monthly.")
    if debt_to_income_pct <= 25 and cc_debt == 0:
        strengths.append(f"Low debt commitment: Debt service consumes only {debt_to_income_pct:.1f}% of cash flow.")
    if emergency_months >= 6:
        strengths.append(f"Bulletproof safety net: Reserves cover {emergency_months:.1f} months of necessary living costs.")
    if existing_investments > 0:
        strengths.append(f"Active wealth building: ₹{existing_investments:,.0f} deployed in investment assets.")
    if has_health and has_life:
        strengths.append("Comprehensive risk mitigation: Both medical and life insurance policies active.")
    if not strengths:
        strengths.append("Proactive step taken: You have initiated a comprehensive financial health audit.")

    areas_needing_attention = []
    if monthly_surplus <= 0:
        areas_needing_attention.append("Monthly Deficit: Outflows exceed total inflows. Immediate expense pruning needed.")
    elif savings_rate_pct < 15:
        areas_needing_attention.append(f"Low Savings Ratio: Currently saving {savings_rate_pct:.1f}%; benchmark is 20%+.")
    if emergency_months < 3:
        areas_needing_attention.append(f"Inadequate Emergency Cushion: Only {emergency_months:.1f} months saved (ideal is 6 months).")
    if cc_debt > 0:
        areas_needing_attention.append(f"High-Cost Debt: Credit card balance of ₹{cc_debt:,.0f} accumulating 36-42% APR.")
    if not has_health:
        areas_needing_attention.append("Absence of Health Insurance: Single hospitalization could wipe out liquid savings.")
    if dependents > 0 and insurance_multiple < 10:
        areas_needing_attention.append(f"Life Cover Shortfall: Coverage is {insurance_multiple:.1f}x income vs recommended 10x-15x.")
    if existing_investments == 0 and total_liquid_reserves > 50000:
        areas_needing_attention.append("Idle Capital: Surplus funds sitting in low-interest accounts losing purchasing power to inflation.")

    # Plain Beginner-friendly Explanation
    if overall_classification == 'HEALTHY':
        final_explanation = (
            f"Your financial engine is operating in a sound, healthy state. You earn more than you spend "
            f"each month (saving {savings_rate_pct:.1f}%), keep your debts in check, and have an adequate cushion for "
            f"unexpected surprises. Your next strategic step is to automate long-term investments in diversified index "
            f"funds or balanced assets to beat inflation and fulfill your upcoming milestones."
        )
    elif overall_classification == 'MODERATE':
        final_explanation = (
            f"You have built a workable foundation, but there are clear opportunities to fortify your finances. "
            f"While your monthly cash flow is positive (surplus of ₹{monthly_surplus:,.0f}), building up your emergency "
            f"reserves to 6 months and strengthening your insurance shield will protect you from unexpected disruptions. "
            f"Once those buffers are locked, you can direct consistent funds into wealth creation."
        )
    else:
        final_explanation = (
            f"Your current financial profile is operating under notable pressure. High expenses or debt obligations "
            f"are restricting your ability to accumulate emergency reserves and build investments. The immediate priority "
            f"is to eliminate high-interest liabilities, cap discretionary spending, and establish a bare-minimum 3-month "
            f"emergency cash buffer before taking on any market investment risks."
        )

    return {
        'total_monthly_income': total_monthly_income,
        'total_monthly_expenses': total_monthly_expenses,
        'monthly_surplus': monthly_surplus,
        'savings_rate_pct': round(savings_rate_pct, 1),
        'debt_to_income_pct': round(debt_to_income_pct, 1),
        'emergency_months': round(emergency_months, 1),
        'insurance_multiple': round(insurance_multiple, 1),
        'purchasing_power_loss_pct': purchasing_power_loss_pct,
        'overall_classification': overall_classification,
        'overall_badge_class': overall_badge_class,
        'cards': {
            'income': {'status': income_status, 'detail': income_text},
            'savings': {'status': savings_status, 'detail': savings_text},
            'debt': {'status': debt_status, 'detail': debt_text},
            'emergency': {'status': emergency_status, 'detail': emergency_text},
            'insurance': {'status': insurance_status, 'detail': insurance_text},
            'inflation': {'status': inflation_status, 'detail': inflation_text},
            'diversification': {'status': diversification_status, 'detail': diversification_text},
            'goals': {'status': goal_status, 'detail': goal_text}
        },
        'strengths': strengths,
        'areas_needing_attention': areas_needing_attention,
        'final_explanation': final_explanation,
        'raw_inputs': data
    }
