import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Activities.css';
import arrowLeft from './arrow_left.png'; // Corrected import path with hyphen
import arrowRight from './arrow_right.png'; // Corrected import path with hyphen

const Activities = () => {
  const activities = [
    { name: 'Basketball', image: '/image_grid.jpg' },
    { name: 'Cricket', image: '/image_grid.jpg' },
    { name: 'Volleyball', image: '/image_grid.jpg' },
    { name: 'Hockey', image: '/image_grid.jpg' },
    { name: 'Soccer', image: '/image_grid.jpg' },
    { name: 'Football', image: '/image_grid.jpg' },
    // Add more items as needed
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="activities-container">
      <h1>A C T I V I T I E S</h1>
      <Slider {...settings}>
        {activities.map((activity, index) => (
            <div key={index} className="activity-card">
              <p className="activity-label">{activity.name}</p> {/* Move label above image */}
            <img src={activity.image} alt={activity.name} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, backgroundImage: `url(${arrowRight})` }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, backgroundImage: `url(${arrowLeft})` }}
      onClick={onClick}
    />
  );
}

export default Activities;
