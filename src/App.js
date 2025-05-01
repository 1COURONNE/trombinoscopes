
// Fichier : src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar'; // ✅ importation du menu global
import Footer from './components/Footer'; // ✅ importer le footer
// Pages
import Accueil from './pages/Accueil';
import GroupesPage from './pages/GroupesPage';
import MembresPage from './pages/MembresPage';
import RecherchePage from './pages/RecherchePage';
import ModificationPage from './pages/ModificationPage';
import ConfirmationPage from './pages/ConfirmationPage';
import ErreurPage from './pages/ErreurPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ affichage du menu global sur toutes les pages */}
      <Routes>
        <Route path="/" element={<Accueil />} />
        <Route path="/groupes" element={<GroupesPage />} />
        <Route path="/membres/:groupeId" element={<MembresPage />} />
        <Route path="/recherche" element={<RecherchePage />} />
        <Route path="/modification/:type/:id" element={<ModificationPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<ErreurPage />} />
      </Routes>
      <Footer /> {/* ✅ affichage du footer global */}
    </Router>
  );
}



export default App;



