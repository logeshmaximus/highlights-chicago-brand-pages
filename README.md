# Highlights Chicago brand pages: design preview

Static preview of Highlights Chicago brand pages in Design System v3, the system used on the v3 service and category pages. It is for review only.

- Live preview: https://logeshmaximus.github.io/highlights-chicago-brand-pages/
- Service landing page: https://logeshmaximus.github.io/highlights-chicago-brand-pages/brands/generac/generac-generator-installation/
- Brands hub: https://logeshmaximus.github.io/highlights-chicago-brand-pages/brands/

Every page is `noindex`, `robots.txt` disallows crawling, and canonical URLs point to https://www.highlightschicago.com, so the preview never competes with the real site. Forms do not submit.

## What is in it

| Page | Path | Notes |
|---|---|---|
| Service landing page | `brands/generac/generac-generator-installation/` | The first title on the Brand Pages sheet, "Generac Generator Installation & Repair". It follows the v3 service-page section order. Planned live URL: `/services/generac-generator-installation/chicago`, under the generator installation page. |
| Brands hub | `brands/` | 58 brands, grouped by what they make |
| Brand cluster pages | `brands/<brand>/` | One per brand, in the v3 category-page design, listing that brand's services from the sheet (69 in all). Only the Generac generator page is built; the other cards say "Page in progress". |

## Build

```
node src/build.mjs
python -m http.server 8720 --directory docs
```

- `src/content/`: business facts (`site.mjs`) and the brand list from the sheet (`brands.mjs`)
- `src/pages/`: the Generac page copy (`generac.mjs`) and the hub and cluster templates (`collections.mjs`)
- `src/lib/`: shared markup and section renderers, in the v3 class names
- `src/static/`: the v3 stylesheets (copied unchanged), fonts, images, plus `preview.css` and `site.js` for the preview's interactions
- `docs/`: the built site, served by GitHub Pages

## Open items for review

- **Logos.** Official logos are on file for Tesla, ChargePoint, Eaton, Emporia, Enphase, GE, Leviton, Siemens, SolarEdge, Square D and Wallbox. Every other brand, Generac included, shows its name with "Logo pending" until an official logo is sourced and registered.
- **Generator photos.** No Highlights generator job photos exist yet. The page shows one illustrative standby unit, and panel, meter and service photos from Highlights Chicago's Yelp page, each with its credit.
- **Facts.** Only verified (`live`) facts are used. These stay off the page until they are confirmed: BBB rating, bonding, suburban registration numbers, founder's full name, written scope on every job, salaried crews and diagnose-first.
- **Incentives.** The incentives line cites two IRS pages, both read on 2026-10-26. ComEd's rebate pages could not be read that day, so they are not cited.
- **QC.** The page follows the service-page writing rules: third person, each fact once, no dollar figures outside the permit table, review fragments of 14 words or fewer with links. It has not been through the QC gate yet.
