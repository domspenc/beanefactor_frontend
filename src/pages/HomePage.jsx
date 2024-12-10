// import useProjects from "../hooks/use-projects";
// import ProjectCard from "../components/ProjectCard";
// import "../styles/homepage.css";

// function HomePage() {
//   const { projects } = useProjects();
//   return (
//     <div>
//       <h1>Welcome to Beanefactor</h1>
//       <div id="project-list">
//         {projects.map((projectData, key) => {
//           return <ProjectCard key={key} projectData={projectData} />;
//         })}
//       </div>
//     </div>
//   );
// }

// export default HomePage;

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
      <h1>Welcome to Beanefactor</h1>
      <div id="project-list">
        {projects.map((projectData, key) => (
          <Link key={key} to={`/project/${projectData.id}`}>
            {/* Wrap the entire ProjectCard component with Link */}
            <ProjectCard projectData={projectData} />
          </Link>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
