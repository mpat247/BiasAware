import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Statistics from './Statistics';
import QOL from './QOL';
import Engineering from './Engineering';
import Emotions from './Emotions';
import Neighborhood from './Neighborhood';
import Crime from './Crime';
import LandingPage from './LandingPage';
import Addictions from './Addictions';
import NewActivities from './NewActivities'
import Aerospace from './Aerospace'
import NewProfessions from './NewProfessions'
import Addictions2 from './Addictions2';
import GearLoader from './GearLoader'


import Biomedical from './Biomedical'
import Chemical from './Chemical'
import Civil from './Civil'
import Computer from './Computer'
import Electrical from './Electrical'
import Industrial from './Industrial'
import Mechanical from './Mechanical'
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
        <Route path="/Statistics" element={<Statistics />} />
        <Route path="/NewProfessions" element={<NewProfessions />} />
        <Route path="/Addictions2" element={<Addictions2 />} /> {/* Define the route for Crime page */}

        <Route path="/GearLoader" element={<GearLoader />} /> {/* Define the route for Crime page */}

        <Route path="/QOL" element={<QOL />} />
        <Route path="/Engineering" element={<Engineering />} />
        <Route path="/Emotions" element={<Emotions />} />
        <Route path="/Crime" element={<Crime />} />
        <Route path="/LandingPage" element={<LandingPage />} />
        <Route path="/Neighborhood" element={<Neighborhood />} /> {/* Add this line */}
        {/* Define other routes here if needed */}
        <Route path="/Crime" element={<Crime />} /> {/* Define the route for Crime page */}
        <Route path="/Aerospace" element={<Aerospace />} /> {/* Define the route for Crime page */}
        <Route path="/Biomedical" element={<Biomedical />} /> {/* Define the route for Crime page */}
        <Route path="/Chemical" element={<Chemical />} /> {/* Define the route for Crime page */}
        <Route path="/Civil" element={<Civil />} /> {/* Define the route for Crime page */}
        <Route path="/Computer" element={<Computer />} /> {/* Define the route for Crime page */}
        <Route path="/Electrical" element={<Electrical />} /> {/* Define the route for Crime page */}
        <Route path="/Industrial" element={<Industrial />} /> {/* Define the route for Crime page */}
        <Route path="/Mechanical" element={<Mechanical />} /> {/* Define the route for Crime page */}
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