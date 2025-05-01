// Fichier : src/components/SuppressionPage.js
// Cette page permet de supprimer un groupe ou un membre avec un design professionnel, animé et interactif

import React, { useState } from 'react';
import './SuppressionPage.css';

function SuppressionPage() {
  const [typeSuppression, setTypeSuppression] = useState('groupe');
  const [identifiant, setIdentifiant] = useState('');

  // Fonction qui déclenche la suppression (à connecter plus tard à la logique de backend ou de contexte)
  const handleSuppression = () => {
    if (!identifiant) {
      alert("Veuillez renseigner l'identifiant du groupe ou du membre à supprimer.");
      return;
    }
    alert(`Suppression du ${typeSuppression} avec l'identifiant : ${identifiant}`);
  };

  return (
    <div className="suppression-container">
      <div className="suppression-overlay">
        <h2 className="suppression-titre">Supprimer un Groupe ou un Membre</h2>

        {/* Sélection du type de suppression */}
        <div className="suppression-type-select">
          <label>
            <input
              type="radio"
              value="groupe"
              checked={typeSuppression === 'groupe'}
              onChange={() => setTypeSuppression('groupe')}
            /> Groupe
          </label>
          <label>
            <input
              type="radio"
              value="membre"
              checked={typeSuppression === 'membre'}
              onChange={() => setTypeSuppression('membre')}
            /> Membre
          </label>
        </div>

        {/* Formulaire de suppression */}
        <div className="suppression-form">
          <input
            type="text"
            placeholder={`Entrez l'identifiant du ${typeSuppression} à supprimer`}
            value={identifiant}
            onChange={(e) => setIdentifiant(e.target.value)}
          />

          <button className="suppression-btn" onClick={handleSuppression}>
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuppressionPage;

