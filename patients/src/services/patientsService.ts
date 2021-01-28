import {
  NonSensitivePatientEntry,
  NewPatientEntry,
  Patient,
} from '../types';
import patients from '../../data/patients';
import { v4 as uuid } from 'uuid';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(
    ({ id, name, dateOfBirth, gender, occupation }) => ({
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    })
  );
};

const getEntryById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);

  return patient;
};

const addPatient = (
  entry: NewPatientEntry
): NonSensitivePatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    entries: [],
    ...entry,
  };
  patients.push(newPatientEntry);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { ssn, ...newNonSensitivePatientEntry } = newPatientEntry;
  return newNonSensitivePatientEntry;
};
export default {
  getNonSensitiveEntries,
  addPatient,
  getEntryById,
};
