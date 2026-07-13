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

async function generateWithRetry(
  prompt: string
): Promise<string> {
  const maxAttempts = 3;

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      const result = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
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

export async function generateAIResponse(
  message: string
): Promise<string> {
  return generateWithRetry(`
You are DevPilot AI, a developer-focused AI assistant.

Help developers:
- understand programming concepts
- debug errors
- review code
- understand APIs
- improve software architecture

Give clear, practical, developer-friendly answers.

User question:
${message}
  `);
}

export async function explainError(
  errorMessage: string
): Promise<string> {
  return generateWithRetry(`
You are DevPilot AI Error Explainer.

Analyze the developer error below.

Explain the response using these sections:

## What the error means

Explain the error in simple developer-friendly words.

## Most likely cause

Explain the probable root cause.

## How to fix it

Give clear numbered steps.

## Example fix

Provide a code example when relevant.

## Prevention tip

Explain how the developer can avoid this problem later.

Do not invent missing project details.
If the error lacks enough context, clearly mention what additional information is needed.

Developer error:

${errorMessage}
  `);
}
