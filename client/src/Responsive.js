// Responsive.js
import React, { useState, useEffect } from 'react';
import NavigationBar2 from './NavigationBar2'; // Import the NavigationBar2 component
import './Responsive.css';
const Responsive = () => {
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
                    <img
                        className={`App-logo App-logo.top-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'} gear-styling3`}
                        src="/gears/gearRight.png"
                        alt="Rotating Gear"
                    />
                    <img
                        className={`App-logo App-logo.bottom-gear ${rotate ? 'rotating-gear' : 'stopped-rotation'} gear-styling4`}
                        src="/gears/gearRight.png"
                        alt="Rotating Gear"
                    />
                </div>
            </main>
                
            
        </div>
    );
};

export default Responsive;