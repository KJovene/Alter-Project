import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from '../../axios';
import './accueil.css';
import { motion } from "framer-motion";


const Accueil = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [count, setCount] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    "attente": 0,
    "accepté":0,
    "refusé":0
  })
  const [expiredCandidatures, setExpiredCandidatures] = useState([]);
  const [entreprise, setEntreprise] = useState('');
  const [status, setStatus] = useState('');

  const fetchCandidature = async () => {
    try {
      const response = await axiosInstance.get("/get");
      const candidates = response.data.candidates;

      setCandidatures(candidates);

      candidates.forEach((candidature) => {
        const createdAt = new Date(candidature.createdAt); 
        const now = new Date(); 
        const timeRemaining = 86400 - (now - createdAt); 

        const updateAt = new Date(candidature.updatedAt);
        const timeRemainingUpdate = 86400 - (now - updateAt);

        if (timeRemaining > 0) {
          setTimeout(() => {
            setExpiredCandidatures((prev) => [...prev, candidature._id]); 
          }, timeRemaining);
        
        } else if (timeRemainingUpdate > 0) {
          setTimeout(() => {
            setExpiredCandidatures((prev) => [...prev, candidature._id]); 
          }, timeRemainingUpdate);
      
        } else {
          setExpiredCandidatures((prev) => [...prev, candidature._id]);
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const deleteCandi = async (id) => {
    try {
      await axiosInstance.delete(`/delete/${id}`)
      setCandidatures(candidatures.filter((candidature) => candidature._id !== id));
    } catch (err) {
      console.error("Erreur lors de la suppression :", err);
    }
    fetchCandidature();
  };

  const fetchCount = async () => {
    try {
      const count = await axiosInstance.get("/compteur");
      setCount(count.data.count);
    } catch (err) {
      console.log(err);
    }
  }

  const getCandidateCountByStatus = async () => {
    const response = await axiosInstance.get('/get/status');
    return response.data;
  }

  const fetchCandidatureByStatus = async () => {
    const data = await getCandidateCountByStatus();
    const countsMap = { "attente": 0, "accepté": 0, "refusé": 0 };
    data.forEach((item) => {
      if (countsMap.hasOwnProperty(item._id)) {
        countsMap[item._id] = item.total;
      }
    });
    setStatusCounts(countsMap)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (entreprise != '' || status != '') {
      setCandidatures(candidatures.filter((candidature) => candidature.entreprise == entreprise || candidature.status == status))
    }

  }

  useEffect(() => {
    fetchCandidature();
    fetchCount();
    fetchCandidatureByStatus();
  }, []);

  return (
    <div className="bodyAccueil">
      <motion.h1
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}
      >Bienvenue sur vos candidatures</motion.h1>
      <motion.div
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.3 }}>
        <Link to="/candidature" className="addCandidate">Ajouter une candidature</Link>
      </motion.div>
        <motion.p
        initial={{ scale: 0, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.3 }}
        >Voici le nombre de candidature : {count}</motion.p>
      <motion.div className="candidatureCount"
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.35 }}>
        <p>Candidature en attente: {statusCounts['attente']}</p>
        <p>Candidature accepté: {statusCounts['accepté']}</p>
        <p>Candidature refusé: {statusCounts['refusé']}</p>
      </motion.div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="entreprise">Entreprise</label>
          <input type="text" name="entreprise" onChange={e => setEntreprise(e.target.value)} value={entreprise} />
          <label htmlFor="status">Status :</label>
          <select name="status" value={status} onChange={e => setStatus(e.target.value)}>
            <option value="">---</option>
            <option value="attente">attente</option>
            <option value="accepté">accepté</option>
            <option value="refusé">refusé</option>
          </select>
          <button type="submit">Filtrer</button>
        </form>
        
          <button onClick={() => fetchCandidature()}>Reset</button>
        
      </div>
      <motion.div className="candidatureList"
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}>
        {candidatures.length > 0 ? (
          candidatures.map((candidature, index) => (
            <div key={index} className={`candidatureItem ${expiredCandidatures.includes(candidature._id) ? 'expired' : ''}`}>
              <p>Entreprise : {candidature.entreprise}</p>
              <p>Poste : {candidature.poste}</p>
              <p>Lien : {candidature.lien}</p>
              {candidature.createdAt == candidature.updatedAt ?(<p>Date : {candidature.createdAt}</p>) : (<p>Date : {candidature.updatedAt}</p>)}
              <p>Statut : {candidature.status}</p>
              <div className="candidatureItemButtons">

                <button onClick={() => deleteCandi(candidature._id)}>Supprimer</button>

                <Link to={'/modification/:'+ candidature._id} id={candidature._id} className="modifyButton">Modifier</Link>
              </div>
            </div>

          ))) : (
          <p>Aucune candidature trouvée</p>
        )}
      </motion.div>
    </div>
  );
};

export default Accueil;