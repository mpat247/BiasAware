import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home.js';
import Statistics from './Statistics.js';
import Activities from './Activities.js';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/Activities" element={<Activities />} />

        {/* Define other routes here if needed */}
      </Routes>
    </Router>
  );
}

export default App;
