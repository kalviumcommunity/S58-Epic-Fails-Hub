import React from 'react';
import './navBar.css';
import { Link } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <div className="logo">
        <Link to="/">
        <h1>Epic Fails Hub</h1>
        </Link>
      </div>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/add-post">Add Post</Link></li>
        <li><Link to="/update-post">Update Post</Link></li>
        <li><Link to="/delete-post">Delete Post</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
    </nav>
  );
}
