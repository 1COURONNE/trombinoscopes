// src/pages/HomePage.js
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';

export default function HomePage() {
  const navigate = useNavigate();

  // Animation à l'arrivée de la page
  useEffect(() => {
    const title = document.querySelector('.accueil-titre');
    const btn = document.querySelector('.accueil-btn');
    title.classList.add('visible');
    btn.classList.add('visible');
  }, []);

  return (
    <div className="accueil-container">
      <div className="overlay">
        <h1 className="accueil-titre">Bienvenue sur votre Trombinoscope</h1>
        <p className="accueil-description">
          Gérer vos groupes et membres avec style, animation et efficacité.
        </p>
        <button className="accueil-btn" onClick={() => navigate('/membres/1')}>
          Accéder aux groupes
        </button>
      </div>
    </div>
  );
}

