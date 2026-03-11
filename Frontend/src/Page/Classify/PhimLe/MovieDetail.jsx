import { useLocation } from "react-router-dom";

const MovieDetail = () => {
  const location = useLocation();
  const movie = location.state;



  return (
    <div className="min-h-screen bg-[#191B24] text-white">

      {/* Banner */}
      <div
        className="h-[450px] bg-cover bg-center relative"
        style={{ backgroundImage: `url(${movie.backdoor})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-[#191B24] to-transparent"></div>
      </div>

      {/* Nội dung */}
      <div className="max-w-6xl mx-auto px-6 -mt-40 flex gap-10 relative z-10">

        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.name}
          className="w-[200px] rounded-lg shadow-lg"
        />

        {/* Thông tin phim */}
        <div className="flex-1">

          <h1 className="text-4xl font-bold">
            {movie.name}
          </h1>

          <p className="text-gray-400 mt-3 max-w-2xl">
            {movie.description}
          </p>

          {/* Button */}
          <div className="flex gap-4 mt-6">

            <button className="bg-yellow-400 text-black px-6 py-2 rounded-full font-semibold">
              ▶ Xem ngay
            </button>

            <button className="border border-gray-500 px-4 py-2 rounded-full">
              + Yêu thích
            </button>

          </div>

          {/* Thông tin thêm */}
          <div className="mt-6 text-gray-300 space-y-2">

            <p>
              <span className="text-gray-400">Thể loại:</span> {movie.genre}
            </p>

            <p>
              <span className="text-gray-400">Năm:</span> {movie.year}
            </p>

            <p>
              <span className="text-gray-400">Quốc gia:</span> {movie.country}
            </p>

          </div>

        </div>
      </div>

    </div>
  );
};

export default MovieDetail;