async function postProject(projectData, token) {
  const url = `${import.meta.env.VITE_API_URL}/projects/create/`;
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`, // Pass token for authentication
      },
      body: JSON.stringify(projectData), // Send the project data
    });

    if (!response.ok) {
      const data = await response.json();
      const errorMessage = data?.detail ?? "Error creating project";
      throw new Error(errorMessage);
    }

    return await response.json(); // Return the created project response
  } catch (error) {
    console.error("Project creation failed:", error);
    throw error; // Rethrow to handle in the calling component
  }
}

export default postProject;
