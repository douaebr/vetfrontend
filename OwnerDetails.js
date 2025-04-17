import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function OwnerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [owner, setOwner] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/owners/${id}`)
      .then(response => setOwner(response.data))
      .catch(error => console.error(error));
  }, [id]);

  const handleChange = (e) => {
    setOwner({ ...owner, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    axios.put(`http://localhost:5000/api/owners/${id}`, owner)
      .then(() => {
        alert('Propriétaire modifié avec succès');
        setIsEditing(false);
      })
      .catch(error => {
        alert('Erreur lors de la modification');
        console.error(error);
      });
  };

  const handleDelete = () => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce propriétaire ?')) {
      axios.delete(`http://localhost:5000/api/owners/${id}`)
        .then(() => {
          alert('Propriétaire supprimé');
          navigate('/');
        })
        .catch(error => {
          alert('Erreur lors de la suppression');
          console.error(error);
        });
    }
  };

  if (!owner) return <p className="text-center mt-5">Chargement...</p>;

  return (
    <div className="d-flex flex-column min-vh-100 bg-success text-white">
      <Navbar />
      <div className="container my-5 flex-grow-1">
        <div className="card bg-light text-dark p-4 shadow-sm">
          <h2>Détails du propriétaire</h2>

          <div className="mb-3">
            <label className="form-label fw-bold">Prénom</label>
            <input
              type="text"
              className="form-control"
              name="firstName"
              value={owner.firstName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Nom</label>
            <input
              type="text"
              className="form-control"
              name="lastName"
              value={owner.lastName}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={owner.email}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-bold">Téléphone</label>
            <input
              type="text"
              className="form-control"
              name="phone"
              value={owner.phone}
              onChange={handleChange}
              disabled={!isEditing}
            />
          </div>

          <div className="d-flex justify-content-between">
            {!isEditing ? (
              <button className="btn btn-warning fw-bold" onClick={() => setIsEditing(true)}>
                Modifier
              </button>
            ) : (
              <button className="btn btn-success fw-bold" onClick={handleSave}>
                Enregistrer
              </button>
            )}

            <button className="btn btn-danger fw-bold" onClick={handleDelete}>
              Supprimer
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default OwnerDetails;
