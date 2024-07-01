import React, { useState, useEffect } from "react";
import { Form, Button, Row, Col, Card } from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";

export const ProfileView = ({ user, token, onUserUpdate, removeFavorite }) => {
  const [username, setUsername] = useState(user.Username);
  const [email, setEmail] = useState(user.Email);
  const [birthday, setBirthday] = useState(user.Birthday);
  const [password, setPassword] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  useEffect(() => {
    fetch(`https://movie-api-3jxi.onrender.com/movies`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => response.json())
    .then((data) => {
      const favoriteMovies = data.filter((movie) =>
        user.FavoriteMovies.includes(movie._id)
      );
      setFavoriteMovies(favoriteMovies);
    });
  }, [token, user.FavoriteMovies]);

  const handleUpdate = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch(`https://movie-api-3jxi.onrender.com/users/${user.Username}`, {
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

  const handleDeregister = () => {
    fetch(`https://movie-api-3jxi.onrender.com/users/${user.Username}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      if (response.ok) {
        alert("Profile deleted successfully");
        localStorage.clear();
        onUserUpdate(null);
      } else {
        throw new Error("Deregistration failed");
      }
    })
    .catch((error) => {
      console.error("Error deleting profile:", error);
      alert("An error occurred. Please try again.");
    });
  };

  const handleRemoveFavorite = (movieId) => {
    removeFavorite(movieId);
  };

  return (
    <>
      <h2>Profile</h2>
      <Form onSubmit={handleUpdate}>
        <Form.Group controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formBirthday">
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className="mt-3">
          Update Profile
        </Button>
      </Form>
      <Button variant="danger" onClick={handleDeregister} className="mt-3">
        Delete Profile
      </Button>

      <h3 className="mt-4">Favorite Movies</h3>
      <Row>
        {favoriteMovies.map((movie) => (
          <Col md={3} key={movie._id} className="mb-3">
            <Card className="h-100 movie-card">
              <MovieCard movie={movie} isFavorite={true} removeFavorite={handleRemoveFavorite} />
            </Card>
          </Col>
        ))}
      </Row>
    </>
  );
};
