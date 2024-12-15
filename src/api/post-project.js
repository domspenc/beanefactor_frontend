// post-project.js
// async function postProject(projectData, token) {
//   const url = `${import.meta.env.VITE_API_URL}/projects/create/`; // Changed endpoint
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Token ${token}`, // Send the token for authentication
//     },
//     body: JSON.stringify(projectData), // Send the project data
//   });

//   if (!response.ok) {
//     const data = await response.json();
//     console.log("Error response:", data); // Log error details for debugging
//     const fallbackError = "Error creating project";
//     const errorMessage = data?.detail ?? fallbackError;
//     throw new Error(errorMessage);
//   }

//   return await response.json(); // Return the created project response
// }

// export default postProject;

const postProject = async (projectData, token) => {
  const formData = new FormData();

  // Append fields to form data
  for (const key in projectData) {
    if (key === "categories") {
      projectData[key].forEach((category) =>
        formData.append("categories", category)
      );
    } else {
      formData.append(key, projectData[key]);
    }
  }

  const response = await fetch(
    "https://beanefactor-97bb03940ca5.herokuapp.com/projects/create/",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${token}`,
      },
      body: formData, // Use FormData instead of JSON
    }
  );

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.detail || "Failed to create project");
  }

  return response.json();
};

export default postProject;
