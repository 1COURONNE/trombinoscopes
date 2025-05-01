// Fichier : src/components/RecherchePage.js
// Cette page permet à l'utilisateur de rechercher un groupe ou un membre selon des critères dynamiques

import React, { useState } from 'react';
import './RecherchePage.css';

// Composant principal de la page de recherche
function RecherchePage() {
  // État pour le critère sélectionné (nom, matricule, etc.)
  const [critere, setCritere] = useState('');
  // État pour la valeur saisie par l'utilisateur
  const [valeur, setValeur] = useState('');
  // État pour les résultats simulés
  const [resultats, setResultats] = useState([]);

  // Fonction déclenchée lors de la recherche
  const lancerRecherche = () => {
    // Simulation de recherche (à remplacer par logique réelle avec base de données plus tard)
    const mockResults = [
      { id: 1, type: 'groupe', nom: 'Développeurs', description: 'Équipe backend' },
      { id: 2, type: 'membre', nom: 'Jean Dupont', matricule: '12345' },
    ];
    setResultats(mockResults); // On met à jour les résultats avec les données simulées
  };

  return (
    <div className="recherche-container">
      <div className="recherche-overlay">
        <h1 className="recherche-titre">🔍 Recherche</h1>

        {/* Formulaire de recherche */}
        <div className="recherche-form">
          <select
            value={critere}
            onChange={(e) => setCritere(e.target.value)}
          >
            <option value="">Choisir un critère</option>
            <option value="nom">Nom</option>
            <option value="matricule">Matricule</option>
            <option value="type">Type (groupe ou membre)</option>
          </select>

          <input
            type="text"
            placeholder="Entrez la valeur à rechercher"
            value={valeur}
            onChange={(e) => setValeur(e.target.value)}
          />

          <button className="recherche-btn" onClick={lancerRecherche}>
            Rechercher
          </button>
        </div>

        {/* Affichage des résultats */}
        <div className="resultats">
          {resultats.map((item) => (
            <div key={item.id} className="resultat-card">
              {item.type === 'groupe' ? (
                <>
                  <h3>👥 Groupe : {item.nom}</h3>
                  <p>Description : {item.description}</p>
                </>
              ) : (
                <>
                  <h3>🙍 Membre : {item.nom}</h3>
                  <p>Matricule : {item.matricule}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RecherchePage;

