// ==============================
// src/components/Extras.tsx
// Path-adaptive artifacts that change based on user's portfolio focus
// ==============================
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { PortfolioPath } from '../utils/pathConfig';

type BlogPostLite = { id: string; title: string };

type ArtifactPathContent = {
  title: string;
  description: string;
  image: string;
  fullContent: string;
  technologies: string[];
  demoUrl?: string;
  githubUrl?: string;
};

type Artifact = {
  id: string;
  developer: ArtifactPathContent;
  ux: ArtifactPathContent;
  creative: ArtifactPathContent;
};

type ArtifactsData = {
  artifacts: Artifact[];
};

interface ExtrasProps {
  selectedPath?: PortfolioPath;
}

const Extras: React.FC<ExtrasProps> = ({ selectedPath = null }) => {
  const [artifactsData, setArtifactsData] = useState<Artifact[]>([]);
  const [posts, setPosts] = useState<BlogPostLite[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedArtifact, setSelectedArtifact] = useState<ArtifactPathContent | null>(null);
  const [currentArtifactIndex, setCurrentArtifactIndex] = useState<number>(0);
  const [artifactsLoading, setArtifactsLoading] = useState<boolean>(true);

  // Fetch artifacts data
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setArtifactsLoading(true);
        const res = await fetch('/artifacts.json', { cache: 'no-store', signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: ArtifactsData = await res.json();
        setArtifactsData(data.artifacts);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          console.error('Failed to load artifacts:', e);
          setError('Failed to load artifacts.');
        }
      } finally {
        setArtifactsLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  // Fetch blog posts
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        const res = await fetch('/blogPosts.json', { cache: 'no-store', signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = (await res.json()) as BlogPostLite[];
        setPosts(data);
      } catch (e: any) {
        if (e?.name !== 'AbortError') setError('Failed to load blog.');
      }
    })();
    return () => ctrl.abort();
  }, []);

  // Get current artifacts based on selected path
  const getCurrentArtifacts = (): ArtifactPathContent[] => {
    if (!selectedPath || artifactsData.length === 0) {
      return artifactsData.map(artifact => artifact.developer);
    }
    return artifactsData.map(artifact => artifact[selectedPath]);
  };

  const currentArtifacts = getCurrentArtifacts();

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (selectedArtifact) {
        closeModal();
      }
    };

    if (selectedArtifact) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedArtifact]);

  const openModal = (artifact: ArtifactPathContent) => {
    const index = currentArtifacts.findIndex(a => a.title === artifact.title);
    setCurrentArtifactIndex(index);
    setSelectedArtifact(artifact);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedArtifact(null);
    document.body.style.overflow = 'unset';
  };

  const navigateToNext = () => {
    const nextIndex = (currentArtifactIndex + 1) % currentArtifacts.length;
    setCurrentArtifactIndex(nextIndex);
    setSelectedArtifact(currentArtifacts[nextIndex]);
  };

  const navigateToPrevious = () => {
    const prevIndex = currentArtifactIndex === 0 ? currentArtifacts.length - 1 : currentArtifactIndex - 1;
    setCurrentArtifactIndex(prevIndex);
    setSelectedArtifact(currentArtifacts[prevIndex]);
  };

  // Get path-specific section titles
  const getSectionTitle = (): string => {
    switch (selectedPath) {
      case 'developer':
        return 'Technical Projects';
      case 'ux':
        return 'UX Case Studies';
      case 'creative':
        return 'Creative Works';
      default:
        return 'Artifacts';
    }
  };

  const totalExtras = currentArtifacts.length + posts.length;

  if (artifactsLoading) {
    return (
      <section className="w-full bg-white flex flex-col font-space-grotesk">
        <div className="flex items-center justify-center py-12">
          <div className="text-lg text-gray-600">Loading content...</div>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="w-full bg-white flex flex-col font-space-grotesk">
        <div className="flex items-baseline gap-4 text-4xl sm:text-5xl lg:text-6xl font-normal text-gray-900 justify-between pl-4 pr-4 py-4 md:pl-8 md:pr-8 md:py-6">
          <h2 className="m-0">Vault</h2>
          <span className="text-xl sm:text-2xl md:text-3xl text-gray-600 italic">({totalExtras} items)</span>
        </div>

        {/* Artifacts - Path-adaptive content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 items-start border-t border-gray-300 pt-8 text-left pb-4 px-4 md:px-8">
          <div className="text-lg font-medium text-gray-800 pl-4 md:pl-0">
            {getSectionTitle()}
            {selectedPath && (
              <div className="text-xs text-gray-500 mt-1 font-normal">
                {selectedPath === 'developer' && 'Code & Implementation'}
                {selectedPath === 'ux' && 'Research & Design Process'}
                {selectedPath === 'creative' && 'Visual & Brand Storytelling'}
              </div>
            )}
          </div>
          <div className="flex flex-col w-full">
            {currentArtifacts.length === 0 ? (
              <div className="text-sm text-gray-500 mb-2">No projects available yet.</div>
            ) : (
              currentArtifacts.map((artifact, i) => (
                <div className="flex flex-col group" key={`${selectedPath}-artifact-${i}`}>
                  <button 
                    onClick={() => openModal(artifact)}
                    className="text-left no-underline text-gray-800 text-base hover:text-cyan-600 transition-all duration-300 relative bg-transparent border-none cursor-pointer p-0"
                  >
                    {artifact.title}
                  </button>
                  <div className="h-px bg-gray-300 w-full my-2 transition-all duration-300 group-hover:bg-cyan-500" />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Blog */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-8 items-start border-t border-gray-300 pt-8 text-left pb-4 px-4 md:px-8">
          <div className="text-lg font-medium text-gray-800 pl-4 md:pl-0">
            <Link 
              to="/blog" 
              className="text-gray-800 hover:text-cyan-600 transition-all duration-300 relative group"
            >
              Blog
              <span className="absolute bottom-0 left-0 w-full h-0.5 bg-gray-300 transition-all duration-300 group-hover:bg-cyan-500"></span>
            </Link>
          </div>
          <div className="flex flex-col w-full">
            {error && <div className="text-sm text-red-600 mb-2">{error}</div>}
            {!error && posts.length === 0 && <div className="text-sm text-gray-500 mb-2">No posts yet.</div>}
            {posts.map((post) => (
              <div className="flex flex-col group" key={post.id}>
                <Link
                  to="/blog"
                  state={{ post: post.id }}
                  className="no-underline text-gray-800 text-base hover:text-cyan-600 transition-all duration-300"
                >
                  {post.title}
                </Link>
                <div className="h-px bg-gray-300 w-full my-2 transition-all duration-300 group-hover:bg-cyan-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Artifact Modal */}
      <AnimatePresence>
        {selectedArtifact && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={closeModal}
          >
            <motion.div
              className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative font-space-grotesk"
              initial={{ y: "100vh", opacity: 0 }}
              animate={{ y: "0", opacity: 1 }}
              exit={{ y: "100vh", opacity: 0 }}
              transition={{ type: "spring", stiffness: 100, damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Navigation Controls */}
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button
                    onClick={navigateToPrevious}
                    className="text-gray-600 hover:text-cyan-600 transition-colors"
                    aria-label="Previous project"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-500">
                    {currentArtifactIndex + 1} of {currentArtifacts.length}
                  </span>
                  <button
                    onClick={navigateToNext}
                    className="text-gray-600 hover:text-cyan-600 transition-colors"
                    aria-label="Next project"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Path indicator */}
                {selectedPath && (
                  <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                    <span className="capitalize">{selectedPath}</span>
                    <span>•</span>
                    <span>{getSectionTitle()}</span>
                  </div>
                )}
                
                <button
                  onClick={closeModal}
                  className="text-gray-600 hover:text-gray-900 text-2xl font-bold"
                  aria-label="Close"
                >
                  &times;
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedArtifact.title}</h2>
                <p className="text-lg text-gray-600 mb-4">{selectedArtifact.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedArtifact.technologies.map((tech) => (
                    <span
                      key={tech}
                      className={`px-3 py-1 rounded-full text-sm font-medium ${
                        selectedPath === 'developer' ? 'bg-blue-100 text-blue-800' :
                        selectedPath === 'ux' ? 'bg-purple-100 text-purple-800' :
                        selectedPath === 'creative' ? 'bg-green-100 text-green-800' :
                        'bg-cyan-100 text-cyan-800'
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Image */}
                <img
                  src={selectedArtifact.image}
                  alt={selectedArtifact.title}
                  className="w-full h-64 object-cover rounded-md mb-6"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/800x450/CCCCCC/333333?text=Image+Not+Found";
                  }}
                />

                {/* Content */}
                <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap mb-6">
                  {selectedArtifact.fullContent}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-4 pt-4 border-t border-gray-200">
                  {selectedArtifact.demoUrl && (
                    <a
                      href={selectedArtifact.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`px-6 py-2 text-white rounded-lg transition-colors font-medium ${
                        selectedPath === 'developer' ? 'bg-blue-600 hover:bg-blue-700' :
                        selectedPath === 'ux' ? 'bg-purple-600 hover:bg-purple-700' :
                        selectedPath === 'creative' ? 'bg-green-600 hover:bg-green-700' :
                        'bg-cyan-600 hover:bg-cyan-700'
                      }`}
                    >
                      {selectedPath === 'developer' ? 'View Demo' :
                       selectedPath === 'ux' ? 'View Prototype' :
                       selectedPath === 'creative' ? 'View Project' :
                       'View Demo'}
                    </a>
                  )}
                  {selectedArtifact.githubUrl && (
                    <a
                      href={selectedArtifact.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                    >
                      View Code
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Extras;