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
class PredictionRequest(BaseModel):
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

    input_data = preprocess_input(data.model_dump())

    input_scaled = scaler.transform(input_data)

    probability = float(model.predict_proba(input_scaled)[0][1])

    prediction = 1 if probability >= 0.30 else 0

    return {
        "prediction": "Fraud" if prediction else "Safe",
        "riskScore": round(probability * 100, 2),
        "confidence": round(max(probability, 1 - probability) * 100, 2),
    }