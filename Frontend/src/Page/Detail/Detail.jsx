import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { handleGetMovies } from "../../API/Movie";

const Detail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

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
  }, [id]);

  const firstVideoUrl = useMemo(() => {
    if (!Array.isArray(movie?.episodes)) return "";
    return movie.episodes.find((ep) => ep?.video_url)?.video_url || "";
  }, [movie]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#191B24] p-6 pt-24 text-white">
        Dang tai thong tin phim...
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="min-h-screen bg-[#191B24] p-6 pt-24 text-white">
        Khong tim thay phim.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#191B24] p-4 pt-24 text-white md:p-8 md:pt-28">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 rounded-xl bg-white/5 p-5 md:grid-cols-[320px_1fr] md:p-8">
        <img
          src={movie.poster || movie.backdoor}
          alt={movie.name}
          className="h-[420px] w-full rounded-lg object-cover"
        />

        <div className="space-y-4">
          <h1 className="text-3xl font-bold md:text-4xl">{movie.name}</h1>
          <p className="text-gray-200">{movie.description || "Chua co mo ta"}</p>
          <p>
            <span className="font-semibold">Quoc gia:</span>{" "}
            {movie.country || "Dang cap nhat"}
          </p>
          <p>
            <span className="font-semibold">Ngay phat hanh:</span>{" "}
            {movie.release_date
              ? new Date(movie.release_date).toLocaleDateString("vi-VN")
              : "Dang cap nhat"}
          </p>
          <p>
            <span className="font-semibold">The loai:</span>{" "}
            {Array.isArray(movie.genres) && movie.genres.length
              ? movie.genres.map((item) => item?.name).filter(Boolean).join(", ")
              : "Dang cap nhat"}
          </p>
          <p>
            <span className="font-semibold">Loai phim:</span> {movie.type || "N/A"}
          </p>

          <button
            type="button"
            onClick={() =>
              navigate(`/xem-phim/${movie.id}`, {
                state: {
                  videoUrl: firstVideoUrl,
                  movieName: movie.name,
                  movieInfo: {
                    name: movie.name,
                    description: movie.description,
                    poster: movie.poster || movie.backdoor || "",
                    totalEpisodes: Array.isArray(movie.episodes)
                      ? movie.episodes.length
                      : 0,
                    genres: Array.isArray(movie.genres)
                      ? movie.genres.map((item) => item?.name).filter(Boolean)
                      : [],
                  },
                },
              })
            }
            disabled={!firstVideoUrl}
            className="rounded-md bg-yellow-300 px-5 py-3 font-semibold text-black disabled:cursor-not-allowed disabled:opacity-50"
          >
            Xem phim
          </button>
        </div>
      </div>
    </div>
  );
};

export default Detail;
