// Fichier : src/components/Navbar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const location = useLocation(); // Pour connaître la page actuelle

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">TrombinoPRO</Link>
      </div>

      <ul className="navbar-links">
        <li className={location.pathname === '/' ? 'active' : ''}>
          <Link to="/">Accueil</Link>
        </li>
       
        <li className={location.pathname.startsWith('/membres') ? 'active' : ''}>
          <Link to="/membres/1">Membres</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

