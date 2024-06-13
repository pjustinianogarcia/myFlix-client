
import { features } from 'process';
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${encodeURIComponent(movie.id)}`}>
          <Button variant="secondary">More</Button>
        </Link>
      </Card.Body>
      </Card>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      Title: PropTypes.string,
      Description: PropTypes.string.isRequired,
      Director: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          Name: PropTypes.string.isRequired
        })
      ]).isRequired,
      Genre: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
          Name: PropTypes.string.isRequired
        })
      ]).isRequired,
      ImagePath: PropTypes.string,
      Feature: PropTypes.bool
    }).isRequired
  };
