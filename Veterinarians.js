import React from "react";
import { Link } from "react-router-dom";

const Veterinarians = () => {
  // Liste statique des vétérinaires
  const veterinarians = [
    { firstName: "Mohamed", lastName: "Derkaoui", specialty: "Chirurgien vétérinaire", email: "Derkaoui@gmail.com", phone: "0123456789" },
    { firstName: "Safaa", lastName: "Bennani", specialty: "Médecine vétérinaire", email: "Bennani@gmail.com", phone: "0987654321" },
    { firstName: "Ali", lastName: "Lamrini", specialty: "Dermatologie vétérinaire", email: "Lamrini@gmail.com", phone: "0147258369" }
  ];

  return (
    <div className="container-fluid bg-light text-dark min-vh-100">
      <div className="container py-5">
        <h1 className="text-center mb-4">Nos Vétérinaires</h1>
        
        {/* Tableau des vétérinaires */}
        <div className="table-responsive">
          <table className="table table-bordered table-striped">
            <thead className="thead-dark">
              <tr>
                <th>Prénom</th>
                <th>Nom</th>
                <th>Spécialité</th>
                <th>Email</th>
                <th>Téléphone</th>
              </tr>
            </thead>
            <tbody>
              {veterinarians.map((vet, index) => (
                <tr key={index}>
                  <td>{vet.firstName}</td>
                  <td>{vet.lastName}</td>
                  <td>{vet.specialty}</td>
                  <td>{vet.email}</td>
                  <td>{vet.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Boutons pour redirection */}
        <div className="d-flex justify-content-center mt-4">
          <Link to="/" className="btn btn-success fw-bold mx-2">Retour à l'accueil</Link>
          <Link to="/add-owner" className="btn btn-warning fw-bold mx-2">Ajouter un propriétaire</Link>
        </div>
      </div>
    </div>
  );
};

export default Veterinarians;
