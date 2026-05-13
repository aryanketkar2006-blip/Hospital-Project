import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  STAFF_REG,
  ERRORS,
  EMAIL_REGEX,
  PHONE_REGEX,
  MIN_PASSWORD_LENGTH,
  MAX_EXPERIENCE_YEARS,
  HAS_UPPERCASE,
  HAS_NUMBER,
} from '../constants/strings.js';
import FormField from '../components/FormField.jsx';
import ProgressSteps from '../components/ProgressSteps.jsx';
import PasswordStrengthBar from '../components/PasswordStrengthBar.jsx';

/** Total number of registration steps */
const TOTAL_STEPS = 3;

/**
 * StaffRegisterPage — 3-step multi-step registration wizard for hospital staff.
 * Steps: Personal Info → Professional Info → Security.
 * On success: displays a confirmation screen with green checkmark.
 * Route: /register/staff
 */
export default function StaffRegisterPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: '',
    phone: '',
    hospitalName: '',
    hospitalId: '',
    staffRole: '',
    department: '',
    experience: '',
    employeeId: '',
    email: '',
    password: '',
    confirmPassword: '',
    confirmAccuracy: false,
  });

  /** Updates form field values and clears corresponding error */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  /**
   * Validates fields for the current step.
   * @returns {boolean} true if valid
   */
  const validateStep = () => {
    const errs = {};

    if (currentStep === 0) {
      if (!form.fullName.trim()) errs.fullName = ERRORS.REQUIRED;
      if (!form.dob) errs.dob = ERRORS.REQUIRED;
      if (!form.gender) errs.gender = ERRORS.REQUIRED;
      if (!form.phone) {
        errs.phone = ERRORS.REQUIRED;
      } else if (!PHONE_REGEX.test(form.phone)) {
        errs.phone = ERRORS.INVALID_PHONE;
      }
    }

    if (currentStep === 1) {
      if (!form.hospitalName.trim()) errs.hospitalName = ERRORS.REQUIRED;
      if (!form.hospitalId.trim()) errs.hospitalId = ERRORS.REQUIRED;
      if (!form.staffRole) errs.staffRole = ERRORS.REQUIRED;
      if (!form.department) errs.department = ERRORS.REQUIRED;
    }

    if (currentStep === 2) {
      if (!form.email) {
        errs.email = ERRORS.REQUIRED;
      } else if (!EMAIL_REGEX.test(form.email)) {
        errs.email = ERRORS.INVALID_EMAIL;
      }
      if (!form.password) {
        errs.password = ERRORS.REQUIRED;
      } else {
        if (form.password.length < MIN_PASSWORD_LENGTH) errs.password = ERRORS.PASSWORD_MIN;
        else if (!HAS_UPPERCASE.test(form.password)) errs.password = ERRORS.PASSWORD_UPPERCASE;
        else if (!HAS_NUMBER.test(form.password)) errs.password = ERRORS.PASSWORD_NUMBER;
      }
      if (!form.confirmPassword) {
        errs.confirmPassword = ERRORS.REQUIRED;
      } else if (form.password !== form.confirmPassword) {
        errs.confirmPassword = ERRORS.PASSWORD_MISMATCH;
      }
      if (!form.confirmAccuracy) {
        errs.confirmAccuracy = ERRORS.CONFIRM_ACCURACY;
      }
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /** Advances to the next step after validation */
  const handleNextStep = () => {
    if (validateStep()) {
      setCurrentStep((prev) => Math.min(prev + 1, TOTAL_STEPS - 1));
    }
  };

  /** Goes back to the previous step */
  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  /** Submits the form and shows success state */
  const handleSubmit = () => {
    if (validateStep()) {
      setSuccess(true);
    }
  };

  /* ─── SUCCESS STATE ─── */
  if (success) {
    return (
      <div className="min-h-screen bg-page-bg flex items-center justify-center px-6">
        <div className="max-w-[460px] w-full bg-white border border-border rounded-xl p-10 text-center">
          <div className="w-12 h-12 bg-[#D1FAE5] rounded-full flex items-center justify-center mx-auto mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 text-success" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-[22px] font-semibold text-dark-text">{STAFF_REG.SUCCESS_TITLE}</h2>
          <p className="text-sm text-muted mt-2 mb-6">{STAFF_REG.SUCCESS_MSG}</p>
          <button
            onClick={() => navigate('/auth')}
            className="px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark cursor-pointer"
          >
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg py-[60px] px-5">
      <div className="max-w-[600px] mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate('/auth')}
          className="text-[13px] text-muted hover:text-dark-text mb-6 flex items-center gap-1 cursor-pointer"
        >
          ← Back to Login
        </button>

        {/* Card */}
        <div className="bg-white border border-border rounded-xl p-10">
          {/* Badge + heading */}
          <span className="inline-block bg-primary-light text-primary text-xs font-medium border border-primary-border rounded px-2.5 py-1">
            {STAFF_REG.BADGE}
          </span>
          <h2 className="text-[22px] font-semibold text-dark-text mt-2">{STAFF_REG.TITLE}</h2>
          <p className="text-[13px] text-muted mb-7">{STAFF_REG.DESCRIPTION}</p>

          {/* Progress steps */}
          <ProgressSteps steps={STAFF_REG.STEPS} currentStep={currentStep} />

          {/* ─── STEP 1: Personal Info ─── */}
          {currentStep === 0 && (
            <div className="space-y-4">
              <FormField
                label="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                placeholder="Dr. Aayush Sharma"
                error={errors.fullName}
                className="col-span-2"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Date of Birth"
                  type="date"
                  name="dob"
                  value={form.dob}
                  onChange={handleChange}
                  error={errors.dob}
                />
                <FormField
                  label="Gender"
                  type="select"
                  name="gender"
                  value={form.gender}
                  onChange={handleChange}
                  placeholder="Select Gender"
                  options={['Male', 'Female', 'Prefer not to say']}
                  error={errors.gender}
                />
              </div>
              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                error={errors.phone}
              />
              <button
                onClick={handleNextStep}
                className="w-full h-11 bg-primary text-white rounded-lg text-sm font-medium mt-2 hover:bg-primary-dark cursor-pointer"
              >
                Next: Professional Info →
              </button>
            </div>
          )}

          {/* ─── STEP 2: Professional Info ─── */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <FormField
                label="Hospital / Institution Name"
                name="hospitalName"
                value={form.hospitalName}
                onChange={handleChange}
                placeholder="AIIMS Bhopal"
                error={errors.hospitalName}
              />
              <FormField
                label="Hospital ID Card Number"
                name="hospitalId"
                value={form.hospitalId}
                onChange={handleChange}
                placeholder="HOSP-2024-XXXXX"
                error={errors.hospitalId}
                info="Found on your hospital-issued ID card"
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Staff Role"
                  type="select"
                  name="staffRole"
                  value={form.staffRole}
                  onChange={handleChange}
                  placeholder="Select Role"
                  options={STAFF_REG.ROLES}
                  error={errors.staffRole}
                />
                <FormField
                  label="Department"
                  type="select"
                  name="department"
                  value={form.department}
                  onChange={handleChange}
                  placeholder="Select Department"
                  options={STAFF_REG.DEPARTMENTS}
                  error={errors.department}
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <FormField
                  label="Years of Experience"
                  type="number"
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  min={0}
                  max={MAX_EXPERIENCE_YEARS}
                />
                <FormField
                  label="Employee ID"
                  name="employeeId"
                  value={form.employeeId}
                  onChange={handleChange}
                  placeholder="EMP-XXXXXX"
                />
              </div>
              <div className="flex gap-3 mt-2">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 h-11 border border-border text-body-text rounded-lg text-sm font-medium hover:border-muted cursor-pointer"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleNextStep}
                  className="flex-1 h-11 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark cursor-pointer"
                >
                  Next: Security →
                </button>
              </div>
            </div>
          )}

          {/* ─── STEP 3: Security ─── */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <FormField
                label="Work Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="doctor@hospital.com"
                error={errors.email}
              />
              <div>
                <FormField
                  label="Create Password"
                  type="password"
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Minimum 8 characters"
                  error={errors.password}
                />
                <PasswordStrengthBar password={form.password} />
              </div>
              <FormField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                error={errors.confirmPassword}
              />

              {/* Profile photo upload box */}
              <div className="border-[1.5px] border-dashed border-border rounded-lg p-6 text-center">
                <div className="text-muted mb-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0z" />
                  </svg>
                </div>
                <p className="text-sm text-muted">Upload Profile Photo (Optional)</p>
              </div>

              {/* Confirm checkbox */}
              <label className="flex items-start gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="confirmAccuracy"
                  checked={form.confirmAccuracy}
                  onChange={handleChange}
                  className="mt-0.5 w-4 h-4 accent-primary"
                />
                <span className="text-sm text-body-text">
                  I confirm all information is accurate and I am an authorized staff member.
                </span>
              </label>
              {errors.confirmAccuracy && (
                <p className="text-xs text-danger">{errors.confirmAccuracy}</p>
              )}

              <div className="flex gap-3 mt-2">
                <button
                  onClick={handlePrevStep}
                  className="flex-1 h-11 border border-border text-body-text rounded-lg text-sm font-medium hover:border-muted cursor-pointer"
                >
                  ← Previous
                </button>
                <button
                  onClick={handleSubmit}
                  className="flex-1 h-12 bg-primary text-white rounded-lg text-[15px] font-medium hover:bg-primary-dark cursor-pointer"
                >
                  Create Staff Account
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
