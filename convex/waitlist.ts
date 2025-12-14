import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Add to waitlist
export const addToWaitlist = mutation({
  args: {
    email: v.string(),
    name: v.optional(v.string()),
    source: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Check if already on waitlist
    const existing = await ctx.db
      .query("waitlist")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .first();

    if (existing) {
      return { success: false, message: "Already on waitlist", id: existing._id };
    }

    const id = await ctx.db.insert("waitlist", {
      email: args.email,
      name: args.name,
      source: args.source || "website",
      status: "pending",
      createdAt: Date.now(),
    });

    return { success: true, message: "Added to waitlist", id };
  },
});

// Get all waitlist entries
export const getWaitlist = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlist").collect();
    return entries.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get waitlist stats
export const getWaitlistStats = query({
  args: {},
  handler: async (ctx) => {
    const entries = await ctx.db.query("waitlist").collect();
    
    const pending = entries.filter((e) => e.status === "pending").length;
    const invited = entries.filter((e) => e.status === "invited").length;
    const converted = entries.filter((e) => e.status === "converted").length;
    
    // Last 7 days
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const thisWeek = entries.filter((e) => e.createdAt > weekAgo).length;
    
    return {
      total: entries.length,
      pending,
      invited,
      converted,
      thisWeek,
      conversionRate: entries.length > 0 ? (converted / entries.length) * 100 : 0,
    };
  },
});

// Update waitlist entry status
export const updateWaitlistStatus = mutation({
  args: {
    id: v.id("waitlist"),
    status: v.string(),
    notes: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const updates: Record<string, unknown> = { status: args.status };
    
    if (args.status === "invited") {
      updates.invitedAt = Date.now();
    } else if (args.status === "converted") {
      updates.convertedAt = Date.now();
    }
    
    if (args.notes) {
      updates.notes = args.notes;
    }
    
    await ctx.db.patch(args.id, updates);
    return { success: true };
  },
});

// Delete from waitlist
export const removeFromWaitlist = mutation({
  args: { id: v.id("waitlist") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
    return { success: true };
  },
});


