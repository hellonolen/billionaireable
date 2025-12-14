import { v } from "convex/values";
import { mutation, query, action } from "./_generated/server";
import { api, internal } from "./_generated/api";

// Generate a random 6-digit code
function generateCode(): string {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// Generate a secure session token
function generateSessionToken(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < 64; i++) {
        token += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return token;
}

// Request a login/signup code
export const requestCode = mutation({
    args: { 
        email: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const email = args.email.toLowerCase().trim();
        
        // Check if user exists
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();
        
        const type = existingUser ? 'login' : 'signup';
        
        // Delete any existing codes for this email
        const existingCodes = await ctx.db
            .query("verificationCodes")
            .withIndex("by_email", (q) => q.eq("email", email))
            .collect();
        
        for (const code of existingCodes) {
            await ctx.db.delete(code._id);
        }
        
        // Generate new code
        const code = generateCode();
        
        // Save to DB (expires in 15 minutes)
        await ctx.db.insert("verificationCodes", {
            email,
            code,
            type,
            expiresAt: Date.now() + 15 * 60 * 1000,
        });
        
        // Store name for signup if provided
        return { 
            success: true, 
            type,
            email,
            name: args.name,
            // Code is returned here for the action to send email
            // In production, never expose this to the client
            _code: code,
        };
    },
});

// Send the verification email via Resend
export const sendVerificationEmail = action({
    args: {
        email: v.string(),
        code: v.string(),
        type: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const RESEND_API_KEY = process.env.RESEND_API_KEY;
        
        if (!RESEND_API_KEY) {
            console.error("RESEND_API_KEY not configured");
            throw new Error("Email service not configured");
        }
        
        const subject = args.type === 'signup' 
            ? 'Welcome to Billionaireable - Your Access Code'
            : 'Your Billionaireable Login Code';
            
        const html = `
            <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 40px 20px;">
                <h1 style="font-size: 24px; font-weight: 900; color: #000; margin-bottom: 24px;">
                    Billionaireable
                </h1>
                
                <p style="font-size: 16px; color: #333; margin-bottom: 24px;">
                    ${args.type === 'signup' 
                        ? `Welcome${args.name ? `, ${args.name}` : ''}. Here's your access code:` 
                        : 'Here\'s your login code:'}
                </p>
                
                <div style="background: #000; color: #fff; padding: 24px; border-radius: 12px; text-align: center; margin-bottom: 24px;">
                    <span style="font-size: 36px; font-weight: 900; letter-spacing: 8px; font-family: monospace;">
                        ${args.code}
                    </span>
                </div>
                
                <p style="font-size: 14px; color: #666; margin-bottom: 8px;">
                    This code expires in 15 minutes.
                </p>
                
                <p style="font-size: 14px; color: #666;">
                    If you didn't request this code, ignore this email.
                </p>
                
                <hr style="border: none; border-top: 1px solid #eee; margin: 32px 0;" />
                
                <p style="font-size: 12px; color: #999;">
                    Billionaireable
                </p>
            </div>
        `;
        
        const response = await fetch('https://api.resend.com/emails', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${RESEND_API_KEY}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                from: 'Billionaireable <noreply@billionaireable.com>',
                to: [args.email],
                subject,
                html,
            }),
        });
        
        if (!response.ok) {
            const error = await response.text();
            console.error("Resend error:", error);
            throw new Error("Failed to send email");
        }
        
        return { success: true };
    },
});

// Verify code and sign in
export const verifyCode = mutation({
    args: {
        email: v.string(),
        code: v.string(),
        name: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const email = args.email.toLowerCase().trim();
        
        // Find the verification code
        const verification = await ctx.db
            .query("verificationCodes")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();
        
        if (!verification) {
            throw new Error("No verification code found. Please request a new one.");
        }
        
        if (verification.code !== args.code) {
            throw new Error("Invalid code. Please try again.");
        }
        
        if (verification.expiresAt < Date.now()) {
            await ctx.db.delete(verification._id);
            throw new Error("Code expired. Please request a new one.");
        }
        
        // Delete the used code
        await ctx.db.delete(verification._id);
        
        // Generate session token
        const sessionToken = generateSessionToken();
        const sessionExpiresAt = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days
        
        // Get or create user
        let user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", email))
            .first();
        
        if (user) {
            // Update existing user with new session
            await ctx.db.patch(user._id, {
                sessionToken,
                sessionExpiresAt,
                lastLoginAt: Date.now(),
                updatedAt: Date.now(),
            });
        } else {
            // Create new user
            const userId = await ctx.db.insert("users", {
                email,
                name: args.name,
                sessionToken,
                sessionExpiresAt,
                lastLoginAt: Date.now(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
            });
            user = await ctx.db.get(userId);
        }
        
        return {
            success: true,
            sessionToken,
            user: {
                _id: user!._id,
                email: user!.email,
                name: user!.name,
                isAdmin: user!.isAdmin,
                onboardingComplete: user!.onboardingComplete,
            },
        };
    },
});

// Get current user from session token
export const getCurrentUser = query({
    args: { sessionToken: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (!args.sessionToken) return null;
        
        const user = await ctx.db
            .query("users")
            .withIndex("by_session", (q) => q.eq("sessionToken", args.sessionToken))
            .first();
        
        if (!user) return null;
        
        // Check if session expired
        if (user.sessionExpiresAt && user.sessionExpiresAt < Date.now()) {
            return null;
        }
        
        return {
            _id: user._id,
            email: user.email,
            name: user.name,
            imageUrl: user.imageUrl,
            isAdmin: user.isAdmin,
            onboardingComplete: user.onboardingComplete,
            currentPillar: user.currentPillar,
            focusAreas: user.focusAreas,
            netWorth: user.netWorth,
        };
    },
});

// Sign out - invalidate session
export const signOut = mutation({
    args: { sessionToken: v.string() },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_session", (q) => q.eq("sessionToken", args.sessionToken))
            .first();
        
        if (user) {
            await ctx.db.patch(user._id, {
                sessionToken: undefined,
                sessionExpiresAt: undefined,
                updatedAt: Date.now(),
            });
        }
        
        return { success: true };
    },
});

// Update user profile
export const updateProfile = mutation({
    args: {
        sessionToken: v.string(),
        name: v.optional(v.string()),
        imageUrl: v.optional(v.string()),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_session", (q) => q.eq("sessionToken", args.sessionToken))
            .first();
        
        if (!user) throw new Error("Not authenticated");
        
        await ctx.db.patch(user._id, {
            ...(args.name && { name: args.name }),
            ...(args.imageUrl && { imageUrl: args.imageUrl }),
            updatedAt: Date.now(),
        });
        
        return { success: true };
    },
});

// Check if user is admin
export const isAdmin = query({
    args: { sessionToken: v.optional(v.string()) },
    handler: async (ctx, args) => {
        if (!args.sessionToken) return false;
        
        const user = await ctx.db
            .query("users")
            .withIndex("by_session", (q) => q.eq("sessionToken", args.sessionToken))
            .first();
        
        return user?.isAdmin === true;
    },
});

// Set admin status (run from Convex dashboard)
export const setAdmin = mutation({
    args: {
        email: v.string(),
        isAdmin: v.boolean(),
    },
    handler: async (ctx, args) => {
        const user = await ctx.db
            .query("users")
            .withIndex("by_email", (q) => q.eq("email", args.email.toLowerCase()))
            .first();
        
        if (!user) throw new Error("User not found");
        
        await ctx.db.patch(user._id, {
            isAdmin: args.isAdmin,
            updatedAt: Date.now(),
        });
        
        return { success: true };
    },
});

