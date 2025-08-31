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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProjectData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const goalAmount = parseFloat(projectData.goalAmount);
    const endDate = new Date(projectData.endDate);
    const today = new Date();

    if (goalAmount <= 0) {
      alert("Goal amount should be a positive number.");
      return;
    }
    if (endDate <= today) {
      alert("End date should be in the future.");
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
      alert("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Create a Project</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-lg p-8">
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
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
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full px-4 py-2 rounded-lg text-white ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'}`}
          disabled={loading}
        >
          {loading ? 'Creating Project...' : 'Create Project'}
        </button>
      </form>
    </div>
  );
};

export default CreateProject;