// src/components/NavigationGrid.tsx
import React from 'react';

const NavigationGrid: React.FC = () => {
  return (
    <section className="w-full bg-gray-100 text-gray-700 border-y border-gray-200 font-space-grotesk py-8 text-base md:text-lg">
      <div className="grid grid-cols-1 md:grid-cols-[minmax(240px,2fr)_repeat(auto-fit,minmax(160px,1fr))] gap-6 md:gap-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">Menu</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1">
              <a href="/about" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="/projects" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                My Creative Works
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="/blog" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Blog
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a 
                href="mailto:coastalifee@icloud.com" 
                className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group"
              >
                Let's connect
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="/privacy" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Privacy
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="/volunteer" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Volunteer
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">Newsletter ↓</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1">
              <a href="#" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Sign Up
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">Socials</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1">
              <a href="https://www.instagram.com/jordanmediacreations" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Instagram
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="https://github.com/jordan-media" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                GitHub
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="https://linkedin.com/in/jor11" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                LinkedIn
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col px-4 sm:px-8 items-center text-center md:items-start md:text-left">
          <h3 className="text-lg md:text-xl font-bold mb-2 pb-1 border-b border-gray-700 w-full">Peers</h3>
          <ul className="list-none p-0 m-0">
            <li className="mb-1">
              <a href="https://candyfukaya.ca/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Candy Fukaya
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="https://jisun-ju.ca/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Jisun Ju
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
            <li className="mb-1">
              <a href="https://danieltrinh.ca/" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-cyan-600 transition-all duration-300 no-underline relative group">
                Daniel Trinh
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default NavigationGrid;