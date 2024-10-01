import { useState } from "react";
import React from 'react';
import { Card, Col, Button, Row, Form } from "react-bootstrap";
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

    let favoriteMoviesList = user && user.favoriteMovies && movies 
        ? movies.filter(movie => user.favoriteMovies.includes(movie.id)) 
        : [];

    const handleSubmit = event => {
        event.preventDefault();

        const data = {
            Username,
            Password,
            Email,
            Birthday
        };

        fetch(`https://movie-api-eqfh.vercel.app/users/${user.Username}`, {
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
                    alert("Changing user data failed");
                    return false;
                }
            })
            .then((user) => {
                if (user) {
                    alert("Successfully changed user data");
                    updateUser(user);
                }
            })
            .catch((e) => {
                alert(e);
            });
    };

    const deleteAccount = () => {
        fetch(`https://movie-api-eqfh.vercel.app/users/${user.Username}`, {
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

    const handleRemoveFavoriteMovie = (movie) => {
        const updatedUser = {
            ...user,
            favoriteMovies: user.favoriteMovies.filter(id => id !== movie.id)
        };

        fetch(`https://movie-api-eqfh.vercel.app/users/${user.Username}`, {
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
        <Row className="profile-view">
            <Col md={6} className="favorite-movies-col">
                <Card className="mt-3 mb-3 text-black favorite-movies-card">
                    <Card.Body>
                        <Card.Title>Your Favorite Movies</Card.Title>
                        <Row className="favorite-movies-grid">
                            {favoriteMoviesList.length === 0 ? (
                                <p>No favorite movies found.</p>
                            ) : (
                                favoriteMoviesList.map((movie) => (
                                    <Col key={movie._id} className="mb-4 fav-movies">
                                        <MovieCard 
                                            movie={movie} 
                                            movies={movies} 
                                            user={user} 
                                            token={token} 
                                            handleRemoveFavoriteMovie={handleRemoveFavoriteMovie} 
                                        />
                                        <Button variant="danger" onClick={() => handleRemoveFavoriteMovie(movie)} style={{ marginLeft: "20px" }}>Remove from favorites</Button>
                                    </Col>
                                ))
                            )}
                        </Row>
                    </Card.Body>
                </Card>
            </Col>

            <Col md={6}>
                <Card className="mt-3 mb-3 text-black user-info-card">
                    <Card.Body>
                        <Card.Title>Your Info</Card.Title>
                        <p><strong>Username:</strong> {user.Username}</p>
                        <p><strong>Email:</strong> {user.Email}</p>
                        <Card.Title>Manage Your Account</Card.Title>
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
                                <Form.Label>E-mail address:</Form.Label>
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
                            <Button className="mt-3" variant="warning" type="submit">Update</Button>
                        </Form>
                        <Button
                            className="delete-account-button mt-3"
                            variant="danger"
                            onClick={() => {
                                if (confirm("Are you sure?")) {
                                    deleteAccount();
                                }
                            }}
                        >
                            Delete User Account
                        </Button>
                    </Card.Body>
                </Card>
            </Col>
        </Row>
    );
}
