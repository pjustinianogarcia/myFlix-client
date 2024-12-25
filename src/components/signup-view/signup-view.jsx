import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom"; // Use React Router for navigation

export const SignupView = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const navigate = useNavigate(); // React Router hook for navigation

  const handleSubmit = (event) => {
    event.preventDefault();

    const data = {
      Username: username,
      Password: password,
      Email: email,
      Birthday: birthday,
    };

    fetch("https://movie-api-3jxi.onrender.com/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          alert("Signup successful! Redirecting to the login page.");
          navigate("/login"); // Redirects to login page
        } else {
          return response.json().then((error) => {
            alert(
              `Signup failed: ${
                error?.errors?.[0]?.msg || "Unknown error occurred."
              }`
            );
          });
        }
      })
      .catch((error) => {
        console.error("Error during signup:", error);
        alert("An error occurred. Please try again later.");
      });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="formUsername">
        <Form.Label>Username:</Form.Label>
        <Form.Control
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          minLength="5"
          placeholder="Enter your username"
        />
      </Form.Group>

      <Form.Group controlId="formPassword" className="mt-3">
        <Form.Label>Password:</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          placeholder="Enter a strong password"
        />
      </Form.Group>

      <Form.Group controlId="formEmail" className="mt-3">
        <Form.Label>Email:</Form.Label>
        <Form.Control
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          placeholder="Enter your email"
        />
      </Form.Group>

      <Form.Group controlId="formBirthday" className="mt-3">
        <Form.Label>Birthday:</Form.Label>
        <Form.Control
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          required
        />
      </Form.Group>

      <Button variant="primary" type="submit" className="mt-4">
        Signup
      </Button>
    </Form>
  );
};
