import { query, mutation } from "./_generated/server";
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


