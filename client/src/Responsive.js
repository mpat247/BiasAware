import React, { useState, useEffect } from 'react';
import NavigationBar2 from './NavigationBar2'; // Import the NavigationBar2 component
import './GearComponent.css';
import Activities from './Activities';
const Responsive = () => {
    return (
        <div class = "main-body">
          <div class="gear-container">
              <ul class="center-circle">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring">
             <a href="#activities" className="acc-prompt2">
            <h2>A Skater</h2>
            </a>
             </div>
          </div>
          <div class="gear-container2">
              <ul class="center-circle2">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring2">
             
             </div>
          </div>
          <div class="gear-container3">
              <ul class="center-circle3">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring3">
             
             </div>
          </div>
          <div class="gear-container4">
              <ul class="center-circle4">
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
                <li class="tooth"></li>
              </ul>
             <div class="ring4"></div>
          </div>
          {/* Activities section */}
       
        </div>
        
      );
};

export default Responsive;
