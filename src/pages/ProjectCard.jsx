import React, { useState } from 'react';
import './ProjectCard.css'; // Import the custom CSS file

const ProjectCard = ({ project }) => {
  if (!project) return <div className="error-message">Error: Project data missing</div>;
  const [currentAmount, setCurrentAmount] = useState(project.currentAmount || 0);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State for pop-up
  const [donationAmount, setDonationAmount] = useState(''); // State for user input
  const goalAmount = project.goal_amount || 1;
  const progress = (currentAmount / goalAmount) * 100;
  const imageUrl = project.imageUrl || 'https://via.placeholder.com/400x200';

  const handleSupport = async () => {
    if (isPopupOpen) return; // Prevent multiple pop-ups
    setIsPopupOpen(true);
  };

  const handleDonate = async () => {
    const amount = parseInt(donationAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/projects/${project.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amountToAdd: amount }),
      });
      const updatedProject = await response.json();
      setCurrentAmount(updatedProject.currentAmount);
      setIsPopupOpen(false);
      setDonationAmount(''); // Reset input
      alert('Thank you for your support!');
    } catch (error) {
      console.error('Support failed:', error.message);
      alert('Failed to support project. Please try again.');
    }
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setDonationAmount(''); // Reset input on close
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

      {isPopupOpen && (
        <div className="popup-overlay" onClick={handleClosePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="title">Enter Donation Amount</h3>
            <input
              type="number"
              value={donationAmount}
              onChange={(e) => setDonationAmount(e.target.value)}
              className="donation-input"
              placeholder="Enter amount in $"
              min="1"
            />
            <div className="popup-buttons">
              <button className="button" onClick={handleDonate}>Donate</button>
              <button className="button cancel-button" onClick={handleClosePopup}>Cancel</button>
            </div>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default ProjectCard;