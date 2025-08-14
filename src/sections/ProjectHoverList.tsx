// ================================
// src/sections/ProjectHoverList.tsx
// Updated with path-specific typography and terminology
// ================================
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { PortfolioPath, getPathConfig } from '../utils/pathConfig';

// Helper component for creative text highlighting
interface CreativeTextProps {
  children: string;
  className?: string;
}

const CreativeText: React.FC<CreativeTextProps> = ({ children, className = '' }) => {
  // Keywords that should get gradient treatment
  const highlightWords = [
    'creative', 'vision', 'storytelling', 'narrative', 'brand', 'concept', 
    'visual', 'design', 'artistic', 'innovative', 'compelling', 'engaging'
  ];
  
  // Safer approach: split text and rebuild with React elements
  const highlightText = (text: string) => {
    try {
      // Create a regex that matches any of our highlight words
      const regex = new RegExp(`\\b(${highlightWords.join('|')})\\b`, 'gi');
      const parts = text.split(regex);
      
      return parts.map((part, index) => {
        const isHighlightWord = highlightWords.some(word => 
          word.toLowerCase() === part.toLowerCase()
        );
        
        if (isHighlightWord) {
          return (
            <span 
              key={index}
              className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent font-extrabold"
            >
              {part}
            </span>
          );
        }
        return part;
      });
    } catch (error) {
      console.error('Error highlighting text:', error);
      // Fallback to original text if highlighting fails
      return text;
    }
  };

  return (
    <span className={className}>
      {highlightText(children)}
    </span>
  );
};

interface ProjectImage { 
  src: string; 
  alt: string; 
  caption?: string; 
}

interface Project {
  id: string;
  name: string;
  shortDescription: string;
  longDescription: string;
  descriptions?: {
    developer?: string;
    ux?: string;
    creative?: string;
  };
  images: ProjectImage[];
  technologiesUsed: string[];
  toolsUsed: string[];
  liveUrl: string | null;
  githubUrl: string | null;
  caseStudyUrl: string | null;
  rolePlayed: string;
  isFeatured: boolean;
}

interface ProjectHoverListProps {
  projects: Project[];
  selectedPath?: PortfolioPath;
  config?: any; // PathConfig from utils
}

const ProjectHoverList: React.FC<ProjectHoverListProps> = ({ 
  projects, 
  selectedPath, 
  config 
}) => {
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  // Get the appropriate description based on selected path
  const getProjectDescription = (project: Project): string => {
    if (selectedPath && project.descriptions && project.descriptions[selectedPath]) {
      return project.descriptions[selectedPath];
    }
    return project.shortDescription;
  };

  // Get path-specific role title
  const getProjectRole = (project: Project): string => {
    if (!config) return project.rolePlayed;
    
    // Map generic roles to path-specific ones
    const roleMap: Record<string, Record<string, string>> = {
      developer: {
        'Scriptwriter, Voice-Over Artist, Cinematographer, Storyboarder, and On-Screen Talent': 'Full-Stack Creator & Technical Lead',
        'Automation Developer & Creative Technologist': 'Senior JavaScript Developer',
        'UI/UX Designer, Researcher, Product Conceptualizer, Developer': 'Frontend Developer & Architect'
      },
      ux: {
        'Scriptwriter, Voice-Over Artist, Cinematographer, Storyboarder, and On-Screen Talent': 'UX Researcher & Content Strategist',
        'Automation Developer & Creative Technologist': 'UX Tool Designer',
        'UI/UX Designer, Researcher, Product Conceptualizer, Developer': 'Lead UX Designer & Researcher'
      },
      creative: {
        'Scriptwriter, Voice-Over Artist, Cinematographer, Storyboarder, and On-Screen Talent': 'Creative Director & Visual Storyteller',
        'Automation Developer & Creative Technologist': 'Creative Technologist',
        'UI/UX Designer, Researcher, Product Conceptualizer, Developer': 'Creative Product Designer'
      }
    };

    const pathRoles = roleMap[selectedPath || ''];
    return pathRoles?.[project.rolePlayed] || project.rolePlayed;
  };

  useEffect(() => {
    // Animate projects in on mount and path change
    gsap.fromTo(
      '.project-item',
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }
    );
  }, [selectedPath]);

  // Default styling if no config
  const defaultConfig = {
    typography: {
      heading: 'font-sans font-medium',
      body: 'font-sans',
      accent: 'font-sans font-semibold'
    },
    colors: {
      primary: 'text-gray-900',
      accent: 'text-blue-600'
    },
    terminology: {
      projects: 'Projects',
      viewAction: 'View Details',
      skillsTitle: 'Technologies',
      role: 'Role'
    }
  };

  const currentConfig = config || defaultConfig;

  return (
    <div className="space-y-8">
      {/* Section Header with Path-Specific Terminology */}
      {config && (
        <div className="text-center mb-12">
          <div className={`inline-block px-4 py-2 rounded-full ${config.colors.highlight} mb-4`}>
            <p className={`text-sm ${config.typography.body} ${config.colors.accent}`}>
              {config.terminology.caseStudyType}
            </p>
          </div>
          
          {/* Focus Areas for this path */}
          <div className="max-w-3xl mx-auto">
            <p className={`text-sm ${config.typography.body} text-gray-600 mb-2`}>
              Focused on:
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              {config.terminology.focusAreas.slice(0, 3).map((area: string, index: number) => (
                <span 
                  key={index}
                  className={`text-xs px-3 py-1 rounded-full bg-gray-100 ${config.typography.body} text-gray-700`}
                >
                  {area}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-0">
        {projects.map((project, index) => (
          <div
            key={project.id}
            className="project-item group border-b border-gray-200 last:border-b-0"
            onMouseEnter={() => setHoveredProject(project.id)}
            onMouseLeave={() => setHoveredProject(null)}
          >
            <Link 
              to={`/projects/${project.id}`}
              className="block py-8 md:py-12 transition-all duration-300 hover:bg-gray-50/50"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
                
                {/* Project Number & Image */}
                <div className="lg:col-span-4 space-y-4">
                  <div className="flex items-center space-x-4">
                    <span className={`text-sm ${currentConfig.typography.body} text-gray-400`}>
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {hoveredProject === project.id && (
                      <div className={`w-2 h-2 rounded-full animate-pulse ${
                        selectedPath === 'developer' ? 'bg-blue-500' :
                        selectedPath === 'ux' ? 'bg-purple-500' :
                        selectedPath === 'creative' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`} />
                    )}
                  </div>
                  
                  {/* Project Preview Image */}
                  {project.images && project.images[0] && (
                    <div className="aspect-video overflow-hidden rounded-lg bg-gray-100">
                      <img
                        src={project.images[0].src}
                        alt={project.images[0].alt}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>

                {/* Project Content */}
                <div className="lg:col-span-8 space-y-4">
                  <div className="space-y-2">
                    <h3 className={`text-2xl md:text-3xl lg:text-4xl ${currentConfig.typography.heading} ${currentConfig.colors.primary} group-hover:${currentConfig.colors.accent} transition-colors duration-200`}>
                      {/* Creative path gets gradient treatment for project names */}
                      {selectedPath === 'creative' ? (
                        <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                          {project.name}
                        </span>
                      ) : (
                        project.name
                      )}
                    </h3>
                    
                    {/* Path-specific description with creative highlighting */}
                    <span className={`text-base md:text-lg ${currentConfig.typography.body} ${currentConfig.colors.secondary || 'text-gray-600'} leading-relaxed max-w-3xl block`}>
                      {selectedPath === 'creative' ? (
                        <CreativeText className="">{getProjectDescription(project)}</CreativeText>
                      ) : (
                        getProjectDescription(project)
                      )}
                    </span>
                  </div>

                  {/* Technologies with path-specific terminology */}
                  {project.technologiesUsed && project.technologiesUsed.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className={`text-sm ${currentConfig.typography.accent} ${currentConfig.colors.secondary || 'text-gray-500'}`}>
                        {currentConfig.terminology.skillsTitle}:
                      </span>
                      {project.technologiesUsed.slice(0, 5).map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${currentConfig.typography.body} bg-gray-100 text-gray-700 border border-gray-200`}
                        >
                          {/* Developer path gets code-style treatment */}
                          {selectedPath === 'developer' ? (
                            <code className="bg-transparent">{tech}</code>
                          ) : (
                            tech
                          )}
                        </span>
                      ))}
                      {project.technologiesUsed.length > 5 && (
                        <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs ${currentConfig.typography.body} bg-gray-50 text-gray-500`}>
                          +{project.technologiesUsed.length - 5} more
                        </span>
                      )}
                    </div>
                  )}

                  {/* Role with path-specific terminology and styling */}
                  <div className="mt-3">
                    <span className={`text-sm ${currentConfig.typography.accent} ${currentConfig.colors.secondary || 'text-gray-500'}`}>
                      {currentConfig.terminology.role}: 
                    </span>
                    <span className={`text-sm ${currentConfig.typography.body} ${currentConfig.colors.primary} ml-2`}>
                      {getProjectRole(project)}
                    </span>
                  </div>

                  {/* Action Links with path-specific language */}
                  <div className="flex flex-wrap gap-3 mt-6">
                    <span className={`inline-flex items-center text-sm ${currentConfig.typography.accent} ${currentConfig.colors.accent} group-hover:opacity-80`}>
                      {currentConfig.terminology.viewAction}
                      <svg className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </span>
                    
                    {project.liveUrl && (
                      <span className={`inline-flex items-center text-sm ${currentConfig.typography.body} text-gray-600`}>
                        {selectedPath === 'developer' ? 'Live Demo' : 
                         selectedPath === 'ux' ? 'Live Prototype' : 
                         selectedPath === 'creative' ? 'See Live' : 'Live Demo'}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    )}
                    
                    {project.githubUrl && (
                      <span className={`inline-flex items-center text-sm ${currentConfig.typography.body} text-gray-600`}>
                        {selectedPath === 'developer' ? 'Source Code' : 
                         selectedPath === 'ux' ? 'Design Files' : 
                         selectedPath === 'creative' ? 'Creative Assets' : 'GitHub'}
                        <svg className="ml-1 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                        </svg>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>

      {/* Path Switch Hint with Custom Styling */}
      {selectedPath && config && (
        <div className={`text-center pt-8 border-t border-gray-200 ${config.colors.highlight} rounded-lg p-6 mt-8`}>
          <p className={`text-sm ${config.typography.body} ${config.colors.secondary || 'text-gray-500'}`}>
            Viewing {config.terminology.projects.toLowerCase()} from a{' '}
            <span className={`${config.typography.accent} ${config.colors.accent}`}>
              {selectedPath}
            </span>{' '}
            perspective.
          </p>
          <p className={`text-xs ${config.typography.body} text-gray-400 mt-1`}>
            Same work, different lens — highlighting {' '}
            {selectedPath === 'developer' ? 'technical implementation and code quality' :
             selectedPath === 'ux' ? 'user research and design process' :
             selectedPath === 'creative' ? 'creative vision and storytelling' : 'various aspects'}
          </p>
        </div>
      )}

      {/* Case Study Focus Areas */}
      {config && (
        <div className="mt-12 text-center">
          <h4 className={`text-lg ${config.typography.heading} ${config.colors.primary} mb-4`}>
            What You'll Find in These {config.terminology.projects}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {config.terminology.focusAreas.map((area: string, index: number) => (
              <div 
                key={index}
                className={`p-4 rounded-lg ${config.colors.highlight}`}
              >
                <p className={`text-sm ${config.typography.body} ${config.colors.primary}`}>
                  {area}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectHoverList;