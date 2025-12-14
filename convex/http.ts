import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Stripe webhook endpoint
http.route({
  path: "/stripe-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");
    
    if (!signature) {
      return new Response("Missing stripe-signature header", { status: 400 });
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET not configured");
      return new Response("Webhook secret not configured", { status: 500 });
    }

    // Verify the webhook signature
    // Note: In production, use Stripe's official library for verification
    // For now, we'll parse the event directly (you should add proper verification)
    let event;
    try {
      event = JSON.parse(body);
    } catch (err) {
      console.error("Failed to parse webhook body:", err);
      return new Response("Invalid JSON", { status: 400 });
    }

    // Handle the event
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        const customerId = session.customer;
        const subscriptionId = session.subscription;

        if (userId && customerId && subscriptionId) {
          // Get subscription details from Stripe
          const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
          if (stripeSecretKey) {
            const subResponse = await fetch(
              `https://api.stripe.com/v1/subscriptions/${subscriptionId}`,
              {
                headers: {
                  Authorization: `Bearer ${stripeSecretKey}`,
                },
              }
            );
            
            if (subResponse.ok) {
              const subscription = await subResponse.json();
              const priceId = subscription.items.data[0]?.price?.id;
              
              // Map price ID to plan name
              let plan = "founder";
              if (priceId?.includes("ascendant") || priceId?.includes("scaler")) {
                plan = "scaler";
              } else if (priceId?.includes("principal") || priceId?.includes("owner")) {
                plan = "owner";
              }

              await ctx.runMutation(api.stripe.updateSubscription, {
                userId: userId as any,
                stripeCustomerId: customerId,
                stripeSubscriptionId: subscriptionId,
                status: subscription.status,
                plan,
                currentPeriodEnd: subscription.current_period_end * 1000,
              });
            }
          }
        }
        break;
      }

      case "customer.subscription.updated":
      case "customer.subscription.deleted": {
        const subscription = event.data.object;
        const customerId = subscription.customer;

        // Find user by customer ID and update their subscription
        const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
        if (stripeSecretKey) {
          // Get the subscription from our database by customer ID
          const existingSub = await ctx.runQuery(api.stripe.getSubscriptionByCustomerId, {
            stripeCustomerId: customerId,
          });

          if (existingSub) {
            const priceId = subscription.items.data[0]?.price?.id;
            let plan = "founder";
            if (priceId?.includes("ascendant") || priceId?.includes("scaler")) {
              plan = "scaler";
            } else if (priceId?.includes("principal") || priceId?.includes("owner")) {
              plan = "owner";
            }

            await ctx.runMutation(api.stripe.updateSubscription, {
              userId: existingSub.userId,
              stripeCustomerId: customerId,
              stripeSubscriptionId: subscription.id,
              status: subscription.status,
              plan,
              currentPeriodEnd: subscription.current_period_end * 1000,
            });
          }
        }
        break;
      }

      case "invoice.payment_failed": {
        const invoice = event.data.object;
        const customerId = invoice.customer;
        
        // Mark subscription as past_due
        const existingSub = await ctx.runQuery(api.stripe.getSubscriptionByCustomerId, {
          stripeCustomerId: customerId,
        });

        if (existingSub) {
          await ctx.runMutation(api.stripe.updateSubscriptionStatus, {
            subscriptionId: existingSub._id,
            status: "past_due",
          });
        }
        break;
      }
    }

    return new Response("OK", { status: 200 });
  }),
});

// Wire transfer verification webhook
// This endpoint can be called by:
// 1. Your bank's webhook system (if supported)
// 2. A payment verification service
// 3. An automated bank feed integration
http.route({
  path: "/wire-verification",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    
    // Extract wire payment details
    const { 
      reference,  // The BILL-XXXXX reference
      amount,     // Amount received
      bankReference,  // Bank's transaction reference
      apiKey      // Simple API key for security
    } = body;

    // Verify API key (set this in your Convex environment)
    const expectedKey = process.env.WIRE_WEBHOOK_SECRET;
    if (expectedKey && apiKey !== expectedKey) {
      return new Response("Unauthorized", { status: 401 });
    }

    if (!reference || !amount) {
      return new Response("Missing reference or amount", { status: 400 });
    }

    // Auto-verify and activate
    const result = await ctx.runMutation(api.payments.confirmWirePayment, {
      wireReference: reference,
      amountReceived: parseFloat(amount),
      bankReference: bankReference || undefined,
    });

    if (result.success) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Payment verified and subscription activated",
        applicationId: result.applicationId,
      }), { 
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    } else {
      return new Response(JSON.stringify({ 
        success: false, 
        reason: result.reason,
      }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
  }),
});

// Whop webhook endpoint for subscription verification
http.route({
  path: "/whop-webhook",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    
    // Verify Whop webhook signature (check Whop docs for exact method)
    const signature = request.headers.get("x-whop-signature");
    const webhookSecret = process.env.WHOP_WEBHOOK_SECRET;
    
    // For now, parse the event
    const event = body;

    switch (event.action) {
      case "membership.went_valid":
      case "payment.succeeded": {
        const membership = event.data;
        const email = membership.email || membership.user?.email;
        const productId = membership.product?.id;
        
        if (email) {
          // Find user by email and activate subscription
          const user = await ctx.runQuery(api.users.getUserByEmail, { email });
          
          if (user) {
            // Determine tier from product ID
            let tier = "founder";
            if (productId?.includes("scaler")) tier = "scaler";
            if (productId?.includes("owner")) tier = "owner";

            // Check if there's a pending application for this user
            const applications = await ctx.runQuery(api.payments.getUserApplications, {
              userId: user._id,
            });
            
            const pendingApp = applications.find(
              a => a.status === "pending" || a.status === "awaiting_payment"
            );
            
            if (pendingApp) {
              // Verify through application system
              await ctx.runMutation(api.payments.verifyPaymentAndActivate, {
                applicationId: pendingApp._id,
                paymentReference: membership.id,
                paymentSource: "whop",
              });
            } else {
              // Direct subscription creation
              const existingSub = await ctx.runQuery(api.stripe.getSubscription, {
                userId: user._id,
              });
              
              if (existingSub) {
                await ctx.runMutation(api.stripe.updateSubscription, {
                  userId: user._id,
                  stripeCustomerId: `whop_${membership.user?.id || email}`,
                  stripeSubscriptionId: `whop_${membership.id}`,
                  status: "active",
                  plan: tier,
                  currentPeriodEnd: membership.expires_at 
                    ? new Date(membership.expires_at).getTime() 
                    : Date.now() + 30 * 24 * 60 * 60 * 1000,
                });
              }
            }
          }
        }
        break;
      }

      case "membership.went_invalid":
      case "membership.cancelled": {
        const membership = event.data;
        const email = membership.email || membership.user?.email;
        
        if (email) {
          const user = await ctx.runQuery(api.users.getUserByEmail, { email });
          if (user) {
            const sub = await ctx.runQuery(api.stripe.getSubscription, {
              userId: user._id,
            });
            if (sub) {
              await ctx.runMutation(api.stripe.updateSubscriptionStatus, {
                subscriptionId: sub._id,
                status: "canceled",
              });
            }
          }
        }
        break;
      }
    }

    return new Response("OK", { status: 200 });
  }),
});

export default http;
