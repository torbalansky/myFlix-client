import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SiThemoviedatabase, SiGooglehome } from "react-icons/si";
import { PiSignInDuotone } from "react-icons/pi";
import "./navigation-bar.scss";
import { GiArchiveRegister } from "react-icons/gi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaBookReader, FaRegUser } from "react-icons/fa";

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
    <Navbar expand="lg" className="navbar">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-title" onClick={() => onSearch("")}>
          <SiThemoviedatabase className="mb-2 mx-2" />
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav"  className="toggle"/>
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!user && (
              <>
                <Nav.Item>
                  <Button as={Link} to="/Signup" className="me-2 mt-2 btn text-black bg-white">
                    <GiArchiveRegister className="mx-1 text-semibold text-black" /> Signup
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button as={Link} to="/Login" className="me-2 mt-2 btn text-black bg-white">
                    <PiSignInDuotone className="mx-1 text-black" /> Login
                  </Button>
                </Nav.Item>
              </>
            )}
            {user && (
              <>
              <div className="nav-menu">
              <Nav.Link as={Link} to="/" onClick={() => onSearch("")} className="home-link">
                  <SiGooglehome className="mx-1 text-white" /> Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user._id}`} className="profile-link">
                  <FaRegUser className="mx-1 text-white" /> Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="logout-link">
                  <RiLogoutBoxFill className="mx-1 text-white" /> Logout
                </Nav.Link>
              </div>
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
                style={{ outline: "2px solid lime" }}
              />
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
