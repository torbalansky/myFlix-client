import React from "react";
import { Button, Col, Row, Figure } from 'react-bootstrap';
import { Link } from "react-router-dom";
import axios from "axios";

function FavoriteMovies({ favoriteMovieList }) {
    const removeFav = async (id) => {
        try {
            let token = localStorage.getItem('token');
            let url = `https://torbalansk-myflix-app.herokuapp.com/users/${localStorage.getItem('user')}/movies/${id}`
            const response = await axios.delete(url, {
                headers: { Authorization: `Bearer ${token}` }
            });
            console.log(response.data);
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <Row>
                <Col xs={12}>
                    <h2>Favorite Movies</h2>
                </Col>
                {favoriteMovieList.map((movie) => {
                    return (
                        <Col xs={12} md={6} lg={3} key={movie._id}>
                            <Figure>
                                <Link to={`/movies/${movie._id}`}>
                                    <Figure.Image
                                        src={movie.ImagePath}
                                        alt={movie.Title}
                                    />
                                    <Figure.Caption>
                                        {movie.Title}
                                    </Figure.Caption>
                                </Link>
                            </Figure>
                            <h4>{movie.Title}</h4>
                            <Button variant="secondary" onClick={() => removeFav(movie._id)}>
                                Remove from list
                            </Button>
                        </Col>
                    )
                })}
            </Row>
        </>
    );
}

export default FavoriteMovies;
