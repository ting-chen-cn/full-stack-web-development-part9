import express from 'express';
import patientsService from '../services/patientsService';
import toNewPatientEntry from '../utils';
const patientRouter = express.Router();

patientRouter.get('/', (_req, res) => {
  res.send(patientsService.getNonSensitiveEntries());
});
patientRouter.post('/', (req, res) => {
  try {
    const newPatientEntry = toNewPatientEntry(req.body);
    const addedEntry = patientsService.addPatient(newPatientEntry);
    res.json(addedEntry);
  } catch (e) {
    res.status(400).send(e.message);
  }
});

export default patientRouter;
