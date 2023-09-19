import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import "./movie-card.scss";


/**
 * Functional component representing a movie card.
 * @param {Object} props - The component props.
 * @param {Object} props.movie - The movie object.
 * @param {Function} [props.onMovieClick] - The function to be called when the movie card is clicked.
 * @returns {JSX.Element} The rendered movie card component.
 */

// Functional component named MovieCard
// Two props, `movie` and `onMovieClick`
export const MovieCard = ({ movie }) => {

  const overlayStyle = {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    background: "rgba(0, 0, 0, 0.7)", 
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "white",
    fontSize: "26px",
    fontWeight: "bold",
    padding: "10px",
  };
  
    // Returns a div element that has an onClick event listener attached to it
    // The onMovieClick function is called with the `movie` object as a parameter when the div is clicked
const cardStyle = { marginTop: "20px"};
const descriptionWords = movie.description.split(" ").slice(0, 10).join(" ");

    return (
      <Card className="h-60" style={cardStyle}>
        <Card.Img variant="top" src={movie.image} className="card-img-top"/>
        <div style={overlayStyle}>
        {movie.title}
        <p style={{fontSize:"14px"}}>{descriptionWords}...</p>
        <div className="text-center mt-2">
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="primary">Read more</Button>
          </Link>
          </div>
        </div>
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