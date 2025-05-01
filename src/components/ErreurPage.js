// Fichier : src/pages/ErreurPage.js

import React from 'react';
import './ErreurPage.css';
import { useNavigate } from 'react-router-dom';

function ErreurPage() {
  const navigate = useNavigate();

  // Fonction pour retourner à la page d'accueil
  const retourAccueil = () => {
    navigate('/');
  };

  return (
    <div className="erreur-container">
      <div className="erreur-overlay">
        <h1 className="erreur-titre">Oups ! Une erreur est survenue</h1>
        <p className="erreur-message">
          La page que vous cherchez n'existe pas ou une erreur s'est produite pendant le chargement.
        </p>
        <button className="erreur-btn" onClick={retourAccueil}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default ErreurPage;

