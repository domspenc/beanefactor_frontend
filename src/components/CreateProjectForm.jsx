import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import postProject from "../api/post-project.js"; // API call to create the project

// Zod schema for project validation
const projectSchema = z.object({
  title: z.string().min(1, { message: "Title must not be empty" }),
  description: z.string().min(1, { message: "Description must not be empty" }),
  treat_target: z
    .number()
    .min(1, { message: "Treat target must be greater than 0" }),
  image: z.string().url().optional(), // Optional image URL
});

function CreateProjectForm() {
  const navigate = useNavigate();
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    treat_target: "",
    image: "", // Optional field
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Prepare data to send, remove image if empty
    const projectData = {
      ...projectFormData,
      treat_target: parseInt(projectFormData.treat_target, 10), // Convert to number
    };

    // If image is empty, remove it from the request
    if (projectFormData.image === "") {
      delete projectData.image;
    }

    console.log("Data to send:", projectData);
    const result = projectSchema.safeParse(projectData);

    if (!result.success) {
      const error = result.error.errors?.[0];
      if (error) {
        alert(error.message);
      }
      return;
    } else {
      const token = window.localStorage.getItem("token");
      if (!token) {
        alert("You must be logged in to create a project!");
        navigate("/login");
        return;
      }

      try {
        await postProject(result.data, token);
        alert("Project created successfully!");
        navigate("/"); // Redirect to home page
      } catch (error) {
        alert(error.message); // Handle project creation errors
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          placeholder="Enter project title"
          value={projectFormData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <textarea
          id="description"
          placeholder="Enter project description"
          value={projectFormData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="treat_target">Treat Target:</label>
        <input
          type="number"
          id="treat_target"
          placeholder="Enter treat target"
          value={projectFormData.treat_target}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor="image">Image URL (optional):</label>
        <input
          type="url"
          id="image"
          placeholder="Enter image URL"
          value={projectFormData.image}
          onChange={handleChange}
        />
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;
