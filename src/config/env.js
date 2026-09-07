// Centralized Environment & API Configuration

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const AI_API_URL = import.meta.env.VITE_AI_API_URL || "http://localhost:8000/api/ai";

export default {
  API_URL,
  AI_API_URL,
};
