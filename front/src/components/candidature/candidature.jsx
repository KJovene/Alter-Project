import { useState } from "react";
import './candidature.css';

const Candidature = () => {
  const [value, setValue] = useState('attente');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="bodyCandidature">
      <form method="POST" onSubmit={handleSubmit}>
        <label className="label">
          Entreprise 
          <input type="text" name="entreprise" placeholder="Microsoft"/>
        </label>
        <label className="label">
          Poste
          <input type="text" name="poste" placeholder="CTO"/>
        </label>
        <label className="label">
          Lien
          <input type="text" name="lien" />
        </label>
        <label className="label">
          Date de l'inscription
          <input type="date" name="date" />
        </label>
        <label className="label">
          Etat de la candidature
          <select value={value} onChange={handleChange}>
            <option value="attente">En attente</option>
            <option value="accepté">Accepté</option>
            <option value="refusé">Refusé</option>
          </select>
        </label>
        <input type="submit" value="Envoyer" />
      </form>
    </div>
  );
}

export default Candidature;