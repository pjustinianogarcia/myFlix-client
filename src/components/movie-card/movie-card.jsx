import PropTypes from 'prop-types';

export const MovieCard = ({ movie, onMovieClick }) => {
    return (
      <div
        onClick={() => {
          onMovieClick(movie);
        }}
      >
        {movie.title}
      </div>
    );
  };

  MovieCard.propTypes = {
    movie: PropTypes.shape({
      title: PropTypes.string,
      description: PropTypes.string.isRequired,
      director: PropTypes.string.isRequired,
      genre: PropTypes.string.isRequired,
      image: PropTypes.string
    }).isRequired,
    onBookClick: PropTypes.func.isRequired
  };