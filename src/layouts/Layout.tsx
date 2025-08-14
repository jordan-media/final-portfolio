// src/layouts/Layout.tsx
import React, { useState, useEffect } from 'react';
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import NavigationGrid from "../sections/NavigationGrid";
import Footer from "../components/Footer";
import TypewriterEffect from "../sections/TypewritterEffect";
import { usePath } from '../contexts/PathContext';

// Portfolio Modal Component - Global modal for path selection
interface PortfolioModalProps {
  isOpen: boolean;
  onSelectPath: (path: 'developer' | 'ux' | 'creative') => void;
  onClose: () => void;
}

const PortfolioModal: React.FC<PortfolioModalProps> = ({ isOpen, onSelectPath, onClose }) => {
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePathSelection = (path: 'developer' | 'ux' | 'creative') => {
    setSelectedPath(path);
    setTimeout(() => {
      onSelectPath(path);
      setSelectedPath(null);
    }, 150);
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />
      
      <div className="relative w-full max-w-2xl">
        <div 
          className="relative w-full rounded-2xl overflow-hidden backdrop-blur-md bg-white/10 p-8 md:p-12"
          style={{
            boxShadow: "inset -3px -3px 9.1px 1px rgba(255,255,255,0.22), inset 0px 2px 5.5px 0px rgba(255,255,255,0.08), inset 0px -2px 13.7px rgba(23,13,69,0.54)"
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            aria-label="Close modal"
            type="button"
          >
            <svg className="w-5 h-5 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          <div className="text-center space-y-8 px-4 md:px-6 lg:px-8">
            <div className="space-y-3 px-2 md:px-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-cyan-500 to-green-800 bg-clip-text text-transparent">
                  Digital Generalist
                </span>
              </h1>
              <p className="text-lg md:text-xl text-gray-700 font-medium">
                This portfolio adapts based on your interests.<br />
                What would you like to explore?
              </p>
            </div>

            {/* Path Selection Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
              
              {/* Developer Card */}
              <button
                onClick={() => handlePathSelection('developer')}
                className="group relative rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 bg-blue-500/20 min-h-[200px] p-4"
                type="button"
                style={{
                  backdropFilter: 'blur(8px)',
                  boxShadow: 'inset -2px -2px 6px 1px rgba(255,255,255,0.3), inset 0px 1px 3px 0px rgba(255,255,255,0.1), inset 0px -1px 8px rgba(59,130,246,0.4)'
                }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-shrink-0 pt-2 pb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-center text-center px-2 pb-2">
                    <h3 className="text-lg font-mono font-bold text-gray-900 tracking-wide mb-3">Developer</h3>
                    <p className="text-sm text-gray-600 font-mono tracking-wide leading-tight">Technical Solutions &<br />Code Architecture</p>
                  </div>
                </div>
              </button>

              {/* UX Designer Card */}
              <button
                onClick={() => handlePathSelection('ux')}
                className="group relative rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:ring-offset-2 bg-purple-500/20 min-h-[200px] p-4"
                type="button"
                style={{
                  backdropFilter: 'blur(8px)',
                  boxShadow: 'inset -2px -2px 6px 1px rgba(255,255,255,0.3), inset 0px 1px 3px 0px rgba(255,255,255,0.1), inset 0px -1px 8px rgba(147,51,234,0.4)'
                }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-shrink-0 pt-2 pb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-center text-center px-2 pb-2">
                    <h3 className="text-lg font-sans font-semibold text-gray-900 mb-3">UX Designer</h3>
                    <p className="text-sm text-gray-600 font-sans leading-tight">
                      User Research, <br />Prototyping &<br />Design Process
                    </p>
                  </div>
                </div>
              </button>

              {/* Creative Card */}
              <button
                onClick={() => handlePathSelection('creative')}
                className="group relative rounded-xl transition-all duration-200 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 bg-green-500/20 min-h-[200px] p-4"
                type="button"
                style={{
                  backdropFilter: 'blur(8px)',
                  boxShadow: 'inset -2px -2px 6px 1px rgba(255,255,255,0.3), inset 0px 1px 3px 0px rgba(255,255,255,0.1), inset 0px -1px 8px rgba(34,197,94,0.4)'
                }}
              >
                <div className="h-full flex flex-col justify-between">
                  <div className="flex-shrink-0 pt-2 pb-4 flex justify-center">
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-center text-center px-2 pb-2">
                    <h3 className="text-lg font-serif font-semibold text-gray-900 italic mb-3">Creative</h3>
                    <p className="text-sm text-gray-600 font-serif italic leading-tight">Visual Storytelling &<br />Creative Campaigns</p>
                  </div>
                </div>
              </button>
            </div>

            <p className="text-xs text-gray-500 mt-6">
              You can always explore other areas later
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Layout component with your existing structure
export default function Layout() {
  const { showModal, handlePathSelection, hideModal } = usePath();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      {/* Global Portfolio Modal - accessible from any page */}
      <PortfolioModal 
        isOpen={showModal} 
        onSelectPath={handlePathSelection}
        onClose={hideModal}
      />

      {/* Your existing header structure */}
      <header className="sticky top-0 z-50 bg-white shadow-md p-4 flex justify-between items-center">
        <Header />
      </header>

      {/* Your existing main content structure */}
      <main className="flex-grow container mx-auto p-4 md:p-6 lg:p-8 bg-white shadow-sm my-4 rounded-lg">
        <Outlet />
      </main>

      {/* Your existing NavigationGrid and Footer */}
      <NavigationGrid />
      <Footer />
    </div>
  );
}