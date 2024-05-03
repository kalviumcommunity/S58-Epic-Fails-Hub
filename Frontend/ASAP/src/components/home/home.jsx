// home.jsx
import React, { useEffect, useState } from "react";
import "./home.css";
import { Link } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';

export function Home({ filteredCreator }) {
  const [data, setData] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/routes");
        setData(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    getData();
  }, []);

  const filteredData = filteredCreator ? data.filter(post => post.Created_By === filteredCreator) : data;

  return (
    <div className="container">
      <div className="entity-container">
        {filteredData &&
          filteredData.map((post) => (
            <div key={post.ID} className="entity-card">
              <h2>{post.ID}</h2>
              <img src={post.Links} alt="person" />
              <h3>Caption: {post.Captions}</h3>
              <h3>Created_By: {post.Created_By}</h3>
              <Link to={`/post/${post.ID}`}>View Post</Link>
            </div>
          ))}
      </div>
    </div>
  );
}

// Prop types validation
Home.propTypes = {
  filteredCreator: PropTypes.string,
};
