import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
        <p>{movie.description}</p>
      </div>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired,
    onMovieClick: PropTypes.func.isRequired
  };