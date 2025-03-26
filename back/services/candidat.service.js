import Candidate  from '../models/models.js';

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.send(candidates).status(200).json({ message: "La requête a été éfectuée avec succès"});
  } catch (error) {
    console.log(error)
    res.status(404).json({ message: "Ressource non trouvée"})
  }
};

export const postCandidate = async (req, res) => { 
  try {
    const candidate = new Candidate({...req.body});
    await candidate.save();
    res.status(200).json({ message: "La requête a été éfectuée avec succès"});
  } catch (error) {
    res.status(500).json({ message: "Erreur interne du serveur"})
  }
};

export const putCandidate = async (req, res) => {
  try {
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, { ...req.body }, { new: true });
    await candidate.save();
    res.send(candidate).status(200).json({ message: "La requête a été éfectuée avec succès"});
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erreur interne du serveur"})
  }
}

export const deleteCandidate = async (req, res) => {
  await Candidate.findByIdAndDelete(req.params.id);
  res.send('Candidate deleted').status(204);
  if (!delItem) {
    return res.status(404).Json({ message: "Item non trouvé" })
  }
}

