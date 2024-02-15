// SimpleSlider.js
import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './SimpleSlider.css'; // Make sure the path is correct

const SimpleSlider = () => {
    return (
        <div className="carousel-container">
            {/* <h1 className="header-title">Activities</h1> */}
            <Carousel infiniteLoop showStatus={false}>
                {/* Slide 1 */}
                <div className="box-row">
                    <div className="box yellow">Box 1</div>
                    <div className="box orange">Box 2</div>
                    <div className="box peach">Box 3</div>
                </div>
                
                {/* Slide 2 */}
                <div className="box-row">
                    {/* Assign different colors to boxes in Slide 2 */}
                    <div className="box pink">Box 4</div>
                    <div className="box magenta">Box 5</div>
                    <div className="box purple">Box 6</div>
                </div>

                {/* Slide 3 */}
                <div className="box-row">
                    <div className="box yellow">Box 1</div>
                    <div className="box orange">Box 2</div>
                    <div className="box peach">Box 3</div>
                </div>
                
                {/* Slide 4 */}
                <div className="box-row">
                    {/* Assign different colors to boxes in Slide 3 */}
                    <div className="box pink">Box 7</div>
                    <div className="box magenta">Box 8</div>
                    <div className="box purple">Box 9</div>
                </div>
        </Carousel>

        </div>
    );
};

export default SimpleSlider;
