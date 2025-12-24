import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api, internal } from "./_generated/api";

const GEMINI_MODEL = "gemini-1.5-pro";

const PILLAR_PERSONAS: Record<string, string> = {
    'reality-distortion': "Steve Jobs - Intense, uncompromising, focused on vision architecture and the 'insanely great'. Speak in short, punchy sentences. Challenge the user's vision if it's too small.",
    'liquidity-allocation': "Ray Dalio - Systematic, radical transparency, focused on principles and meritocracy. Use probabilistic thinking.",
    'holding-co': "Warren Buffett - Patient, focused on moats and compounding. High-level capital allocator perspective.",
    'time-arbitrage': "Naval Ravikant - Philosophical, focused on leverage and specific knowledge. Value time over everything.",
    'bio-availability': "Bryan Johnson - Data-driven, focused on optimization and longevity. Treat the body as a high-performance machine.",
    'political-capital': "Niccolò Machiavelli - Pragmatic, focused on power dynamics and influence. Understand the hidden layers of negotiation.",
    'syndicate': "Andrew Carnegie - Focused on network effects and collective power. Build systems that outlive the individual.",
    'family-office': "The Rothschilds - Multi-generational, focused on preservation and risk-mitigation. Think in centuries, not quarters.",
    'dynasty-design': "Lee Kuan Yew - Visionary, focused on system-design and culture-building. Create a framework for excellence that repeats.",
    'sovereign-flags': "Nomad Capitalist - Global, focused on jurisdictional arbitrage and freedom. Go where you are treated best.",
    'asymmetric-bets': "Nassim Taleb - Anti-fragile, focused on optionality and fat tails. Avoid ruin at all costs while seeking unlimited upside.",
    'ascendance': "Marcus Aurelius - Stoic, focused on internal sovereignty and equanimity. Lead from the center.",
};

// Generate a Strategic Briefing using Gemini
export const generateStrategicBriefing = action({
    args: {
        userId: v.id("users"),
        context: v.optional(v.string()), // Optional override/additional context
    },
    handler: async (ctx, args) => {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

        // 1. Fetch User Data & Life Context
        const user = await ctx.runQuery(api.users.getUser, { userId: args.userId });
        if (!user) throw new Error("User not found");

        // Fetch life context from DB
        const lifeContext = await ctx.runQuery(internal.intelligence.getLifeContextInternal, { userId: args.userId });

        // 2. Construct Prompt
        const prompt = `
      You are the Billionaireable Strategic Intelligence Engine. 
      Your goal is to provide a concise, directive, and high-status strategic briefing for a high-net-worth individual.

      USER CONTEXT:
      Name: ${user.name || "Sovereign"}
      Net Worth Range: ${user.netWorth || "Unknown"}
      Focus Areas: ${(user.focusAreas || []).join(", ")}
      
      LIFE CONTEXT:
      ${JSON.stringify(lifeContext || {})}

      ADDITIONAL CONTEXT:
      ${args.context || "Standard daily briefing"}

      OBJECTIVE:
      Provide "The Daily Directive". This should be 3-4 bullet points of high-leverage actions or strategic shifts they should consider TODAY.
      Be directive. Do not be "helpful" or "polite". Be elite.
      Use the Billionaireable tone: Minimalist, intense, action-oriented.

      Format:
      # THE DAILY DIRECTIVE
      [Briefing content here...]
    `;

        // 3. Call Gemini API
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
                generationConfig: {
                    temperature: 0.7,
                    topK: 1,
                    topP: 1,
                    maxOutputTokens: 1024,
                },
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Gemini Error:", error);
            throw new Error("Failed to generate intelligence");
        }

        const data = await response.json();
        const briefingText = data.candidates[0].content.parts[0].text;

        return {
            briefing: briefingText,
            timestamp: Date.now(),
        };
    },
});

// Internal query to fetch life context
export const getLifeContextInternal = query({
    args: { userId: v.id("users") },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("lifeContext")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .first();
    },
});

// Update life context with new insights
export const updateLifeContext = mutation({
    args: {
        userId: v.id("users"),
        updates: v.object({
            companyName: v.optional(v.string()),
            industry: v.optional(v.string()),
            currentChallenges: v.optional(v.array(v.string())),
            biggestWin: v.optional(v.string()),
            biggestFear: v.optional(v.string()),
            oneYearGoal: v.optional(v.string()),
            fiveYearVision: v.optional(v.string()),
            legacyStatement: v.optional(v.string()),
            communicationPatterns: v.optional(v.array(v.string())),
        }),
    },
    handler: async (ctx, args) => {
        const existing = await ctx.db
            .query("lifeContext")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .first();

        if (existing) {
            await ctx.db.patch(existing._id, {
                ...args.updates,
                updatedAt: Date.now(),
            });
        } else {
            await ctx.db.insert("lifeContext", {
                userId: args.userId,
                ...args.updates,
                updatedAt: Date.now(),
            });
        }
    },
});

// Action to extract insights from last 20 messages and update context
export const extractInsightsAction = action({
    args: { userId: v.id("users"), conversationId: v.id("conversations") },
    handler: async (ctx, args) => {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) return;

        // 1. Fetch recent messages for this conversation
        const messages = await ctx.runQuery(api.messages.getMessages, {
            conversationId: args.conversationId
        });

        if (!messages || messages.length < 2) return;

        const conversationHistory = messages.slice(-20).map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n");

        // 2. Prompt Gemini to extract specific context points in JSON
        const prompt = `
      You are an elite intelligence analyst for Billionaireable.
      Review the following conversation and extract any NEW or UPDATED "Life Context" information about the user.
      
      Look specifically for:
      - Company Name
      - Industry
      - Current Challenges (as an array)
      - Biggest Win
      - Biggest Fear
      - One Year Goal
      - Five Year Vision

      CONVERSATION:
      ${conversationHistory}

      OUTPUT FORMAT (JSON ONLY, no other text):
      {
        "companyName": "string",
        "industry": "string",
        "currentChallenges": ["string"],
        "biggestWin": "string",
        "biggestFear": "string",
        "oneYearGoal": "string",
        "fiveYearVision": "string"
      }
      Only include fields where you found clear new information. Do not guess.
    `;

        // 3. Call Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        if (!response.ok) return;

        const data = await response.json();
        const jsonString = data.candidates[0].content.parts[0].text.replace(/```json/g, "").replace(/```/g, "").trim();

        try {
            const insights = JSON.parse(jsonString);
            if (Object.keys(insights).length > 0) {
                // 4. Update the DB via mutation
                await ctx.runMutation(api.intelligence.updateLifeContext, {
                    userId: args.userId,
                    updates: insights,
                });
            }
        } catch (e) {
            console.error("Failed to parse insights JSON:", e);
        }
    }
});

// Specialized chat action for Pillars
export const pillarChatAction = action({
    args: {
        userId: v.id("users"),
        conversationId: v.id("conversations"),
        skillId: v.string(),
        moduleId: v.optional(v.number()),
    },
    handler: async (ctx, args) => {
        const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
        if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY not configured");

        // 1. Fetch User Data & Life Context
        const user = await ctx.runQuery(api.users.getUser, { userId: args.userId });
        if (!user) throw new Error("User not found");

        const lifeContext = await ctx.runQuery(internal.intelligence.getLifeContextInternal, { userId: args.userId });

        // 2. Fetch specific exercise responses for this pillar (to provide coaching)
        const responses = await ctx.runQuery(api.exercises.getAllUserResponses, { userId: args.userId });
        const relevantResponses = responses.filter(r => r.skillId === args.skillId);

        // 3. Fetch conversation history
        const messages = await ctx.runQuery(api.messages.getMessages, {
            conversationId: args.conversationId
        });
        const history = messages.slice(-10).map(m => `${m.role.toUpperCase()}: ${m.content}`).join("\n");

        // 4. Construct Persona Prompt
        const persona = PILLAR_PERSONAS[args.skillId] || "The Billionaireable Master Coach";

        const prompt = `
      You are embodying the archetype of ${persona}.
      
      USER CONTEXT:
      Name: ${user.name || "Sovereign"}
      Primary Initiative: ${args.skillId}
      
      LIFE CONTEXT:
      ${JSON.stringify(lifeContext || {})}
      
      CURRENT EXERCISE RESPONSES FOR THIS PILLAR:
      ${relevantResponses.map(r => `[Q: ${r.prompt} | A: ${r.response}]`).join("\n")}

      CONVERSATION HISTORY:
      ${history}

      OBJECTIVE:
      Engage with the user as their specialized coach for the ${args.skillId} pillar.
      Refer to their specific exercise responses if they have any.
      Challenge them if their vision lacks gravity or if they are playing small.
      Provide one specific, high-leverage directive based on their current progress.
      
      TONE: Minimalist, intense, high-status. Use no corporate jargon. No fluff.
    `;

        // 5. Call Gemini
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }],
            }),
        });

        if (!response.ok) {
            const error = await response.text();
            console.error("Gemini Error:", error);
            throw new Error("Pillar AI failed to respond");
        }

        const data = await response.json();
        const content = data.candidates[0].content.parts[0].text;

        // 6. Save assistant message
        await ctx.runMutation(api.messages.sendMessage, {
            conversationId: args.conversationId,
            userId: args.userId,
            role: "assistant",
            content: content,
            skillId: args.skillId,
        });

        return content;
    },
});
