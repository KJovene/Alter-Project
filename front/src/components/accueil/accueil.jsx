import { Link } from "react-router-dom";
import './accueil.css';

const Accueil = () => {

  


  return (

    <div className="bodyAccueil">
      <h1>Bienvenue sur vos candidatures</h1>
      <Link to="/candidature">Ajouter une candidature</Link>
    </div>
  );
}

export default Accueil;