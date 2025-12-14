import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

// Wire transfer verification webhook
// Called when your bank confirms a wire payment received
// 
// Endpoint: https://YOUR_CONVEX_URL/wire-verification
// Method: POST
// Body: { reference: "BILL-XXXXX", amount: 4997, bankReference: "optional" }
//
// How to set up:
// 1. If your bank supports webhooks, point them here
// 2. Or use a service like Plaid, Mercury, or Ramp that can webhook on deposits
// 3. Or manually call this endpoint when you see a wire come in
http.route({
  path: "/wire-verification",
  method: "POST",
  handler: httpAction(async (ctx, request) => {
    const body = await request.json();
    
    const { 
      reference,      // The BILL-XXXXX reference from the wire memo
      amount,         // Amount received
      bankReference,  // Optional: Bank's transaction ID
      apiKey          // Optional: For security
    } = body;

    // Verify API key if configured
    const expectedKey = process.env.WIRE_WEBHOOK_SECRET;
    if (expectedKey && apiKey !== expectedKey) {
      return new Response(JSON.stringify({ error: "Unauthorized" }), { 
        status: 401,
        headers: { "Content-Type": "application/json" }
      });
    }

    if (!reference || !amount) {
      return new Response(JSON.stringify({ error: "Missing reference or amount" }), { 
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }

    // Auto-verify and activate subscription
    const result = await ctx.runMutation(api.payments.confirmWirePayment, {
      wireReference: reference,
      amountReceived: parseFloat(amount),
      bankReference: bankReference || undefined,
    });

    if (result.success) {
      return new Response(JSON.stringify({ 
        success: true, 
        message: "Payment verified. Subscription activated.",
        tier: result.tier,
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

export default http;
