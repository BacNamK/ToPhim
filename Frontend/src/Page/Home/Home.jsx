import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleGetMoviesByGenre } from "../../API/Movie";

import {
  singleMovies,
  seriesMovies,
  tvshowMovies,
  theaterMovies,
} from "../../Data/mockMovies";

import BgImage from "../../image/ImageTest1.jpg";
import playicon from "../../image/play.png";



import Image from "../../image/ImageTest1.jpg";

const Home = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);
  const [moviesByType, setMoviesByType] = useState({
    single: [],
    series: [],
    tvshow: [],
    theater: [],
  });

  useEffect(() => {
    let isMounted = true;

    const getAnimationMovies = async () => {
      try {
        const response = await handleGetMoviesByGenre("Hành Động");
        const data = Array.isArray(response?.data) ? response.data : [];
        const validMovies = data.filter((movie) => movie?.backdoor);

        if (!isMounted) return;
        setMovies(validMovies);
        setActiveSlide(0);
      } catch (_error) {
        if (!isMounted) return;
        setMovies([]);
      }
    };

    getAnimationMovies();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    if (movies.length <= 1) return undefined;

    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % movies.length);
    }, 10000);

    return () => clearInterval(timer);
  }, [movies]);

  // Fetch các loại phim khác nhau
  useEffect(() => {
    setMoviesByType({
      single: singleMovies.slice(0, 12),
      series: seriesMovies.slice(0, 12),
      tvshow: tvshowMovies.slice(0, 10),
      theater: theaterMovies.slice(0, 10),
    });
  }, []);

  const currentMovie = useMemo(() => {
    if (!movies.length) return null;
    return movies[activeSlide] || movies[0];
  }, [movies, activeSlide]);

  return (
    <>
      <div className="relative h-screen w-full overflow-hidden bg-[#191B24]">
        {movies.length > 0 ? (
          movies.map((movie, index) => (
            <div
              key={movie.id ?? movie.slug ?? `${movie.name}-${index}`}
              className={`absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ${
                index === activeSlide ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundImage: `url(${movie.backdoor})` }}
            />
          ))
        ) : (
          <div className="absolute inset-0 bg-cover bg-center" />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#191B24]/25 via-[#191B24]/20 to-transparent" />
        <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_250px_#191B24]" />
        <div className="absolute bottom-0 left-0 h-[15%] w-full bg-gradient-to-t from-[#191B24] to-transparent" />

        {currentMovie && (
          <div className="absolute left-6 top-1/2 z-20 max-w-3xl -translate-y-1/2 text-white md:left-10">
            <h1 className="line-clamp-2 text-4xl font-semibold leading-tight md:text-6xl">
              {currentMovie.name}
            </h1>
            {currentMovie.description && (
              <p className="mt-5 line-clamp-4 max-w-2xl text-sm text-gray-200 md:text-xl">
                {currentMovie.description}
              </p>
            )}
          </div>
        )}

        {/* 1-1 Chuyền data xuống detail */}
        <button
          type="button"
          onClick={() => {
            if (!currentMovie?.id) return;
            navigate(`/chi-tiet/${currentMovie.id}`);
          }}
          className="absolute size-20 flex justify-center items-center rounded-full bg-yellow-300 bottom-10 left-10 text-white disabled:opacity-50"
          disabled={!currentMovie?.id}
        >
          <img src={playicon} alt="Xem chi tiet phim" />
        </button>

        {movies.length > 1 && (
          <div className="absolute bottom-8 right-4 z-20 flex max-w-[60vw] gap-3 overflow-x-auto pb-2 scrollbar-hide md:right-8">
            {movies.map((movie, index) => (
              <button
                key={`${movie.id ?? movie.slug ?? index}-thumb`}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`h-14 w-24 shrink-0 overflow-hidden rounded-md border transition-all md:h-16 md:w-28 ${
                  index === activeSlide
                    ? "border-white"
                    : "border-white/30 opacity-80 hover:opacity-100"
                }`}
              >
                <img
                  src={movie.poster || movie.backdoor}
                  alt={movie.name}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="w-full bg-[#191B24] p-5 md:p-8">
        {/* 1-2 Phim Lẻ */}
        {moviesByType.single.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-yellow-300 md:text-2xl">
                Phim Lẻ Mới
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:gap-4">
              {moviesByType.single.map((movie, index) => (
                <a
                  href="/phim-le"
                  key={movie.id ?? `single-${index}`}
                  className="shrink-0 cursor-pointer group"
                >
                  <div className="relative h-40 w-28 overflow-hidden rounded-lg md:h-48 md:w-32">
                    <img
                      src={movie.poster || movie.backdoor}
                      alt={movie.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                  </div>
                  <h3 className="mt-2 line-clamp-1 text-xs font-semibold text-white md:text-sm">
                    {movie.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 1-2 Phim Bộ */}
        {moviesByType.series.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-yellow-300 md:text-2xl">
                Phim Bộ Mới
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:gap-4">
              {moviesByType.series.map((movie, index) => (
                <a
                  href="/phim-bo"
                  key={movie.id ?? `series-${index}`}
                  className="shrink-0 cursor-pointer group"
                >
                  <div className="relative h-40 w-28 overflow-hidden rounded-lg md:h-48 md:w-32">
                    <img
                      src={movie.poster || movie.backdoor}
                      alt={movie.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    {Array.isArray(movie.episodes) &&
                      movie.episodes.length > 0 && (
                        <div className="absolute bottom-1 left-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                          PD. {movie.episodes.length}
                        </div>
                      )}
                  </div>
                  <h3 className="mt-2 line-clamp-1 text-xs font-semibold text-white md:text-sm">
                    {movie.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 1-2 TV Show */}
        {moviesByType.tvshow.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-yellow-300 md:text-2xl">
                TV Show Mới
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:gap-4">
              {moviesByType.tvshow.map((movie, index) => (
                <a
                  href="/tvshow"
                  key={movie.id ?? `tvshow-${index}`}
                  className="shrink-0 cursor-pointer group"
                >
                  <div className="relative h-40 w-28 overflow-hidden rounded-lg md:h-48 md:w-32">
                    <img
                      src={movie.poster || movie.backdoor}
                      alt={movie.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    {Array.isArray(movie.episodes) &&
                      movie.episodes.length > 0 && (
                        <div className="absolute bottom-1 left-1 rounded bg-red-600 px-1.5 py-0.5 text-xs font-semibold text-white">
                          PD. {movie.episodes.length}
                        </div>
                      )}
                  </div>
                  <h3 className="mt-2 line-clamp-1 text-xs font-semibold text-white md:text-sm">
                    {movie.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* 1-2 Phim Chiếu Rạp */}
        {moviesByType.theater.length > 0 && (
          <div className="mb-12">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold text-yellow-300 md:text-2xl">
                Phim Chiếu Rạp Hot
              </h2>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide md:gap-4">
              {moviesByType.theater.map((movie, index) => (
                <a
                  href="/phim-chieu-rap"
                  key={movie.id ?? `theater-${index}`}
                  className="shrink-0 cursor-pointer group"
                  onClick={() => navigate(`/chi-tiet/${movie.id}`)}
                >
                  <div className="relative h-40 w-28 overflow-hidden rounded-lg md:h-48 md:w-32">
                    <img
                      src={movie.poster || movie.backdoor}
                      alt={movie.name}
                      className="h-full w-full object-cover transition-transform group-hover:scale-110"
                    />
                    <div className="absolute bottom-1 left-1 rounded bg-orange-500 px-1.5 py-0.5 text-xs font-semibold text-white">
                      {movie.rating}
                    </div>
                  </div>
                  <h3 className="mt-2 line-clamp-1 text-xs font-semibold text-white md:text-sm">
                    {movie.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Home;
