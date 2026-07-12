import express from "express";
import cors from "cors";
import dotenv from "dotenv";

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

app.post("/api/chat", (request, response) => {
  const { message } = request.body;

  if (!message) {
    return response.status(400).json({
      error: "Message is required",
    });
  }

  response.json({
    reply: `DevPilot received: ${message}`,
  });
});

app.listen(PORT, () => {
  console.log(`DevPilot server running on port ${PORT}`);
});
