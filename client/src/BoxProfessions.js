import React from 'react';
import Slider from 'react-slick';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import './BoxProfessions.css'; // Make sure the path is correct

const BoxProfessions = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 3, // Number of slides to show at once
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
    };

    return (
        <div className="box-container">
            <div className="box-content">
                <Slider {...settings}>
                    <div className="slide-box" style={{ backgroundColor: 'red' }}>Box 1</div>
                    <div className="slide-box" style={{ backgroundColor: 'blue' }}>Box 2</div>
                    <div className="slide-box" style={{ backgroundColor: 'green' }}>Box 3</div>
                    <div className="slide-box" style={{ backgroundColor: 'purple' }}>Box 4</div>
                    {/* Add more slides as needed */}
                </Slider>
            </div>
        </div>
    );
};

export default BoxProfessions;
