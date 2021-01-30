import React from 'react';
import axios from 'axios';
import DiagnosisEntryDetails from './DiagnosesForm';
import { Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient, Entry, Diagnosis } from '../types';
import { apiBaseUrl } from '../constants';
import {
  useStateValue,
  setPatientDetails,
  setDiagnosisList,
} from '../state';

const PatientForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        const { data: diagnosis } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(setPatientDetails(patient));
        dispatch(setDiagnosisList(diagnosis));
      } catch (e) {
        console.error(e.response.data);
      }
    };
    fetchPatient();
  }, [dispatch, id]);
  const patient = patients[id];
  return (
    <div>
      <h2>
        {patient?.name}{' '}
        <Icon
          name={
            patient?.gender === 'other'
              ? 'neuter'
              : patient?.gender === 'male'
              ? 'mars'
              : 'venus'
          }
        />{' '}
      </h2>
      <div>ssn: {patient?.ssn}</div>
      <div>occupation: {patient?.occupation}</div>
      <h3>entries</h3>
      {patient?.entries?.map((e: Entry) => (
        <div key={e.id}>
          <DiagnosisEntryDetails entry={e} />
        </div>
      ))}
    </div>
  );
};

export default PatientForm;
