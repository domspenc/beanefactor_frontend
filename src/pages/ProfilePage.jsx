import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js"; // Custom hook for authentication

function ProfilePage() {
  const { auth } = useAuth(); // Get authentication details
  const [dogUser, setDogUser] = useState(null);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      navigate("/login");
      return;
    }

    // Fetch dogUser data
    fetch(`${import.meta.env.VITE_API_URL}/dogusers/${auth.dogUser.id}/`, {
      headers: {
        Authorization: `Token ${auth.token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setDogUser(data))
      .catch((error) => setError("Failed to load user information"));

    // Fetch the dog's projects
    fetch(
      `${import.meta.env.VITE_API_URL}/dogusers/${auth.dogUser.id}/projects/`,
      {
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => setProjects(data))
      .catch((error) => setError("Failed to load projects"));
  }, [auth.token, auth.dogUser.id, navigate]);

  const handleDeleteProject = (projectId) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      fetch(`${import.meta.env.VITE_API_URL}/projects/${projectId}/`, {
        method: "DELETE",
        headers: {
          Authorization: `Token ${auth.token}`,
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to delete project");
          }
          setProjects(projects.filter((project) => project.id !== projectId));
        })
        .catch((error) => setError("Error deleting project"));
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {dogUser ? (
        <>
          <p>Welcome, {dogUser.username}!</p>
          <h2>Your Projects</h2>
          {projects.length === 0 ? (
            <p>You have no projects yet.</p>
          ) : (
            <ul>
              {projects.map((project) => (
                <li key={project.id}>
                  <strong>{project.title}</strong>
                  <p>{project.description}</p>
                  <p>Treat Target: {project.treat_target}</p>
                  <button onClick={() => handleDeleteProject(project.id)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </>
      ) : (
        <p>{error ? error : "Loading your profile..."}</p>
      )}
    </div>
  );
}

export default ProfilePage;
