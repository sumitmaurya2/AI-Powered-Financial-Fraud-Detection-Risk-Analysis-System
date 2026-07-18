import { Request, Response } from "express";
import axios from "axios";

export const predictFraud = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    // Send request to FastAPI
    const response = await axios.post(
      "http://127.0.0.1:8000/predict",
      req.body
    );

    // Return prediction to frontend
    res.status(200).json({
      success: true,
      data: response.data,
    });
  } catch (error: any) {
    console.error("Prediction Error:", error.message);

    res.status(500).json({
      success: false,
      message: "Prediction failed",
      error: error.response?.data || error.message,
    });
  }
};