"""
PYTHON ANALYTICS SERVICE — MAIN RUNNER & HTTP/CLI DISPATCHER
Strictly conforming to Sections 39-47, 89, 120, 124 of Part 8 specification.
Supports both Direct Fast Execution (STDIN/JSON) and HTTP micro-service modes.
"""

import sys
import json
import os
import argparse
from typing import Dict, Any

# Ensure package imports work regardless of execution directory
CURRENT_DIR = os.path.dirname(os.path.abspath(__file__))
if CURRENT_DIR not in sys.path:
    sys.path.insert(0, CURRENT_DIR)

from analytics.trends import (
    calculate_monthly_expense_trend,
    calculate_year_over_year_change,
    calculate_fuel_trend,
    calculate_maintenance_trend,
)
from analytics.anomaly import detect_expense_anomalies
from analytics.forecast import forecast_metric_volume

DEFAULT_SECRET = "junglan-analytics-internal-secret-2026"


def verify_auth_token(provided_secret: str) -> bool:
    expected = os.environ.get("PYTHON_ANALYTICS_SECRET", DEFAULT_SECRET)
    return provided_secret == expected


def dispatch_analytics(action: str, payload: Dict[str, Any]) -> Dict[str, Any]:
    """
    Routes incoming analytics requests to the appropriate statistical module.
    """
    try:
        if action == "monthly_expense_trend":
            monthly_data = payload.get("monthly_data", [])
            result = calculate_monthly_expense_trend(monthly_data)
            return {
                "success": True,
                "action": action,
                "result": result,
                "observations": [result.get("summary", "")],
                "warnings": [] if result.get("has_data") else ["No expense records found for specified window."]
            }

        elif action == "year_over_year":
            res = calculate_year_over_year_change(
                baseline_year=str(payload.get("baseline_year", "2025")),
                current_year=str(payload.get("current_year", "2026")),
                baseline_total=float(payload.get("baseline_total", 0.0)),
                current_total=float(payload.get("current_total", 0.0)),
            )
            return {
                "success": True,
                "action": action,
                "result": res,
                "observations": [res.get("description", "")],
                "warnings": [] if res.get("percentage_change") is not None else ["Baseline year total is zero; percentage undefined."]
            }

        elif action == "fuel_trend":
            fuel_data = payload.get("fuel_data", [])
            res = calculate_fuel_trend(fuel_data)
            return {
                "success": True,
                "action": action,
                "result": res,
                "observations": [
                    f"Fuel trend is {res.get('trend_direction', 'STABLE').lower()}.",
                    f"Average cost per KM: PKR {res.get('avg_cost_per_km', 'N/A')}." if res.get('avg_cost_per_km') else "Cost per KM data pending trip distance records."
                ],
                "warnings": [] if res.get("has_data") else ["No fuel telemetry records available."]
            }

        elif action == "maintenance_trend":
            maint_data = payload.get("maintenance_data", [])
            res = calculate_maintenance_trend(maint_data)
            obs = [
                f"Total workshop maintenance: PKR {res.get('total_maintenance', 0):,.0f}.",
                f"Breakdown: {res.get('routine_percentage')}% routine service vs {res.get('repair_percentage')}% repairs."
            ]
            return {
                "success": True,
                "action": action,
                "result": res,
                "observations": obs,
                "warnings": [] if res.get("has_data") else ["No maintenance records available."]
            }

        elif action == "detect_anomalies":
            expense_series = payload.get("expense_series", [])
            z_thresh = float(payload.get("z_threshold", 2.0))
            anomalies = detect_expense_anomalies(expense_series, z_threshold=z_thresh)
            return {
                "success": True,
                "action": action,
                "result": {
                    "anomalies_detected_count": len(anomalies),
                    "anomalies": anomalies,
                },
                "observations": [a["explanation"] for a in anomalies],
                "warnings": [] if len(expense_series) >= 4 else ["Sample size is too small (<4) for reliable Z-score anomaly detection."]
            }

        elif action == "forecast_volume":
            series = payload.get("series", [])
            metric_name = payload.get("metric_name", "Trip Volume")
            periods = int(payload.get("forecast_periods", 2))
            res = forecast_metric_volume(series, forecast_periods=periods, metric_name=metric_name)
            return {
                "success": True,
                "action": action,
                "result": res,
                "observations": [res.get("message", "")],
                "warnings": [] if res.get("has_sufficient_data") else ["Historical sample count insufficient (< 3 periods) for forecasting."]
            }

        elif action == "health":
            return {
                "success": True,
                "action": action,
                "result": {
                    "status": "HEALTHY",
                    "service": "Junglan Foundation Python Analytics Service",
                    "version": "1.0.0",
                    "engine": "pandas/numpy",
                },
                "observations": ["Python analytics engine is healthy and operational."],
                "warnings": []
            }

        else:
            return {
                "success": False,
                "error": f"Unknown analytics action: '{action}'.",
                "result": None,
                "observations": [],
                "warnings": []
            }

    except Exception as exc:
        return {
            "success": False,
            "error": f"Analytics processing failure: {str(exc)}",
            "result": None,
            "observations": [],
            "warnings": []
        }


def run_cli():
    """CLI / STDIN execution mode for direct Next.js process invocation."""
    parser = argparse.ArgumentParser(description="Junglan Python Analytics Dispatcher")
    parser.add_argument("--action", type=str, default="health", help="Analytics action to execute")
    parser.add_argument("--payload", type=str, default="", help="JSON payload string")
    parser.add_argument("--secret", type=str, default="", help="Internal authorization secret")
    args = parser.parse_args()

    # Read payload from STDIN if not passed via CLI flag
    raw_payload = args.payload
    if not raw_payload and not sys.stdin.isatty():
        raw_payload = sys.stdin.read().strip()

    payload: Dict[str, Any] = {}
    if raw_payload:
        try:
            payload = json.loads(raw_payload)
        except json.JSONDecodeError as err:
            output = {
                "success": False,
                "error": f"Invalid JSON payload: {str(err)}",
                "result": None
            }
            print(json.dumps(output))
            sys.exit(1)

    # Optional secret verification
    secret = args.secret or payload.get("secret", "")
    if secret and not verify_auth_token(secret):
        output = {
            "success": False,
            "error": "Unauthorized: Invalid Python analytics secret token.",
            "result": None
        }
        print(json.dumps(output))
        sys.exit(1)

    result = dispatch_analytics(args.action, payload)
    print(json.dumps(result))


if __name__ == "__main__":
    run_cli()
