import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  const currentAmount = project.currentAmount || 0;
  const goalAmount = project.goalAmount || 1; // Prevent division by 0
  const progress = (currentAmount / goalAmount) * 100;

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <img
        src={project.imageUrl || '/api/placeholder/400/200'}
        alt={project.title}
        className="w-full h-48 object-cover"
        aria-label={`Image of ${project.title}`}
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{project.title || 'Untitled Project'}</h3>
        <p className="text-gray-600 mb-4">{project.description || 'No description available.'}</p>
        <div className="flex justify-between items-center">
          <span className="text-green-500 font-bold">
            ${currentAmount} raised
          </span>
          <span className="text-gray-500">
            Goal: ${goalAmount}
          </span>
        </div>
        <div className="mt-4 bg-gray-200 rounded-full h-2">
          <div
            className="bg-green-500 rounded-full h-2"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          aria-label="Support this project"
        >
          Support This Project
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
