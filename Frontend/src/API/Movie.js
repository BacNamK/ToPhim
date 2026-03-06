import axios from "./utils/axiosCustomer";

export const handleGetMovies = () => {
  return axios.get("movie");
};

export const handleGetMoviesByGenre = (genre) => {
  return axios.get(`movie/genre/${encodeURIComponent(genre || "")}`);
};

// Gửi phim xuống db
export const handlePost = (form) => {
  const payload = new FormData();

  payload.append("name", form.name || "");
  payload.append("description", form.description || "");
  payload.append("country", form.country || "");
  payload.append("release_date", form.release_date || "");
  payload.append("type", form.type || "single");
  payload.append("genres", JSON.stringify(form.genres || []));
  payload.append("episodes", JSON.stringify(form.episodes || []));

  if (form.poster instanceof File) {
    payload.append("poster", form.poster);
  } else if (form.poster) {
    payload.append("poster", form.poster);
  }

  if (form.backdoor instanceof File) {
    payload.append("backdoor", form.backdoor);
  } else if (form.backdoor) {
    payload.append("backdoor", form.backdoor);
  }

  return axios.post("movie", payload, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
