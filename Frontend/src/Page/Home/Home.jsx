import { useEffect, useMemo, useState } from "react";
import { handleGetMoviesByGenre } from "../../API/Movie";
import BgImage from "../../image/ImageTest1.jpg";

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    let isMounted = true;

    const getAnimationMovies = async () => {
      try {
        const response = await handleGetMoviesByGenre("Hoạt Hình");
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
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${BgImage})` }}
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-r from-[#191B24]/95 via-[#191B24]/50 to-transparent" />
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

        {movies.length > 1 && (
          <div className="absolute bottom-8 right-4 z-20 flex max-w-[60vw] gap-3 overflow-x-auto pb-2 md:right-8">
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

      <div className="w-full h-screen bg-[#191B24] p-5">
        <div className="w-full h-full bg-gray-50/5 rounded-md shadow"></div>
      </div>
    </>
  );
};

export default Home;
