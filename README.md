# Backyard Bobby's Website

Premium contractor website built with Next.js, TypeScript, TailwindCSS, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** TailwindCSS v4 + shadcn/ui
- **Forms:** React Hook Form + Zod validation
- **Database:** Supabase (leads storage)
- **Analytics:** PostHog
- **Icons:** Lucide React
- **Images:** next/image with Sharp optimization

## Getting Started

### 1. Install Dependencies

```bash
cd site
npm install
```

### 2. Set Up Environment Variables

Copy the example env file and fill in your values:

```bash
cp .env.local.example .env.local
```

### 3. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to the SQL Editor and run the contents of `supabase/schema.sql`
3. Copy your project URL and anon key into `.env.local`

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### 5. Build for Production

```bash
npm run build
npm start
```

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Supabase anonymous key |
| `NEXT_PUBLIC_POSTHOG_KEY` | No | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | No | PostHog host (defaults to us.i.posthog.com) |
| `NEXT_PUBLIC_CALENDLY_URL` | No | Calendly booking link for estimate scheduling |
| `RESEND_API_KEY` | No | Resend API key for email notifications |
| `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` | No | reCAPTCHA site key |
| `RECAPTCHA_SECRET_KEY` | No | reCAPTCHA secret key |

## Project Structure

```
site/
├── public/images/          # Project images and logo
├── src/
│   ├── app/                # Next.js App Router pages
│   │   ├── api/leads/      # Lead submission API route
│   │   ├── services/       # 9 individual service pages
│   │   ├── blog/           # Blog index + [slug] pages
│   │   ├── gallery/        # Filterable project gallery
│   │   ├── about/          # About page
│   │   ├── contact/        # Contact page with lead form
│   │   ├── privacy-policy/
│   │   └── terms/
│   ├── components/
│   │   ├── layout/         # Header, Footer, StickyMobileCTA
│   │   ├── shared/         # Reusable components
│   │   └── ui/             # shadcn/ui components
│   └── lib/                # Utilities, constants, data
├── supabase/schema.sql     # Database schema
└── .env.local.example      # Environment variables template
```

## Email Notification Setup

The lead form API route (`src/app/api/leads/route.ts`) has a placeholder for email notifications. To enable:

1. Sign up for [Resend](https://resend.com)
2. Add your `RESEND_API_KEY` to `.env.local`
3. Uncomment and configure the email sending code in the API route

## Analytics Events

The following events are tracked via PostHog:

- `lead_submitted` — Form submission with service and timeframe
- `cta_click` — CTA button clicks with variant
- `cta_phone_click` — Phone number taps
- `sticky_cta_call` — Sticky mobile bar call taps
- `sticky_cta_quote` — Sticky mobile bar quote taps
- `chatbot_opened` — Chat widget opened
- `chatbot_option_click` — Chat option selected

## Content Map

| Page | Primary CTA | Primary Keyword Theme |
|---|---|---|
| Home | Get a Free Estimate | outdoor construction Anne Arundel County MD |
| Services Index | Get a Free Estimate | contractor services Maryland |
| Accessory Dwelling Units | Get a Free ADU Estimate | ADU builder Anne Arundel County |
| Driveway Installation | Get a Free Driveway Estimate | driveway installation Maryland |
| Decks | Get a Free Deck Estimate | deck builder Anne Arundel County |
| Excavation & Demolition | Get a Free Estimate | excavation contractor Maryland |
| Fencing | Get a Free Fence Estimate | fence installation Anne Arundel County |
| Gravel Pads & Concrete Foundations | Get a Free Estimate | gravel pad shed base Maryland |
| Hardscaping | Get a Free Hardscaping Estimate | hardscaping patio contractor MD |
| Roofing | Get a Free Roofing Estimate | roofing contractor Anne Arundel County |
| Stamped Concrete | Get a Free Estimate | stamped concrete patio Maryland |
| Gallery | Get Your Free Estimate | contractor portfolio Anne Arundel County |
| About | Get Your Free Estimate | local contractor Anne Arundel County |
| Blog | Get Your Free Estimate | outdoor construction tips Maryland |
| Contact | Submit Lead Form | free estimate Anne Arundel County contractor |
