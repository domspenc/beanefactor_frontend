import { Link, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";
import logo from "../beanefactor.png";
import { useState } from "react"; // Import useState for toggling the hamburger menu

function NavBar() {
  const { auth, setAuth } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false); // State to track menu visibility

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
    navigate("/"); // Redirect to homepage after logout
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen); // Toggle the state when the hamburger is clicked
  };

  return (
    <div>
      <nav>
        <Link to="/" className="logo-link">
          <img src={logo} alt="Beanefactor Logo" className="logo" />
        </Link>
        {/* Add the 'active' class if the menu is open */}
        <div className={`nav-links ${isMenuOpen ? "active" : ""}`}>
          <Link to="/about">About</Link>
          <Link to="/projects">Projects</Link>
          {auth.token && (
            <>
              <Link to="/" onClick={handleLogout}>
                Log Out
              </Link>
            </>
          )}
          {!auth.token && <Link to="/login">Login</Link>}
          {!auth.token && <Link to="/signup">Sign Up!</Link>}
        </div>
        {/* Hamburger icon */}
        <div className="hamburger" onClick={toggleMenu}>
          <div className="bar"></div>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
