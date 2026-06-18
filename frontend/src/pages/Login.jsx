import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Login() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post(
        "/auth/login",
        formData
      );

      localStorage.setItem(
        "token",
        res.data.token
      );

      alert("Login Successful");

      navigate("/dashboard");
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Login Failed"
      );
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Login</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />

          <br />
          <br />

          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />

          <br />
          <br />

          <button type="submit">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;