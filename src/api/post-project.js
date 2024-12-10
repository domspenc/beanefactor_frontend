// post-project.js
async function postProject(projectData, token) {
  const url = `${import.meta.env.VITE_API_URL}/projects/create/`; // Changed endpoint
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${token}`, // Send the token for authentication
    },
    body: JSON.stringify(projectData), // Send the project data
  });

  if (!response.ok) {
    const data = await response.json();
    console.log("Error response:", data); // Log error details for debugging
    const fallbackError = "Error creating project";
    const errorMessage = data?.detail ?? fallbackError;
    throw new Error(errorMessage);
  }

  return await response.json(); // Return the created project response
}

export default postProject;
