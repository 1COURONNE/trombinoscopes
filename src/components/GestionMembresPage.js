// Fichier : src/components/GestionMembresPage.js
import React, { useState } from 'react';
import './GestionMembresPage.css';

const GestionMembresPage = () => {
  const [caracteristiques, setCaracteristiques] = useState([]);
  const [nouvelleCarac, setNouvelleCarac] = useState({ nom: '', type: 'texte' });
  const [membres, setMembres] = useState([]);
  const [membreActuel, setMembreActuel] = useState({});

  const ajouterCaracteristique = () => {
    if (nouvelleCarac.nom.trim() === '') return;
    setCaracteristiques([...caracteristiques, nouvelleCarac]);
    setNouvelleCarac({ nom: '', type: 'texte' });
  };

  const ajouterMembre = () => {
    if (!membreActuel.photo) {
      alert("Veuillez ajouter une photo de profil.");
      return;
    }
    setMembres([...membres, membreActuel]);
    setMembreActuel({});
  };

  const handleInputChange = (e, carac) => {
    setMembreActuel({
      ...membreActuel,
      [carac.nom]: e.target.value,
    });
  };

  return (
    <div className="gestion-container">
      <div className="overlay">
        <h2>Définir les caractéristiques du groupe</h2>
        <div className="caracteristiques-form">
          <input
            type="text"
            placeholder="Nom de la caractéristique"
            value={nouvelleCarac.nom}
            onChange={(e) => setNouvelleCarac({ ...nouvelleCarac, nom: e.target.value })}
          />
          <select
            value={nouvelleCarac.type}
            onChange={(e) => setNouvelleCarac({ ...nouvelleCarac, type: e.target.value })}
          >
            <option value="texte">Chaîne de caractères</option>
            <option value="nombre">Entier</option>
            <option value="flottant">Réel</option>
            <option value="caractere">Caractère</option>
            <option value="image">Image</option>
          </select>
          <button onClick={ajouterCaracteristique}>Ajouter</button>
        </div>

        <h2>Ajouter un membre</h2>
        <div className="membre-form">
          <input
            type="file"
            accept="image/*"
            onChange={(e) =>
              setMembreActuel({ ...membreActuel, photo: URL.createObjectURL(e.target.files[0]) })
            }
          />
          {caracteristiques.map((carac, index) => (
            <input
              key={index}
              type="text"
              placeholder={carac.nom}
              value={membreActuel[carac.nom] || ''}
              onChange={(e) => handleInputChange(e, carac)}
            />
          ))}
          <button onClick={ajouterMembre}>Ajouter le membre</button>
        </div>

        <h2>Membres enregistrés</h2>
        <div className="membres-list">
          {membres.map((m, i) => (
            <div key={i} className="membre-card">
              <img src={m.photo} alt="profil" />
              {caracteristiques.map((carac, j) => (
                <p key={j}><strong>{carac.nom} :</strong> {m[carac.nom]}</p>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GestionMembresPage;

