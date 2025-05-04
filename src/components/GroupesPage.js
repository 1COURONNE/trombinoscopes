// GroupesPage.jsx
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { motion } from 'framer-motion';
import './GroupesPage.css';

export default function GroupesPage() {
  const [groupes, setGroupes] = useState([]);
  const [nom, setNom] = useState('');
  const [description, setDescription] = useState('');
  const [logo, setLogo] = useState(null);
  const [editId, setEditId] = useState(null);
  const [recherche, setRecherche] = useState('');
  const [selectedGroupe, setSelectedGroupe] = useState(null);
  const [caracteristiques, setCaracteristiques] = useState({});
  const [nouvelleCarac, setNouvelleCarac] = useState('');
  const [typeCarac, setTypeCarac] = useState('texte');
  const [membres, setMembres] = useState({});
  const [ajoutMembre, setAjoutMembre] = useState(false);
  const [formulaireMembre, setFormulaireMembre] = useState({});

  useEffect(() => {
    const savedGroupes = JSON.parse(localStorage.getItem('groupes')) || [];
    const savedCaracteristiques = JSON.parse(localStorage.getItem('caracteristiques')) || {};
    const savedMembres = JSON.parse(localStorage.getItem('membres')) || {};
    setGroupes(savedGroupes);
    setCaracteristiques(savedCaracteristiques);
    setMembres(savedMembres);
  }, []);

  useEffect(() => {
    localStorage.setItem('groupes', JSON.stringify(groupes));
    localStorage.setItem('caracteristiques', JSON.stringify(caracteristiques));
    localStorage.setItem('membres', JSON.stringify(membres));
  }, [groupes, caracteristiques, membres]);

  const convertirImageEnBase64 = (fichier) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(fichier);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const ajouterOuModifierGroupe = async () => {
    if (!nom || !description || (!logo && !editId)) return alert('Tous les champs sont requis.');

    let logoFinal = logo ? await convertirImageEnBase64(logo) : null;

    if (editId) {
      setGroupes(groupes.map(g => g.id === editId ? { ...g, nom, description, logo: logo ? logoFinal : g.logo } : g));
      setEditId(null);
    } else {
      const nouveau = { id: uuidv4(), nom, description, logo: logoFinal };
      setGroupes([...groupes, nouveau]);
    }

    setNom('');
    setDescription('');
    setLogo(null);
  };

  const supprimerGroupe = (id) => {
    if (window.confirm('Supprimer ce groupe ?')) {
      setGroupes(groupes.filter(g => g.id !== id));
      const { [id]: _, ...restCaracs } = caracteristiques;
      const { [id]: __, ...restMembres } = membres;
      setCaracteristiques(restCaracs);
      setMembres(restMembres);
      if (selectedGroupe === id) setSelectedGroupe(null);
    }
  };

  const modifierGroupe = (groupe) => {
    setNom(groupe.nom);
    setDescription(groupe.description);
    setEditId(groupe.id);
  };

  const ajouterCaracteristique = () => {
    if (!nouvelleCarac) return;
    setCaracteristiques({
      ...caracteristiques,
      [selectedGroupe]: [
        ...(caracteristiques[selectedGroupe] || []),
        { nom: nouvelleCarac, type: typeCarac }
      ]
    });
    setNouvelleCarac('');
  };

  const validerFormulaireMembre = async () => {
    const infos = {};
    for (const carac of caracteristiques[selectedGroupe] || []) {
      if (carac.type === 'image' || carac.type === 'pdf') {
        if (formulaireMembre[carac.nom]) {
          infos[carac.nom] = await convertirImageEnBase64(formulaireMembre[carac.nom]);
        }
      } else {
        infos[carac.nom] = formulaireMembre[carac.nom];
      }
    }
    const nouveauMembre = { id: uuidv4(), ...infos };
    setMembres({
      ...membres,
      [selectedGroupe]: [...(membres[selectedGroupe] || []), nouveauMembre]
    });
    setFormulaireMembre({});
    setAjoutMembre(false);
  };

  const modifierMembre = (id) => {
    const membre = membres[selectedGroupe].find(m => m.id === id);
    setFormulaireMembre(membre);
    setAjoutMembre(true);
    supprimerMembre(id);
  };

  const supprimerMembre = (id) => {
    setMembres({
      ...membres,
      [selectedGroupe]: membres[selectedGroupe].filter(m => m.id !== id)
    });
  };

  const groupesFiltres = groupes.filter(g => g.nom.toLowerCase().includes(recherche.toLowerCase()));

  return (
    <motion.div className="page-container" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <motion.div className="form-section" animate={{ scale: 1 }}>
        <h2>{editId ? 'Modifier le groupe' : 'Créer un groupe'}</h2>
        <input type="text" placeholder="Nom" value={nom} onChange={(e) => setNom(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
        <input type="file" accept="image/*" onChange={(e) => setLogo(e.target.files[0])} />
        <motion.button whileHover={{ scale: 1.05 }} onClick={ajouterOuModifierGroupe}>Enregistrer</motion.button>
      </motion.div>

      <input type="text" placeholder="Rechercher un groupe" value={recherche} onChange={(e) => setRecherche(e.target.value)} />
      <div className="groupes-liste">
        {groupesFiltres.map(g => (
          <motion.div key={g.id} className="groupe-card" whileHover={{ scale: 1.03 }}>
            <img src={g.logo} alt="Logo" />
            <h3>{g.nom}</h3>
            <p>{g.description}</p>
            <div>
              <button onClick={() => modifierGroupe(g)}>Modifier</button>
              <button onClick={() => supprimerGroupe(g.id)}>Supprimer</button>
              <button onClick={() => setSelectedGroupe(g.id)}>Gérer</button>
            </div>
          </motion.div>
        ))}
      </div>

      {selectedGroupe && (
        <motion.div className="gestion-groupe" initial={{ x: 200 }} animate={{ x: 0 }}>
          <h2>Définir les caractéristiques</h2>
          <input type="text" placeholder="Nom de la caractéristique" value={nouvelleCarac} onChange={(e) => setNouvelleCarac(e.target.value)} />
          <select value={typeCarac} onChange={(e) => setTypeCarac(e.target.value)}>
            <option value="texte">Texte</option>
            <option value="nombre">Nombre</option>
            <option value="image">Image</option>
            <option value="pdf">PDF</option>
          </select>
          <button onClick={ajouterCaracteristique}>Ajouter</button>

          <h3>Membres</h3>
          <button onClick={() => setAjoutMembre(true)}>Ajouter un membre</button>
          <div className="membres-liste">
            {(membres[selectedGroupe] || []).map(m => (
              <motion.div key={m.id} className="membre-card" whileHover={{ scale: 1.02 }}>
                {Object.entries(m).map(([key, val]) => (
                  key !== 'id' && <p key={key}><strong>{key}:</strong> {val?.startsWith('data:image') ? <img src={val} alt="img" style={{ width: 50 }} /> : val}</p>
                ))}
                <button onClick={() => modifierMembre(m.id)}>Modifier</button>
                <button onClick={() => supprimerMembre(m.id)}>Supprimer</button>
              </motion.div>
            ))}
          </div>

          {ajoutMembre && (
            <motion.div className="formulaire-membre" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h4>Informations du membre</h4>
              {(caracteristiques[selectedGroupe] || []).map(c => (
                <div key={c.nom}>
                  {c.type === 'texte' || c.type === 'nombre' ? (
                    <input type={c.type === 'nombre' ? 'number' : 'text'} placeholder={c.nom} value={formulaireMembre[c.nom] || ''} onChange={(e) => setFormulaireMembre({ ...formulaireMembre, [c.nom]: e.target.value })} />
                  ) : (
                    <input type="file" onChange={(e) => setFormulaireMembre({ ...formulaireMembre, [c.nom]: e.target.files[0] })} />
                  )}
                </div>
              ))}
              <button onClick={validerFormulaireMembre}>Valider</button>
            </motion.div>
          )}
        </motion.div>
      )}
    </motion.div>
  );
}

