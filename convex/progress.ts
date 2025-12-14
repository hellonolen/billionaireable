import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get all progress for a user
export const getUserProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Get progress for a specific skill
export const getSkillProgress = query({
  args: { 
    userId: v.id("users"),
    skillId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("progress")
      .withIndex("by_user_skill", (q) => 
        q.eq("userId", args.userId).eq("skillId", args.skillId)
      )
      .first();
  },
});

// Update or create progress for a skill
export const updateProgress = mutation({
  args: {
    userId: v.id("users"),
    skillId: v.string(),
    modulesCompleted: v.number(),
    totalModules: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_skill", (q) => 
        q.eq("userId", args.userId).eq("skillId", args.skillId)
      )
      .first();

    const isCompleted = args.modulesCompleted >= args.totalModules;

    if (existing) {
      await ctx.db.patch(existing._id, {
        modulesCompleted: args.modulesCompleted,
        totalModules: args.totalModules,
        lastAccessedAt: Date.now(),
        completedAt: isCompleted ? Date.now() : existing.completedAt,
      });
      return existing._id;
    }

    return await ctx.db.insert("progress", {
      userId: args.userId,
      skillId: args.skillId,
      modulesCompleted: args.modulesCompleted,
      totalModules: args.totalModules,
      lastAccessedAt: Date.now(),
      completedAt: isCompleted ? Date.now() : undefined,
    });
  },
});

// Complete a module
export const completeModule = mutation({
  args: {
    userId: v.id("users"),
    skillId: v.string(),
    totalModules: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("progress")
      .withIndex("by_user_skill", (q) => 
        q.eq("userId", args.userId).eq("skillId", args.skillId)
      )
      .first();

    const currentCompleted = existing?.modulesCompleted ?? 0;
    const newCompleted = Math.min(currentCompleted + 1, args.totalModules);
    const isCompleted = newCompleted >= args.totalModules;

    if (existing) {
      await ctx.db.patch(existing._id, {
        modulesCompleted: newCompleted,
        lastAccessedAt: Date.now(),
        completedAt: isCompleted ? Date.now() : existing.completedAt,
      });
      return existing._id;
    }

    return await ctx.db.insert("progress", {
      userId: args.userId,
      skillId: args.skillId,
      modulesCompleted: 1,
      totalModules: args.totalModules,
      lastAccessedAt: Date.now(),
      completedAt: isCompleted ? Date.now() : undefined,
    });
  },
});

