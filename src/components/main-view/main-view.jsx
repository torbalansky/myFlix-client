import { useState, useEffect } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";

// Define the MainView component
export const MainView = () => {

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  // Initialize the movies state
  const [movies, setMovies] = useState([]);

  // Initialize the selectedMovie state
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!token) {
      return;
     }

    fetch("https://torbalansk-myflix-app.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
  }, [token]);

  if (!user) {
    return (
    <>
      <LoginView 
      onLoggedIn={(user, token) =>  {
        setUser(user);
        setToken(token);
      }} 
    />
    or
    <SignupView />
    </>
  );
}

  // If a movie is selected, render the MovieView component
  if (selectedMovie) {
    return (
      <>
      <button onClick={() => {
        setUser(null); 
        setToken(null); 
        localStorage.clear();
      }}>Logout</button>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} 
      />
      </>
    );
  }

  // If there are no movies in the list, render a message
  if (movies.length === 0) {
    return (
      <>
      <button onClick={() => {
        setUser(null);
        setToken(null);
        localStorage.clear();
      }}>Logout</button>    
    <div>The list is empty!</div>
    </>
    );
  }

  // Otherwise, render the list of movies using the MovieCard component
  return (
    loading ? (
      <p>Loading...</p>
    ) : !movies || !movies.length ? (
      <p> No movies found </p>
    ) : (
    <div>
      <button onClick={() => {
      setUser(null); 
      setToken(null);
      localStorage.clear();
      }}>Logout</button>

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
  ));
};
