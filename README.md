# Astmay Ecommerce VA Portfolio

Interactive React + Vite portfolio for an ecommerce virtual assistant targeting Etsy and Shopify sellers in the US, UK, and EU.

Built for `va.astmay.space` with a one-page conversion flow:

- Hero with sticky nav, typed headline, CTA motion, and parallax dots
- Etsy / Shopify service toggle cards
- Interactive work samples: Etsy before/after slider, Shopify demo phone frame, Loom embed, and case study accordion
- Process timeline with scroll animation and tooltips
- About section with tool-stack marquee
- Contact section with lazy Calendly embed, floating-label form, WhatsApp CTA, and small success confetti
- Footer links for Privacy / GDPR and Terms

## Tech stack

- React
- Vite
- Plain CSS motion and responsive styling
- No paid UI dependencies

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Build

```bash
npm run build
npm run preview
```

## Environment variables

Copy `.env.example` to `.env.local` and replace the placeholder links:

```bash
VITE_CALENDLY_URL=https://calendly.com/astmay/15min
VITE_SHOPIFY_STORE_URL=https://astmay-demo-candle-co.myshopify.com
VITE_LOOM_EMBED_URL=https://www.loom.com/embed/your-loom-id
```

## Deployment notes for va.astmay.space

1. Deploy the Vite app to Vercel, Netlify, Cloudflare Pages, or another static host.
2. Set the custom domain to `va.astmay.space`.
3. Add the required DNS record at the domain provider.
4. Replace placeholder Calendly, Loom, Shopify, and WhatsApp links before launch.

## Content note

The work samples are intentionally mock samples. They demonstrate ecommerce VA thinking and workflow quality without claiming live client results.
