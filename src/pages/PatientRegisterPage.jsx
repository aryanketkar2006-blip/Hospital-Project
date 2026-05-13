import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  PATIENT_REG,
  ERRORS,
  EMAIL_REGEX,
  PHONE_REGEX,
  PINCODE_REGEX,
  MIN_PASSWORD_LENGTH,
  HAS_UPPERCASE,
  HAS_NUMBER,
} from '../constants/strings.js';
import FormField from '../components/FormField.jsx';
import PasswordStrengthBar from '../components/PasswordStrengthBar.jsx';

/**
 * PatientRegisterPage — Single-page patient registration form with 5 sections.
 * Sections: Personal Details, Contact Info, Medical Info, Emergency Contact, Account Security.
 * On success: displays patient ID and confirmation.
 * Route: /register/patient
 */
export default function PatientRegisterPage() {
  const navigate = useNavigate();
  const [success, setSuccess] = useState(false);
  const [patientId, setPatientId] = useState('');
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    fullName: '',
    dob: '',
    gender: '',
    bloodGroup: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    pincode: '',
    allergies: '',
    conditions: '',
    primaryDoctor: '',
    emergencyName: '',
    emergencyPhone: '',
    relationship: '',
    password: '',
    confirmPassword: '',
    agreeTerms: false,
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

  /** Section label component for consistent styling */
  const SectionLabel = ({ children }) => (
    <div className="text-[11px] font-semibold tracking-[0.08em] uppercase text-muted border-b border-border pb-2 mb-4 mt-7">
      {children}
    </div>
  );

  /**
   * Validates all form fields.
   * @returns {boolean} true if all fields are valid
   */
  const validateForm = () => {
    const errs = {};

    if (!form.fullName.trim()) errs.fullName = ERRORS.REQUIRED;
    if (!form.dob) errs.dob = ERRORS.REQUIRED;
    if (!form.gender) errs.gender = ERRORS.REQUIRED;

    if (!form.phone) {
      errs.phone = ERRORS.REQUIRED;
    } else if (!PHONE_REGEX.test(form.phone)) {
      errs.phone = ERRORS.INVALID_PHONE;
    }

    if (!form.email) {
      errs.email = ERRORS.REQUIRED;
    } else if (!EMAIL_REGEX.test(form.email)) {
      errs.email = ERRORS.INVALID_EMAIL;
    }

    if (form.pincode && !PINCODE_REGEX.test(form.pincode)) {
      errs.pincode = ERRORS.INVALID_PINCODE;
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

    if (!form.agreeTerms) {
      errs.agreeTerms = ERRORS.AGREE_TERMS;
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  /** Submits the form, generates patient ID, shows success */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const generatedId = `PAT-2025-${String(Math.floor(Math.random() * 99999)).padStart(5, '0')}`;
      setPatientId(generatedId);
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
          <h2 className="text-[22px] font-semibold text-dark-text">{PATIENT_REG.SUCCESS_TITLE}</h2>
          <p className="text-sm text-muted mt-2">
            Your Patient ID is{' '}
            <span className="font-semibold text-primary">{patientId}</span>.
            Save this for future visits.
          </p>
          <button
            onClick={() => navigate('/auth')}
            className="mt-6 px-6 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary-dark cursor-pointer"
          >
            Go to Login →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-page-bg py-[60px] px-5">
      <div className="max-w-[560px] mx-auto">
        {/* Back link */}
        <button
          onClick={() => navigate('/auth')}
          className="text-[13px] text-muted hover:text-dark-text mb-6 flex items-center gap-1 cursor-pointer"
        >
          ← Back to Login
        </button>

        {/* Card */}
        <form onSubmit={handleSubmit} className="bg-white border border-border rounded-xl p-10">
          {/* Badge + heading */}
          <span className="inline-block bg-primary-light text-primary text-xs font-medium border border-primary-border rounded px-2.5 py-1">
            {PATIENT_REG.BADGE}
          </span>
          <h2 className="text-[22px] font-semibold text-dark-text mt-2">{PATIENT_REG.TITLE}</h2>
          <p className="text-[13px] text-muted">{PATIENT_REG.DESCRIPTION}</p>

          {/* ─── PERSONAL DETAILS ─── */}
          <SectionLabel>{PATIENT_REG.SECTIONS.PERSONAL}</SectionLabel>
          <div className="space-y-4">
            <FormField
              label="Full Name"
              name="fullName"
              value={form.fullName}
              onChange={handleChange}
              placeholder="Ravi Mehta"
              error={errors.fullName}
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
                options={PATIENT_REG.GENDERS}
                error={errors.gender}
              />
            </div>
            <FormField
              label="Blood Group"
              type="select"
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              placeholder="Select Blood Group"
              options={PATIENT_REG.BLOOD_GROUPS}
            />
          </div>

          {/* ─── CONTACT INFORMATION ─── */}
          <SectionLabel>{PATIENT_REG.SECTIONS.CONTACT}</SectionLabel>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Phone Number"
                type="tel"
                name="phone"
                value={form.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                error={errors.phone}
              />
              <FormField
                label="Email Address"
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="ravi@email.com"
                error={errors.email}
              />
            </div>
            <FormField
              label="Home Address"
              type="textarea"
              name="address"
              value={form.address}
              onChange={handleChange}
              placeholder="House No., Street, City, State, Pincode"
              rows={2}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="City / District"
                name="city"
                value={form.city}
                onChange={handleChange}
                placeholder="Mumbai"
              />
              <FormField
                label="Pincode"
                name="pincode"
                value={form.pincode}
                onChange={handleChange}
                placeholder="400001"
                error={errors.pincode}
              />
            </div>
          </div>

          {/* ─── MEDICAL INFORMATION ─── */}
          <SectionLabel>{PATIENT_REG.SECTIONS.MEDICAL}</SectionLabel>
          <div className="space-y-4">
            <FormField
              label="Known Allergies"
              name="allergies"
              value={form.allergies}
              onChange={handleChange}
              placeholder="Penicillin, Pollen (leave blank if none)"
            />
            <FormField
              label="Existing Medical Conditions"
              name="conditions"
              value={form.conditions}
              onChange={handleChange}
              placeholder="Diabetes, Hypertension (leave blank if none)"
            />
            <FormField
              label="Primary Doctor / Hospital (optional)"
              name="primaryDoctor"
              value={form.primaryDoctor}
              onChange={handleChange}
              placeholder="Dr. Sharma at AIIMS Bhopal"
            />
          </div>

          {/* ─── EMERGENCY CONTACT ─── */}
          <SectionLabel>{PATIENT_REG.SECTIONS.EMERGENCY}</SectionLabel>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField
                label="Emergency Contact Name"
                name="emergencyName"
                value={form.emergencyName}
                onChange={handleChange}
                placeholder="Name"
              />
              <FormField
                label="Phone"
                type="tel"
                name="emergencyPhone"
                value={form.emergencyPhone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
              />
            </div>
            <FormField
              label="Relationship"
              type="select"
              name="relationship"
              value={form.relationship}
              onChange={handleChange}
              placeholder="Select Relationship"
              options={PATIENT_REG.RELATIONSHIPS}
            />
          </div>

          {/* ─── ACCOUNT SECURITY ─── */}
          <SectionLabel>{PATIENT_REG.SECTIONS.SECURITY}</SectionLabel>
          <div className="space-y-4">
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

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreeTerms"
                checked={form.agreeTerms}
                onChange={handleChange}
                className="mt-0.5 w-4 h-4 accent-primary"
              />
              <span className="text-sm text-body-text">
                I agree to the{' '}
                <span className="text-primary cursor-pointer">Terms of Service</span> and{' '}
                <span className="text-primary cursor-pointer">Privacy Policy</span>.
              </span>
            </label>
            {errors.agreeTerms && (
              <p className="text-xs text-danger">{errors.agreeTerms}</p>
            )}
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full h-12 bg-primary text-white rounded-lg text-[15px] font-medium mt-8 hover:bg-primary-dark cursor-pointer"
          >
            Create Patient Account
          </button>
        </form>
      </div>
    </div>
  );
}
