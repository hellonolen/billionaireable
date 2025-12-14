import { v } from "convex/values";
import { action } from "./_generated/server";

// Text-to-Speech using Google Cloud TTS
export const textToSpeech = action({
  args: {
    text: v.string(),
    voice: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY; // Same API key works for Google Cloud services

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    // Use a premium male voice for Billionaireable - authoritative and clear
    const voiceName = args.voice || "en-US-Neural2-J"; // Deep, professional male voice
    
    const response = await fetch(
      `https://texttospeech.googleapis.com/v1/text:synthesize?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: { text: args.text },
          voice: {
            languageCode: "en-US",
            name: voiceName,
          },
          audioConfig: {
            audioEncoding: "MP3",
            pitch: 0,
            speakingRate: 0.95, // Slightly slower for authority
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("TTS API error:", error);
      throw new Error(`Text-to-Speech API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Returns base64 encoded audio
    return data.audioContent;
  },
});

