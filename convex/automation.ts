import { v } from "convex/values";
import { mutation, action, internalMutation, internalQuery } from "./_generated/server";
import { api, internal } from "./_generated/api";

/**
 * Identifies users who have "stalled" in their progress.
 * Logic:
 * - Haven't logged in for 3 days
 * - OR haven't completed a directive/module in 48 hours
 */
export const getStalledUsers = internalQuery({
    args: {},
    handler: async (ctx) => {
        const users = await ctx.db.query("users").collect();
        const threeDaysAgo = Date.now() - 3 * 24 * 60 * 60 * 1000;
        const fortyEightHoursAgo = Date.now() - 2 * 24 * 60 * 60 * 1000;

        const stalledUsers = [];

        for (const user of users) {
            // Skip admins
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
                stalledUsers.push({
                    _id: user._id,
                    email: user.email,
                    name: user.name,
                    lastLoginAt: user.lastLoginAt,
                    lastProgressAt: lastProgressTimestamp,
                    currentPillar: user.currentPillar || 1,
                });
            }
        }

        return stalledUsers;
    },
});

/**
 * Action to trigger the check and send emails
 * This will be called by a CRON job
 */
export const runStalledUserCheck = action({
    args: {},
    handler: async (ctx) => {
        const stalledUsers = await ctx.runQuery(internal.automation.getStalledUsers);

        if (stalledUsers.length === 0) return { checked: 0, emailed: 0 };

        let emailedCount = 0;

        for (const user of stalledUsers) {
            // Send the "Gentle Confrontation" email
            // personalize based on their current pillar
            const pillarNames = [
                "Not Started", "Reality Distortion", "Liquidity Allocation", "Holding Company",
                "Time Arbitrage", "Bio-Availability", "Political Capital", "Syndicate",
                "Family Office", "Dynasty Design", "Sovereign Flags", "Asymmetric Bets", "Ascendance"
            ];
            const pillarName = pillarNames[user.currentPillar] || "the program";

            const subject = `Directive: ${user.name || 'Student'} - You've stalled on ${pillarName}`;
            const htmlBody = `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eee;">
                <h2 style="text-transform: uppercase; letter-spacing: 0.1em;">Billionaireable</h2>
                <hr style="border: 0; border-top: 1px solid #000; margin: 20px 0;">
                <p><strong>${user.name || 'Student'},</strong></p>
                <p>You said you wanted to become billionaireable. Billionaires don't disappear.</p>
                <p>It's been over 48 hours since your last breakthrough in <strong>${pillarName}</strong>. This is where most people quit. They find a reason to be "busy." They let the momentum die.</p>
                <p>If you're serious about the future you told me you wanted to create, go back to the dashboard now. Finish the directive.</p>
                <div style="margin-top: 40px;">
                    <a href="https://billionaireable.com/dashboard" style="background: black; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-family: sans-serif; font-weight: bold; text-transform: uppercase; font-size: 12px;">Resume Directive</a>
                </div>
                <p style="margin-top: 40px; font-style: italic; color: #666;">"The first step to mediocrity is a missed commitment."</p>
            </div>
        `;

            try {
                await ctx.runAction(api.admin.sendAdminEmail, {
                    to: [user.email],
                    subject,
                    htmlBody,
                });

                await ctx.runMutation(api.admin.logSentEmail, {
                    recipients: [user.email],
                    subject,
                    type: 'accountability_confrontation',
                    sentBy: 'BILLIONAIREABLE_SYSTEM',
                });
                emailedCount++;
            } catch (error) {
                console.error(`Failed to send confrontation email to ${user.email}:`, error);
            }
        }

        return { checked: stalledUsers.length, emailed: emailedCount };
    },
});

/**
 * Identifies abandoned payment applications (started but not completed within 24 hours)
 */
export const getAbandonedApplications = internalQuery({
    args: {},
    handler: async (ctx) => {
        const twentyFourHoursAgo = Date.now() - 24 * 60 * 60 * 1000;
        const fortyEightHoursAgo = Date.now() - 48 * 60 * 60 * 1000;

        const applications = await ctx.db
            .query("paymentApplications")
            .collect();

        // Get applications that are awaiting payment, created 24-48 hours ago (don't spam)
        const abandoned = applications.filter(app =>
            app.status === "awaiting_payment" &&
            app.createdAt < twentyFourHoursAgo &&
            app.createdAt > fortyEightHoursAgo
        );

        return abandoned;
    },
});

/**
 * Send recovery emails for abandoned applications
 */
export const runAbandonedApplicationRecovery = action({
    args: {},
    handler: async (ctx) => {
        const abandonedApps = await ctx.runQuery(internal.automation.getAbandonedApplications);

        if (abandonedApps.length === 0) return { checked: 0, emailed: 0 };

        let emailedCount = 0;

        for (const app of abandonedApps) {
            const tierDisplay = app.tier.charAt(0).toUpperCase() + app.tier.slice(1);

            const subject = `Your ${tierDisplay} application is waiting`;
            const htmlBody = `
            <div style="font-family: serif; max-width: 600px; margin: 0 auto; padding: 40px; border: 1px solid #eee;">
                <h2 style="text-transform: uppercase; letter-spacing: 0.1em;">Billionaireable</h2>
                <hr style="border: 0; border-top: 1px solid #000; margin: 20px 0;">
                <p><strong>${app.userName || 'Future Billionaireable'},</strong></p>
                <p>You started your application for the <strong>${tierDisplay}</strong> tier yesterday. You haven't completed it.</p>
                <p>Your wire reference is: <strong>${app.wireReference}</strong></p>
                <p>Amount due: <strong>$${app.amount.toLocaleString()}</strong></p>
                <p>The path is waiting. The pillars are waiting. Every day you delay is a day you remain where you are.</p>
                <div style="margin-top: 40px;">
                    <a href="https://billionaireable.com/payment-application-submitted?id=${app._id}" style="background: #FF6B35; color: white; padding: 15px 30px; text-decoration: none; border-radius: 4px; font-family: sans-serif; font-weight: bold; text-transform: uppercase; font-size: 12px;">Complete Application</a>
                </div>
                <p style="margin-top: 40px; font-style: italic; color: #666;">"Hesitation is the enemy of achievement."</p>
            </div>
        `;

            try {
                await ctx.runAction(api.admin.sendAdminEmail, {
                    to: [app.userEmail],
                    subject,
                    htmlBody,
                });

                await ctx.runMutation(api.admin.logSentEmail, {
                    recipients: [app.userEmail],
                    subject,
                    type: 'abandoned_application_recovery',
                    sentBy: 'BILLIONAIREABLE_SYSTEM',
                });
                emailedCount++;
            } catch (error) {
                console.error(`Failed to send recovery email to ${app.userEmail}:`, error);
            }
        }

        return { checked: abandonedApps.length, emailed: emailedCount };
    },
});
