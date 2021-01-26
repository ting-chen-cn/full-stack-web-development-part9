import { NonSensitivePatientEntry, NewPatientEntry } from '../types';
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

const addPatient = (
  entry: NewPatientEntry
): NonSensitivePatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry,
  };
  patients.push(newPatientEntry);
  const { ssn, ...newNonSensitivePatientEntry } = newPatientEntry;
  return newNonSensitivePatientEntry;
};
export default {
  getNonSensitiveEntries,
  addPatient,
};
