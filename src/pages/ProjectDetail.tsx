// src/pages/ProjectDetail.tsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// Import the Project interface from your types folder
import { Project, ProjectImage, ProjectChallenge } from "../types/Projects"; 

const ProjectDetail = () => {
  const { projectId } = useParams<{ projectId: string }>(); 
  const [project, setProject] = useState<Project | null>(null); // Use the Project interface
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showFullDescription, setShowFullDescription] = useState<boolean>(false); // New state for description expansion

  useEffect(() => {
    if (projectId) { 
      setLoading(true);
      setError(null);
      fetch("/projects.json") 
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then((data: Project[]) => { // Cast data to an array of Project
          const foundProject = data.find(p => p.id === projectId);
          if (foundProject) {
            setProject(foundProject);
          } else {
            setError("Project not found.");
          }
        })
        .catch(err => {
          console.error("Failed to fetch project details:", err);
          setError("Failed to load project details.");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [projectId]); 

  // Reset showFullDescription when a new project is loaded
  useEffect(() => {
    setShowFullDescription(false);
  }, [projectId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen-minus-header-footer bg-gray-50 text-xl md:text-2xl text-gray-600">
        Loading project details...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen-minus-header-footer bg-red-100 text-red-700 p-8 text-xl md:text-2xl">
        Error: {error}
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex items-center justify-center min-h-screen-minus-header-footer bg-gray-50 text-xl md:text-2xl text-gray-600">
        No project found for ID: {projectId}
      </div>
    );
  }

  return (
    <section className="py-8 px-4 max-w-4xl mx-auto font-space-grotesk text-gray-900 leading-relaxed md:py-16 md:px-8">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-center md:text-left">
        {project.name}
      </h1>
      <p className="text-lg md:text-xl text-gray-700 mb-8 text-center md:text-left">
        Project ID: <span className="font-semibold">{project.id}</span>
      </p>

      {/* Main Project Image */}
      {project.images && project.images.length > 0 && (
        <div className="mb-8">
          <img
            src={project.images[0].src}
            alt={project.images[0].alt}
            className="w-full h-auto object-cover rounded-lg shadow-md"
          />
          {project.images[0].caption && (
            <p className="text-sm text-gray-600 mt-2 text-center">
              {project.images[0].caption}
            </p>
          )}
        </div>
      )}

      {/* Role Played */}
      {project.rolePlayed && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 pb-2 border-b border-gray-300">My Role</h2>
          <p className="text-base md:text-lg">
            {project.rolePlayed}
          </p>
        </div>
      )}

      {/* Technologies & Tools (Side-by-side on desktop) */}
      {(project.technologiesUsed.length > 0 || project.toolsUsed.length > 0) && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 pb-2 border-b border-gray-300">Tech & Tools</h2>
          <div className="md:flex md:justify-between md:gap-8"> {/* Added flex for desktop */}
            {project.technologiesUsed.length > 0 && (
              <div className="mb-4 md:mb-0 md:w-1/2"> {/* Added md:w-1/2 */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Technologies Used:</h3>
                <ul className="list-disc list-inside text-base md:text-lg">
                  {project.technologiesUsed.map((tech, index) => (
                    <li key={index}>{tech}</li>
                  ))}
                </ul>
              </div>
            )}
            {project.toolsUsed.length > 0 && (
              <div className="md:w-1/2"> {/* Added md:w-1/2 */}
                <h3 className="text-xl sm:text-2xl font-bold mb-2">Tools Used:</h3>
                <ul className="list-disc list-inside text-base md:text-lg">
                  {project.toolsUsed.map((tool, index) => (
                    <li key={index}>{tool}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Description (Short with Expand/Collapse for Long) */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4 pb-2 border-b border-gray-300">Description</h2>
        <p className="text-base md:text-lg mb-4 whitespace-pre-line">
          {showFullDescription ? project.longDescription : project.shortDescription}
        </p>
        {(project.longDescription && project.shortDescription && project.longDescription !== project.shortDescription) && (
          <button
            onClick={() => setShowFullDescription(!showFullDescription)}
            className="text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
          >
            {showFullDescription ? "Read Less" : "Read More"}
          </button>
        )}
      </div>

      {/* Challenges & Solutions */}
      {project.challenges && project.challenges.length > 0 && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 pb-2 border-b border-gray-300">Challenges & Solutions</h2>
          {project.challenges.map((challenge, index) => (
            <div key={index} className="mb-6">
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-red-700">Challenge {index + 1}:</h3>
              <p className="text-base md:text-lg mb-2">{challenge.description}</p>
              <h3 className="text-xl sm:text-2xl font-bold mb-2 text-green-700">Solution:</h3>
              <p className="text-base md:text-lg">{challenge.solution}</p>
            </div>
          ))}
        </div>
      )}

      {/* Outcome */}
      {project.outcome && (
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 pb-2 border-b border-gray-300">Outcome</h2>
          <p className="text-base md:text-lg whitespace-pre-line">
            {project.outcome}
          </p>
        </div>
      )}

      {/* Project Links */}
      {(project.liveUrl || project.githubUrl || project.caseStudyUrl) && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 pb-2 border-b border-gray-300">Project Links</h2>
          <div className="flex flex-wrap gap-4">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors duration-200"
              >
                Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                GitHub Repo
              </a>
            )}
            {project.caseStudyUrl && (
              <a
                href={project.caseStudyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
              >
                Case Study
              </a>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectDetail;