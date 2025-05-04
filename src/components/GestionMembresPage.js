import React, { useEffect, useState } from 'react';
import './GestionMembresPage.css';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';

const GestionMembresPage = () => {
  const [groupes, setGroupes] = useState([]);
  const [nouveauNomGroupe, setNouveauNomGroupe] = useState('');
  const [nouvelleDescGroupe, setNouvelleDescGroupe] = useState('');
  const [nouveauLogoGroupe, setNouveauLogoGroupe] = useState(null);
  const [groupeActuel, setGroupeActuel] = useState(null);
  const [caracteristiques, setCaracteristiques] = useState([]);
  const [nouvelleCarac, setNouvelleCarac] = useState({ nom: '', type: 'texte' });
  const [membres, setMembres] = useState([]);
  const [membreActuel, setMembreActuel] = useState({});
  const [recherche, setRecherche] = useState('');

  useEffect(() => {
    const savedGroupes = JSON.parse(localStorage.getItem('groupes')) || [];
    setGroupes(savedGroupes);
  }, []);

  useEffect(() => {
    if (groupeActuel) {
      const savedCaracs = JSON.parse(localStorage.getItem(`caracteristiques-${groupeActuel.id}`)) || [];
      const savedMembres = JSON.parse(localStorage.getItem(`membres-${groupeActuel.id}`)) || [];
      setCaracteristiques(savedCaracs);
      setMembres(savedMembres);
    }
  }, [groupeActuel]);

  useEffect(() => {
    if (groupeActuel) {
      localStorage.setItem(`caracteristiques-${groupeActuel.id}`, JSON.stringify(caracteristiques));
    }
  }, [caracteristiques]);

  useEffect(() => {
    if (groupeActuel) {
      localStorage.setItem(`membres-${groupeActuel.id}`, JSON.stringify(membres));
    }
  }, [membres]);

  const ajouterGroupe = () => {
    if (!nouveauNomGroupe.trim() || !nouvelleDescGroupe.trim() || !nouveauLogoGroupe) return;
    const nouveauGroupe = {
      id: uuidv4(),
      nom: nouveauNomGroupe,
      description: nouvelleDescGroupe,
      logo: nouveauLogoGroupe
    };
    const newGroupes = [...groupes, nouveauGroupe];
    setGroupes(newGroupes);
    localStorage.setItem('groupes', JSON.stringify(newGroupes));
    setNouveauNomGroupe('');
    setNouvelleDescGroupe('');
    setNouveauLogoGroupe(null);
  };

  const modifierGroupe = (groupeId, updatedData) => {
    const updatedGroupes = groupes.map(g => g.id === groupeId ? { ...g, ...updatedData } : g);
    setGroupes(updatedGroupes);
    localStorage.setItem('groupes', JSON.stringify(updatedGroupes));
  };

  const supprimerGroupe = (groupeId) => {
    if (window.confirm("Supprimer ce groupe ?")) {
      const updated = groupes.filter(g => g.id !== groupeId);
      setGroupes(updated);
      localStorage.setItem('groupes', JSON.stringify(updated));
      if (groupeActuel?.id === groupeId) {
        setGroupeActuel(null);
        setCaracteristiques([]);
        setMembres([]);
      }
    }
  };

  const ajouterCaracteristique = () => {
    if (!nouvelleCarac.nom.trim()) return;
    const exist = caracteristiques.some(c => c.nom === nouvelleCarac.nom);
    if (!exist) {
      setCaracteristiques([...caracteristiques, nouvelleCarac]);
      setNouvelleCarac({ nom: '', type: 'texte' });
    }
  };

  const ajouterMembre = () => {
    if (!membreActuel.photo) {
      alert("Veuillez ajouter une photo de profil.");
      return;
    }
    const nouveau = { ...membreActuel, id: uuidv4() };
    setMembres([...membres, nouveau]);
    setMembreActuel({});
  };

  const modifierMembre = (id, data) => {
    const updated = membres.map(m => m.id === id ? { ...m, ...data } : m);
    setMembres(updated);
  };

  const supprimerMembre = (id) => {
    if (window.confirm("Supprimer ce membre ?")) {
      const updated = membres.filter(m => m.id !== id);
      setMembres(updated);
    }
  };

  const groupesFiltres = groupes.filter(g => g.nom.toLowerCase().includes(recherche.toLowerCase()));

  return (
    <motion.div className="gestion-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="header">
        <h1>Gestion des Groupes et Membres</h1>
        <input
          type="text"
          placeholder="Rechercher un groupe"
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
        />
      </div>

      <motion.div className="groupe-form" animate={{ scale: [0.95, 1] }} transition={{ duration: 0.5 }}>
        <input type="text" placeholder="Nom du groupe" value={nouveauNomGroupe} onChange={(e) => setNouveauNomGroupe(e.target.value)} />
        <input type="text" placeholder="Description" value={nouvelleDescGroupe} onChange={(e) => setNouvelleDescGroupe(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setNouveauLogoGroupe(URL.createObjectURL(e.target.files[0]))} />
        <button onClick={ajouterGroupe}>Créer le groupe</button>
      </motion.div>

      <div className="groupes-list">
        {groupesFiltres.map((g) => (
          <motion.div
            key={g.id}
            className={`groupe-item ${groupeActuel?.id === g.id ? 'actif' : ''}`}
            onClick={() => setGroupeActuel(g)}
            whileHover={{ scale: 1.05 }}
            layout
          >
            <img src={g.logo} alt="logo" />
            <div>
              <h3>{g.nom}</h3>
              <p>{g.description}</p>
            </div>
            <button onClick={() => supprimerGroupe(g.id)}>Supprimer</button>
          </motion.div>
        ))}
      </div>

      {groupeActuel && (
        <motion.div className="caracteristiques-section" initial={{ y: 50 }} animate={{ y: 0 }}>
          <h2>Caractéristiques de "{groupeActuel.nom}"</h2>
          <div className="caracteristiques-form">
            <input type="text" placeholder="Nom de la caractéristique" value={nouvelleCarac.nom} onChange={(e) => setNouvelleCarac({ ...nouvelleCarac, nom: e.target.value })} />
            <select value={nouvelleCarac.type} onChange={(e) => setNouvelleCarac({ ...nouvelleCarac, type: e.target.value })}>
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
            <input type="file" accept="image/*" onChange={(e) => setMembreActuel({ ...membreActuel, photo: URL.createObjectURL(e.target.files[0]) })} />
            {caracteristiques.map((carac, index) => (
              <input key={index} type="text" placeholder={carac.nom} value={membreActuel[carac.nom] || ''} onChange={(e) => setMembreActuel({ ...membreActuel, [carac.nom]: e.target.value })} />
            ))}
            <button onClick={ajouterMembre}>Ajouter le membre</button>
          </div>

          <h2>Membres</h2>
          <div className="membres-list">
            {membres.map((membre) => (
              <motion.div key={membre.id} className="membre-card" whileHover={{ scale: 1.02 }}>
                <img src={membre.photo} alt="profil" />
                {caracteristiques.map((carac, j) => (
                  <p key={j}><strong>{carac.nom} :</strong> {membre[carac.nom]}</p>
                ))}
                <button onClick={() => supprimerMembre(membre.id)}>Supprimer</button>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default GestionMembresPage;

