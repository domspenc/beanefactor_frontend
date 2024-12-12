// src/pages/HomePage.jsx
import useProjects from "../hooks/use-projects"; // Custom hook for fetching projects
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";

function HomePage() {
  const { projects, isLoading, error } = useProjects(); // Use the custom hook

  // Handle loading state
  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  // Handle error state
  if (error) {
    return <div>Error loading projects: {error.message}</div>;
  }

  return (
    <div>
      <header>
        <h1>Welcome to Beanefactor!</h1>
        <p>Support projects that make a difference in the world of dogs.</p>
      </header>
      <div id="about-section">
        <p>
          This is a crowdfunding platform where dogs can support creative
          projects that aim to make the world a better place for other dogs.
          Each project has a treat target, and you can pledge treats to show
          your support. Help us make a difference, one treat at a time!
        </p>
      </div>
      <div id="project-list">
        {projects.map((projectData, key) => (
          <Link key={key} to={`/project/${projectData.id}`}>
            {/* Wrap the entire ProjectCard component with Link */}
            <ProjectCard projectData={projectData} />
          </Link>
        ))}
      </div>
      <div id="create-project-button">
        <Link to="/projects/create">
          {/* Use Link to navigate to create project page */}
          <button>Create a Project!</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
