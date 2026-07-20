import { Request, Response } from "express";
import axios from "axios";
import Prediction from "../models/Prediction";

export const predictFraud = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Call FastAPI
    console.log("===== REQUEST BODY =====");
    console.log(req.body);

    const response = await axios.post(
    `${process.env.ML_API_URL}/predict`,
    req.body
    );

console.log("===== FASTAPI RESPONSE =====");
console.log(response.data);

    const predictionData = response.data;

    // Save prediction in MongoDB
    const prediction = new Prediction({
      amount: req.body.amount,
      hour: req.body.hour,
      location: req.body.location,
      device: req.body.device,
      merchant: req.body.merchant,

      prediction: predictionData.prediction,
      riskScore: predictionData.riskScore,
      confidence: predictionData.confidence,
    });

    await prediction.save();

    res.status(200).json({
      success: true,
      data: predictionData,
    });
} catch (error: any) {

    console.log("========== ERROR ==========");

    console.log("Status:", error.response?.status);

    console.log("Data:", error.response?.data);

    console.log("Message:", error.message);

    console.log("===========================");

    return res.status(500).json({
        success: false,
        error: error.response?.data || error.message
    });
}
};



export const getPredictionHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const predictions = await Prediction.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: predictions.length,
      data: predictions,
    });
  } catch (error: any) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch prediction history",
      error: error.message,
    });
  }
};