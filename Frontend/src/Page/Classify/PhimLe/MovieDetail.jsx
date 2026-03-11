import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { handleGetMovies } from "../../../API/Movie";
import "./singleMovies.css";

const MovieDetail = () => {
  const location = useLocation();
  const [movie, setMovies] = useState(null);

  useEffect(() => {
    if (location.state?.movie) {
      setMovies(location.state?.movie);
    }
  }, [location]);

  console.log(movie);

  return <div>{movie && <h1>{movie.title}</h1>}</div>;
};

export default MovieDetail;
