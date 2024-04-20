// App.js
import { FaArrowUp } from 'react-icons/fa'; // Assuming you are using react-icons for icons
import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from './NavigationBar2'; // Import the NavigationBar component
import Addictions from './Addictions';
import QOL from './QOL'; // Import the QOL component
import Crime from './Crime';
import Emotions from './Emotions';
import LandingPage from './LandingPage'; // Import the LandingPage component
import NewActivities from './NewActivities'; // Import the LandingPage component
import NewProfessions from './NewProfessions';

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
 

  return (
    <div className="Home">
      {showLandingPage ? (
        <LandingPage closeLandingPage={closeLandingPage} />
      ) : (
        <>

            <header className="App-header" style={{ marginTop: '60px' }}>
        <NavigationBar /> 
     
<div class = "main-body" style={{width: '100%'}}>
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

      <main>
      
              <button className="scroll-to-top-button" onClick={scrollToTop}>
                <FaArrowUp />
              </button>
       

        
      </main>



      <div id="addictions">
              <Addictions />
      </div>
            
      {/* Quality of Life section */}
      <div id="qol">
        <QOL />
      </div>
      {/* Quality of Life section */}
      <div id="Emotions">
        <Emotions />
      </div>

  

      <div id="Crime">
        <Crime />
      </div>
            <div id="activities">
              <NewActivities />
            </div>

            <div id="NewProfessions">
              <NewProfessions />
            </div>


      </>
      )}
    </div>
  

  );
};

export default Home;