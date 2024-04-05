import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Statistics from './Statistics';
import Activities from './Activities';
import ProfCarousel from './ProfCarousel';
import ProfCarousel2 from './ProfCarousel2';
import QOL from './QOL';
import Engineering from './Engineering';
import Emotions from './Emotions';
import Neighborhood from './Neighborhood';
import Crime from './Crime';
import QOL2 from './QOL2';
import Responsive from './Responsive'; // Import the Responsive component
import LandingPage from './LandingPage';
// Import the createResponsiveDesign function
import Addictions from './Addictions';
import test2 from './test2';


import './App.css';

// Call the function to create the responsive design

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/Activities" element={<Activities />} />
        <Route path="/ProfCarousel" element={<ProfCarousel />} />
        <Route path="/ProfCarousel2" element={<ProfCarousel2 />} />
        <Route path="/QOL" element={<QOL />} />
        <Route path="/Engineering" element={<Engineering />} />
        <Route path="/Emotions" element={<Emotions />} />
        <Route path="/Neighborhood" element={<Neighborhood />} />
        <Route path="/Crime" element={<Crime />} />
        <Route path="/QOL2" element={<QOL2 />} />
        <Route path="/Responsive" element={<Responsive />} /> {/* Render the Responsive component */}
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Neighborhood" element={<Neighborhood />} /> {/* Add this line */}
        {/* Define other routes here if needed */}
        <Route path="/Crime" element={<Crime />} /> {/* Define the route for Crime page */}
        <Route path="/QOL2" element={<QOL2 />} /> {/* Define the route for Crime page */}
        <Route path="/Addictions" element={<Addictions />} />

        <Route path="/test2" element={<test2 />} /> {/* Define the route for Crime page */}

      </Routes>
    </Router>
  );
}

export default App;
