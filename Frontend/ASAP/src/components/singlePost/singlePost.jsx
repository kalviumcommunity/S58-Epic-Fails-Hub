import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export function SinglePost() {
  const { id } = useParams();
  const [posts, setPosts] = useState({});
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/routes");
        setPosts(response.data.reduce((acc, curr) => {
          acc[curr.ID] = curr;
          return acc;
        }, {}));
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (id && posts[id]) {
      setPost(posts[id]);
    } else {
      setPost(null);
    }
  }, [id, posts]);

  return (
    <div>
      {post ? (
        <div className="entity-card">
          <h2>{post.ID}</h2>
          <img src={post.Links} alt="person" />
          <h3>Caption: {post.Captions}</h3>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
