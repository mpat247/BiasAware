import React, { useState, useEffect } from 'react';
import './ProfCarousel.css';
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';

const ProfCarousel = () => {
    const [selected, setSelected] = useState(0);
    // Use URLs for your desired images here; I'm keeping placeholders for demonstration:
    const slideImages = [
        basketball,
        cricket,
        volleyball,
        hockey,
        bingo, 
        tennis
    ];

    // This effect sets up an interval to change the slide every 3 seconds (3000ms)
    useEffect(() => {
        const interval = setInterval(() => {
            setSelected(prevSelected => (prevSelected + 1) % slideImages.length);
        }, 3000); // Change 3000 to however many milliseconds you want

        // Clear the interval when the component is unmounted
        return () => clearInterval(interval);
    }, [slideImages.length]); // Only re-run the effect if slideImages.length changes

    const moveToSelected = (element) => {
        if (element === "next") {
            setSelected((prevSelected) => (prevSelected + 1) % slideImages.length);
        } else if (element === "prev") {
            setSelected((prevSelected) => (prevSelected - 1 + slideImages.length) % slideImages.length);
        } else {
            setSelected(element);
        }
    };

    const getClassNames = (index) => {
        let className = '';
        if (index === selected) {
            className = 'selected';
        } else if (index === (selected + 1) % slideImages.length) {
            className = 'next';
        } else if (index === (selected + 2) % slideImages.length) {
            className = 'nextSecond';
        } else if (index === (selected - 1 + slideImages.length) % slideImages.length) {
            className = 'prev';
        } else if (index === (selected - 2 + slideImages.length) % slideImages.length) {
            className = 'prevSecond';
        } else if (index < selected) {
            className = 'hideLeft';
        } else {
            className = 'hideRight';
        }
        return className;
    };


    const arrowStyle = {
        cursor: 'pointer',
        position: 'absolute',
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
    };

        // Inside your return function before the main tag
    const arrowLeftStyle = {
        ...arrowStyle,
        left: '0%', // Use a percentage value or `vw` units here
    };

    const arrowRightStyle = {
        ...arrowStyle,
        right: '0%', // Use a percentage value or `vw` units here
    };

    return (
        <main>
            <div id="carousel">

            {/* // Inside your JSX map function for rendering slides */}
            {slideImages.map((src, index) => (
            <a key={index} className={getClassNames(index)} onClick={() => moveToSelected(index)} href="javascript:void(0);">
                <div className="slideContainer">
                    {/* Render the banner only for the selected slide */}
                    {index === selected && (
                        <div className="captionBanner">{`Slide ${index + 1}`}</div>
                    )}
                    <img src={src} alt={`Slide ${index + 1}`} />
                </div>
            </a>
            ))}

                <div className="arrows">
                <span id="prev" style={arrowLeftStyle} onClick={() => moveToSelected('prev')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 19l-6-6 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
                <span id="next" style={arrowRightStyle} onClick={() => moveToSelected('next')}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M9 5l6 6-6 6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </span>
            </div>
            </div>
            
        </main>
    );
};

export default ProfCarousel;
