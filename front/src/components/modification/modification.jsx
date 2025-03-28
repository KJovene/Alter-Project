import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axiosInstance from '../../axios';
import './modification.css'
import { motion } from "framer-motion";

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
  <div>
      <Link to="/">
          <motion.div className="containerButton"
          initial={{ scale: 0, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          transition={{ duration: 0.6 }}>
            <img src="../../../img/XMLID_222_.svg" alt="svg retour" />
            <button className="button">Retour</button>
          </motion.div>
        </Link>
    <div className="bodyCandidature">
      <motion.form method="POST" onSubmit={handleSubmit}
      initial={{ scale: 0, y: 20 }}
      animate={{ scale: 1, y: 0 }}
      transition={{ duration: 0.6 }}>
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
      </motion.form>
    </div>
  </div>
  );
}

export default Modification;