"""
TRENDS ANALYTICS MODULE — JUNGLAN FOUNDATION
Strictly conforming to Sections 34, 43, 94-96 of Part 8 specification.
Uses pandas & numpy for deterministic statistical calculations.
"""

from typing import List, Dict, Any, Optional
import numpy as np
import pandas as pd


def calculate_monthly_expense_trend(monthly_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Computes statistical trends from a series of monthly expense records.
    Input: [{"month": 1, "amount": 15000}, ...]
    """
    if not monthly_data:
        return {
            "has_data": False,
            "total": 0.0,
            "mean": 0.0,
            "trend_direction": "STABLE",
            "moving_average_3m": [],
            "growth_rate_pct": None,
            "summary": "No expense data available for the specified period."
        }

    df = pd.DataFrame(monthly_data)
    if "amount" not in df.columns:
        df["amount"] = 0.0
    df["amount"] = pd.to_numeric(df["amount"], errors="coerce").fillna(0.0)

    total = float(df["amount"].sum())
    mean_val = float(df["amount"].mean())
    max_val = float(df["amount"].max())
    min_val = float(df["amount"].min())

    # 3-month moving average
    df["ma_3m"] = df["amount"].rolling(window=3, min_periods=1).mean()
    moving_average = [round(float(v), 2) for v in df["ma_3m"].tolist()]

    # Growth rate between first and last non-zero month
    non_zero = df[df["amount"] > 0]
    growth_rate: Optional[float] = None
    trend_direction = "STABLE"

    if len(non_zero) >= 2:
        first_amt = float(non_zero.iloc[0]["amount"])
        last_amt = float(non_zero.iloc[-1]["amount"])
        if first_amt > 0:
            growth_rate = round(((last_amt - first_amt) / first_amt) * 100.0, 1)
            if growth_rate > 5.0:
                trend_direction = "INCREASING"
            elif growth_rate < -5.0:
                trend_direction = "DECREASING"
            else:
                trend_direction = "STABLE"

    return {
        "has_data": True,
        "total": round(total, 2),
        "mean": round(mean_val, 2),
        "max": round(max_val, 2),
        "min": round(min_val, 2),
        "moving_average_3m": moving_average,
        "growth_rate_pct": growth_rate,
        "trend_direction": trend_direction,
        "summary": f"Expense trend is {trend_direction.lower()} with an average of PKR {mean_val:,.0f} per recorded month."
    }


def calculate_year_over_year_change(
    baseline_year: str,
    current_year: str,
    baseline_total: float,
    current_total: float
) -> Dict[str, Any]:
    """
    Computes YoY delta and percentage change safely without zero-denominator errors.
    """
    diff = current_total - baseline_total

    if baseline_total > 0:
        pct_change = round((diff / baseline_total) * 100.0, 1)
        trend = "INCREASED" if diff > 0 else "DECREASED" if diff < 0 else "NO_CHANGE"
    else:
        # Zero baseline guard
        pct_change = None
        trend = "INSUFFICIENT_DATA"

    return {
        "baseline_year": baseline_year,
        "current_year": current_year,
        "baseline_total": round(baseline_total, 2),
        "current_total": round(current_total, 2),
        "difference_pkr": round(diff, 2),
        "percentage_change": pct_change,
        "trend": trend,
        "description": (
            f"Expenditures changed by PKR {diff:,.0f} ({pct_change}%) from {baseline_year} to {current_year}."
            if pct_change is not None
            else f"Baseline data for {baseline_year} is zero or unavailable; mathematical YoY percentage is undefined."
        )
    }


def calculate_fuel_trend(fuel_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Analyzes fuel consumption trends and efficiency.
    Input: [{"month": 1, "liters": 450, "cost": 126000, "distance_km": 1800}, ...]
    """
    if not fuel_data:
        return {
            "has_data": False,
            "total_cost": 0.0,
            "total_liters": 0.0,
            "avg_cost_per_km": None,
            "trend_direction": "STABLE"
        }

    df = pd.DataFrame(fuel_data)
    for col in ["liters", "cost", "distance_km"]:
        if col not in df.columns:
            df[col] = 0.0
        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)

    total_cost = float(df["cost"].sum())
    total_liters = float(df["liters"].sum())
    total_distance = float(df["distance_km"].sum())

    avg_price_per_liter = round(total_cost / total_liters, 2) if total_liters > 0 else None
    avg_cost_per_km = round(total_cost / total_distance, 2) if total_distance > 0 else None

    # Trend calculation
    non_zero = df[df["cost"] > 0]
    trend_direction = "STABLE"
    if len(non_zero) >= 2:
        start_c = float(non_zero.iloc[0]["cost"])
        end_c = float(non_zero.iloc[-1]["cost"])
        diff_pct = ((end_c - start_c) / start_c) * 100.0 if start_c > 0 else 0
        if diff_pct > 5.0:
            trend_direction = "INCREASING"
        elif diff_pct < -5.0:
            trend_direction = "DECREASING"

    return {
        "has_data": True,
        "total_cost": round(total_cost, 2),
        "total_liters": round(total_liters, 1),
        "total_distance_km": round(total_distance, 1),
        "avg_price_per_liter": avg_price_per_liter,
        "avg_cost_per_km": avg_cost_per_km,
        "trend_direction": trend_direction
    }


def calculate_maintenance_trend(maintenance_data: List[Dict[str, Any]]) -> Dict[str, Any]:
    """
    Analyzes maintenance expenditures and routine vs repair distribution.
    Input: [{"month": 1, "routine_cost": 15000, "repair_cost": 25000}, ...]
    """
    if not maintenance_data:
        return {
            "has_data": False,
            "total_maintenance": 0.0,
            "routine_percentage": 0.0,
            "repair_percentage": 0.0
        }

    df = pd.DataFrame(maintenance_data)
    for col in ["routine_cost", "repair_cost"]:
        if col not in df.columns:
            df[col] = 0.0
        df[col] = pd.to_numeric(df[col], errors="coerce").fillna(0.0)

    total_routine = float(df["routine_cost"].sum())
    total_repair = float(df["repair_cost"].sum())
    total_maint = total_routine + total_repair

    routine_pct = round((total_routine / total_maint) * 100.0, 1) if total_maint > 0 else 0.0
    repair_pct = round((total_repair / total_maint) * 100.0, 1) if total_maint > 0 else 0.0

    return {
        "has_data": True,
        "total_maintenance": round(total_maint, 2),
        "routine_cost": round(total_routine, 2),
        "repair_cost": round(total_repair, 2),
        "routine_percentage": routine_pct,
        "repair_percentage": repair_pct,
        "repair_dominant": total_repair > total_routine
    }
