import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import "./movie-view.scss";

export const MovieView = ({ movie, updateUser, favoriteMovies }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const { movieId } = useParams();
  const currentMovie = movie.find(m => m.id === movieId);

  const similarMovies = currentMovie
    ? movie.filter(m => m.genre === currentMovie.genre && m.id !== currentMovie.id)
    : [];

  const [isFavorite, setIsFavorite] = useState(user && user.favoriteMovies && user.favoriteMovies.includes(movieId));

  useEffect(() => {
    setIsFavorite(user && Array.isArray(user.favoriteMovies) && user.favoriteMovies.includes(movieId));
    window.scrollTo(0, 0);
  }, [movieId, user]);

  const addFavorite = () => {
    fetch(`https://movie-api-eqfh.vercel.app/users/${user.Username}/movies/${currentMovie.id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => {
        if (response.ok) {
          const updatedfavoriteMovies = [...(user.favoriteMovies || [])];
          if (!updatedfavoriteMovies.includes(currentMovie.id)) {
            updatedfavoriteMovies.push(currentMovie.id);
          }
          const updatedUser = { ...user, favoriteMovies: updatedfavoriteMovies };
          updateUser(updatedUser);
          setIsFavorite(true);
          alert("Successfully added to favorites");
        } else {
          alert("Failed to add favorite movie");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeFavorite = () => {
    if (!user) {
      return;
    }
    fetch(`https://movie-api-eqfh.vercel.app/users/${user.Username}/movies/${currentMovie.id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          const updatedfavoriteMovies = user.favoriteMovies.filter(movieId => movieId !== currentMovie.id);
          const updatedUser = { ...user, favoriteMovies: updatedfavoriteMovies };
          updateUser(updatedUser);
          setIsFavorite(false);
          alert("Successfully deleted from favorites");
        } else {
          alert("Failed");
        }
      })
      .catch(e => {
        alert(e);
      });
  };

  return currentMovie ? (
    <div className="movie-view-container container-fluid p-4">
      <Row className="justify-content-center mb-4">
        <Col md={5} className="text-center">
          <img src={currentMovie.image} alt={currentMovie.title} className="movie-poster img-fluid rounded shadow-lg" />
        </Col>
        <Col md={7}>
          <div className="movie-details p-4">
            <h1 className="text-light mb-3">{currentMovie.title}</h1>
            <p className="text-muted">Directed by <span className="fw-bold">{currentMovie.director}</span></p>
            <p className="text-muted">Genre: <span className="fw-bold">{currentMovie.genre}</span></p>
            <p className="text-muted">Starring: {currentMovie.stars.join(', ')}</p>
            <p className="movie-description text-light">{currentMovie.description}</p>
            <div className="d-flex mt-4">
              {!isFavorite ? (
                <Button variant="success" onClick={addFavorite} className="btn-sm me-2">
                  Add to Favorites
                </Button>
              ) : (
                <Button variant="danger" onClick={removeFavorite} className="btn-sm me-2">
                  Remove from Favorites
                </Button>
              )}
              <Link to="/" className="btn btn-outline-light btn-sm">
                Back to Movies
              </Link>
            </div>
          </div>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col>
          <h2 className="text-light text-center">Similar Movies</h2>
          <Row className="g-4">
            {similarMovies.length > 0 ? (
              similarMovies.map((movie) => (
                <Col xs={12} sm={6} md={4} lg={3} key={movie.id}>
                  <MovieCard movie={movie} />
                </Col>
              ))
            ) : (
              <p className="text-center text-light">No similar movies found.</p>
            )}
          </Row>
        </Col>
      </Row>
    </div>
  ) : null;
};

MovieView.propTypes = {
  movie: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
    })
  ).isRequired,
  updateUser: PropTypes.func.isRequired
};
