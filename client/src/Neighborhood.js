// MapView.js
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, useMap, Polygon, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Ensure you have this line to import Leaflet's CSS

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
    // Zoom into Ontario after 5 seconds
    setTimeout(() => {
      map.flyTo(ontarioCoords, 7, { duration: 5 });
    }, 5000);

    // Zoom into Toronto after another 5 seconds, then signal that transitions are complete
    setTimeout(() => {
      map.flyTo(torontoCoords, 12.5, { duration: 5 });
      setTransitionsCompleted(true); // This should enable interactions as per your current logic

      // Directly re-enable map interactions as a backup (should not be necessary but can help troubleshoot)
      map.dragging.enable();
      map.scrollWheelZoom.enable();
      map.doubleClickZoom.enable();
      map.touchZoom.enable();
    }, 10000); // Start after the first timeout completes
  }, [map, setTransitionsCompleted]);

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
        <button onClick={onClose} style={closeButtonStyles}>Close</button>
        <h2>Jane & Finch</h2>
        <div className="card-item">HOUSES</div>
        <div className="card-item">STAT</div>
        <div className="card-item">STAT</div>
        <div className="card-item">APP</div>
      </div>
    </div>
  );
};



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
            <h2>Forest Hill</h2>
            <p>Details about Forest Hill...</p>
            {/* Your popup content here, you can style it as you need */}
          </div>
        </Popup>
      </Polygon>
      <Polygon pathOptions={{ color: 'red' }} positions={JaneAndFinchCoordinates}>
        <Popup>
          <div className="popup-content">
            <h2>Jane and Finch</h2>
            <p>Details about Jane and Finch...</p>
            {/* Your popup content here, you can style it as you need */}
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
    <>
      <div style={{ height: '80vh', width: '80%', margin: 'auto' }}>
        <MapContainer
          center={canadaCoords}
          zoom={4}
          scrollWheelZoom={transitionsCompleted}
          doubleClickZoom={transitionsCompleted}
          zoomControl={transitionsCompleted}
          dragging={transitionsCompleted}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
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
        Show Info
      </button>
    </>
  );
};

export default MapView;