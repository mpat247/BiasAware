import React, { useEffect } from 'react';
import NavigationBar from './NavigationBar';
import './Crimes.css';
import anychart from 'anychart'; // Import AnyChart

const Crimes = () => {
  useEffect(() => {
    // AnyChart initialization
    anychart.onDocumentReady(function() {
      // Clear AnyChart's default content
      anychart.graphics.dispose(); // Clear AnyChart's graphics container

      const data = [
        { x: "2010", y: "Arab States", heat: 0.676 },
        { x: "2010", y: "East Asia and the Pacific", heat: 0.691 },
        { x: "2010", y: "Europe and Central Asia", heat: 0.735 },
        { x: "2010", y: "Latin America and the Caribbean", heat: 0.731 },
        { x: "2010", y: "South Asia", heat: 0.585 },
        { x: "2010", y: "Sub-Saharan Africa", heat: 0.498 },
        { x: "2011", y: "Arab States", heat: 0.681 },
        { x: "2011", y: "East Asia and the Pacific", heat: 0.700 },
      ];

      const customColorScale = anychart.scales.linearColor();
      customColorScale.colors(["#ACE8D4", "#00726A"]);

      data.forEach((item, index) => {
        const containerId = `container${index + 1}`;
        const container = document.getElementById(containerId);
        if (container) {
          container.innerHTML = ''; // Clear container
          const chart = anychart.heatMap(item.heat);
          chart.colorScale(customColorScale);
          chart.container(containerId);
          chart.draw();
        }
      });
    });
  }, []);

  return (
    <div className="grid-container">
      {[...Array(8).keys()].map((index) => (
        <div key={index} id={`container${index + 1}`} className="heatmap-container"></div>
      ))}
    </div>
  );
};

export default Crimes;