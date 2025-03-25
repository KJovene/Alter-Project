import Candidate  from '../models/models.js';

export const getAllCandidates = async (req, res) => {
  const candidates = await Candidate.find();
  res.send(candidates);
};

export const postCandidate = async (req, res) => {
  const candidate = new Candidate({...req.body});
  await candidate.save();
  res.send(candidate);
};

export const putCandidate = async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
  await candidate.save();
  res.send(candidate);
}

export const deleteCandidate = async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.send('Candidate deleted');
}

