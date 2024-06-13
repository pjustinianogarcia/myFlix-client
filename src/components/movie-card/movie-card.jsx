import { features } from 'process';
import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath} />
        <Card.Body>
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movie)} variant="primary">
          More
          </Button>
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
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };