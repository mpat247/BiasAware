import React from 'react';
import BoxProfessions from './BoxProfessions'; // Adjust the path if necessary to where your BoxProfessions.js file is located

const Professions = () => {
    return (
        <div>
            {/* <h1>Professions</h1> */}
            <BoxProfessions /> {/* This line calls the BoxProfessions component */}
            {/* <BoxProfessions /> */}
        </div>
    );
};

export default Professions;
