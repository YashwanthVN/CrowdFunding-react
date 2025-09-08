import { useEffect, useState } from "react";
import { getProjects } from "../utils/api.js";
import ProjectCard from "./ProjectCard.jsx";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      console.log("Fetching projects...");
      try {
        const response = await getProjects();
        console.log("API Response:", response);
        const projectsArray = Array.isArray(response) ? response : [];
        setProjects(projectsArray);
      } catch (error) {
        console.error("Error fetching project data:", error.message);
        setError(`Failed to load projects: ${error.message}. Please try again later.`);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Featured Projects</h1>
      {loading && <p className="text-center text-gray-600">Loading projects...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p className="text-center text-gray-500">No projects available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;