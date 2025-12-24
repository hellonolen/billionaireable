# Billionaireable - To Do

## Circle Back Items

### Wire Transfer Configuration
- [x] Refactor bank details to use Environment Variables
- [ ] Set these in Convex Dashboard:
  - `WIRE_BANK_NAME`: Your Bank Name
  - `WIRE_ACCOUNT_NAME`: Billionaireable LLC
  - `WIRE_ROUTING_NUMBER`: XXXXXXXXX
  - `WIRE_ACCOUNT_NUMBER`: XXXXXXXXX
  - `WIRE_SWIFT_CODE`: XXXXXXXXX
  - `WIRE_BANK_ADDRESS`: Your Bank Address

### Wire Payment Webhook Setup
- [ ] Set up automated wire verification (choose one):
  - Mercury bank webhooks
  - Plaid deposit monitoring
  - Manual verification in Admin when wires arrive
- [ ] Webhook endpoint: `POST /wire-verification`
- [ ] Body format: `{ "reference": "BILL-XXXXXXX", "amount": 4997 }`

---

## Setup Required

### 1. Cloudflare Email Routing → Gmail

**Step 1: Enable Email Routing in Cloudflare**
- [ ] Go to Cloudflare Dashboard → Select billionaireable.com
- [ ] Click **Email** → **Email Routing** in left sidebar
- [ ] Click **Enable Email Routing**
- [ ] Cloudflare will add the required MX and TXT records automatically

**Step 2: Add Destination Email (Your Gmail)**
- [ ] In Email Routing, go to **Destination addresses**
- [ ] Click **Add destination address**
- [ ] Enter your Gmail address
- [ ] Check your Gmail for verification email from Cloudflare
- [ ] Click the verification link

**Step 3: Create Routing Rule**
- [ ] Go to **Routing rules** tab
- [ ] Click **Create address**
- [ ] Custom address: `noreply@billionaireable.com` (or any address you want)
- [ ] Action: **Send to an email** → Select your verified Gmail
- [ ] Save

**Step 4: Create Catch-All (Optional but Recommended)**
- [ ] In Routing rules, enable **Catch-all address**
- [ ] Set action to **Send to an email** → Your Gmail
- [ ] This catches any email sent to *@billionaireable.com

**Result:** Emails to noreply@billionaireable.com (or any address) → Your Gmail inbox

---

### 2. Email It Configuration

**Step 1: Create Email It Account**
- [ ] Go to https://emailit.com
- [ ] Sign up / Sign in

**Step 2: Add Your Domain**
- [ ] In Email It dashboard, go to **Domains**
- [ ] Add: `billionaireable.com`
- [ ] Follow instructions to verify SPF and DKIM records in Cloudflare

**Step 3: Get API Key**
- [ ] In Email It dashboard, go to **API Keys**
- [ ] Create a new API key (v2)
- [ ] Copy the key

**Step 4: Add to Convex**
- [ ] Go to Convex Dashboard → billionaireable project
- [ ] Go to **Settings** → **Environment Variables**
- [ ] Add: `EMAIL_IT_API_KEY` = your_api_key

**Step 5: Verify From Email**
- [ ] Ensure the 'from' address matches your verified domain in `convex/auth.ts` and `convex/admin.ts`:
  ```javascript
  from: 'Billionaireable <noreply@billionaireable.com>'
  ```

---

### 3. Make Yourself Admin
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
- [x] Email verification via Email It
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
EMAIL_IT_API_KEY=your_emailit_key
WIRE_WEBHOOK_SECRET=optional_webhook_secret
```

### .env.local (Frontend)
```
VITE_CONVEX_URL=your_convex_url
```

---

*Last updated: December 14, 2025*
