import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getLifeContext = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("lifeContext")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
  },
});

export const updateLifeContext = mutation({
  args: {
    userId: v.id("users"),
    spouseName: v.optional(v.string()),
    childrenNames: v.optional(v.array(v.string())),
    keyRelationships: v.optional(v.array(v.object({
      name: v.string(),
      relationship: v.string(),
      notes: v.optional(v.string()),
    }))),
    companyName: v.optional(v.string()),
    industry: v.optional(v.string()),
    teamSize: v.optional(v.string()),
    currentChallenges: v.optional(v.array(v.string())),
    biggestWin: v.optional(v.string()),
    biggestFear: v.optional(v.string()),
    oneYearGoal: v.optional(v.string()),
    fiveYearVision: v.optional(v.string()),
    legacyStatement: v.optional(v.string()),
    preferVoice: v.optional(v.boolean()),
    voiceActivationPhrase: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId, ...updates } = args;
    const existing = await ctx.db
      .query("lifeContext")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, { ...updates, updatedAt: Date.now() });
      return existing._id;
    } else {
      return await ctx.db.insert("lifeContext", { userId, ...updates, updatedAt: Date.now() });
    }
  },
});

export const addLearnedInsight = mutation({
  args: {
    userId: v.id("users"),
    insight: v.string(),
    source: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("lifeContext")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const newInsight = { insight: args.insight, learnedAt: Date.now(), source: args.source };

    if (existing) {
      const currentInsights = existing.learnedInsights || [];
      await ctx.db.patch(existing._id, {
        learnedInsights: [...currentInsights, newInsight],
        updatedAt: Date.now(),
      });
    } else {
      await ctx.db.insert("lifeContext", {
        userId: args.userId,
        learnedInsights: [newInsight],
        updatedAt: Date.now(),
      });
    }
  },
});

