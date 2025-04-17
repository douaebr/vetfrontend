import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

function AddAnimal() {
  const { ownerId } = useParams();
  const navigate = useNavigate();

  const [animal, setAnimal] = useState({
    name: '',
    age: '',
    type: ''
  });

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Ajout de l'animal
      const response = await axios.post(`http://localhost:5000/api/animals`, {
        ...animal,
        owner: ownerId
      });

      // Ajout de l'animal au propriétaire
      await axios.put(`http://localhost:5000/api/owners/${ownerId}/add-animal`, {
        animalId: response.data._id
      });

      navigate('/search-owner'); // Redirection après ajout
    } catch (error) {
      console.error('Erreur lors de l\'ajout de l\'animal :', error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-success text-white">
      <Navbar />
      <div className="container my-4 flex-grow-1">
        <h2 className="fw-bold mb-4">Ajouter un animal</h2>
        <div className="card bg-light text-dark shadow-sm p-4">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Nom</label>
              <input type="text" name="name" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Âge</label>
              <input type="number" name="age" className="form-control" onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className="form-label">Type</label>
              <input type="text" name="type" className="form-control" onChange={handleChange} placeholder="ex: chien, chat..." required />
            </div>
            <button type="submit" className="btn btn-warning fw-bold">Enregistrer</button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AddAnimal;
