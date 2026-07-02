export const MEDICAL_SPECIALTIES = [
  'generalist',
  'cardiology',
  'dermatology',
  'gynecology',
  'ophthalmology',
  'ent',
  'pediatrics',
  'psychiatry',
  'rheumatology',
  'neurology',
  'gastroenterology',
  'endocrinology',
  'dentist',
  'physiotherapist',
  'other',
] as const;

export type MedicalSpecialty = (typeof MEDICAL_SPECIALTIES)[number];
