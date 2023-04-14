import PropTypes from 'prop-types';
import { Button, Card } from 'react-bootstrap';

import "./movie-card.scss";

// Functional component named MovieCard
// Two props, `movie` and `onMovieClick`
export const MovieCard = ({ movie, onMovieClick }) => {
  
    // Returns a div element that has an onClick event listener attached to it
    // The onMovieClick function is called with the `movie` object as a parameter when the div is clicked
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.image} className="card-img-top"/>
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <Card.Text className="movie-description"> 
            {movie.description}
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