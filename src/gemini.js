import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const chatSession = model.startChat({
  history: [],
});

export const sendPrompt = async (prompt) => {
  try {
    const result = await chatSession.sendMessage(prompt);
    return result.response.text();
  } catch (err) {
    console.error("Gemini Error:", err);
    return "Sorry, something went wrong.";
  }
};

