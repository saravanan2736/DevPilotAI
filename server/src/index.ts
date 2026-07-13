import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { generateAIResponse } from "./services/aiService.js";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

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
    const reply = await generateAIResponse(message);

    response.json({
      reply,
    });
  } catch (error) {
    console.error("AI error:", error);

    response.status(500).json({
      error: "Failed to generate AI response",
    });
  }
});

app.listen(PORT, () => {
  console.log(`DevPilot server running on port ${PORT}`);
});
