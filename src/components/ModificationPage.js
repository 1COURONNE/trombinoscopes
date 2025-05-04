

// Fichier : src/components/ModificationPage.js
// Interface professionnelle, interactive et moderne de modification

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import './ModificationPage.css';

function ModificationPage() {
  const [type, setType] = useState('groupe');
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [matricule, setMatricule] = useState('');
  //const [photoFile, setPhotoFile] = useState('/public/yes.png');
  const [photoPreview, setPhotoPreview] = useState(null);

  const handleModification = () => {
    alert(`${type === 'groupe' ? 'Groupe' : 'Membre'} modifié avec succès !`);
    // Intégration backend à venir
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
   // setPhotoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <motion.div
      className="modification-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <motion.div
        className="modification-overlay"
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="modification-titre">✏️ Modifier un {type}</h1>

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

        <motion.div className="modification-form" whileHover={{ scale: 1.02 }}>
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

          <input
            type="file"
            accept="image/*"
            onChange={handlePhotoChange}
          />

          {photoPreview && (
            <motion.img
              src={photoPreview}
              alt="Prévisualisation"
              className="photo-preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            />
          )}

          <motion.button
            className="modification-btn"
            onClick={handleModification}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Sauvegarder les modifications
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default ModificationPage;

