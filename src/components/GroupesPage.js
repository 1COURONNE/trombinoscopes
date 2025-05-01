// Fichier : src/components/GroupesPage.js
import React, { useState } from 'react';
import './GroupesPage.css';
import { v4 as uuidv4 } from 'uuid';

export default function GroupesPage() {
  // Liste des groupes (état local)
  const [groupes, setGroupes] = useState([]);

  // Champs du formulaire de création
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);

  // Fonction pour ajouter un nouveau groupe
  const ajouterGroupe = () => {
    if (!nom || !description || !logo) {
      alert('Veuillez remplir tous les champs et sélectionner un logo.');
      return;
    }

    const nouveauGroupe = {
      id: uuidv4(), // ID unique pour le groupe
      nom,
      description,
      logo: URL.createObjectURL(logo), // Crée une URL locale pour l'image
    };

    setGroupes([...groupes, nouveauGroupe]); // Ajoute le groupe à la liste
    setNom('');
    setDescription('');
    setLogo(null);
  };

  // Supprimer un groupe
  const supprimerGroupe = (id) => {
    const confirmation = window.confirm('Voulez-vous vraiment supprimer ce groupe ?');
    if (confirmation) {
      setGroupes(groupes.filter((groupe) => groupe.id !== id));
    }
  };

  return (
    <div className="groupes-container">
      <div className="formulaire">
        <h2>Créer un groupe</h2>
        <input
          type="text"
          placeholder="Nom du groupe"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
        />
        <textarea
          placeholder="Description du groupe"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setLogo(e.target.files[0])}
        />
        <button onClick={ajouterGroupe}>Ajouter</button>
      </div>

      <div className="liste-groupes">
        <h2>Groupes créés</h2>
        {groupes.length === 0 && <p>Aucun groupe pour le moment.</p>}
        <div className="groupes-grid">
          {groupes.map((groupe) => (
            <div key={groupe.id} className="carte-groupe">
              <img src={groupe.logo} alt="Logo du groupe" />
              <h3>{groupe.nom}</h3>
              <p>{groupe.description}</p>
              <button onClick={() => supprimerGroupe(groupe.id)}>Supprimer</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

