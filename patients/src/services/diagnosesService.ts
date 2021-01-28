import { Diagnose } from '../types';
import diagnose from '../../data/diagnoses';

const getEntries = (): Diagnose[] => {
  return diagnose;
};

export default {
  getEntries,
};
