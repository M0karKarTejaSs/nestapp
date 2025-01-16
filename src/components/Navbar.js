import React from "react";
// import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa"; // Icons for functionality
import "../App.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">Dashboard</h1>
      </div>
      <div className="navbar-right">
        <div className="search-bar">
          {/* <FaSearch className="search-icon" /> */}
          <input type="text" placeholder="Search..." />
        </div>
        <div className="icons">
          {/* <FaBell className="icon" title="Notifications" />
          <FaUserCircle className="icon" title="Profile" /> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
