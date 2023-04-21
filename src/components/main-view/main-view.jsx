import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from 'react-bootstrap';

export const MainView = () => {

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMovies, setViewMovies] = useState(movies);
  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  } 
  const handleMovieClick = (movie) => {
    console.log(`Clicked on movie with ID: ${movie.id}`);
  };

  useEffect(() => {
    if (!token) {
      return;
     }
    setLoading(true);
    fetch("https://torbalansk-myflix-app.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        const moviesFromApi = data.map((movie) => {
          return {
            id: movie._id, 
            title: movie.Title,
            image: movie.ImagePath,
            director: movie.Director.Name,
            genre: movie.Genre.Name,
            description: movie.Description,
            key: movie._id,
            stars: movie.Actors
          };
        });
      
        setMovies(moviesFromApi);
      });
  }, [token]);

  useEffect(() => {
    setViewMovies(movies);
  }, [movies]);

  return (
    <BrowserRouter>
      <NavigationBar
        user={user}
        onLoggedOut={() => {
          setUser(null);
          setToken(null);
          localStorage.clear();
        }}
        onSearch={(query) => {
          setViewMovies(movies.filter(movie => movie.title.toLowerCase().includes(query.toLowerCase())));
      }}
      />
      <Row className="justify-content-md-center">
        <Routes>
          <Route 
            path= "/signup"
            element={
              <>
              {user ? (
                <Navigate to="/" />
              ) : (
                  <Col md={5}>
                    <SignupView />
                  </Col>
              )}
              </>
            }
          />
          <Route 
            path= "/login"
            element={
              <>
              {user ? (
                <Navigate to="/" />
              ) : (
                  <Col md={5}>
                    <LoginView onLoggedIn={(user, token) => {
                      setUser(user)
                      setToken(token)
                      }}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/users/:Username"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col>
                    <ProfileView 
                      user={user} 
                      token={token}
                      movies={movies}
                      onLoggedOut={() => {
                        setUser(null);
                        setToken(null);
                        localStorage.clear();
                      }}
                      updateUser={updateUser}
                    />
                  </Col>
                )}
              </>
            }
          />
          <Route 
            path= "/movies/:movieId"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <Col md={12}>
                    <MovieView 
                    movie={movies} 
                    user={user} 
                    token={token}
                    updateUser={updateUser}/>
                  </Col>
                )}
              </>
            }
          />
          <Route
            path="/"
            element={
              <>
                {!user ? (
                  <Navigate to="/login" replace />
                ) : movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {viewMovies.map((movie) => (
                      <Col xs={12} md={8} lg={3} key={movie.id}>
                        <MovieCard movie={movie}/>
                      </Col>
                    ))}
                  </>
                )}
              </>
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};