import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

// Tier pricing
const TIER_PRICING = {
    founder: {
        monthly: 497,
        annual: 4997,
    },
    scaler: {
        monthly: 1497,
        annual: 14997,
    },
    owner: {
        monthly: 4997,
        annual: 49997,
    },
};

// Bank details for wire transfers - UPDATE THESE WITH YOUR REAL BANK INFO
const WIRE_DETAILS = {
    bankName: "Your Bank Name",
    accountName: "Billionaireable LLC",
    routingNumber: "XXXXXXXXX",
    accountNumber: "XXXXXXXXX",
    swiftCode: "XXXXXXXXX", // For international wires
};

// Create a payment application (user selects tier, gets wire details)
export const createPaymentApplication = mutation({
    args: {
        userId: v.id("users"),
        tier: v.string(),
        billingCycle: v.string(),
        amount: v.number(),
        paymentMethod: v.string(), // Always 'wire' now
    },
    handler: async (ctx, args) => {
        const user = await ctx.db.get(args.userId);
        
        // Generate unique wire reference
        const wireReference = `BILL-${Date.now().toString(36).toUpperCase()}`;
        
        const applicationId = await ctx.db.insert("paymentApplications", {
            userId: args.userId,
            userEmail: user?.email || "",
            userName: user?.name || "",
            tier: args.tier,
            billingCycle: args.billingCycle,
            amount: args.amount,
            paymentMethod: 'wire',
            status: "awaiting_payment",
            wireReference,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        });
        
        return {
            applicationId,
            wireDetails: {
                ...WIRE_DETAILS,
                reference: wireReference,
                amount: args.amount,
            },
        };
    },
});

// Confirm wire payment received → Auto-activate subscription
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
            .collect();
            
        const application = applications.find(a => a.wireReference === args.wireReference);
        
        if (!application) {
            return { success: false, reason: "reference_not_found" };
        }
        
        // Verify amount (allow 1% variance for fees)
        if (args.amountReceived < application.amount * 0.99) {
            await ctx.db.patch(application._id, {
                status: "payment_insufficient",
                notes: `Expected $${application.amount}, received $${args.amountReceived}`,
                amountReceived: args.amountReceived,
                updatedAt: Date.now(),
            });
            return { success: false, reason: "insufficient_amount" };
        }
        
        // Payment verified → Activate subscription
        await ctx.db.patch(application._id, {
            status: "approved",
            paymentVerifiedAt: Date.now(),
            paymentReference: args.bankReference,
            paymentSource: "wire",
            amountReceived: args.amountReceived,
            updatedAt: Date.now(),
        });
        
        // Calculate subscription period
        const periodEnd = application.billingCycle === "annual"
            ? Date.now() + 365 * 24 * 60 * 60 * 1000
            : Date.now() + 30 * 24 * 60 * 60 * 1000;
            
        // Create or update subscription
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
            tier: application.tier,
            userActivated: true,
        };
    },
});

// Get application with wire details (for user to see payment instructions)
export const getApplicationWithWireDetails = query({
    args: {
        applicationId: v.id("paymentApplications"),
    },
    handler: async (ctx, args) => {
        const application = await ctx.db.get(args.applicationId);
        if (!application) return null;
        
        return {
            ...application,
            wireDetails: {
                bankName: WIRE_DETAILS.bankName,
                accountName: WIRE_DETAILS.accountName,
                routingNumber: WIRE_DETAILS.routingNumber,
                accountNumber: WIRE_DETAILS.accountNumber,
                swiftCode: WIRE_DETAILS.swiftCode,
                reference: application.wireReference,
                amount: application.amount,
            },
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
        return apps.filter(a => a.status === "awaiting_payment");
    },
});

// Manual approval (admin override if needed)
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
                        paymentMethod: "wire",
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
        return apps.some(a => a.status === "awaiting_payment");
    },
});
