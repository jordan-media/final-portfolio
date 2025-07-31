// src/components/Footer.tsx
import React from 'react';

function Footer() {
  const currentYear = new Date().getFullYear();
  const emailAddress = "coastalifee@icloud.com";

  return (
    // Replaced .footer-container classes with Tailwind utilities
    // 'w-full' for width
    // 'bg-gray-100' for background (approx. --primary-color)
    // 'text-gray-700' for text color (approx. #36454f, consider adding custom color if precise)
    // 'border-t border-gray-200' for top border (approx. --secondary-color)
    // 'py-8' for padding (approx. 4vh, adjust as needed)
    // 'font-space-grotesk' (requires config)
    // 'text-base md:text-lg lg:text-xl' for responsive font size (approximating clamp)
    // 'leading-tight' for line height
    <footer className="w-full bg-gray-100 text-gray-700 border-t border-gray-200 py-8 font-space-grotesk text-base md:text-lg lg:text-xl leading-tight">
      {/* Replaced .footer-content classes with Tailwind utilities */}
      {/* 'flex flex-col items-end w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8' */}
      {/* 'text-right' is the default for all content within this container */}
      <div className="flex flex-col items-end w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">

        {/* Replaced .footer-joke classes with Tailwind utilities */}
        {/* 'mb-2' for margin-bottom */}
        {/* 'pr-4 sm:pr-8' for responsive padding-right (approx 2em) */}
        {/* 'truncate' by default on larger screens, 'md:whitespace-normal' for smaller */}
        <p className="mb-2 pr-4 sm:pr-8 truncate md:whitespace-normal">
          //just <code className="text-sm bg-transparent">console.log('reachOut(' + 'me')</code>;
          {/* 'hidden md:inline' for responsiveness of the break */}
          <span className="hidden sm:inline">&nbsp;→&nbsp;</span>
          <span className="sm:hidden block mt-1"></span> {/* Break for very small screens */}
          <a href={`mailto:${emailAddress}`} className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">
            {emailAddress}
          </a>
        </p>

        {/* Replaced .footer-location-combined classes with Tailwind utilities */}
        {/* 'mb-2' for margin-bottom */}
        {/* 'pr-4 sm:pr-8' for responsive padding-right */}
        {/* 'transform translate-y-1' for vertical adjustment */}
        <p className="mb-2 pr-4 sm:pr-8 transform translate-y-1 truncate md:whitespace-normal">
          Vancouver
          {/* Stacked coordinates container */}
          {/* 'inline-flex flex-col text-xs leading-tight mx-2 transform -translate-y-2' */}
          <span className="inline-flex flex-col text-xs leading-tight mx-2 transform -translate-y-2">
            <span className="text-gray-500">↑ 49.3627</span>
            <span className="text-gray-500">↓ -123.2721</span>
          </span>
          {/* 'whitespace-nowrap' to keep "British Columbia" on one line */}
          <span className="whitespace-nowrap">British Columbia 🏔️&nbsp;</span>
        </p>

        {/* Replaced .footer-mission-statement classes with Tailwind utilities */}
        {/* 'mb-4' for margin-bottom */}
        {/* 'pr-4 sm:pr-8' for responsive padding-right */}
        <p className="mb-4 pr-4 sm:pr-8 truncate md:whitespace-normal">
          {/* Stacked coords container for "Building Digital" */}
          <span className="inline-flex flex-col text-xs leading-tight mx-2 transform -translate-y-2">
            <span className="text-gray-500">Building</span>
            <span className="text-gray-500">Digital</span>
          </span>
          experiences one pixel at a time.
        </p>

        {/* Replaced .footer-icons classes with Tailwind utilities */}
        {/* 'flex flex-wrap justify-end items-center pr-4 sm:pr-8 ml-auto gap-4' */}
        {/* On smaller screens, justify-center: 'md:justify-end' */}
        <div className="flex flex-wrap justify-center md:justify-end items-center pr-0 md:pr-8 ml-auto gap-4 w-full md:w-auto">
          {/* Replaced .footer-copyright classes with Tailwind utilities */}
          {/* 'text-gray-600 text-xs pt-2' for styling */}
          {/* 'text-center md:text-right' for responsive alignment */}
          <p className="text-gray-600 text-xs pt-2 text-center md:text-right flex-grow md:flex-grow-0">
            &copy; {currentYear} Jordan Media Creations. All rights reserved.
          </p>
          {/* Hidden break for responsiveness */}
          <span className="block w-full h-0 md:hidden"></span>

          {/* Replaced .footer-icon-container classes with Tailwind utilities */}
          {/* 'flex flex-wrap gap-4' */}
          <div className='flex flex-wrap gap-4'>
            {/* Social Icons - placeholder for now, ideally you'd use actual SVG icons */}
            {/* Replaced .footer-icon-space classes with Tailwind utilities */}
            {/* 'w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center
                transition-colors duration-300 hover:bg-gray-700/10' */}
            <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-gray-700/10" aria-label="Social 1">
              {/* Placeholder for SVG icon */}
              <svg className="w-7 h-7 fill-gray-700" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-gray-700/10" aria-label="Social 2">
              <svg className="w-7 h-7 fill-gray-700" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-gray-700/10" aria-label="Social 3">
              <svg className="w-7 h-7 fill-gray-700" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </a>
            <a href="#" className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-colors duration-300 hover:bg-gray-700/10" aria-label="Social 4">
              <svg className="w-7 h-7 fill-gray-700" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/></svg>
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}

export default Footer;