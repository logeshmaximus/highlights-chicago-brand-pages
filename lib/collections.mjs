// Collection pages, in the v3 category-page design: the brands page (/brands) and one page per brand
// (/brands/<brand>). Each returns the HTML inside <main>; the Next.js pages wrap it in the site chrome.
// `brands` comes from buildBrands() with the pages published in Sanity, so written pages sort first.
import { esc } from './ui.mjs';
import { SITE } from './site.mjs';
import { CATEGORIES, HUB_ORDER, brandCategory, brandPath, BRANDS_PATH } from './brands.mjs';

// Public files (images, logos) are served under the basePath.
const ASSETS = `${BRANDS_PATH}/`;

const PHRASE = {
  generator: 'generator installation and repair', transfer: 'transfer switches', battery: 'home battery and backup wiring',
  solar: 'solar tie-ins and repairs', ev: 'EV charger installation', doorbell: 'video doorbell and floodlight camera wiring',
  panel: 'panel replacement and upgrades', surge: 'whole-house surge protection', ceilingfan: 'ceiling fan installation and repair',
  bathfan: 'bathroom exhaust fans', smoke: 'smoke and CO alarms', switch: 'smart switches and dimmers',
  recessed: 'recessed lighting', disposal: 'garbage disposal wiring',
};
const list = (a) => a.length < 3 ? a.join(' and ') : `${a.slice(0, -1).join(', ')} and ${a.at(-1)}`;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

function brandIntro(b) {
  const cats = [...new Set(b.services.filter((s) => s.live).map((s) => s.cat))];
  if (b.removed) return `${b.name} panel replacement in Chicago homes and buildings. Highlights Chicago takes ${b.name} panels out and puts in a new permitted panel; it does not install this make.`;
  return `${b.name} ${list(cats.map((c) => PHRASE[c]))}, by a City of Chicago licensed electrical contractor. Choose a service to see the work, the permit, reviews and the Chicago areas covered.`;
}

const logoChip = (b, base) => b.logo
  ? `<div class="pv-logo-chip${b.logoAspect < 2.6 ? ' pv-logo-chip--tall' : ''}"><img src="${base}images/logos/${b.logo}" alt="${esc(b.name)} logo"></div>`
  : `<div class="pv-logo-chip pv-logo-chip--name" title="Official logo not on file yet"><b>${esc(b.name)}</b><small>Logo pending</small></div>`;

function card({ href, img, alt, area, title, text, cta, pos, badgeHtml = '', media = '' }) {
  const tag = href ? 'a' : 'div';
  const attrs = href ? ` href="${href}"` : ' aria-disabled="true"';
  return `<${tag} class="collection-card${href ? '' : ' pv-card--soon'}"${attrs}>
${media || `<span class="collection-card-media"><img class="collection-card-image" src="${img}" alt="${esc(alt)}" loading="lazy" decoding="async"${pos ? ` style="object-position:${pos}"` : ''}>${badgeHtml}</span>`}
<span class="collection-card-content"><span class="collection-card-area">${esc(area)}</span><strong>${esc(title)}</strong>
<span class="collection-card-description">${esc(text)}</span>
<span class="collection-card-volume collection-card-explore">${cta}${href ? '<span class="collection-card-arrow" aria-hidden="true">→</span>' : ''}</span></span>
</${tag}>`;
}

export function brandIntroText(b) { return brandIntro(b); }

export function brandBody(b) {
  const base = ASSETS;
  const cat = CATEGORIES[brandCategory(b)];
  // Only the brand's published pages are listed; an unpublished one appears once it is published.
  const published = b.services.filter((s) => s.live);
  const n = published.length;
  const cards = published.map((s) => {
    const c = CATEGORIES[s.cat];
    return card({
      href: s.live ? s.href : `${SITE.live}/contact-us`,
      img: base + c.img, alt: `${s.title} in Chicago`, pos: c.pos,
      area: 'Chicago',
      title: s.short, text: s.blurb,
      cta: s.live ? 'View service' : 'Get a quote',
    });
  }).join('\n');
  const body = `<section class="collection-hero collection-hero--photo">
<img class="collection-hero-bg" src="${base}${cat.img}" alt="${esc(cat.alt)}" decoding="async" fetchpriority="high"${cat.pos ? ` style="object-position:${cat.pos}"` : ''}>
<div class="collection-wrap"><nav class="hierarchy-crumbs" aria-label="Breadcrumb"><ol><li><a href="${SITE.live}">Home</a></li><li><a href="${BRANDS_PATH}">Brands</a></li><li aria-current="page">${esc(b.name)}</li></ol></nav></div>
<div class="collection-wrap collection-hero-grid">
<div><p class="collection-hero-kicker">${b.removed ? 'Removed, not installed' : 'Licensed Chicago electricians'}</p>
<h1>${esc(b.name)} services in Chicago</h1>
<p>${esc(brandIntro(b))}</p></div>
<div class="collection-hero-panel">${logoChip(b, base)}<span>${esc(b.name)}</span><strong>${n}</strong>
<p>${esc(b.name)} ${n === 1 ? 'service' : 'services'} across Chicago</p>
<a href="${SITE.live}/contact-us">Talk with an electrician <span aria-hidden="true">→</span></a></div>
</div>
</section>
<section class="collection-directory" aria-labelledby="brand-services-title">
<div class="collection-wrap">
<div class="collection-directory-heading"><div><p class="collection-kicker">${esc(b.name)} services</p>
<h2 id="brand-services-title">Choose a ${esc(b.name)} service</h2></div>
<p>Each service page covers the work, what drives the cost, the City permit, reviews and the Chicago areas covered.</p></div>
<div class="collection-card-grid">
${cards}
</div>
<p class="pv-back"><a href="${BRANDS_PATH}">← All brands</a></p>
</div>
</section>`;
  return body;
}

export function hubBody(ALL_BRANDS) {
  const base = ASSETS;
  // Only brands with at least one page published in Sanity are listed. A brand appears here by itself
  // as soon as its first page is published (the Sanity webhook refreshes this page).
  const BRANDS = ALL_BRANDS.filter((b) => b.liveCount > 0);
  const total = BRANDS.reduce((n, b) => n + b.liveCount, 0);
  // Equipment filters: kinds with written brand pages first, then the hub's usual order.
  // Equipment chips: only kinds with a published page.
  const filters = HUB_ORDER.filter((k) => BRANDS.some((b) => b.services.some((s) => s.live && s.cat === k)));
  // BRANDS is in live-first order: brands whose pages are all written, then brands with some, then the rest.
  const cards = BRANDS.map((b) => {
    const bc = CATEGORIES[brandCategory(b)];
    const live = b.services.filter((s) => s.live);
    const cats = [...new Set(live.map((s) => s.cat))].join(' ');
    return card({
      href: brandPath(b.slug), img: base + bc.img, alt: `${b.name} services by Highlights Chicago`, pos: bc.pos,
      area: plural(live.length, 'service'), title: b.name,
      text: live.map((s) => s.short).join(' · '),
      cta: 'Explore services',
      media: b.logo
        ? `<span class="collection-card-media pv-media-logo"><img src="${base}images/logos/${b.logo}" alt="${esc(b.name)} logo" loading="lazy"></span>`
        : `<span class="collection-card-media collection-card-media-empty pv-media-name"><span>${esc(b.name)}</span></span>`,
    }).replace('<a class="collection-card', `<a data-cats="${cats}" class="collection-card`);
  }).join('\n');
  const body = `<section class="collection-hero collection-hero--photo">
<img class="collection-hero-bg" src="${base}images/v3/photos/tech-panel-work.webp" alt="Electrician in a Highlights Chicago hard hat working on breakers in an open panel" decoding="async" fetchpriority="high">
<div class="collection-wrap"><nav class="hierarchy-crumbs" aria-label="Breadcrumb"><ol><li><a href="${SITE.live}">Home</a></li><li aria-current="page">Brands</li></ol></nav></div>
<div class="collection-wrap collection-hero-grid">
<div><p class="collection-hero-kicker">Licensed Chicago electricians</p>
<h1>The brands we wire across Chicago</h1>
<p>Generators, chargers, batteries, panels, fans and smart devices, grouped by the brand on the label. Choose a brand to see every service Highlights Chicago lists for it.</p>
<div class="collection-hero-actions"><a href="#brand-directory-title">Explore brands</a><a href="${SITE.live}/contact-us">Contact us</a></div></div>
<div class="collection-hero-panel" aria-label="${BRANDS.length} brands"><span>Brands</span><strong>${BRANDS.length}</strong>
<p>${BRANDS.length === 1 ? 'Brand' : 'Brands'} with ${total} service ${total === 1 ? 'page' : 'pages'} across Chicago</p>
<a href="${SITE.live}/contact-us">Talk with an electrician <span aria-hidden="true">→</span></a></div>
</div>
</section>
<section class="collection-directory" aria-labelledby="brand-directory-title">
<div class="collection-wrap">
<div class="collection-directory-heading"><div><p class="collection-kicker">Our brands</p>
<h2 id="brand-directory-title">Choose a brand</h2></div>
<p>Pick a kind of equipment to narrow the list. A brand with several product lines lists all of them on its page.</p></div>
<div class="pv-jump pv-filter" role="group" aria-label="Filter brands by equipment"><button type="button" aria-pressed="true" data-cat="">All brands</button>${filters.map((k) => `<button type="button" aria-pressed="false" data-cat="${k}">${esc(CATEGORIES[k].label)}</button>`).join('')}</div>
<div class="collection-card-grid" id="brand-grid">
${cards}
</div>
</div>
</section>`;
  return body;
}
