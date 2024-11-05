import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProjectCard from './ProjectCard';

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all project data from the backend API
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const apiUrl = process.env.REACT_APP_API_BASE_URL;
        console.log('API Base URL:', apiUrl); // Debugging line

        if (!apiUrl) {
          throw new Error("API base URL is not defined");
        }

        const response = await axios.get(`${apiUrl}/api/projects`);
        console.log('Fetched Projects:', response.data); // Log fetched projects for debugging
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching project data:', error);
        setError('Failed to load projects. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (loading) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center mt-8 text-red-600">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">All Projects</h1>
      {projects.length === 0 ? (
        <div className="text-center mt-8 text-xl">No projects available</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
