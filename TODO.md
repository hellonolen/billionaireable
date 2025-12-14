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

### 2. Resend Email Configuration

**Step 1: Create Resend Account**
- [ ] Go to https://resend.com
- [ ] Sign up / Sign in

**Step 2: Add Your Domain**
- [ ] In Resend dashboard, go to **Domains**
- [ ] Click **Add Domain**
- [ ] Enter: `billionaireable.com`
- [ ] Resend will give you DNS records to add

**Step 3: Add DNS Records in Cloudflare**
- [ ] Go to Cloudflare → billionaireable.com → **DNS**
- [ ] Add the records Resend provides (usually):
  - SPF record (TXT)
  - DKIM record (TXT) 
  - Optional: DMARC record (TXT)
- [ ] Wait for verification (usually 5-15 minutes)

**Step 4: Get API Key**
- [ ] In Resend, go to **API Keys**
- [ ] Create a new API key
- [ ] Copy the key

**Step 5: Add to Convex**
- [ ] Go to Convex Dashboard → billionaireable project
- [ ] Go to **Settings** → **Environment Variables**
- [ ] Add: `RESEND_API_KEY` = your_api_key

**Step 6: Update From Email (if needed)**
- [ ] In `convex/auth.ts`, update the from address:
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
