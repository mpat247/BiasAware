// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Statistics from './Statistics';
import Activities from './Activities';
import Professions from './Professions';
import QOL from './QOL';
import Engineering from './Engineering'; // Import the Engineering component
import Emotions from './Emotions';


import './App.css';

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

        {/* Define other routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
