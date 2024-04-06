import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
import './Neighborhood.css'; // Import the CSS file for popup styling

// Define your Mapbox access token here
mapboxgl.accessToken = 'pk.eyJ1IjoiYXNhbmRodSIsImEiOiJjbHVqeWNvaTIwbDF6Mm1saDBsMmp6a3R0In0.di7X1RheofoatGeA1-goYA';

const MapComponent = () => {
  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/asandhu/cluk5zw9200j101p28igj8uf7', // Replace with your style URL
      center: [-79.3832, 43.6532], // Centered on Toronto
      zoom: 11 // Initial zoom level
    });

    

    map.on('load', () => {
      // Add click event listener to show popup
      map.on('click', (e) => {
        console.log('Click event detected:', e);
        const features = map.queryRenderedFeatures(e.point, {
          layers: ['b774cac52e37abc919a2ee574e7e52f0', 'c0633a5f1794591050bdf56f86e2fd30'] // Replace with layer IDs of your neighborhood datasets
        });

        console.log('Features:', features);

        if (features.length > 0) {
          const feature = features[0];
          // Create popup
          new mapboxgl.Popup({ className: 'popup' }) // Add 'popup' class for styling
            .setLngLat(e.lngLat)
            .setHTML(`<h3>${feature.properties.name}</h3>`)
            .addTo(map);
        }
      });
    });

    return () => map.remove(); // Clean up map on unmount
  }, []);

  return <div id="map" style={{ width: '100%', height: '500px' }} />;
};

export default MapComponent;
