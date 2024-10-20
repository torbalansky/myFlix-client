import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useState } from "react";
import { SiThemoviedatabase, SiGooglehome } from "react-icons/si";
import { PiSignInDuotone } from "react-icons/pi";
import "./navigation-bar.scss";
import { GiArchiveRegister } from "react-icons/gi";
import { RiLogoutBoxFill } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa";

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

  const handleClear = () => {
    setQuery(""); 
    onSearch("");
  };


  return (
    <Navbar expand="lg" className="navbar navbar-dark container">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-title" onClick={() => onSearch("")}>
          <SiThemoviedatabase className="mb-2 mx-2" />
        </Navbar.Brand>
 
        <Navbar.Toggle aria-controls="navbarTogglerDemo02" className="navbar-toggler"/>

        <Navbar.Collapse id="navbarTogglerDemo02">
          <Nav className="me-auto mb-2 mb-lg-0">
            {!user && (
              <>
                <Nav.Item>
                  <Button as={Link} to="/Signup" className="m-4 btn text-black bg-white w-75">
                    <GiArchiveRegister className="mx-2 text-black" /> Signup
                  </Button>
                </Nav.Item>
                <Nav.Item>
                  <Button as={Link} to="/Login" className="m-4 btn text-black bg-white w-75">
                    <PiSignInDuotone className="mx-2 text-black" /> Login
                  </Button>
                </Nav.Item>
              </>
            )}
            {user && (
              <>
                <Nav.Link as={Link} to="/" onClick={() => onSearch("")} className="nav-link active">
                  <SiGooglehome className="icon-navbar mx-1 text-light" /> Home
                </Nav.Link>
                <Nav.Link as={Link} to={`/users/${user._id}`} className="nav-link">
                  <FaRegUser className="icon-navbar mx-1 text-light" /> Profile
                </Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="nav-link">
                  <RiLogoutBoxFill className="icon-navbar mx-1 text-light" /> Logout
                </Nav.Link>
              </>
            )}
          </Nav>

          {user && (
            <Form onSubmit={handleSearch} className="d-flex">
              <Form.Control
                type="text"
                placeholder="Search a movie"
                className="form-control me-2"
                aria-label="Search"
                value={query}
                onChange={handleInputChange}
              />
              <Button variant="warning" onClick={handleClear}>Clear</Button>
            </Form>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
