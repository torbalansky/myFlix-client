import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import "./movie-card.scss";

// Functional component named MovieCard
// Two props, `movie` and `onMovieClick`
export const MovieCard = ({ movie }) => {
  
    // Returns a div element that has an onClick event listener attached to it
    // The onMovieClick function is called with the `movie` object as a parameter when the div is clicked
    return (
      <Card className="h-60">
        <Card.Img variant="top" src={movie.image} className="card-img-top"/>
        <Card.Body>
          <Card.Title style={{fontSize: "16px"}}>{movie.title}</Card.Title>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}className="mt-auto">
          <Button variant="primary">More</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  };
  
  // Define the propTypes for the MovieCard component
MovieCard.propTypes = {
  movie: PropTypes.shape({
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
  }).isRequired,
  onMovieClick: PropTypes.func,
};

export default MovieCard;