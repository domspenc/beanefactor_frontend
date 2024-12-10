import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js"; // To check if user is logged in
import postTreatPledge from "../api/post-treatpledge.js"; // Import the API function

function ProjectDetailPage() {
  const { id } = useParams(); // Get 'id' from the URL
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [project, setProject] = useState(null); // State to store project details
  const [pledgeAmount, setPledgeAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);
  const [error, setError] = useState(null);

  // Fetch project details when component mounts
  useEffect(() => {
    if (!id) return; // Prevent fetch if id is undefined

    console.log("Fetching project details for id:", id); // Debugging log

    fetch(`${import.meta.env.VITE_API_URL}/projects/${id}/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch project details");
        }
        return response.json();
      })
      .then((data) => setProject(data))
      .catch((error) => {
        console.error("Error fetching project details:", error);
      });
  }, [id]);

  // Handle pledge submission
  const handlePledgeSubmit = async (event) => {
    event.preventDefault();

    if (!auth.token) {
      navigate("/login", { state: { redirectTo: `/project/${id}` } });
      return;
    }

    const pledgeData = {
      treats_pledged: pledgeAmount,
      comment: comment,
      anonymous: anonymous,
      project: id, // Using 'id' for the project field
    };

    try {
      await postTreatPledge(pledgeData, auth.token); // Use the API function
      alert("Pledge successful!");
      setPledgeAmount(0); // Reset form fields
      setComment("");
      setAnonymous(false);
      // Optionally, refresh project data or update the UI here
    } catch (error) {
      setError(error.message);
      console.error("Error submitting treat pledge:", error.message);
    }
  };

  return (
    <div>
      {project ? (
        <>
          <h1>{project.title}</h1>
          <p>{project.description}</p>
          <div>
            <strong>Treats Pledged: {project.treat_count}</strong> /{" "}
            {project.treat_target}
          </div>

          <div className="progress-bar">
            <div
              className="progress"
              style={{
                width: `${Math.min(
                  (project.treat_count / project.treat_target) * 100,
                  100
                )}%`,
              }}
            >
              {`${Math.min(
                (project.treat_count / project.treat_target) * 100,
                100
              ).toFixed(1)}%`}
            </div>
          </div>

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
        </>
      ) : (
        <p>Loading project details...</p>
      )}
    </div>
  );
}

export default ProjectDetailPage;