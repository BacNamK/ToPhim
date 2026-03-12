import { useLocation } from "react-router-dom";

const WatchMovie = () => {
  const location = useLocation();
  const movie = location.state?.movie;

  if (!movie) return null;

  console.log(movie);

  return (
    <div
      style={{
        background: "#000",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <iframe
        width="80%"
        height="80%"
        src={movie.video}
        title={movie.title}
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default WatchMovie;
