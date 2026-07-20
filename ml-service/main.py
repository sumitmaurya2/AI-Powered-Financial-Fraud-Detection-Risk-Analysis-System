from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import os

from preprocess import preprocess_input

app = FastAPI(title="Fraud Detection API")

# -----------------------------
# Load Model & Scaler
# -----------------------------
BASE_DIR = os.path.dirname(__file__)

model = joblib.load(
    os.path.join(BASE_DIR, "model", "fraud_detection_model.pkl")
)

scaler = joblib.load(
    os.path.join(BASE_DIR, "model", "scaler.pkl")
)


# -----------------------------
# Request Model
# -----------------------------
from pydantic import BaseModel, Field

class PredictionRequest(BaseModel):
    amount: float
    hour: int
    location: str
    device: str
    merchant: str

    isInternational: bool = Field(alias="is_international")
    transactionsLast1H: int = Field(alias="transactions_last_1h")

    age: int

    monthlyIncome: float = Field(alias="monthly_income")
    averageTransaction: float = Field(alias="average_transaction")

    occupation: str

    homeCity: str = Field(alias="home_city")
    usualDevice: str = Field(alias="usual_device")

    model_config = {
        "populate_by_name": True
    }
    amount: float
    hour: int
    location: str
    device: str
    merchant: str
    isInternational: bool
    transactionsLast1H: int
    age: int
    monthlyIncome: float
    averageTransaction: float
    occupation: str
    homeCity: str
    usualDevice: str


# -----------------------------
# Routes
# -----------------------------
@app.get("/")
def home():
    return {"message": "Fraud Detection API is running 🚀"}


@app.get("/health")
def health():
    return {"status": "OK"}


@app.post("/predict")
def predict(data: PredictionRequest):

    # Convert request to dictionary
    input_data = preprocess_input(data.model_dump())

    # Scale input
    input_scaled = scaler.transform(input_data)

    probability = float(model.predict_proba(input_scaled)[0][1])

    prediction = 1 if probability >= 0.30 else 0

    return {
    "prediction": "Fraud" if prediction == 1 else "Safe",
    "riskScore": round(probability * 100, 2),
    "confidence": round(max(probability, 1 - probability) * 100, 2),
}