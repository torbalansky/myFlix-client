import PropTypes from "prop-types";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { Button, Col, Row } from 'react-bootstrap';
import { useEffect, useState } from "react";
import { MovieCard } from "../movie-card/movie-card";

/**
 * Functional component representing a movie view.
 * @param {Object} props - The component props.
 * @param {Array} props.movie - The array of movie objects.
 * @param {Function} props.updateUser - The function to update the user.
 * @returns {JSX.Element} The rendered movie view component.
 */

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
  
  /**
     * Adds the current movie to the user's favorite movies.
     */

  const addFavorite = () => {
    fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}/movies/${currentMovie.id}`, {
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

  /**
   * Removes the current movie from the user's favorite movies.
   */
  
  const removeFavorite = () => {
    if (!user) {
      return;
    }
    fetch(`https://torbalansk-myflix-app.herokuapp.com/users/${user.Username}/movies/${currentMovie.id}`, {
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
  
  console.log(updateUser);
  console.log(currentMovie);
  console.log(user);

  return currentMovie ? (
        <div className="row" style={{color: "white", marginLeft: "40px", marginTop: "20px", fontSize:"20px"}}>
        <div className="col-md-6">
        <div className="movie-details">
          <h2 className="text-light">{currentMovie.title}</h2>
          <p className="text-light">Directed by {currentMovie.director}</p>
          <p className="text-light">Genre: {currentMovie.genre}</p>
          <p className="text-light">Stars: {currentMovie.stars.join(', ')}</p>
          <p><strong>{currentMovie.description}</strong></p>
          <div className="mb-3">
          <Button variant="btn bg-success" onClick={() => addFavorite(movie)} style={{color: "white"}}>Add to Favorites</Button>  
          <Button className="btn btn-danger ms-2" onClick={removeFavorite}>Remove from favorites</Button> 
      </div>
          <Link to={"/"} className="btn btn-primary movie-view-back-button" style={{marginTop: "20px", marginBottom: "20px", marginLeft: "10px"}}>Back</Link>
        </div>
      </div>
        <div className="col-md-6">
          <img src={currentMovie.image} className="movie-poster" alt={currentMovie.title} style={{width: "400px", float: "right", marginRight: "40px"}}/>
      </div>
        <div className="col-md-12">
          <h3 className="text-light similar-movies-heading">Similar movies:</h3>
          <Row className="row-cols-1 row-cols-md-3 g-4">
            {similarMovies.map(movie => (
              <Col className="mb-4" key={movie.id}>
                <MovieCard movie={movie} />
              </Col>
          ))}
          
        </Row>
      </div>
    </div>
  ) : null;
};

MovieView.propTypes = {
  movie: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired
  }).isRequired),
  updateUser: PropTypes.func.isRequired
};