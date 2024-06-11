import React, { useState, useEffect } from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { LoginView } from "../login-view/login-view";
import { SignupView } from "../signup-view/signup-view";
import Row from "react-bootstrap/Row";
import Col from 'react-bootstrap/Col';
import Button from "react-bootstrap/Button";

export const MainView = () => {
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const storedToken = localStorage.getItem("token");
  const [user, setUser] = useState(storedUser? storedUser : null);
  const [token, setToken] = useState(storedToken? storedToken : null);

  useEffect(() => {
    if (!token) {
      return;
    }
    fetch("https://myflixachv-8f7ac3ab3517.herokuapp.com/movies", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response) => response.json())
    .then((data) => {
      setMovies(data);
    });
  }, [token]);

  
  if (!user) {
    return (
      <Row style={{border: "1px solid blue"}}>
      <>
      <Col md={5}>
      <LoginView onLoggedIn={(user, token) => {
        setUser(user);
        setToken(token);
        localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("token", token);
      }} />
      or
      <SignupView />
      </Col>
    </>
   </Row> 
  );
}

  if (selectedMovie) {
    return (
      <Row className="justify-content-md-center">
      <Col md={8} style={{border: "1px solid blue"}}>
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
      </Col>
      </Row>
    );
  }

  if (movies.length === 0) {
  
    return <Row><div>The list is empty!</div></Row>;
    
  }


  return (
    <Row>
      {movies.map((movie) => (
        <Col className="mb-5" key={movie._id} md={3}>
        <MovieCard
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
        </Col>
      ))}
      <Button variant="primary" onClick={() => { setUser(null); setToken(null); localStorage.clear(); }}>Logout</Button>
    </Row>
  );
};


