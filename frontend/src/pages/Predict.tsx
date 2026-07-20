import { useState } from "react";
import api from "../services/api";

interface PredictionResult {
  prediction: string;
  riskScore: number;
  confidence: number;
}

const Predict = () => {
  const [formData, setFormData] = useState({
    amount: "",
    hour: "",
    location: "",
    device: "",
    merchant: "",
    isInternational: false,
    transactionsLast1H: "",
    age: "",
    monthlyIncome: "",
    averageTransaction: "",
    occupation: "",
    homeCity: "",
    usualDevice: "",
  });

  const [result, setResult] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : value,
    }));
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  const payload = {
    amount: Number(formData.amount),
    hour: Number(formData.hour),
    location: formData.location.trim(),
    device: formData.device,
    merchant: formData.merchant,
    isInternational: formData.isInternational,
    transactionsLast1H: Number(formData.transactionsLast1H),
    age: Number(formData.age),
    monthlyIncome: Number(formData.monthlyIncome),
    averageTransaction: Number(formData.averageTransaction),
    occupation: formData.occupation,
    homeCity: formData.homeCity.trim(),
    usualDevice: formData.usualDevice,
  };

  try {
    setLoading(true);

    const response = await api.post("/predict", payload);

    setResult(response.data.data);
  } catch (error: any) {
    console.error(error);

    if (error.response?.data) {
      console.log(error.response.data);
      alert(
        error.response.data.message ||
          JSON.stringify(error.response.data)
      );
    } else {
      alert("Prediction Failed");
    }
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="max-w-4xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        AI Fraud Detection
      </h1>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-2 gap-4"
      >
        <input
          type="number"
          name="amount"
          placeholder="Amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="hour"
          placeholder="Hour"
          value={formData.hour}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="monthlyIncome"
          placeholder="Monthly Income"
          value={formData.monthlyIncome}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="averageTransaction"
          placeholder="Average Transaction"
          value={formData.averageTransaction}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

        <input
          type="number"
          name="transactionsLast1H"
          placeholder="Transactions Last 1 Hour"
          value={formData.transactionsLast1H}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        />

      <input
  type="text"
  name="location"
  placeholder="Enter transaction location"
  value={formData.location}
  onChange={handleChange}
  autoComplete="off"
  required
  className="border p-2 rounded"
/>

       <input
  type="text"
  name="homeCity"
  placeholder="Enter home city"
  value={formData.homeCity}
  onChange={handleChange}
  autoComplete="off"
  required
  className="border p-2 rounded"
/>

        <select
          name="device"
          value={formData.device}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="" disabled>Select device</option>
          <option>Windows</option>
          <option>MacBook</option>
          <option>iPhone</option>
          <option>Unknown</option>
        </select>

        <select
          name="usualDevice"
          value={formData.usualDevice}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="" disabled>Select usual device</option>
          <option>Windows</option>
          <option>MacBook</option>
          <option>iPhone</option>
          <option>Unknown</option>
        </select>

        <select
          name="merchant"
          value={formData.merchant}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="" disabled>Select merchant</option>
          <option>Shopping</option>
          <option>Electronics</option>
          <option>Fuel</option>
          <option>Gaming</option>
          <option>Restaurant</option>
          <option>Travel</option>
        </select>

        <select
          name="occupation"
          value={formData.occupation}
          onChange={handleChange}
          required
          className="border p-2 rounded"
        >
          <option value="" disabled>Select occupation</option>
          <option>Salaried</option>
          <option>Student</option>
          <option>Freelancer</option>
          <option>Retired</option>
        </select>

        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            name="isInternational"
            checked={formData.isInternational}
            onChange={handleChange}
          />
          International Transaction
        </label>

        <button
          type="submit"
          className="bg-blue-600 text-white rounded p-3"
        >
          {loading ? "Predicting..." : "Predict Fraud"}
        </button>
      </form>

      {result && (
        <div className="mt-8 border rounded-lg p-6 shadow">
          <h2 className="text-2xl font-bold mb-4">
            Prediction Result
          </h2>

          <p>
            <strong>Prediction:</strong> {result.prediction}
          </p>

          <p>
            <strong>Risk Score:</strong> {result.riskScore}%
          </p>

          <p>
            <strong>Confidence:</strong> {result.confidence}%
          </p>
        </div>
      )}
    </div>
  );
};

export default Predict;
