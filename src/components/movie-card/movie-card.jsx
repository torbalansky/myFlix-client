import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import "./movie-card.scss";

// Functional component named MovieCard
// Two props, `movie` and `onMovieClick`
export const MovieCard = ({ movie, onMovieClick }) => {
  
     return (
      <Card>
        <Card.img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text> 
            Description: {movie.Description}
          </Card.Text>
          <Button onClick={() => onMovieClick(movie)} 
          variant="link">More</Button>
        </Card.Body>
      </Card>
    );
  };
  
  // Define the propTypes for the MovieCard component
MovieCard.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};
  
export default MovieCard;