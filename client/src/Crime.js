import React from 'react';
import './Crime.css';

const Crime = () => {
  return (
    <div>
      <h1>Crime Page</h1>
      <div className="heatmaps-container">
        {[...Array(12)].map((_, index) => (
          <div key={index} className="heatmap-container"> {/* Wrap each heatmap in a container div */}
            <div className="heatmap">
              {[...Array(3)].map((_, rowIndex) => (
                <div key={rowIndex} className="heatmap-row">
                  {[...Array(3)].map((_, colIndex) => (
                    <div key={colIndex} className="heatmap-square"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Crime;
