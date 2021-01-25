import {NonSensitivePatientEntry} from '../types';
import patients from '../../data/patients';

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
  id,
  name,
  dateOfBirth,
  gender,
  occupation,
  }));
};

export default{
  getNonSensitiveEntries
}