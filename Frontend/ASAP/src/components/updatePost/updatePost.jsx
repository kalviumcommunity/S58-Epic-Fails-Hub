import React, { useState, useEffect } from "react";
import axios from "axios";

export function UpdatePost() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOption, setSearchOption] = useState("ID");
  const [searchResults, setSearchResults] = useState({});
  const [formData, setFormData] = useState({
    ID: "",
    Captions: "",
    Links: "",
  });
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    // Fetch all posts and store them in an object format
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/routes");
        const postsObject = {};
        response.data.forEach((post) => {
          postsObject[post.ID] = post;
        });
        setSearchResults(postsObject);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  const handleUpdateClick = (post) => {
    // Set the formData state with the selected post data
    setFormData(post);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!formData.Captions || !formData.Links) {
      setSubmitMessage("Please fill in all fields.");
      return;
    }
    try {
      // Send a request to update the post with formData
      await axios.put(
        `http://localhost:8080/routes/Update/${formData.ID}`,
        formData
      );
      setSubmitMessage("Post updated successfully!");
    } catch (error) {
      console.error("Update failed:", error);
      setSubmitMessage("An error occurred while updating the post.");
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    // Search for the post by ID
    const post = searchResults[searchQuery];
    if (post) {
      setSearchResults({ [searchQuery]: post });
    } else {
      setSearchResults({});
      setSubmitMessage("Post not found.");
    }
  };

  return (
    <div>
      <h2>Search for Post to Update</h2>
      <div>
        <select
          value={searchOption}
          onChange={(e) => setSearchOption(e.target.value)}
        >
          <option value="ID">ID</option>
        </select>
        <input
          type="text"
          placeholder={`Search by ${searchOption}`}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div>
        {Object.keys(searchResults).length > 0 ? (
          Object.values(searchResults).map((post) => (
            <div key={post.ID}>
              <p>ID: {post.ID}</p>
              <p>Caption: {post.Captions}</p>
              <p>Link: {post.Links}</p>
              <button onClick={() => handleUpdateClick(post)}>Update</button>
            </div>
          ))
        ) : (
          <p>No matching posts found.</p>
        )}
      </div>
      <h2>Update Post</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="Captions"
          value={formData.Captions}
          placeholder="Captions"
          onChange={handleChange}
        />
        <input
          type="text"
          name="Links"
          value={formData.Links}
          placeholder="Links"
          onChange={handleChange}
        />
        <button type="submit">Update Post</button>
      </form>
      {submitMessage && <p>{submitMessage}</p>}
    </div>
  );
}
