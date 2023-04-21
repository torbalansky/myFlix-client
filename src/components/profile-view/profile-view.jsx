import { useState, useEffect } from "react";
import { Card, Col, Button, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { removeFavorite } from "../movie-view/movie-view.jsx";
import "./profile-view.scss";

export function ProfileView({ onLoggedOut, movies, updateUser }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    let favoriteMoviesList = user && user.favoriteMovies && movies ? movies.filter(movie => user.favoriteMovies.includes(movie.id)) : [];
    console.log(favoriteMoviesList);

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            Username,
            Password,
            Email,
            Birthday
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
        <Card className="mt-2 mb-3">
            <Card.Body>
            <Card.Title>Your info</Card.Title>
            <p>Username: {user.Username}</p>
            <p>Email: {user.Email}</p>
    </Card.Body>
  </Card>
        <Card>
          <Card.Body>
            <h4>Manage your account</h4>
            <Form className="profile-form" onSubmit={handleSubmit}>
            <Form.Group>
                <Form.Label>Username:</Form.Label>
                <Form.Control
                type="text"
                name="username"
                value={Username}
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
                value={Password}
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
                value={Email}
                onChange={e => setEmail(e.target.value)}
                required
                placeholder="Enter your e-mail"
                />
            </Form.Group>
            <Form.Group>
                <Form.Label>Birthday:</Form.Label>
                <Form.Control
                type="date"
                value={Birthday}
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
                {favoriteMoviesList.map((movies) => (
                <Col className="mb-4" key={movies._id} x1={2} lg={3} md={4} xs={6}>
                <MovieCard movie={movies} user={user} token={token} />
                <Button
                        variant="danger"
                        onClick={() => {
                        if (confirm("Are you sure?")) {
                            removeFavorite(_id);
                        }
                        }}
                        >Remove from Favorites
                    </Button>
                 </Col>
                ))}
            </Row>
        </Card.Body>
      </Card>
    </div>
    </>
  );
};