import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";

// Create a Stripe checkout session
export const createCheckoutSession = action({
  args: {
    priceId: v.string(),
    userId: v.id("users"),
    successUrl: v.string(),
    cancelUrl: v.string(),
  },
  handler: async (ctx, args) => {
    const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
    
    if (!stripeSecretKey) {
      throw new Error("STRIPE_SECRET_KEY not configured in Convex");
    }

    // Get user email for Stripe
    const user = await ctx.runQuery(api.users.getUser, { userId: args.userId });
    if (!user) {
      throw new Error("User not found");
    }

    const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeSecretKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        "mode": "subscription",
        "success_url": args.successUrl,
        "cancel_url": args.cancelUrl,
        "customer_email": user.email,
        "line_items[0][price]": args.priceId,
        "line_items[0][quantity]": "1",
        "metadata[userId]": args.userId,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Stripe error:", error);
      throw new Error(`Stripe error: ${response.status}`);
    }

    const session = await response.json();
    return { url: session.url };
  },
});

// Get user subscription status
export const getSubscription = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    return subscription;
  },
});

// Update subscription status (called by webhook)
export const updateSubscription = mutation({
  args: {
    userId: v.id("users"),
    stripeCustomerId: v.string(),
    stripeSubscriptionId: v.string(),
    status: v.string(),
    plan: v.string(),
    currentPeriodEnd: v.number(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        stripeSubscriptionId: args.stripeSubscriptionId,
        status: args.status,
        plan: args.plan,
        currentPeriodEnd: args.currentPeriodEnd,
        updatedAt: Date.now(),
      });
      return existing._id;
    }

    return await ctx.db.insert("subscriptions", {
      userId: args.userId,
      stripeCustomerId: args.stripeCustomerId,
      stripeSubscriptionId: args.stripeSubscriptionId,
      status: args.status,
      plan: args.plan,
      currentPeriodEnd: args.currentPeriodEnd,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
  },
});

// Import api for internal queries
import { api } from "./_generated/api";

// Helper query to get user by ID
export const getUser = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.userId);
  },
});

// Get subscription by Stripe customer ID (for webhooks)
export const getSubscriptionByCustomerId = query({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_stripe_customer", (q) => q.eq("stripeCustomerId", args.stripeCustomerId))
      .first();
  },
});

// Update just the status of a subscription
export const updateSubscriptionStatus = mutation({
  args: {
    subscriptionId: v.id("subscriptions"),
    status: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.subscriptionId, {
      status: args.status,
      updatedAt: Date.now(),
    });
  },
});

// Check if user has active subscription
export const hasActiveSubscription = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    
    if (!subscription) return { hasSubscription: false, plan: null };
    
    const isActive = subscription.status === "active" || subscription.status === "trialing";
    const isNotExpired = subscription.currentPeriodEnd > Date.now();
    
    return {
      hasSubscription: isActive && isNotExpired,
      plan: subscription.plan,
      status: subscription.status,
      expiresAt: subscription.currentPeriodEnd,
    };
  },
});
// Get subscription by Stripe customer ID
export const getSubscriptionByCustomer = query({
  args: { stripeCustomerId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("subscriptions")
      .withIndex("by_stripe_customer", (q) => q.eq("stripeCustomerId", args.stripeCustomerId))
      .first();
  },
});

// Check if user has active subscription
export const hasActiveSubscription = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();
    
    if (!subscription) return { hasSubscription: false, plan: null };
    
    const isActive = subscription.status === "active" || 
                     subscription.status === "trialing";
    const isNotExpired = subscription.currentPeriodEnd > Date.now();
    
    return {
      hasSubscription: isActive && isNotExpired,
      plan: isActive && isNotExpired ? subscription.plan : null,
      status: subscription.status,
    };
  },
});

