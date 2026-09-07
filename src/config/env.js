// Centralized Environment & API Configuration

const isProduction = import.meta.env.PROD;

export const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
export const AI_API_URL = import.meta.env.VITE_AI_API_URL || (
  isProduction
    ? "https://chatbotintegration.onrender.com/api/ai"
    : "http://localhost:8000/api/ai"
);

export default {
  API_URL,
  AI_API_URL,
};
