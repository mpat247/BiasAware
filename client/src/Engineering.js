// Engineering.js
import React from 'react';
import NavigationBar from './NavigationBar'; // Import the NavigationBar component
import './Engineering.css'; // Import the CSS file for styling

const Engineering = () => {
  return (
    <div className="Engineering">
      <NavigationBar /> {/* Include the NavigationBar component */}
      <div className="small-squares above-title">
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
      </div>
      <div className="content-container">
        <h1>E N G I N E E R I N G</h1>
        {/* Add other content as needed */}
      </div>
      <div className="small-squares below-title">
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
        <div className="small-square">
          <div className="inner-box"></div>
        </div>
      </div>
    </div>
  );
};

export default Engineering;
