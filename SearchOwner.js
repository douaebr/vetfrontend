import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import OwnerCard from '../components/OwnerCard';
import axios from 'axios';
import AddVisit from './AddVisit';  // Vérifie que ce chemin est correct.

function SearchOwner() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;

    setSearching(true);
    setError(null);

    // Modification de l'URL pour correspondre à la route de recherche
    axios.get(`http://localhost:5000/api/owners?lastName=${searchTerm}`)
      .then(response => {
        setSearchResults(response.data);
        setHasSearched(true);
        setSearching(false);

        if (response.data.length > 0) {
          setError(null); // Si des résultats sont trouvés, on efface toute erreur
        } else {
          setError("Aucun propriétaire trouvé.");
        }
      })
      .catch(err => {
        setError('Erreur lors de la recherche');
        setSearching(false);
        console.error(err);
      });
  };

  return (
    <div className="d-flex flex-column min-vh-100 bg-success text-white">
      <Navbar />
      <div className="container my-4 flex-grow-1">
        <h2 className="fw-bold mb-4">Rechercher un propriétaire</h2>
        
        <div className="card border-0 shadow-sm mb-4">
          <div className="card-body bg-light text-dark rounded">
            <form onSubmit={handleSearch}>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Rechercher par nom de famille"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  required
                />
                <button type="submit" className="btn btn-warning fw-bold">
                  {searching ? (
                    <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                  ) : (
                    'Rechercher'
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {error && <div className="alert alert-warning">{error}</div>}
        
        {hasSearched && (
          <div className="mb-4">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="mb-0">Résultats de la recherche</h3>
              <Link to="/add-owner" className="btn btn-warning fw-bold">
                Ajouter un propriétaire
              </Link>
            </div>

            {searchResults.length === 0 ? (
              <div className="card border-0 shadow-sm">
                <div className="card-body bg-light text-dark rounded">
                  <p className="mb-0">Aucun propriétaire trouvé. Vous pouvez en ajouter un nouveau.</p>
                </div>
              </div>
            ) : (
              <div>
                {searchResults.map(owner => (
                  <OwnerCard key={owner._id} owner={owner} />
                ))}
              </div>
            )}
          </div>
        )}

        {!hasSearched && (
          <div className="text-center">
            <p>Utilisez le champ de recherche ci-dessus pour trouver un propriétaire ou</p>
            <Link to="/add-owner" className="btn btn-warning fw-bold">
              Ajouter un nouveau propriétaire
            </Link>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default SearchOwner;


