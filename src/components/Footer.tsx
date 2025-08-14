// src/components/Footer.tsx
import React from 'react';
import { Instagram, Github, Linkedin, Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear: number = new Date().getFullYear();
  const emailAddress: string = "coastalifee@icloud.com";

  return (
    <footer className="w-full bg-gray-100 text-gray-700 border-t border-gray-200 py-8 font-space-grotesk text-base md:text-lg lg:text-xl leading-tight">
      <div className="flex flex-col items-end w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-right">

        <p className="mb-2 pr-4 sm:pr-8 truncate md:whitespace-normal">
          //just <code className="text-sm bg-transparent">console.log('reachOut(' + 'me')</code>;
          <span className="hidden sm:inline">&nbsp;→&nbsp;</span>
          <span className="sm:hidden block mt-1"></span>
          <a href={`mailto:${emailAddress}`} className="text-gray-700 hover:text-gray-900 transition-colors duration-300 no-underline">
            {emailAddress}
          </a>
        </p>

        <p className="mb-2 pr-4 sm:pr-8 transform translate-y-1 truncate md:whitespace-normal">
          Vancouver
          <span className="inline-flex flex-col text-xs leading-tight mx-2 transform -translate-y-2">
            <span className="text-gray-500">↑ 49.3627</span>
            <span className="text-gray-500">↓ -123.2721</span>
          </span>
          <span className="whitespace-nowrap">British Columbia 🏔️&nbsp;</span>
        </p>

        <p className="mb-4 pr-4 sm:pr-8 truncate md:whitespace-normal">
          <span className="inline-flex flex-col text-xs leading-tight mx-2 transform -translate-y-2">
            <span className="text-gray-500">Building</span>
            <span className="text-gray-500">Digital</span>
          </span>
          experiences one pixel at a time.
        </p>

        <div className="flex flex-wrap justify-center md:justify-end items-center pr-0 md:pr-8 ml-auto gap-4 w-full md:w-auto">
          <p className="text-gray-600 text-xs pt-2 text-center md:text-right flex-grow md:flex-grow-0">
            &copy; {currentYear} Jordan Media Creations. All rights reserved.
          </p>
          <span className="block w-full h-0 md:hidden"></span>

          <div className='flex flex-wrap gap-4'>
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/jordanmediacreations" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700/10 hover:border-gray-900 group" 
              aria-label="Instagram"
            >
              <Instagram className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
            </a>

            {/* GitHub */}
            <a 
              href="https://github.com/jordan-media" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700/10 hover:border-gray-900 group" 
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
            </a>

            {/* LinkedIn */}
            <a 
              href="https://linkedin.com/in/jor11" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700/10 hover:border-gray-900 group" 
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
            </a>

            {/* Email */}
            <a 
              href={`mailto:${emailAddress}`}
              className="w-10 h-10 border border-gray-700 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-gray-700/10 hover:border-gray-900 group" 
              aria-label="Email"
            >
              <Mail className="w-5 h-5 text-gray-700 group-hover:text-gray-900 transition-colors duration-300" />
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;