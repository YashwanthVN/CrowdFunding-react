import React, { useState } from 'react';
import './ProjectCard.css'; // Import the custom CSS file

const ProjectCard = ({ project }) => {
  if (!project) return <div className="error-message">Error: Project data missing</div>;
  const [currentAmount, setCurrentAmount] = useState(project.currentAmount || 0);
  const goalAmount = project.goal_amount || 1;
  const progress = (currentAmount / goalAmount) * 100;
  const imageUrl = project.imageUrl || 'https://via.placeholder.com/400x200';

  const handleSupport = async () => {
    try {
      const response = await fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountToAdd: 100 }), // Match the backend parameter
      });
      const updatedProject = await response.json();
      setCurrentAmount(updatedProject.currentAmount);
      alert('Thank you for your support!');
    } catch (error) {
      console.error('Support failed:', error.message);
      alert('Failed to support project. Please try again.');
    }
  };

  return (
    <div className="project-card">
      <img
        src={imageUrl}
        alt={project.title || 'Project Image'}
        className="project-image"
      />
      <div className="content">
        <div className="header">
          <h3 className="title">{project.title || 'Untitled Project'}</h3>
          <span className="goal">Goal: ${goalAmount.toLocaleString()}</span>
        </div>
        <p className="description">{project.description || 'No description available.'}</p>
        <div className="stats">
          <span className="raised">${currentAmount.toLocaleString()} raised</span>
          <span className="end-date">Ends: {new Date(project.end_date).toLocaleDateString() || 'N/A'}</span>
        </div>
        <div className="progress">
          <div
            className="progress-bar"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <button
          className="button"
          onClick={handleSupport}
          aria-label={`Support ${project.title || 'this project'}`}
        >
          Support This Project
        </button>
      </div>
    </div>
  );
};

export default ProjectCard;