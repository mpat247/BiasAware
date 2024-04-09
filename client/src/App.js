import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Statistics from './Statistics';
import Activities from './Activities';
import Professions from './Professions';
import QOL from './QOL';
import Engineering from './Engineering';
import Emotions from './Emotions';
import Neighborhood from './Neighborhood'; // Import the Neighborhood component
import Crime from './Crime'; // Import the Neighborhood component
import QOL2 from './QOL2';
import Addictions from './Addictions';
import NewActivities from './NewActivities'
import NewProfessions from './NewProfessions'

import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/Activities" element={<Activities />} />
        {/* <Route path="/Professions" element={<Professions />} /> */}
        <Route path="/QOL" element={<QOL />} />
        <Route path="/Engineering" element={<Engineering />} />
        <Route path="/Emotions" element={<Emotions />} />
        <Route path="/Neighborhood" element={<Neighborhood />} /> {/* Add this line */}
        {/* Define other routes here if needed */}
        <Route path="/Crime" element={<Crime />} /> {/* Define the route for Crime page */}
        <Route path="/QOL2" element={<QOL2 />} /> {/* Define the route for Crime page */}

        <Route path="/Addictions" element={<Addictions />} /> {/* Define the route for Crime page */}
        <Route path="/NewActivities" element={<NewActivities />} /> 
        <Route path="/NewProfessions" element={<NewProfessions />} /> 
      </Routes>
    </Router>
  );
}

export default App;
