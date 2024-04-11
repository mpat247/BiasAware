import React from 'react';
import Loader from './GearLoader'

const ComingSoon = () => {
  // Ensure the body has no extra margin or padding that could disrupt the layout
  document.body.style.margin = '0';
  document.body.style.padding = '0';

  return (
    // The outer div covers the entire screen
    <div className="flex justify-center w-full h-full" style={{ position: 'fixed', inset: 0, backgroundColor: '#0B0533', alignItems :'center' }}>

      <div className="flex items-center justify-center h-full">

        <div className="text-center" style={{ fontFamily: 'Crimson Text', fontSize: '7vw', color: '#DD9313', fontWeight: "bolder", justifyContent: "center",  }}>
          COMING SOON
        </div>
      </div>
      <Loader/>
    </div>
  );
};

export default ComingSoon;

<script src="https://cdn.tailwindcss.com"></script>