import { useState } from "react";
import './candidature.css';
import axiosInstance from '../../axios';
import { Link } from "react-router-dom";


const Candidature = () => {
  const [formEntreprise, setformEntreprise] = useState('');
  const [formPoste, setformPoste] = useState('');
  const [formLien, setformLien] = useState('');
  const [formDate, setformDate] = useState('');
  const [formStatus, setformStatus] = useState('');
  
  const handleChange = (event) => {
    setformStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axiosInstance.post("/post", {
      entreprise : formEntreprise,
      poste : formPoste,
      lien : formLien,
      date : formDate,
      status : formStatus
    })
  };
  
  

  return (
    <div className="bodyCandidature">
      <Link to="/">
        <button>Retour</button>
      </Link>
      <form method="POST" onSubmit={handleSubmit}>
        <label className="label">
          Entreprise 
          <input type="text" name="entreprise" placeholder="Microsoft" onChange = {e => setformEntreprise(e.target.value)} value={formEntreprise} />
        </label>
        <label className="label">
          Poste
          <input type="text" name="poste" placeholder="CTO" onChange = {e => setformPoste(e.target.value)} value={formPoste}/>
        </label>
        <label className="label">
          Lien
          <input type="text" name="lien" onChange = {e => setformLien(e.target.value)} value={formLien} />
        </label>
        <label className="label">
          Date de l'inscription
          <input type="date" name="date" onChange = {e => setformDate(e.target.value)} value={formDate} />
        </label>
        <label>
          Statut :
          <select name="status" onChange={handleChange} value={formStatus}>
            <option defaultValue="attente" value="attente">En attente</option>
            <option value="accepté">Accepté</option>
            <option value="refusé">Refusé</option>
          </select>
        </label>
          <input type="submit" />
      </form>
      <div>
      </div>
    </div>
  );
}

export default Candidature;