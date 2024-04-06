// NewProfessions.js
import React from 'react';
import './NewProfessions.css';

const NewProfessions = () => {
    const handleClick = (section) => {
        console.log(`Section ${section} clicked!`);
        // Add your click handling logic here
    };

    return (
        <div className="spinner">
            <div className="category" style={{ transform: `rotate(${0}deg)` }} onClick={() => handleClick(1)}>
                <span className="icon icon1">🎓</span>
            </div>
            <div className="category" style={{ transform: `rotate(${72}deg)` }} onClick={() => handleClick(2)}>
                <span className="icon icon2">💼</span>
            </div>
            <div className="category" style={{ transform: `rotate(${144}deg)` }} onClick={() => handleClick(3)}>
                <span className="icon icon3">🏠</span>
            </div>
            <div className="category" style={{ transform: `rotate(${216}deg)` }} onClick={() => handleClick(4)}>
                <span className="icon icon4">✈️</span>
            </div>
            <div className="category" style={{ transform: `rotate(${288}deg)` }} onClick={() => handleClick(5)}>
                <span className="icon icon5">🎨</span>
            </div>
        </div>
    );
};

export default NewProfessions;
