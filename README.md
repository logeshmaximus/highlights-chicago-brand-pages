# Highlights Chicago brand pages

Next.js app for **www.highlightschicago.com/brands**, reading the **Brand Service Pages** Sanity project (`x6yq02oi`).

| Address | Page | Content from |
|---|---|---|
| `/brands` | All brands; brands with published pages first | `lib/brands.mjs` (the Brand Pages sheet) + published pages |
| `/brands/<brand>` | One brand's services; published pages first, the rest link to the contact page | same |
| `/brands/<brand>/<page>` | The brand service landing page | the Sanity document (type `brandServiceLandingPageTemplate`) |
| `/brands/studio` | The Studio, with a **Presentation** tab that previews drafts | Sanity |

The bare Vercel address redirects to `/brands`, and `/studio` to `/brands/studio`.

## Publishing flow

1. Write or edit a page in the Studio (`/brands/studio` or hc-brand-service-pages.sanity.studio). Open **Presentation** to see the draft as a real page.
2. **Publish.** The Sanity webhook calls `/api/revalidate` (`vercel.json` rewrites it to `/brands/api/revalidate`); every brand listing and the page refresh.
3. Check it on the Vercel address, then go live with the Cloudflare Worker route `www.highlightschicago.com/brands*` → this Vercel app (same path; the app's `basePath` is `/brands`).

Until `NEXT_SITE_URL` is the live domain, every page is `noindex` (meta tag and `X-Robots-Tag` header).

## Environment

See `.env.example` (no `NEXT_PUBLIC_` names). Keep real values in `.env.local` (ignored by git) and in Vercel.

## Code

- `components/landing/BrandServicePage.tsx`: the landing page, section by section, following the Paper design "HC · Generac generator brand page". An empty field or section is left out.
- `public/assets/css/brand-page.css`: its styles (Design System v3 tokens; phones from 1023px).
- `lib/site-nav.mjs`, `lib/nav.mjs`: the site header (live nav + Brands; Services menu shows live pages only).
- `lib/brands.mjs`, `lib/collections.mjs`: brand data from the sheet and the `/brands` and `/brands/<brand>` pages.
- `sanity/`: client, queries, schema (copied from the Brand Service Pages studio; keep both in step), `sanity.config.ts` for the Studio.

```
npm install
npm run dev      # http://localhost:3000/brands
npm run build
```
