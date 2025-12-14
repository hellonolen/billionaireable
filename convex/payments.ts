import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api } from "./_generated/api";

// Tier requirements - what it takes to get in
const TIER_REQUIREMENTS = {
    founder: {
        monthlyAmount: 497,
        annualAmount: 4997,
        description: "Building from zero to one",
        // No additional requirements - pay and you're in
    },
    scaler: {
        monthlyAmount: 1497,
        annualAmount: 14997,
        description: "Growing what works",
        // No additional requirements - pay and you're in
    },
    owner: {
        monthlyAmount: 4997,
        annualAmount: 49997,
        description: "Building dynasties",
        // No additional requirements - pay and you're in
    },
};

// Bank details for wire transfers
const WIRE_DETAILS = {
    bankName: "Your Bank Name",
    accountName: "Billionaireable LLC",
    routingNumber: "XXXXXXXXX",
    accountNumber: "XXXXXXXXX",
    swiftCode: "XXXXXXXXX",
    reference: "BILL-", // Will append application ID
};

// Create a payment application
export const createPaymentApplication = mutation({
    args: {
        userId: v.id("users"),
        tier: v.string(),
        billingCycle: v.string(),
        amount: v.number(),
        paymentMethod: v.string(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        
        const applicationId = await ctx.db.insert("paymentApplications", {
            userId: args.userId,
            userEmail: user?.email || "",
            userName: user?.name || "",
            tier: args.tier,
            billingCycle: args.billingCycle,
            amount: args.amount,
            paymentMethod: args.paymentMethod,
            status: args.paymentMethod === 'wire' ? "awaiting_payment" : "pending",
            wireReference: `BILL-${Date.now().toString(36).toUpperCase()}`,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        
        return {
            applicationId,
            wireDetails: args.paymentMethod === 'wire' ? {
                ...WIRE_DETAILS,
                reference: `BILL-${Date.now().toString(36).toUpperCase()}`,
                amount: args.amount,
            } : null,
        };
    },
});

// Verify payment and auto-approve
// This is called when payment is confirmed (webhook, manual verification, etc.)
export const verifyPaymentAndActivate = mutation({
    args: {
        applicationId: v.id("paymentApplications"),
        paymentReference: v.optional(v.string()),
        paymentSource: v.string(), // 'stripe', 'whop', 'wire', 'manual'
    },
    handler: async (ctx, args) => {
        const application = await ctx.db.get(args.applicationId);
        if (!application) throw new Error("Application not found");
        
        // Verify the amount matches the tier
        const tierConfig = TIER_REQUIREMENTS[application.tier as keyof typeof TIER_REQUIREMENTS];
        if (!tierConfig) throw new Error("Invalid tier");
        
        const expectedAmount = application.billingCycle === 'annual' 
            ? tierConfig.annualAmount 
            : tierConfig.monthlyAmount;
            
        // Amount verification (allow small variance for fees)
        if (application.amount < expectedAmount * 0.99) {
            await ctx.db.patch(args.applicationId, {
                status: "payment_insufficient",
                notes: `Expected ${expectedAmount}, received ${application.amount}`,
                updatedAt: Date.now(),
            });
            return { success: false, reason: "insufficient_payment" };
        }
        
        // Payment verified - activate immediately
        await ctx.db.patch(args.applicationId, {
            status: "approved",
            paymentVerifiedAt: Date.now(),
            paymentReference: args.paymentReference,
            paymentSource: args.paymentSource,
            updatedAt: Date.now(),
        });
        
        // Create/update subscription
        const existingSub = await ctx.db
            .query("subscriptions")
            .withIndex("by_user", (q) => q.eq("userId", application.userId))
            .first();
            
        const periodEnd = application.billingCycle === "annual"
            ? Date.now() + 365 * 24 * 60 * 60 * 1000
            : Date.now() + 30 * 24 * 60 * 60 * 1000;
            
        const subscriptionData = {
            userId: application.userId,
            plan: application.tier,
            status: "active" as const,
            paymentMethod: args.paymentSource,
            amount: application.amount,
            billingCycle: application.billingCycle,
            currentPeriodStart: Date.now(),
            currentPeriodEnd: periodEnd,
        };
        
        if (existingSub) {
            await ctx.db.patch(existingSub._id, {
                ...subscriptionData,
                updatedAt: Date.now(),
            });
        } else {
            await ctx.db.insert("subscriptions", {
                ...subscriptionData,
                stripeSubscriptionId: `${args.paymentSource}_${Date.now()}`,
                createdAt: Date.now(),
            });
        }
        
        return { 
            success: true, 
            tier: application.tier,
            accessGranted: true,
        };
    },
});

// Mark wire payment as received (called by bank webhook or admin)
export const confirmWirePayment = mutation({
    args: {
        wireReference: v.string(),
        amountReceived: v.number(),
        bankReference: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        // Find application by wire reference
        const applications = await ctx.db
            .query("paymentApplications")
            .filter((q) => q.eq(q.field("wireReference"), args.wireReference))
            .collect();
            
        const application = applications[0];
        if (!application) {
            return { success: false, reason: "reference_not_found" };
        }
        
        // Verify amount
        if (args.amountReceived < application.amount * 0.99) {
            await ctx.db.patch(application._id, {
                status: "payment_insufficient",
                notes: `Expected ${application.amount}, received ${args.amountReceived}`,
                updatedAt: Date.now(),
            });
            return { success: false, reason: "insufficient_amount" };
        }
        
        // Payment verified - auto activate
        await ctx.db.patch(application._id, {
            status: "approved",
            paymentVerifiedAt: Date.now(),
            paymentReference: args.bankReference,
            paymentSource: "wire",
            amountReceived: args.amountReceived,
            updatedAt: Date.now(),
        });
        
        // Create subscription
        const periodEnd = application.billingCycle === "annual"
            ? Date.now() + 365 * 24 * 60 * 60 * 1000
            : Date.now() + 30 * 24 * 60 * 60 * 1000;
            
        const existingSub = await ctx.db
            .query("subscriptions")
            .withIndex("by_user", (q) => q.eq("userId", application.userId))
            .first();
            
        if (existingSub) {
            await ctx.db.patch(existingSub._id, {
                plan: application.tier,
                status: "active",
                paymentMethod: "wire",
                amount: args.amountReceived,
                billingCycle: application.billingCycle,
                currentPeriodStart: Date.now(),
                currentPeriodEnd: periodEnd,
                updatedAt: Date.now(),
            });
        } else {
            await ctx.db.insert("subscriptions", {
                userId: application.userId,
                plan: application.tier,
                status: "active",
                paymentMethod: "wire",
                amount: args.amountReceived,
                billingCycle: application.billingCycle,
                currentPeriodStart: Date.now(),
                currentPeriodEnd: periodEnd,
                stripeSubscriptionId: `wire_${Date.now()}`,
                createdAt: Date.now(),
            });
        }
        
        return { 
            success: true, 
            applicationId: application._id,
            userActivated: true,
        };
    },
});

// Get application with wire details (for user to see their payment instructions)
export const getApplicationWithWireDetails = query({
    args: {
        applicationId: v.id("paymentApplications"),
    },
    handler: async (ctx, args) => {
        const application = await ctx.db.get(args.applicationId);
        if (!application) return null;
        
        return {
            ...application,
            wireDetails: application.paymentMethod === 'wire' ? {
                bankName: WIRE_DETAILS.bankName,
                accountName: WIRE_DETAILS.accountName,
                routingNumber: WIRE_DETAILS.routingNumber,
                accountNumber: WIRE_DETAILS.accountNumber,
                swiftCode: WIRE_DETAILS.swiftCode,
                reference: application.wireReference,
                amount: application.amount,
            } : null,
        };
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

// Get pending/awaiting applications (admin)
export const getPendingApplications = query({
    args: {},
    handler: async (ctx) => {
        const apps = await ctx.db
            .query("paymentApplications")
            .order("desc")
            .collect();
        return apps.filter(a => a.status === "pending" || a.status === "awaiting_payment");
    },
});

// Manual status update (admin override if needed)
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
        
        // If manually approved, activate subscription
        if (args.status === "approved") {
            const application = await ctx.db.get(args.applicationId);
            if (application) {
                const periodEnd = application.billingCycle === "annual"
                    ? Date.now() + 365 * 24 * 60 * 60 * 1000
                    : Date.now() + 30 * 24 * 60 * 60 * 1000;
                    
                const existingSub = await ctx.db
                    .query("subscriptions")
                    .withIndex("by_user", (q) => q.eq("userId", application.userId))
                    .first();
                    
                if (existingSub) {
                    await ctx.db.patch(existingSub._id, {
                        plan: application.tier,
                        status: "active",
                        paymentMethod: application.paymentMethod,
                        amount: application.amount,
                        billingCycle: application.billingCycle,
                        currentPeriodStart: Date.now(),
                        currentPeriodEnd: periodEnd,
                        updatedAt: Date.now(),
                    });
                } else {
                    await ctx.db.insert("subscriptions", {
                        userId: application.userId,
                        plan: application.tier,
                        status: "active",
                        paymentMethod: application.paymentMethod,
                        amount: application.amount,
                        billingCycle: application.billingCycle,
                        currentPeriodStart: Date.now(),
                        currentPeriodEnd: periodEnd,
                        stripeSubscriptionId: `manual_${Date.now()}`,
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
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .order("desc")
            .collect();
    },
});

// Check if user has pending application
export const hasPendingApplication = query({
    args: {
        userId: v.id("users"),
    },
    handler: async (ctx, args) => {
        const apps = await ctx.db
            .query("paymentApplications")
            .withIndex("by_user", (q) => q.eq("userId", args.userId))
            .collect();
        return apps.some(a => a.status === "pending" || a.status === "awaiting_payment");
    },
});
