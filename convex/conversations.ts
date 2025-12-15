import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a new conversation
export const createConversation = mutation({
  args: {
    userId: v.id("users"),
    title: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const conversationId = await ctx.db.insert("conversations", {
      userId: args.userId,
      title: args.title,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });
    return conversationId;
  },
});

// Get all conversations for a user
export const getUserConversations = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .collect();
  },
});

// Get a single conversation with its messages
export const getConversationWithMessages = query({
  args: { conversationId: v.id("conversations") },
  handler: async (ctx, args) => {
    const conversation = await ctx.db.get(args.conversationId);
    if (!conversation) return null;

    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order("asc")
      .collect();

    return { conversation, messages };
  },
});

// Add a message to a conversation
export const addMessage = mutation({
  args: {
    conversationId: v.id("conversations"),
    userId: v.id("users"),
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    skillId: v.optional(v.string()),
    moduleId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    // Add the message
    const messageId = await ctx.db.insert("messages", {
      conversationId: args.conversationId,
      userId: args.userId,
      role: args.role,
      content: args.content,
      skillId: args.skillId,
      moduleId: args.moduleId,
      createdAt: Date.now(),
    });

    // Update conversation timestamp
    await ctx.db.patch(args.conversationId, {
      updatedAt: Date.now(),
    });

    return messageId;
  },
});

// Get recent messages for context (for AI memory)
export const getRecentMessages = query({
  args: {
    userId: v.id("users"),
    limit: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const limit = args.limit ?? 50;

    // Get user's conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .order("desc")
      .take(10);

    // Get messages from those conversations
    const allMessages = [];
    for (const conv of conversations) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
        .order("desc")
        .take(limit);
      allMessages.push(...messages);
    }

    // Sort by creation time and limit
    return allMessages
      .sort((a, b) => b.createdAt - a.createdAt)
      .slice(0, limit);
  },
});

// Get or create a conversation for a specific pillar
export const getOrCreatePillarConversation = mutation({
  args: {
    userId: v.id("users"),
    pillarId: v.string(),
    pillarName: v.string(),
  },
  handler: async (ctx, args) => {
    // Look for existing conversation for this user + pillar
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Find one that matches this pillar (stored in title)
    const existing = conversations.find(c => c.title === `pillar:${args.pillarId}`);

    if (existing) {
      return existing._id;
    }

    // Create new conversation for this pillar
    const conversationId = await ctx.db.insert("conversations", {
      userId: args.userId,
      title: `pillar:${args.pillarId}`,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    });

    return conversationId;
  },
});

// Get all messages for a user across all pillars (for AI memory - never forgets)
export const getAllUserMessages = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get ALL user's conversations
    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Get ALL messages from ALL conversations
    const allMessages = [];
    for (const conv of conversations) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
        .order("asc")
        .collect();

      // Add pillar context to each message
      const pillarId = conv.title?.replace('pillar:', '') || 'unknown';
      for (const msg of messages) {
        allMessages.push({
          ...msg,
          pillarId,
        });
      }
    }

    // Sort by creation time (oldest first for context building)
    return allMessages.sort((a, b) => a.createdAt - b.createdAt);
  },
});

// Get messages for a specific pillar conversation
export const getPillarMessages = query({
  args: {
    conversationId: v.id("conversations"),
  },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_conversation", (q) => q.eq("conversationId", args.conversationId))
      .order("asc")
      .collect();

    return messages;
  },
});


