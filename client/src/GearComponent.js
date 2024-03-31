import React, { useState, useEffect } from 'react';
import './Responsive.css';
const GearComponent = () => {
    const [rotate, setRotate] = useState(true);
    useEffect(() => {
        const timeout = setTimeout(() => {
            setRotate(false); // Stop the rotation after 5 seconds
        }, 5000);

        return () => clearTimeout(timeout);
    }, []);

    // Add your JavaScript content here
    // Assuming you have the JavaScript content stored in gearContainer1HTML, gearContainer2HTML, gearContainer3HTML

    const gearContainer1HTML = `
        <div class="gear-container">
            <ul class="center-circle">
                ${'<li class="tooth"></li>'.repeat(8)}
            </ul>
            <div class="ring"></div>
        </div>
    `;

    const gearContainer2HTML = `
        <div class="gear-container2">
            <ul class="center-circle2">
                ${'<li class="tooth"></li>'.repeat(12)}
            </ul>
            <div class="ring2"></div>
        </div>
    `;

    const gearContainer3HTML = `
        <div class="gear-container3">
            <ul class="center-circle3">
                ${'<li class="tooth"></li>'.repeat(10)}
            </ul>
            <div class="ring3"></div>
        </div>
    `;

    return (
        <div className="Home">
            <header className="App-header">
                
            </header>

            {/* Append the generated HTML content here */}
            <div dangerouslySetInnerHTML={{ __html: gearContainer1HTML }} />
            <div dangerouslySetInnerHTML={{ __html: gearContainer2HTML }} />
            <div dangerouslySetInnerHTML={{ __html: gearContainer3HTML }} />
        </div>
    );
};

export default GearComponent;
