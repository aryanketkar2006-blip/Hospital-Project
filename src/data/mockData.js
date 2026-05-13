/**
 * Mock data for the MediQueue application.
 * Provides realistic sample data for dashboard displays, queues, and appointments.
 */

/** Live OPD queue entries displayed on the staff dashboard */
export const OPD_QUEUE_DATA = [
  { token: 'A12', patient: 'Priya Sharma', department: 'Cardiology', wait: '5 min', status: 'In Progress' },
  { token: 'A13', patient: 'Rahul Verma', department: 'General OPD', wait: '15 min', status: 'Waiting' },
  { token: 'A14', patient: 'Sunita Patel', department: 'Pediatrics', wait: '25 min', status: 'Waiting' },
  { token: 'A15', patient: 'Amit Gupta', department: 'Orthopedics', wait: '35 min', status: 'Registered' },
];

/** Bed occupancy data by ward for the staff dashboard chart */
export const BED_DATA = [
  { ward: 'ICU', occupied: 8, total: 10, color: '#DC2626' },
  { ward: 'General Ward', occupied: 35, total: 50, color: '#1A56DB' },
  { ward: 'Emergency', occupied: 5, total: 5, color: '#DC2626' },
  { ward: 'Pediatrics', occupied: 12, total: 20, color: '#D97706' },
];

/** Staff dashboard metric card configurations */
export const STAFF_METRICS = [
  {
    label: 'Patients in Queue',
    value: '47',
    statusText: '+12 since 9am',
    statusType: 'warning',
    iconType: 'queue',
  },
  {
    label: 'Available Beds',
    value: '23/80',
    statusText: '71% free',
    statusType: 'info',
    iconType: 'bed',
  },
  {
    label: 'Avg Wait Time',
    value: '38 min',
    statusText: '-5 min vs yesterday',
    statusType: 'success',
    iconType: 'clock',
  },
  {
    label: "Today's Appointments",
    value: '124',
    statusText: '18 pending',
    statusType: 'warning',
    iconType: 'calendar',
  },
];

/** Patient dashboard metric card configurations */
export const PATIENT_METRICS = [
  {
    label: 'Your Queue Token',
    value: 'A15',
    statusText: 'General OPD',
    statusType: 'info',
    iconType: 'token',
  },
  {
    label: 'Estimated Wait',
    value: '25 min',
    statusText: 'You are 4th in line',
    statusType: 'warning',
    iconType: 'clock',
  },
  {
    label: 'Next Appointment',
    value: 'Today 11:30 AM',
    statusText: 'Dr. Kapoor · Cardiology',
    statusType: 'info',
    iconType: 'calendar',
  },
];

/** Patient upcoming appointments data */
export const PATIENT_APPOINTMENTS = [
  {
    doctor: 'Dr. Kapoor',
    specialty: 'Cardiology',
    dateTime: 'Today, 11:30 AM',
    status: 'Confirmed',
  },
  {
    doctor: 'Dr. Mehta',
    specialty: 'General OPD',
    dateTime: 'Tomorrow, 2:00 PM',
    status: 'Pending',
  },
];

/** Current queue position for the patient tracker (1-indexed, step 3 = Being Called) */
export const PATIENT_QUEUE_POSITION = 3;

/** Patient queue info box text */
export const PATIENT_QUEUE_INFO = {
  currentlyServing: 'A12',
  patientToken: 'A15',
  estimatedWait: '~12 minutes',
};
