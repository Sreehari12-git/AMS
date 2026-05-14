import api from "./axios";

export const createUser = async (userData) => {
  const response = await api.post("users/create", userData);
  return response.data;
};

export const deleteUser = async (email) => {
  const response = await api.delete(`/users/delete/${email}`);
  return response.data;
};