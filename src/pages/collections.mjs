// Collection (cluster) pages: the brands hub and one page per brand, in the v3 category-page design.
import { esc, head, hcHeader, hcFooter, previewBar, scripts } from '../lib/ui.mjs';
import { SITE } from '../content/site.mjs';
import { BRANDS, CATEGORIES, HUB_ORDER, brandCategory } from '../content/brands.mjs';

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
  const cats = [...new Set(b.services.map((s) => s.cat))];
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

function page({ base, title, description, canonical, body }) {
  return `${head({ title, description, canonical, base })}
<body class="inter_c15e96cb-module__0bjUvq__variable">
${previewBar(base)}
<div class="collection-page">
${hcHeader(base)}
<main>
${body}
</main>
${hcFooter(base)}
</div>
${scripts(base)}
</body>
</html>`;
}

export function brandPage(b) {
  const base = '../../';
  const cat = CATEGORIES[brandCategory(b)];
  const n = b.services.length;
  const cards = b.services.map((s) => {
    const c = CATEGORIES[s.cat];
    return card({
      href: s.path ? `${base}${s.path}index.html` : null,
      img: base + c.img, alt: `${s.title} in Chicago`, pos: c.pos,
      area: s.path ? 'Chicago' : 'Page in progress',
      title: s.short, text: s.blurb,
      cta: s.path ? 'View service' : 'Coming to this preview',
    });
  }).join('\n');
  const body = `<section class="collection-hero collection-hero--photo">
<img class="collection-hero-bg" src="${base}${cat.img}" alt="${esc(cat.alt)}" decoding="async" fetchpriority="high"${cat.pos ? ` style="object-position:${cat.pos}"` : ''}>
<div class="collection-wrap"><nav class="hierarchy-crumbs" aria-label="Breadcrumb"><ol><li><a href="${SITE.live}">Home</a></li><li><a href="${base}brands/index.html">Brands</a></li><li aria-current="page">${esc(b.name)}</li></ol></nav></div>
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
<p class="pv-back"><a href="${base}brands/index.html">← All brands</a></p>
</div>
</section>`;
  return page({
    base,
    title: `${b.name} services in Chicago | Highlights Chicago`,
    description: `${brandIntro(b)}`.slice(0, 158),
    canonical: `${SITE.live}/brands/${b.slug}`,
    body,
  });
}

export function hubPage() {
  const base = '../';
  const total = BRANDS.reduce((n, b) => n + b.services.length, 0);
  const groups = HUB_ORDER.map((key) => ({ key, brands: BRANDS.filter((b) => brandCategory(b) === key) })).filter((g) => g.brands.length);
  const groupHtml = groups.map((g) => {
    const c = CATEGORIES[g.key];
    const cards = g.brands.map((b) => {
      const bc = CATEGORIES[brandCategory(b)];
      return card({
        href: `${b.slug}/index.html`, img: base + bc.img, alt: `${b.name} services by Highlights Chicago`, pos: bc.pos,
        area: plural(b.services.length, 'service'), title: b.name,
        text: b.services.map((s) => s.short).join(' · '),
        cta: 'Explore services',
        media: b.logo
          ? `<span class="collection-card-media pv-media-logo"><img src="${base}images/logos/${b.logo}" alt="${esc(b.name)} logo" loading="lazy"></span>`
          : `<span class="collection-card-media collection-card-media-empty pv-media-name"><span>${esc(b.name)}</span></span>`,
      });
    }).join('\n');
    return `<div class="pv-group" id="${g.key}"><div class="pv-group-head"><h3 class="pv-group-title">${esc(c.label)}</h3><span>${plural(g.brands.length, 'brand')}</span></div>
<div class="collection-card-grid">
${cards}
</div></div>`;
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
<p>Brands covering ${total} brand services across Chicago</p>
<a href="${SITE.live}/contact-us">Talk with an electrician <span aria-hidden="true">→</span></a></div>
</div>
</section>
<section class="collection-directory" aria-labelledby="brand-directory-title">
<div class="collection-wrap">
<div class="collection-directory-heading"><div><p class="collection-kicker">Our brands</p>
<h2 id="brand-directory-title">Choose a brand</h2></div>
<p>Brands are grouped by what they make. A brand with several product lines sits under its main one and lists the rest on its page.</p></div>
<nav class="pv-jump" aria-label="Brand groups">${groups.map((g) => `<a href="#${g.key}">${esc(CATEGORIES[g.key].label)}</a>`).join('')}</nav>
${groupHtml}
</div>
</section>`;
  return page({
    base,
    title: 'Electrical brands in Chicago | Highlights Chicago',
    description: `Generators, EV chargers, batteries, panels, fans and smart devices from ${BRANDS.length} brands, wired by Highlights Chicago, a City of Chicago licensed electrical contractor.`,
    canonical: `${SITE.live}/brands`,
    body,
  });
}

export function indexPage() {
  const base = '';
  const brandLinks = BRANDS.map((b) => `<li><a href="brands/${b.slug}/index.html">${esc(b.name)}</a><span>${plural(b.services.length, 'service')}</span></li>`).join('');
  const body = `<section class="collection-hero collection-hero--photo">
<img class="collection-hero-bg" src="images/v3/photos/standby-generator.webp" alt="Air-cooled standby generator on a pad beside a stone-clad house wall" decoding="async" fetchpriority="high" style="object-position:62% 50%">
<div class="collection-wrap collection-hero-grid">
<div><p class="collection-hero-kicker">Design preview · Design System v3</p>
<h1>Brand pages for Highlights Chicago</h1>
<p>A service landing page for the first title on the Brand Pages sheet, and a cluster page for every brand on it, built in the Highlights Chicago design system.</p>
<div class="collection-hero-actions"><a href="brands/generac/generac-generator-installation/index.html">Open the service page</a><a href="brands/index.html">Open the brands hub</a></div></div>
<div class="collection-hero-panel"><span>In this preview</span><strong>${BRANDS.length + 2}</strong><p>Pages: 1 service landing page, 1 brands hub and ${BRANDS.length} brand cluster pages</p>
<a href="brands/index.html">Browse the brands <span aria-hidden="true">→</span></a></div>
</div>
</section>
<section class="collection-directory">
<div class="collection-wrap">
<div class="collection-directory-heading"><div><p class="collection-kicker">Pages</p><h2>What to review</h2></div>
<p>Every page is noindex and its canonical points to highlightschicago.com, so the preview never competes with the live site.</p></div>
<div class="collection-card-grid">
${card({ href: 'brands/generac/generac-generator-installation/index.html', img: 'images/v3/photos/standby-generator.webp', pos: '62% 50%', alt: 'Standby generator', area: 'Service landing page', title: 'Generac Generator Installation & Repair', text: 'The first title on the Brand Pages sheet, built as a full service page in the v3 section order.', cta: 'Open page' })}
${card({ href: 'brands/index.html', img: 'images/v3/photos/tech-panel-work.webp', alt: 'Electrician at a panel', area: 'Brands hub', title: 'All brands', text: `${BRANDS.length} brands from the sheet, grouped by what they make.`, cta: 'Open page' })}
${card({ href: 'brands/generac/index.html', img: 'images/v3/photos/breaker-panel-wall.webp', pos: '5% 50%', alt: 'Breaker panel', area: 'Brand cluster page', title: 'Generac services', text: 'The cluster page pattern, shown for Generac with its three services.', cta: 'Open page' })}
</div>
<div class="pv-index-list"><h3 class="pv-group-title">Every brand cluster page</h3><ul>${brandLinks}</ul></div>
</div>
</section>`;
  return page({ base, title: 'Brand pages preview | Highlights Chicago', description: 'Design preview of Highlights Chicago brand pages.', canonical: SITE.live, body });
}
