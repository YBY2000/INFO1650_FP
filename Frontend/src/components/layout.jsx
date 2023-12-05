// Layout.js

import React, { useState, useEffect } from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProfileDropdown from './profile-dropdown/profile-dropdown.component';
import './layout.css'; // Import the CSS file for styling

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const currentPath = window.location.pathname;

  const [isLoggedIn, setLoggedIn] = useState(false); // Replace with your actual authentication logic
  const [user, setUser] = useState(null); 


  // Use useEffect to handle side effects (fetch data) when the component mounts
  useEffect(() => {
    const fetchUserData = () => {
      const storedUser = localStorage.getItem('userInfo');
      if (storedUser) {
        // If user data is found in localStorage, parse and set it in the state
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setLoggedIn(true); // Set isLoggedIn to true if user data is found
      }
    };

    // Call the function to fetch user data when the component mounts
    fetchUserData();
  }, []);


  const handleLogOut = () => {
    window.localStorage.removeItem("userInfo");
    setLoggedIn(false); // Set isLoggedIn to false when the user logs out
    window.location.href = 'login.html';
  };


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
              <Nav.Link className='nav-txt' href="/homepage"><b>React-Bootstrap</b></Nav.Link>
              <Nav.Link className='nav-txt' href="/about"><b>About</b></Nav.Link>
            </Nav>
            {/* {currentPath === '/homepage' && (
              <Nav className='search-bar'>
                <Form className="d-flex" role="search">
                  <FormControl
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    id="searchInput"
                    style={{ width: 'auto' }}
                  />
                  <Button variant="outline-secondary" onClick={handleSearch}></Button>
                </Form>
              </Nav>
            )} */}
            <div className='nav-profile'>
              {true ? (
                <ProfileDropdown />
              ) : (
                <a href="login.html" className="d-block link-body-emphasis text-decoration-none">
                  LOGIN/SIGNUP
                </a>
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