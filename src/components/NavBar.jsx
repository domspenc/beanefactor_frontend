import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/login">Log In</Link>
        <Link to="/login">Sign Up!</Link>
      </nav>
      <Outlet />
    </div>
  );
}

export default NavBar;
