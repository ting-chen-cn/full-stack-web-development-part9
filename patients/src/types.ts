export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}
export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}
export enum Gender {
  Female = 'female',
  Male = 'male',
  Other = 'other',
}
export enum EntryType {
  HealthCheck = 'HealthCheck',
  Hospital = 'Hospital',
  OccupationalHealthcare = 'OccupationalHealthcare',
}
export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRisk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3,
}

export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;
export type NonSensitivePatientEntry = Omit<
  Patient,
  'ssn' | 'entries'
>;
// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose['code']>;
}
interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}
export interface Discharge {
  date: string;
  criteria: string;
}

interface HospitalEntry extends BaseEntry {
  type: 'Hospital';
  discharge: Discharge;
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}
interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare';
  sickLeave?: SickLeave;
  employerName?: string;
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type NewEntry =
  | Omit<HealthCheckEntry, 'id'>
  | Omit<HospitalEntry, 'id'>
  | Omit<OccupationalHealthcareEntry, 'id'>;
