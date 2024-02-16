// SimpleSlider.js
import React, { useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './Activities.css'; // Make sure the path is correct
import basketball from './images/image 7.png'; // Adjust the path as necessary
import cricket from './images/image 8.png'; // Adjust the path as necessary
import volleyball from './images/image 9.png'; // Adjust the path as necessary
import hockey from './images/image 10.png'; // Adjust the path as necessary
import bingo from './images/image 11.png'; // Adjust the path as necessary
import tennis from './images/image 12.png'; // Adjust the path as necessary

const SimpleSlider = () => {
    
    const [currentSlide, setCurrentSlide] = useState(0);
    const updateCurrentSlide = (index) => {
        if (index !== currentSlide) {
            setCurrentSlide(index);
        }
    };

    const navItems = ["Hockey", "Bingo", "Tennis", "Other", "Other2", "Other3"]; // Add more items as needed

    return (
        
        <div className="carousel-container statistics-page">
            <h1 style={{ 
  color: '#DD9313',
  fontFamily: 'Abhaya Libre ExtraBold', 
  fontSize: '4em',
  textShadow: '2px 2px 4px rgba(168, 108, 6, 1)',
  textAlign: 'center', // Centers the text horizontally
  margin: '0', // Removes any default margin
  padding: '50px 0' // Adjust this padding to control spacing above and below the text
}}>
  A C T I V I T I E S
</h1>

  


            <Carousel infiniteLoop showStatus={false}>
                {/* Slide 1 */}
                <div className="box-row">
                    <div className="box yellow">
                    <h3 className="box-header">Basketball</h3> {/* Header for the first image */}

                        <div className="image-container">
                            <img src={basketball} alt="basketball" className="box-image"/>
                        </div>
                    </div>
                    <div className="box orange">
                    <h3 className="box-header">Cricket</h3> {/* Header for the first image */}

                        <div className="image-container">
                            <img src={cricket} alt="cricket" className="box-image"/>
                        </div>
                    </div>
                    <div className="box peach">
                    <h3 className="box-header">Volleyball</h3> {/* Header for the first image */}

                        <div className="image-container">
                            <img src={volleyball} alt="volleyball" className="box-image"/>
                        </div>
                    </div>
                </div>
                
                {/* Slide 2 */}
                <div className="box-row">
                    <div className="box pink">
                    <h3 className="box-header">Hockey</h3> {/* Header for the first image */}

                        <div className="image-container">
                            <img src={hockey} alt="hockey" className="box-image"/>
                        </div>
                    </div>
                    <div className="box magenta">
                    <h3 className="box-header">Bingo</h3> {/* Header for the second image */}

                        <div className="image-container">
                            <img src={bingo} alt="bingo" className="box-image"/>  
                        </div>
                    </div>
                    <div className="box purple">
                    <h3 className="box-header">Tennis</h3> {/* Header for the third image */}

                        <div className="image-container">
                            <img src={tennis} alt="tennis" className="box-image"/>
                        </div>
                    </div>
                </div>

                {/* Slide 3 */}
                <div className="box-row">
                    <div className="box yellow">
                    <h3 className="box-header">Tennis</h3> {/* Header for the third image */}

                        <div className="image-container">
                            <img src="image7.jpg" alt="Image 7" className="box-image" />
                        </div>
                    </div>
                    <div className="box orange">
                    <h3 className="box-header">Tennis</h3> {/* Header for the third image */}

                        <div className="image-container">
                            <img src="image8.jpg" alt="Image 8" className="box-image" />
                        </div>
                    </div>
                    <div className="box peach">
                    <h3 className="box-header">Tennis</h3> {/* Header for the third image */}

                        <div className="image-container">
                            <img src="image9.jpg" alt="Image 9" className="box-image" />
                        </div>
                    </div>
                </div>

                {/* Slide 4 */}
                <div className="box-row">
                    <div className="box pink">
                        <div className="image-container">
                            <img src="image10.jpg" alt="Image 10" className="box-image" />
                        </div>
                    </div>
                    <div className="box magenta">
                        <div className="image-container">
                            <img src="image11.jpg" alt="Image 11" className="box-image" />
                        </div>
                    </div>
                    <div className="box purple">
                        <div className="image-container">
                            <img src="image12.jpg" alt="Image 12" className="box-image" />
                        </div>
                    </div>
                </div>
            </Carousel>

            
        </div>
    );
};

export default SimpleSlider;
