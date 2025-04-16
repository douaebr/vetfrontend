import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.jpeg';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="VetCare 360 Logo" height="40" className="me-2 rounded" />
          PUPPY ADVENTURES INDOORS ❤️
        </Link>
        <button 
          className="navbar-toggler" 
          type="button" 
          data-bs-toggle="collapse" 
          data-bs-target="#navbarNav"
          aria-controls="navbarNav" 
          aria-expanded="false" 
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-white" to="/">Accueil</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/search-owner">Rechercher un propriétaire</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/veterinaires">Vétérinaires</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

