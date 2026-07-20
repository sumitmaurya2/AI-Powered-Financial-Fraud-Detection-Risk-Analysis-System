import { Request, Response } from "express";
import axios from "axios";
import Prediction from "../models/Prediction";

export const predictFraud = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const mlApiUrl = process.env.ML_API_URL;

    if (!mlApiUrl) {
      res.status(503).json({
        success: false,
        message: "Prediction service is not configured.",
      });
      return;
    }

    // Call FastAPI
    console.log("===== REQUEST BODY =====");
    console.log(req.body);

    const response = await axios.post(
      `${mlApiUrl}/predict`,
      req.body,
      { timeout: 30000 }
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
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("ML prediction service request failed", {
        code: error.code,
        status: error.response?.status,
        data: error.response?.data,
        message: error.message,
      });

      res.status(503).json({
        success: false,
        message: "The prediction service is temporarily unavailable. Please try again shortly.",
      });
      return;
    }

    console.log("========== ERROR ==========");

    console.log(error);

    console.log("===========================");

    res.status(500).json({
        success: false,
        message: "Unable to save the prediction. Please try again.",
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
