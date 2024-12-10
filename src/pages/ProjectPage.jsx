import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuth from "../hooks/use-auth.js"; // To check if user is logged in
import "../styles/projectpage.css"; // Optional: Add styling if needed

function ProjectPage() {
  const { projectId } = useParams(); // Get project ID from URL
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [pledgeAmount, setPledgeAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState(null);

  const handlePledgeSubmit = (event) => {
    event.preventDefault();

    // If the user is not logged in, navigate to login
    if (!auth.token) {
      navigate("/login", { state: { redirectTo: `/project/${projectId}` } });
      return;
    }

    // Send the pledge request to the backend
    const pledgeData = {
      treats_pledged: pledgeAmount,
      comment: comment,
      anonymous: anonymous,
      project: projectId,
    };

    fetch("https://beanefactor-97bb03940ca5.herokuapp.com/treatpledges/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${auth.token}`, // Include the token for authentication
      },
      body: JSON.stringify(pledgeData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to pledge treats");
        }
        return response.json();
      })
      .then((data) => {
        alert("Pledge successful!");
        // Optionally, refresh project data or update UI here
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  return (
    <div>
      <h1>Project Details</h1>
      {/* Project details section */}
      {/* ... */}

      {/* Pledge Form */}
      <h2>Pledge Treats</h2>
      <form onSubmit={handlePledgeSubmit}>
        <div>
          <label htmlFor="treatAmount">Treat Amount:</label>
          <input
            type="number"
            id="treatAmount"
            min="1"
            value={pledgeAmount}
            onChange={(e) => setPledgeAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="comment">Comment (optional):</label>
          <textarea
            id="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>

        <div>
          <label>
            <input
              type="checkbox"
              checked={anonymous}
              onChange={(e) => setAnonymous(e.target.checked)}
            />
            Stay Anonymous
          </label>
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Pledge</button>
      </form>
    </div>
  );
}

export default ProjectPage;
