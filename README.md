# Highlights Chicago brand pages: design preview

Static preview of Highlights Chicago brand pages in Design System v3, the system used on the v3 service and category pages. It is for review only.

- Live preview: https://logeshmaximus.github.io/highlights-chicago-brand-pages/
- Service landing page: https://logeshmaximus.github.io/highlights-chicago-brand-pages/brands/generac/generac-generator-installation/
- Brands hub: https://logeshmaximus.github.io/highlights-chicago-brand-pages/brands/

Every page is `noindex`, `robots.txt` disallows crawling, and canonical URLs point to https://www.highlightschicago.com, so the preview never competes with the real site. Forms do not submit.

## What is in it

| Page | Path | Notes |
|---|---|---|
| Service landing page | `brands/generac/generac-generator-installation/` | The first title on the Brand Pages sheet, "Generac Generator Installation & Repair", in the form-first brand-page layout: quote form in the hero, models and services sections, a variable price section, and swipe rows instead of stacked cards. Planned live URL: `/services/generac-generator-installation/chicago`, under the generator installation page. |
| First version | `brands/generac/generac-generator-installation-v1/` | The same page in the long v3 service-page order, kept for comparison. |
| Brands hub | `brands/` | 58 brands, grouped by what they make |
| Brand cluster pages | `brands/<brand>/` | One per brand, in the v3 category-page design, listing that brand's services from the sheet (69 in all). Only the Generac generator page is built; the other cards say "Page in progress". |

## Build

```
node src/build.mjs
python -m http.server 8720 --directory docs
```

- `src/content/`: business facts (`site.mjs`), the brand list from the sheet (`brands.mjs`) and the variable prices (`pricing.mjs`, empty until the pricing artifact arrives)
- `src/pages/`: the Generac page (`generac-v2.mjs`, reusing the verified copy in `generac.mjs`, which also renders the first version) and the hub and cluster templates (`collections.mjs`)
- `src/lib/`: shared markup and section renderers, in the v3 class names (`sections-v2.mjs` and `brand-v2.css` hold the brand-page sections)
- `src/static/`: the v3 stylesheets (copied unchanged), fonts, images, plus `preview.css` and `site.js` for the preview's interactions
- `docs/`: the built site, served by GitHub Pages

## Open items for review

- **Prices and permits.** Figures come from the permit and cost sheet (`Highlights Chicago — Chicago Permit & Building Data.xlsx`, Aug 2024 to Aug 2026): medians of reported construction value on City permits, not quotes. The generator median is $15,000 on 161 permits; set it per page in `src/content/pricing.mjs`. Rows the sheet does not cover still show "Price pending".
- **Scroll depth.** At 1440px the page is about 13,700px tall, down from 28,400px in the first version. On a 375px phone it is about 9,400px, down from 51,100px.

- **Logos.** All 58 brands show their own mark (`docs/images/logos/`, sources in `SOURCES.md` there). Most come from the brand's site or Wikipedia / Wikimedia Commons. Broan, BRK, Challenger, Cutler-Hammer, Hampton Bay, Harbor Breeze, Murray, Pushmatic and Zinsco come from a retailer, distributor or dealer copy or a label photo, so verify them against the owners' brand files before production.
- **Generator photos.** No Highlights generator job photos exist yet. The page shows one illustrative standby unit, and panel, meter and service photos from Highlights Chicago's Yelp page, each with its credit.
- **Facts.** Only verified (`live`) facts are used. These stay off the page until they are confirmed: BBB rating, bonding, suburban registration numbers, founder's full name, written scope on every job, salaried crews and diagnose-first.
- **Incentives.** The incentives line cites two IRS pages, both read on 2026-10-26. ComEd's rebate pages could not be read that day, so they are not cited.
- **QC.** The page follows the service-page writing rules: third person, each fact once, no dollar figures outside the permit table, review fragments of 14 words or fewer with links. It has not been through the QC gate yet.
