import { useNavigate } from "react-router-dom";

const MovieCard = ({ movie }) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleClick}>
      <img src={movie.image} />
      <h4>{movie.title}</h4>
    </div>
  );
};

export default MovieCard;