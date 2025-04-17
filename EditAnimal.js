import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function EditAnimal() {
  const { animalId } = useParams();
  const navigate = useNavigate();
  const [animal, setAnimal] = useState({
    name: '',
    age: '',
    type: ''
  });

  useEffect(() => {
    axios.get(`http://localhost:5000/api/animals/${animalId}`)
      .then(res => setAnimal(res.data))
      .catch(err => console.error('Erreur lors du chargement de l’animal', err));
  }, [animalId]);

  const handleChange = (e) => {
    setAnimal({ ...animal, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/animals/${animalId}`, animal)
      .then(() => navigate(-1)) // revenir en arrière après la mise à jour
      .catch(err => console.error('Erreur lors de la mise à jour', err));
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4">Modifier l’animal</h2>
      <form onSubmit={handleSubmit} className="card p-4 shadow-sm bg-light">
        <div className="mb-3">
          <label className="form-label">Nom</label>
          <input type="text" name="name" value={animal.name} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Âge</label>
          <input type="number" name="age" value={animal.age} onChange={handleChange} className="form-control" required />
        </div>
        <div className="mb-3">
          <label className="form-label">Type</label>
          <select name="type" value={animal.type} onChange={handleChange} className="form-select" required>
            <option value="">-- Sélectionner --</option>
            <option value="chien">Chien</option>
            <option value="chat">Chat</option>
            <option value="perroquet">Perroquet</option>
            <option value="hamster">Hamster</option>
          </select>
        </div>
        <button type="submit" className="btn btn-warning fw-bold">Enregistrer</button>
      </form>
    </div>
  );
}

export default EditAnimal;
