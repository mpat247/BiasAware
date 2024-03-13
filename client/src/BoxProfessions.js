import React from 'react';
import Slider from 'react-slick';
// import "slick-carousel/slick/slick.css"; 
// import "slick-carousel/slick/slick-theme.css";
import './BoxProfessions.css';

const BoxProfessions = () => {


    return (
        <div className="box-container">
            <div className="box-content">
                <div className="left-box"></div>
                <div className="middle-box"></div>
                <div class="right-boxes-container">
                    <div class="box"></div>
                    <div class="box"></div>
                    <div class="box"></div>
                    <div class="box"></div>
                </div>
            </div>
        </div>
    );
};

export default BoxProfessions;
