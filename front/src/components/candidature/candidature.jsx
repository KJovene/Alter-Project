import { useState } from "react";
import './candidature.css';
import axiosInstance from '../../axios';

const Candidature = () => {
  const [formData, setformData] = useState('attente');

  const handleChange = (event) => {
    setformData(event.target.formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bodyCandidature">
      <form method="POST" onSubmit={handleSubmit}>
        <label>
          Entreprise :
          <input type="text" name="entreprise" />
        </label>
        <label>
          Poste :
          <input type="text" name="poste" />
        </label>
        <label>
          Lien :
          <input type="text" name="lien" />
        </label>
        <label>
          Date de l'inscription:
          <input type="date" name="date" />
        </label>
        <label>
          Parfum favori :
          <select name={formData} onChange={handleChange}>
            <option name="attente">En attente</option>
            <option name="accepté">Accepté</option>
            <option name="refusé">Refusé</option>
          </select>
        </label>
        <input type="submit" name="Envoyer" />
      </form>
    </div>
  );
}

export default Candidature;