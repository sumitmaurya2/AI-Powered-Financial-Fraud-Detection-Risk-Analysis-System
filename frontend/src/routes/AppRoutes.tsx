import { BrowserRouter, Routes, Route } from "react-router-dom";

import Layout from "../components/layout/Layout";

import Home from "../pages/Home";
import Predict from "../pages/Predict";
import History from "../pages/History";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/predict" element={<Predict />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default AppRoutes;