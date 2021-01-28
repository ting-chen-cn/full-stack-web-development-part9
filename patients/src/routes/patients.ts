import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});
patientRouter.get('/:id', (req, res) => {
  const patient = patientsService.getEntryById(String(req.params.id));
  if (patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
});
patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    if (e instanceof Error) {
      res.status(400).send({ error: e.message });
    } else {
      throw e;
    }
  }
});

export default patientRouter;
