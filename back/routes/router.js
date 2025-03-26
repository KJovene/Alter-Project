import express from 'express';
import { getAllCandidates, postCandidate, putCandidate, deleteCandidate } from '../services/candidat.service.js';

const router = express.Router();

router.post('/candidature' , postCandidate);
router.get('/liste', getAllCandidates);
router.delete('/candidature/:id', deleteCandidate);
router.put('/candidature/:id', putCandidate);

export default router;
