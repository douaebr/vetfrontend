import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddVisit() {
  const [dateInput, setDateInput] = useState('');
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [description, setDescription] = useState('');
  const [veterinarian, setVeterinarian] = useState('');
  const [veterinarians, setVeterinarians] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Récupération des vétérinaires
  useEffect(() => {
    const fetchVeterinarians = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/veterinarians');
        setVeterinarians(response.data);
      } catch (err) {
        setError('Erreur lors de la récupération des vétérinaires');
      }
    };
    fetchVeterinarians();
  }, []);

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    console.log("🐾 Date capturée brute:", newDate);
    setDateInput(newDate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("🐾 Date capturée avant soumission:", dateInput);

    // Validation de la date
    if (!dateInput) {
      setError('Veuillez sélectionner une date.');
      return;
    }

    // Validation de la description
    if (!description) {
      setError('Veuillez fournir une description pour la visite.');
      return;
    }

    // Validation de la sélection du vétérinaire
    if (!veterinarian) {
      setError('Veuillez sélectionner un vétérinaire.');
      return;
    }

    // Envoi de la date sous forme de chaîne (sans conversion)
    const visitData = {
      date: dateInput,  // La date est envoyée en chaîne de caractères (format YYYY-MM-DD)
      description,
      veterinarian,
      animalId,
    };

    try {
      // Envoi de la demande à l'API
      await axios.post('http://localhost:5000/api/visits', visitData);
      setSuccess('Visite ajoutée avec succès!');
      setTimeout(() => {
        navigate(`/owner/${animalId}`);
      }, 2000);
    } catch (err) {
      setError("Erreur lors de l’ajout de la visite.");
      console.error("Erreur POST visite:", err.response?.data || err.message);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Ajouter une visite</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <div className="mb-3">
          <label htmlFor="date" className="form-label">Date de la visite</label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={dateInput}
            onChange={handleDateChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea
            id="description"
            className="form-control"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="veterinarian" className="form-label">Vétérinaire</label>
          <select
            id="veterinarian"
            className="form-select"
            value={veterinarian}
            onChange={(e) => setVeterinarian(e.target.value)}
            required
          >
            <option value="">Sélectionner un vétérinaire</option>
            {veterinarians.map((vet) => (
              <option key={vet._id} value={vet._id}>
                {vet.firstName} {vet.lastName}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-success fw-bold">Ajouter la visite</button>
      </form>
    </div>
  );
}

export default AddVisit;
