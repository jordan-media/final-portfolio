// src/components/Header.tsx
import React from 'react';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="fixed top-0 left-0 z-[1000] w-full bg-white/30 backdrop-blur-sm text-gray-700 border-b border-gray-200 font-space-grotesk py-4 px-4 sm:px-8 shadow-sm">
      <div className="flex flex-col items-start md:flex-row md:items-center md:justify-between w-full gap-2 md:gap-8 mx-auto max-w-7xl">
        <Link to="/" className="text-xl sm:text-2xl lg:text-3xl font-bold no-underline text-gray-800 hover:text-gray-900 transition-colors duration-200 whitespace-nowrap">
          Jordan Media Creations
        </Link>

        <nav className="flex-grow">
          <ul className="list-none flex flex-wrap justify-start gap-x-4 gap-y-1 p-0 m-0">
            <li>
              <Link to="/about" className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300 whitespace-nowrap">About</Link>
            </li>
            <li className="text-gray-500 hidden sm:block">:</li>
            <li>
              <Link to="/projects" className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300 whitespace-nowrap">My Creative Works</Link>
            </li>
            <li className="text-gray-500 hidden sm:block">:</li>
            <li>
              <Link to="/blog" className="text-sm sm:text-base text-gray-700 hover:text-gray-900 transition-colors duration-300 whitespace-nowrap">Blog</Link>
            </li>
          </ul>
        </nav>

        <nav>
          <ul className="list-none flex flex-wrap justify-start md:justify-end gap-x-4 gap-y-1 p-0 m-0">
            <li>
              <Link to="/contact" className="text-sm sm:text-base text-blue-600 hover:text-blue-800 transition-colors duration-300 whitespace-nowrap font-medium">Let's Connect</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
