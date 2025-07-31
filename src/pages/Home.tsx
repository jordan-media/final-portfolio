// src/pages/Home.tsx
import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { Link } from 'react-router-dom';
import { Project } from '../types/Projects'; // Import the full Project interface

// Assuming these sections remain in the 'sections' directory for now
// Update paths if you move them to 'components' later
import ValueStatement from '../sections/ValueStatement'; // Assuming this component exists
import Extras from '../components/Extras'; // Assuming this component exists

function Home() {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]); // Renamed for clarity: we're specifically getting featured projects
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch("/projects.json")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data: Project[]) => {
        // Filter for projects where isFeatured is true, as per our JSON structure
        const filteredProjects = data.filter(project => project.isFeatured);
        setFeaturedProjects(filteredProjects);
      })
      .catch(err => {
        console.error("Error fetching projects:", err);
        setError("Failed to load featured projects."); // Specific error message
      })
      .finally(() => {
        setLoading(false);
      });
  }, []); // Empty dependency array means this effect runs once on component mount

  // 1️⃣ Animate hero content on mount
  useEffect(() => {
    gsap.from(".hero-content-animation-target", {
      duration: 1,
      y: -50,
      opacity: 0,
      ease: "power2.out"
    });
  }, []);

  // 2️⃣ Animate project list items once loaded
  useEffect(() => {
    if (!loading && featuredProjects.length > 0) { // Only animate if loading is complete AND projects exist
      gsap.from(".project-list-item-animation-target", {
        duration: 0.5,
        y: 20,
        opacity: 0,
        stagger: 0.1, // Animate items one after another
        ease: "power1.out",
        delay: 0.2 // Small delay to let other elements render
      });
    }
  }, [loading, featuredProjects]); // Re-run effect if loading status or projects change

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Hero Section */}
      <section
        className="relative w-full h-screen bg-gray-200 flex items-center justify-center overflow-hidden"
      >
        <div className="hero-content-animation-target text-center p-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-700 mb-4 sm:mb-6 leading-tight font-extrabold">
            Welcome to My Portfolio!
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-700 font-medium">
            Showcasing my creative and technical journey.
          </p>
        </div>
      </section>

      {/* Value Statement Section - Assuming this is a standalone component */}
      <ValueStatement />

      {/* Featured Projects Section */}
      <section className="py-8 px-4 max-w-4xl mx-auto font-space-grotesk text-gray-900 md:py-16 md:px-8">
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-8 text-center md:text-left">
          Featured Projects
        </h2>

        {loading ? (
          // Display a loading message specific to the projects section
          <div className="text-center text-xl sm:text-2xl md:text-3xl pt-[5vh] text-gray-600">Loading projects...</div>
        ) : error ? (
          // Display an error message if fetching failed
          <div className="text-center text-xl sm:text-2xl md:text-3xl pt-[5vh] text-red-600">Error: {error}</div>
        ) : featuredProjects.length > 0 ? (
          // Render the grid of featured projects if they exist
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {featuredProjects.map((project) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="z-15 block bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 project-list-item-animation-target"
              >
                <div className="p-6">
                  {/* Display the project image if available */}
                  {project.images && project.images.length > 0 && (
                    <img
                      src={project.images[0].src}
                      alt={project.images[0].alt}
                      className="w-full h-48 object-cover rounded-md mb-4"
                    />
                  )}
                  {/* Display project name */}
                  <h3 className="text-2xl font-bold mb-2 text-blue-700">
                    {project.name}
                  </h3>
                  {/* Display short description */}
                  <p className="text-gray-700 mb-4">
                    {project.shortDescription}
                  </p>
                  {/* "Learn More" link text */}
                  <span className="inline-block text-blue-600 hover:text-blue-800 font-semibold">
                    Learn More &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          // Message if no featured projects are found
          <p className="text-center text-xl text-gray-600">No featured projects to display yet. Check your `projects.json`.</p>
        )}
      </section>

      {/* Extras Section - Assuming this is a standalone component */}
      <Extras />
    </div>
  );
}

export default Home;