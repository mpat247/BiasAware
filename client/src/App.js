import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Statistics from './Statistics';
import QOL from './QOL';
import Engineering from './Engineering';
import Emotions from './Emotions';
import Neighborhood from './Neighborhood';
import Crime from './Crime';
import QOL2 from './QOL2';
import LandingPage from './LandingPage';
import Addictions from './Addictions';
import NewActivities from './NewActivities'
import Aerospace from './Aerospace'
import NewProfessions from './NewProfessions'
import Galleries from './Galleries'
import GalleriesLanding from './GalleriesLanding';


//import Test from './Test'; // Import the test2 component

import './App.css';

// Call the function to create the responsive design

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Addictions" element={<Addictions />} />
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/NewProfessions" element={<NewProfessions />} />

      
        <Route path="/QOL" element={<QOL />} />
        <Route path="/Engineering" element={<Engineering />} />
        <Route path="/Emotions" element={<Emotions />} />
        <Route path="/Neighborhood" element={<Neighborhood />} />
        <Route path="/Crime" element={<Crime />} />
        <Route path="/QOL2" element={<QOL2 />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Neighborhood" element={<Neighborhood />} /> {/* Add this line */}
        {/* Define other routes here if needed */}
        <Route path="/Crime" element={<Crime />} /> {/* Define the route for Crime page */}
        <Route path="/QOL2" element={<QOL2 />} /> {/* Define the route for Crime page */}
        <Route path="/Aerospace" element={<Aerospace />} /> {/* Define the route for Crime page */}


        <Route path="/Addictions" element={<Addictions />} /> {/* Define the route for Crime page */}
        <Route path="/NewActivities" element={<NewActivities />} /> 
        <Route path="/Galleries" element={<Galleries />} />
        <Route path="/GalleriesLanding" element={<GalleriesLanding />} /> 
      </Routes>
    </Router>
  );
}
// <Route path="/test2" element={<test2 />} /> {/* Define the route for Crime page */}

export default App;