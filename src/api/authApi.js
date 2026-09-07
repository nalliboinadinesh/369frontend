import axios from "axios";
import { getToken } from "../utils/storage";
import { API_URL } from "../config/env";

const authClient = axios.create({
  baseURL: `${API_URL}/auth`,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 8000,
});

export const registerUser = async (userData) => {
  const response = await authClient.post("/register", userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await authClient.post("/login", credentials);
  return response.data;
};
