// Fichier : src/pages/ConfirmationPage.js

import React from 'react';
import './ConfirmationPage.css'; // Importation du style de la page
import { useNavigate } from 'react-router-dom';

function ConfirmationPage() {
  const navigate = useNavigate();

  // Fonction qui redirige l'utilisateur vers la page d'accueil
  const retourAccueil = () => {
    navigate('/');
  };

  return (
    <div className="confirmation-container">
      <div className="confirmation-overlay">
        <h1 className="confirmation-titre">Opération réussie !</h1>

        <p className="confirmation-message">
          Votre action a été effectuée avec succès. Merci pour votre interaction.
        </p>

        <button className="confirmation-btn" onClick={retourAccueil}>
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
}

export default ConfirmationPage;

