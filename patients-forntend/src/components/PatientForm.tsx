import React from 'react';
import axios from 'axios';
import DiagnosisEntryDetails from './DiagnosesForm';
import AddEntryModal from '../AddEntryModal';
import { Icon, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import { Patient, Entry, Diagnosis, NewEntry } from '../types';
import { apiBaseUrl } from '../constants';
import {
  useStateValue,
  setPatientDetails,
  setDiagnosisList,
  setNewEntry,
} from '../state';

const PatientForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [{ patients }, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | undefined>();
  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };
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

  const submitNewEntry = async (values: NewEntry) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(setNewEntry(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response.data);
      setError(e.response.data.error);
    }
  };
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
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientForm;
