import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from '../../axios';
import './modification.css'

const Modification = () => {
  const navigate = useNavigate();
  const candiId = useParams()
  const cleanedId = candiId.id.replace(':', ''); 

  const [formEntreprise, setformEntreprise] = useState('');
  const [formPoste, setformPoste] = useState('');
  const [formLien, setformLien] = useState('');
  const [formStatus, setformStatus] = useState('attente');
  

  const handleChange = (event) => {
      setformStatus(event.target.value);
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      const data = await axiosInstance.put(`/put/${cleanedId}`, {
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
        <input type="text" name="entreprise" placeholder="Microsoft" required onChange = {e => setformEntreprise(e.target.value)} value={formEntreprise} />
      </label>
      <label className="label">
        Poste
        <input type="text" name="poste" placeholder="CTO" required onChange = {e => setformPoste(e.target.value)} value={formPoste}/>
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
        <button type="submit">Modifier</button>
    </form>
  </div>
  );
}

export default Modification;