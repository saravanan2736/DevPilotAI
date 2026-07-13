import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import {
  explainError,
  generateAIResponse,
} from "./services/aiService.js";

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
    console.error("AI chat error:", error);

    response.status(500).json({
      error: "Failed to generate AI response",
    });
  }
});

app.post(
  "/api/explain-error",
  async (request, response) => {
    const { errorMessage } = request.body;

    if (
      !errorMessage ||
      typeof errorMessage !== "string"
    ) {
      return response.status(400).json({
        error: "Error message is required",
      });
    }

    try {
      const explanation = await explainError(errorMessage);

      response.json({
        explanation,
      });
    } catch (error) {
      console.error("Error explainer failed:", error);

      response.status(500).json({
        error: "Failed to explain error",
      });
    }
  }
);

app.listen(PORT, () => {
  console.log(`DevPilot server running on port ${PORT}`);
});
