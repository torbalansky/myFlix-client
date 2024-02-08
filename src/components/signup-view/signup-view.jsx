import { useState } from "react";
import { Button, Form, Container, Row, Col, Card, CardGroup } from 'react-bootstrap';
/**
 * Functional component representing the signup view.
 * @returns {JSX.Element} The rendered signup view component.
 */
export const SignupView = () => {
    // Define states for each form input
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");
    /**
         * Handles the form submission for user signup.
         * @param {Object} event - The event object.
         */
    const handleSubmit = (event) => {
        event.preventDefault(); // Prevent the default behavior of form submission

        // Build the data object from form inputs
        const data = {
            Username: username,
            Password: password,
            Email: email,
            Birthday: birthday
        };

        // Retrieve JWT token from local storage
        const token = localStorage.getItem('token');

        // Send a POST request to the server to create a new user
        fetch('https://movie-api-eqfh-mnccd0sxy-torbalansky.vercel.app/users', {
            method: "POST",
            body:JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        }).then((response) => {
            if (response.ok) {
                alert("Signup successful");
                window.location.reload();
            } else {
                alert("Signup failed");
            }
        });
    };

    // Render the form with inputs
    return (
        <Container>
      <Row>
        <Col style={{ marginTop: "50px" }}>
          <CardGroup>
            <Card>
                <Card.Body style={{ backgroundColor: "Honeydew" }}>
                <Card.Header style={{ backgroundColor: "lightpink" }}>Register</Card.Header>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controledId="formUsername" class="mb-3 mt-3">
                            <Form.Label>Username:</Form.Label>
                            <Form.Control
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required // make the input required
                                minLength="4" // set a minimum length of 4 characters
                                pattern="^[A-Za-z0-9 .,'\\-!?%&]+$"
                                title="Username should contain more than 5 characters, may only contain letters, numbers and special characters: .,'-!?%&"
                                placeholder='Enter your username...'
                            />
                        </Form.Group>
                        <Form.Group controlId="Password">
                            <Form.Label>Password:</Form.Label>
                            <Form.Control
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required 
                                minLength="8" 
                                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                                title="Password should contain at least 8 characters, including at least one letter, one number and one special character: @$!%*#?&"
                                placeholder='Your password must be 8 or more characters...'
                            />
                        </Form.Group>
                        <Form.Group controlId="Email" class="mb-3">
                            <Form.Label>E-mail:</Form.Label>
                            <Form.Control
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                placeholder='Enter your email...'
                            />
                        </Form.Group>
                        <Form.Group controlId="formDate" class="mb-3">
                            <Form.Label>Birthday:</Form.Label>
                            <Form.Control
                                type="date"
                                value={birthday}
                                onChange={(e) => setBirthday(e.target.value)}
                                required 
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit" class="signup-button">Submit</Button>
                    </Form>
                </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
    );
};
