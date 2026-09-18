"""
ACCEPTANCE TESTS FOR PYTHON ANALYTICS MODULES — JUNGLAN FOUNDATION
Strictly conforming to Sections 44, 72-74, 89 of Part 8 specification.
Can be executed with `python test_analytics.py` or pytest.
"""

import os
import sys
import unittest

# Ensure parent directory is in sys.path
TEST_DIR = os.path.dirname(os.path.abspath(__file__))
SERVICE_DIR = os.path.dirname(TEST_DIR)
if SERVICE_DIR not in sys.path:
    sys.path.insert(0, SERVICE_DIR)

from analytics.trends import (
    calculate_monthly_expense_trend,
    calculate_year_over_year_change,
    calculate_fuel_trend,
    calculate_maintenance_trend,
)
from analytics.anomaly import detect_expense_anomalies
from analytics.forecast import forecast_metric_volume
from service import dispatch_analytics


class TestPythonAnalytics(unittest.TestCase):

    def test_monthly_expense_trend(self):
        """Test expense trends, 3-month moving average, and growth rate calculation."""
        data = [
            {"month": 1, "amount": 10000},
            {"month": 2, "amount": 12000},
            {"month": 3, "amount": 15000},
            {"month": 4, "amount": 18000},
        ]
        res = calculate_monthly_expense_trend(data)
        self.assertTrue(res["has_data"])
        self.assertEqual(res["total"], 55000.0)
        self.assertEqual(res["trend_direction"], "INCREASING")
        self.assertEqual(len(res["moving_average_3m"]), 4)
        self.assertGreater(res["growth_rate_pct"], 0)

    def test_yoy_zero_baseline_safety(self):
        """Test zero-denominator protection in YoY calculations."""
        # Baseline = 0, should not raise ZeroDivisionError
        res = calculate_year_over_year_change("1990", "2026", 0.0, 500000.0)
        self.assertIsNone(res["percentage_change"])
        self.assertEqual(res["trend"], "INSUFFICIENT_DATA")

        # Normal comparison
        res_normal = calculate_year_over_year_change("2025", "2026", 400000.0, 500000.0)
        self.assertEqual(res_normal["percentage_change"], 25.0)
        self.assertEqual(res_normal["trend"], "INCREASED")

    def test_fuel_efficiency_trend(self):
        """Test fuel consumption, cost per km, and volume totals."""
        data = [
            {"month": 1, "liters": 200, "cost": 56000, "distance_km": 1200},
            {"month": 2, "liters": 250, "cost": 70000, "distance_km": 1500},
        ]
        res = calculate_fuel_trend(data)
        self.assertTrue(res["has_data"])
        self.assertEqual(res["total_liters"], 450.0)
        self.assertEqual(res["total_cost"], 126000.0)
        self.assertEqual(res["avg_price_per_liter"], 280.0)
        self.assertIsNotNone(res["avg_cost_per_km"])

    def test_maintenance_service_vs_repair(self):
        """Test maintenance vs repair expenditure distribution."""
        data = [
            {"month": 1, "routine_cost": 20000, "repair_cost": 30000},
            {"month": 2, "routine_cost": 10000, "repair_cost": 40000},
        ]
        res = calculate_maintenance_trend(data)
        self.assertTrue(res["has_data"])
        self.assertEqual(res["total_maintenance"], 100000.0)
        self.assertEqual(res["routine_percentage"], 30.0)
        self.assertEqual(res["repair_percentage"], 70.0)
        self.assertTrue(res["repair_dominant"])

    def test_anomaly_detection_zscore_iqr(self):
        """Test statistical outlier detection without fraudulent accusation."""
        data = [
            {"period": "2026-01", "category": "FUEL", "amount": 25000},
            {"period": "2026-02", "category": "FUEL", "amount": 26000},
            {"period": "2026-03", "category": "FUEL", "amount": 24000},
            {"period": "2026-04", "category": "FUEL", "amount": 27000},
            {"period": "2026-05", "category": "FUEL", "amount": 95000},  # Extreme outlier!
        ]
        anomalies = detect_expense_anomalies(data, z_threshold=1.5)
        self.assertGreaterEqual(len(anomalies), 1)

        anomaly = anomalies[0]
        self.assertEqual(anomaly["observed_value"], 95000.0)
        self.assertIn("Unusually high", anomaly["reason_flag"])
        self.assertNotIn("fraud", anomaly["reason_flag"].lower())

    def test_forecasting_data_sufficiency(self):
        """Test that forecasting rejects insufficient data (<3 periods) and succeeds with >=3."""
        # 1. Insufficient data (only 2 periods) -> MUST reject
        insufficient_res = forecast_metric_volume([12.0, 15.0], min_required_periods=3)
        self.assertFalse(insufficient_res["has_sufficient_data"])
        self.assertEqual(len(insufficient_res["forecast_ranges"]), 0)
        self.assertIn("not enough historical data", insufficient_res["message"].lower())

        # 2. Sufficient data (5 periods) -> MUST produce range projection
        sufficient_res = forecast_metric_volume([10.0, 12.0, 15.0, 18.0, 20.0], forecast_periods=2)
        self.assertTrue(sufficient_res["has_sufficient_data"])
        self.assertEqual(len(sufficient_res["forecast_ranges"]), 2)
        first_range = sufficient_res["forecast_ranges"][0]
        self.assertGreaterEqual(first_range["estimated_range_high"], first_range["estimated_range_low"])

    def test_service_dispatcher(self):
        """Test dispatcher routing and error containment."""
        health = dispatch_analytics("health", {})
        self.assertTrue(health["success"])
        self.assertEqual(health["result"]["status"], "HEALTHY")

        unknown = dispatch_analytics("non_existent_action", {})
        self.assertFalse(unknown["success"])


if __name__ == "__main__":
    unittest.main(verbosity=2)
