/* eslint-disable @typescript-eslint/no-explicit-any */
import { Gender, NewPatientEntry } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};
const parseName = (name: any): string => {
  if (!name || !isString(name)) {
    throw new Error('Incorrect or missing name');
  }
  return name;
};

const parseSsn = (ssn: any): string => {
  if (!ssn || !isString(ssn)) {
    throw new Error('Incorrect or missing ssn');
  }
  return ssn;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
    throw new Error('Incorrect or missing occupation');
  }
  return occupation;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDateOfBirth = (dateOfBirth: any): string => {
  if (
    !dateOfBirth ||
    !isString(dateOfBirth) ||
    !isDate(dateOfBirth)
  ) {
    throw new Error('Incorrect or missing dateOfBirth');
  }
  return dateOfBirth;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    name: parseName(object.name),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    ssn: parseSsn(object.ssn),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    gender: parseGender(object.gender),
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    occupation: parseOccupation(object.occupation),
  };
};
export default toNewPatientEntry;
