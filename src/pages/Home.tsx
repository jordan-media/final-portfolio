// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Project } from '../types/Projects';
import TypewriterEffect from '../sections/TypewritterEffect';
import Extras from '../components/Extras';
import ProjectHoverList from '../sections/ProjectHoverList';
import { getPathConfig, PathConfig } from '../utils/pathConfig';
import { usePath } from '../contexts/PathContext';

// Helper component for creative text highlighting
interface CreativeTextProps {
  children: string;
  className?: string;
}

const CreativeText: React.FC<CreativeTextProps> = ({ children, className = '' }) => {
  const highlightWords = [
    'creative', 'vision', 'storytelling', 'narrative', 'brand', 'concept', 
    'visual', 'design', 'artistic', 'innovative', 'compelling', 'engaging'
  ];
  
  const highlightText = (text: string) => {
    try {
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
      return text;
    }
  };

  return (
    <span className={className}>
      {highlightText(children)}
    </span>
  );
};

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Get context values - modal is now handled globally in Layout
  const { selectedPath, initialized } = usePath();
  const config: PathConfig | null = getPathConfig(selectedPath);

  // Fetch projects
  useEffect(() => {
    const ctrl = new AbortController();
    (async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('projects.json', { cache: 'no-store', signal: ctrl.signal });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data: Project[] = await res.json();
        const filtered = data.filter((p) => p.isFeatured);
        setFeaturedProjects(filtered);
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          console.error('Error fetching projects:', e);
          setError('Failed to load featured projects.');
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => ctrl.abort();
  }, []);

  // Animate hero when component loads and path is selected
  useEffect(() => {
    if (selectedPath && initialized) {
      gsap.from('.hero-content-animation-target', {
        duration: 1,
        y: -50,
        opacity: 0,
        ease: 'power2.out',
      });
    }
  }, [selectedPath, initialized]);

  // Don't render hero content until initialized
  if (!initialized) {
    return (
      <div className="bg-gray-50 text-gray-800 min-h-screen flex items-center justify-center">
        <div className="text-xl text-gray-600">Loading...</div>
      </div>
    );
  }

  // Get path-specific hero content
  const getHeroContent = (): { title: string; subtitle: string } => {
    if (!selectedPath) {
      return { title: 'Digital Generalist', subtitle: 'Showcasing my creative and technical journey.' };
    }
    
    switch (selectedPath) {
      case 'developer':
        return {
          title: 'Frontend Developer',
          subtitle: 'Building responsive, user-focused web applications with modern technologies.'
        };
      case 'ux':
        return {
          title: 'UX Designer',
          subtitle: 'Creating intuitive user experiences through research, design, and iteration.'
        };
      case 'creative':
        return {
          title: 'Creative Storyteller',
          subtitle: 'Crafting compelling narratives through visual design and multimedia content.'
        };
      default:
        return {
          title: 'Digital Generalist',
          subtitle: 'Showcasing my creative and technical journey.'
        };
    }
  };

  const heroContent = getHeroContent();

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section with Path-Specific Typography */}
      <section className="relative w-full h-[90vh] sm:h-screen bg-gray-200 flex items-center justify-center overflow-hidden z-10">
        <div className="hero-content-animation-target text-center p-4 relative z-20">
          <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 leading-tight ${
            config ? config.typography.heading : 'font-extrabold'
          } ${config ? config.colors.primary : 'text-gray-900'}`}>
            {selectedPath === 'creative' ? (
              <span className="bg-gradient-to-r from-green-400 to-cyan-500 bg-clip-text text-transparent">
                {heroContent.title}
              </span>
            ) : (
              heroContent.title
            )}
          </h1>
          
          <p className={`text-lg sm:text-xl md:text-2xl font-medium ${
            config ? config.typography.body : ''
          } ${config ? config.colors.primary : 'text-gray-900'}`}>
            {selectedPath === 'creative' ? (
              <CreativeText className="">{heroContent.subtitle}</CreativeText>
            ) : (
              heroContent.subtitle
            )}
          </p>

          {/* Taglines with gradient + a focus phrase in black */}
          {selectedPath && (
            <p className="mt-2 text-base sm:text-lg md:text-xl italic">
              {selectedPath === 'ux' && (
                <>
                  <span className="bg-gradient-to-r from-cyan-500 to-green-600 bg-clip-text text-transparent font-semibold">
                    UxD instincts since RollerCoaster Tycoon '99 — designing rides{' '}
                  </span>
                  <span className="text-gray-900 font-semibold">for the guest</span>
                  <span className="bg-gradient-to-r from-cyan-500 to-green-600 bg-clip-text text-transparent font-semibold">
                    , not the builder.
                  </span>
                </>
              )}
              {selectedPath === 'developer' && (
                <>
                  <span className="bg-gradient-to-r from-cyan-500 to-green-600 bg-clip-text text-transparent font-semibold">
                    Dev roots sprouted in science summer camps, back when{' '}
                  </span>
                  <span className="text-gray-900 font-semibold">AOL CDs</span>
                  <span className="bg-gradient-to-r from-cyan-500 to-green-600 bg-clip-text text-transparent font-semibold">
                    {' '}came with breakfast.
                  </span>
                </>
              )}
              {selectedPath === 'creative' && (
                <>
                  <span className="bg-gradient-to-r from-cyan-500 to-green-600 bg-clip-text text-transparent font-semibold">
                    Raised by a family of storytellers, and brought up with good content from{' '}
                  </span>
                  <span className="text-gray-900 font-semibold">genuine moments</span>
                  <span className="bg-gradient-to-r from-cyan-500 to-green-600 bg-clip-text text-transparent font-semibold">
                    , not algorithms.
                  </span>
                </>
              )}
            </p>
          )}
        </div>
      </section>

      <TypewriterEffect />

      {/* Featured Projects Section with Path-Specific Headers */}
      <section className="py-8 px-4 max-w-[1280px] mx-auto font-space-grotesk text-gray-900 md:py-16 md:px-8">
        {config && (
          <div className="text-center mb-12">
            <p className={`text-sm uppercase tracking-wider text-gray-500 mb-2 ${config.typography.body}`}>
              {config.terminology.caseStudyType}
            </p>
            <h2 className={`text-3xl md:text-4xl ${config.typography.heading} ${config.colors.primary}`}>
              Featured {config.terminology.projects}
            </h2>
          </div>
        )}

        {loading ? (
          <div className="text-center text-xl sm:text-2xl md:text-3xl pt-[5vh] text-gray-600">
            Loading {config?.terminology.projects.toLowerCase() || 'projects'}...
          </div>
        ) : error ? (
          <div className="text-center text-xl sm:text-2xl md:text-3xl pt-[5vh] text-red-600">
            Error: {error}
          </div>
        ) : featuredProjects.length > 0 ? (
          <ProjectHoverList 
            projects={featuredProjects} 
            selectedPath={selectedPath}
            config={config}
          />
        ) : (
          <p className="text-center text-xl text-gray-600">
            No featured {config?.terminology.projects.toLowerCase() || 'projects'} to display yet. Check your projects.json.
          </p>
        )}
      </section>

      <Extras />
    </div>
  );
}

export default Home;