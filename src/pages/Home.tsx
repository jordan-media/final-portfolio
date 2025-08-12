// ================================
// src/pages/Home.tsx (stabilized fetch + featured grid)
// ================================
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Project } from '../types/Projects';
import TypewriterEffect from '../sections/TypewritterEffect';
import ValueStatement from '../sections/ValueStatement';
import Extras from '../components/Extras';

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Robust fetch: relative URL + no-cache + abort on unmount
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

  // Animate hero
  useEffect(() => {
    gsap.from('.hero-content-animation-target', {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: 'power2.out',
    });
  }, []);

  // Animate cards when data arrives
  useEffect(() => {
    if (!loading && featuredProjects.length > 0) {
      gsap.from('.project-list-item-animation-target', {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1,
        ease: 'power1.out',
        delay: 0.2,
      });
    }
  }, [loading, featuredProjects]);

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section className="relative w-full h-[90vh] sm:h-screen bg-gray-200 flex items-center justify-center overflow-hidden">
        <div className="hero-content-animation-target text-center p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-700 mb-4 sm:mb-6 leading-tight font-extrabold">
            Welcome to My Portfolio!!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
            Showcasing my creative and technical journey.
          </p>
        </div>
      </section>

      <ValueStatement />
      <TypewriterEffect />

      {/* Featured Projects */}
      <section className="py-8 px-4 max-w-5xl mx-auto font-space-grotesk text-gray-900 md:py-16 md:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center md:text-left">
          Featured Projects
        </h2>

        {loading ? (
          <div className="text-center text-xl sm:text-2xl md:text-3xl pt-[5vh] text-gray-600">Loading projects...</div>
        ) : error ? (
          <div className="text-center text-xl sm:text-2xl md:text-3xl pt-[5vh] text-red-600">Error: {error}</div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 project-list-item-animation-target"
              >
                <div className="p-6">
                  {project.images?.[0]?.src ? (
                    <img
                      src={project.images[0].src}
                      alt={project.images[0].alt || project.name}
                      className="w-full h-48 object-cover rounded-md mb-4"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-48 rounded-md mb-4 bg-gray-100 grid place-items-center">
                      <span className="text-sm text-gray-400">No image</span>
                    </div>
                  )}

                  <h3 className="text-2xl font-bold mb-2 text-blue-700">{project.name}</h3>
                  <p className="text-gray-700 mb-4">{project.shortDescription}</p>
                  <span className="inline-block text-blue-600 hover:text-blue-800 font-semibold">Learn More →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-xl text-gray-600">No featured projects to display yet. Check your projects.json.</p>
        )}
      </section>

      <Extras />
    </div>
  );
}

export default Home;