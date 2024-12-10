import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import postProject from "../api/post-project.js";

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
  const [categories, setCategories] = useState([]); // State to store categories
  const [projectFormData, setProjectFormData] = useState({
    title: "",
    description: "",
    treat_target: "",
    image: "", // Optional field
    categories: [], // Array to hold selected categories
  });
  const navigate = useNavigate();

  // Fetch categories from backend when the component mounts
  useEffect(() => {
    fetch("https://beanefactor-97bb03940ca5.herokuapp.com/categories/")
      .then((response) => response.json())
      .then((data) => setCategories(data)) // Save categories to state
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (event) => {
    const { id, value } = event.target;
    setProjectFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleCategoryChange = (event) => {
    const { options } = event.target;
    const selectedCategories = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => option.value);
    setProjectFormData((prevData) => ({
      ...prevData,
      categories: selectedCategories,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const projectData = {
      ...projectFormData,
      treat_target: parseInt(projectFormData.treat_target, 10),
    };

    if (projectFormData.image === "") {
      delete projectData.image;
    }

    const result = projectSchema.safeParse(projectData);

    if (!result.success) {
      const error = result.error.errors?.[0];
      alert(error.message); // Show error to user
      return; // Stop the form submission
    }

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
      <div>
        <label htmlFor="categories">Categories:</label>
        <select
          id="categories"
          multiple
          value={projectFormData.categories}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;
