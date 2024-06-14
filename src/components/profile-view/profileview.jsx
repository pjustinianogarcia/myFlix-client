import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, onUserUpdate }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [password, setPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetch(`https://myflixachv-8f7ac3ab3517.herokuapp.com/users/${user.Username}/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((response) => response.json())
      .then((data) => {
        setFavoriteMovies(data);
      });
  }, [token, user.Username]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://myflixachv-8f7ac3ab3517.herokuapp.com/users/${user.Username}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Update failed");
        }
      })
      .then((updatedUser) => {
        alert("Profile updated successfully");
        onUserUpdate(updatedUser);
      })
      .catch((error) => {
        console.error("Error updating profile:", error);
        alert("An error occurred. Please try again.");
      });
  };

  const handleRemoveFavorite = (movieId) => {
    fetch(`https://myflixachv-8f7ac3ab3517.herokuapp.com/users/${user.Username}/movies/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (response.ok) {
          setFavoriteMovies((movies) => movies.filter((movie) => movie._id !== movieId));
        } else {
          throw new Error("Failed to remove movie from favorites");
        }
      })
      .catch((error) => {
        console.error("Error removing favorite movie:", error);
        alert("An error occurred. Please try again.");
      });
  };

  return (
    <Row>
      <Col md={6}>
        <Form onSubmit={handleUpdate}>
          <Form.Group controlId="formUsername">
            <Form.Label>Username:</Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              minLength="3"
            />
          </Form.Group>

          <Form.Group controlId="formPassword">
            <Form.Label>Password:</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail">
            <Form.Label>Email:</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBirthday">
            <Form.Label>Birthday:</Form.Label>
            <Form.Control
              type="date"
              value={birthday}
              onChange={(e) => setBirthday(e.target.value)}
              required
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Update Profile
          </Button>
        </Form>
      </Col>
      <Col md={6}>
        <h3>Favorite Movies</h3>
        {favoriteMovies.length === 0 ? (
          <p>No favorite movies</p>
        ) : (
          favoriteMovies.map((movie) => (
            <Card key={movie._id} className="mb-3">
              <Card.Body>
                <MovieCard movie={movie} />
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFavorite(movie._id)}
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          ))
        )}
      </Col>
    </Row>
  );
};
