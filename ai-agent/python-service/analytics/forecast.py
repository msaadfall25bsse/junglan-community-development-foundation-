"""
STATISTICAL FORECASTING MODULE — JUNGLAN FOUNDATION
Strictly conforming to Sections 37, 74, 137 of Part 8 specification.
Rejects inadequate data without generating false precision.
Provides estimated ranges based on moving averages and linear trends.
"""

from typing import List, Dict, Any
import numpy as np


def forecast_metric_volume(
    historical_series: List[float],
    forecast_periods: int = 2,
    min_required_periods: int = 3,
    metric_name: str = "Trip Volume"
) -> Dict[str, Any]:
    """
    Produces honest, non-fabricated projection ranges for operational metrics.
    Rejects forecasting if historical data has fewer than `min_required_periods`.
    """
    clean_series = [float(v) for v in historical_series if v is not None and not np.isnan(v)]

    # 1. Data Sufficiency Check (Sections 37, 137)
    if len(clean_series) < min_required_periods:
        return {
            "has_sufficient_data": False,
            "metric": metric_name,
            "historical_periods_count": len(clean_series),
            "required_periods_count": min_required_periods,
            "forecast_ranges": [],
            "message": "There is not enough historical data available to determine a reliable forecast."
        }

    # 2. Compute Weighted Moving Average & Trend Slope
    weights = np.arange(1, len(clean_series) + 1)
    weighted_avg = float(np.average(clean_series, weights=weights))
    std_err = float(np.std(clean_series, ddof=1)) if len(clean_series) > 1 else (weighted_avg * 0.1)

    # Linear slope
    x = np.arange(len(clean_series))
    y = np.array(clean_series)
    slope, intercept = np.polyfit(x, y, 1) if len(clean_series) >= 2 else (0.0, weighted_avg)

    forecast_ranges: List[Dict[str, Any]] = []
    last_index = len(clean_series) - 1

    for step in range(1, forecast_periods + 1):
        target_idx = last_index + step
        trend_point = max(0.0, (slope * target_idx) + intercept)
        combined_est = (trend_point * 0.6) + (weighted_avg * 0.4)

        # Build uncertainty bounds
        margin = max(2.0, std_err * 0.8)
        range_low = max(0, int(np.floor(combined_est - margin)))
        range_high = int(np.ceil(combined_est + margin))

        forecast_ranges.append({
            "period_step": step,
            "estimated_range_low": range_low,
            "estimated_range_high": range_high,
            "point_estimate": int(round(combined_est)),
            "formatted_display": f"{range_low} – {range_high}"
        })

    first_range = forecast_ranges[0]
    return {
        "has_sufficient_data": True,
        "metric": metric_name,
        "historical_periods_count": len(clean_series),
        "required_periods_count": min_required_periods,
        "forecast_ranges": forecast_ranges,
        "headline_range": first_range["formatted_display"],
        "message": (
            f"Based on historical patterns ({len(clean_series)} recorded periods), "
            f"estimated next period {metric_name.lower()} is projected within the range of {first_range['formatted_display']}."
        )
    }
