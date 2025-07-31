// src/components/Extras.tsx
import React from 'react';

// No CSS import needed now

function Extras() { // Type the functional component
  const artifacts: string[] = [ // Type the array
    'Pokedex',
    'CSS Animation',
    'AI Mockup Tutorial',
    'Garden Planner Prototype',
    'Parallax Effects'
  ];

  const timeline: string[] = [ // Type the array
    '2025', '2024', '2023', '2022', '2021',
    '2020', '2019', '2018', '2017', '2016'
  ];

  const totalExtras: number = artifacts.length + timeline.length; // Type the variable

  return (
    // Replaced .vault-wrapper classes with Tailwind utilities
    // 'w-full bg-white flex flex-col font-space-grotesk'
    <section className="w-full bg-white flex flex-col font-space-grotesk">
      {/* Replaced .vault-header classes with Tailwind utilities */}
      {/* 'flex items-baseline gap-4 text-4xl font-normal text-gray-900 justify-between pl-4' */}
      {/* Text sizing adjusted for responsive `clamp` equivalent. `pl-4` for `1em` padding. */}
      <div className="flex items-baseline gap-4 text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 justify-between pl-4 pr-4 py-4 md:pl-8 md:pr-8 md:py-6">
        {/* Replaced .vault-title with Tailwind */}
        <h2 className="m-0">Vault</h2>
        {/* Replaced .vault-count with Tailwind */}
        {/* 'text-xl sm:text-2xl md:text-3xl text-gray-600 italic' */}
        <span className="text-xl sm:text-2xl md:text-3xl text-gray-600 italic">({totalExtras} items)</span>
      </div>

      {/* Artifacts Section */}
      {/* Replaced .vault-row classes with Tailwind utilities */}
      {/* 'grid grid-cols-5 md:grid-cols-3 xl:grid-cols-2 gap-8 items-start border-t border-gray-300 pt-8 text-left pb-4' */}
      {/* Adjusted grid-cols for better responsiveness and approximation of 3fr 2fr */}
      {/* `pl-8` for `padding-left: 1em;` on larger screens. */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 items-start border-t border-gray-300 pt-8 text-left pb-4 px-4 md:px-8">
        {/* Replaced .vault-label with Tailwind */}
        {/* 'text-lg font-medium text-gray-800' */}
        <div className="text-lg font-medium text-gray-800 pl-4 md:pl-0">Artifacts</div>
        {/* Replaced .vault-list with Tailwind */}
        {/* 'flex flex-col w-full' */}
        <div className="flex flex-col w-full">
          {artifacts.map((item, i) => (
            // Replaced .vault-item with Tailwind
            // 'flex flex-col'
            <div className="flex flex-col" key={`artifact-${i}`}>
              {/* Replaced .vault-item a with Tailwind */}
              {/* 'no-underline text-gray-800 text-base hover:text-gray-600 transition-colors' */}
              <a href="#" className="no-underline text-gray-800 text-base hover:text-gray-600 transition-colors">
                {item}
              </a>
              {/* Replaced .vault-divider with Tailwind */}
              {/* 'h-px bg-gray-300 w-full my-2' */}
              <div className="h-px bg-gray-300 w-full my-2" />
            </div>
          ))}
        </div>
      </div>

      {/* Timeline Section */}
      {/* Reused vault-row styling for consistency */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 items-start border-t border-gray-300 pt-8 text-left pb-4 px-4 md:px-8">
        {/* Reused vault-label styling */}
        <div className="text-lg font-medium text-gray-800 pl-4 md:pl-0">Timeline</div>
        {/* Reused vault-list styling */}
        <div className="flex flex-col w-full">
          {timeline.map((year, i) => (
            // Reused vault-item styling
            <div className="flex flex-col" key={`year-${i}`}>
              {/* Reused vault-item a styling */}
              <a href="#" className="no-underline text-gray-800 text-base hover:text-gray-600 transition-colors">
                {year}
              </a>
              {/* Reused vault-divider styling */}
              <div className="h-px bg-gray-300 w-full my-2" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Extras;