import mongoose from "mongoose";

const predictionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },

    prediction: {
      type: String,
      required: true,
    },

    riskScore: {
      type: Number,
      required: true,
    },

    confidence: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Prediction", predictionSchema);