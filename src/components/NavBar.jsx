import { Link, Outlet } from "react-router-dom";
import useAuth from "../hooks/use-auth.js";

function NavBar() {
  const { auth, setAuth } = useAuth();

  // console.log("Auth State in Navbar:", auth);

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        {/* <Link to="/login">Log In</Link> */}
        {auth.token ? (
          <Link to="/" onClick={handleLogout}>
            Log Out
          </Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
        <Link to="/signup">Sign Up!</Link>
        <Link to="/projects">Create Project!</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
