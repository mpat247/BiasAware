import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Statistics from './Statistics';
import Activities from './Activities';
import Professions from './Professions';
import QOL from './QOL';
import Engineering from './Engineering';
import Emotions from './Emotions';
import Neighborhood from './Neighborhood';
import Crime from './Crime';
import QOL2 from './QOL2';
import Responsive from './Responsive'; // Import the Responsive component
import LandingPage from './LandingPage';
// Import the createResponsiveDesign function

import './App.css';

// Call the function to create the responsive design

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/Professions" element={<Professions />} />
        <Route path="/QOL" element={<QOL />} />
        <Route path="/Engineering" element={<Engineering />} />
        <Route path="/Emotions" element={<Emotions />} />
        <Route path="/Neighborhood" element={<Neighborhood />} />
        <Route path="/Crime" element={<Crime />} />
        <Route path="/QOL2" element={<QOL2 />} />
        <Route path="/Responsive" element={<Responsive />} /> {/* Render the Responsive component */}
        <Route path="/LandingPage" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}

export default App;
