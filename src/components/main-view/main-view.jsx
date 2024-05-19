import { useState } from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

export const MainView = () => {
  const [movies, setMovies] = useState([
    {
      id: 1,
      title: "Clueless",
      image:
        "clueless.jpg",
      director: "Amy Heckerling"
    },
    {
      id: 2,
      title: "Mean Girls",
      image:
        "meangirls.png",
      director: "Tina Fey"
    },
    {
      id: 3,
      title: "What a Girl Wants",
      image:
        "whatagirlwants.jpg",
      director: "Dennie Gordon"
    },
    {
      id: 4,
      title: "The 10 Things I Hate About You",
      image:
        "10thingsihateaboutyou.jpg",
      director: "Gil Junger"
    },
    {
      id: 5,
      title: "Heathers",
      image:
        "heathers.jpg",
      director: "Michael Stephen"
    }
  ]);

  const [selectedMovie, setSelectedMovie] = useState(null);

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
          onClick={() => {
            setSelectedMovie(movie);
          }}
        />
      ))}
    </div>
  );
};

