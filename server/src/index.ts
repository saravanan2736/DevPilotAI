import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

app.get("/", (_request, response) => {
  response.json({
    message: "DevPilot API is running 🚀",
  });
});

app.post("/api/chat", async (request, response) => {
  const { message } = request.body;

  if (!message || typeof message !== "string") {
    return response.status(400).json({
      error: "Message is required",
    });
  }

  try {
    const result = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
You are DevPilot AI, a developer-focused AI assistant.

Your job is to help developers:
- understand programming concepts
- debug errors
- review code
- understand APIs
- improve software architecture

Give clear, practical, developer-friendly answers.

User question:
${message}
      `,
    });

    response.json({
      reply: result.text ?? "DevPilot could not generate a response.",
    });
  } catch (error) {
    console.error("Gemini error:", error);

    response.status(500).json({
      error: "Failed to generate AI response",
    });
  }
});

app.listen(PORT, () => {
  console.log(`DevPilot server running on port ${PORT}`);
});
