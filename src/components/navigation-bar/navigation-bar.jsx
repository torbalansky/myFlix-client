import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./navigation-bar.scss";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="info" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="navbar-title">MyFlix</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            {user && (
                <>
                <Nav.Link as={Link} to="/" className="home-link">Home</Nav.Link>
                <Nav.Link as={Link} to={`/users/${user._id}`} className="profile-link">Profile</Nav.Link>
                <Nav.Link onClick={onLoggedOut} className="logout-link">Logout</Nav.Link>
                </>
            )}
            {!user && (
              <>
                <Nav.Link as={Link} to="/signup">Signup</Nav.Link>
                <Nav.Link as={Link} to="/login">Login</Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
