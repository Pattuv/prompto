const UPSTREAM = "https://ai.hackclub.com/proxy/v1/chat/completions";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Server misconfigured: missing API_KEY" });
  }

  try {
    const upstream = await fetch(UPSTREAM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(req.body),
    });

    const text = await upstream.text();
    res.status(upstream.status).setHeader("Content-Type", "application/json");
    return res.send(text);
  } catch (err) {
    console.error(err);
    return res.status(502).json({ error: "Upstream request failed" });
  }
}
