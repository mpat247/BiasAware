// Responsive.js
import React, { useState, useEffect } from 'react';
import LandingPage from './LandingPage';
import NavigationBar2 from './NavigationBar2'; // Import the NavigationBar2 component
import './Responsive.css';

const Responsive = () => {
    const [showLandingPage, setShowLandingPage] = useState(true);

    // Function to handle button click in LandingPage component
    const handleButtonClick = () => {
        setShowLandingPage(false); // Hide landing page component
    };

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShowLandingPage(false); // Hide landing page component after 10 seconds
        }, 10000);

        return () => clearTimeout(timeout);
    }, []);

    const [rotate, setRotate] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
          setRotate(false); // Stop the rotation after 5 seconds
        }, 5000);
    
        return () => clearTimeout(timeout);
      }, []);
      
    return (
        
        <div className="Home">
            <header className="App-header">
                <NavigationBar2 /> {/* Include the NavigationBar2 component */}
            </header>
            <main>
            {showLandingPage && <LandingPage onButtonClick={handleButtonClick} />} {/ Render LandingPage component if showLandingPage is true /}
                {!showLandingPage && (
            <div className="gear-container">
                    {/* Add your gear images or components here */}
                    <img
                        className={`App-logo App-logo.middle-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'} gear-styling`}
                        src="/gears/gearLeft.png"
                        alt="Rotating Gear"
                    />
                    <img
                        className={`App-logo App-logo.right-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'} gear-styling2`}
                        src="/gears/gearLeft.png"
                        alt="Rotating Gear"
                    />
                    
                </div>
                )}
            </main>
                
            
        </div>
    );
};

export default Responsive;
