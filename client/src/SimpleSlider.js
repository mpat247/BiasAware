// SimpleSlider.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './SimpleSlider.css'; // Make sure the path is correct
import img1 from './1.jpg'; // Adjust the path as necessary
import square from './square.jpg'; // Adjust the path as necessary

const SimpleSlider = () => {
    return (
        <div className="carousel-container">
            <Carousel infiniteLoop showStatus={false}>
                {/* Slide 1 */}
                <div className="box-row">
                    <div className="box yellow">
                        <div className="image-container">
                            <img src={img1} alt="Pikachu" className="box-image"/>
                        </div>
                    </div>
                    <div className="box orange">
                        <div className="image-container">
                            <img src={square} alt="Square" className="box-image"/>
                        </div>
                    </div>
                    <div className="box peach">
                        <div className="image-container">
                            <img src="image3.jpg" alt="Image 3" className="box-image" />
                        </div>
                    </div>
                </div>
                
                {/* Slide 2 */}
                <div className="box-row">
                    <div className="box pink">
                        <div className="image-container">
                            <img src="image4.jpg" alt="Image 4" className="box-image" />
                        </div>
                    </div>
                    <div className="box magenta">
                        <div className="image-container">
                            <img src="image5.jpg" alt="Image 5" className="box-image" />
                        </div>
                    </div>
                    <div className="box purple">
                        <div className="image-container">
                            <img src="image6.jpg" alt="Image 6" className="box-image" />
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="box-row">
                    <div className="box yellow">
                        <div className="image-container">
                            <img src="image7.jpg" alt="Image 7" className="box-image" />
                        </div>
                    </div>
                    <div className="box orange">
                        <div className="image-container">
                            <img src="image8.jpg" alt="Image 8" className="box-image" />
                        </div>
                    </div>
                    <div className="box peach">
                        <div className="image-container">
                            <img src="image9.jpg" alt="Image 9" className="box-image" />
                        </div>
                    </div>
                </div>
            </Carousel>
        </div>
    );
};

export default SimpleSlider;
