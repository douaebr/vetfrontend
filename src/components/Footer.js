import React from 'react';

function Footer() {
  return (
    <footer className="bg-success text-white py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>PUPPY ADVENTURES INDOORS ❤️</h5>
            <p>Des soins et activités adaptés pour vos compagnons</p>
          </div>
          <div className="col-md-6 text-end">
            <p>© {new Date().getFullYear()} VetCare 360. Tous droits réservés.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;