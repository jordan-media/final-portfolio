// src/sections/GradientCluster.tsx
import React from 'react';
import GradientCircle from './GradientCircle';

const GradientCluster: React.FC = () => {
  return (
    <div className="absolute inset-0 w-full h-full">
      {/* Circles */}
      <GradientCircle size={220} className="absolute top-[10%] left-[20%] z-10" />
      <GradientCircle size={180} className="absolute top-[25%] left-[67%] z-20" />
      <GradientCircle size={200} className="absolute top-[40%] left-[15%] z-30" />
      <GradientCircle size={150} className="absolute top-[41%] left-[59%] z-45" />
      <GradientCircle size={170} className="absolute top-[50%] left-[40%] z-45" />
      <GradientCircle size={65} className="absolute top-[60%] left-[20%] z-45" />
      <GradientCircle size={80} className="absolute top-[70%] left-[25%] z-15" />
      <GradientCircle size={120} className="absolute top-[60%] left-[10%] z-15" />
    </div>
  );
};


export default GradientCluster;
