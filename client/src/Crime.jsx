import React, { useEffect, useRef, useState } from 'react';
import anychart from 'anychart'; // Import AnyChart
import { Helmet } from 'react-helmet'; //Import Font
//import './Crime.css';
import CrimeStyling from "./CrimeStyling.module.css"; // Import CSS module
import axios from 'axios';
import REACT_APP_API_URL from './config';
import placeholderImage from './placeholder-image.png'; // Make sure this is the correct path
import GearLoader from './GearLoader'; // Import the GearLoader component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';




const Crime = () => {

  const [popupVisible, setPopupVisible] = useState(false);
  const [popupText, setPopupText] = useState("");
  const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
  //const [showSlider, setShowSlider] = useState(false);
  const [popupImages, setPopupImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleClosePopup = () => {
    setPopupVisible(false);
  };
  //const [showSlider, setShowSlider] = useState(false);


  //const [chartsCreated, setChartsCreated] = useState(false); // Define chartsCreated state
  const chartsCreated = useRef(false);


  const handleHeatmapClick = async (e, squareId) => {
    if (squareId === 0 || squareId === 1) {
      squareId = 0;
    } else if (squareId === 2 || squareId === 3) {
      squareId = 1;
    } else if (squareId === 4 || squareId === 5) {  
      squareId = 2;
    }

    const rect = e.target.getBoundingClientRect();
    setPopupPosition({ x: rect.left, y: rect.top });
    setPopupText(`Fetching images for square ${squareId}...`);
    console.log(squareId);
    setLoading(true);
    setPopupVisible(true);

    try {
      const response = await axios.get(`${REACT_APP_API_URL}/crimes/fetchedCrime?crimeId=${squareId}`);

      // Directly using the objects returned by the API, filling missing entries with placeholders
      const fullImagesData = response.data.images.map(imageObj => ({
        ...imageObj,
        image: imageObj.image || placeholderImage // Using the placeholder if no image URL is provided
      }));

      // If the API returns fewer than 9 images, fill the rest with random images from fullImagesData
      const imagesWithRandom = Array.from({ length: 9 }).map((_, index) => fullImagesData[index] || {
        ...fullImagesData[Math.floor(Math.random() * fullImagesData.length)], // Selecting a random image from fullImagesData
        prompt: 'Random Image',
        description: 'Random description' // You can customize these placeholders
      });

      setPopupImages(imagesWithRandom);
      setPopupText(`Images for crime ID ${squareId}`);
    } catch (error) {
      console.error('Error fetching images:', error);
      setPopupText(`Failed to fetch images for crime ID ${squareId}`);
    }
    setLoading(false);
  };


  const handleHeatmapClick2 = async (e, squareId) => {

    if (squareId === 0 || squareId === 1) {
      squareId = 3;
    } else if (squareId === 2 || squareId === 3) {
      squareId = 4;
    } else if (squareId === 4 || squareId === 5) {  
      squareId = 5;
    }

    const rect = e.target.getBoundingClientRect();
    setPopupPosition({ x: rect.left, y: rect.top });
    setPopupText(`Fetching images for square ${squareId}...`);
    console.log(squareId);
    setLoading(true);
    setPopupVisible(true);

    try {
      const response = await axios.get(`${REACT_APP_API_URL}/crimes/fetchedCrime?crimeId=${squareId}`);

      // Directly using the objects returned by the API, filling missing entries with placeholders
      const fullImagesData = response.data.images.map(imageObj => ({
        ...imageObj,
        image: imageObj.image || placeholderImage // Using the placeholder if no image URL is provided
      }));

      // If the API returns fewer than 9 images, fill the rest with random images from fullImagesData
      const imagesWithRandom = Array.from({ length: 9 }).map((_, index) => fullImagesData[index] || {
        ...fullImagesData[Math.floor(Math.random() * fullImagesData.length)], // Selecting a random image from fullImagesData
        prompt: 'Random Image',
        description: 'Random description' // You can customize these placeholders
      });

      setPopupImages(imagesWithRandom);
      setPopupText(`Images for crime ID ${squareId}`);
    } catch (error) {
      console.error('Error fetching images:', error);
      setPopupText(`Failed to fetch images for crime ID ${squareId}`);
    }
    setLoading(false);
  };

  /*const handleHeatmapClick = (e, index) => {
    const rect = e.target.getBoundingClientRect();
    setPopupText(`Clicked on heatmap ${index + 1}`);
    setPopupPosition({ x: rect.left, y: rect.top });
    setPopupVisible(true);
    setShowSlider(true); // Show the slider
};

const handleHeatmapClick = (e, index) => {
    setShowSlider(true); // Show the slider
};*/




  const rectangleText = ["A Shoplifter", "A Gang Leader", "A Smuggler", "A Hijacker", "A Mugger", "An Embezzler"];
  useEffect(() => {
    const renderCharts = async () => {
      // Define 12 datasets for 12 different heatmaps
      let idCounter = 1;
      const allData = [
        // Dataset for heatmap 1
        [{ x: 1, y: 1, heat: 0.202 }, { x: 2, y: 1, heat: 0.202 }, { x: 3, y: 1, heat: 0.202 },
        { x: 1, y: 2, heat: 0.302 }, { x: 2, y: 2, heat: 0.302 }, { x: 3, y: 2, heat: 0.302 },
        { x: 1, y: 3, heat: 0.302 }, { x: 2, y: 3, heat: 0.302 }, { x: 3, y: 3, heat: 0.302 }],

        // Dataset for heatmap 2
        [{ x: 1, y: 1, heat: 0.199 }, { x: 2, y: 1, heat: 0.199 }, { x: 3, y: 1, heat: 0.199 },
        { x: 1, y: 2, heat: 0.199 }, { x: 2, y: 2, heat: 0.199 }, { x: 3, y: 2, heat: 0.199 },
        { x: 1, y: 3, heat: 0.199 }, { x: 2, y: 3, heat: 0.199 }, { x: 3, y: 3, heat: 0.199 }],

        // Dataset for heatmap 3
        [{ x: 1, y: 1, heat: 0.402 }, { x: 2, y: 1, heat: 0.402 }, { x: 3, y: 1, heat: 0.602 },
        { x: 1, y: 2, heat: 0.602 }, { x: 2, y: 2, heat: 0.702 }, { x: 3, y: 2, heat: 0.702 },
        { x: 1, y: 3, heat: 0.702 }, { x: 2, y: 3, heat: 0.702 }, { x: 3, y: 3, heat: 0.702 }],

        // Dataset for heatmap 4
        [{ x: 1, y: 1, heat: 0.802 }, { x: 2, y: 1, heat: 0.802 }, { x: 3, y: 1, heat: 0.802 },
        { x: 1, y: 2, heat: 0.802 }, { x: 2, y: 2, heat: 0.802 }, { x: 3, y: 2, heat: 0.802 },
        { x: 1, y: 3, heat: 0.802 }, { x: 2, y: 3, heat: 0.802 }, { x: 3, y: 3, heat: 0.802 }],

        // Dataset for heatmap 5
        [{ x: 1, y: 1, heat: 0.202 }, { x: 2, y: 1, heat: 0.502 }, { x: 3, y: 1, heat: 0.502 },
        { x: 1, y: 2, heat: 0.502 }, { x: 2, y: 2, heat: 0.602 }, { x: 3, y: 2, heat: 0.602 },
        { x: 1, y: 3, heat: 0.602 }, { x: 2, y: 3, heat: 0.602 }, { x: 3, y: 3, heat: 0.602 }],

        // Dataset for heatmap 6
        [{ x: 1, y: 1, heat: 0.802 }, { x: 2, y: 1, heat: 0.802 }, { x: 3, y: 1, heat: 0.802 },
        { x: 1, y: 2, heat: 0.802 }, { x: 2, y: 2, heat: 0.802 }, { x: 3, y: 2, heat: 0.802 },
        { x: 1, y: 3, heat: 0.802 }, { x: 2, y: 3, heat: 0.802 }, { x: 3, y: 3, heat: 0.802 }],

        // Dataset for heatmap 7
        [{ x: 1, y: 1, heat: 0.302 }, { x: 2, y: 1, heat: 0.302 }, { x: 3, y: 1, heat: 0.302 },
        { x: 1, y: 2, heat: 0.302 }, { x: 2, y: 2, heat: 0.402 }, { x: 3, y: 2, heat: 0.602 },
        { x: 1, y: 3, heat: 0.702 }, { x: 2, y: 3, heat: 0.702 }, { x: 3, y: 3, heat: 0.702 }],

        // Dataset for heatmap 8
        [{ x: 1, y: 1, heat: 0.802 }, { x: 2, y: 1, heat: 0.802 }, { x: 3, y: 1, heat: 0.802 },
        { x: 1, y: 2, heat: 0.802 }, { x: 2, y: 2, heat: 0.802 }, { x: 3, y: 2, heat: 0.802 },
        { x: 1, y: 3, heat: 0.802 }, { x: 2, y: 3, heat: 0.802 }, { x: 3, y: 3, heat: 0.802 }],

        // Dataset for heatmap 9
        [{ x: 1, y: 1, heat: 0.302 }, { x: 2, y: 1, heat: 0.402 }, { x: 3, y: 1, heat: 0.402 },
        { x: 1, y: 2, heat: 0.602 }, { x: 2, y: 2, heat: 0.602 }, { x: 3, y: 2, heat: 0.602 },
        { x: 1, y: 3, heat: 0.602 }, { x: 2, y: 3, heat: 0.602 }, { x: 3, y: 3, heat: 0.702 }],

        // Dataset for heatmap 10
        [{ x: 1, y: 1, heat: 0.802 }, { x: 2, y: 1, heat: 0.802 }, { x: 3, y: 1, heat: 0.802 },
        { x: 1, y: 2, heat: 0.802 }, { x: 2, y: 2, heat: 0.802 }, { x: 3, y: 2, heat: 0.802 },
        { x: 1, y: 3, heat: 0.802 }, { x: 2, y: 3, heat: 0.802 }, { x: 3, y: 3, heat: 0.802 }],

        // Dataset for heatmap 11
        [{ x: 1, y: 1, heat: 0.202 }, { x: 2, y: 1, heat: 0.202 }, { x: 3, y: 1, heat: 0.202 },
        { x: 1, y: 2, heat: 0.202 }, { x: 2, y: 2, heat: 0.202 }, { x: 3, y: 2, heat: 0.202 },
        { x: 1, y: 3, heat: 0.202 }, { x: 2, y: 3, heat: 0.202 }, { x: 3, y: 3, heat: 0.202 }],

        // Dataset for heatmap 12
        [{ x: 1, y: 1, heat: 0.802 }, { x: 2, y: 1, heat: 0.802 }, { x: 3, y: 1, heat: 0.802 },
        { x: 1, y: 2, heat: 0.802 }, { x: 2, y: 2, heat: 0.802 }, { x: 3, y: 2, heat: 0.802 },
        { x: 1, y: 3, heat: 0.802 }, { x: 2, y: 3, heat: 0.802 }, { x: 3, y: 3, heat: 0.802 }],

      ].map(dataset => dataset.map(item => ({ ...item, id: idCounter++ })));;

      for (var i = 0; i < 12; i++) {
        // Create the chart and set the data
        const chart = anychart.heatMap(allData[i]);

        // Define the custom color scale for all heatmaps
        const customColorScale = anychart.scales.ordinalColor();
        customColorScale.ranges([
          { less: 0.200 },
          { from: 0.201, to: 0.300 },
          { from: 0.301, to: 0.400 },
          { from: 0.401, to: 0.500 },
          { from: 0.501, to: 0.600 },
          { from: 0.601, to: 0.700 },
          { from: 0.701, to: 0.800 },
          { greater: 0.801 }
        ]);


        customColorScale.colors(["#FFD1DC", "#EDCBB7", "#CFB3A3", "#A88B75", "#7A5F3E", "#5C3F2B", "#2A180D", "#A2BFFE"]);


        // Create and configure the charts

        // Set the color scale as the color scale of the chart
        chart.colorScale(customColorScale);

        // Set the container id
        chart.container(`container${i + 1}`);

        // Hide x and y axis labels
        chart.xAxis().labels(false);
        chart.yAxis().labels(false);

        // Disable credits
        chart.credits().enabled(false);

        // Disable the tooltip
        chart.tooltip(false);

        // Disable the labels in each box
        chart.labels(false);

        // Initiate drawing the chart
        await chart.draw();
      }


    };
    // Use chartsCreated.current instead of chartsCreated
    if (!chartsCreated.current) {
      renderCharts();
      // Update the current value of chartsCreated
      chartsCreated.current = true;
    }

  }, []);

  return (
    <div className={CrimeStyling["crimes-body"]}>
      <h1 className={CrimeStyling["title"]}>CRIME</h1>
      <div className={CrimeStyling["crime-rectangle-container"]}>
        {[...Array(3)].map((_, index) => (
          <div key={index} className={CrimeStyling["crime-rectangle"]}>{rectangleText[index]}</div>
        ))}
      </div>

      <div className={CrimeStyling["grid-container"]}>
        {[...Array(6).keys()].map((index) => (
          <div key={index} id={`container${index + 1}`} className={CrimeStyling["heatmap-container"]} onClick={(e) => handleHeatmapClick(e, index)}></div>
        ))}
      </div>

      <div className={CrimeStyling["crime-rectangle-container"]}>
        {[...Array(3)].map((_, index) => (
          <div key={index + 3} className={CrimeStyling["crime-rectangle"]}>{rectangleText[index + 3]}</div>
        ))}
      </div>

      <div className={CrimeStyling["grid-container"]}>
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index + 6} id={`container${index + 7}`} className={CrimeStyling["heatmap-container"]} onClick={(e) => handleHeatmapClick2(e, index)}></div>
        ))}
      </div>

      {popupVisible && (
        <>
          <div className={CrimeStyling["popup-overlay"]} onClick={handleClosePopup}></div>
          <div className={CrimeStyling["popup-crime"]}>
<button
        onClick={handleClosePopup}
        style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          borderRadius: '5px',
          cursor: 'pointer',
          padding: '3px 8px',
          background: '#a8a8a8',
          border: 'none',
          color: 'white',
          zIndex: 1001 // Ensures button is above all other content
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>            {loading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <GearLoader />
              </div>
            ) : (
              <>
                {/* Conditionally render the title only if popupImages has elements */}
                {popupImages.length > 0 && (
                  <div className={CrimeStyling["popup-title"]}>{popupImages[0].prompt} < br /><span className={CrimeStyling["different-description-style"]}>{popupImages[0].description} </span></div>
                )}
                <div className={CrimeStyling["grid-popup"]}>
                  {popupImages.map((imageObj, index) => (
                    <div key={index} className={CrimeStyling["grid-square"]}>
                      <img src={imageObj.image} alt={`Crime Image ${index}`} className={CrimeStyling["square-image"]} />
                      {/* Optionally wrap texts in a container for better control */}
                      <div className={CrimeStyling["text-container"]}>
                        <p className='crime-prompt'>{imageObj.prompt}</p> {/* Displaying the prompt */}
                        <p className='crime-description'>{imageObj.description}</p> {/* Displaying the description */}
                        <a href="/Statistics" className={CrimeStyling["statistics-link-crimes"]}>
                          More Information Here
                        </a>

                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </>
      )}


    </div>
  );
};

export default Crime;