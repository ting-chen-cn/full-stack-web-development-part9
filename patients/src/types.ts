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

// export interface Patient {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: Gender;
//   occupation: string;
// }
export type NewPatientEntry = Omit<Patient, 'id' | 'entries'>;

// export type NonSensitivePatientEntry = Omit<Patient, 'ssn'>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
}

export type NonSensitivePatientEntry = Omit<
  Patient,
  'ssn' | 'entries'
>;
