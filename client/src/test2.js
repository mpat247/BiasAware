import React from 'react';
import { HeatMapGrid } from 'react-heatmap-grid';

const test2 = () => {
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const yLabels = ['1', '2', '3', '4', '5'];
  const data = [
    [1, 2, 3, 4, 5],
    [2, 3, 4, 5, 6],
    [3, 4, 5, 6, 7],
    [4, 5, 6, 7, 8],
    [5, 6, 7, 8, 9],
  ];

  return (
    <div className="heatMapContainer">
      <HeatMapGrid
        xLabels={xLabels}
        yLabels={yLabels}
        data={data}
        cellStyle={(background, value, min, max, data, x, y) => ({
          background: `rgb(0, 151, 230, ${1 - (max - value) / (max - min)})`,
          fontSize: "11px",
        })}
        cellRender={value => value && `${value}`}
      />
    </div>
  );
};

export default test2;
