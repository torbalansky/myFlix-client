import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col } from 'react-bootstrap';
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
      setIsFavorite(user.favoriteMovies.includes(movieId));
    }
    window.scrollTo(0, 0);
  }, [movieId, user])

  const addFavorite = () => {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    if (!currentUser) {
      return;
    }
    fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${currentUser._id}/movies/${movieId}`, {
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
    fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user._id}/movies/${movieId}`, {
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
          updateUser(updateUser);
        }
      })
      .catch(e => {
        alert(e);
      });
  }
  console.log(currentMovie);

  return  currentMovie ? (
    <>
        <Col>
            <div className="movie-view">
              <div className="movie-poster">
              <img src={currentMovie.image} />
          </div>
          <div>
            <span>Title: </span>
            <span className="movie-title">{currentMovie && currentMovie.title}</span>
          </div>
          <div>
          <br />
            <span>Description: </span>
            <span>{currentMovie.description}</span>
          </div>
          <br />
          <div>
            <span>Stars: </span>
            <span>{currentMovie.stars.join(', ')}</span>
          </div>
          <div>
            <span>Genre: </span>
            <span>{currentMovie.genre}</span>
          </div>
          <div>
            <span>Director: </span>
            <span>{currentMovie.director}</span>
          </div>
          <Link to={"/"}>
              <Button variant="primary">Back</Button>
          </Link>
                    {isFavorite ? 
                        <Button variant="danger" className="ms-2" onClick={removeFavorite}>Remove from favorites</Button>
                        : <Button variant="success" className="ms-2" onClick={addFavorite}>Add to favorites</Button>
                    }                   
                    <h3 className="mt-3 mb-3 text-dark">Similar movies:</h3>
        </div>
      </Col>
          {similarMovies.map(movie => (
        <Col className="mb-4" key={movie.id} xl={2} lg={3} md={4} xs={6}>
          <MovieCard movie={movie} />
        </Col>
      ))}
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
