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
import Button from "react-bootstrap/Button";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  //const [selectedMovie, setSelectedMovie] = useState(null);
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
  };

  const onLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.clear();
  };

  return (
    <BrowserRouter>
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
                  <ProfileView user={user} token={token} onUserUpdate={onUserUpdate} />
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
                movies.length === 0 ? (
                  <Col>The list is empty!</Col>
                ) : (
                  <>
                    {movies.map((movie) => (
                      <Col className="mb-5" key={movie._id} md={3}>
                        <MovieCard movie={movie} />
                      </Col>
                    ))}
                    
                  </>
                )
              ) : (
                <Navigate to="/login" replace />
              )
            }
          />
        </Routes>
      </Row>
    </BrowserRouter>
  );
};