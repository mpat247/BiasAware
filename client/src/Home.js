import { FaArrowUp } from 'react-icons/fa';
import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from './NavigationBar';
import Addictions from './Addictions';
import Activities from './Activities';
import QOL from './QOL';
import Crime from './Crime';
import Emotions from './Emotions';
import ProfessionsLanding from './ProfessionsLanding';
import LandingPage from './LandingPage'; // Import the LandingPage component

const Home = () => {
  const [rotate, setRotate] = useState(true);
  const [showLandingPage, setShowLandingPage] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotate(false);
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLandingPage(false);
    }, 35000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="Home">
      {showLandingPage ? (
        <LandingPage /> // Show LandingPage component for 10 seconds
      ) : (
        <>
          <header className="App-header">
            <NavigationBar />

            <a href="#addictions" className="addiction-prompt">
              <h2>A Plastic Surgery Dependant Individual</h2>
            </a>

            <a href="#addictions" className="addiction-prompt2">
              <h2>A Tattoo Dependant</h2>
            </a>

            {/* Other prompts... */}

          </header>

          <main>
            <div className="gear-container">
              {/* Gear images... */}
            </div>

            {/* Scroll-to-top button/icon */}
            <button className="scroll-to-top-button" onClick={scrollToTop}>
              <FaArrowUp />
            </button>
          </main>

          {/* Sections */}
          <div id="addictions">
            <Addictions />
          </div>
          <div id="activities">
            <Activities />
          </div>
          <div id="qol">
            <QOL />
          </div>
          <div id="Emotions">
            <Emotions />
          </div>
          <div id="ProfessionsLanding">
            <ProfessionsLanding />
          </div>
          <div id="Crime">
            <Crime />
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
