import React, { useState } from "react";
import axios from "axios";

export function AddPost() {
  const [formData, setFormData] = useState({
    ID: "",
    Captions: "",
    Links: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post("http://localhost:8080/routes/Create", formData);
      setSubmitMessage("Submission successful!"); // Show success message
      setFormData({ ID: "", Captions: "", Links: "" }); // Clear form
      setTimeout(() => {
        setSubmitMessage(""); // Clear message after 3 seconds
      }, 3000);
    } catch (error) {
      console.error(error);
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
      <h2>Submit New Post</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID:</label>
          <input
            type="text"
            name="ID"
            value={formData.ID}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Caption:</label>
          <input
            type="text"
            name="Captions"
            value={formData.Captions}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Link:</label>
          <input
            type="text"
            name="Links"
            value={formData.Links}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Submit</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}
