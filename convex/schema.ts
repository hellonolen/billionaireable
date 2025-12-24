import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  // Users table - native Convex auth (no Clerk)
  users: defineTable({
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
    // Session management
    sessionToken: v.optional(v.string()),
    sessionExpiresAt: v.optional(v.number()),
    lastLoginAt: v.optional(v.number()),
    // Persistence for onboarding and assessment
    onboardingProgress: v.optional(v.string()), // JSON string of progress state
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_session", ["sessionToken"]),

  // Verification codes for magic link auth
  verificationCodes: defineTable({
    email: v.string(),
    code: v.string(), // 6-digit code
    type: v.string(), // 'signup', 'login'
    expiresAt: v.number(),
  })
    .index("by_email", ["email"])
    .index("by_code", ["code"]),

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

  // Life Context - deep knowledge about the user's life for intelligence
  lifeContext: defineTable({
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
    communicationPatterns: v.optional(v.array(v.string())),
    learnedInsights: v.optional(v.array(v.object({
      insight: v.string(),
      learnedAt: v.number(),
      source: v.string(),
    }))),
    preferVoice: v.optional(v.boolean()),
    voiceActivationPhrase: v.optional(v.string()),
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
    paymentMethod: v.optional(v.string()), // wire
    amount: v.optional(v.number()),
    billingCycle: v.optional(v.string()), // monthly, annual
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.number(),
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"]),

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

  // Payment Applications - for wire transfer payments
  paymentApplications: defineTable({
    userId: v.id("users"),
    userEmail: v.string(),
    userName: v.string(),
    tier: v.string(), // founder, scaler, owner
    billingCycle: v.string(), // monthly, annual
    amount: v.number(),
    paymentMethod: v.string(), // wire
    status: v.string(), // awaiting_payment, approved, payment_insufficient
    wireReference: v.optional(v.string()),
    paymentReference: v.optional(v.string()),
    paymentSource: v.optional(v.string()),
    paymentVerifiedAt: v.optional(v.number()),
    amountReceived: v.optional(v.number()),
    notes: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_user", ["userId"])
    .index("by_status", ["status"])
    .index("by_wire_reference", ["wireReference"]),

  // Exercise Responses - user's answers to module exercises (permanent memory)
  exerciseResponses: defineTable({
    userId: v.id("users"),
    skillId: v.string(), // e.g., 'reality-distortion'
    moduleId: v.number(), // 1, 2, 3, 4
    promptIndex: v.number(), // which prompt they responded to
    prompt: v.string(), // the prompt text
    response: v.string(), // their answer
    createdAt: v.number(),
    updatedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_skill_module", ["userId", "skillId", "moduleId"]),

  // Module Progress - granular progress within a module
  moduleProgress: defineTable({
    userId: v.id("users"),
    skillId: v.string(),
    moduleId: v.number(),
    sectionsViewed: v.array(v.number()), // which sections they've read
    exercisesCompleted: v.array(v.number()), // which exercise prompts they've answered
    percentComplete: v.number(), // calculated percentage
    lastAccessedAt: v.number(),
    completedAt: v.optional(v.number()),
  })
    .index("by_user", ["userId"])
    .index("by_user_skill_module", ["userId", "skillId", "moduleId"]),

  // Email logs - track emails sent from admin dashboard
  emailLogs: defineTable({
    recipients: v.array(v.string()),
    subject: v.string(),
    type: v.string(), // 'individual', 'broadcast', 'waitlist_invite', etc.
    sentBy: v.string(), // admin email
    sentAt: v.number(),
  })
    .index("by_sent_at", ["sentAt"])
    .index("by_type", ["type"]),

  // Audit Logs - track critical system mutations
  auditLogs: defineTable({
    userId: v.optional(v.id("users")),
    userEmail: v.optional(v.string()),
    action: v.string(), // e.g., 'subscription_update', 'admin_access_granted'
    targetId: v.optional(v.string()),
    metadata: v.optional(v.string()), // JSON string for details
    level: v.string(), // 'info', 'warning', 'critical'
    timestamp: v.number(),
  })
    .index("by_action", ["action"])
    .index("by_timestamp", ["timestamp"])
    .index("by_user", ["userId"]),

  // Global Directives - centralized AI behavioral standards
  globalDirectives: defineTable({
    key: v.string(), // e.g., 'tone', 'voice', 'safety'
    value: v.string(),
    description: v.optional(v.string()),
    updatedBy: v.id("users"),
    timestamp: v.number(),
  })
    .index("by_key", ["key"]),
});
