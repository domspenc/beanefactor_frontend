import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth";
import CreateProjectForm from "../components/CreateProjectForm"; // Import the CreateProjectForm
import "../styles/createproject.css";
import "../styles/createprojectform.css";

function CreateProjectPage() {
  const { auth } = useAuth(); // Access the auth context to check if the user is logged in
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.token) {
      // If the user is not logged in, redirect them to the login page
      navigate("/login");
    }
  }, [auth.token, navigate]); // Dependencies ensure this only runs when necessary

  if (!auth.token) {
    // Prevent rendering the page content while redirecting
    return null;
  }

  return (
    <div>
      <h2>Create a New Project</h2>
      <CreateProjectForm /> {/* Show the form only if logged in */}
    </div>
  );
}

export default CreateProjectPage;
