import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./movieCard.css";

function MovieCard({ movie }) {

  const [hover,setHover] = useState(false);
  const navigate = useNavigate();

  return (
    <div
      className="movie-card"
      onMouseEnter={()=>setHover(true)}
      onMouseLeave={()=>setHover(false)}
    >

      <img src={movie.poster} className="poster"/>

      {hover && (
        <div className="hover-preview">

          <h3>{movie.name}</h3>
          <p className="sub">{movie.enName}</p>

          <div className="btn-row">

            <button
              className="watch"
              onClick={()=>navigate(`/movie/${movie.id}`)}
            >
              ▶ Xem ngay
            </button>

            <button className="like">❤ Thích</button>

            <button
              className="detail"
              onClick={()=>navigate(`/movie/${movie.id}`)}
            >
              ⓘ Chi tiết
            </button>

          </div>

          <div className="meta">

            <span className="imdb">IMDb {movie.imdb}</span>
            <span>{movie.age}</span>
            <span>{movie.year}</span>
            <span>{movie.time}</span>

          </div>

          <p className="genre">{movie.genre}</p>

        </div>
      )}

    </div>
  );
}

export default MovieCard;