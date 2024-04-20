// MapView.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure you have this line to import Leaflet's CSS
import './Neighborhoodnew.css'; // Import the CSS file
const canadaCoords = [62.437413, -102.6959393];
const ontarioCoords = [43.8994482, -79.9580261];
const torontoCoords = [43.7241123, -79.4935225];
const ForestHillCoords = [
  [43.701679, -79.440693],
  [43.698098, -79.439580],
  [43.700997, -79.425469],
  [43.683212, -79.418326],
  [43.686764, -79.401432],
  [43.690729, -79.402986],
  [43.691464, -79.401173],
  [43.697960, -79.403198],
  [43.699874, -79.409283],
  [43.704116, -79.410936],
  [43.703078, -79.415937],
  [43.707146, -79.417089],
  [43.707365, -79.416130],
  [43.709951, -79.417351],
  [43.705547, -79.438703],
  [43.702451, -79.437374]
];

const JaneAndFinchCoordinates = [
  [43.772730, -79.534986],
  [43.736507, -79.526371],
  [43.745051, -79.486335],
  [43.766332, -79.492010],
  [43.763077, -79.506825],
  [43.765892, -79.507978],
  [43.768147, -79.510932],
  [43.770232, -79.512289],
  [43.770232, -79.515367],
  [43.773575, -79.518441],
  [43.775448, -79.521722]
];

const ZoomEffect = ({ setTransitionsCompleted }) => {
  const map = useMap();

  useEffect(() => {
    if (!map) return;  // Ensures operation starts only when the map is fully ready

    const flyToOntario = setTimeout(() => {
      map.flyTo(ontarioCoords, 7, { duration: 5, animate: true, noMoveStart: true })
        .once('zoomend', () => {
          map.flyTo(torontoCoords, 12.5, { duration: 5, animate: true, noMoveStart: true })
            .once('zoomend', () => {
              setTransitionsCompleted(true);
              enableMapInteractions();
            });
        });
    }, 5000);

    const enableMapInteractions = () => {
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.touchZoom.enable();
    };

    return () => {
      clearTimeout(flyToOntario);
      map.off('zoomend');
    };
  }, [map, setTransitionsCompleted]);  // Ensure map instance is tracked for reactivity

  return null;
};



const InfoCard = ({ show, onClose }) => {
  if (!show) return null;

  const overlayStyles = {
    position: 'fixed', // Fixed relative to the viewport
    top: 0,
    left: 0,
    width: '100vw', // 100% of the viewport width
    height: '100vh', // 100% of the viewport height
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Semi-transparent background
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000, // High z-index to be on top
  };

  const cardStyles = {
    position: 'relative', // For positioning the close button
    backgroundColor: '#fff', // Background for the card
    padding: '20px', // Padding inside the card
    borderRadius: '10px', // Optional, for rounded corners
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)', // Optional, for a drop shadow
    zIndex: 1001, // Above the overlay
  };

  const closeButtonStyles = {
    position: 'absolute', // Positioning relative to the card
    top: '10px', // Space from the top of the card
    right: '10px', // Space from the right of the card
    border: 'none', // No border for the button
    background: 'none', // No background to see the underlying card color
    fontSize: '1.5rem', // Size of the text
    cursor: 'pointer', // Cursor indicates it's clickable
  };

  return (
    <div style={overlayStyles}>
      <div style={cardStyles}>
        <button onClick={onClose} style={closeButtonStyles}>x</button>
        <div className="popup-content-compare">
        <div className="titles-container">
        <h2 className="popup-title-left">JANE & FINCH</h2>
        <h2 className="popup-title-right">FOREST HILL</h2>
      </div>
            <div className="grid-container-compare">
              <div className="grid-item-house-compare">
              <ImageShuffler folderName="Janeandfinchhouse" />
              </div>
              <div className="grid-item-house-compare">
              <ImageShuffler folderName="foresthillhouse" />
              </div>
              <div className="grid-item-apart-compare">
              <ImageShuffler folderName="Janeandfinchapartment" />
              </div>
              <div className="grid-item-apart-compare">
              <ImageShuffler folderName="foresthillapartment" />
              </div>
            </div>
            </div>
      </div>
    </div>
  );
};
const ImageShuffler = ({ folderName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Assuming the images are stored in the `public` directory and named in a sequence
  // You should adjust the base path and image names as needed
  const images = [
    `${process.env.PUBLIC_URL}/neighborhood/${folderName}/Image1.jpg`,
    `${process.env.PUBLIC_URL}/neighborhood/${folderName}/Image2.jpg`,
    `${process.env.PUBLIC_URL}/neighborhood/${folderName}/Image3.jpg`,
    `${process.env.PUBLIC_URL}/neighborhood/${folderName}/Image4.jpg`,
    `${process.env.PUBLIC_URL}/neighborhood/${folderName}/Image5.jpg`,
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(intervalId);
  }, [images.length]);

  // No need to check for images.length === 0 since we know the images array length
  return <img src={images[currentIndex]} alt="Shuffling" style={{ maxWidth: '100%', height: 'auto' }} />;
};

// Helper function to import all images from a directory
function importAll(r) {
  return r.keys().map(r);
}

const HighlightNeighborhoods = ({ show }) => {
  const onNeighborhoodClick = (name) => {
    alert(`Clicked on ${name}`);
  };

  if (!show) return null; // Only render the polygons if 'show' is true

  return (
    <>
      <Polygon pathOptions={{ color: 'blue' }} positions={ForestHillCoords}>
        <Popup>
        <div className="popup-content">
            <h2 className = "popup-title">FOREST HILL</h2>
            <div className="grid-container-neighborhood">
              <div className="grid-item-houses">
              <ImageShuffler folderName="foresthillhouse" />
              </div>
              <div className="grid-item-stats">
              <img src="/neighborhood/foresthillhousehold.gif" alt="aero4" />
              </div>
              <div className="grid-item-stats">
              <img src="/neighborhood/forestcrime.gif" alt="aero4" />
              </div>
              <div className="grid-item-apartment">
              <ImageShuffler folderName="foresthillapartment" />
              </div>
            </div>
          </div>
        </Popup>
      </Polygon>
      <Polygon pathOptions={{ color: 'red' }} positions={JaneAndFinchCoordinates}>
        <Popup>
          <div className="popup-content">
            <h2 className = "popup-title">JANE & FINCH</h2>
            <div className="grid-container-neighborhood">
              <div className="grid-item-houses">
              <ImageShuffler folderName="Janeandfinchhouse" />
              </div>
              <div className="grid-item-stats">
              <img src="/neighborhood/janehousehold.gif" alt="aero4" />
              </div>
              <div className="grid-item-stats">
              <img src="/neighborhood/janecrime.gif" alt="aero4" />
              </div>
              <div className="grid-item-apartment">
              <ImageShuffler folderName="Janeandfinchapartment" />
              </div>
            </div>
          </div>
        </Popup>
      </Polygon>
    </>
  );
};

const MapView = () => {
  const [transitionsCompleted, setTransitionsCompleted] = useState(false);
  const [showInfoCard, setShowInfoCard] = useState(false); // New state variable for showing the card

  // Remove the console.log if not needed or keep it for debugging purposes
  console.log("Transitions Completed:", transitionsCompleted);

  return (
    <div className="neighborhood-title-container">
      <h1 className="neighborhood-landing-title">NEIGHBOURHOOD</h1>
      <div style={{ height: '80vh', width: '80%', margin: 'auto' }}>
        <MapContainer
          center={canadaCoords}
          zoom={4}
          scrollWheelZoom={transitionsCompleted}
          doubleClickZoom={transitionsCompleted}
          zoomControl={transitionsCompleted}
          dragging={transitionsCompleted}
          style={{ height: '85%', width: '100%', borderRadius: '15px' }}
          attributionControl={false}  // This disables the attribution control

        >
          <TileLayer
            url="https://api.mapbox.com/styles/v1/mpat247/clv7muagn005401qlfz1y4h6k/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibXBhdDI0NyIsImEiOiJjbHVqeTRjd3gwa2JiMmtvbGt2bWd3MWJyIn0.WLkzKPYKE4qqFTxxnR6SNw"
            id="mpat247/clv7muagn005401qlfz1y4h6k"
            accessToken="pk.eyJ1IjoibXBhdDI0NyIsImEiOiJjbHVqeTRjd3gwa2JiMmtvbGt2bWd3MWJyIn0.WLkzKPYKE4qqFTxxnR6SNw"
          />

          <ZoomEffect setTransitionsCompleted={setTransitionsCompleted} />
          <HighlightNeighborhoods show={transitionsCompleted} />
        </MapContainer>

        {/* InfoCard component */}
        <InfoCard
          show={showInfoCard}
          onClose={() => setShowInfoCard(false)}
        />

      </div>

      {/* Button to show the InfoCard */}
      <button
        className="info-btn"
        onClick={() => setShowInfoCard(true)}
        style={{
          position: 'absolute',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          padding: '10px 20px',
          backgroundColor: '#000',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
          zIndex: 10
        }}
      >
        COMPARE
      </button>
    </div>
  );
};

export default MapView;