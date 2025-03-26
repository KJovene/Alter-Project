import { useState, useEffect } from "react";
import './candidature.css';
import axiosInstance from '../../axios';


const Candidature = () => {
  const [formData, setformData] = useState('attente');
  // const [formEntreprise, setformEntreprise] = useState('');
  // const [formPoste, setformPoste] = useState('');
  // const [formLien, setformLien] = useState('');
  // const [formDate, setformDate] = useState('');
  
  const handleChange = (event) => {
    setformData(event.target.formData);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const response = await axiosInstance.get("/liste")
        console.log(response)
      } catch(err){
        console.log(err)
      }
    }
    fetchCandidature()
  },[])

  // useEffect(() => {
  //   const postCandidature = async () => {
  //     try {
  //       const post = await axiosInstance.post("/candidature",
  //         {
  //           entreprise: "entreprise"
  //         }
  //       )
  //       console.log(response)
  //     } catch(err){
  //       console.log(err)
  //     }
  //   }
  //   postCandidature()
  // },[])

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
        <label>
          Statut :
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