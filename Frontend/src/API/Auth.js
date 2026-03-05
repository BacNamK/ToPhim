import axios from "./utils/axiosCustomer";

export const handleRegister = (payload) => {
  return axios.post("auth/register", payload);
};

export const handleLogin = (payload) => {
  return axios.post("auth/login", payload);
};
