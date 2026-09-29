"""
FINVEXA - Investment Discovery Engine
Authors: Ruhaan, Nimish, Raman
Brand: FINVEXA — Understand. Analyze. Invest Smarter.

Analyzes an investor's risk profile, investment duration, goals, liquidity,
and capital to discover compatible investment avenues with drill-down options.
"""

from typing import Dict, Any, List


AVENUE_DEFINITIONS = [
    {
        'id': 'shares',
        'name': 'Shares / Equities',
        'category': 'Growth & Equities',
        'risk_level': 'High',
        'ideal_horizon': '5+ years',
        'min_horizon_years': 5,
        'liquidity': 'High',
        'historical_return_range': '12% – 16%',
        'summary': 'Ownership equity in listed businesses. High compounding potential with market volatility.',
        'suitable_for': ['Long-term growth', 'Wealth creation', 'Inflation protection']
    },
    {
        'id': 'mutual_funds',
        'name': 'Mutual Funds',
        'category': 'Managed Portfolios',
        'risk_level': 'Moderate to High',
        'ideal_horizon': '3+ years',
        'min_horizon_years': 3,
        'liquidity': 'High',
        'historical_return_range': '11% – 15%',
        'summary': 'Professionally pooled investment vehicles offering diversified equity, debt, or hybrid exposure.',
        'suitable_for': ['Long-term growth', 'Wealth creation', 'Diversification', 'Regular income']
    },
    {
        'id': 'etfs',
        'name': 'Exchange Traded Funds (ETFs)',
        'category': 'Passive Indexing',
        'risk_level': 'Moderate to High',
        'ideal_horizon': '3+ years',
        'min_horizon_years': 3,
        'liquidity': 'Very High',
        'historical_return_range': '11% – 14%',
        'summary': 'Low-cost passive instruments tracking broad market indices (Nifty 50, Gold, Nasdaq) traded like shares.',
        'suitable_for': ['Long-term growth', 'Diversification', 'Liquidity', 'Inflation protection']
    },
    {
        'id': 'gold',
        'name': 'Gold (SGB, ETFs & Bullion)',
        'category': 'Precious Metals & Commodities',
        'risk_level': 'Moderate',
        'ideal_horizon': '3–8 years',
        'min_horizon_years': 3,
        'liquidity': 'Medium to High',
        'historical_return_range': '9% – 12%',
        'summary': 'Tangible hedge against currency depreciation, geopolitical uncertainty, and persistent inflation.',
        'suitable_for': ['Inflation protection', 'Capital stability', 'Diversification']
    },
    {
        'id': 'bonds',
        'name': 'Bonds (Corporate & PSU)',
        'category': 'Fixed Income',
        'risk_level': 'Low to Moderate',
        'ideal_horizon': '2–7 years',
        'min_horizon_years': 2,
        'liquidity': 'Moderate',
        'historical_return_range': '7.5% – 9.0%',
        'summary': 'Debt contracts issued by corporations and PSUs offering predictable coupon cash flow.',
        'suitable_for': ['Regular income', 'Capital stability', 'Diversification']
    },
    {
        'id': 'government_securities',
        'name': 'Government Securities (G-Sec & T-Bills)',
        'category': 'Sovereign Debt',
        'risk_level': 'Low',
        'ideal_horizon': '1–10 years',
        'min_horizon_years': 1,
        'liquidity': 'High',
        'historical_return_range': '6.8% – 7.4%',
        'summary': 'Direct loans to the sovereign government with zero default risk and periodic interest payments.',
        'suitable_for': ['Capital stability', 'Regular income']
    },
    {
        'id': 'fds',
        'name': 'Fixed Deposits (Bank & Post Office)',
        'category': 'Cash Equivalents',
        'risk_level': 'Low',
        'ideal_horizon': 'Less than 1 to 5 years',
        'min_horizon_years': 0.5,
        'liquidity': 'High (Subject to penalty)',
        'historical_return_range': '6.5% – 7.5%',
        'summary': 'Guaranteed principal deposit insured up to ₹5 Lakh by DICGC, ideal for short-term liquidity.',
        'suitable_for': ['Capital stability', 'Regular income', 'Liquidity']
    },
    {
        'id': 'reits',
        'name': 'Real Estate Investment Trusts (REITs)',
        'category': 'Commercial Real Estate',
        'risk_level': 'Moderate',
        'ideal_horizon': '3–5 years',
        'min_horizon_years': 3,
        'liquidity': 'High',
        'historical_return_range': '7% – 10% (Yield + Cap gains)',
        'summary': 'Fractional ownership in income-generating commercial tech parks paying regular distributions.',
        'suitable_for': ['Regular income', 'Diversification', 'Inflation protection']
    },
    {
        'id': 'ppf',
        'name': 'Public Provident Fund (PPF)',
        'category': 'Government Small Savings',
        'risk_level': 'Low',
        'ideal_horizon': '10+ years',
        'min_horizon_years': 15,
        'liquidity': 'Low (15-yr lock-in)',
        'historical_return_range': '7.1% (Tax-Free EEE)',
        'summary': 'Sovereign guaranteed long-term wealth compounding scheme with complete EEE tax exemption.',
        'suitable_for': ['Capital stability', 'Wealth creation', 'Long-term growth']
    },
    {
        'id': 'nps',
        'name': 'National Pension System (NPS)',
        'category': 'Retirement Pension',
        'risk_level': 'Moderate',
        'ideal_horizon': '10+ years',
        'min_horizon_years': 10,
        'liquidity': 'Low (Retirement lock-in)',
        'historical_return_range': '10% – 13% (Asset Blended)',
        'summary': 'Voluntary low-cost pension scheme blending equity, corporate bonds, and G-Secs with tax benefits.',
        'suitable_for': ['Wealth creation', 'Long-term growth', 'Diversification']
    }
]


def match_investments(profile: Dict[str, Any]) -> List[Dict[str, Any]]:
    """
    Evaluates investor characteristics and matches compatibility with each avenue.
    """
    risk_tolerance = profile.get('risk_tolerance', 'Moderate') # Low, Moderate, High
    duration = profile.get('duration', '3–5 years') # 'Less than 1 year', '1–3 years', '3–5 years', '5–10 years', '10+ years'
    primary_goal = profile.get('financial_goal', 'Long-term growth')
    liquidity_req = profile.get('liquidity_requirement', 'Moderate') # High, Moderate, Low
    loss_tolerance = profile.get('loss_tolerance', 'Moderate') # Minimal, Moderate, High

    # Numerical duration mapping
    duration_map = {
        'Less than 1 year': 0.8,
        '1–3 years': 2.0,
        '3–5 years': 4.0,
        '5–10 years': 7.5,
        '10+ years': 12.0
    }
    years = duration_map.get(duration, 4.0)

    matched = []

    for avenue in AVENUE_DEFINITIONS:
        score = 60 # Base score

        # Risk match
        if risk_tolerance == 'Low':
            if avenue['risk_level'] == 'Low':
                score += 25
            elif avenue['risk_level'] == 'Low to Moderate':
                score += 15
            elif avenue['risk_level'] == 'Moderate':
                score += 5
            else:
                score -= 30
        elif risk_tolerance == 'Moderate':
            if avenue['risk_level'] in ['Moderate', 'Low to Moderate', 'Moderate to High']:
                score += 25
            else:
                score += 10
        elif risk_tolerance == 'High':
            if avenue['risk_level'] in ['High', 'Moderate to High']:
                score += 30
            elif avenue['risk_level'] == 'Moderate':
                score += 15
            else:
                score -= 10

        # Horizon match
        if years < avenue['min_horizon_years']:
            score -= 35
        else:
            score += 15

        # Goal match
        if primary_goal in avenue['suitable_for']:
            score += 20
        else:
            score += 5

        # Liquidity match
        if liquidity_req == 'High' and 'Low' in avenue['liquidity']:
            score -= 30
        elif liquidity_req == 'High' and 'High' in avenue['liquidity']:
            score += 15

        # Compatibility categorization
        if score >= 90:
            status = 'Potentially compatible for further research.'
            tag_class = 'bg-emerald-950/60 text-emerald-400 border-emerald-700/60'
            fit = 'High Compatibility'
        elif score >= 70:
            status = 'May suit the selected profile.'
            tag_class = 'bg-sky-950/60 text-sky-400 border-sky-700/60'
            fit = 'Moderate Compatibility'
        elif score >= 50:
            status = 'Requires further research.'
            tag_class = 'bg-amber-950/60 text-amber-400 border-amber-700/60'
            fit = 'Conditional Fit'
        else:
            status = 'Higher risk relative to the selected profile.'
            tag_class = 'bg-rose-950/60 text-rose-400 border-rose-700/60'
            fit = 'Lower Compatibility'

        matched.append({
            **avenue,
            'compatibility_score': min(98, max(25, score)),
            'compatibility_status': status,
            'tag_class': tag_class,
            'fit_level': fit,
            'rationale': (
                f"Selected horizon ({duration}) and {risk_tolerance.lower()} risk profile align with "
                f"{avenue['name']}'s {avenue['ideal_horizon']} timeline and historical {avenue['historical_return_range']} yield profile."
            )
        })

    # Sort descending by compatibility score
    matched.sort(key=lambda x: x['compatibility_score'], reverse=True)
    return matched
