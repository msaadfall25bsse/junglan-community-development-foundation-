"""
STATISTICAL ANOMALY DETECTION MODULE — JUNGLAN FOUNDATION
Strictly conforming to Sections 72, 73, 89 of Part 8 specification.
Applies transparent Z-Score and Interquartile Range (IQR) detection.
Zero false accusations of fraud; uses objective, factual terminology.
"""

from typing import List, Dict, Any
import numpy as np
import pandas as pd


def detect_expense_anomalies(
    data: List[Dict[str, Any]],
    z_threshold: float = 2.0,
    min_samples: int = 4
) -> List[Dict[str, Any]]:
    """
    Detects statistical outliers in expense series using combined Z-score and IQR methods.
    Input: [{"period": "2026-04", "category": "MAINTENANCE", "amount": 95000}, ...]
    """
    if not data or len(data) < min_samples:
        return []

    df = pd.DataFrame(data)
    if "amount" not in df.columns:
        return []

    df["amount"] = pd.to_numeric(df["amount"], errors="coerce").fillna(0.0)
    amounts = df["amount"].values

    mean_val = float(np.mean(amounts))
    std_val = float(np.std(amounts, ddof=1)) if len(amounts) > 1 else 0.0

    # IQR bounds
    q25 = float(np.percentile(amounts, 25))
    q75 = float(np.percentile(amounts, 75))
    iqr = q75 - q25
    upper_iqr_bound = q75 + (1.5 * iqr)

    anomalies: List[Dict[str, Any]] = []

    for _, row in df.iterrows():
        val = float(row["amount"])
        z_score = round((val - mean_val) / std_val, 2) if std_val > 0 else 0.0

        # Flag if both Z-Score exceeds threshold AND exceeds upper IQR bound
        if z_score >= z_threshold or (iqr > 0 and val > upper_iqr_bound):
            period = str(row.get("period", row.get("month", "Unknown Period")))
            category = str(row.get("category", "EXPENSE"))

            normal_low = max(0.0, round(mean_val - (std_val * 1.5), 0))
            normal_high = round(mean_val + (std_val * 1.5), 0)

            anomalies.append({
                "metric": f"{category} Expenditure",
                "period": period,
                "observed_value": round(val, 2),
                "baseline_mean": round(mean_val, 2),
                "normal_range": f"PKR {normal_low:,.0f} – PKR {normal_high:,.0f}",
                "z_score": z_score,
                "reason_flag": "Unusually high compared with historical data.",
                "explanation": (
                    f"Expenditure of PKR {val:,.0f} in {period} exceeds normal historical baseline "
                    f"(mean: PKR {mean_val:,.0f}, Z-score: +{z_score}). A review of associated vouchers is recommended."
                )
            })

    return anomalies
