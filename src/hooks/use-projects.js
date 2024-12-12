import { useState, useEffect } from "react";
import getProjects from "../api/get-projects"; // Your existing function to fetch projects

export default function useProjects() {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    getProjects()
      .then((projects) => {
        // Sort projects by treat_count (highest first)
        const sortedProjects = projects.sort(
          (a, b) => b.treat_count - a.treat_count
        );
        // Slice the first 6 projects
        setProjects(sortedProjects.slice(0, 6));
        setIsLoading(false);
      })
      .catch((error) => {
        setError(error);
        setIsLoading(false);
      });
  }, []);

  return { projects, isLoading, error };
}
