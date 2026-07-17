import StatCard from "../components/ui/StatCard";

import {
  FaChartLine,
  FaShieldAlt,
  FaCheckCircle,
  FaBug,
} from "react-icons/fa";

function Home() {
  return (
    <div className="max-w-7xl mx-auto">

      <h1 className="text-4xl font-bold">
        AI-Powered Financial Fraud Detection
      </h1>

      <p className="text-gray-600 mt-2">
        Detect fraudulent transactions using Machine Learning.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">

        <StatCard
          title="Total Predictions"
          value="10,542"
          icon={<FaChartLine />}
        />

        <StatCard
          title="Fraud Detected"
          value="542"
          icon={<FaBug />}
        />

        <StatCard
          title="Safe Transactions"
          value="10,000"
          icon={<FaCheckCircle />}
        />

        <StatCard
          title="ROC-AUC Score"
          value="0.9728"
          icon={<FaShieldAlt />}
        />

      </div>

    </div>
  );
}

export default Home;