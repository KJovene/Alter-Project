import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from '../../axios';
import './accueil.css';


const Accueil = () => {
  const [candidatures, setCandidatures] = useState([]);
  const [count, setCount] = useState(0);
  const [statusCounts, setStatusCounts] = useState({
    "attente": 0,
    "accepté": 0,
    "refusé": 0
  });
  const [entreprise, setEntreprise] = useState('');
  const [status, setStatus] = useState('');

  const fetchCandidature = async () => {
    try {
      const response = await axiosInstance.get("/get");
      setCandidatures(response.data.candidates);
      return response.data.candidates._id
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
      <h1>Bienvenue sur vos candidatures</h1>
      <Link to="/candidature">Ajouter une candidature</Link>
      <div>
        <p>Voici le nombre de candidature : {count}</p>
        <p>Candidature en attente: {statusCounts['attente']}</p>
        <p>Candidature accepté: {statusCounts['accepté']}</p>
        <p>Candidature refusé: {statusCounts['refusé']}</p>
      </div>
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
      <div className="candidatureList">
        {candidatures.length > 0 ? (
          candidatures.map((candidature, index) => (
            <div key={index} className="candidatureItem">
              <p>Entreprise : {candidature.entreprise}</p>
              <p>Poste : {candidature.poste}</p>
              <p>Lien : {candidature.lien}</p>
              {candidature.createdAt == candidature.updatedAt ?(<p>Date : {candidature.createdAt}</p>) : (<p>Date : {candidature.updatedAt}</p>)}
              <p>Statut : {candidature.status}</p>
              <div>

                <button onClick={() => deleteCandi(candidature._id)}>Supprimer</button>
                <Link to={'/modification/:' + candidature._id} id={candidature._id}>Modifier</Link>

              </div>
            </div>

          ))) : (
          <p>Aucune candidature trouvée</p>
        )}
      </div>

    </div>
  );
};

export default Accueil;