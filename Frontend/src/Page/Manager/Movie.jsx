import { useEffect, useState } from "react";
import { handleGetMovies, handlePost } from "../../API/Movie";
import { toast } from "sonner";

const MNMovie = () => {
  const [isCreate, setisCreate] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    description: "",
    country: "",
    poster: "",
    backdoor: "",
    release_date: "",
    type: "single",
    genres: [],
    episodes: [{ episode_number: 1, title: "", video_url: "" }],
  });
  const defaultForm = {
    name: "",
    description: "",
    country: "",
    poster: "",
    backdoor: "",
    release_date: "",
    type: "single",
    genres: [],
    episodes: [{ episode_number: 1, title: "", video_url: "" }],
  };

  const genresList = ["Hoạt Hình", "Hành Động", "Phiêu Lưu"];

  const getSafeImageSrc = (src) => {
    if (!src || typeof src !== "string") return "";
    const normalized = src.trim().toLowerCase();
    if (
      normalized.startsWith("file://") ||
      normalized.includes("fakepath") ||
      /^[a-z]:\\/.test(normalized)
    ) {
      return "";
    }
    return src;
  };

  const normalizeGenres = (genres) => {
    if (Array.isArray(genres)) return genres;
    if (genres && typeof genres === "object") return Object.values(genres);
    return [];
  };

  const getGenreLabel = (genre) => {
    if (genre === null || genre === undefined) return "N/A";
    if (typeof genre === "string" || typeof genre === "number") {
      return String(genre);
    }
    if (typeof genre === "object") {
      if (genre.name) return String(genre.name);
      if (genre.title) return String(genre.title);
      if (genre.label) return String(genre.label);

      const firstPrimitive = Object.values(genre).find(
        (value) =>
          typeof value === "string" ||
          typeof value === "number" ||
          typeof value === "boolean",
      );
      if (firstPrimitive !== undefined) return String(firstPrimitive);
    }
    return "N/A";
  };

  const getMovieList = async () => {
    try {
      setIsLoading(true);
      const response = await handleGetMovies();
      const movieData = Array.isArray(response?.data) ? response.data : [];
      setMovies(movieData);
    } catch (error) {
      toast.error(error?.message || "Không lấy được danh sách phim!");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getMovieList();
  }, []);

  const handleChange = (e) => {
    const { name, type, value, files } = e.target;
    setForm({ ...form, [name]: type === "file" ? files?.[0] || "" : value });
  };

  const handleGenreChange = (e) => {
    const options = [...e.target.selectedOptions];
    const values = options.map((o) => o.value);
    setForm({ ...form, genres: values });
  };

  const handleEpisodeChange = (index, field, value) => {
    const updated = [...form.episodes];
    updated[index][field] = value;
    setForm({ ...form, episodes: updated });
  };

  const addEpisode = () => {
    setForm({
      ...form,
      episodes: [
        ...form.episodes,
        {
          episode_number: form.episodes.length + 1,
          title: "",
          video_url: "",
        },
      ],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handlePost(form);
      toast.success("Thêm phim thành công!");
      setForm(defaultForm);
      getMovieList();
    } catch (error) {
      toast.error(error?.message || "Có lỗi sảy ra!");
    }
  };

  return (
    <div className="w-full max-w-6xl h-auto p-6 bg-[#191B24] text-white rounded-xl space-y-6">
      <button
        onClick={() => setisCreate(!isCreate)}
        className="text-2xl font-bold mb-6"
      >
        Thêm Movie
      </button>

      <div>
        {isCreate && (
          <form
            onSubmit={handleSubmit}
            className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6"
          >
            <div className="space-y-4">
              <input
                name="name"
                placeholder="Tên phim"
                className="w-full p-2 rounded bg-gray-800"
                onChange={handleChange}
              />

              <textarea
                name="description"
                placeholder="Mô tả"
                className="w-full p-2 rounded bg-gray-800"
                onChange={handleChange}
              />

              <input
                name="country"
                placeholder="Quốc gia"
                className="w-full p-2 rounded bg-gray-800"
                onChange={handleChange}
              />

              <label className="w-full flex p-2 rounded bg-gray-800">
                <span className="w-[10%] block">Poster</span>
                <input
                  type="file"
                  name="poster"
                  placeholder="Poster Image"
                  className=""
                  onChange={handleChange}
                />
              </label>

              <label className="w-full flex p-2 rounded bg-gray-800">
                <span className="w-[10%]">Ảnh nền</span>
                <input
                  type="file"
                  name="backdoor"
                  placeholder="Backdoor Image"
                  onChange={handleChange}
                />
              </label>

              <input
                type="date"
                name="release_date"
                className="w-full p-2 rounded bg-gray-800"
                onChange={handleChange}
              />
            </div>
            <div className="space-y-4">
              <select
                name="type"
                className="w-full p-2 rounded bg-gray-800"
                onChange={handleChange}
              >
                <option value="single">Phim lẻ</option>
                <option value="series">Phim bộ</option>
                <option value="tvshow">Tv Show</option>
                <option value="movie">Phim Chiếu Rạp</option>
              </select>

              <select
                multiple
                className="w-full p-2 rounded bg-gray-800"
                onChange={handleGenreChange}
              >
                {genresList.map((g) => (
                  <option key={g} value={g}>
                    {g}
                  </option>
                ))}
              </select>

              {/* Episodes nếu là series */}
              {form.type === "series" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Danh sách tập</h3>

                  {form.episodes.map((ep, index) => (
                    <div key={index} className="border p-3 rounded bg-gray-900">
                      <p>Tập {ep.episode_number}</p>

                      <input
                        placeholder="Tiêu đề tập"
                        className="w-full p-2 mt-2 rounded bg-gray-800"
                        onChange={(e) =>
                          handleEpisodeChange(index, "title", e.target.value)
                        }
                      />

                      <input
                        placeholder="Video URL"
                        className="w-full p-2 mt-2 rounded bg-gray-800"
                        onChange={(e) =>
                          handleEpisodeChange(
                            index,
                            "video_url",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={addEpisode}
                    className="bg-blue-600 px-4 py-2 rounded"
                  >
                    + Thêm tập
                  </button>
                </div>
              )}

              {["single", "tvshow", "movie"].includes(form.type) && (
                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">Video URL</h3>
                  <input
                    placeholder="Video URL"
                    className="w-full p-2 rounded bg-gray-800"
                    value={form.episodes[0]?.video_url || ""}
                    onChange={(e) =>
                      handleEpisodeChange(0, "video_url", e.target.value)
                    }
                  />
                </div>
              )}

              <button
                type="submit"
                className="bg-orange-600 px-6 py-2 rounded font-semibold"
              >
                Lưu phim
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Phần hiện tất cả phim */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Danh sách phim quản lý</h2>
          <button
            type="button"
            onClick={getMovieList}
            className="px-3 py-2 rounded bg-gray-700 hover:bg-gray-600 text-sm"
          >
            Tải lại
          </button>
        </div>

        {isLoading && (
          <div className="p-4 rounded-lg bg-gray-800 text-gray-300">
            Đang tải danh sách phim...
          </div>
        )}

        {!isLoading && movies.length === 0 && (
          <div className="p-4 rounded-lg bg-gray-800 text-gray-300">
            Chưa có phim nào trong hệ thống.
          </div>
        )}

        {!isLoading && movies.length > 0 && (
          <div className="space-y-3">
            {movies.map((movie, movieIndex) => (
              <div
                key={movie.id ?? movie.slug ?? `${movie.name}-${movieIndex}`}
                className="rounded-xl bg-gray-900 border border-gray-700 p-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-[100px_1fr] gap-4">
                  <img
                    src={
                      getSafeImageSrc(movie.poster) ||
                      "https://placehold.co/200x300?text=No+Image"
                    }
                    alt={movie.name}
                    className="w-full md:w-[100px] h-[140px] object-cover rounded-lg bg-gray-800"
                  />

                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-lg font-semibold">{movie.name}</h3>
                      <span className="text-xs px-2 py-1 rounded bg-blue-600 capitalize">
                        {movie.type}
                      </span>
                    </div>

                    <p className="text-sm text-gray-300 line-clamp-2">
                      {movie.description || "Chưa có mô tả"}
                    </p>

                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-300">
                      <span>Quốc gia: {movie.country || "N/A"}</span>
                      <span>
                        Phát hành: {movie.release_date?.slice(0, 10) || "N/A"}
                      </span>
                      <span>Số tập: {movie.episodes?.length || 0}</span>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {normalizeGenres(movie.genres).map(
                        (genre, genreIndex) => (
                          <span
                            key={
                              genre?.id ??
                              `${getGenreLabel(genre)}-${movie.id || movieIndex}-${genreIndex}`
                            }
                            className="text-xs px-2 py-1 rounded-full bg-gray-700"
                          >
                            {getGenreLabel(genre)}
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MNMovie;
