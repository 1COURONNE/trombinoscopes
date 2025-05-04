
// Fichier : src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { BrowserRouter } from 'react-router-dom'; 
import Navbar from './components/Navbar'; // ✅ importation du menu global
import Footer from './components/Footer'; // ✅ importer le footer
// Pages
import HomePage from './components/HomePage';
import GroupesPage from './components/GroupesPage';
import GestionMembresPage from './components/GestionMembresPage';
import GroupeDetailsPage from './components/GroupeDetailsPage';
import ModificationPage from './components/ModificationPage';
import ConfirmationPage from './components/ConfirmationPage';
import ErreurPage from './components/ErreurPage';

function App() {
  return (
    <Router>
      <Navbar /> {/* ✅ affichage du menu global sur toutes les pages */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/groupes" element={<GroupesPage />} />
        <Route path="/membres/:groupeId" element={<GestionMembresPage />} />
        <Route path="/GroupeDetailsPage" element={<GroupeDetailsPage />} />
        <Route path="/modification/:type/:id" element={<ModificationPage />} />
        <Route path="/confirmation" element={<ConfirmationPage />} />
        <Route path="*" element={<ErreurPage />} />
      </Routes>
      <Footer /> {/* ✅ affichage du footer global */}
    </Router>
  );
}



export default App;



