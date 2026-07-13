import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.GEMINI_API_KEY;

if (!apiKey) {
  throw new Error("GEMINI_API_KEY is missing");
}

const ai = new GoogleGenAI({
  apiKey,
});

function wait(milliseconds: number) {
  return new Promise((resolve) =>
    setTimeout(resolve, milliseconds)
  );
}

export async function generateAIResponse(
  message: string
): Promise<string> {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
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

      return (
        result.text ??
        "DevPilot could not generate a response."
      );
    } catch (error: any) {
      const status = error?.status;

      console.error(
        `AI request failed. Attempt ${attempt}/${maxAttempts}. Status:`,
        status
      );

      if (status !== 503 || attempt === maxAttempts) {
        throw error;
      }

      const delay = 1000 * 2 ** (attempt - 1);

      console.log(`Retrying AI request in ${delay}ms...`);

      await wait(delay);
    }
  }

  throw new Error("AI response failed");
}
