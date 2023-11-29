// Layout.js

import React from 'react';
import './layout.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <header className="navbar">
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/about" className="nav-link">
              About Us
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-link">
              Contact
            </Link>
          </li>
        </ul>
      </header>
      <main className="content-container">{children}</main>
      <footer className="footer">
        &copy; {new Date().getFullYear()} Your Company Name
      </footer>
    </div>
  );
};

export default Layout;
