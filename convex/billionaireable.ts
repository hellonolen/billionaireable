import { v } from "convex/values";
import { action } from "./_generated/server";

// Simple chat action - direct Gemini call with history
export const chat = action({
  args: {
    message: v.string(),
    history: v.array(v.object({
      role: v.string(),
      text: v.string(),
    })),
    systemPrompt: v.string(),
  },
  handler: async (ctx, args) => {
    const apiKey = process.env.GEMINI_API_KEY;
    
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured in Convex");
    }

    // Build conversation history for Gemini
    const contents = [
      // System prompt as first exchange
      {
        role: "user",
        parts: [{ text: args.systemPrompt }],
      },
      {
        role: "model", 
        parts: [{ text: "Understood. I am Billionaireable. Ready to guide." }],
      },
      // Previous conversation
      ...args.history.map((msg) => ({
        role: msg.role === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      })),
      // Current message
      {
        role: "user",
        parts: [{ text: args.message }],
      },
    ];

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: 0.8,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error("Gemini API error:", error);
      throw new Error(`Gemini API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "Let's refocus. What are you working on?";

    return aiResponse;
  },
});
