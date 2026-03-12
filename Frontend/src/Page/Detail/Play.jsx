import { useEffect, useMemo, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { handleGetMovies } from "../../API/Movie";

const Play = () => {
  const { id } = useParams();
  const location = useLocation();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const stateUrl = location.state?.videoUrl;
    if (stateUrl) return;

    let isMounted = true;
    setLoading(true);

    const loadMovie = async () => {
      try {
        const response = await handleGetMovies();
        const list = Array.isArray(response?.data) ? response.data : [];
        const foundMovie =
          list.find((item) => String(item?.id) === String(id)) || null;

        if (!isMounted) return;
        setMovie(foundMovie);
      } catch (_error) {
        if (!isMounted) return;
        setMovie(null);
      } finally {
        if (!isMounted) return;
        setLoading(false);
      }
    };

    loadMovie();

    return () => {
      isMounted = false;
    };
  }, [id, location.state]);

  const videoUrl = useMemo(() => {
    if (location.state?.videoUrl) return location.state.videoUrl;
    if (!Array.isArray(movie?.episodes)) return "";
    return movie.episodes.find((ep) => ep?.video_url)?.video_url || "";
  }, [location.state, movie]);

  const movieInfo = useMemo(() => {
    if (location.state?.movieInfo) return location.state.movieInfo;
    if (!movie) return null;

    return {
      name: movie.name || "",
      description: movie.description || "",
      poster: movie.poster || movie.backdoor || "",
      totalEpisodes: Array.isArray(movie.episodes) ? movie.episodes.length : 0,
      genres: Array.isArray(movie.genres)
        ? movie.genres.map((item) => item?.name).filter(Boolean)
        : [],
    };
  }, [location.state, movie]);

  if (loading) {
    return (
      <div className="min-h-screen bg-black p-6 pt-24 text-white">
        Dang tai video...
      </div>
    );
  }

  if (!videoUrl) {
    return (
      <div className="min-h-screen bg-black p-6 pt-24 text-white">
        Phim nay chua co video_url.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black p-3 pt-24 md:p-6 md:pt-28">
      <div className="mx-auto max-w-6xl">
        <iframe
          src={videoUrl}
          title={location.state?.movieName || "Movie player"}
          className="aspect-video w-full rounded-md"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />

        <div className="mt-4 grid grid-cols-[90px_1fr] gap-3 rounded-md border border-white/10 bg-white/5 p-4 text-white md:grid-cols-[110px_1fr]">
          <img
            src={movieInfo?.poster || "https://placehold.co/220x320?text=No+Poster"}
            alt={movieInfo?.name || "Poster phim"}
            className="h-[130px] w-full rounded object-cover md:h-[150px]"
          />

          <div>
            <h2 className="text-lg font-semibold">
              {movieInfo?.name || location.state?.movieName || "Thong tin phim"}
            </h2>
            <p className="mt-2 line-clamp-2 text-sm text-gray-300">
              {movieInfo?.description || "Chua co mo ta."}
            </p>
            <p className="mt-2 text-xs text-gray-300">
              So tap: {Number(movieInfo?.totalEpisodes || 0)}
            </p>
            <p className="mt-1 text-xs text-gray-400">
              The loai:{" "}
              {movieInfo?.genres?.length
                ? movieInfo.genres.join(", ")
                : "Dang cap nhat"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Play;
