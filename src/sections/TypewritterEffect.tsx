// src/components/TypewriterEffect.tsx
import React from 'react';
import { Typewriter } from 'react-simple-typewriter';

const TypewriterEffect: React.FC = () => {
  return (
    <div className="absolute rotate-[-90deg] origin-bottom-left text-5xl md:text-4xl font-bold text-center text-gray-900 p-6 z-50">
      I am a{' '}
      <span className="bg-gradient-to-r from-cyan-300 from-25% to-cyan-500 bg-clip-text text-transparent">
        <Typewriter
          words={['developer.', 'storyteller.', 'creator.', 'father.']}
          loop={true}
          cursor
          cursorStyle="|"
          typeSpeed={80}
          deleteSpeed={40}
          delaySpeed={1300}
        />
      </span>
    </div>
  );
};

export default TypewriterEffect;
