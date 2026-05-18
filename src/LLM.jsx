import { OpenRouter } from "@openrouter/sdk";
import systemPrompt from "./SYSTEMPROMPT.md?raw";

const SYSTEM_PROMPT = systemPrompt.trim();

const client = new OpenRouter({
  apiKey: import.meta.env.VITE_API_KEY,
  baseURL: "https://ai.hackclub.com/proxy/v1",
});

export async function fetchResponse(prompt, pill) {
  const userContent = pill
    ? `User prompt:\n${prompt}\n\nPrompt type: ${pill}`
    : `User prompt:\n${prompt}`;

  const response = await client.chat.send({
    model: "anthropic/claude-opus-4.7-fast",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userContent },
    ],
  });

  return response.choices[0].message.content;
}
