"use client";
import React, { useEffect } from 'react';
import VANTA from 'vanta';


const VantaBackground = () => {
  useEffect(() => {
    const vantaEffect = VANTA.HALO({
      el: "#vanta-bg",
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 200.00,
      minWidth: 200.00
    });

    return () => {
      if (vantaEffect) {
        vantaEffect.destroy();
      }
    };
  }, []);

  return (
    <div id="vanta-bg" style={{ height: '100vh', width: '100%', position: 'absolute', top: 0, left: 0 }}>
      {/* Any content you want to overlay on top of the Vanta background */}
    </div>
  );
};

export default VantaBackground;
