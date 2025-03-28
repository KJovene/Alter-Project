import { useState } from "react";
import './candidature.css';
import axiosInstance from '../../axios';
import { Link, useNavigate } from "react-router-dom";


const Candidature = () => {
  const [formEntreprise, setformEntreprise] = useState('');
  const [formPoste, setformPoste] = useState('');
  const [formLien, setformLien] = useState('');
  const [formStatus, setformStatus] = useState('attente');
  const navigate = useNavigate();

  const handleChange = (event) => {
    setformStatus(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axiosInstance.post("/post", {
      entreprise : formEntreprise,
      poste : formPoste,
      lien : formLien,
      status : formStatus
    });
    navigate('/');
  };
  
  

  return (
    <div className="bodyCandidature">
      <Link to='/'>
        <button>Retour</button>
      </Link>
      <form method="POST" onSubmit={handleSubmit}>
        <label className="label">
          Entreprise 
          <input type="text" name="entreprise" required placeholder="Microsoft" onChange = {e => setformEntreprise(e.target.value)} value={formEntreprise} />
        </label>
        <label className="label">
          Poste
          <input type="text" name="poste" required placeholder="CTO" onChange = {e => setformPoste(e.target.value)} value={formPoste}/>
        </label>
        <label className="label">
          Lien
          <input type="text" name="lien" required onChange = {e => setformLien(e.target.value)} value={formLien} />
        </label>
        <label>
          Statut :
          <select name="status" onChange={handleChange} value={formStatus}>
            <option defaultValue="attente" value="attente">En attente</option>
            <option value="accepté">Accepté</option>
            <option value="refusé">Refusé</option>
          </select>
        </label>
          <button type="submit">Ajouter</button>

      </form>
    </div>
  );
}

export default Candidature;