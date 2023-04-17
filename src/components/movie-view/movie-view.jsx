import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import './movie-view.scss';

export const MovieView = ({ movie, user, token, updateUser }) => {
  const { movieId } = useParams();
  const currentMovie = movie.find(m => m.id === movieId);
  
  const similarMovies = currentMovie
  ? movie.filter(m => m.genre === currentMovie.genre && m.id !== currentMovie.id)
  : [];

  const [isFavorite, setIsFavorite] = useState(user && user.favoriteMovies ? user.favoriteMovies.includes(movieId) : false);


  useEffect(() => {
    if (user) {
      setIsFavorite(user.favoriteMovies.includes(movie._id));
    }
    window.scrollTo(0, 0);
  }, [movie._id, user])

  const addFavorite = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    ;
    if (!user) {
      return;
    }
    fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then(updatedUser => {
        if (updateUser) {
          alert("Successfully added to favorites");
          setIsFavorite(true);
          updateUser(user);
        }
      })
      .catch(e => {
        alert(e);
      });
  }  

  const removeFavorite = () => {
    if (!user) {
      return;
    }
    fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}/movies/${movie._id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` }
    })
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          alert("Failed");
          return false;
        }
      })
      .then(updatedUser => {
        if (updateUser) {
          alert("Successfully deleted from favorites");
          setIsFavorite(false);
          updateUser(updatedUser);
        }
      })
      .catch(e => {
        alert(e);
      });
  }
  
  console.log(currentMovie);
  console.log(user);

  return  currentMovie ? (
    <>
    <Col>
      <img src={currentMovie.image} className="movie-poster" alt={currentMovie.title} />
      <p>
        <span>Title: </span>
        <span className="movie-title">{currentMovie.title}</span>
      </p>
      <p>
        <span>Description: </span>
        <span>{currentMovie.description}</span>
      </p>
      <p>
        <span>Stars: </span>
        <span>{currentMovie.stars.join(', ')}</span>
      </p>
      <p>
        <span>Genre: </span>
        <span>{currentMovie.genre}</span>
      </p>
      <p>
        <span>Director: </span>
        <span>{currentMovie.director}</span>
      </p>
      <Link to={"/"} className="btn btn-primary">Back</Link>
      {isFavorite ? 
        <button className="btn btn-danger ms-2" onClick={removeFavorite}>Remove from favorites</button>
        : <button className="btn btn-success ms-2" onClick={addFavorite}>Add to favorites</button>
      }                   
    </Col>
    <Col xs={12}>
      <h3 className="text-dark similar-movies-heading">Similar movies:</h3>
      <Row className="row-cols-1 row-cols-md-3 g-4">
        {similarMovies.map(movie => (
          <Col className="mb-4" key={movie.id}>
            <MovieCard movie={movie} />
          </Col>
        ))}
      </Row>
    </Col>
  </>
) : null;
};

MovieView.propTypes = {
  movies: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
  }).isRequired)
};
