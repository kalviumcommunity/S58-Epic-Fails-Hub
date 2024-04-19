import React from 'react';
import './navBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">
        <h1>Epic Fails Hub</h1>
      </div>
      <ul className="nav-links">
        <li><a href="#">Home</a></li>
        <li><a href="#">About</a></li>
        <li><a href="#">Services</a></li>
        <li><a href="#">Contact</a></li>
      </ul>
    </nav>
  );
}

export default Navbar;