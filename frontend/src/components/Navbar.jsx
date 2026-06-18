import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav className="navbar">
      <div className="logo">
        <h2>TaskFlow</h2>
      </div>

      <div className="nav-links">
        {!token ? (
          <>
            <Link to="/">Login</Link>
            <Link to="/register">Register</Link>
          </>
        ) : (
          <>
            <Link to="/dashboard">Dashboard</Link>

            <button
              className="logout-btn"
              onClick={logoutHandler}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
