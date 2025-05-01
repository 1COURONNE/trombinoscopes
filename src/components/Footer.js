// Fichier : src/components/Footer.js

import React from 'react';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear(); // année actuelle dynamique

  return (
    <footer className="footer">
      <div className="footer-content">
        <p>&copy; {currentYear} TrombinoPRO. Tous droits réservés.</p>
        <div className="footer-links">
          <a href="https://github.com/" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="/contact">Contact</a>
          <a href="/politique">Politique de confidentialité</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

