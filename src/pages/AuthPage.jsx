import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AUTH, LANDING, ERRORS, EMAIL_REGEX } from '../constants/strings.js';
import useAuth from '../hooks/useAuth.js';
import FormField from '../components/FormField.jsx';
import RoleCard from '../components/RoleCard.jsx';

/**
 * AuthPage — Two-column authentication page with Login and Register tabs.
 * Left column: blue branding panel (hidden on mobile).
 * Right column: login form or role selection for registration.
 * Route: /auth
 */
export default function AuthPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('login');
  const [selectedRole, setSelectedRole] = useState('');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});

  /** Updates login form field values */
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginForm((prev) => ({ ...prev, [name]: value }));
    setLoginErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /** Validates and submits login form */
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const errors = {};

    if (!loginForm.email) {
      errors.email = ERRORS.REQUIRED;
    } else if (!EMAIL_REGEX.test(loginForm.email)) {
      errors.email = ERRORS.INVALID_EMAIL;
    }

    if (!loginForm.password) {
      errors.password = ERRORS.REQUIRED;
    }

    if (Object.keys(errors).length > 0) {
      setLoginErrors(errors);
      return;
    }

    /* Simulate login — extract name from email for demo */
    const namePart = loginForm.email.split('@')[0].replace(/[._]/g, ' ');
    const words = namePart.split(' ').filter((w) => w.length > 0);
    const displayName = words
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');

    /* Avoid duplicate "Dr." prefix if email already starts with "dr" */
    const hasTitle = words[0]?.toLowerCase() === 'dr';
    const finalName = hasTitle ? `Dr. ${words.slice(1).map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}` : displayName;

    login({
      name: finalName,
      email: loginForm.email,
      role: 'staff',
    });
    navigate('/dashboard');
  };

  /** Handles role selection and navigates to appropriate registration page */
  const handleContinueRegister = () => {
    if (selectedRole === 'staff') {
      navigate('/register/staff');
    } else if (selectedRole === 'patient') {
      navigate('/register/patient');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* ─── LEFT COLUMN — Blue branding panel ─── */}
      <div className="hidden lg:flex w-[40%] bg-primary flex-col justify-between p-12">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-white/20 rounded-md flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
            </div>
            <span className="text-[22px] font-semibold text-white">{LANDING.BRAND}</span>
          </div>

          {/* Heading + features */}
          <h2 className="text-2xl font-semibold text-white mt-12 leading-snug max-w-[300px]">
            {AUTH.LEFT_HEADING}
          </h2>
          <div className="mt-8 space-y-4">
            {AUTH.FEATURES.map((feat) => (
              <div key={feat} className="flex items-center gap-3">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                <span className="text-sm text-white/90">{feat}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[13px] text-white/60">{AUTH.TRUSTED}</p>
      </div>

      {/* ─── RIGHT COLUMN — Auth form ─── */}
      <div className="flex-1 bg-white flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-[420px]">
          {/* Tab switcher */}
          <div className="flex border-b border-border mb-7">
            <button
              onClick={() => setActiveTab('login')}
              className={`flex-1 pb-3 text-sm font-medium text-center cursor-pointer ${
                activeTab === 'login'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted'
              }`}
            >
              Log In
            </button>
            <button
              onClick={() => setActiveTab('register')}
              className={`flex-1 pb-3 text-sm font-medium text-center cursor-pointer ${
                activeTab === 'register'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-muted'
              }`}
            >
              Register
            </button>
          </div>

          {/* ─── LOGIN TAB ─── */}
          {activeTab === 'login' && (
            <form onSubmit={handleLoginSubmit}>
              <h2 className="text-[22px] font-semibold text-dark-text">{AUTH.LOGIN_TITLE}</h2>
              <p className="text-sm text-muted mb-6">{AUTH.LOGIN_SUBTITLE}</p>

              <div className="space-y-4">
                <FormField
                  label="Email Address"
                  type="email"
                  name="email"
                  value={loginForm.email}
                  onChange={handleLoginChange}
                  placeholder="you@hospital.com"
                  error={loginErrors.email}
                />
                <div>
                  <FormField
                    label="Password"
                    type="password"
                    name="password"
                    value={loginForm.password}
                    onChange={handleLoginChange}
                    placeholder="Enter your password"
                    error={loginErrors.password}
                  />
                  <div className="text-right mt-1">
                    <button type="button" className="text-[13px] text-primary hover:text-primary-dark cursor-pointer">
                      {AUTH.FORGOT_PASSWORD}
                    </button>
                  </div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full h-11 bg-primary text-white rounded-lg text-[15px] font-medium mt-6 hover:bg-primary-dark cursor-pointer"
              >
                {AUTH.SIGN_IN}
              </button>

              <p className="text-center text-[13px] text-muted mt-5">
                {AUTH.NO_ACCOUNT}{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('register')}
                  className="text-primary font-medium hover:text-primary-dark cursor-pointer"
                >
                  Register
                </button>
              </p>
            </form>
          )}

          {/* ─── REGISTER TAB ─── */}
          {activeTab === 'register' && (
            <div>
              <h2 className="text-[22px] font-semibold text-dark-text">{AUTH.REGISTER_TITLE}</h2>
              <p className="text-sm text-muted mb-6">{AUTH.REGISTER_SUBTITLE}</p>

              <div className="grid grid-cols-2 gap-3">
                <RoleCard
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
                    </svg>
                  }
                  title="Hospital Staff"
                  description="Doctors, Nurses, Admins"
                  selected={selectedRole === 'staff'}
                  onClick={() => setSelectedRole('staff')}
                />
                <RoleCard
                  icon={
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  }
                  title="Patient"
                  description="New or returning patient"
                  selected={selectedRole === 'patient'}
                  onClick={() => setSelectedRole('patient')}
                />
              </div>

              {selectedRole && (
                <button
                  onClick={handleContinueRegister}
                  className="w-full h-11 bg-primary text-white rounded-lg text-[15px] font-medium mt-4 hover:bg-primary-dark cursor-pointer"
                >
                  {AUTH.CONTINUE}
                </button>
              )}

              <p className="text-center text-[13px] text-muted mt-5">
                {AUTH.HAS_ACCOUNT}{' '}
                <button
                  type="button"
                  onClick={() => setActiveTab('login')}
                  className="text-primary font-medium hover:text-primary-dark cursor-pointer"
                >
                  Log In
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
