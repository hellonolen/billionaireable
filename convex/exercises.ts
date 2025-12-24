import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Save an exercise response
export const saveResponse = mutation({
  args: {
    userId: v.id("users"),
    skillId: v.string(),
    moduleId: v.number(),
    promptIndex: v.number(),
    prompt: v.string(),
    response: v.string(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Check if response already exists for this prompt
    const existing = await ctx.db
      .query("exerciseResponses")
      .withIndex("by_user_skill_module", (q) => 
        q.eq("userId", args.userId)
          .eq("skillId", args.skillId)
          .eq("moduleId", args.moduleId)
      )
      .filter((q) => q.eq(q.field("promptIndex"), args.promptIndex))
      .first();

    if (existing) {
      // Update existing response
      await ctx.db.patch(existing._id, {
        response: args.response,
        updatedAt: now,
      });
      return existing._id;
    } else {
      // Create new response
      return await ctx.db.insert("exerciseResponses", {
        userId: args.userId,
        skillId: args.skillId,
        moduleId: args.moduleId,
        promptIndex: args.promptIndex,
        prompt: args.prompt,
        response: args.response,
        createdAt: now,
      });
    }
  },
});

// Get all responses for a module
export const getModuleResponses = query({
  args: {
    userId: v.id("users"),
    skillId: v.string(),
    moduleId: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("exerciseResponses")
      .withIndex("by_user_skill_module", (q) => 
        q.eq("userId", args.userId)
          .eq("skillId", args.skillId)
          .eq("moduleId", args.moduleId)
      )
      .collect();
  },
});

// Get all responses for a user across all modules (for AI memory)
export const getAllUserResponses = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("exerciseResponses")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();
  },
});

// Update module progress
export const updateModuleProgress = mutation({
  args: {
    userId: v.id("users"),
    skillId: v.string(),
    moduleId: v.number(),
    sectionViewed: v.optional(v.number()),
    exerciseCompleted: v.optional(v.number()),
    totalSections: v.number(),
    totalExercises: v.number(),
  },
  handler: async (ctx, args) => {
    const now = Date.now();
    
    // Get existing progress
    const existing = await ctx.db
      .query("moduleProgress")
      .withIndex("by_user_skill_module", (q) => 
        q.eq("userId", args.userId)
          .eq("skillId", args.skillId)
          .eq("moduleId", args.moduleId)
      )
      .first();

    let sectionsViewed = existing?.sectionsViewed || [];
    let exercisesCompleted = existing?.exercisesCompleted || [];

    if (args.sectionViewed !== undefined && !sectionsViewed.includes(args.sectionViewed)) {
      sectionsViewed = [...sectionsViewed, args.sectionViewed];
    }
    if (args.exerciseCompleted !== undefined && !exercisesCompleted.includes(args.exerciseCompleted)) {
      exercisesCompleted = [...exercisesCompleted, args.exerciseCompleted];
    }

    // Calculate percentage: sections are 60% of progress, exercises are 40%
    const sectionPercent = (sectionsViewed.length / args.totalSections) * 60;
    const exercisePercent = (exercisesCompleted.length / args.totalExercises) * 40;
    const percentComplete = Math.round(sectionPercent + exercisePercent);

    if (existing) {
      await ctx.db.patch(existing._id, {
        sectionsViewed,
        exercisesCompleted,
        percentComplete,
        lastAccessedAt: now,
        completedAt: percentComplete >= 100 ? now : existing.completedAt,
      });
      return existing._id;
    } else {
      return await ctx.db.insert("moduleProgress", {
        userId: args.userId,
        skillId: args.skillId,
        moduleId: args.moduleId,
        sectionsViewed,
        exercisesCompleted,
        percentComplete,
        lastAccessedAt: now,
        completedAt: percentComplete >= 100 ? now : undefined,
      });
    }
  },
});

// Get module progress
export const getModuleProgress = query({
  args: {
    userId: v.id("users"),
    skillId: v.string(),
    moduleId: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("moduleProgress")
      .withIndex("by_user_skill_module", (q) => 
        q.eq("userId", args.userId)
          .eq("skillId", args.skillId)
          .eq("moduleId", args.moduleId)
      )
      .first();
  },
});

// Get all module progress for a skill (to show on SkillDetail page)
export const getSkillProgress = query({
  args: {
    userId: v.id("users"),
    skillId: v.string(),
  },
  handler: async (ctx, args) => {
    const allProgress = await ctx.db
      .query("moduleProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    return allProgress.filter(p => p.skillId === args.skillId);
  },
});

// Get user's identity profile based on their engagement patterns
export const getUserIdentityProfile = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    // Get all exercise responses
    const responses = await ctx.db
      .query("exerciseResponses")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Get all module progress
    const progress = await ctx.db
      .query("moduleProgress")
      .withIndex("by_user", (q) => q.eq("userId", args.userId))
      .collect();

    // Analyze which pillars they're most engaged with
    const pillarEngagement: Record<string, { responses: number; progress: number; avgCompletion: number }> = {};

    responses.forEach(r => {
      if (!pillarEngagement[r.skillId]) {
        pillarEngagement[r.skillId] = { responses: 0, progress: 0, avgCompletion: 0 };
      }
      pillarEngagement[r.skillId].responses++;
    });

    progress.forEach(p => {
      if (!pillarEngagement[p.skillId]) {
        pillarEngagement[p.skillId] = { responses: 0, progress: 0, avgCompletion: 0 };
      }
      pillarEngagement[p.skillId].progress++;
      pillarEngagement[p.skillId].avgCompletion =
        (pillarEngagement[p.skillId].avgCompletion * (pillarEngagement[p.skillId].progress - 1) + p.percentComplete) /
        pillarEngagement[p.skillId].progress;
    });

    // Determine dominant archetype based on pillar engagement
    const archetypeMap: Record<string, string> = {
      'reality-distortion': 'The Visionary',
      'liquidity-allocation': 'The Allocator',
      'holding-co': 'The Architect',
      'time-arbitrage': 'The Optimizer',
      'bio-availability': 'The Performer',
      'political-capital': 'The Operator',
      'syndicate': 'The Connector',
      'family-office': 'The Steward',
      'dynasty-design': 'The Builder',
      'sovereign-flags': 'The Sovereign',
      'asymmetric-bets': 'The Strategist',
      'ascendance': 'The Transcendent',
    };

    // Find top 3 pillars by engagement
    const sortedPillars = Object.entries(pillarEngagement)
      .sort((a, b) => (b[1].responses + b[1].avgCompletion) - (a[1].responses + a[1].avgCompletion))
      .slice(0, 3);

    const dominantArchetype = sortedPillars[0] ? archetypeMap[sortedPillars[0][0]] : null;
    const emergingArchetypes = sortedPillars.slice(1).map(([pillar]) => archetypeMap[pillar]).filter(Boolean);

    return {
      totalResponses: responses.length,
      totalModulesStarted: progress.length,
      pillarEngagement,
      dominantArchetype,
      emergingArchetypes,
      isNewMember: responses.length === 0 && progress.length === 0,
    };
  },
});
