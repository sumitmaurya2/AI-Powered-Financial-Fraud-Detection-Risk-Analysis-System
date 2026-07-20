import { Request, Response } from "express";
import axios from "axios";

export const predictFraud = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    console.log("===== REQUEST BODY =====");
    console.log(req.body);

    const response = await axios.post(
      `${process.env.ML_API_URL}/predict`,
      req.body
    );

    console.log("===== FASTAPI RESPONSE =====");
    console.log(response.data);

    return res.status(200).json({
      success: true,
      data: response.data,
    });

  } catch (error: any) {
    console.log("========== ERROR ==========");
    console.log("Status:", error.response?.status);
    console.log("Data:", error.response?.data);
    console.log("Message:", error.message);
    console.log("===========================");

    return res.status(500).json({
      success: false,
      error: error.response?.data || error.message,
    });
  }
};

export const getPredictionHistory = async (
  req: Request,
  res: Response
): Promise<void> => {
  res.status(200).json({
    success: true,
    count: 0,
    data: [],
  });
};