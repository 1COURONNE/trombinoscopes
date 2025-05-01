// Fichier : src/pages/ModificationPage.js
// Cette page permet à l'utilisateur de modifier un groupe ou un membre existant avec une interface professionnelle

import React, { useState } from 'react';
import './ModificationPage.css';

function ModificationPage() {
  // États pour simuler les données existantes d'un membre ou groupe
  const [type, setType] = useState('groupe'); // soit "groupe" soit "membre"
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [matricule, setMatricule] = useState('');
  const [photo, setPhoto] = useState(null);

  // Fonction de simulation de modification
  const handleModification = () => {
    alert(`${type === 'groupe' ? 'Groupe' : 'Membre'} modifié avec succès !`);
    // Plus tard, ici on enverra la modification au backend ou au stockage local
  };

  return (
    <div className="modification-container">
      <div className="modification-overlay">
        <h1 className="modification-titre">✏️ Modifier un {type}</h1>

        {/* Choix entre groupe ou membre */}
        <div className="type-select">
          <label>
            <input
              type="radio"
              value="groupe"
              checked={type === 'groupe'}
              onChange={() => setType('groupe')}
            /> Groupe
          </label>
          <label>
            <input
              type="radio"
              value="membre"
              checked={type === 'membre'}
              onChange={() => setType('membre')}
            /> Membre
          </label>
        </div>

        {/* Formulaire de modification */}
        <div className="modification-form">
          <input
            type="text"
            placeholder="Nom"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
          />

          {type === 'groupe' ? (
            <textarea
              placeholder="Description du groupe"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : (
            <input
              type="text"
              placeholder="Matricule du membre"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
            />
          )}

          {/* Import de l'image (photo de profil ou logo) */}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
          />

          <button className="modification-btn" onClick={handleModification}>
            Sauvegarder les modifications
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModificationPage;

