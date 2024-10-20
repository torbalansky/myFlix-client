import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { NavigationBar } from "../navigation-bar/navigation-bar";
import { ProfileView } from "../profile-view/profile-view";
import { Row, Col } from 'react-bootstrap';
import { removeListener } from "process";
import Footer from '../footer/Footer';

/**
 * Represents the main view component.
 * @returns {JSX.Element} The rendered main view component.
 */

export const MainView = () => {

  const storedUser = localStorage.getItem("user");
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [token, setToken] = useState(storedToken ? storedToken : null);
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [viewMovies, setViewMovies] = useState(movies);

  /**
   * Updates the user data and stores it in local storage.
   * @param {Object} user - The updated user data.
   */

  const updateUser = user => {
    setUser(user);
    localStorage.setItem("user", JSON.stringify(user));
  } 

  /**
   * Handles the movie click event.
   * @param {Object} movie - The clicked movie.
   */
  
  const handleMovieClick = (movie) => {
    console.log(`Clicked on movie with ID: ${movie.id}`);
  };

  useEffect(() => {
    if (!token) {
      return;
     }
    setLoading(true);
    fetch("https://movie-api-eqfh.vercel.app/movies", {
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
                  <Col md={8} lg={6} sm={10}>
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
                  <Col md={6} lg={4} sm={10}>
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
                  <Col md={12} lg={10} sm={12}>
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
                      <Col xs={8} md={6} lg={3} key={movie.id} className="text-center">
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
      <Footer />
    </BrowserRouter>
  );
};