import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/projectpage.css"; // CSS for project listing

function ProjectPage() {
  const navigate = useNavigate();

  const [projects, setProjects] = useState([]); // To store the list of projects
  const [error, setError] = useState(null);

  // Fetch all active projects from the API when the page loads
  useEffect(() => {
    fetch("https://beanefactor-97bb03940ca5.herokuapp.com/projects/")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch projects");
        }
        return response.json();
      })
      .then((data) => setProjects(data))
      .catch((error) => {
        console.error("Error fetching projects:", error);
        setError(error.message);
      });
  }, []);

  // Navigate to project details page
  const handleProjectClick = (id) => {
    navigate(`/project/${id}`);
  };

  // Calculate progress percentage
  const calculateProgress = (treatCount, treatTarget) => {
    if (treatTarget === 0 || treatCount === 0) return 0; // Avoid division by zero
    return (treatCount / treatTarget) * 100;
  };

  return (
    <div className="project-list">
      <h1>Projects</h1>
      {error && <p className="error">{error}</p>}

      {/* List of projects */}
      <div className="projects-grid">
        {projects.length > 0 ? (
          projects.map((project) => {
            const progress = calculateProgress(
              project.treat_count,
              project.treat_target
            );

            return (
              <div
                key={project.id}
                className="project-card"
                onClick={() => handleProjectClick(project.id)}
              >
                {project.image && (
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image"
                  />
                )}
                <h2>{project.title}</h2>
                <p>
                  {project.treat_count} / {project.treat_target} treats pledged
                </p>
                <p className="categories">
                  Categories: {project.categories.join(", ")}
                </p>

                {/* Progress Bar */}
                <div className="progress-container">
                  <div
                    className="progress-bar"
                    style={{ width: `${progress}%` }}
                  ></div>
                </div>
                <p className="progress-text">
                  {Math.round(progress, 100)}% funded
                </p>
              </div>
            );
          })
        ) : (
          <p>No active projects found.</p>
        )}
      </div>
    </div>
  );
}

export default ProjectPage;
