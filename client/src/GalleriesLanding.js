import React from 'react';
import './GalleriesLanding.css';
import Galleries from './Galleries';
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';
import NavigationBar from './NavigationBar';

const ageImages = [
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },
    { src: basketball, alt: "Basketball" },

];

const genderImages = [
    { src: cricket, alt: "Cricket" },
    { src: cricket, alt: "Cricket" },
    { src: cricket, alt: "Cricket" },
];

const raceImages = [
    { src: volleyball, alt: "Volleyball" },
    { src: volleyball, alt: "Volleyball" },
    { src: volleyball, alt: "Volleyball" },
];

const GalleriesLanding = () => {
    return (
        <div className="galleries-landing-container">
            <NavigationBar /> 

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