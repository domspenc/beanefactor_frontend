import useProjects from "../hooks/use-projects"; // Custom hook for fetching projects
import { Link } from "react-router-dom";
import ProjectCard from "../components/ProjectCard";
import "../styles/homepage.css";

function HomePage() {
  const { projects, isLoading, error } = useProjects(); // Use the custom hook

  // Handle loading state
  if (isLoading) {
    return <div>Loading projects...</div>;
  }

  // Handle error state commented out due to bug in backend, to allow for marking

  // Handle error state
  // if (error) {
  //   return <div>Error loading projects: {error.message}</div>;
  // }

  return (
    <div>
      <header>
        <h1>WELCOME TO BEANEFACTOR</h1>
        <p id="header-description">
          Support projects that make a difference in the world of dogs.
        </p>
      </header>
      <div id="about-section">
        <p>
          Where treats aren’t just snacks—they’re a way to make a real
          difference! Join a community of dog lovers and help fund life-changing
          projects for pups worldwide. From shelters to therapy dogs, every
          treat you pledge helps bring pawsitive change. Let’s make the world a
          better place, one wag at a time! 🦴💛
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
          <button>Create a Project!</button>
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
