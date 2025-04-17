import React from 'react';
import { Link } from 'react-router-dom';
import dogImage from '../assets/dog.png';

function AnimalCard({ animal }) {
  return (
    <div className="card border-0 shadow-sm h-100">
      <div className="card-body bg-light text-dark rounded">
        <div className="row">
          <div className="col-md-3">
            <img src={dogImage} alt="Animal" className="img-fluid rounded" />
          </div>
          <div className="col-md-9">
            <h5 className="card-title fw-bold">{animal.name}</h5>
            <p className="card-text">
              <strong>Espèce:</strong> {animal.species}<br />
              <strong>Race:</strong> {animal.breed}<br />
              <strong>Âge:</strong> {animal.age} ans
            </p>
            <div className="d-flex">
              <Link to={`/addvisit/${animal._id}`} className="btn btn-warning fw-bold me-2">
                Ajouter une visite
              </Link>
              <Link to={`/editanimal/${animal._id}`} className="btn btn-light fw-bold">
                Modifier
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnimalCard;