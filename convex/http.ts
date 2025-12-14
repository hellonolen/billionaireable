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

export default http;
