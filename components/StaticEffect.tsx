import React from 'react';

// Using a small base64 noise pattern for the background
const NOISE_BASE64 = `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyBAMAAADsEZWCAAAAGFBMVEUAAAA5OTkAAABMTExERERmZmYzMzOZmZlm7619AAAACHRSTlMAMwA3M2YzM3OqO48AAAAJcEhZcwAAOxMAADsTRqt1wQAAAF5JREFUOI1jYCAJcDEwMKyYwMDIwLhiA4M2kF3TwKAtpKCg0ACylYAsZSVlcwawq5iB7GKgYCOQXcDAsIGBZQMDg2YDA8sBBoa9DAwMCxgYGC8wMDBeYGBg3MDAwLgBAJ61F1g+36W9AAAAAElFTkSuQmCC")`;

interface StaticEffectProps {
  opacity?: number;
}

const StaticEffect: React.FC<StaticEffectProps> = ({ opacity = 0.15 }) => {
  return (
    <div 
      className="static-noise pointer-events-none absolute inset-0 w-full h-full z-20"
      style={{ 
        backgroundImage: NOISE_BASE64,
        opacity: opacity 
      }}
    />
  );
};

export default StaticEffect;