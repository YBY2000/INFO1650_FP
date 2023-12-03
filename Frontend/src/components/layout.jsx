// Layout.js

import React, { Component } from 'react';
import './layout.css'; // Import the CSS file for styling


const Layout = ({ children }) => {
  return (
    <div className="wrapper">
      <header>
      </header>
      {/* <header className="navbar">
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
            <Link to="/" className="nav-link">
              Example
            </Link>
          </li>
        </ul>
      </header> */}
      <main className="content-container">{children}</main>
      <footer className="footer">
        Final Project &copy; {new Date().getFullYear()} INFO 6150 group 5
      </footer>
    </div >
  );
};

export default Layout;