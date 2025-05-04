import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './RecherchePage.css';

const GroupeDetailsPage = () => {
  const { id } = useParams();
  const [caracteristiques, setCaracteristiques] = useState([]);
  const [nouvelleCarac, setNouvelleCarac] = useState({ nom: '', type: 'texte' });
  const [membres, setMembres] = useState([]);
  const [membreActuel, setMembreActuel] = useState({});
  const [ajoutPossible, setAjoutPossible] = useState(false);

  useEffect(() => {
    const savedCaracs = JSON.parse(localStorage.getItem(`caracteristiques-${id}`)) || [];
    const savedMembres = JSON.parse(localStorage.getItem(`membres-${id}`)) || [];
    setCaracteristiques(savedCaracs);
    setMembres(savedMembres);
    setAjoutPossible(savedCaracs.length > 0);
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`caracteristiques-${id}`, JSON.stringify(caracteristiques));
  }, [caracteristiques]);

  useEffect(() => {
    localStorage.setItem(`membres-${id}`, JSON.stringify(membres));
  }, [membres]);

  const ajouterCaracteristique = () => {
    if (!nouvelleCarac.nom.trim()) return;
    const exist = caracteristiques.some((c) => c.nom === nouvelleCarac.nom);
    if (!exist) {
      setCaracteristiques([...caracteristiques, nouvelleCarac]);
      setNouvelleCarac({ nom: '', type: 'texte' });
      setAjoutPossible(true);
    }
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

  const supprimerMembre = (index) => {
    const confirmation = window.confirm("Voulez-vous supprimer ce membre ?");
    if (confirmation) {
      const copie = [...membres];
      copie.splice(index, 1);
      setMembres(copie);
    }
  };

  return (
    <div className="groupe-details-container">
      <h2>Caractéristiques du groupe</h2>
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

      {ajoutPossible && (
        <>
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
        </>
      )}

      <h2>Membres du groupe</h2>
      <div className="membres-list">
        {membres.map((membre, index) => (
          <div key={index} className="membre-card" onClick={() => supprimerMembre(index)}>
            <img src={membre.photo} alt="profil" />
            {caracteristiques.map((carac, i) => (
              <p key={i}><strong>{carac.nom} :</strong> {membre[carac.nom]}</p>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupeDetailsPage;

