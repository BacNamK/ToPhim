import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleGetMovies } from "../../../API/Movie";
import "./singleMovies.css";

const MovieDetail = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await handleGetMovies();
        const data = res?.data || [];

        const foundMovie = data.find(
          (m) => String(m.id) === String(id)
        );

        setMovie(foundMovie || null);
      } catch (error) {
        console.error("Lỗi lấy phim:", error);
      }
    };

    getMovie();
  }, [id]);

  if (!movie) {
    return (
      <div className="loading" style={{ color: "white", padding: "40px" }}>
        Loading...
      </div>
    );
  }

  return (
    <div
      className="movie-detail"
      style={{
        backgroundImage: `url(${movie.backdoor || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="overlay"></div>

      <div className="movie-detail-container">
        <div className="movie-poster">
          <img
            src={movie.poster}
            alt={movie.name}
          />
        </div>

        <div className="movie-info-detail">
          <h1>{movie.name}</h1>

          <p className="meta">
            {movie.release_date?.slice(0, 4)} • {movie.country}
          </p>

          <div className="genres">
            {movie.genres?.map((g, i) => (
              <span key={i}>{g.name || g}</span>
            ))}
          </div>

          <p className="description">{movie.description}</p>

          {movie.episodes?.[0]?.video_url && (
            <a
              href={movie.episodes[0].video_url}
              className="watch-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              ▶ Xem phim
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;