import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosInstance from '../../axios';
import './accueil.css';

const Accueil = () => {
  const [candidatures, setcandidatures] = useState([]);

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const response = await axiosInstance.get("/candidature")
        console.log(response)
      } catch(err){
        console.log(err)
      }
    }
    fetchCandidature()
  },[])

  const listCandidature = () => {
    return candidatures.map((candidature, index) => {
      return (
        <div key={index}>
          <p>{candidature.entreprise}</p>
          <p>{candidature.poste}</p>
          <p>{candidature.lien}</p>
          <p>{candidature.date}</p>
        </div>
      )
    })
  }

  return (

    <div className="bodyAccueil">
      <h1>Bienvenue sur vos candidatures</h1>
      <Link to="/candidature">Ajouter une candidature</Link>
      <div className="listCandidature">
        {listCandidature}
      </div>
    </div>
  );
}

export default Accueil;