import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Get or create user from Clerk data
export const getOrCreateUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if user already exists
    const existingUser = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (existingUser) {
      // Update user info if changed
      await ctx.db.patch(existingUser._id, {
        email: args.email,
        name: args.name,
        imageUrl: args.imageUrl,
        updatedAt: Date.now(),
      });
      return existingUser._id;
    }

    // Create new user
    const userId = await ctx.db.insert("users", {
      clerkId: args.clerkId,
      email: args.email,
      name: args.name,
      imageUrl: args.imageUrl,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return userId;
  },
});

// Get user by Clerk ID
export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
  },
});

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

// Update user situation (for Billionaireable context)
export const updateUserSituation = mutation({
  args: {
    clerkId: v.string(),
    netWorth: v.optional(v.number()),
    revenue: v.optional(v.number()),
    businessType: v.optional(v.string()),
    goals: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      netWorth: args.netWorth,
      revenue: args.revenue,
      businessType: args.businessType,
      goals: args.goals,
      updatedAt: Date.now(),
    });

    return user._id;
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

// Check if user is admin
export const isUserAdmin = query({
  args: { clerkId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_clerk_id", (q) => q.eq("clerkId", args.clerkId))
      .first();
    
    return user?.isAdmin === true;
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
      .withIndex("by_email", (q) => q.eq("email", args.email))
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

