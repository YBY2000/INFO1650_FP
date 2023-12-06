// Layout.js

import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProfileDropdown from './profile-dropdown/profile-dropdown.component';
import './layout.css'; // Import the CSS file for styling
import useAuth from '../hooks/useAuth';

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;
  const [token, setToken] = useState(null);

  const [isLoggedIn, setLoggedIn] = useState(false); // Replace with your actual authentication logic
  const { isAuthenticated, avatar, username, email, userType } = useAuth();



  // Use useEffect to handle side effects when the component mounts
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
      setLoggedIn(true);
    }
  }, []);



  return (
    <div className="wrapper">
      <header>
        {/* Navbar */}
        <Navbar bg="light" expand="lg" className='nav-bar'>
          <Navbar.Brand href="/home">
            <img className='homepageLogo' height={50} src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" className='nav-toggle' />
          <Navbar.Collapse id="navbarSupportedContent" className='nav-collapse'>
            <Nav className="me-auto">
              <Nav.Link className='nav-txt' href="/home"><b>Home</b></Nav.Link>
              <Nav.Link className='nav-txt' href="/about"><b>About</b></Nav.Link>
            </Nav>
            <hr></hr>
            <div className='nav-profile'>
              {isLoggedIn ? (
                <ProfileDropdown />
              ) : (
                !(location.pathname === '/login') && (<Link to="/login" className="d-block link-body-emphasis text-decoration-none">
                  LOGIN/SIGNUP
                </Link>)
              )}
            </div>

          </Navbar.Collapse>
        </Navbar>
      </header>

      <main className="content-container">{children}</main>
      <footer className="footer">
        Final Project &copy; {new Date().getFullYear()} INFO 6150 group 5
      </footer>
    </div >
  );
};

export default Layout;