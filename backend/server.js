const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

let projects = []; // In-memory storage

// Get all projects
app.get('/projects', (req, res) => {
  res.json(projects);
});

// Create a new project
app.post('/projects', (req, res) => {
  const newProject = {
    id: projects.length + 1,
    ...req.body,
    currentAmount: 0, // Default current funding
  };
  projects.push(newProject);
  res.json(newProject);
});

// Get a project by ID
app.get('/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === parseInt(req.params.id));
  if (project) {
    res.json(project);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// Update a project
app.put('/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    projects[index] = { ...projects[index], ...req.body };
    res.json(projects[index]);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// Delete a project
app.delete('/projects/:id', (req, res) => {
  const index = projects.findIndex(p => p.id === parseInt(req.params.id));
  if (index !== -1) {
    projects.splice(index, 1);
    res.json({ message: "Project deleted" });
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// Dashboard data (e.g., total projects, funded, etc.)
app.get('/dashboard', (req, res) => {
  const totalProjects = projects.length;
  const fundedProjects = projects.filter(p => p.currentAmount >= p.goal_amount).length;
  const totalFundsRaised = projects.reduce((sum, p) => sum + p.currentAmount, 0);
  const avgFundingPercentage = totalProjects > 0 ? (fundedProjects / totalProjects) * 100 : 0;
  res.json({
    totalProjects,
    fundedProjects,
    totalFundsRaised,
    avgFundingPercentage,
  });
});

// Funded projects
app.get('/projects/funded', (req, res) => {
  const funded = projects.filter(p => p.currentAmount >= p.goal_amount);
  res.json(funded);
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));