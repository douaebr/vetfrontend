import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function OwnerCard({ owner }) {
  const [animals, setAnimals] = useState(owner.animals || []);
  const [error, setError] = useState('');
const formatDate = (dateString) => {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Date invalide';
  return date.toLocaleDateString('fr-FR'); // Format français : jj/mm/aaaa
};

  // Fonction pour récupérer les animaux et leurs visites à jour
  const fetchAnimals = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/owners/${owner._id}`);
      setAnimals(response.data.animals); // Met à jour les animaux avec les visites ajoutées
    } catch (err) {
      setError('Erreur lors de la récupération des animaux');
      console.error('Erreur récupération animaux:', err);
    }
  };

  // Rafraîchissement des données lorsque le propriétaire change ou lors de l'ajout d'une visite
  useEffect(() => {
    fetchAnimals();
  }, [owner._id]); // Récupérer les animaux à chaque changement du propriétaire

  return (
    <div className="card border-0 shadow-sm h-100 mb-3">
      <div className="card-body bg-light text-dark rounded">
        <h5 className="card-title fw-bold">{owner.firstName} {owner.lastName}</h5>
        <p className="card-text">
          <strong>Email:</strong> {owner.email}<br />
          <strong>Téléphone:</strong> {owner.phone}
        </p>

        <h6 className="fw-bold mt-3">Animaux :</h6>
        {error && <div className="alert alert-danger">{error}</div>}
        {animals.length > 0 ? (
          animals.map((animal) => (
            <div key={animal._id} className="mb-3 ps-3 border-start border-3 border-warning">
              <p className="mb-1"><strong>Nom:</strong> {animal.name}</p>
              <p className="mb-1"><strong>Âge:</strong> {animal.age} ans</p>
              <p className="mb-2"><strong>Type:</strong> {animal.type}</p>

              <h6 className="fw-bold">Visites:</h6>
              {animal.visits && animal.visits.length > 0 ? (
                <ul>
                  {animal.visits.map((visit) => {
                console.log("🐾 Date brute reçue :", visit.date); // ← ici on affiche la date brute
                if (!visit.date) {
                  return <li key={visit._id}>Date invalide ou non définie</li>;
                }
                  return (
    <li key={visit._id}>
      {formatDate(visit.date)} - {visit.description}
    </li>
  );
})}

                </ul>
              ) : (
                <p>Aucune visite ajoutée pour cet animal.</p>
              )}

              <div className="d-flex gap-2">
                <Link
                  to={`/edit-animal/${animal._id}`}
                  className="btn btn-sm btn-outline-warning"
                >
                  Modifier l'animal
                </Link>
                <Link
                  to={`/add-visit/${animal._id}`}
                  className="btn btn-sm btn-outline-success"
                >
                  Ajouter une visite
                </Link>
              </div>
            </div>
          ))
        ) : (
          <p className="text-muted">Aucun animal enregistré.</p>
        )}

        <div className="mt-4 d-flex gap-2">
          <Link to={`/add-animal/${owner._id}`} className="btn btn-warning fw-bold">
            Ajouter un animal
          </Link>
          <Link to={`/ownerdetails/${owner._id}`} className="btn btn-outline-primary fw-bold">
            Voir détails
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OwnerCard;
