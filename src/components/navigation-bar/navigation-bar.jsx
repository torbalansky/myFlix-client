import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { SiThemoviedatabase } from "react-icons/si";

import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut, onSearch }) => {
  const [query, setQuery] = useState("");

  const handleSearch = (event) => {
    event.preventDefault();
    onSearch(query);
  };

  const handleInputChange = (event) => {
    const value = event.target.value;
    setQuery(value);
    onSearch(value);
  };

  return (
    <Navbar expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-title text-pink" onClick={() => onSearch("")}> <SiThemoviedatabase className="mb-2 mx-2"/>MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Item>
                  <Button as={Link} to="/Signup"  className="me-2 btn text-black bg-white">Signup</Button>
                </Nav.Item>
                <Nav.Item>
                  <Button as={Link} to="/Login" className="me-2 btn text-black bg-white">Login</Button>
                </Nav.Item>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" onClick={() => onSearch("")} className="home-link">Home</Nav.Link>
                <Nav.Link as={Link} to={`/users/${user._id}`} className="profile-link">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="logout-link">Logout</Nav.Link>
              </>
            )}
          </Nav>
          {user && (
            <Form onSubmit={handleSearch} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search a movie"
                className="me-2"
                aria-label="Search"
                value={query}
                onChange={handleInputChange}
                style={{ outline: "3px solid yellow" }}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
