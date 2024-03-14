import React, { useEffect, useState } from 'react';

const Neighborhood = () => {
  const [titleIndex, setTitleIndex] = useState(0); // State to keep track of the index of the current title
  const [comparePopupVisible, setComparePopupVisible] = useState(false); // State to manage the visibility of the compare pop-up
  const [hasTypedOnce, setHasTypedOnce] = useState(false);

  // Added a new state variable to keep track of typed title
const [typedCompareTitle, setTypedCompareTitle] = useState('');
  useEffect(() => {
    // Check if the Google Maps API script is already loaded
    if (!window.google) {
      const googleMapScript = document.createElement('script');
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      googleMapScript.addEventListener('error', handleScriptError);
      document.head.appendChild(googleMapScript);

      // Remove the script element when the component unmounts
      return () => {
        document.head.removeChild(googleMapScript);
      };
    } else {
      // If the Google Maps API script is already loaded, call initMap directly
      initMap();
    }
  }, []);

  useEffect(() => {
    // Add click event listener to close the pop-up for Jane and Finch
    const janeAndFinchCloseButton = document.getElementById('popup-close-jane-and-finch');
    if (janeAndFinchCloseButton) {
      janeAndFinchCloseButton.addEventListener('click', () => {
        document.getElementById('popup-jane-and-finch').style.display = 'none';
      });
    }

    // Add click event listener to close the pop-up for Forest Hill
    const forestHillCloseButton = document.getElementById('popup-close-forest-hill');
    if (forestHillCloseButton) {
      forestHillCloseButton.addEventListener('click', () => {
        document.getElementById('popup-forest-hill').style.display = 'none';
      });
    }
  }, []);

  useEffect(() => {
    if (comparePopupVisible) {
      const title = 'A HOUSE IN JANE & FINCH';

      // Typing animation function
      const startTypingAnimation = () => {
        let currentIndex = 0;
        const typingInterval = setInterval(() => {
          setTypedCompareTitle(title.substring(0, currentIndex + 1));
          currentIndex++;
          if (currentIndex === title.length) {
            clearInterval(typingInterval);
            // Wait for 7 seconds after typing completion
            setTimeout(startTypingAnimation, 7000);
          }
        }, 100);
      };

      // Start the typing animation
      startTypingAnimation();
    }
}, [comparePopupVisible]);


  const initMap = () => {
    const janeAndFinch = { lat: 43.7648, lng: -79.5074 }; // Jane and Finch coordinates
    const forestHill = { lat: 43.6936, lng: -79.4144 }; // Forest Hill coordinates

    const mapOptions = {
      zoom: 11, // Decreased zoom level
      center: { lat: (janeAndFinch.lat + forestHill.lat) / 2, lng: (janeAndFinch.lng + forestHill.lng) / 2 }, // Center between Jane and Finch and Forest Hill
      gestureHandling: 'none', // Disable zooming and panning
      zoomControl: false, // Hide zoom controls
    };

    const map = new window.google.maps.Map(document.getElementById('map'), mapOptions);

    // Add markers for Jane and Finch and Forest Hill
    const janeAndFinchMarker = new window.google.maps.Marker({
      position: janeAndFinch,
      map: map,
      title: 'Jane and Finch'
    });

    const forestHillMarker = new window.google.maps.Marker({
      position: forestHill,
      map: map,
      title: 'Forest Hill'
    });

    // Add click event listener to Jane and Finch marker
    janeAndFinchMarker.addListener('click', () => {
      document.getElementById('popup-jane-and-finch').style.display = 'block';
    });

    // Add click event listener to Forest Hill marker
    forestHillMarker.addListener('click', () => {
      document.getElementById('popup-forest-hill').style.display = 'block';
    });
  };

  const handleScriptError = () => {
    // Handle errors if the Google Maps API script fails to load
    console.error('Error loading Google Maps API');
    // You can display an error message to the user or retry loading the script
  };

  const handleNextTitle = () => {
    // Increment the titleIndex or reset to 0 if it exceeds the number of titles
    setTitleIndex((prevIndex) => (prevIndex + 1) % 2);
  };

  const handleCompareClick = () => {
    // Display the compare pop-up
    setComparePopupVisible(true);
  };

  return (
    <div>
      <h1>Neighborhood Page</h1>
      <div id="map" style={{ width: '100%', height: '500px' }}></div>

      {/* Pop-up for Jane and Finch */}
      <div id="popup-jane-and-finch" style={{ display: 'none', position: 'fixed', top: 0, left: 0, width: '60%', height: '80%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
          <div style={{ position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
              <button id="popup-close-jane-and-finch">Close</button>
            </div>
            <div style={{ position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#0B0533', padding: '20px 30px', borderRadius: '5px', zIndex: 1000 }}>
              <h3 style={{ color: 'white', marginRight: '10px' }}>{titleIndex === 0 ? 'A HOUSE IN JANE & FINCH' : 'AN APARTMENT IN JANE & FINCH'}</h3>
            </div>
            <div style={{ position: 'absolute', top: '12.5%', left: '70%', transform: 'translateX(-50%)', padding: '20px 30px', borderRadius: '5px', zIndex: 1000}}>
              <img src="/Arrows/NextButton.png" alt="Next" style={{ width: '80px', height: '80px', cursor: 'pointer' }} onClick={handleNextTitle} />
            </div>
            {/* Squares */}
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', display: 'flex', justifyContent: 'space-between', width: '50%', zIndex: 1000 }}>
              <div style={{ backgroundColor: 'grey', width: '200px', height: '200px' }}></div>
              <div style={{ backgroundColor: 'grey', width: '200px', height: '200px' }}></div>
              <div style={{ backgroundColor: 'grey', width: '200px', height: '200px' }}></div>
            </div>
            {/* End of Squares */}
            <div
              style={{
                position: 'absolute',
                bottom: '15%',
                left: '50%',
                transform: 'translateX(-50%)',
                backgroundColor: '#0B0533',
                padding: '20px 30px',
                borderRadius: '5px',
                zIndex: 1000,
                cursor: 'pointer' // Add cursor pointer to indicate clickability
              }}
              onClick={handleCompareClick} // Moved onClick event to the div wrapping the "Compare" text
            >
              <h3 style={{ color: 'white', marginRight: '10px' }}>COMPARE</h3>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', width: '80%', height: '80%' }}>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up for Forest Hill */}
      <div id="popup-forest-hill" style={{ display: 'none', position: 'fixed', top: 0, left: 0, width: '60%', height: '80%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
          <div style={{ position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
              <button id="popup-close-forest-hill">Close</button>
            </div>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', width: '80%', height: '80%' }}>
              {/* Forest Hill content */}
            </div>
          </div>
        </div>
      </div>

      {/* Compare Pop-up */}
      {comparePopupVisible && (
        <div id="popup-compare" style={{ display: 'block', position: 'fixed', top: 0, left: 0, width: '60%', height: '80%', backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 999 }}>
          {/* Compare Popup content */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div style={{ position: 'relative', backgroundColor: 'rgba(0, 0, 0, 0.5)', padding: '20px', borderRadius: '10px', width: '100%', height: '100%' }}>
              <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
                <button id="popup-close-compare" onClick={() => setComparePopupVisible(false)}>Close</button>
              </div>
              <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: '#D9D9D9', padding: '20px', borderRadius: '10px', width: '80%', height: '80%' }}>
                {/* Compare content */}
                <div style={{ position: 'absolute', top: '10%', left: '30%', transform: 'translateX(-50%)', backgroundColor: '#0B0533', padding: '20px 30px', borderRadius: '5px', zIndex: 1000 }}>
                <h3 style={{ color: 'white', marginRight: '10px' }}>{typedCompareTitle}</h3>
            </div>
            {/* New Rectangles */}
            <div style={{ position: 'absolute', top: '60%', left: '15%', transform: 'translate(-50%, -50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 1000 }}>
        <div style={{ backgroundColor: 'grey', width: '200px', height: '200px', marginBottom: '20px' }}></div>
        <div style={{ backgroundColor: 'grey', width: '200px', height: '200px' }}></div>
      </div>
          {/* End of New Rectangles */}
            
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Neighborhood;
