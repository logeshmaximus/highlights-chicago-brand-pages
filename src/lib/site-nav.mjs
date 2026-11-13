// Site header: navy utility bar, white main nav with the Services and Brands menus, and the phone sheet.
// One component for every page, built to the Design System v3 navigation spec (Paper, "09 · Navigation"):
// links Inter 15/500 uppercase +0.04em, phone in Space Grotesk 600, a blue pill CTA, navy menu panels
// with radius 4 and no shadow, a green bar sliding in on hover, and a white sheet with 56px rows on phones.
// Styles: src/static/assets/css/site-nav.css. Behaviour: src/static/assets/js/site-nav.js.
import { SITE } from '../content/site.mjs';
import { SERVICES_MENU, brandsMenu } from '../content/nav.mjs';

const LIVE = SITE.live;
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Shown in the utility bar on every live page today (Webflow home and /services), checked 2026-11-13.
export const HOURS = 'Mon–Fri 08:00 AM – 05:00 PM';

const SVG = {
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
  phone: '<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z"/>',
  chevron: '<path d="M6 9l6 6 6-6"/>',
};
const svg = (name, size = 16) => `<svg class="sn-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${SVG[name]}</svg>`;

// A live page is a link; a planned page is plain text with a dashed ring, so nobody clicks through to a 404.
const item = ([label, href, live]) => live
  ? `<li data-live="1"><a class="sn-link" href="${esc(href)}"><span>${esc(label)}</span></a></li>`
  : `<li data-live="0"><span class="sn-link sn-link--planned" title="Planned page, not published yet"><span>${esc(label)}</span><i aria-hidden="true"></i></span></li>`;

const column = (c) => `<div class="sn-col"><p class="sn-col-head">${esc(c.name)}</p><ul class="sn-items">${c.items.map(item).join('')}</ul><button type="button" class="sn-more" hidden></button></div>`;

function panel(menu) {
  return `<div class="sn-panel" id="sn-panel-${menu.key}" hidden>
<div class="sn-cols">${menu.columns.map(column).join('')}</div>
<div class="sn-foot"><a class="sn-all" href="${esc(menu.href)}">${esc(menu.allLabel)} →</a><span class="sn-call">Not sure what you need? ${svg('phone', 18)}<a href="tel:${SITE.tel}">${SITE.phone}</a></span></div>
</div>`;
}

function menuItem(menu, current) {
  const isCurrent = current === menu.key;
  return `<li class="sn-has-menu" data-menu="${menu.key}">
<a class="sn-top${isCurrent ? ' is-current' : ''}" href="${esc(menu.href)}"${isCurrent ? ' aria-current="page"' : ''}>${menu.label}</a><button type="button" class="sn-chevron" aria-expanded="false" aria-controls="sn-panel-${menu.key}" aria-label="Show ${menu.label.toLowerCase()} menu">${svg('chevron', 14)}</button>
${panel(menu)}
</li>`;
}

// Phone and tablet: each menu expands in place, then its groups expand in place.
function sheetMenu(menu) {
  return `<li><button type="button" class="sn-sheet-row" aria-expanded="false" aria-controls="sn-sheet-${menu.key}">${menu.label}<span class="sn-pm" aria-hidden="true"></span></button>
<div class="sn-sheet-sub" id="sn-sheet-${menu.key}" hidden>
${menu.columns.map((c, i) => `<button type="button" class="sn-sheet-cat" aria-expanded="false" aria-controls="sn-sheet-${menu.key}-${i}">${esc(c.name)}<span class="sn-pm" aria-hidden="true"></span></button><ul class="sn-items" id="sn-sheet-${menu.key}-${i}" hidden>${c.items.map(item).join('')}</ul>`).join('\n')}
<a class="sn-sheet-all" href="${esc(menu.href)}">${esc(menu.allLabel)} →</a>
</div></li>`;
}

/**
 * @param {object} o
 * @param {string} o.logoSrc   logo image URL
 * @param {string} o.brandsHref the brands hub URL
 * @param {'services'|'brands'|null} o.current the section the page belongs to
 */
export function siteHeader({ logoSrc, brandsHref, current = null }) {
  const brands = brandsMenu(brandsHref);
  const plain = [
    ['Home', `${LIVE}/`],
    ['About Us', `${LIVE}/about-us`],
    SERVICES_MENU,
    brands,
    ['Service Areas', `${LIVE}/service-areas`],
    ['Blog', `${LIVE}/blog`],
    ['Learning Center', `${LIVE}/learning-center`],
  ];
  const desktop = plain.map((l) => Array.isArray(l) ? `<li><a class="sn-top" href="${esc(l[1])}">${l[0]}</a></li>` : menuItem(l, current)).join('\n');
  const sheet = plain.map((l) => Array.isArray(l) ? `<li><a class="sn-sheet-row" href="${esc(l[1])}">${l[0]}</a></li>` : sheetMenu(l)).join('\n');
  return `<div class="sn" data-show-planned="1">
<div class="sn-utility" aria-label="Business contact information"><div class="sn-wrap sn-utility-inner">
<div class="sn-utility-group"><a href="${esc(SITE.mapsPlace)}">${svg('pin')}${SITE.address}, United States</a><span class="sn-sep" aria-hidden="true"></span><span>${svg('clock')}${HOURS}</span></div>
<div class="sn-utility-group"><a href="mailto:${SITE.email}">${svg('mail')}${SITE.email}</a><span class="sn-sep" aria-hidden="true"></span><a class="sn-utility-phone" href="tel:${SITE.tel}">${svg('phone')}${SITE.phoneShort}</a></div>
</div></div>
<header class="sn-nav"><div class="sn-wrap sn-nav-inner">
<a class="sn-logo" href="${LIVE}/" aria-label="Highlights Chicago home"><img src="${esc(logoSrc)}" alt="Highlights Chicago Electrical Services" width="181" height="44"></a>
<nav aria-label="Primary navigation"><ul class="sn-links">
${desktop}
</ul></nav>
<div class="sn-actions"><a class="sn-phone" href="tel:${SITE.tel}" aria-label="Call ${SITE.phone}">${svg('phone', 18)}<span>${SITE.phone}</span></a><a class="sn-cta" href="${LIVE}/contact-us">Contact us</a>
<button type="button" class="sn-burger" aria-expanded="false" aria-controls="sn-sheet" aria-label="Open navigation menu"><span></span><span></span><span></span></button></div>
</div></header>
<div class="sn-sheet" id="sn-sheet" hidden><div class="sn-wrap">
<ul class="sn-sheet-rows">
${sheet}
</ul>
<div class="sn-sheet-actions"><a class="sn-btn sn-btn--primary" href="${LIVE}/contact-us">Contact us</a><a class="sn-btn sn-btn--secondary" href="tel:${SITE.tel}">${svg('phone', 18)}Call ${SITE.phone}</a><p class="sn-sheet-addr">${SITE.address}</p></div>
</div></div>
</div>`;
}

// Counts for the preview bar.
export function menuCounts(brandsHref) {
  const count = (m) => {
    const all = m.columns.flatMap((c) => c.items);
    return { live: all.filter((i) => i[2]).length, planned: all.filter((i) => !i[2]).length };
  };
  return { services: count(SERVICES_MENU), brands: count(brandsMenu(brandsHref)) };
}
