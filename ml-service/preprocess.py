import pandas as pd
from xgboost import data
from feature_names import FEATURE_COLUMNS

data["location"] = data["location"].strip().title()
data["homeCity"] = data["homeCity"].strip().title()

def preprocess_input(data: dict):
    # Initialize all features with 0
    features = {feature: 0 for feature in FEATURE_COLUMNS}

    # Numerical Features
    features["Amount"] = data["amount"]
    features["Hour"] = data["hour"]
    features["Is_International"] = int(data["isInternational"])
    features["Transactions_Last_1H"] = data["transactionsLast1H"]
    features["Age"] = data["age"]
    features["Monthly_Income"] = data["monthlyIncome"]
    features["Average_Transaction"] = data["averageTransaction"]

    # Feature Engineering
    if data["averageTransaction"] > 0:
        features["Transaction_Ratio"] = (
            data["amount"] / data["averageTransaction"]
        )
    else:
        features["Transaction_Ratio"] = 0

    features["New_Device"] = (
        1 if data["device"] != data["usualDevice"] else 0
    )

    features["Location_Mismatch"] = (
        1 if data["location"] != data["homeCity"] else 0
    )

    features["Night_Transaction"] = (
        1 if data["hour"] >= 22 or data["hour"] <= 5 else 0
    )

    # One Hot Encoding

    location = f"Location_{data['location']}"
    if location in features:
        features[location] = 1

    device = f"Device_{data['device']}"
    if device in features:
        features[device] = 1

    merchant = f"Merchant_{data['merchant']}"
    if merchant in features:
        features[merchant] = 1

    occupation = f"Occupation_{data['occupation']}"
    if occupation in features:
        features[occupation] = 1

    home_city = f"Home_City_{data['homeCity']}"
    if home_city in features:
        features[home_city] = 1

    usual_device = f"Usual_Device_{data['usualDevice']}"
    if usual_device in features:
        features[usual_device] = 1

    # Create DataFrame in exact training feature order
    df = pd.DataFrame([features])

    return df[FEATURE_COLUMNS]