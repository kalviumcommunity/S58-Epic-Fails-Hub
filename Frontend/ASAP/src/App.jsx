import "./App.css";
import React from "react";
import { Navbar } from "./components/navBar/navBar";
import { Home } from "./components/home/home";
import { AddPost } from "./components/addPost/addPost";
import { Route, Routes } from "react-router-dom";
import { UpdatePost } from "./components/updatePost/updatePost";
import { SinglePost } from "./components/singlePost/singlePost";
import { DeletePost } from "./components/deletePost/deletePost";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add-post" element={<AddPost />} />
        <Route path="/update-post" element={<UpdatePost />} />
        <Route path="/delete-post" element={<DeletePost />} />
        <Route path="/post/:id" element={<SinglePost />} />
      </Routes>
    </>
  );
}

export default App;
