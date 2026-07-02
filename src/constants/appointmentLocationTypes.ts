export const APPOINTMENT_LOCATION_TYPES = ['hospital', 'clinic', 'office', 'other'] as const;

export type AppointmentLocationType = (typeof APPOINTMENT_LOCATION_TYPES)[number];
