const express = require('express');
const cors = require('cors');
const fs = require('fs'); // Added fs module
const path = require('path');
const app = express();

app.use(cors()); // Allow frontend requests
app.use(express.json()); // Parse JSON bodies

let projects = []; // In-memory storage, initialized from file

// Load projects from file on startup
const loadProjects = () => {
  try {
    const data = fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8');
    projects = JSON.parse(data) || [];
    console.log("Loaded projects from projects.json:", projects);
  } catch (error) {
    console.error("Error loading projects.json on startup:", error.message);
    projects = []; // Default to empty array if file is missing or invalid
  }
};

loadProjects(); // Initial load

// Get all projects
app.get('/projects', (req, res) => {
  console.log("Serving /projects");
  try {
    const projectsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'projects.json'), 'utf8'));
    console.log("Parsed projects:", projectsData);
    res.json(projectsData);
  } catch (error) {
    console.error("Error reading projects.json:", error.message);
    res.status(500).json({ error: "Failed to read projects data" });
  }
});

// Create a new project
app.post('/projects', (req, res) => {
  const newProject = {
    id: projects.length + 1,
    ...req.body,
    currentAmount: 0, // Default current funding
  };
  projects.push(newProject);
  // Save to file
  fs.writeFileSync(path.join(__dirname, 'projects.json'), JSON.stringify(projects, null, 2));
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
    fs.writeFileSync(path.join(__dirname, 'projects.json'), JSON.stringify(projects, null, 2));
    res.json(projects[index]);
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// Support a project (increment currentAmount)
app.patch('/projects/:id', (req, res) => {
  const projectId = parseInt(req.params.id);
  const index = projects.findIndex(p => p.id === projectId);
  if (index !== -1) {
    const amountToAdd = parseInt(req.body.amountToAdd) || 100; // Default to $100 if not specified
    projects[index].currentAmount = Math.max(0, (projects[index].currentAmount || 0) + amountToAdd);
    fs.writeFileSync(path.join(__dirname, 'projects.json'), JSON.stringify(projects, null, 2));
    console.log(`Supported project ${projectId}, new currentAmount: ${projects[index].currentAmount}`);
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
    fs.writeFileSync(path.join(__dirname, 'projects.json'), JSON.stringify(projects, null, 2));
    res.json({ message: "Project deleted" });
  } else {
    res.status(404).json({ message: "Project not found" });
  }
});

// Dashboard data
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