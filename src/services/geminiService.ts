
import { GoogleGenAI } from "@google/genai";

const apiKey = import.meta.env.VITE_API_KEY || "";

const getAI = () => {
  if (!apiKey) {
    throw new Error("API Key not found. Please add it to your environment variables.");
  }
  return new GoogleGenAI({ apiKey });
};

export const translateText = async (text: string, targetLang: string) => {
  try {
    const ai = getAI();
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `Translate the following text to ${targetLang}. Return ONLY the translation, no notes: "${text}"`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Could not translate at this time. API key might be missing or invalid.";
  }
};

export const getBrainstormSuggestion = async (focusArea: string) => {
  try {
    const ai = getAI();
    const model = ai.getGenerativeModel({ model: "gemini-pro" });
    const prompt = `I am working on: ${focusArea || 'General productivity'}. Suggest one unique, creative, and physically active 5-minute break idea to recharge. Keep it under 20 words.`;
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    return "Drink a glass of water and walk around for a bit.";
  }
};
