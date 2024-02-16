import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Activities.css'; // Make sure the path is correct

// Import your images - adjust paths as necessary
import basketball from './images/image 7.png';
import cricket from './images/image 8.png';
import volleyball from './images/image 9.png';
import hockey from './images/image 10.png';
import bingo from './images/image 11.png';
import tennis from './images/image 12.png';

const Activities = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    return (
        <div className="carousel-container statistics-page">
            <h1 style={{
                color: '#DD9313',
                fontFamily: 'Abhaya Libre ExtraBold',
                fontSize: '4em',
                textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
                textAlign: 'center',
                margin: '0',
                padding: '50px 0'
            }}>
                A C T I V I T I E S
            </h1>

            <Carousel infiniteLoop showStatus={false} onChange={(index) => setCurrentSlide(index)}>
                {/* Slide 1 */}
                <div className="box-row">
                    <div className="box yellow">
                        <h3 className="box-header">Basketball</h3>
                        <div className="image-container">
                            <img src={basketball} alt="basketball" className="box-image"/>
                        </div>
                    </div>
                    <div className="box orange">
                        <h3 className="box-header">Cricket</h3>
                        <div className="image-container">
                            <img src={cricket} alt="cricket" className="box-image"/>
                        </div>
                    </div>
                    <div className="box peach">
                        <h3 className="box-header">Volleyball</h3>
                        <div className="image-container">
                            <img src={volleyball} alt="volleyball" className="box-image"/>
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="box-row">
                    <div className="box pink">
                        <h3 className="box-header">Hockey</h3>
                        <div className="image-container">
                            <img src={hockey} alt="hockey" className="box-image"/>
                        </div>
                    </div>
                    <div className="box magenta">
                        <h3 className="box-header">Bingo</h3>
                        <div className="image-container">
                            <img src={bingo} alt="bingo" className="box-image"/>
                        </div>
                    </div>
                    <div className="box purple">
                        <h3 className="box-header">Tennis</h3>
                        <div className="image-container">
                            <img src={tennis} alt="tennis" className="box-image"/>
                        </div>
                    </div>
                </div>

                <div className="box-row">
                    <div className="box yellow">
                        <h3 className="box-header">Basketball</h3>
                        <div className="image-container">
                            <img src={basketball} alt="basketball" className="box-image"/>
                        </div>
                    </div>
                    <div className="box orange">
                        <h3 className="box-header">Cricket</h3>
                        <div className="image-container">
                            <img src={cricket} alt="cricket" className="box-image"/>
                        </div>
                    </div>
                    <div className="box peach">
                        <h3 className="box-header">Volleyball</h3>
                        <div className="image-container">
                            <img src={volleyball} alt="volleyball" className="box-image"/>
                        </div>
                    </div>
                </div>

                <div className="box-row">
                    <div className="box yellow">
                        <h3 className="box-header">Basketball</h3>
                        <div className="image-container">
                            <img src={basketball} alt="basketball" className="box-image"/>
                        </div>
                    </div>
                    <div className="box orange">
                        <h3 className="box-header">Cricket</h3>
                        <div className="image-container">
                            <img src={cricket} alt="cricket" className="box-image"/>
                        </div>
                    </div>
                    <div className="box peach">
                        <h3 className="box-header">Volleyball</h3>
                        <div className="image-container">
                            <img src={volleyball} alt="volleyball" className="box-image"/>
                        </div>
                    </div>
                </div>

                {/* Additional slides can be added similarly */}
            </Carousel>
        </div>
    );
};

export default Activities;
