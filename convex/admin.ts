import { query, mutation, action } from "./_generated/server";
import { v } from "convex/values";

// Get all users with their data
export const getAllUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    // Get subscription and progress data for each user
    const usersWithData = await Promise.all(
      users.map(async (user) => {
        const subscription = await ctx.db
          .query("subscriptions")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .first();

        const progress = await ctx.db
          .query("progress")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .collect();

        const totalModulesCompleted = progress.reduce(
          (sum, p) => sum + (p.modulesCompleted || 0),
          0
        );

        const conversationCount = await ctx.db
          .query("conversations")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .collect();

        return {
          ...user,
          subscription: subscription || null,
          progressCount: progress.length,
          totalModulesCompleted,
          conversationCount: conversationCount.length,
          currentPillarName: getPillarName(user.currentPillar || 0),
        };
      })
    );

    return usersWithData.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get dashboard stats
export const getDashboardStats = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const subscriptions = await ctx.db.query("subscriptions").collect();

    const activeSubscriptions = subscriptions.filter(
      (s) => s.status === "active"
    );

    // Calculate revenue (based on plan prices)
    const planPrices: Record<string, number> = {
      founder: 497,
      scaler: 2497,
      owner: 9997,
    };

    const monthlyRevenue = activeSubscriptions.reduce((sum, sub) => {
      return sum + (planPrices[sub.plan] || 0);
    }, 0);

    // Get users from last 7 days
    const weekAgo = Date.now() - 7 * 24 * 60 * 60 * 1000;
    const newUsersThisWeek = users.filter((u) => u.createdAt > weekAgo).length;

    // Get users from last 30 days
    const monthAgo = Date.now() - 30 * 24 * 60 * 60 * 1000;
    const newUsersThisMonth = users.filter((u) => u.createdAt > monthAgo).length;

    // Calculate completion rates
    const progress = await ctx.db.query("progress").collect();
    const completedPillars = progress.filter((p) => p.completedAt).length;

    return {
      totalUsers: users.length,
      activeSubscriptions: activeSubscriptions.length,
      monthlyRevenue,
      newUsersThisWeek,
      newUsersThisMonth,
      totalPillarsCompleted: completedPillars,
      subscriptionsByPlan: {
        founder: activeSubscriptions.filter((s) => s.plan === "founder").length,
        scaler: activeSubscriptions.filter((s) => s.plan === "scaler").length,
        owner: activeSubscriptions.filter((s) => s.plan === "owner").length,
      },
    };
  },
});

// Get recent activity
export const getRecentActivity = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 20;

    // Get recent users
    const recentUsers = await ctx.db
      .query("users")
      .order("desc")
      .take(limit);

    // Get recent messages (conversation activity)
    const recentMessages = await ctx.db
      .query("messages")
      .order("desc")
      .take(limit);

    // Get recent progress updates
    const recentProgress = await ctx.db
      .query("progress")
      .order("desc")
      .take(limit);

    // Combine and sort all activity
    const activity: Array<{
      type: "signup" | "message" | "progress";
      timestamp: number;
      userId: string;
      userName?: string;
      userEmail?: string;
      details: string;
    }> = [];

    for (const user of recentUsers) {
      activity.push({
        type: "signup",
        timestamp: user.createdAt,
        userId: user._id,
        userName: user.name,
        userEmail: user.email,
        details: "New user signed up",
      });
    }

    for (const msg of recentMessages) {
      const user = await ctx.db.get(msg.userId);
      activity.push({
        type: "message",
        timestamp: msg.createdAt,
        userId: msg.userId,
        userName: user?.name,
        userEmail: user?.email,
        details: `Conversation in ${msg.skillId || "general chat"}`,
      });
    }

    for (const prog of recentProgress) {
      const user = await ctx.db.get(prog.userId);
      activity.push({
        type: "progress",
        timestamp: prog.lastAccessedAt,
        userId: prog.userId,
        userName: user?.name,
        userEmail: user?.email,
        details: `Progress in ${getPillarName(parseInt(prog.skillId.split("-")[0]) || 0)}`,
      });
    }

    return activity
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, limit);
  },
});

// Get user detail
export const getUserDetail = query({
  args: { userId: v.id("users") },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) return null;

    const subscription = await ctx.db
      .query("subscriptions")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .first();

    const progress = await ctx.db
      .query("progress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    const conversations = await ctx.db
      .query("conversations")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Get message count
    let totalMessages = 0;
    for (const conv of conversations) {
      const messages = await ctx.db
        .query("messages")
        .withIndex("by_conversation", (q) => q.eq("conversationId", conv._id))
        .collect();
      totalMessages += messages.length;
    }

    return {
      ...user,
      subscription,
      progress,
      conversationCount: conversations.length,
      messageCount: totalMessages,
    };
  },
});

// Get subscription details for all users
export const getSubscriptions = query({
  args: {},
  handler: async (ctx) => {
    const subscriptions = await ctx.db.query("subscriptions").collect();

    const subsWithUsers = await Promise.all(
      subscriptions.map(async (sub) => {
        const user = await ctx.db.get(sub.userId);
        return {
          ...sub,
          userName: user?.name,
          userEmail: user?.email,
        };
      })
    );

    return subsWithUsers.sort((a, b) => b.createdAt - a.createdAt);
  },
});

// Get engagement metrics for all users
export const getEngagementMetrics = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();

    const metrics = await Promise.all(
      users.map(async (user) => {
        // Get exercise responses
        const exerciseResponses = await ctx.db
          .query("exerciseResponses")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .collect();

        // Get module progress
        const moduleProgress = await ctx.db
          .query("moduleProgress")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .collect();

        // Get conversations
        const conversations = await ctx.db
          .query("conversations")
          .withIndex("by_user", (q) => q.eq("userId", user._id))
          .collect();

        // Calculate engagement score (0-100)
        const exerciseScore = Math.min(exerciseResponses.length * 5, 40); // Max 40 points
        const moduleScore = Math.min(moduleProgress.length * 10, 40); // Max 40 points
        const conversationScore = Math.min(conversations.length * 5, 20); // Max 20 points
        const engagementScore = exerciseScore + moduleScore + conversationScore;

        // Get last activity
        const lastExercise = exerciseResponses.sort((a, b) => b.updatedAt - a.updatedAt)[0];
        const lastModule = moduleProgress.sort((a, b) => b.lastAccessedAt - a.lastAccessedAt)[0];
        const lastActivity = Math.max(
          lastExercise?.updatedAt || 0,
          lastModule?.lastAccessedAt || 0,
          user.createdAt
        );

        return {
          userId: user._id,
          userName: user.name,
          userEmail: user.email,
          exerciseCount: exerciseResponses.length,
          modulesStarted: moduleProgress.length,
          conversationCount: conversations.length,
          engagementScore,
          lastActivity,
          daysSinceActive: Math.floor((Date.now() - lastActivity) / (1000 * 60 * 60 * 24)),
        };
      })
    );

    return metrics.sort((a, b) => b.engagementScore - a.engagementScore);
  },
});

// Get users who are considered stalled
export const getStalledUsers = query({
  args: {},
  handler: async (ctx) => {
    const users = await ctx.db.query("users").collect();
    const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
    const fortyEightHoursAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;

    const stalledUsers = [];

    for (const user of users) {
      if (user.isAdmin) continue;

      // Check login inactivity
      const isInactiveLogin = (user.lastLoginAt || 0) < threeDaysAgo;

      // Check module progress inactivity
      const latestProgress = await ctx.db
        .query("moduleProgress")
        .withIndex("by_user", (q) => q.eq("userId", user._id))
        .collect();

      const lastProgressTimestamp = latestProgress.sort((a, b) => b.lastAccessedAt - a.lastAccessedAt)[0]?.lastAccessedAt || 0;
      const isInactiveProgress = lastProgressTimestamp < fortyEightHoursAgo;

      if (isInactiveLogin || isInactiveProgress) {
        // Get their current pillar name
        const pillarName = getPillarName(user.currentPillar || 1);

        stalledUsers.push({
          ...user,
          pillarName,
          lastProgressAt: lastProgressTimestamp,
          daysSinceActive: Math.floor((Date.now() - Math.max(user.lastLoginAt || 0, lastProgressTimestamp)) / (1000 * 60 * 60 * 24)),
          reason: isInactiveLogin ? 'Inactivity' : 'Stalled Progress'
        });
      }
    }

    return stalledUsers.sort((a, b) => b.daysSinceActive - a.daysSinceActive);
  },
});

// Helper function for pillar names
function getPillarName(pillarNumber: number): string {
  const pillars: Record<number, string> = {
    0: "Not Started",
    1: "Reality Distortion",
    2: "Liquidity Allocation",
    3: "Holding Company",
    4: "Time Arbitrage",
    5: "Bio-Availability",
    6: "Political Capital",
    7: "Syndicate",
    8: "Family Office",
    9: "Dynasty Design",
    10: "Sovereign Flags",
    11: "Asymmetric Bets",
    12: "Ascendance",
  };
  return pillars[pillarNumber] || "Unknown";
}

// Send custom email from admin dashboard
export const sendAdminEmail = action({
  args: {
    to: v.array(v.string()),
    subject: v.string(),
    htmlBody: v.string(),
    textBody: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const EMAIL_IT_API_KEY = process.env.EMAIL_IT_API_KEY;

    if (!EMAIL_IT_API_KEY) {
      console.error("EMAIL_IT_API_KEY not configured");
      throw new Error("Email service not configured");
    }

    const response = await fetch('https://api.emailit.com/v1/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${EMAIL_IT_API_KEY}`
      },
      body: JSON.stringify({
        from: 'Billionaireable <noreply@billionaireable.com>',
        to: args.to.join(', '),
        subject: args.subject,
        html: args.htmlBody,
        text: args.textBody || args.subject,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      console.error("Email It error:", error);
      throw new Error("Failed to send email");
    }

    return {
      success: true,
      sentTo: args.to.length,
      message: `Email sent to ${args.to.length} recipient(s)`
    };
  },
});

// Log sent emails for tracking
export const logSentEmail = mutation({
  args: {
    recipients: v.array(v.string()),
    subject: v.string(),
    type: v.string(),
    sentBy: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("emailLogs", {
      recipients: args.recipients,
      subject: args.subject,
      type: args.type,
      sentBy: args.sentBy,
      sentAt: Date.now(),
    });
  },
});

// Get email logs
export const getEmailLogs = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    const logs = await ctx.db
      .query("emailLogs")
      .order("desc")
      .take(limit);
    return logs;
  },
});

// Audit Logging
export const logAction = mutation({
  args: {
    userId: v.optional(v.id("users")),
    userEmail: v.optional(v.string()),
    action: v.string(),
    targetId: v.optional(v.string()),
    metadata: v.optional(v.string()),
    level: v.string(),
  },
  handler: async (ctx, args) => {
    await ctx.db.insert("auditLogs", {
      userId: args.userId,
      userEmail: args.userEmail,
      action: args.action,
      targetId: args.targetId,
      metadata: args.metadata,
      level: args.level,
      timestamp: Date.now(),
    });
  },
});

export const getAuditLogs = query({
  args: { limit: v.optional(v.number()) },
  handler: async (ctx, args) => {
    const limit = args.limit || 50;
    return await ctx.db
      .query("auditLogs")
      .order("desc")
      .take(limit);
  },
});

// Global Directives Management
export const updateGlobalDirective = mutation({
  args: {
    key: v.string(),
    value: v.string(),
    description: v.optional(v.string()),
    adminId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("globalDirectives")
      .withIndex("by_key", (q) => q.eq("key", args.key))
      .first();

    if (existing) {
      await ctx.db.patch(existing._id, {
        value: args.value,
        description: args.description,
        updatedBy: args.adminId,
        timestamp: Date.now(),
      });
    } else {
      await ctx.db.insert("globalDirectives", {
        key: args.key,
        value: args.value,
        description: args.description,
        updatedBy: args.adminId,
        timestamp: Date.now(),
      });
    }

    // Log the change
    await ctx.db.insert("auditLogs", {
      userId: args.adminId,
      action: "update_global_directive",
      targetId: args.key,
      metadata: JSON.stringify({ key: args.key, value: args.value }),
      level: "info",
      timestamp: Date.now(),
    });
  },
});

export const getGlobalDirectives = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db.query("globalDirectives").collect();
  },
});
