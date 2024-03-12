import React, { useState } from 'react';
import Slider from 'react-slick'; // Importing the Slider component
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './BoxProfessions.css'; // Ensure this is the correct path to your CSS file

// Import your images - adjust paths as necessary
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';

const BoxProfessions = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const settings = {
        dots: true,
        infinite: true,
        vertical: true,
        verticalSwiping: true,
        beforeChange: (current, next) => setCurrentSlide(next),
        slidesToShow: 4, // Adjust based on your display needs
        slidesToScroll: 1,
        adaptiveHeight: true // This will adjust the height based on the slide content
    };

    return (
        <div className="box-professions-container">
            <Slider {...settings}>
                <div className="box yellow">
                    <div className="image-container">
                        <img src={basketball} alt="basketball" className="box-image"/>
                    </div>
                </div>
                <div className="box orange">
                    <div className="image-container">
                        <img src={cricket} alt="cricket" className="box-image"/>
                    </div>
                </div>
                <div className="box peach">
                    <div className="image-container">
                        <img src={volleyball} alt="volleyball" className="box-image"/>
                    </div>
                </div>
                <div className="box pink">
                    <div className="image-container">
                        <img src={hockey} alt="hockey" className="box-image"/> {/* Fixed duplicate volleyball image */}
                    </div>
                </div>
                {/* <div className="box magenta">
                    <div className="image-container">
                        <img src={bingo} alt="bingo" className="box-image"/>
                    </div>
                </div>
                <div className="box purple">
                    <div className="image-container">
                        <img src={tennis} alt="tennis" className="box-image"/>
                    </div>
                </div> */}
                {/* Add more slides as needed */}
            </Slider>
        </div>
    );
};

export default BoxProfessions;
