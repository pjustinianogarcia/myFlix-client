import { features } from 'process';
import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
       {movie.Title}
      <p>{movie.Description}</p>
      </div>
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