// src/sections/GradientCluster.tsx
import React from 'react';
import GradientCircle from './GradientCircle';

const GradientCluster: React.FC = () => {
  return (
    <div className="relative w-full h-[500px] sm:h-[600px] md:h-[300px]">
      {/* Circle 1 */}
      <GradientCircle
        size={220}
        className="absolute top-[10%] left-[20%] z-10"
      />
      {/* Circle 2 */}
      <GradientCircle
        size={180}
        className="absolute top-[25%] left-[67%] z-20"
      />
      {/* Circle 3 */}
      <GradientCircle
        size={200}
        className="absolute top-[40%] left-[15%] z-30"
      />
      {/* Circle 4 */}
      <GradientCircle
        size={150}
        className="absolute top-[41%] left-[59%] z-45"
      />
      {/* Circle 5 */}
      <GradientCircle
        size={170}
        className="absolute top-[50%] left-[40%] z-45"
      />
            {/* Circle 6 */}
      <GradientCircle
        size={65}
        className="absolute top-[60%] left-[20%] z-45"
      />
            {/* Circle 7 */}
      <GradientCircle
        size={80}
        className="absolute top-[70%] left-[25%] z-15"
      />
            {/* Circle 8 */}
      <GradientCircle
        size={120}
        className="absolute top-60%] left-[10%] z-15"
      />
    </div>
  );
};

export default GradientCluster;
