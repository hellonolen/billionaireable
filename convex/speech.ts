import { v } from "convex/values";
import { action } from "./_generated/server";

// Text-to-Speech using Gemini 3's native audio generation
export const textToSpeech = action({
  args: {
    text: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    // Use Gemini 3 with audio response modality
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: args.text }]
            }
          ],
          generationConfig: {
            responseMimeType: "audio/mp3",
            speechConfig: {
              voiceConfig: {
                prebuiltVoiceConfig: {
                  voiceName: "Kore"
                }
              }
            }
          }
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini Audio API error:", error);
      throw new Error(`Gemini Audio API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract audio from response
    const audioPart = data.candidates?.[0]?.content?.parts?.find(
      (part: any) => part.inlineData
    );

    if (!audioPart?.inlineData) {
      throw new Error("No audio in response");
    }

    return {
      audio: audioPart.inlineData.data,
      mimeType: audioPart.inlineData.mimeType || "audio/mp3"
    };
  },
});
