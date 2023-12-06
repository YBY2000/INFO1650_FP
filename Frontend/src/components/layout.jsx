// Layout.js

import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import ProfileDropdown from './profile-dropdown/profile-dropdown.component';
import './layout.css'; // Import the CSS file for styling

const Layout = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const [isLoggedIn, setLoggedIn] = useState(false); // Replace with your actual authentication logic
  const [user, setUser] = useState(null);


  // Use useEffect to handle side effects (fetch data) when the component mounts
  useEffect(() => {
    const fetchUserData = () => {// Retrieve data from localStorage
      var token = localStorage.getItem('token');
      var avatar = localStorage.getItem('avatar');
      var fullName = localStorage.getItem('fullName');
      if (token && avatar && fullName) {
        var data = {
          token: token,
          avatar: avatar,
          fullName: fullName
        };

        // Stringify the JSON object and store it in localStorage
        localStorage.setItem('userData', JSON.stringify(data));
        setLoggedIn(true); // Set isLoggedIn to true if user data is found


        var userDataString = localStorage.getItem('userData');
        var userData = JSON.parse(userDataString);
        setUser(userData);
      }
    };

    // Call the function to fetch user data when the component mounts
    fetchUserData();
  }, []);



  return (
    <div className="wrapper">
      <header>
        {/* Navbar */}
        <Navbar bg="light" expand="lg" className='nav-bar'>
          <Navbar.Brand href="/homepage">
            <img className='homepageLogo' height={50} src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarSupportedContent" className='nav-toggle' />
          <Navbar.Collapse id="navbarSupportedContent" className='nav-collapse'>
            <Nav className="me-auto">
              <Nav.Link className='nav-txt' href="/homepage"><b>Home</b></Nav.Link>
              <Nav.Link className='nav-txt' href="/about"><b>About</b></Nav.Link>
            </Nav>
            <div className='nav-profile'>
              {isLoggedIn ? (
                <ProfileDropdown userInfo={user} />
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