import { OpenRouter } from '@openrouter/sdk';

const client = new OpenRouter({
  apiKey: import.meta.env.API_KEY,
  baseURL: 'https://ai.hackclub.com/proxy/v1',
});

const response = await client.chat.send({
  model: 'anthropic/claude-opus-4.7-fast',
  messages: [
    { role: 'user', content: 'Hello!' }
  ],
});

console.log(response.choices[0].message.content);