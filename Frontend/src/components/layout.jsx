// Layout.js

import React, { useState, useEffect } from 'react';
import './layout.css'; // Import the CSS file for styling
import { Navbar, Nav, Container } from 'react-bootstrap';

const Layout = ({ children }) => {

  return (
    <div className="wrapper">
      <header>
        <Navbar collapseOnSelect bg="light" expand="lg" className="bg-body-tertiary">
          <Container className='nav-container'>
            <img className='homepageLogo' height={50} src={process.env.PUBLIC_URL + '/favicon.png'} alt="Logo" />
            <Navbar.Brand className='nav-txt' href="/homepage"><b>React-Bootstrap</b></Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link className='nav-txt' href="/about"><b>About</b></Nav.Link>
              </Nav>
              {/* <Nav className='search-bar'>
                <Form className="d-flex" role="search">
                  <FormControl
                    type="search"
                    placeholder="Search..."
                    aria-label="Search"
                    id="searchInput"
                    style={{ width: 'auto' }}
                  />
                  <Button variant="outline-secondary" onClick={handleSearch}>
                    Search
                  </Button>
                </Form>
              </Nav> */}

              <Nav>
                <Nav.Link eventKey={2} href="#memes">
                  LOGIN / SIGNUP
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
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
      <main className="content-container">
        {/* Alert */}
        <section>
          <div class="alert alert-primary alert-dismissible fade show underNavbar" role="alert">
            <strong>We have some exciting new additions to our list of attractions.</strong>
            Be sure to explore the latest offerings by checking out the fields below.
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>
        </section>
        {children}
        </main>
      <footer className="footer">
        Final Project &copy; {new Date().getFullYear()} INFO 6150 group 5
      </footer>
    </div >
  );
};

export default Layout;