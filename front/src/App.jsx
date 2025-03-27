import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Candidature from './components/candidature/candidature.jsx';
import Accueil from './components/accueil/accueil.jsx';
import Modification from './components/modification/modification.jsx'

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/candidature" element={<Candidature />} />
        <Route path="/modification/:id" element={<Modification />} />
      </Routes>
    </Router>
  );
}

export default App;