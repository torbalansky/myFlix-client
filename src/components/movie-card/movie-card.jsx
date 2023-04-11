import PropTypes from 'prop-types';

// Functional component named MovieCard
// Two props, `movie` and `onMovieClick`
export const MovieCard = ({ movie, onMovieClick }) => {
  
    // Returns a div element that has an onClick event listener attached to it
    // The onMovieClick function is called with the `movie` object as a parameter when the div is clicked
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
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