/**
 * Display strings and constants used across the MediQueue application.
 * Centralizes all user-facing text and configuration values.
 */

/** localStorage key for persisting user authentication data */
export const STORAGE_KEY = 'mediqueue_user';

/** Minimum password length requirement */
export const MIN_PASSWORD_LENGTH = 8;

/** Maximum years of experience allowed */
export const MAX_EXPERIENCE_YEARS = 60;

/** Regex pattern for validating email addresses */
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Regex pattern for validating 10-digit Indian phone numbers */
export const PHONE_REGEX = /^[6-9]\d{9}$/;

/** Regex pattern for validating 6-digit Indian pincodes */
export const PINCODE_REGEX = /^\d{6}$/;

/** Password must have at least 1 uppercase letter */
export const HAS_UPPERCASE = /[A-Z]/;

/** Password must have at least 1 number */
export const HAS_NUMBER = /\d/;

/** Password must have at least 1 special character */
export const HAS_SPECIAL = /[!@#$%^&*(),.?":{}|<>]/;

/** Password strength level definitions */
export const PASSWORD_STRENGTH = {
  WEAK: { label: 'Weak', width: '25%', color: '#DC2626' },
  FAIR: { label: 'Fair', width: '50%', color: '#D97706' },
  GOOD: { label: 'Good', width: '75%', color: '#1A56DB' },
  STRONG: { label: 'Strong', width: '100%', color: '#059669' },
};

/** Navigation bar height in pixels */
export const NAVBAR_HEIGHT_PX = 64;

/** Sidebar width in pixels */
export const SIDEBAR_WIDTH_PX = 240;

/** Landing page strings */
export const LANDING = {
  BRAND: 'MediQueue',
  PILL_BADGE: 'Smarter Hospitals. Better Care.',
  HERO_TITLE: 'Optimize Every Minute, Every Bed, Every Patient',
  HERO_DESCRIPTION:
    'A real-time intelligent system for hospital queue prediction, OPD appointment management, and bed allocation — built for modern Indian healthcare.',
  CTA_PRIMARY: 'Get Started →',
  CTA_SECONDARY: 'Learn More',
  STATS: [
    { value: '40%', label: 'Reduction in Wait Time' },
    { value: '98%', label: 'Bed Allocation Accuracy' },
    { value: '10K+', label: 'Patients Managed Monthly' },
  ],
  HOW_IT_WORKS_TITLE: 'How MediQueue Works',
  HOW_IT_WORKS_SUBTITLE: 'Three steps to smarter hospital operations',
  STEPS: [
    {
      title: 'Register & Identify',
      description:
        'Staff or patient? Register once. MediQueue remembers you and tailors your experience.',
    },
    {
      title: 'Smart Queue Assignment',
      description:
        'AI assigns you a queue token based on urgency, doctor availability, and consultation type.',
    },
    {
      title: 'Live Dashboard Monitoring',
      description:
        'Track wait times, bed availability, and appointments in real time from any device.',
    },
  ],
  FOOTER: '© 2025 MediQueue — Empowering Indian Healthcare',
};

/** Auth page strings */
export const AUTH = {
  LEFT_HEADING: "India's Smartest Hospital Management System",
  FEATURES: [
    'Predict patient waiting times accurately',
    'Optimize bed and resource allocation',
    'Priority scheduling for emergency cases',
  ],
  TRUSTED: 'Trusted by 50+ hospitals across India',
  LOGIN_TITLE: 'Welcome back',
  LOGIN_SUBTITLE: 'Enter your credentials to access your dashboard',
  REGISTER_TITLE: 'Create your account',
  REGISTER_SUBTITLE: 'Who are you registering as?',
  FORGOT_PASSWORD: 'Forgot password?',
  SIGN_IN: 'Sign In',
  CONTINUE: 'Continue →',
  NO_ACCOUNT: "Don't have an account?",
  HAS_ACCOUNT: 'Already have an account?',
};

/** Staff registration page strings */
export const STAFF_REG = {
  BADGE: 'Hospital Staff Registration',
  TITLE: 'Create Staff Account',
  DESCRIPTION:
    'Your Hospital ID Card number is required and will be verified during onboarding.',
  STEPS: ['Personal Info', 'Professional Info', 'Security'],
  ROLES: ['Doctor', 'Nurse', 'Receptionist', 'Lab Technician', 'Admin', 'Other'],
  DEPARTMENTS: [
    'General Medicine',
    'Cardiology',
    'Orthopedics',
    'Pediatrics',
    'Emergency',
    'Radiology',
    'Surgery',
    'Neurology',
    'Gynecology',
    'Other',
  ],
  SUCCESS_TITLE: 'Account Created Successfully!',
  SUCCESS_MSG:
    'Your account is under review. You will receive a confirmation email within 24 hours.',
};

/** Patient registration page strings */
export const PATIENT_REG = {
  BADGE: 'Patient Registration',
  TITLE: 'Create Patient Account',
  DESCRIPTION:
    'Your health, our priority. Track your appointments and queue status in real time.',
  SECTIONS: {
    PERSONAL: 'Personal Details',
    CONTACT: 'Contact Information',
    MEDICAL: 'Medical Information',
    EMERGENCY: 'Emergency Contact',
    SECURITY: 'Account Security',
  },
  GENDERS: ['Male', 'Female', 'Other', 'Prefer not to say'],
  BLOOD_GROUPS: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-', 'Unknown'],
  RELATIONSHIPS: ['Parent', 'Spouse', 'Sibling', 'Friend', 'Guardian', 'Other'],
  SUCCESS_TITLE: 'Account Created Successfully!',
};

/** Dashboard strings */
export const DASHBOARD = {
  STAFF_NAV: [
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'OPD Queue', id: 'opd-queue' },
    { label: 'Bed Management', id: 'bed-management' },
    { label: 'Appointments', id: 'appointments' },
    { label: 'Patient Records', id: 'patient-records' },
    { label: 'Reports', id: 'reports' },
    { label: 'Settings', id: 'settings' },
  ],
  PATIENT_NAV: [
    { label: 'Dashboard', id: 'dashboard' },
    { label: 'My Queue Status', id: 'queue-status' },
    { label: 'My Appointments', id: 'appointments' },
    { label: 'Ward Info', id: 'ward-info' },
    { label: 'Medical History', id: 'medical-history' },
    { label: 'Settings', id: 'settings' },
  ],
  QUEUE_STEPS: ['Registered', 'In Queue', 'Being Called', 'In Consultation', 'Done'],
};

/** Validation error messages */
export const ERRORS = {
  REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PHONE: 'Please enter a valid 10-digit Indian phone number',
  INVALID_PINCODE: 'Please enter a valid 6-digit pincode',
  PASSWORD_MIN: `Password must be at least ${MIN_PASSWORD_LENGTH} characters`,
  PASSWORD_UPPERCASE: 'Password must contain at least 1 uppercase letter',
  PASSWORD_NUMBER: 'Password must contain at least 1 number',
  PASSWORD_MISMATCH: 'Passwords do not match',
  CONFIRM_ACCURACY: 'Please confirm the information is accurate',
  AGREE_TERMS: 'You must agree to the Terms of Service',
};
