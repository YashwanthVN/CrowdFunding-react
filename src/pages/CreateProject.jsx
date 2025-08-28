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

  // ... rest of the component
};

export default CreateProject;