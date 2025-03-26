import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from '../../axios';
import './accueil.css';

const Accueil = () => {
  const [candidatures, setCandidatures] = useState([]); 

  const fetchCandidature = async () => {
    try {
      const response = await axiosInstance.get("/liste");
      setCandidatures(response.data.candidates);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCandidature();
  }, []);

  return (
    <div className="bodyAccueil">
      <h1>Bienvenue sur vos candidatures</h1>
      <Link to="/candidature">Ajouter une candidature</Link>
      <div className="candidatureList">
        {candidatures.length > 0 ? (
          candidatures.map((candidature, index) => (
            <div key={index} className="candidatureItem">
              <p>Entreprise : {candidature.entreprise}</p>
              <p>Poste : {candidature.poste}</p>
              <p>Lien : {candidature.lien}</p>
              <p>Date : {candidature.date}</p>
              <p>Statut : {candidature.status}</p>
              <div>
                <button>Supprimer</button>
                <button>Modifier</button>
              </div>
            </div>
          ))
        ) : (
          <p>Aucune candidature trouvée.</p>
        )}
      </div>
    </div>
  );
};

export default Accueil;