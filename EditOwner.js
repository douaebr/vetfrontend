import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import axios from "axios";

function EditOwner() {
  const { ownerId } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ownerData, setOwnerData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/owners/${ownerId}`)
      .then(response => {
        setOwnerData(response.data);
        setLoading(false);
      })
      .catch(err => {
        setError("Erreur lors du chargement des données du propriétaire");
        setLoading(false);
        console.error(err);
      });
  }, [ownerId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOwnerData({
      ...ownerData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    
    axios.put(`http://localhost:5000/api/owners/${ownerId}`, ownerData)
      .then(response => {
        navigate(`/ownerdetails/${ownerId}`);
      })
      .catch(err => {
        setError("Erreur lors de la mise à jour du propriétaire");
        setLoading(false);
        console.error(err);
      });
  };

  if (loading && !ownerData.firstName) {
    return (
      <div className="d-flex flex-column min-vh-100 bg-success text-white">
        <Navbar />
        <div className="container my-4 text-center flex-grow-1">
          <div className="spinner-border text-warning" role="status"></div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="d-flex flex-column min-vh-100 bg-success text-white">
      <Navbar />
      <div className="container my-4 flex-grow-1">
        <h2 className="fw-bold mb-4">Modifier le propriétaire</h2>
        
        {error && <div className="alert alert-warning">{error}</div>}
        
        <div className="card border-0 shadow-sm">
          <div className="card-body bg-light text-dark rounded">
            <form onSubmit={handleSubmit}>
              <div className="row mb-3">
                <div className="col-md-6">
                  <label htmlFor="firstName" className="form-label">Prénom</label>
                  <input
                    type="text"
                    className="form-control"
                    id="firstName"
                    name="firstName"
                    value={ownerData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="col-md-6">
                  <label htmlFor="lastName" className="form-label">Nom</label>
                  <input
                    type="text"
                    className="form-control"
                    id="lastName"
                    name="lastName"
                    value={ownerData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              
              <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  name="email"
                  value={ownerData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="phone" className="form-label">Téléphone</label>
                <input
                  type="tel"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={ownerData.phone}
                  onChange={handleChange}
                  required
                />
              </div>
              
              <div className="mb-3">
                <label htmlFor="address" className="form-label">Adresse</label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  value={ownerData.address}
                  onChange={handleChange}
                  rows="3"
                ></textarea>
              </div>
              
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-warning fw-bold">
                  Mettre à jour
                </button>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => navigate(`/ownerdetails/${ownerId}`)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditOwner;
