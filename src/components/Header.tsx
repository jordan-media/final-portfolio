// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { usePath } from '../contexts/PathContext';

function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { showPathModal } = usePath();

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Close mobile menu on escape key and handle body scroll
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };
    
    if (isMobileMenuOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  const handleChangeFocus = () => {
    setIsMobileMenuOpen(false);
    showPathModal();
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <header 
        className="fixed top-0 left-0 z-[1000] w-full bg-white/20 backdrop-blur-lg border-b border-white/20 text-gray-700 font-space-grotesk py-4 px-4 sm:px-8"
        style={{
          boxShadow: "0 8px 32px rgba(31, 38, 135, 0.37), inset 0 1px 0 rgba(255, 255, 255, 0.18)"
        }}
      >
        <div className="flex items-center justify-between w-full mx-auto max-w-7xl">
          {/* Logo */}
          <Link 
            to="/" 
            className="group text-xl sm:text-2xl lg:text-3xl font-bold no-underline text-gray-800 hover:text-gray-900 transition-all duration-300 whitespace-nowrap relative"
          >
            <span className="relative">
              Jordan Media Creations
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-green-500 transition-all duration-300 group-hover:w-full"></span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex flex-grow justify-center">
            <ul className="list-none flex items-center gap-x-8 p-0 m-0">
              <li>
                <Link 
                  to="/about" 
                  className={`group relative text-sm lg:text-base transition-all duration-300 whitespace-nowrap ${
                    isActive('/about') ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
                  }`}
                >
                  About
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                    isActive('/about') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
              <li className="text-gray-400">•</li>
              <li>
                <Link 
                  to="/projects" 
                  className={`group relative text-sm lg:text-base transition-all duration-300 whitespace-nowrap ${
                    isActive('/projects') ? 'text-cyan-600' : 'text-gray-700 hover:text-cyan-600'
                  }`}
                >
                  My Creative Works
                  <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-500 transition-all duration-300 ${
                    isActive('/projects') ? 'w-full' : 'w-0 group-hover:w-full'
                  }`}></span>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              className="group relative text-sm lg:text-base text-gray-600 hover:text-cyan-600 transition-all duration-300 whitespace-nowrap"
              onClick={showPathModal}
              type="button"
            >
              Change Focus
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-300 group-hover:w-full"></span>
            </button>
            <span className="text-gray-400">•</span>
            <Link 
              to="/contact" 
              className="group relative text-sm lg:text-base text-cyan-600 hover:text-cyan-700 transition-all duration-300 whitespace-nowrap font-medium"
            >
              Let's Connect
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-600 transition-all duration-300 group-hover:w-full"></span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden relative w-8 h-8 flex flex-col justify-center items-center space-y-1 z-[1001]"
            aria-label="Toggle menu"
            type="button"
          >
            <span className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? 'opacity-0' : ''
            }`}></span>
            <span className={`w-6 h-0.5 bg-gray-800 rounded-full transition-all duration-300 ${
              isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : ''
            }`}></span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[999] md:hidden"
          onClick={closeMobileMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[1000] md:hidden transform transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
      >
        <div 
          className="h-full bg-white/90 backdrop-blur-xl border-l border-white/20 shadow-2xl flex flex-col"
          style={{
            boxShadow: "-8px 0 32px rgba(31, 38, 135, 0.37), inset 1px 0 0 rgba(255, 255, 255, 0.18)"
          }}
        >
          {/* Mobile Menu Header */}
          <div className="flex-shrink-0 p-6 border-b border-gray-200/30">
            <div className="flex items-center justify-between">
              <h3 id="mobile-menu-title" className="text-lg font-bold text-gray-800">
                Navigation
              </h3>
              <button
                onClick={closeMobileMenu}
                className="p-2 rounded-full hover:bg-gray-100/50 transition-colors"
                aria-label="Close menu"
                type="button"
              >
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Mobile Menu Content */}
          <nav className="flex-grow p-6 overflow-y-auto">
            <ul className="space-y-6">
              <li>
                <Link 
                  to="/about" 
                  onClick={closeMobileMenu}
                  className={`block group relative text-lg font-medium transition-all duration-300 ${
                    isActive('/about') ? 'text-cyan-600' : 'text-gray-800 hover:text-cyan-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive('/about') ? 'bg-cyan-500' : 'bg-gray-300 group-hover:bg-cyan-500'
                    }`}></div>
                    <span>About</span>
                  </div>
                  <div className={`mt-1 ml-5 text-sm text-gray-500 transition-all duration-300 ${
                    isActive('/about') ? 'text-cyan-500' : 'group-hover:text-cyan-500'
                  }`}>
                    Learn more about me
                  </div>
                </Link>
              </li>

              <li>
                <Link 
                  to="/projects" 
                  onClick={closeMobileMenu}
                  className={`block group relative text-lg font-medium transition-all duration-300 ${
                    isActive('/projects') ? 'text-cyan-600' : 'text-gray-800 hover:text-cyan-600'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive('/projects') ? 'bg-cyan-500' : 'bg-gray-300 group-hover:bg-cyan-500'
                    }`}></div>
                    <span>My Creative Works</span>
                  </div>
                  <div className={`mt-1 ml-5 text-sm text-gray-500 transition-all duration-300 ${
                    isActive('/projects') ? 'text-cyan-500' : 'group-hover:text-cyan-500'
                  }`}>
                    View my portfolio
                  </div>
                </Link>
              </li>

              {/* Action Buttons Section */}
              <li className="pt-4 border-t border-gray-200/30 space-y-3">
                <button 
                  className="block w-full"
                  onClick={handleChangeFocus}
                  type="button"
                >
                  <div className="bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl p-4 text-center hover:from-cyan-50 hover:to-cyan-100 hover:text-cyan-700 transition-all duration-300 shadow-sm hover:shadow-md transform hover:scale-105">
                    <div className="text-lg font-semibold">Change Focus</div>
                    <div className="text-sm opacity-80 mt-1">Switch portfolio view</div>
                  </div>
                </button>
                
                <Link 
                  to="/contact" 
                  onClick={closeMobileMenu}
                  className="block w-full"
                >
                  <div className="bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-xl p-4 text-center hover:from-cyan-600 hover:to-cyan-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105">
                    <div className="text-lg font-semibold">Let's Connect</div>
                    <div className="text-sm opacity-90 mt-1">Get in touch with me</div>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>

          {/* Mobile Menu Footer */}
          <div className="flex-shrink-0 p-6 border-t border-gray-200/30">
            <div className="text-center">
              <p className="text-sm text-gray-500">Jordan Media Creations</p>
              <p className="text-xs text-gray-400 mt-1">Digital Generalist</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;