import React from 'react';
import './HomePage.css'; // On va y mettre les styles CSS

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="overlay"></div>
      <div className="content">
        <h1 className="title">Bienvenue sur le Trombinoscope</h1>
        <p className="subtitle">Visualisez votre équipe avec style, modernité et efficacité.</p>
        <a href="/app" className="btn">Démarrer</a>
      </div>
    </div>
  );
};

export default HomePage;

