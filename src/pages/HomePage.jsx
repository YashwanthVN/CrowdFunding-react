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
      const apiUrl = import.meta.env.VITE_API_BASE_URL;
      if (!apiUrl) {
        throw new Error("API base URL is not defined");
      }
      console.log("API URL:", apiUrl);
      const response = await getProjects();
      console.log("API Response:", response);
      const projectsArray = Array.isArray(response) ? response : response.projects || [];
      setProjects(projectsArray);
    } catch (error) {
      console.error("Error fetching project data:", error);
      setError("Failed to load projects. Please try again later.");
    } finally {
      console.log("Fetch complete, loading set to false");
      setLoading(false);
    }
  };

  fetchProjects();
}, []);

  return (
    <div>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div>
          {projects.length > 0 ? (
            projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))
          ) : (
            <p>No projects available.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Home;