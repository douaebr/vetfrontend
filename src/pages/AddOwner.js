import React, { useState } from "react";

const AddOwner = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("➡️ Formulaire soumis");

    try {
      const res = await fetch("http://localhost:5000/api/owners", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ firstName, lastName, email, phone }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("✅ Propriétaire ajouté avec succès !");
        // Remet à zéro les champs
        setFirstName("");
        setLastName("");
        setEmail("");
        setPhone("");
      } else {
        alert("❌ Erreur : " + data.message);
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout du propriétaire :", error);
      alert("Erreur réseau ou serveur.");
    }
  };

  return (
    <div className="container mt-5">
      <h2>Ajouter un Propriétaire</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Prénom :</label>
          <input
            type="text"
            className="form-control"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Nom :</label>
          <input
            type="text"
            className="form-control"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Email :</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label>Téléphone :</label>
          <input
            type="text"
            className="form-control"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Ajouter
        </button>
      </form>
    </div>
  );
};

export default AddOwner;

