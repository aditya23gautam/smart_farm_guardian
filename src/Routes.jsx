import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import FarmManagement from './pages/farm-management';
import LoginPage from './pages/login';
import Dashboard from './pages/dashboard';
import AIInsights from './pages/ai-insights';
import BlockchainRewards from './pages/blockchain-rewards';
import IoTSensorData from './pages/io-t-sensor-data';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AIInsights />} />
        <Route path="/farm-management" element={<FarmManagement />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ai-insights" element={<AIInsights />} />
        <Route path="/blockchain-rewards" element={<BlockchainRewards />} />
        <Route path="/io-t-sensor-data" element={<IoTSensorData />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;