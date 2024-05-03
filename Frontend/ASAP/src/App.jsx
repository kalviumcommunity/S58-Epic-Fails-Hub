import "./App.css";
import React from "react";
import { Navbar } from "./components/navBar/navBar";
import { Home } from "./components/home/home";
import { AddPost } from "./components/addPost/addPost";
import { Route, Routes } from "react-router-dom";
import { UpdatePost } from "./components/updatePost/updatePost";
import { SinglePost } from "./components/singlePost/singlePost";
import { DeletePost } from "./components/deletePost/deletePost";

// Module 15
import { Login } from "./components/login/login";
import { Signup } from "./components/signup/signup";
import { Logout } from "./components/logout/logout";

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
        {/* Module 15 */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </>
  );
}

export default App;
