import React, { Component } from 'react';
import './search-bar.style.css'
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

class SearchBar extends Component {
    render() {
        return (
            <div>
                <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
                    <Container>
                        <Navbar.Brand href="/">
                            <img
                                alt="logo"
                                src="https://raw.githubusercontent.com/YBY2000/INFO1650_ass6_G5/main/img/favicon.png"
                                width="50"
                                height="30"
                                className="d-inline-block align-top"
                            />{' '}
                            WeTour
                        </Navbar.Brand>
                        {/* <Navbar.Brand href="/homepage">React-Bootstrap</Navbar.Brand> */}
                        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                        <Navbar.Collapse id="responsive-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link href="/about">About</Nav.Link>
                                <NavDropdown title="Details" id="collapsible-nav-dropdown">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">
                                        Another action
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href="#action/3.4">
                                        Separated link
                                    </NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                            <Nav>
                                <Form.Control
                                type='search'
                                placeholder="Search"
                                className=" mr-sm-2"
                                onChange={this.props.onChangeHandler}
                            />
                            </Nav>
                            
                            <Nav>
                                <Nav.Link eventKey={2} href="#memes">
                                    LOGIN / SIGNUP
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>
        );

    }
}

export default SearchBar;
