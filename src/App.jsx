import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage.jsx';
import AuthPage from './pages/AuthPage.jsx';
import StaffRegisterPage from './pages/StaffRegisterPage.jsx';
import PatientRegisterPage from './pages/PatientRegisterPage.jsx';
import DashboardPage from './pages/DashboardPage.jsx';

/**
 * Root application component.
 * Configures React Router v6 with all application routes.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/register/staff" element={<StaffRegisterPage />} />
        <Route path="/register/patient" element={<PatientRegisterPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Routes>
    </BrowserRouter>
  );
}
