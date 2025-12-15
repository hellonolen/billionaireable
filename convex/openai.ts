import { action } from "./_generated/server";
import { v } from "convex/values";

function getOpenAiKey(): string {
  const key = process.env.OPENAI_API_KEY;
  if (!key) throw new Error("OPENAI_API_KEY not configured");
  return key;
}

// OpenAI Chat (fallback for Gemini)
export const chat = action({
  args: {
    message: v.string(),
    history: v.array(v.object({ role: v.string(), text: v.string() })),
    systemPrompt: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = getOpenAiKey();

    const messages = [
      { role: "system", content: args.systemPrompt },
      ...args.history.map((m) => ({
        role: m.role === "assistant" ? "assistant" : "user",
        content: m.text,
      })),
      { role: "user", content: args.message },
    ];

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.7,
        max_tokens: 900,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI chat error:", response.status, error);
      throw new Error(`OpenAI chat error: ${response.status}`);
    }

    const data: any = await response.json();
    const text = data?.choices?.[0]?.message?.content;
    return typeof text === "string" && text.trim().length > 0
      ? text.trim()
      : "Let's refocus. What are you working on?";
  },
});

// Note: TTS is handled by speech.ts using OpenAI
