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
    <div>
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