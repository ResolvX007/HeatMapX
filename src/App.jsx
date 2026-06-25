import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppLayout from './components/Layout/AppLayout';
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import HeatMapPage from './pages/HeatMapPage';
import HotspotsPage from './pages/HotspotsPage';
import DriversPage from './pages/DriversPage';
import SimulatorPage from './pages/SimulatorPage';
import ReportPage from './pages/ReportPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="map" element={<HeatMapPage />} />
          <Route path="hotspots" element={<HotspotsPage />} />
          <Route path="drivers" element={<DriversPage />} />
          <Route path="simulate" element={<SimulatorPage />} />
          <Route path="report" element={<ReportPage />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
