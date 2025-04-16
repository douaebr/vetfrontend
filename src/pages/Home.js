import React from "react";
import { Link } from "react-router-dom";
import dogImage from "../assets/dog.png"; // Mets ton image ici

const Home = () => {
  return (
    <div className="container-fluid bg-success text-white min-vh-100">
      <div className="container d-flex flex-column flex-md-row align-items-center justify-content-between py-5">
        
        {/* Texte de présentation */}
        <div className="text-center text-md-start">
          <h1 className="fw-bold">PUPPY ADVENTURES INDOORS ❤️</h1>
          <p>Des soins et activités adaptés pour vos compagnons.</p>
          <div className="d-flex flex-column flex-md-row gap-3">
            <Link to="/search-owner" className="btn btn-warning fw-bold">Rechercher un propriétaire</Link>
            <Link to="/veterinaires" className="btn btn-light fw-bold">Voir les vétérinaires</Link>
          </div>
        </div>

        {/* Image */}
        <div className="text-center">
          <img src={dogImage} alt="Chien heureux" className="img-fluid rounded" style={{ maxWidth: "350px" }} />
        </div>

      </div>
    </div>
  );
};

export default Home;

