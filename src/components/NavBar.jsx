import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate(); // Add navigation hook

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
    navigate("/"); // Redirect to homepage after logout
  };

  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {!auth.token && <Link to="/signup">Sign Up!</Link>}
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
