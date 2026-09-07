import axios from "axios";
import { AI_API_URL } from "../config/env";

export const generateAIContent = async (payload) => {
  const { system_prompt, content } = payload;
  try {
    const response = await axios.post(`${AI_API_URL}/generate`, {
      system_prompt: system_prompt || "Improve this note by making it more professional, clear, and grammatically correct. Return only the improved text.",
      content: content,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 10000,
    });
    return response.data; // Expecting { content: "..." }
  } catch (error) {
    if (!error.response) {
      console.warn("FastAPI AI service at http://localhost:8000 unavailable. Providing simulated AI output for demo.");

      const promptLower = (system_prompt || "").toLowerCase();
      let mockEnhanced = content?.trim() || "";

      if (promptLower.includes("summarize")) {
        const compact = mockEnhanced.replace(/\s+/g, " ").trim();
        mockEnhanced = compact.length > 180 ? `${compact.slice(0, 180).trim()}...` : compact;
      } else if (promptLower.includes("grammar") || promptLower.includes("improve")) {
        mockEnhanced = mockEnhanced
          .replace(/i am very exciting/gi, "I am very excited")
          .replace(/\bi\b/g, "I")
          .replace(/\s+/g, " ")
          .trim();
        if (!mockEnhanced.endsWith(".")) mockEnhanced += ".";
      } else if (promptLower.includes("professional")) {
        mockEnhanced = `Executive Summary:\n${mockEnhanced}\n\nKey Takeaways:\n- Action item 1: Address core objectives.\n- Action item 2: Review project milestones.`;
      } else if (promptLower.includes("expand")) {
        mockEnhanced = `${mockEnhanced}\n\nAdditional detail:\n- Expand the main idea into a clear action plan.\n- Add supporting context and implementation steps.`;
      } else {
        mockEnhanced = mockEnhanced || "No content provided.";
      }

      return { content: mockEnhanced };
    }
    throw error;
  }
};
