import { useParams } from 'react-router-dom';
import { Link } from "react-router-dom";

export const MovieView = ({ movies }) => {
    const { movieId } = useParams();
  
    const movie = movies.find((m) => m.id === movieId);



    return (
      <div>
      <div>
        <img src={movies.ImagePath} />
      </div>
      <div>
        <span>Title: </span>
        <span>{movies.Title}</span>
      </div>
      <div>
        <span>Description: </span>
        <span>{movies.Description}</span>
      </div>
      <div>
  <span>Director: </span>
        <span>{typeof movies.Director === 'object' ? movies.Director.Name : movies.Director}</span>
      </div>
      <div>
        <span>Genre: </span>
        <span>{typeof movies.Genre === 'object' ? movies.Genre.Name : movies.Genre}</span>
      </div>
      <Link to={`/`}>
        <button className="back-button">Back</button>
      </Link>
      </div>
    );
  };