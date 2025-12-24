import { v } from "convex/values";
import { action } from "./_generated/server";
import { chat as openaiChat } from "./openai";

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
    // 1. Fetch Global Directives
    const directives = await ctx.runQuery(api.admin.getGlobalDirectives);
    const directivesPrompt = directives.length > 0
      ? `\n\n[GLOBAL ARCHITECTURAL DIRECTIVES]:\n${directives.map(d => `- ${d.key}: ${d.value}`).join('\n')}`
      : "";

    const enrichedSystemPrompt = `${args.systemPrompt}${directivesPrompt}\n\n[USER DATA PROTECTION]: Billionaireable never forgets. Everything shared is encrypted. Access is restricted.`;

    const apiKey = process.env.GEMINI_API_KEY;

    // If Gemini isn't configured, fall back to OpenAI if available.
    if (!apiKey) {
      return await openaiChat.handler(ctx, { ...args, systemPrompt: enrichedSystemPrompt } as any);
    }

    // Build conversation history for Gemini
    const contents = [
      // System prompt as first exchange
      {
        role: "user",
        parts: [{ text: enrichedSystemPrompt }],
      },
      {
        role: "model",
        parts: [{ text: "Understood. I am Billionaireable. My directives are locked. I monitor and guide. Privacy is absolute." }],
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
      console.error("Gemini API error:", response.status, error);
      // Gemini failed: try OpenAI if configured.
      try {
        return await openaiChat.handler(ctx, { ...args, systemPrompt: enrichedSystemPrompt } as any);
      } catch (_e) {
        return "I am experiencing a momentary intelligence lag. If this persists, elevate this to an allocation specialist: support@billionaireable.com";
      }
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text ||
      "Let's refocus. What are you working on?";

    return aiResponse;
  },
});
