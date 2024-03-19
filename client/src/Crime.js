import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Crime.css';

const crimes = ["shoplifter", "gang leader", "smuggler", "hijacker", "mugger", "embezzler"];

const Crime = () => {
    const [crimeData, setCrimeData] = useState([]);
    useEffect(() => {
      
        const fetchData = async () => {
          const apiUrl = window.env.API_URL;
          try {
            const response = await axios.get(`${apiUrl}/crime/main-images`);
            setCrimeData(response.data.images);
          } catch (error) {
            console.error('Error fetching crime data:', error);
          }
        };
    
        fetchData();
      }, []);
  return (
    <div>
      <h1>Crime Page</h1>
      {/* Additional Box 1 */}
    
      <div className="heatmaps-container">
        {[...Array(12)].map((_, index) => (
            
          <div key={index} className="heatmap-container"> {/* Wrap each heatmap in a container div */}
           {/* Box and title added on top of every 2 heatmaps */}
           
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
       {/* Display crime data */}
      <div className="crime-data">
        {crimeData.map((crime, index) => (
          <div key={index}>
            <h3>Crime: {crimes[index]}</h3>
            <h3>Skin Shade: {crime.skin_shade}</h3>
            <h3>Gender: {crime.gender}</h3>
          </div>
        ))}
      </div>
    </div>
    
  );
};

export default Crime;
