# Billionaireable - To Do

## Circle Back Items

### Wire Transfer Configuration
- [ ] Update bank details in `convex/payments.ts`:
  ```javascript
  const WIRE_DETAILS = {
      bankName: "Your Bank Name",
      accountName: "Billionaireable LLC",
      routingNumber: "XXXXXXXXX",
      accountNumber: "XXXXXXXXX",
      swiftCode: "XXXXXXXXX",
  };
  ```

### Wire Payment Webhook Setup
- [ ] Set up automated wire verification (choose one):
  - Mercury bank webhooks
  - Plaid deposit monitoring
  - Manual verification in Admin when wires arrive
- [ ] Webhook endpoint: `POST /wire-verification`
- [ ] Body format: `{ "reference": "BILL-XXXXXXX", "amount": 4997 }`

---

## Setup Required

### Resend Email Configuration
- [ ] Go to https://resend.com and create an account
- [ ] Add your domain and verify it
- [ ] Get your API key
- [ ] Add `RESEND_API_KEY` to Convex environment variables
- [ ] Update the "from" email in `convex/auth.ts` to your domain

### Make Yourself Admin
- [ ] Go to Convex Dashboard: https://dashboard.convex.dev
- [ ] Select billionaireable project
- [ ] Go to **Functions** tab
- [ ] Run `auth:setAdmin` with:
  ```json
  {
    "email": "YOUR_EMAIL@example.com",
    "isAdmin": true
  }
  ```
- [ ] Access admin at: `billionaireable.com/admin`

---

## Completed

- [x] Replace Clerk with Convex Magic Code auth
- [x] Email verification via Resend
- [x] Wire transfer only payment system
- [x] Pricing page with Founder/Scaler/Owner tiers
- [x] Auto-activation when payment verified
- [x] Admin dashboard at `/admin` (protected)
- [x] 12 Pillars with full lesson content
- [x] Billionaireable voice/chat integration
- [x] Progress tracking with Convex
- [x] No refunds policy implemented
- [x] Cancel anytime policy
- [x] Cloudflare Pages deployment

---

## Environment Variables

### Convex Dashboard (Backend)
```
GEMINI_API_KEY=your_gemini_key
RESEND_API_KEY=your_resend_key
WIRE_WEBHOOK_SECRET=optional_webhook_secret
```

### .env.local (Frontend)
```
VITE_CONVEX_URL=your_convex_url
```

---

*Last updated: December 14, 2025*
