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
      [id]: value || "",
    }));
  };

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    const isChecked = event.target.checked;

    setProjectFormData((prevState) => {
      let updatedCategories = [...prevState.categories];

      if (isChecked) {
        // Add category if checked
        updatedCategories.push(categoryId);
      } else {
        // Remove category if unchecked
        updatedCategories = updatedCategories.filter((id) => id !== categoryId);
      }

      return {
        ...prevState,
        categories: updatedCategories,
      };
    });
  };

  // HANDLE IMAGE CHANGE
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setProjectFormData((prevData) => ({
      ...prevData,
      image: file, // Save the file object instead of base64
    }));

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProjectFormData((prevData) => ({
          ...prevData,
          previewImage: reader.result, // Use a separate field for previewing
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // HANDLE SUBMIT
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(projectFormData);

    const projectData = new FormData();
    projectData.append("title", projectFormData.title);
    projectData.append("description", projectFormData.description);
    projectData.append("treat_target", projectFormData.treat_target);

    // If there's an image, append it as a file
    if (projectFormData.image) {
      projectData.append("image", projectFormData.image);
    }

    // If categories are selected, append them to the FormData
    projectFormData.categories.forEach((categoryId) => {
      projectData.append("categories", categoryId);
    });

    const token = window.localStorage.getItem("token");
    if (!token) {
      alert("You must be logged in to create a project!");
      navigate("/login");
      return;
    }

    try {
      const response = await fetch(
        "https://beanefactor-97bb03940ca5.herokuapp.com/projects/create/",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: projectData, // Use FormData instead of JSON
        }
      );
      const result = await response.json();

      if (response.ok) {
        alert("Project created successfully!");
        navigate("/"); // Redirect to home page
      } else {
        alert(result.message || "Error creating project");
      }
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
        <label htmlFor="image">Image (optional):</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={handleImageChange} // Handle file change
        />
        {/* Display the uploaded image or a default image */}
        {projectFormData.previewImage && (
          <img
            src={projectFormData.previewImage} // Use previewImage here
            alt="Preview"
            style={{
              width: "100px",
              height: "100px",
              objectFit: "cover",
              marginTop: "10px",
            }}
          />
        )}
      </div>
      <div>
        <label htmlFor="categories">Categories (ew, cats!):</label>
        <div id="categories" className="categories-container">
          {categories.map((category) => (
            <div key={category.id} className="category-item">
              <input
                type="checkbox"
                id={`category-${category.id}`}
                value={category.id}
                checked={projectFormData.categories.includes(category.id)} // Check if the category is selected
                onChange={handleCategoryChange} // Handle checkbox click
              />
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
              {/* Optionally, display category description */}
              {category.description && <span>{category.description}</span>}
            </div>
          ))}
        </div>
      </div>
      <button type="submit">Create Project</button>
    </form>
  );
}

export default CreateProjectForm;
