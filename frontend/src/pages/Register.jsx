import { useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
        "/auth/register",
        formData
      );

      alert(res.data.message);
      console.log(res.data);
    } catch (error) {
      alert(error.response?.data?.message || "Error");
    }
  };

  return (
    <>
      <Navbar />

      <div className="container">
        <h1>Register</h1>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            onChange={handleChange}
          />

          <br /><br />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <br /><br />

          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            onChange={handleChange}
          />

          <br /><br />

          <button type="submit">
            Register
          </button>
        </form>
      </div>
    </>
  );
}

export default Register;