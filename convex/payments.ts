import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Create a payment application (for wire transfer / high-ticket items)
export const createPaymentApplication = mutation({
    args: {
        userId: v.id("users"),
        tier: v.string(),
        billingCycle: v.string(),
        amount: v.number(),
        paymentMethod: v.string(),
    },
    handler: async (ctx, args) => {
        // Get user details
        const user = await ctx.db.get(args.userId);
        
        return await ctx.db.insert("paymentApplications", {
            userId: args.userId,
            userEmail: user?.email || "",
            userName: user?.name || "",
            tier: args.tier,
            billingCycle: args.billingCycle,
            amount: args.amount,
            paymentMethod: args.paymentMethod,
            status: "pending",
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
    },
});

// Get all payment applications (admin)
export const getAllApplications = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("paymentApplications")
            .order("desc")
            .collect();
    },
});

// Get pending applications (admin)
export const getPendingApplications = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db
            .query("paymentApplications")
            .filter((q) => q.eq(q.field("status"), "pending"))
            .order("desc")
            .collect();
    },
});

// Update application status (admin)
export const updateApplicationStatus = mutation({
    args: {
        applicationId: v.id("paymentApplications"),
        status: v.string(),
        notes: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        await ctx.db.patch(args.applicationId, {
            status: args.status,
            notes: args.notes,
            updatedAt: Date.now(),
        });
        
        // If approved, activate subscription
        if (args.status === "approved") {
            const application = await ctx.db.get(args.applicationId);
            if (application) {
                // Create/update subscription
                const existingSub = await ctx.db
                    .query("subscriptions")
                    .filter((q) => q.eq(q.field("userId"), application.userId))
                    .first();
                    
                const subscriptionData = {
                    userId: application.userId,
                    plan: application.tier,
                    status: "active" as const,
                    paymentMethod: application.paymentMethod,
                    amount: application.amount,
                    billingCycle: application.billingCycle,
                    currentPeriodStart: Date.now(),
                    currentPeriodEnd: application.billingCycle === "annual"
                        ? Date.now() + 365 * 24 * 60 * 60 * 1000
                        : Date.now() + 30 * 24 * 60 * 60 * 1000,
                };
                
                if (existingSub) {
                    await ctx.db.patch(existingSub._id, subscriptionData);
                } else {
                    await ctx.db.insert("subscriptions", {
                        ...subscriptionData,
                        stripeSubscriptionId: `wire_${Date.now()}`,
                        createdAt: Date.now(),
                    });
                }
            }
        }
    },
});

// Get user's applications
export const getUserApplications = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("paymentApplications")
            .filter((q) => q.eq(q.field("userId"), args.userId))
            .order("desc")
            .collect();
    },
});

