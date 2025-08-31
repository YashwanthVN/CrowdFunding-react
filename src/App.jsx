import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import CreateProject from "./pages/CreateProject.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProjectDetails from "./pages/ProjectDetails.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import ScrollSections from "./components/ScrollSections.jsx";
import ErrorBoundary from "./components/ErrorBoundary.jsx";

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <div className="min-h-screen flex flex-col bg-gray-100"> {/* Added bg-gray-100 as fallback */}
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/create-project" element={<CreateProject />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/project/:id" element={<ProjectDetails />} />
              <Route path="/scroll" element={<ScrollSections />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </ErrorBoundary>
    </BrowserRouter>
  );
}

export default App;