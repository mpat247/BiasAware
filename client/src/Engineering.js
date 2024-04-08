// Engineering.js
import React from 'react';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component
import './Engineering.css'; // Import the CSS file for styling
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
const Engineering = () => {
  return (
    <div className="Engineering">
      <Helmet>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
        </Helmet>
      <NavigationBar /> {/* Include the NavigationBar component */}
      <div className="small-squares above-title">
        <div className="small-square">
        <Link to="/aerospace" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">AEROSPACE</div> {/* Title below the inner box */}
        </div>
        <div className="small-square">
        <Link to="/biomedical" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">BIOMEDICAL</div> {/* Title below the inner box */}
        </div>
        <div className="small-square">
        <Link to="/chemical" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">CHEMICAL</div> {/* Title below the inner box */}
        </div>
        <div className="small-square">
        <Link to="/civil" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">CIVIL</div> {/* Title below the inner box */}
        </div>
      </div>
      <div className="content-container">
        <h1>E N G I N E E R I N G</h1>
        {/* Add other content as needed */}
      </div>
      <div className="small-squares below-title">
        <div className="small-square">
        <Link to="/computer" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">COMPUTER</div> {/* Title below the inner box */}
        </div>
        <div className="small-square">
        <Link to="/electrical" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">ELECTRICAL</div> {/* Title below the inner box */}
        </div>
        <div className="small-square">
        <Link to="/industrial" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">INDUSTRIAL</div> {/* Title below the inner box */}
        </div>
        <div className="small-square">
        <Link to="/mechanical" className="inner-box">
          <div className="inner-box"></div>
        </Link>
          <div className="title">MECHANICAL</div> {/* Title below the inner box */}
        </div>
      </div>
    </div>
  );
};

export default Engineering;