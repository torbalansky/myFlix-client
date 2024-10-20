import { useState, useEffect } from "react";
import React from 'react';
import { Card, Col, Button, Row, Form } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

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
    const [Username, setUsername] = useState(user?.Username || "");
    const [Password, setPassword] = useState("");
    const [Email, setEmail] = useState(user?.Email || "");
    const [Birthday, setBirthday] = useState(user?.Birthday || "");

    let favoriteMoviesList = user && user.favoriteMovies && movies 
        ? movies.filter(movie => user.favoriteMovies.includes(movie.id)) 
        : [];

    useEffect(() => {
        if (user) {
            setUsername(user.Username);
            setEmail(user.Email);
            setBirthday(user.Birthday);
        }
    }, [user]);

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
        <div className="profile-view container mt-5">
            <Card className="text-white bg-dark p-2">
                <Card.Body>
                  <Row>
                    <Col xs={12} md={12} lg={4} className="bg-light text-dark p-2 text-center rounded h-75">
                            <Card.Title className="m-2">Update Your Account</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control
                                        type="text"
                                        value={Username}
                                        onChange={e => setUsername(e.target.value)}
                                        minLength="5"
                                        required
                                        placeholder="Enter a username"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        value={Password}
                                        onChange={e => setPassword(e.target.value)}
                                        minLength="8"
                                        required
                                        placeholder="Your password must be minimum 8 characters"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formEmail">
                                    <Form.Label>E-mail address</Form.Label>
                                    <Form.Control
                                        type="email"
                                        value={Email}
                                        onChange={e => setEmail(e.target.value)}
                                        required
                                        placeholder="Enter your e-mail"
                                    />
                                </Form.Group>
                                <Form.Group controlId="formBirthday">
                                    <Form.Label>Birthday</Form.Label>
                                    <Form.Control
                                        type="date"
                                        value={Birthday}
                                        onChange={e => setBirthday(e.target.value)}
                                    />
                                </Form.Group>
                                <Button className="mt-3 w-50" variant="primary" type="submit">Update</Button>
                            </Form>
                            <Button
                                className="delete-account-button mt-3 w-50"
                                variant="danger"
                                onClick={() => {
                                    if (confirm("Are you sure?")) {
                                        deleteAccount();
                                    }
                                }}
                            >
                                Delete Account
                            </Button>
                        </Col>

                        <Col xs={12} md={12} lg={8} className="mb-4">
                            <Card.Title className="text-center">Your Favorite Movies:</Card.Title>
                            <Row>
                                {favoriteMoviesList.length === 0 ? (
                                    <p>No favorite movies found.</p>
                                ) : (
                                    favoriteMoviesList.map((movie) => (
                                        <Col xs={6} sm={4} md={6} lg={4} key={movie._id} className="mb-3 w-50">
                                            <MovieCard 
                                                movie={movie} 
                                                movies={movies} 
                                                user={user} 
                                                token={token} 
                                                handleRemoveFavoriteMovie={handleRemoveFavoriteMovie} 
                                            />
                                            <Button 
                                                variant="danger" 
                                                onClick={() => handleRemoveFavoriteMovie(movie)} 
                                                className="w-100"
                                            >
                                                Remove from favorites
                                            </Button>
                                        </Col>
                                    ))
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}
