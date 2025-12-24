import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get user by email
export const getUserByEmail = query({
  args: { email: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();
  },
});

// Get user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Update user situation (for Billionaireable context)
export const updateUserSituation = mutation({
  args: {
    userId: v.id("users"),
    netWorth: v.optional(v.number()),
    revenue: v.optional(v.number()),
    businessType: v.optional(v.string()),
    goals: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      netWorth: args.netWorth,
      revenue: args.revenue,
      businessType: args.businessType,
      goals: args.goals,
      updatedAt: Date.now(),
    });
    return args.userId;
  },
});

// Update user goals/focus areas from onboarding
export const updateUserGoals = mutation({
  args: {
    userId: v.id("users"),
    goals: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      focusAreas: args.goals,
      onboardingComplete: true,
      updatedAt: Date.now(),
    });
    return args.userId;
  },
});

// Update user profile
export const updateProfile = mutation({
  args: {
    userId: v.id("users"),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.userId, {
      ...(args.name !== undefined && { name: args.name }),
      ...(args.imageUrl !== undefined && { imageUrl: args.imageUrl }),
      updatedAt: Date.now(),
    });
    return args.userId;
  },
});

// Set user as admin (for initial setup - run from Convex dashboard)
export const setUserAsAdmin = mutation({
  args: {
    email: v.string(),
    isAdmin: v.boolean(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
      .first();

    if (!user) {
      throw new Error("User not found with that email");
    }

    await ctx.db.patch(user._id, {
      isAdmin: args.isAdmin,
      updatedAt: Date.now(),
    });

    return { success: true, userId: user._id };
  },
});

// Save onboarding/assessment progress
export const saveOnboardingProgress = mutation({
  args: {
    userId: v.id("users"),
    progress: v.string(), // JSON string
  },
  handler: async (ctx, args) => {
    // Remediation Phase 1: Server-side validation
    try {
      const parsed = JSON.parse(args.progress);
      if (typeof parsed !== 'object' || parsed === null) {
        throw new Error("Invalid progress data structure");
      }
      // Basic check for required keys to prevent corruption
      const hasAnswers = 'assessmentAnswers' in parsed;
      const hasIndex = 'assessmentQuestionIndex' in parsed;
      if (!hasAnswers && !hasIndex) {
        console.warn("Saving progress with missing standard keys, but proceeding as additive update.");
      }
    } catch (e) {
      throw new Error("Data Integrity Violation: Onboarding progress must be valid JSON");
    }

    await ctx.db.patch(args.userId, {
      onboardingProgress: args.progress,
      updatedAt: Date.now(),
    });
    return args.userId;
  },
});

export const getOnboardingProgress = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    return user?.onboardingProgress || null;
  },
});
