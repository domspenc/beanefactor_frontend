import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import logo from "../../public/beanefactor.png";

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
        {/* <Link to="/" src>
          Home
        </Link> */}
        <Link to="/" className="logo-link">
          <img src={logo} alt="Beanefactor Logo" className="logo" />
        </Link>
        <Link to="/about">About</Link>
        <Link to="/projects">Projects</Link>
        {auth.token && (
          <>
            <Link to="/dogusers">Profile</Link> {/* Profile link */}
            <Link to="/" onClick={handleLogout}>
              Log Out
            </Link>
          </>
        )}
        {!auth.token && <Link to="/login">Login</Link>}
        {!auth.token && <Link to="/signup">Sign Up!</Link>}
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
