import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// Define the MainView component
export const MainView = () => {

  // Initialize the movies state
  const [movies, setMovies] = useState([]);

  // Initialize the selectedMovie state
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://torbalansk-myflix-app.herokuapp.com/movies")
      .then((response) => response.json())
      .then((data) => {
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id, 
            title: movie.Title,
            image: movie.ImagePath,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            key: movie._id // add a unique key prop for each movie
          };
        });
      
        setMovies(moviesFromApi);
      });
  }, []);

  // If a movie is selected, render the MovieView component
  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  // If there are no movies in the list, render a message
  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }

  // Otherwise, render the list of movies using the MovieCard component
  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={(newSelectedMovie) => {
            setSelectedMovie(newSelectedMovie);
          }}
        />
      ))}
    </div>
  );
};
