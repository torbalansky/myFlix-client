import { useState } from "react";
import React from 'react';
import { Card, Col, Button, Row, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";

/**
 * Functional component representing the profile view.
 * @param {Object} props - The component props.
 * @param {Function} props.onLoggedOut - The function to handle user logout.
 * @param {Array} props.movies - The array of movies.
 * @param {Function} props.updateUser - The function to update the user data.
 * @returns {JSX.Element} The rendered profile view component.
 */

export function ProfileView({ onLoggedOut, movies, updateUser }) {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [Username, setUsername] = useState("");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState("");
    const [Birthday, setBirthday] = useState("");

    let favoriteMoviesList = user && user.favoriteMovies && movies ? movies.filter(movie => user.favoriteMovies.includes(movie.id)) : [];
    console.log(favoriteMoviesList);
    /**
     * Handles the form submission for updating user data.
     * @param {Object} event - The event object.
     */
    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            Username,
            Password,
            Email,
            Birthday
        }

        console.log("Submitting data: ", data);

        fetch(`https://movie-api-eqfh-mnccd0sxy-torbalansky.vercel.app/users/${user.Username}`, {
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
    /**
     * Deletes the user account.
     */
    const deleteAccount = () => {
        console.log("doin")
        fetch(`https://movie-api-6-git-master-torbalansky.vercel.app/users/${user.Username}`, {
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
    /**
     * Handles the removal of a movie from the user's favorite movies list.
     * @param {Object} movie - The movie object to be removed.
     */
    const handleRemoveFavoriteMovie = (movie) => {
        const updatedUser = {
          ...user,
          favoriteMovies: user.favoriteMovies.filter(id => id !== movie.id)
        };
        
        console.log('updatedUser', updatedUser); 
      
        fetch(`https://movie-api-6-git-master-torbalansky.vercel.app/users/${user.Username}`, {
          method: "PUT",
          body: JSON.stringify(updatedUser),
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            } else {
              alert("Removing movie from favorites failed");
              return false;
            }
          })
          .then((user) => {
            if (user) {
              alert("Movie removed from favorites");
              setUser(updatedUser);
              localStorage.setItem("user", JSON.stringify(updatedUser));
            }
          })
          .catch((e) => {
            alert(e);
          });
      };
      

  return (
    <>
    <Row>
        <Col md={4}>
            <Card className="mt-3 mb-3">
            <Card.Body>
                <Card.Title>Your info</Card.Title>
                <p><strong>Username:</strong> {user.Username}</p>
                <p><strong>Email:</strong> {user.Email}</p>
        </Card.Body>
    </Card>
    </Col>
        <Col md={8}>
            <Card className="mt-2 mt-3">
            <Card.Body>
            <Card.Title>Manage your account</Card.Title>
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
                <Button className="mt-3" variant="warning" type="submit" style={{ fontSize: "20px", fontWeight: "bold", width: "200px" }}>Update</Button>
                </Form>
                <Button
                className="delete-account-button"
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
        <div lassName="d-flex flex-column" style={{ padding: "0 20px" }}>
        <Card>
            <Card.Body>
            <Row>
                <Col xs={12}>
                    <h2>Favorite Movies</h2>
            </Col>
            {favoriteMoviesList.map((movie) => (
            <Col className="mb-4" key={movie._id} x1={2} lg={3} md={4} xs={6}>
            <MovieCard key={movie.id} movie={movie} movies={movies} user={user} token={token} handleRemoveFavoriteMovie={handleRemoveFavoriteMovie} />
            <Button variant="danger" onClick={() => handleRemoveFavoriteMovie(movie)}> Remove from favorites </Button>
                    </Col>
                    ))}
                </Row>
            </Card.Body>
        </Card>
        </div>
        </>
    );
};