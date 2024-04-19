import React from "react";
import "./home.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/routes");
      setData(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="container">
        <div className="entity-container">
          {data && data.map((e, index) => (
            <div key={index} className="entity-card">
              <h2>{e.ID}</h2>
              <img id="img-src" src={e.Links} alt="person" />

              <h3>Captions:{e.Captions}</h3>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
export default Home;
