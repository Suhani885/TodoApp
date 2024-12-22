import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getUsers = async () => {
  const response = await axios.get(`${BASE_URL}/users`);
  return response.data;
};

export const updateUserRole = async (userId, updatedData) => {
  await axios.patch(`${BASE_URL}/users/${userId}`, updatedData);
};
