import express from "express";
import cors from "cors";

import predictionRoutes from "./routes/prediction.routes";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Backend is running 🚀",
  });
});

app.use("/api/predict", predictionRoutes);

export default app;