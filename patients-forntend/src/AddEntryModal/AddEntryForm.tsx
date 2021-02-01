import React from 'react';
import { Grid, Button } from 'semantic-ui-react';
import { Field, Formik, FormikProps, Form } from 'formik';
import { useStateValue } from '../state';
import {
  TextField,
  DiagnosisSelection,
  NumberField,
  SelectField,
  TypeOption,
} from './FormField';
import { NewEntry, EntryType, Diagnosis } from '../types';

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}
const typeOptions: TypeOption[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
  { value: EntryType.Hospital, label: 'Hospital' },
  {
    value: EntryType.OccupationalHealthcare,
    label: 'OccupationalHealthcare',
  },
];
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const CommonFields = ({
  diagnoses,
  setFieldValue,
  setFieldTouched,
}: {
  diagnoses: { [code: string]: Diagnosis };
  setFieldValue: FormikProps<{
    diagnosisCodes: string[];
  }>['setFieldValue'];
  setFieldTouched: FormikProps<{
    diagnosisCodes: string[];
  }>['setFieldTouched'];
}) => {
  return (
    <>
      <SelectField label='Type' name='type' options={typeOptions} />
      <Field
        label='description'
        placeholder='description'
        name='description'
        component={TextField}
      />
      <Field
        label='date'
        placeholder='YYYY-MM-DD'
        name='date'
        component={TextField}
      />
      <Field
        label='specialist'
        placeholder='specialist'
        name='specialist'
        component={TextField}
      />
      <DiagnosisSelection
        diagnoses={Object.values(diagnoses)}
        setFieldTouched={setFieldTouched}
        setFieldValue={setFieldValue}
      />
    </>
  );
};

const CommonGrid = (
  onClick: () => void,
  dirty: boolean,
  isValid: boolean
) => {
  return (
    <Grid>
      <Grid.Column floated='left' width={5}>
        <Button type='button' onClick={onClick} color='red'>
          Cancel
        </Button>
      </Grid.Column>
      <Grid.Column floated='right' width={5}>
        <Button
          type='submit'
          floated='right'
          color='green'
          disabled={!dirty || !isValid}
        >
          Add
        </Button>
      </Grid.Column>
    </Grid>
  );
};
export const AddEntryForm: React.FC<Props> = ({
  onSubmit,
  onCancel,
}) => {
  const [{ diagnoses }] = useStateValue();

  const setValuesByType = (values: NewEntry) => {
    switch (values.type) {
      case 'Hospital':
        if (!values.discharge)
          values.discharge = { date: '', criteria: '' };
        break;
      case 'HealthCheck':
        if (!values.healthCheckRating) values.healthCheckRating = 0;
        break;
      case 'OccupationalHealthcare':
        if (!values.sickLeave)
          values.sickLeave = { startDate: '', endDate: '' };
        if (!values.employerName) values.employerName = '';
        break;
      default:
        assertNever(values);
        break;
    }
  };

  return (
    <Formik
      initialValues={{
        description: '',
        date: '',
        specialist: '',
        diagnosisCodes: undefined,
        type: 'HealthCheck',
        healthCheckRating: 0,
      }}
      onSubmit={onSubmit}
      validate={(values) => {
        const invalid = 'Invalid input';
        const requiredError = 'Field is required';
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        }

        if (!values.specialist) {
          errors.specialist = requiredError;
        }
        if (!values.type) {
          errors.type = requiredError;
        }
        if (!values.date) {
          errors.date = requiredError;
        } else if (!Date.parse(values.date)) {
          errors.date = invalid;
        }

        switch (values.type) {
          case 'HealthCheck':
            if (
              values.healthCheckRating < 0 ||
              values.healthCheckRating > 3
            ) {
              errors.healthCheckRating = invalid;
            }
            break;
          case 'Hospital':
            if (!values.discharge?.date) {
              errors.discharge = `date ${requiredError}`;
            } else if (!Date.parse(values.discharge?.date)) {
              errors.discharge = `date ${invalid}`;
            }
            if (!values.discharge?.criteria) {
              if (!errors.discharge)
                errors.discharge = `criteria ${requiredError}`;
            }
            break;
          case 'OccupationalHealthcare':
            if (!values.employerName) {
              errors.employerName = requiredError;
            }
            if (
              values.sickLeave?.startDate &&
              !Date.parse(values.sickLeave.startDate)
            ) {
              errors.sickLeave = `startDate ${invalid}`;
            }
            if (
              values.sickLeave?.endDate &&
              !Date.parse(values.sickLeave.endDate)
            ) {
              if (!errors.sickLeave)
                errors.sickLeave = `endDate ${invalid}`;
            }
            if (
              values.sickLeave?.startDate &&
              !values.sickLeave?.endDate
            ) {
              if (!errors.sickLeave)
                errors.sickLeave = `endDate ${requiredError}`;
            }
            if (
              !values.sickLeave?.startDate &&
              values.sickLeave?.endDate
            ) {
              if (!errors.sickLeave)
                errors.sickLeave = `startDate ${requiredError}`;
            }
            break;
          default:
            assertNever(values);
        }
        return errors;
      }}
    >
      {({
        isValid,
        dirty,
        setFieldValue,
        setFieldTouched,
        values,
      }) => {
        setValuesByType(values);
        switch (values.type) {
          case 'HealthCheck': {
            return (
              <Form className='form ui'>
                <CommonFields
                  diagnoses={diagnoses}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                {values.type === 'HealthCheck' && (
                  <Field
                    label='Health check rating'
                    name='healthCheckRating'
                    component={NumberField}
                    min={0}
                    max={3}
                  />
                )}
                {CommonGrid(onCancel, dirty, isValid)}
              </Form>
            );
          }
          case 'Hospital': {
            return (
              <Form className='form ui'>
                <CommonFields
                  diagnoses={diagnoses}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                {values.type === 'Hospital' && (
                  <Field
                    label='Discharge date'
                    name='discharge.date'
                    placeholder='YYYY-MM-DD'
                    component={TextField}
                  />
                )}
                {values.type === 'Hospital' && (
                  <Field
                    label='Discharge criteria'
                    name='discharge.criteria'
                    placeholder='Discharge criteria'
                    component={TextField}
                  />
                )}
                {CommonGrid(onCancel, dirty, isValid)}
              </Form>
            );
          }
          case 'OccupationalHealthcare': {
            return (
              <Form className='form ui'>
                <CommonFields
                  diagnoses={diagnoses}
                  setFieldValue={setFieldValue}
                  setFieldTouched={setFieldTouched}
                />
                {values.type === 'OccupationalHealthcare' && (
                  <Field
                    label='Employer name'
                    name='employerName'
                    placeholder='Employer name'
                    component={TextField}
                  />
                )}
                {values.type === 'OccupationalHealthcare' && (
                  <Field
                    label='Sick leave start date'
                    name='sickLeave.startDate'
                    placeholder='YYYY-MM-DD'
                    component={TextField}
                  />
                )}
                {values.type === 'OccupationalHealthcare' && (
                  <Field
                    label='Sick leave end date'
                    name='sickLeave.endDate'
                    placeholder='YYYY-MM-DD'
                    component={TextField}
                  />
                )}
                {CommonGrid(onCancel, dirty, isValid)}
              </Form>
            );
          }
          default: {
            return <div></div>;
          }
        }
      }}
    </Formik>
  );
};

export default AddEntryForm;
