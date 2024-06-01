import { useState, useEffect } from "react";
import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies] = useState([]);

  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    fetch("https://git.heroku.com/myflixachv.git")
      .then((response) => response.json())
      .then((data) => {
        console.log("movies from api:", data);
        setMovies(data);
      });
  }, []);

  if (selectedMovie) {
    return (
      <MovieView movie={selectedMovie} onBackClick={() => setSelectedMovie(null)} />
    );
  }

  if (movies.length === 0) {
    return <div>The list is empty!</div>;
  }


  return (
    <div>
      {movies.map((movie) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          onMovieClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};

