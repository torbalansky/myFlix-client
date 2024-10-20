import React, { useState } from "react";
import { Button, Form, Container, Row, Col, Card } from "react-bootstrap";
import "./login-view.scss";

/**
 * Represents the login view component.
 * @param {Object} props - The component properties.
 * @param {Function} props.onLoggedIn - The callback function to be called after successful login.
 * @returns {JSX.Element} The rendered login view component.
 */
export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  /**
   * Handles the form submission.
   * @param {Event} event - The form submit event.
   */
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default behavior of the form which is to reload the entire page

    const data = {
      Username: username,
      Password: password,
    };

    // Send a POST request to the login endpoint with the user data in the request body
    fetch('https://movie-api-eqfh.vercel.app/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.user && data.token) {
          localStorage.setItem('user', JSON.stringify(data.user)); // Save the user data in local storage
          localStorage.setItem('token', data.token); // Save the token in local storage
          onLoggedIn(data.user, data.token); // Call the onLoggedIn callback with the user and token data
        } else {
          alert('No such user or invalid credentials');
        }
      })
      .catch((error) => {
        console.error('Login error', error);
        alert('An error occurred during login');
      });
  };

  // Render a form with input fields for the username and password
  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col>
          <Card className="login-card">
            <Card.Body>
              <Card.Header className="text-center">Login</Card.Header>
              <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    pattern="^[A-Za-z0-9 .,'\\-!?%&]+$"
                    title="Username should contain more than 5 characters, may only contain letters, numbers and special characters: .,'-!?%&"
                    placeholder="Enter your username..."
                    required
                  />
                </Form.Group>
                
                <Form.Group controlId="formPassword">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    title="Password should contain at least 8 characters, including at least one letter, one number and one special character: @$!%*#?&"
                    placeholder="Enter your password..."
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="mt-3 w-100">
                  Login
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginView;
