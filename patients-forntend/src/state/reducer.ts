import { State } from './state';
import { Diagnosis, Patient, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'PATIENT_DETAILS';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      id: string;
      payload: Entry;
    };

export const setPatientList = (
  patientListFromApi: Patient[]
): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: patientListFromApi,
  };
};

export const setPatientDetails = (patient: Patient): Action => {
  return {
    type: 'PATIENT_DETAILS',
    payload: patient,
  };
};

export const setNewPatient = (patient: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: patient,
  };
};
export const setDiagnosisList = (
  diagnosisListFromApi: Diagnosis[]
): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: diagnosisListFromApi,
  };
};

export const setNewEntry = (id: string, newEntry: Entry): Action => {
  return {
    type: 'ADD_ENTRY',
    id: id,
    payload: newEntry,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'PATIENT_DETAILS':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'ADD_ENTRY': {
      const patient = { ...state.patients[action.id] };
      const newPatient = {
        ...patient,
        entries: [...patient.entries, action.payload],
      };
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.id]: newPatient,
        },
      };
    }
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (memo, diagnosis) => ({
              ...memo,
              [diagnosis.code]: diagnosis,
            }),
            {}
          ),
          ...state.diagnoses,
        },
      };
    default:
      return state;
  }
};
