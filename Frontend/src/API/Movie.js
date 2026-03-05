import axios from "./utils/axiosCustomer";

// Gửi phim xuống db
export const handlePost = (form) => {
  return axios.post("movie", form);
};
