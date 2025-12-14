import { v } from "convex/values";
import { action, internalQuery } from "./_generated/server";
import { internal } from "./_generated/api";

// Internal query to get user context for AI
export const getUserContext = internalQuery({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    // Get recent messages for memory
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(5);

    const recentMessages = [];
    for (const conv of conversations) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
        .order("desc")
        .take(10);
      recentMessages.push(...messages);
    }

    // Get progress
    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return {
      user,
      recentMessages: recentMessages.slice(0, 20).reverse(),
      progress,
    };
  },
});

// Main AI chat action
export const chat = action({
  args: {
    userId: v.id("users"),
    message: v.string(),
    skillId: v.optional(v.string()),
    moduleId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Get user context
    const context = await ctx.runQuery(internal.billionaireable.getUserContext, {
      userId: args.userId,
    });

    if (!context) {
      throw new Error("User not found");
    }

    // Build the system prompt with user context
    const systemPrompt = buildSystemPrompt(context);

    // Build conversation history
    const conversationHistory = context.recentMessages.map((msg) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }],
    }));

    // Add current message
    conversationHistory.push({
      role: "user",
      parts: [{ text: args.message }],
    });

    // Call Gemini API
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY not configured");
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-pro:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: conversationHistory,
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 1024,
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      throw new Error(`Gemini API error: ${error}`);
    }

    const data = await response.json();
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I apologize, but I couldn't generate a response. Please try again.";

    return aiResponse;
  },
});

function buildSystemPrompt(context: {
  user: any;
  recentMessages: any[];
  progress: any[];
}): string {
  const { user, progress } = context;

  // Build user situation summary
  let situationSummary = "";
  if (user.netWorth || user.revenue || user.businessType || user.goals) {
    situationSummary = `
USER'S CURRENT SITUATION:
${user.netWorth ? `- Net Worth: $${user.netWorth.toLocaleString()}` : ""}
${user.revenue ? `- Annual Revenue: $${user.revenue.toLocaleString()}` : ""}
${user.businessType ? `- Business Type: ${user.businessType}` : ""}
${user.goals ? `- Goals: ${user.goals}` : ""}
`;
  }

  // Build progress summary
  let progressSummary = "";
  if (progress.length > 0) {
    const completedSkills = progress.filter((p) => p.completedAt).length;
    const inProgressSkills = progress.filter((p) => !p.completedAt && p.modulesCompleted > 0).length;
    progressSummary = `
USER'S PROGRESS:
- Skills completed: ${completedSkills}/12
- Skills in progress: ${inProgressSkills}
- Focus areas: ${progress.map((p) => p.skillId).join(", ")}
`;
  }

  return `You are Billionaireable. You guide people to become billionaireable. You embody the wisdom of Warren Buffett, the vision of Elon Musk, and the strategic thinking of Ray Dalio.

Your personality:
- Confident but not arrogant
- Direct and actionable advice
- Thinks in systems and leverage
- Always looking for asymmetric opportunities
- Speaks with authority but welcomes questions

Your areas of expertise (the 12 Pillars):
1. Reality Distortion - Vision that attracts capital
2. Liquidity & Allocation - Capital architecture
3. The Holding Co - Systems building
4. Time Arbitrage - Leverage and delegation
5. Bio-Availability - Peak performance
6. Political Capital - Power and influence
7. The Syndicate - Deal flow and partnerships
8. Family Office - Wealth operations
9. Dynasty Design - Generational legacy
10. Sovereign Flags - Global optionality
11. Asymmetric Bets - High-upside investments
12. Ascendance - Mental models and clarity

${situationSummary}
${progressSummary}

Keep responses concise (2-3 paragraphs max). Use concrete examples when relevant. Always end with a thought-provoking question or actionable next step.

Remember: You already know what you want. Now remove what's stopping you.`;
}

