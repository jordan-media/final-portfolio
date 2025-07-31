// src/pages/Projects.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

// Define an interface for your project objects for type safety
interface Project {
  id: string;
  name: string;
  // Add other properties if your project objects have them, e.g.:
  // description: string;
  // imageUrl: string;
}

function Projects() { // Type the functional component
  const [projects, setProjects] = useState<Project[]>([]); // Type state as array of Project
  const [loading, setLoading] = useState<boolean>(true); // Type state as boolean

  useEffect(() => {
    // You likely want to remove this setTimeout in a production application
    // as it artificially delays content loading. It's good for simulating network latency during dev.
    const timer = setTimeout(() => {
      fetch("/projects.json")
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Project[]) => { // Type data as array of Project
          setProjects(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching projects:", error);
          setLoading(false); // Ensure loading is set to false even on error
        });
    }, 2000); // 2-second loading delay

    // Cleanup function to clear the timeout if the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return loading ? (
    // Loading state with Tailwind styling
    <div className="flex items-center justify-center min-h-screen-minus-header-footer bg-gray-50 text-xl md:text-2xl text-gray-600">
      Loading projects...
    </div>
  ) : (
    // Main content when projects are loaded
    // Using a main container with max-width for readability, consistent with About page
    <div className="container mx-auto px-4 py-8 md:py-12 max-w-4xl font-sans text-gray-800">
      {/* Page Title */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
        My Projects
      </h1>
      {/* Subtitle/Description */}
      <p className="text-lg md:text-xl text-gray-600 mb-8 text-center md:text-left">
        Explore a selection of my latest work and creative ventures.
      </p>

      {/* Projects List */}
      <ul className="list-none p-0 m-0">
        {projects.map((project) => (
          <li
            key={project.id}
            className="mb-4 last:mb-0 border-b border-gray-200 pb-4 last:border-b-0"
          >
            <Link
              to={`/projects/${project.id}`}
              className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300 no-underline px-2 py-1 rounded-md hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              {project.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Projects;