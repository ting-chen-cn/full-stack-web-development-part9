import { State } from './state';
import { Diagnosis, Patient } from '../types';

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
