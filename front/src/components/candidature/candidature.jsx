import { useState } from "react";
import './candidature.css';
import axiosInstance from '../../axios';
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";


const Candidature = () => {
  const [formEntreprise, setformEntreprise] = useState('');
  const [formPoste, setformPoste] = useState('');
  const [formLien, setformLien] = useState('');
  const [formDate, setformDate] = useState('');
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
      date : formDate,
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

export default Candidature;