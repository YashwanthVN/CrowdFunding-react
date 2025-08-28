import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../utils/api';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const data = await getProjectById(id);
        setProject(data);
      } catch (err) {
        setError('Failed to fetch project details');
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg text-red-500">{error}</div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-lg">Project not found</div>
      </div>
    );
  }

  const handleSupportClick = () => {
    // Here you can implement functionality for supporting the project
    alert(`You have chosen to support "${project.title}".`);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{project.title}</h1>
      <div className="bg-white shadow-md rounded-lg p-6">
        <p className="text-gray-700 mb-4">{project.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold text-green-600">${project.currentAmount.toLocaleString()} raised</span>
          <span className="text-gray-600">Goal: ${project.goalAmount.toLocaleString()}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
          <div 
            className="bg-green-600 h-2.5 rounded-full" 
            style={{ width: `${(project.currentAmount / project.goalAmount) * 100}%` }}
          ></div>
        </div>
        <p className="text-gray-600">Campaign ends on: {new Date(project.endDate).toLocaleDateString()}</p>
        <button 
          onClick={handleSupportClick} 
          className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200"
        >
          Support this project
        </button>
      </div>
    </div>
  );
};

export default ProjectDetails;
