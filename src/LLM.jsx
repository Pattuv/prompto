import systemPrompt from "./SYSTEMPROMPT.md?raw";

const SYSTEM_PROMPT = systemPrompt.trim();

// Same-origin — dev/preview: Vite proxy injects API_KEY; production: Vercel api/chat/completions.js
const API_URL = "/api/chat/completions";

export async function fetchResponse(prompt, pill, { signal } = {}) {
  const userContent = pill
    ? `User prompt:\n${prompt}\n\nPrompt type: ${pill}`
    : `User prompt:\n${prompt}`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "anthropic/claude-opus-4.7-fast",
      max_tokens: 2048,
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userContent },
      ],
    }),
    signal,
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`API error ${response.status}: ${detail}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content;

  if (typeof content !== "string") {
    throw new Error("Unexpected response format from API");
  }

  return content;
}
