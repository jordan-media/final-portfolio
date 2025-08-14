// ==============================
// src/pages/Volunteer.tsx
// Simple volunteer experience showcase
// ==============================
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type VolunteerExperience = {
  id: string;
  organization: string;
  timeframe: string;
  title: string;
  role: string;
  description: string;
  image: string;
  fullContent: string;
  skills: string[];
  achievements: string[];
};

type VolunteerData = {
  volunteer_experiences: VolunteerExperience[];
};

const Volunteer: React.FC = () => {
  const [volunteerData, setVolunteerData] = useState<VolunteerExperience[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<VolunteerExperience | null>(null);
  const [currentExperienceIndex, setCurrentExperienceIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch volunteer data
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        const res = await fetch('/volunteer.json', { cache: 'no-store', signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: VolunteerData = await res.json();
        setVolunteerData(data.volunteer_experiences);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          console.error('Failed to load volunteer experiences:', e);
          setError('Failed to load volunteer experiences.');
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  // Handle browser back button
  useEffect(() => {
    const handlePopState = () => {
      if (selectedExperience) {
        closeModal();
      }
    };

    if (selectedExperience) {
      window.history.pushState(null, '', window.location.href);
      window.addEventListener('popstate', handlePopState);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [selectedExperience]);

  const openModal = (experience: VolunteerExperience) => {
    const index = volunteerData.findIndex(exp => exp.id === experience.id);
    setCurrentExperienceIndex(index);
    setSelectedExperience(experience);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedExperience(null);
    document.body.style.overflow = 'unset';
  };

  const navigateToNext = () => {
    const nextIndex = (currentExperienceIndex + 1) % volunteerData.length;
    setCurrentExperienceIndex(nextIndex);
    setSelectedExperience(volunteerData[nextIndex]);
  };

  const navigateToPrevious = () => {
    const prevIndex = currentExperienceIndex === 0 ? volunteerData.length - 1 : currentExperienceIndex - 1;
    setCurrentExperienceIndex(prevIndex);
    setSelectedExperience(volunteerData[prevIndex]);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white font-space-grotesk">
        <div className="flex items-center justify-center py-16">
          <div className="text-xl text-gray-600">Loading volunteer experiences...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white font-space-grotesk">
        <div className="flex items-center justify-center py-16">
          <div className="text-xl text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-white font-space-grotesk">
        {/* Header Section */}
        <div className="bg-gradient-to-r from-gray-50 to-gray-100 border-b border-gray-200">
          <div className="max-w-6xl mx-auto px-4 py-16">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Volunteer Experience
            </h1>
            <p className="text-lg text-gray-600 mb-6 max-w-3xl">
              Community involvement through youth sports coaching, program development, and digital media management, 
              focusing on creating positive experiences for young people and their families.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Community Leadership</span>
              <span>•</span>
              <span>Youth Development</span>
              <span>•</span>
              <span>Program Innovation</span>
            </div>
          </div>
        </div>

        {/* Experiences Grid */}
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {volunteerData.map((experience) => (
              <div
                key={experience.id}
                className="group bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all duration-300 cursor-pointer"
                onClick={() => openModal(experience)}
              >
                <div className="flex flex-col h-full">
                  {/* Organization & Timeframe */}
                  <div className="mb-4">
                    <div className="text-sm font-medium text-cyan-600 mb-1">
                      {experience.organization}
                    </div>
                    <div className="text-xs text-gray-500">
                      {experience.timeframe}
                    </div>
                  </div>

                  <div className="flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-cyan-600 transition-colors">
                      {experience.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-700 mb-3">
                      {experience.role}
                    </p>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm">
                      {experience.description}
                    </p>
                  </div>
                  
                  {/* Skills Preview */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {experience.skills.slice(0, 3).map((skill) => (
                      <span
                        key={skill}
                        className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-700"
                      >
                        {skill}
                      </span>
                    ))}
                    {experience.skills.length > 3 && (
                      <span className="px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-500">
                        +{experience.skills.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* View Details Link */}
                  <div className="text-cyan-600 text-sm font-medium group-hover:text-cyan-700 transition-colors">
                    View Details →
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Community Impact Summary
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">100+</div>
                <div className="text-sm text-gray-600">Young People Impacted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">3</div>
                <div className="text-sm text-gray-600">Organizations Served</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">3+</div>
                <div className="text-sm text-gray-600">Years of Leadership</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-cyan-600 mb-2">98%</div>
                <div className="text-sm text-gray-600">Positive Feedback</div>
              </div>
            </div>
            
            {/* Key Contributions */}
            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Youth Development</h3>
                <p className="text-gray-600">Coached and mentored young athletes, focusing on skill development, confidence building, and positive sports experiences.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Program Innovation</h3>
                <p className="text-gray-600">Created new programs and improved existing systems, making sports more accessible to diverse communities.</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Community Building</h3>
                <p className="text-gray-600">Strengthened connections between families, schools, and sports organizations through effective communication and engagement.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Experience Modal */}
      <AnimatePresence>
        {selectedExperience && (
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
                    aria-label="Previous experience"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <span className="text-sm text-gray-500">
                    {currentExperienceIndex + 1} of {volunteerData.length}
                  </span>
                  <button
                    onClick={navigateToNext}
                    className="text-gray-600 hover:text-cyan-600 transition-colors"
                    aria-label="Next experience"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
                
                {/* Organization info */}
                <div className="hidden md:flex items-center gap-2 text-sm text-gray-500">
                  <span>{selectedExperience.organization}</span>
                  <span>•</span>
                  <span>{selectedExperience.timeframe}</span>
                </div>
                
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
                <div className="mb-4">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">{selectedExperience.title}</h2>
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg">
                    <span className="font-medium text-cyan-600">{selectedExperience.role}</span>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="text-gray-600">{selectedExperience.organization}</span>
                    <span className="hidden sm:inline text-gray-400">•</span>
                    <span className="text-gray-500 text-base">{selectedExperience.timeframe}</span>
                  </div>
                </div>
                
                {/* Skills */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Skills & Competencies</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedExperience.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm font-medium bg-cyan-100 text-cyan-800"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <img
                  src={selectedExperience.image}
                  alt={selectedExperience.title}
                  className="w-full h-64 object-cover rounded-md mb-6"
                  onError={(e: React.SyntheticEvent<HTMLImageElement, Event>) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://placehold.co/800x450/CCCCCC/333333?text=Experience+Image";
                  }}
                />

                {/* Content */}
                <div className="prose max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap mb-6">
                  {selectedExperience.fullContent}
                </div>

                {/* Achievements */}
                <div className="pt-6 border-t border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Key Achievements</h3>
                  <ul className="space-y-3">
                    {selectedExperience.achievements.map((achievement, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-2 h-2 rounded-full bg-cyan-500 mt-2 flex-shrink-0"></div>
                        <span className="text-gray-700">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Volunteer;