import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - synced with Clerk
  users: defineTable({
    clerkId: v.string(),
    email: v.string(),
    name: v.optional(v.string()),
    imageUrl: v.optional(v.string()),
    // User's situation for Billionaireable context
    netWorth: v.optional(v.number()),
    revenue: v.optional(v.number()),
    businessType: v.optional(v.string()),
    goals: v.optional(v.string()),
    // Onboarding
    focusAreas: v.optional(v.array(v.string())),
    onboardingComplete: v.optional(v.boolean()),
    // Current step in the program (1-12)
    currentPillar: v.optional(v.number()),
    // Admin access
    isAdmin: v.optional(v.boolean()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerk_id", ["clerkId"])
    .index("by_email", ["email"]),

  // Conversations - each chat session
  conversations: defineTable({
    userId: v.id("users"),
    title: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),

  // Messages - individual messages in conversations
  messages: defineTable({
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    // Optional context about what skill/lesson this relates to
    skillId: v.optional(v.string()),
    moduleId: v.optional(v.string()),
    createdAt: v.number(),
  })
    .index("by_conversation", ["conversationId"]),

  // Progress - tracks user's progress through the 12 pillars
  progress: defineTable({
    userId: v.id("users"),
    skillId: v.string(),
    completedModules: v.optional(v.array(v.number())),
    modulesCompleted: v.number(),
    totalModules: v.number(),
    lastAccessedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_skill", ["userId", "skillId"]),

  // User preferences - communication style, etc.
  preferences: defineTable({
    userId: v.id("users"),
    communicationStyle: v.optional(v.string()),
    focusAreas: v.optional(v.array(v.string())),
    timezone: v.optional(v.string()),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"]),

  // Subscriptions - all payment sources
  subscriptions: defineTable({
    userId: v.id("users"),
    stripeCustomerId: v.optional(v.string()),
    stripeSubscriptionId: v.optional(v.string()),
    status: v.string(), // active, canceled, past_due, etc.
    plan: v.string(), // founder, scaler, owner
    paymentMethod: v.optional(v.string()), // stripe, whop, wire
    amount: v.optional(v.number()),
    billingCycle: v.optional(v.string()), // monthly, annual
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_stripe_customer", ["stripeCustomerId"]),

  // Waitlist - people waiting to join
  waitlist: defineTable({
    email: v.string(),
    name: v.optional(v.string()),
    source: v.optional(v.string()), // where they came from
    status: v.string(), // pending, invited, converted
    notes: v.optional(v.string()),
    createdAt: v.number(),
    invitedAt: v.optional(v.number()),
    convertedAt: v.optional(v.number()),
  })
    .index("by_email", ["email"])
    .index("by_status", ["status"]),

  // Payment Applications - for wire transfer / high-ticket payments
  paymentApplications: defineTable({
    userId: v.id("users"),
    userEmail: v.string(),
    userName: v.string(),
    tier: v.string(), // founder, scaler, owner
    billingCycle: v.string(), // monthly, annual
    amount: v.number(),
    paymentMethod: v.string(), // wire, whop, stripe
    status: v.string(), // pending, awaiting_payment, approved, rejected, payment_insufficient
    wireReference: v.optional(v.string()), // Unique reference for wire payments
    paymentReference: v.optional(v.string()), // Bank/payment processor reference
    paymentSource: v.optional(v.string()), // Where payment was verified
    paymentVerifiedAt: v.optional(v.number()),
    amountReceived: v.optional(v.number()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_wire_reference", ["wireReference"]),
});

