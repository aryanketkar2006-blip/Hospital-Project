import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DASHBOARD, LANDING } from '../constants/strings.js';
import {
  OPD_QUEUE_DATA,
  BED_DATA,
  STAFF_METRICS,
  PATIENT_METRICS,
  PATIENT_APPOINTMENTS,
  PATIENT_QUEUE_POSITION,
  PATIENT_QUEUE_INFO,
} from '../data/mockData.js';
import useAuth from '../hooks/useAuth.js';
import Sidebar from '../components/Sidebar.jsx';
import TopBar from '../components/TopBar.jsx';
import MetricCard from '../components/MetricCard.jsx';
import QueueTable from '../components/QueueTable.jsx';
import BedOccupancyChart from '../components/BedOccupancyChart.jsx';
import QueueTracker from '../components/QueueTracker.jsx';

/**
 * DashboardPage — Main dashboard with sidebar app shell.
 * Renders staff or patient dashboard based on user role from localStorage.
 * Auth guard: redirects to /auth if no user is logged in.
 * Route: /dashboard
 */
export default function DashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [notifyToggle, setNotifyToggle] = useState(true);

  /** Auth guard — redirect if not logged in */
  useEffect(() => {
    if (!user) {
      navigate('/auth');
    }
  }, [user, navigate]);

  if (!user) return null;

  /** Determines greeting based on current hour */
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 17) return 'Good afternoon';
    return 'Good evening';
  };

  const isStaff = user.role === 'staff';

  /** Map of nav item IDs to their display titles for the TopBar */
  const navTitleMap = {};
  const navItems = isStaff ? DASHBOARD.STAFF_NAV : DASHBOARD.PATIENT_NAV;
  navItems.forEach((item) => {
    navTitleMap[item.id] = item.label;
  });

  /** Appointment status pill styles */
  const appointmentPillStyles = {
    Confirmed: 'bg-[#D1FAE5] text-[#065F46]',
    Pending: 'bg-[#FEF3C7] text-[#92400E]',
  };

  return (
    <div className="min-h-screen bg-page-bg">
      {/* Sidebar */}
      <Sidebar
        user={user}
        activeNav={activeNav}
        onNavChange={setActiveNav}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main content area */}
      <div className="lg:ml-[240px]">
        {/* TopBar */}
        <TopBar
          title={navTitleMap[activeNav] || 'Dashboard'}
          user={user}
          onMenuToggle={() => setSidebarOpen((prev) => !prev)}
        />

        {/* Content */}
        <main className="p-7">
          {/* ═══════ STAFF DASHBOARD ═══════ */}
          {isStaff && (
            <>
              {/* Greeting */}
              <h2 className="text-[22px] font-semibold text-dark-text">
                {getGreeting()}, {user.name} 👋
              </h2>
              <p className="text-sm text-muted mb-6">
                Here&apos;s your hospital overview for today.
              </p>

              {/* 4 Metric cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
                {STAFF_METRICS.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>

              {/* 2-column: Queue + Bed Occupancy */}
              <div className="grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-5">
                {/* Live OPD Queue */}
                <div className="bg-white border border-border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-base font-semibold text-dark-text">Live OPD Queue</h3>
                    <button className="text-[13px] text-primary hover:text-primary-dark cursor-pointer">
                      View All →
                    </button>
                  </div>
                  <QueueTable data={OPD_QUEUE_DATA} />
                </div>

                {/* Bed Occupancy */}
                <div className="bg-white border border-border rounded-xl p-5">
                  <h3 className="text-base font-semibold text-dark-text">Bed Occupancy</h3>
                  <BedOccupancyChart data={BED_DATA} />
                </div>
              </div>
            </>
          )}

          {/* ═══════ PATIENT DASHBOARD ═══════ */}
          {!isStaff && (
            <>
              {/* Greeting + Patient ID badge */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <h2 className="text-[22px] font-semibold text-dark-text">
                  Hello, {user.name}! 👋
                </h2>
                <span className="inline-block bg-primary-light text-primary border border-primary-border text-[13px] rounded-md px-2.5 py-1 font-medium">
                  PAT-2025-00421
                </span>
              </div>

              {/* 3 Metric cards */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
                {PATIENT_METRICS.map((metric) => (
                  <MetricCard key={metric.label} {...metric} />
                ))}
              </div>

              {/* Queue Status Tracker card */}
              <div className="bg-white border border-border rounded-xl p-6 mt-5">
                <h3 className="text-base font-semibold text-dark-text mb-5">Your Queue Status</h3>
                <QueueTracker
                  steps={DASHBOARD.QUEUE_STEPS}
                  currentStep={PATIENT_QUEUE_POSITION}
                />

                {/* Info box */}
                <div className="bg-primary-light rounded-lg p-4 mt-5">
                  <p className="text-sm text-body-text">
                    Currently serving: Token{' '}
                    <span className="font-semibold">{PATIENT_QUEUE_INFO.currentlyServing}</span>
                    {' | '}Your token:{' '}
                    <span className="font-semibold">{PATIENT_QUEUE_INFO.patientToken}</span>
                    {' | '}Estimated wait:{' '}
                    <span className="font-semibold">{PATIENT_QUEUE_INFO.estimatedWait}</span>
                  </p>
                </div>

                {/* Notification toggle */}
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-body-text">Notify me when my turn is near</span>
                  <button
                    onClick={() => setNotifyToggle((prev) => !prev)}
                    className={`w-11 h-6 rounded-full relative cursor-pointer ${
                      notifyToggle ? 'bg-primary' : 'bg-border'
                    }`}
                    aria-label="Toggle notification"
                  >
                    <span
                      className={`absolute top-0.5 w-5 h-5 bg-white rounded-full ${
                        notifyToggle ? 'left-[22px]' : 'left-0.5'
                      }`}
                      style={{ transition: 'left 150ms ease' }}
                    />
                  </button>
                </div>
              </div>

              {/* Upcoming Appointments card */}
              <div className="bg-white border border-border rounded-xl p-6 mt-5">
                <h3 className="text-base font-semibold text-dark-text mb-4">
                  Upcoming Appointments
                </h3>
                {PATIENT_APPOINTMENTS.map((appt, index) => (
                  <div
                    key={appt.doctor}
                    className={`flex flex-col sm:flex-row sm:items-center justify-between py-3.5 ${
                      index < PATIENT_APPOINTMENTS.length - 1
                        ? 'border-b border-light-gray'
                        : ''
                    }`}
                  >
                    <div>
                      <span className="text-sm text-dark-text font-medium">
                        {appt.doctor}
                      </span>
                      <span className="text-sm text-muted">
                        {' · '}{appt.specialty}{' · '}{appt.dateTime}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 mt-2 sm:mt-0">
                      <span
                        className={`text-xs font-medium px-2.5 py-1 rounded-full ${
                          appointmentPillStyles[appt.status] || appointmentPillStyles.Pending
                        }`}
                      >
                        {appt.status}
                      </span>
                      <button className="text-[13px] text-danger hover:text-danger/80 cursor-pointer">
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
}
