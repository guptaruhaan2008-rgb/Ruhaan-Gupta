"""
FINVEXA - Investment Comparison Engine
Authors: Ruhaan, Nimish, Raman
Brand: FINVEXA — Understand. Analyze. Invest Smarter.

Enables side-by-side objective financial comparisons between two instruments.
Emphasizes factual trade-offs without declaring a subjective 'winner'.
"""

from typing import Dict, Any, List


def compare_two_investments(item_a: Dict[str, Any], item_b: Dict[str, Any]) -> Dict[str, Any]:
    """
    Constructs an objective comparison matrix and key differences summary.
    """
    name_a = item_a.get('name', 'Asset A')
    name_b = item_b.get('name', 'Asset B')

    # Build side-by-side comparison dimensions
    dimensions = [
        {
            'dimension': 'Primary Asset Class',
            'a': item_a.get('category', item_a.get('type', 'Asset')),
            'b': item_b.get('category', item_b.get('type', 'Asset')),
            'analysis': 'Determines fundamental economic drivers, tax treatment, and volatility profile.'
        },
        {
            'dimension': 'Risk Profile',
            'a': item_a.get('risk_level', 'Moderate'),
            'b': item_b.get('risk_level', 'Moderate'),
            'analysis': 'Capital downside probability and portfolio volatility exposure.'
        },
        {
            'dimension': 'Historical Return / Yield',
            'a': item_a.get('return_display', '9% – 14%'),
            'b': item_b.get('return_display', '6% – 8%'),
            'analysis': 'Past performance characteristics; does not guarantee future results.'
        },
        {
            'dimension': 'Liquidity & Lock-In',
            'a': item_a.get('liquidity', 'High'),
            'b': item_b.get('liquidity', 'Moderate'),
            'analysis': 'Speed and penalty terms associated with converting asset to cash.'
        },
        {
            'dimension': 'Income Generation',
            'a': item_a.get('income_type', 'Dividends / Capital Growth'),
            'b': item_b.get('income_type', 'Guaranteed / Fixed Interest'),
            'analysis': 'Suitability for regular living expenses vs long-term compounding.'
        },
        {
            'dimension': 'Recommended Horizon',
            'a': item_a.get('ideal_horizon', '3–5 Years'),
            'b': item_b.get('ideal_horizon', '1–3 Years'),
            'analysis': 'Minimum holding period required to mitigate short-term volatility.'
        },
        {
            'dimension': 'Tax Treatment',
            'a': item_a.get('tax_info', 'Equity / Long-Term Capital Gains'),
            'b': item_b.get('tax_info', 'Interest taxed at personal slab rate'),
            'analysis': 'Net post-tax yield impact depending on investor tax bracket.'
        },
        {
            'dimension': 'Primary Advantage',
            'a': item_a.get('advantage', 'Inflation-beating capital growth potential.'),
            'b': item_b.get('advantage', 'Capital preservation with predictable cash flows.'),
            'analysis': 'Strategic role inside a well-balanced asset allocation model.'
        },
        {
            'dimension': 'Primary Risk',
            'a': item_a.get('risk', 'Market volatility and business cyclicality.'),
            'b': item_b.get('risk', 'Purchasing power loss if inflation exceeds nominal interest.'),
            'analysis': 'Downside factors that require monitoring and risk management.'
        }
    ]

    # Synthesis of KEY DIFFERENCES
    key_differences = [
        f"**Risk vs Stability:** {name_a} carries {item_a.get('risk_level', 'moderate')} volatility aimed at capital growth, whereas {name_b} prioritizes {item_b.get('risk_level', 'conservative')} stability and principal predictability.",
        f"**Cash Flow Structure:** {name_a} provides {item_a.get('income_type', 'variable')} return distributions, while {name_b} delivers {item_b.get('income_type', 'fixed')} cash flows.",
        f"**Inflation Resilience:** {name_a} is generally better structured to outpace persistent inflation over 5+ year horizons, whereas {name_b} serves best as a defensive capital buffer or near-term liquidity reserve.",
        f"**Suitability Match:** Select {name_a} if your timeline accommodates periodic price fluctuations for higher compounding. Select {name_b} if your priority is capital protection and immediate certainty of redemption value."
    ]

    return {
        'item_a': item_a,
        'item_b': item_b,
        'name_a': name_a,
        'name_b': name_b,
        'dimensions': dimensions,
        'key_differences': key_differences,
        'disclaimer': (
            "FINVEXA does not declare a single winner. An optimal portfolio frequently incorporates both instruments "
            "in proportions aligned with your specific risk appetite, timeline, and cash flow obligations."
        )
    }
