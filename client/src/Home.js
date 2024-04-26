// App.js
import { FaArrowUp } from 'react-icons/fa'; // Assuming you are using react-icons for icons
import React, { useState, useEffect, Suspense, lazy  } from 'react';
import './Home.css';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component
import Addictions from './Addictions';
import QOL from './QOL'; // Import the QOL component
import Crime from './Crime';
import Emotions from './Emotions';
import LandingPage from './LandingPage'; // Import the LandingPage component
import NewActivities from './NewActivities'; // Import the LandingPage component
import NewProfessions from './NewProfessions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faPlay } from '@fortawesome/free-solid-svg-icons'; // Assuming the icon for scroll-to-top is an arrow
import { Tooltip } from 'antd'; // Ensure Tooltip is imported if not already
import GearLoader from './GearLoader';

import './GearComponent.css';

const Home = () => {
  const [rotate, setRotate] = useState(true);
  const [showLandingPage, setShowLandingPage] = useState(true);


   // Add a function to handle scrolling to the top
   const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Smooth scrolling animation
    });
  }

  useEffect(() => {
    const timeout = setTimeout(() => {
      setRotate(false); // Stop the rotation after 5 seconds
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLandingPage(false);
    }, 40000);

    return () => clearTimeout(timer);
  }, []);

  
  const closeLandingPage = () => {
    setShowLandingPage(false);  // This directly sets the landing page to not show
  };
  const playIntro = () => {
    setShowLandingPage(true);  // This directly sets the landing page to show
  };

  return (
    <div className="Home">
      {showLandingPage ? (
        <LandingPage closeLandingPage={closeLandingPage} />
      ) : (
        <>

            <header className="App-header" style={{ marginTop: '60px' }}>
        <NavigationBar /> 
     
<div id='navGears' class = "main-body" style={{width: '100%'}}>
          <div class="gear-container">
              <ul class="center-circle">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring">
             <a href="#activities" className="acc-prompt2">
            <h2>Skater</h2>
            </a>
            <a href="#qol" className="qol-prompt1">
              <h2>Person in</h2>
            </a>
            <a href="#qol" className="qol-prompt2">
            <h2 >Designer Attire</h2>
          </a>
          <a href="#ProfessionsLanding" className="pro2">
            <h2>Family Doctor</h2>
          </a>
          <a href="#Neighborhood" className="hood2">
            <h2>An Apartment in</h2>
          </a>
          <a href="#Neighborhood" className="hoods2">
            <h2>Forest Hill</h2>
          </a>
             </div>
          </div>
          <div class="gear-container2">
              <ul class="center-circle2">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring2">
             <a href="#Crime" className="eng3">
              <h2>Shoplifter</h2>
            </a>
            <a href="#Emotions" className="emotions1">
              <h2>Proud Individual</h2>
            </a>
            <a href="/Engineering" className="eng1">
              <h2>Engineering</h2>
            </a>
            <a href="#addictions" className="addiction-prompt">
              <h2>Plastic Surgery Dependant Individual</h2>
            </a>
            <a href="#Engineering" className="eng">
              <h2>Computer Engineer</h2>
            </a>
            <a href="#Crime" className="eng4">
              <h2>Smuggler</h2>
            </a>
            <a href="#ProfessionsLanding" className="pro3">
              <h2>Accountant</h2>
            </a>
            <a href="#addictions" className="addiction-prompt2">
              <h2>Tattoo Dependant Individual</h2>
            </a>
            <a href="#activities" className="new1">
              <h2>Weightlifter</h2>
            </a>
            <a href="#qol" className="new2">
              <h2>Traveler</h2>
            </a>

             </div>
          </div>
          <div class="gear-container3">
              <ul class="center-circle3">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring3">
             <a href="#qol" className="qol-prompt3">
              <h2>Person Living</h2>
            </a>
            <a href="#qol" className="qol-prompt4">
              <h2>in an Unhygienic Place</h2>
            </a>
            <a href="#activities" className="acc-prompt1">
              <h2>Basketball Player</h2>
            </a>
            <a href="#Emotions" className="qol-prompt5">
              <h2>Sad Individual</h2>
            </a>
            <a href="#Crime" className="cri1">
              <h2>Hijacker</h2>
            </a>
            <a href="#Crime" className="crinew1">
              <h2>Gang Leader</h2>
            </a>
            
             </div>
          </div>
          <div class="gear-container4">
              <ul class="center-circle4">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring4">
             <a href="#Neighborhood" className="hood1">
              <h2>House in</h2>
            </a>
            <a href="#Neighborhood" className="hoods1">
              <h2>Jane & Finch</h2>
            </a>
            <a href="#Engineering" className="eng2">
              <h2>Biomedical Engineer</h2>
            </a>
            <a href="#Emotions" className="qol-prompt6">
              <h2>Happy Individual</h2>
            </a>
            <a href="#NewProfessions" className="pro1">
              <h2>CEO</h2>
            </a>
             </div>
          </div>
        </div>

        
      </header>
      

      <main style={{overflowX: "hidden"}}>
      
      <Tooltip title="Scroll to Top">
              <button
                onClick={scrollToTop}
                className='scroll-to-top-button'
              >
                <FontAwesomeIcon icon={faArrowUp} />
              </button>
            </Tooltip>
            <Tooltip title="Play Intro">
              <button
                onClick={playIntro}
                className="playIntro"
              >
                <FontAwesomeIcon icon={faPlay} />
              </button>
            </Tooltip>


       

        
      </main>

            <div>
              <Suspense fallback={<GearLoader />}>
                <div id="addictions">
                  <Addictions />
                </div>
              </Suspense>
              <Suspense fallback={<GearLoader />}>
                <div id="qol">
                  <QOL />
                </div>
              </Suspense>
              <Suspense fallback={<GearLoader />}>
                <div id="Emotions">
                  <Emotions />
                </div>
              </Suspense>
              <Suspense fallback={<GearLoader />}>
                <div id="Crime">
                  <Crime />
                </div>
              </Suspense>
              <Suspense fallback={<GearLoader />}>
                <div id="activities">
                  <NewActivities />
                </div>
              </Suspense>
              <Suspense fallback={<GearLoader />}>
                <div id="NewProfessions">
                  <NewProfessions />
                </div>
              </Suspense>
            </div>

      


      </>
      )}
    </div>
  

  );
};

export default Home;