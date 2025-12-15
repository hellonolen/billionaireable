import { v } from "convex/values";
import { action } from "./_generated/server";

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

// Text-to-Speech using OpenAI
export const textToSpeech = action({
  args: {
    text: v.string(),
  },
  handler: async (_ctx, args) => {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) throw new Error("OPENAI_API_KEY not configured");

    const response = await fetch("https://api.openai.com/v1/audio/speech", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "tts-1",
        voice: "alloy",
        input: args.text,
        response_format: "mp3",
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("OpenAI TTS error:", response.status, error);
      throw new Error(`OpenAI TTS error: ${response.status}`);
    }

    const audioBuffer = await response.arrayBuffer();
    const base64 = encodeBase64(new Uint8Array(audioBuffer));
    return { audio: base64, mimeType: "audio/mpeg" };
  },
});
