import React from 'react';
import { useStateValue } from '../state';
import { Icon, Table } from 'semantic-ui-react';
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry,
} from '../types';

const DiagnosisCodeForm: React.FC<{
  diagnosisCodes: string[] | undefined;
}> = ({ diagnosisCodes }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <ul>
      {diagnosisCodes &&
        diagnosisCodes.map((code: string, index: number) => (
          <li key={index}>
            {code}: {diagnoses[code]?.name}
          </li>
        ))}
    </ul>
  );
};

const Hospital: React.FC<{
  entry: HospitalEntry;
}> = ({ entry }) => {
  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h4>
              {entry.date}
              <Icon name={'hospital'} size='large' />
            </h4>
            <p>specialist: {entry.specialist}</p>
            <i style={{ color: 'grey' }}>{entry.description}</i>
            <p>
              {entry.discharge.date}: {entry.discharge.criteria}
            </p>
            <DiagnosisCodeForm
              diagnosisCodes={entry.diagnosisCodes}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h4>
              {entry.date}
              <Icon name={'stethoscope'} size='large' />
              {entry.employerName}
            </h4>
            <p>specialist: {entry.specialist}</p>
            <i style={{ color: 'grey' }}>{entry.description}</i>
            <p>
              {entry.sickLeave && 'sick leave,   '}
              {entry.sickLeave &&
                `start: ${entry.sickLeave.startDate}`}{' '}
              {entry.sickLeave && `end: ${entry.sickLeave.endDate}`}
            </p>
            <DiagnosisCodeForm
              diagnosisCodes={entry.diagnosisCodes}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
const HealthCheck: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  const heartColor = () => {
    switch (entry.healthCheckRating) {
      case 0:
        return 'green';
      case 1:
        return 'yellow';
      case 2:
        return 'orange';
      case 3:
        return 'red';
      default:
        return undefined;
    }
  };
  return (
    <Table celled>
      <Table.Body>
        <Table.Row>
          <Table.Cell>
            <h4>
              {entry.date}
              <Icon name={'user md'} size='large' />
            </h4>
            <p>specialist: {entry.specialist}</p>
            <i style={{ color: 'grey' }}>{entry.description}</i>{' '}
            <br />
            <Icon name='heart' color={heartColor()} />
            <DiagnosisCodeForm
              diagnosisCodes={entry.diagnosisCodes}
            />
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};
const DiagnosisEntryDetails: React.FC<{ entry: Entry }> = ({
  entry,
}) => {
  switch (entry.type) {
    case 'Hospital':
      return <Hospital entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcare entry={entry} />;
    case 'HealthCheck':
      return <HealthCheck entry={entry} />;
    default:
      return assertNever(entry);
  }
};
export default DiagnosisEntryDetails;
