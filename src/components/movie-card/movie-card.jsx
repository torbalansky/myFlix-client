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
  