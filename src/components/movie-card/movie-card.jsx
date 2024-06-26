

import PropTypes from 'prop-types';
import { Button, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export const MovieCard = ({ movie, addFavorite, isFavorite, removeFavorite, }) => {

  const handleFavorite = () => {
    if (isFavorite) {
      removeFavorite(movie._id);
    } else {
      addFavorite(movie._id);
    }
  };

    return (
      <Card className="h-100">
        <Card.Img variant="top" src={movie.ImagePath}  className="img-fluid mx-auto d-block"/>
        <Card.Body className="d-flex flex-column">
          <Card.Title>{movie.Title}</Card.Title>
          <Card.Text className="flex-grow-1">{movie.Description}</Card.Text>
          
          <Link to={`/movies/${encodeURIComponent(movie._id)}`}>
          <Button variant="secondary" className="mt-3">More</Button>
        </Link>
        
      <Button variant={isFavorite ? "danger" : "primary"} className="mt-3" onClick={handleFavorite}>
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"} 
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
    addFavorite: PropTypes.func.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  removeFavorite: PropTypes.func.isRequired,
    
  };
