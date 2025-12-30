
import { GoogleGenAI } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || "" });

export const translateText = async (text: string, targetLang: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Translate the following text to ${targetLang}. Return ONLY the translation, no notes: "${text}"`,
    });
    return response.text || "Error en la traducción.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "No se pudo traducir en este momento.";
  }
};

export const getBrainstormSuggestion = async (focusArea: string) => {
  try {
    const ai = getAI();
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `I am working on: ${focusArea || 'General productivity'}. Suggest one unique, creative, and physically active 5-minute break idea to recharge. Keep it under 20 words.`,
    });
    return response.text || "¡Estira los brazos y respira profundo!";
  } catch (error) {
    return "Bebe un vaso de agua y camina un poco.";
  }
};
