import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// Define the MainView component
export const MainView = () => {

  // Initialize the movies state
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "The Lord Of The Rings",
      image: "https://upload.wikimedia.org/wikipedia/en/8/8a/The_Lord_of_the_Rings_The_Fellowship_of_the_Ring_%282001%29.jpg",
      director: "Peter Jackson",
      genre: "Fantasy",
      description: "The Lord of the Rings is a film series of three epic fantasy adventure films directed by Peter Jackson, based on the novel written by J. R. R. Tolkien. The films are subtitled The Fellowship of the Ring (2001), The Two Towers (2002) and The Return of the King (2003)."
    },
    {
      id: 2,
      title: "The Matrix",
      image: "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Matrix_Poster.jpg",
      director: "The Wachowskis",
      genre: "Action/Science Fiction",
      description: "The Matrix is a science fiction action film written and directed by the Wachowskis. It depicts a dystopian future in which humanity is unknowingly trapped inside a simulated reality, the Matrix, created by intelligent machines to distract humans while using their bodies as an energy source."
    },
    {
      id: 3,
      title: "Hannibal",
      image: "https://upload.wikimedia.org/wikipedia/en/9/9b/Hannibal_movie_poster.jpg",
      director: "Ridley Scott",
      genre: "Thriller",
      description: "Hannibal is a psychological horror-thriller film directed by Ridley Scott. It is based on the novel of the same name by Thomas Harris and is the sequel to the 1991 film The Silence of the Lambs. The film follows FBI agent Clarice Starling as she attempts to track down the escaped cannibalistic serial killer Dr. Hannibal Lecter."
    }
  ]);

  // Initialize the selectedMovie state
  const [selectedMovie, setSelectedMovie] = useState(null);

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
