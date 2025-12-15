import { action } from "./_generated/server";
import { v } from "convex/values";

function encodeBase64(bytes: Uint8Array): string {
  const b64chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  let result = "";
  let i = 0;
  while (i < bytes.length) {
    const b1 = bytes[i++];
    const b2 = i < bytes.length ? bytes[i++] : NaN;
    const b3 = i < bytes.length ? bytes[i++] : NaN;

    const c1 = b1 >> 2;
    const c2 = ((b1 & 3) << 4) | (Number.isNaN(b2) ? 0 : (b2 as number) >> 4);
    const c3 = Number.isNaN(b2) ? 64 : (((b2 as number) & 15) << 2) | (Number.isNaN(b3) ? 0 : (b3 as number) >> 6);
    const c4 = Number.isNaN(b3) ? 64 : (b3 as number) & 63;

    result += b64chars[c1] + b64chars[c2] + (c3 === 64 ? "=" : b64chars[c3]) + (c4 === 64 ? "=" : b64chars[c4]);
  }
  return result;
}

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

// OpenAI Text-to-Speech (fallback for Gemini TTS)
export const textToSpeech = action({
  args: { text: v.string() },
  handler: async (_ctx, args) => {
    const apiKey = getOpenAiKey();

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-mini-tts",
        voice: "alloy",
        input: args.text,
        response_format: "wav",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI TTS error:", response.status, error);
      throw new Error(`OpenAI TTS error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64 = encodeBase64(new Uint8Array(audioBuffer));
    return { audio: base64, mimeType: "audio/wav" };
  },
});


