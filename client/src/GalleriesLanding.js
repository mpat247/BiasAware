import React, { useState, useEffect } from 'react';
import './GalleriesLanding.css';
import Galleries from './Galleries';
import REACT_APP_API_URL from './config';

const GalleriesLanding = () => {
  const [ageImages, setAgeImages] = useState([]);
  const [genderImages, setGenderImages] = useState([]);
  const [raceImages, setRaceImages] = useState([]);

  useEffect(() => {
    const fetchImages = async (url, setter) => {
      try {
        const response = await fetch(url);
        console.log(response)
        if (!response.ok) {
          throw new Error('Failed to fetch images');
        }
        const data = await response.json();
        setter(data.images);
      } catch (error) {
        console.error('Error fetching images:', error);
      }
    };

    fetchImages(`${REACT_APP_API_URL}/gallery/age`, setAgeImages);
    fetchImages(`${REACT_APP_API_URL}/gallery/gender`, setGenderImages);
    fetchImages(`${REACT_APP_API_URL}/gallery/race`, setRaceImages);
  }, []);

  return (
    <div className="galleries-landing-container">
      <h1 className="galleries-landing-title">GALLERY</h1>
      <div className="galleries-landing-all-three-container">
        <div className="galleries-landing-individual-container">
          <h1 className="galleries-landing-individual-titles">Age</h1>
          <Galleries images={ageImages} />
        </div>
        <div className="galleries-landing-individual-container">
          <h1 className="galleries-landing-individual-titles">Gender</h1>
          <Galleries images={genderImages} />
        </div>
        <div className="galleries-landing-individual-container">
          <h1 className="galleries-landing-individual-titles">Race</h1>
          <Galleries images={raceImages} />
        </div>
      </div>
    </div>
  );
};

export default GalleriesLanding;
