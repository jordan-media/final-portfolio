// src/components/NavigationGrid.tsx
import React from 'react';

function NavigationGrid() {
  return (
    <section className="w-full bg-gray-100 text-gray-700 border-y border-gray-200 font-space-grotesk py-8 text-base md:text-lg">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(240px,2fr)_repeat(auto-fit,minmax(160px,1fr))] gap-6 md:gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">Menu</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="/about" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">About</a></li>
            <li className="mb-1"><a href="/work" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Work</a></li>
            <li className="mb-1"><a href="/blog" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Blog</a></li>
            <li className="mb-1"><a href="/contact" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Let's connect</a></li>
            <li className="mb-1"><a href="/privacy" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Privacy</a></li>
            <li className="mb-1"><a href="/japanese" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Japanese</a></li>
          </ul>
        </div>

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">Newsletter ↓</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Sign Up</a></li>
          </ul>
        </div>

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">Socials</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="https://www.instagram.com/jordanmediacreations" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Instagram</a></li>
            <li className="mb-1"><a href="https://github.com/jordan-media" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">GitHub</a></li>
            <li className="mb-1"><a href="https://linkedin.com/in/jor11" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">LinkedIn</a></li>
          </ul>
        </div>

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">External</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1"><a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Favorite Look Off Points</a></li>
            <li className="mb-1"><a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Placeholder Link 1</a></li>
            <li className="mb-1"><a href="#" className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">Placeholder Link 2</a></li>
          </ul>
        </div>

      </div>
    </section>
  );
}

export default NavigationGrid;
