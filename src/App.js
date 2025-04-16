import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Veterinarians from "./pages/Veterinarians";
import SearchOwner from "./pages/SearchOwner";
import AddOwner from "./pages/AddOwner";
import EditOwner from "./pages/EditOwner";
import OwnerDetails from './pages/OwnerDetails';
import AddAnimal from './pages/AddAnimal';
import EditAnimal from './pages/EditAnimal'; 
import AddVisit from './pages/AddVisit';


function App() {
  return (
    <Router>
      <Navbar />
      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/veterinaires" element={<Veterinarians />} />
          <Route path="/search-owner" element={<SearchOwner />} />
          <Route path="/add-owner" element={<AddOwner />} />
          <Route path="/edit-owner/:id" element={<EditOwner />} />
          <Route path="/ownerdetails/:id" element={<OwnerDetails />} />
          <Route path="/add-animal/:ownerId" element={<AddAnimal />} />
          <Route path="/edit-animal/:animalId" element={<EditAnimal />} />
          <Route path="/add-visit/:animalId" element={<AddVisit />} />
          </Routes>
      </div>
    </Router>
  );
}

export default App;

