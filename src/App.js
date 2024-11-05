import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/HomePage';
import ProjectDetails from './pages/ProjectDetails';
import CreateProject from './pages/CreateProject';
import Dashboard from './pages/Dashboard';
import AnimatedBackground from './components/AnimatedBackground';
import LoginPage from './pages/LoginPage';


function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <AnimatedBackground />
        <Header />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<ProjectDetails />} />
            <Route path="/create-project" element={<CreateProject />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<LoginPage />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
