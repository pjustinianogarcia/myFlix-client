import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
  
    const movie = movies.find((m) => m.id === movieId);



    return (
      <div>
      <div>
        <img src={movie.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movie.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movie.Description}</span>
      </div>
      <div>
  <span>Director: </span>
        <span>{typeof movie.Director === 'object' ? movie.Director.Name : movie.Director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{typeof movie.Genre === 'object' ? movie.Genre.Name : movie.Genre}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      </div>
    );
  };