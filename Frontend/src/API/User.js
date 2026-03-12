import axios from "./utils/axiosCustomer";

export const handleGetUsers = () => {
  return axios.get("users");
};

export const handleCreateUser = (payload) => {
  return axios.post("auth/register", payload);
};

export const handleUpdateUser = (userId, payload) => {
  return axios.put(`users/${userId}`, payload);
};

export const handleDeleteUser = (userId) => {
  return axios.delete(`users/${userId}`);
};
