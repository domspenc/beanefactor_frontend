// import { Link } from "react-router-dom";
import "../styles/projectcard.css";

function ProjectCard({ projectData }) {
  const projectLink = `/project/${projectData.id}`;

  // Calculate progress
  const percentage = Math.min(
    (projectData.treat_count / projectData.treat_target) * 100,
    100
  );
  const validPercentage = isNaN(percentage) ? 0 : percentage; // Handle NaN cases
  console.log(projectData);

  return (
    <div className="project-card">
      <img src={projectData.image} alt={projectData.title} />
      <h3>{projectData.title}</h3>
      <p>{projectData.description}</p>
      <div className="progress-bar">
        <div
          className="progress"
          style={{
            width: `${validPercentage}%`, // Use valid percentage
          }}
        >
          {`${validPercentage.toFixed(1)}%`}
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
