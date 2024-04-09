// App.js
import { FaArrowUp } from 'react-icons/fa'; // Assuming you are using react-icons for icons
import React, { useState, useEffect } from 'react';
import './Home.css';
import NavigationBar from './NavigationBar2'; // Import the NavigationBar component
import Addictions from './Addictions';
import QOL from './QOL'; // Import the QOL component
import QOL2 from './QOL2'; // Import the QOL component
import Crime from './Crime';
import Emotions from './Emotions';
import ProfessionsLanding from './ProfessionsLanding';
import LandingPage from './LandingPage'; // Import the LandingPage component
import NewActivities from './NewActivities'; // Import the LandingPage component

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
        <NavigationBar /> {/* Include the NavigationBar component */}
         {/* Add a link to scroll to the Addictions section */}
        

        {/* <h1 style={{ 
  color: '#DD9313',
  fontFamily: 'Abhaya Libre ExtraBold', 
  fontSize: '4em',
  textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
  textAlign: 'center', // Centers the text horizontally
  margin: '0', // Removes any default margin
  padding: '50px 0' // Adjust this padding to control spacing above and below the text
}}>
  A C T I V I T I E S
</h1> */}
{/* Addiction Prompts*/}


<div class = "main-body">
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
            <h2>A Skater</h2>
            </a>
            <a href="#qol" className="qol-prompt1">
              <h2>A Person in</h2>
            </a>
            <a href="#qol" className="qol-prompt2">
            <h2>Designer Attire</h2>
          </a>
          <a href="#emotions" className="pro2">
            <h2>A Family Doctor</h2>
          </a>
          <a href="#emotions" className="hood2">
            <h2>An Apartment in</h2>
          </a>
          <a href="#emotions" className="hoods2">
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
             <a href="#emotions" className="eng3">
              <h2>A Shoplifter</h2>
            </a>
            <a href="#emotions" className="emotions1">
              <h2>A Proud Individual</h2>
            </a>
            <a href="#emotions" className="eng1">
              <h2>Engineering</h2>
            </a>
            <a href="#addictions" className="addiction-prompt">
              <h2>A Plastic Surgery Dependant Individual</h2>
            </a>
            <a href="#emotions" className="eng">
              <h2>A Computer Engineer</h2>
            </a>
            <a href="#emotions" className="eng4">
              <h2>A Smuggler</h2>
            </a>
            <a href="#emotions" className="pro3">
              <h2>An Accountant</h2>
            </a>
            <a href="#addictions" className="addiction-prompt2">
              <h2>A Tattoo Dependant</h2>
            </a>

            <a href="#addictions" className="addiction-promptss3">
              <h2>Individual</h2>
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
              <h2>A Person Living</h2>
            </a>
            <a href="#qol" className="qol-prompt4">
              <h2>in an Unhygienic Place</h2>
            </a>
            <a href="#activities" className="acc-prompt1">
              <h2>A Basketball Player</h2>
            </a>
            <a href="#emotions" className="qol-prompt5">
              <h2>A Sad Individual</h2>
            </a>
            <a href="#emotions" className="cri1">
              <h2>A Hijacker</h2>
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
             <a href="#emotions" className="hood1">
              <h2>A House in</h2>
            </a>
            <a href="#emotions" className="hoods1">
              <h2>Jane & Finch</h2>
            </a>
            <a href="#emotions" className="eng2">
              <h2>A Biomedical Engineer</h2>
            </a>
            <a href="#emotions" className="qol-prompt6">
              <h2>A Happy Individual</h2>
            </a>
            <a href="#emotions" className="pro1">
              <h2>A CEO</h2>
            </a>
             </div>
          </div>
        </div>

        
      </header>

      <main>
      
       
        {/* Add a link to scroll to the Addictions section
        <tr><a href="#addictions" className="explore-addictions-link">
          <h2>Explore Addictions</h2>
        </a></tr>
        <tr><a href="#activities" className="explore-activities-link">
          <h2>Explore Activities</h2>
        </a></tr> */}

 {/* Add the scroll-to-top button/icon */}
 <button className="scroll-to-top-button" onClick={scrollToTop}>
          <FaArrowUp />
        </button>
        
      </main>


{/* Activities section */}
<div id="activities">
        <NewActivities />
      </div>
      


     

      {/* Addictions section */}
      <div id="addictions">
              <Addictions />
      </div>
            
      {/* Quality of Life section */}
      <div id="qol">
        <QOL2 />
      </div>
      {/* Quality of Life section */}
      <div id="Emotions">
        <Emotions />
      </div>

      {/* Quality of Life section */}
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