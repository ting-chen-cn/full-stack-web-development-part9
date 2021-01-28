import React from 'react';
import axios from 'axios';
import { Icon } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient } from '../types';
import { apiBaseUrl } from '../constants';
import { useStateValue, setPatientDetails } from '../state';

const PatientForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatientDetails(patient));
      } catch (e) {
        console.error(e.response.data);
      }
    };
    fetchPatient();
  }, [dispatch, id]);
  // console.log(patients);
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
    </div>
  );
};

export default PatientForm;
