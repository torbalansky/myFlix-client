import { useState, useEffect } from "react";
import { Card, Col, Button, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./profile-view.scss";

export function ProfileView({ user, token, onLoggedOut, movies, updateUser }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [birthday, setBirthday] = useState("");

    let favoriteMovies = user && user.favoriteMovies && movies ? movies.filter(movie => user.favoriteMovies.includes(movie.id)) : [];

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            username,
            password,
            email,
            birthday
        }

        console.log("Submitting data: ", data);

        fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            },
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    alert("Changing userdata failed");
                    return false;
                }
            })
            .then((user) => {
                if (user) {
                    alert("Successfully changed userdata");
                    updateUser(user);
                }
            })
            .catch((e) => {
                alert(e);
            });
    };

    const deleteAccount = () => {
        console.log("doin")
        fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((response) => {
                if (response.ok) {
                    alert("Your account has been deleted!");
                    onLoggedOut();
                } else {
                    alert("Could not delete account");
                }
            })
            .catch((e) => {
                alert(e);
            });
    };
    
  return (
    <>
    <Row>
      <Col md={6}>
        <Card>
          <Card.Body>
            <h4>Manage your account</h4>
            <Form className="profile-form" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type="text"
                name="username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                minLength="5"
                required
                placeholder="Enter a username"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Password:</Form.Label>
                <Form.Control
                type="password"
                name="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                minLength="8"
                required
                placeholder="Your password must be minimum 8 characters"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label style={{ margin: "20px", marginTop: "10px" }}>E-mail address:</Form.Label>
                <Form.Control
                type="email"
                name="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your e-mail"
                />
            </Form.Group>
            <Form.Group>
                 <Form.Label>Birthday:</Form.Label>
                <Form.Control
                type="date"
                value={birthday}
                onChange={e => setBirthday(e.target.value)}
                
                />
                </Form.Group>
            <Button className="mt-3" variant="primary" type="submit">Update</Button>
            </Form>
            <Button
              variant="danger"
              onClick={() => {
                if (confirm("Are you sure?")) {
                  deleteAccount();
                }
              }}
            >
              Delete user account
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Row>
    <div style={{ padding: "0 20px" }}>
    <Card>
        <Card.Body>
          <Row>
            <Col xs={12}>
                <h2>Favorite Movies</h2>
            </Col>
            {favoriteMovies.map(({ movie }) => {
                return (
                <Col xs={12} md={6} lg={3} key={movie._id} className="fav-movies">
                    <div className="mb-4">
                    <MovieCard movie={movie} />
                    <Button
                        variant="danger"
                        onClick={() => {
                        if (confirm("Are you sure?")) {
                            removeFavorite(_id);
                        }
                        }}
                    >
                        Remove from Favorites
                    </Button>
                    </div>
                </Col>
                );
            })}
            </Row>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};