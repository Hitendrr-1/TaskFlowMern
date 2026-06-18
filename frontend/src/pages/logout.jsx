import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav>
      <h2>TaskFlow</h2>

      <div>
        <Link to="/">Login</Link>

        <Link to="/register">
          Register
        </Link>

        <Link to="/dashboard">
          Dashboard
        </Link>

        <button onClick={logoutHandler}>
          Logout
        </button>
      </div>
    </nav>
  );
}

export default Navbar;