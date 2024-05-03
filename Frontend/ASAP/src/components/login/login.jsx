import React, { useState } from "react";
import axios from "axios";

export function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/login",
        formData
      );
      console.log(response.data); // Log the response for debugging

      document.cookie = `token=${response.data.token}; path=/`;
      setSubmitMessage("Login successful!"); // Show success message
      // You may want to redirect the user to another page upon successful login
      // window.location.href = "/dashboard";
    } catch (error) {
      console.error("Login failed:", error.response.data.message);
      setSubmitMessage("Login failed. Please check your email and password."); // Show error message
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}
