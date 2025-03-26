import express from 'express';
import { getAllCandidates, postCandidate, putCandidate, deleteCandidate } from '../services/candidat.service.js';

const router = express.Router();

router.post('/post' , postCandidate);
router.get('/get', getAllCandidates);
router.delete('/delete/:id', deleteCandidate);
router.put('/put/:id', putCandidate);

export default router;
