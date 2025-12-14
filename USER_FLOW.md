# Billionaireable User Flow

## Current Flow (What Exists Now)

### New User - Pricing Path
1. **Pricing Page** (`/pricing`) - User sees tiers: Founder, Scaler, Owner
2. **Click "Start Now"** - If not logged in, redirects to `/login`
3. **Login/Signup** (`/login`) - Enter email, get magic code, verify
4. **Application Created** - Redirects to `/payment-application-submitted`
5. **Payment Submitted Page** - Shows bank details and reference code
6. **User Sends Wire** - External action
7. **Payment Clears** - Webhook activates subscription
8. **??? PROBLEM: User is NOT sent to onboarding after payment**

### New User - Free Path
1. **Home Page** (`/`) - Click "Take Free Assessment"
2. **Free Assessment** (`/free-assessment`) - 3 questions
3. **Recommendation** - Shows starting pillar, offers free or pricing
4. **If Free**: Goes to `/skills/reality-distortion/1` (Pillar 1 Module 1)
5. **If Pricing**: Goes to `/pricing` (see above flow)

### Current Onboarding (`/onboarding`)
**3 Steps:**
1. **Step 1: The Path** - "This Is The Path" intro, click "Let's Go"
2. **Step 2: Focus Areas** - Pick which pillars matter most (Reality Distortion, Liquidity, Holding Co, Time Arbitrage, Syndicate)
3. **Step 3: Meet Billionaireable** - "I guide. You follow." - Click "Enter Dashboard"
4. **Saves to Convex** - `focusAreas` saved to user record
5. **Redirects to Dashboard** (`/dashboard`)

---

## Problems with Current Flow

1. **Payment → Onboarding disconnect**: After payment clears, user is NOT automatically routed to onboarding
2. **No checkout page**: User goes straight from pricing to application submitted - no actual checkout step where they enter details
3. **Onboarding not enforced**: Nothing forces new paying users to go through onboarding
4. **Flow is fragmented**: User has to figure out where to go next

---

## Correct Flow (What Should Happen)

### Paying User Path
```
Pricing → Login (if needed) → Checkout → Payment → Onboarding → Dashboard
```

1. **Pricing** - See tiers, click "Start Now"
2. **Login** (if not logged in) - Email + magic code
3. **Checkout** - Enter any required info, confirm order, see payment details
4. **Complete Payment** - Send wire
5. **Payment Verified** - Automatic via webhook
6. **Redirect to Onboarding** - Forced, cannot skip
7. **Complete Onboarding** - 3 steps
8. **Dashboard** - Begin the path

### Free User Path
```
Free Assessment → Pillar 1 (no login required)
OR
Free Assessment → Want more → Login → Pricing → (same as above)
```

---

## What Needs to Be Built

### 1. Checkout Page (`/checkout`)
- Shows selected tier and price
- Confirms billing cycle (monthly/annual)
- Shows payment instructions
- Unique reference code
- "I've Sent My Payment" button → goes to waiting/confirmation

### 2. Payment Webhook → Onboarding Redirect
- When payment verified, set `paymentComplete: true` on user
- Next time user loads any page, force redirect to `/onboarding` if not completed

### 3. Onboarding Enforcement
- Check on every protected page load:
  - Has active subscription? 
  - Has completed onboarding?
  - If subscription but no onboarding → force to `/onboarding`

### 4. Post-Onboarding
- After onboarding complete, redirect to `/dashboard`
- Set `onboardingComplete: true` on user
- User can now access all content their tier allows

---

## Page Protection Summary

### Public (No Login)
- `/` (Home)
- `/pricing`
- `/waitlist`
- `/free-assessment`
- `/login`, `/signup`
- `/privacy`, `/terms`, `/disclaimer`
- `/skills/reality-distortion/*` (Pillar 1 free preview)

### Protected (Login Required)
- `/dashboard`
- `/skills/:skillId` (except reality-distortion)
- `/skills/:skillId/:moduleId` (except reality-distortion)
- `/profile`
- `/onboarding`
- `/checkout`
- `/payment-success`

### Admin Only
- `/admin`

