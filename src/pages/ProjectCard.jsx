import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project }) => {
  if (!project) return <div>Error: Project data missing</div>; // Debug fallback
  const currentAmount = project.currentAmount || 0;
  const goalAmount = project.goal_amount || 1;
  const progress = (currentAmount / goalAmount) * 100;
  const imageUrl = project.imageUrl || 'https://via.placeholder.com/400x200';

  return (
    <motion.div
      className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform-gpu"
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
      style={{ transformOrigin: 'center' }}
    >
      <img
        src={imageUrl}
        alt={project.title || 'Project Image'}
        className="w-full h-48 object-cover rounded-t-lg"
        aria-label={`Image of ${project.title || 'Untitled Project'}`}
      />
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xl font-semibold text-gray-900 truncate">{project.title || 'Untitled Project'}</h3>
          <span className="text-gray-600 font-medium text-sm">
            Goal: ${goalAmount.toLocaleString()}
          </span>
        </div>
        <p className="text-gray-700 mb-4 line-clamp-2">{project.description || 'No description available.'}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="text-green-600 font-bold">
            ${currentAmount.toLocaleString()} raised
          </span>
          <span className="text-gray-500 text-sm">
            Ends: {project.end_date || 'N/A'}
          </span>
        </div>
        <div className="bg-gray-300 rounded-full h-2 mb-4">
          <div
            className="bg-green-500 rounded-full h-2 transition-all duration-300"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <button
          className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors font-medium text-center"
          aria-label={`Support ${project.title || 'this project'}`}
        >
          Support This Project
        </button>
      </div>
    </motion.div>
  );
};

export default ProjectCard;