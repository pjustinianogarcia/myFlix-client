import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import { ProfileView } from '../profile-view/profileview';
import { AppNavbar } from '../navigation-bar/navigationbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import { Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState('');
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://movie-api-3jxi.onrender.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      setMovies(data);

    });
  }, [token]);

  
  const onLoggedIn = (user, token) => {
    setUser(user);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
  };

  const onUserUpdate = (updatedUser) => {
    setUser(updatedUser);
    localStorage.setItem("user", JSON.stringify(updatedUser));
    console.log("Updated user:", updatedUser);
  };

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  const addFavorite = (movieId) => {
    fetch(`https://movie-api-3jxi.onrender.com/users/${user.Username}/movies/${movieId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
    .then((response) => response.json())
    .then((updatedUser) => {
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
    })
    .catch((error) => {
      console.error("Error adding favorite movie:", error);
    });
  };

  const removeFavorite = async (movieId) => {
    try {
      // Make the API call to remove the favorite movie
      await fetch(`https://movie-api-3jxi.onrender.com/users/${user.Username}/movies/${movieId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      // Update the user state to reflect the removed favorite movie
      setUser((prevUser) => ({
        ...prevUser,
        FavoriteMovies: prevUser.FavoriteMovies.filter((id) => id !== movieId)
      }));
    } catch (error) {
      console.error('Error removing favorite movie:', error);
    }
  };

  useEffect(() => {
    console.log("User on load:", user); // Add this line
  }, [user]);

  const filteredMovies = movies.filter((movie) =>
    movie.Title.toLowerCase().includes(filter.toLowerCase())
  );


  return (
    <div>
    <AppNavbar user={user} onLogout={onLogout} />
      <Row className="justify-content-md-center">
        <Routes>
          <Route
            path="/signup"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <SignupView />
                </Col>
              )
            }
          />
          <Route
            path="/login"
            element={
              user ? (
                <Navigate to="/" />
              ) : (
                <Col md={5}>
                  <LoginView onLoggedIn={onLoggedIn} />
                </Col>
              )
            }
          />
           <Route
            path="/profile"
            element={
              user ? (
                <Col md={8}>
                  <ProfileView user={user} token={token} onUserUpdate={onUserUpdate} removeFavorite={removeFavorite} />
                </Col>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/movies/:movieId"
            element={
              user ? (
                <Col md={8}>
                  <MovieView movies={movies} />
                </Col>
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
          <Route
            path="/"
            element={
              user ? (
                <>
                 <Row className="m-3 d-flex justify-content-center" >
                <Col md={8}>
                  <Form.Control
                    type="text"
                    placeholder="Search movies..."
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="mb-4"
                  />
                </Col>
                </Row>
                <Row>
                {filteredMovies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  filteredMovies.map((movie) => (
                    <Col className="mb-5" key={movie._id} md={3}>
                      <MovieCard movie={movie} addFavorite={addFavorite} isFavorite={user.FavoriteMovies.includes(movie._id)} removeFavorite={removeFavorite} />
                    </Col>
                  ))
                )}
                </Row>
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
      </Routes>
    </Row>
  </div>
);
};

