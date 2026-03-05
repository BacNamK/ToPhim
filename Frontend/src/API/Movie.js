import axios from "./utils/axiosCustomer";

export const handlePost = (form) => {
  return axios.post("movie", form);
};
