import Candidate  from '../models/models.js';
import express from 'express';

export const getAllCandidates = async (req, res) => {
  try {
    const candidates = await Candidate.find();
    res.status(200).json({ message: "La requête a été éfectuée avec succès", candidates});
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
    const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body , { new: true });
    res.status(200).json({ message: "La requête a été éfectuée avec succès"});
    
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Erreur interne du serveur"})
  }
}

export const deleteCandidate = async (req, res) => {
  const delItem = await Candidate.findByIdAndDelete(req.params.id);
  res.send('Candidate deleted').status(204);
  if (!delItem) {
    return res.status(404).json({ message: "Item non trouvé" })
  }
}

export const Compteur =  async (req, res) => {
  try {
    const count = await Candidate.countDocuments();
    res.status(200).json({ message: "La requête a été éfectuée avec succès", count});    
  } catch (error) {
    console.error("Erreur lors de la requête", error);
    res.status(500).json({ message: "Erreur interne du serveur"})
  }
};

export const countByStatus = async (req, res) => {
  try {
    const counts = await Candidate.aggregate([
      {$group: {_id: "$status", total: { $sum: 1 }}}
    ])
    res.json(counts.length > 0 ? counts : [])
  } catch (error) {
    res.status(500).json({message: "Erreur serveur"})
  }
}