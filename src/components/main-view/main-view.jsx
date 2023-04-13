import React from 'react';
import { useState, useEffect } from 'react';
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { Row, Col, Button } from 'react-bootstrap';

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
    setLoading(true);
    fetch("https://torbalansk-myflix-app.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
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
        setLoading(false);
      });
  }, [token]);

  return (
    <div className="main-view">
      {loading && <div>Loading...</div>}
      {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
        : (
          <div>
            <Row>
              {movies.map((movie) => (
                <Col md={3} key={movie.id}>
                  <MovieCard movie={movie} onMovieClick={(movie) => setSelectedMovie(movie)} />
                </Col>
              ))}
            </Row>
          </div>
        )
      }
    </div>
  );

  if (!user) {
    return (
    <Row className="justify-conetent-md-center">
      {!user ? (
        <Col md={8}>
          <LoginView 
            onLoggedIn={(user, token) =>  {
            setUser(user);
            setToken(token);
        }} 
      />
      or
      <SignupView />
      </Col>
      ) : null}
    </Row>
  );
}

  // If a movie is selected, render the MovieView component
  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
        <Col md={12}>
      <Button onClick={() => {
        setUser(null); 
        setToken(null); 
        localStorage.clear();
      }}
      >
        </Button>
      <MovieView movie={selectedMovie} 
      onBackClick={() => setSelectedMovie(null)} 
      />
      </Col>
    </Row>
  );
}

  // If there are no movies in the list, render a message
  if (movies.length === 0) {
    return (
      <Row className="justify-content-md-center">
        <Col md={12}>
          <Button onClick={() => {
            setUser(null);
            setToken(null);
            localStorage.clear();
      }}>
        Logout
        </Button>    
        {loading ? (
      <p>Loading...</p>
    ) : !movies || !movies.length ? (
      <p> No movies found. </p>
    ) : (
    <div>
      <Button onClick={() => {
        setUser(null); 
        setToken(null);
        localStorage.clear();
      }}>Logout</Button>

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
    )
        }
      </Col>
    </Row>
  );
}};

