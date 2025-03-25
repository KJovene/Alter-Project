import './accueil.css';
import { Link } from 'react-router-dom';

const Accueil = () => {
  return (
    <div className="bodyAccueil">
      <h1>Bienvenue sur le site de gestion de candidatures</h1>
      <Link>Vous pouvez ajouter des candidatures, les modifier et les supprimer</Link>
    </div>
  );
}

export default Accueil;