import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { handleGetMoviesByGenre } from "../../../API/Movie";
import { toast } from "sonner";

const Classtify = () => {
  const { genre } = useParams();
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const genreName = decodeURIComponent(genre || "");

  useEffect(() => {
    const getMovies = async () => {
      try {
        setIsLoading(true);
        const response = await handleGetMoviesByGenre(genreName);
        setMovies(Array.isArray(response?.data) ? response.data : []);
      } catch (error) {
        toast.error(error?.message || "Không lấy được danh sách phim!");
      } finally {
        setIsLoading(false);
      }
    };

    getMovies();
  }, [genreName]);

  return (
    <div className="min-h-screen w-full bg-[#191B24] px-4 pt-24 pb-8 text-white">
      <div className="mx-auto max-w-6xl space-y-4">
        <h1 className="text-2xl font-semibold">Thể loại: {genreName}</h1>

        {isLoading && (
          <div className="rounded-md bg-gray-50/10 p-4">Đang tải phim...</div>
        )}

        {!isLoading && movies.length === 0 && (
          <div className="rounded-md bg-gray-50/10 p-4">
            Chưa có phim thuộc thể loại này.
          </div>
        )}

        {!isLoading && movies.length > 0 && (
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
export default Classtify;
