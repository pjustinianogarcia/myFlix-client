import Button from "react-bootstrap/Button";
export const MovieView = ({ movie, onBackClick }) => {
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
        <Button variant="primary" onClick={onBackClick}>Back</Button>
      </div>
    );
  };