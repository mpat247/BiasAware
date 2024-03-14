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
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping: true,
    };

    return (
        <div className="box-container">
            <div className="box-content">
                <div className="left-box"></div>
                <div className="middle-box"></div>
                <div className="right-boxes-container">
                    <div className="underlay-right-boxes-container">
                        <Slider {...settings}>
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                            <div className="box"></div>
                        </Slider>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoxProfessions;
