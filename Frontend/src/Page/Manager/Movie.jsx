import { useState } from "react";
import { handlePost } from "../../API/Movie";
import { toast } from "sonner";

const MNMovie = () => {
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

  const genresList = [
    "Action",
    "Adventure",
    "Mecha",
    "Drama",
    "Comedy",
    "Horror",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
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
    } catch (error) {
      toast.error(error?.message || "Có lỗi sảy ra!");
    }
  };

  return (
    <div className="max-w-3xl h-auto mx-auto p-6 bg-[#191B24] text-white rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Thêm Movie</h2>

      <form onSubmit={handleSubmit} className="space-y-4 w-full">
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
                    handleEpisodeChange(index, "video_url", e.target.value)
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
              onChange={(e) => handleEpisodeChange(0, "video_url", e.target.value)}
            />
          </div>
        )}

        <button
          type="submit"
          className="bg-orange-600 px-6 py-2 rounded font-semibold"
        >
          Lưu phim
        </button>
      </form>
    </div>
  );
};

export default MNMovie;
