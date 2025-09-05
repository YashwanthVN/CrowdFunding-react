import { useState } from "react";
import { createProject } from "../utils/api.js";

const CreateProject = () => {
  const [projectData, setProjectData] = useState({
    title: "",
    description: "",
    goalAmount: "",
    endDate: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");

    const goalAmount = parseFloat(projectData.goalAmount);
    const endDate = new Date(projectData.endDate);
    const today = new Date();

    if (goalAmount <= 0) {
      setErrorMessage("Goal amount should be a positive number.");
      return;
    }
    if (endDate <= today) {
      setErrorMessage("End date should be in the future.");
      return;
    }

    const formattedData = {
      title: projectData.title,
      description: projectData.description,
      goal_amount: goalAmount,
      end_date: projectData.endDate,
    };

    setLoading(true);

    try {
      const response = await createProject(formattedData);
      alert(response.message || "Project created successfully");
      setProjectData({ title: "", description: "", goalAmount: "", endDate: "" });
    } catch (error) {
      console.error("Error creating project:", error);
      setErrorMessage("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Create a Project</h1>
      <form onSubmit={handleSubmit} className="form-container space-y-4">
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        {/* Title Input */}
        <div>
          <label htmlFor="title" className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={projectData.title}
            onChange={handleChange}
            required
            className="input-field w-full"
            placeholder="Enter project title"
          />
        </div>

        {/* Description Input */}
        <div>
          <label htmlFor="description" className="block mb-1 font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            value={projectData.description}
            onChange={handleChange}
            required
            className="input-field w-full"
            rows="4"
            placeholder="Describe your project"
          ></textarea>
        </div>

        {/* Goal Amount Input */}
        <div>
          <label htmlFor="goalAmount" className="block mb-1 font-medium">Goal Amount</label>
          <input
            type="number"
            id="goalAmount"
            name="goalAmount"
            value={projectData.goalAmount}
            onChange={handleChange}
            required
            className="input-field w-full"
            placeholder="Enter goal amount"
          />
        </div>

        {/* End Date Input */}
        <div>
          <label htmlFor="endDate" className="block mb-1 font-medium">End Date</label>
          <input
            type="date"
            id="endDate"
            name="endDate"
            value={projectData.endDate}
            onChange={handleChange}
            required
            className="input-field w-full"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`auth-button w-full ${loading ? 'loading' : ''}`}
          disabled={loading}
        >
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;