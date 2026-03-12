import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  singleMovies,
  seriesMovies,
  tvshowMovies,
  theaterMovies,
} from "../../../Data/mockMovies";

const Country = () => {
  const { country } = useParams();
  const countryName = decodeURIComponent(country || "");
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const all = [
      ...singleMovies,
      ...seriesMovies,
      ...tvshowMovies,
      ...theaterMovies,
    ];
    const filtered = all.filter((m) => m.country && m.country === countryName);
    setMovies(filtered);
  }, [countryName]);

  return (
    <div className="min-h-screen w-full bg-[#191B24] px-4 pt-24 pb-8 text-white">
      <div className="mx-auto max-w-6xl space-y-4">
        <h1 className="text-2xl font-semibold">Quốc gia: {countryName}</h1>

        {movies.length === 0 && (
          <div className="rounded-md bg-gray-50/10 p-4">
            Chưa có phim thuộc quốc gia này.
          </div>
        )}

        {movies.length > 0 && (
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
            {movies.map((movie, index) => (
              <div
                key={movie.id ?? movie.slug ?? `${movie.name}-${index}`}
                className="overflow-hidden rounded-md bg-gray-50/10"
              >
                <img
                  src={
                    movie.poster || "https://placehold.co/300x450?text=No+Image"
                  }
                  alt={movie.name}
                  className="h-60 w-full object-cover"
                />
                <div className="p-3">
                  <p className="line-clamp-2 text-sm font-medium">
                    {movie.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Country;
