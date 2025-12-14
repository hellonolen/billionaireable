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
});

