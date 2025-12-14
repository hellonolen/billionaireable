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

## Admin Setup

### Make Yourself Admin
- [ ] Go to Convex Dashboard: https://dashboard.convex.dev
- [ ] Select billionaireable project
- [ ] Go to **Functions** tab
- [ ] Run `users:setUserAsAdmin` with:
  ```json
  {
    "email": "YOUR_EMAIL@example.com",
    "isAdmin": true
  }
  ```
- [ ] Access admin at: `billionaireable.com/admin`

---

## Completed

- [x] Wire transfer only payment system
- [x] Pricing page with Founder/Scaler/Owner tiers
- [x] Auto-activation when payment verified
- [x] Admin dashboard at `/admin` (protected)
- [x] 12 Pillars with full lesson content
- [x] Billionaireable voice/chat integration
- [x] Progress tracking with Convex
- [x] No refunds policy implemented
- [x] Cancel anytime policy
- [x] Clerk authentication
- [x] Cloudflare Pages deployment

---

*Last updated: December 14, 2025*

