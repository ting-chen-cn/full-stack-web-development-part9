/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Gender,
  NewPatientEntry,
  NewEntry,
  Diagnose,
  EntryType,
  HealthCheckRating,
  Discharge,
  SickLeave,
} from './types';

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
export const toNewPatientEntry = (object: any): NewPatientEntry => {
  return {
    name: parseName(object.name),
    ssn: parseSsn(object.ssn),
    dateOfBirth: parseDateOfBirth(object.dateOfBirth),
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
  };
};
const isEntryType = (type: any): type is EntryType => {
  return Object.values(EntryType).includes(type);
};
const parseType = (type: any): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error(
      `Incorrect or missing entry:type : ${JSON.stringify(type)}`
    );
  }
  return type;
};
const parseDescription = (description: any): string => {
  if (!description || !isString(description)) {
    throw new Error('Incorrect or missing description');
  }
  return description;
};
const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date');
  }
  return date;
};
const parseSpecialist = (specialist: any): string => {
  if (!specialist || !isString(specialist)) {
    throw new Error('Incorrect or missing specialist');
  }
  return specialist;
};

const isDiagnosisCodes = (
  diagnosisCodes: Array<any>
): diagnosisCodes is Array<Diagnose['code']> => {
  return diagnosisCodes.every(
    (diagnosis) => typeof diagnosis === 'string'
  );
};
const parseDiagnosisCodes = (
  diagnosisCodes: any
): Array<Diagnose['code']> => {
  if (!diagnosisCodes) {
    return [];
  }
  if (
    !Array.isArray(diagnosisCodes) ||
    !isDiagnosisCodes(diagnosisCodes)
  ) {
    throw new Error(
      `Incorrect diagnosisCodes: ${JSON.stringify(diagnosisCodes)}`
    );
  }
  return diagnosisCodes;
};
const isHealthCheckRating = (
  healthCheckRating: any
): healthCheckRating is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(healthCheckRating);
};
const parseHealthCheckRating = (
  healthCheckRating: any
): HealthCheckRating => {
  if (
    healthCheckRating === undefined ||
    !isHealthCheckRating(healthCheckRating)
  ) {
    throw new Error(
      `Incorrect or missing healthCheckRating: ${JSON.stringify(
        healthCheckRating
      )}`
    );
  }
  return healthCheckRating;
};
const isDischarge = (discharge: any): discharge is Discharge => {
  if (
    !discharge.date ||
    !isDate(discharge.date) ||
    !discharge.criteria ||
    !isString(discharge.criteria)
  ) {
    return false;
  }
  return true;
};
const parseDischarge = (discharge: any): Discharge => {
  if (!discharge || !isDischarge(discharge)) {
    throw new Error(
      `Incorrect or missing discharge: ${JSON.stringify(discharge)}`
    );
  }
  return discharge;
};
const parseEmployerName = (employerName: any): string => {
  if (!employerName || !isString(employerName)) {
    throw new Error(
      `Incorrect or missing employerName: ${JSON.stringify(
        employerName
      )}`
    );
  }
  return employerName;
};
const isSickLeave = (sickLeave: any): sickLeave is SickLeave => {
  if (
    !sickLeave.startDate ||
    !isDate(sickLeave.startDate) ||
    !sickLeave.endDate ||
    !isDate(sickLeave.endDate)
  ) {
    return false;
  }
  return true;
};
const parseSickLeave = (sickLeave: any): SickLeave | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  if (!isSickLeave(sickLeave)) {
    throw new Error(
      `Incorrect sickLeave: ${JSON.stringify(sickLeave)}`
    );
  }
  return sickLeave;
};

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const toNewEntry = (object: any): NewEntry => {
  const type = parseType(object.type);
  const entry = {
    description: parseDescription(object.description),
    date: parseDate(object.date),
    specialist: parseSpecialist(object.specialist),
    diagnosisCodes: parseDiagnosisCodes(object.diagnosisCodes),
  };

  switch (type) {
    case 'HealthCheck':
      return {
        ...entry,
        type: 'HealthCheck',
        healthCheckRating: parseHealthCheckRating(
          object.healthCheckRating
        ),
      };
    case 'Hospital':
      return {
        ...entry,
        type: 'Hospital',
        discharge: parseDischarge(object.discharge),
      };
    case 'OccupationalHealthcare':
      return {
        ...entry,
        type: 'OccupationalHealthcare',
        employerName: parseEmployerName(object.employerName),
        sickLeave: parseSickLeave(object.sickLeave),
      };
    default:
      throw new Error(
        `Incorrect or missing entry:type : ${JSON.stringify(type)}`
      );
  }
};

// export default { toNewPatientEntry, toNewEntry };
