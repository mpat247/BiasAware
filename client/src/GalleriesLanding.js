import React from 'react';
import './GalleriesLanding.css';
import Galleries from './Galleries';

const GalleriesLanding = () => {
  return (
    <div className="galleries-landing-container">
        <h1 className="galleries-landing-title">GALLERY</h1>
        <div className="galleries-landing-all-three-container">
          <div className="galleries-landing-individual-container">
            <Galleries />
          </div>
          <div className="galleries-landing-individual-container">
            <Galleries />
          </div>
          <div className="galleries-landing-individual-container">
            <Galleries />
          </div>
        </div>
    </div>
  );
};

export default GalleriesLanding;