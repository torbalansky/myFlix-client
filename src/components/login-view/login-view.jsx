import React from "react";
import { useState } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const LoginView = ({ onLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the default behavior of the form which is to reload the entire page

    const data = {
      Username: username,
      Password: password,
    };
    // Send a POST request to the login endpoint with the user data in the request body
    fetch('https://torbalansk-myflix-app.herokuapp.com/login', {
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
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        pattern="^[A-Za-z0-9 .,'\\-!?%&]+$"
        title="Username should contain more than 5 characters, may only contain letters, numbers and special characters: .,'-!?%&"
      />
    </Form.Group>
    
    <Form.Group controlId="formPassword">
      <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          title="Password should contain at least 8 characters, including at least one letter, one number and one special character: @$!%*#?&"
        />
    </Form.Group>
      <Button variant="primary" type="submit" style={{ marginTop: "20px", marginBottom: "20px" }}>Submit</Button>
    </Form>
  );
};

export default LoginView;

