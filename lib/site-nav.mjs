// Site header: the navy utility bar, then the navbar from the Paper file "Charming umbrella" (Page 1:
// Navbar · Desktop · Default / Services open / Resources open, Navbar · Phone · Closed / Menu open /
// Services expanded). Nav: Home, Services ▾, Brands, Service Areas, Reviews, Resources ▾ (Blog,
// Learning Center), About Us, then the Contact Us pill. The current section is blue with a green underline.
// Styles: public/assets/css/site-nav.css. Behaviour: public/assets/js/site-nav.js.
import { SITE } from './site.mjs';
import { SERVICES_MENU } from './nav.mjs';

const LIVE = SITE.live;
const esc = (s = '') => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Shown in the utility bar on every live page today (Webflow home and /services), checked 2026-11-13.
export const HOURS = 'Mon–Fri 08:00 AM – 05:00 PM';

const SVG = {
  pin: '<path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z"/><circle cx="12" cy="9.5" r="2.5"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3.5 6.5 12 13l8.5-6.5"/>',
  phone: '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>',
  arrow: '<path d="M5 12h14"/><path d="m13 6 6 6-6 6"/>',
  blog: '<path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"/><path d="M18 14h-8"/><path d="M15 18h-5"/><path d="M10 6h8v4h-8V6Z"/>',
  learn: '<path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/>',
};
const svg = (name, size = 16, width = 1.75) => `<svg class="sn-icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${width}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${SVG[name]}</svg>`;

// The design shows each group's first 8 pages; every service is one click away through "View all services".
const PER_COLUMN = 8;

const RESOURCES = [
  { label: 'Blog', text: 'Tips, news and project stories', href: `${LIVE}/blog`, icon: 'blog' },
  { label: 'Learning Center', text: 'Guides to panels, wiring and codes', href: `${LIVE}/learning-center`, icon: 'learn' },
];

const serviceColumn = (c, limit) => `<div class="sn-col"><p class="sn-col-head">${esc(c.name)}</p><ul class="sn-items">${(limit ? c.items.slice(0, limit) : c.items).map(([label, href]) => `<li><a class="sn-link" href="${esc(href)}">${esc(label)}</a></li>`).join('')}</ul></div>`;

const servicesPanel = () => `<div class="sn-panel sn-panel--services" id="sn-panel-services" hidden>
<div class="sn-cols">${SERVICES_MENU.columns.map((c) => serviceColumn(c, PER_COLUMN)).join('')}</div>
<div class="sn-foot"><a class="sn-all" href="${esc(SERVICES_MENU.href)}">View all services ${svg('arrow', 16, 2.25)}</a><span class="sn-call">Not sure what you need? <a href="tel:${SITE.tel}">${svg('phone', 16, 2)}${SITE.phone}</a></span></div>
</div>`;

const resourceItem = (r) => `<li><a class="sn-res" href="${esc(r.href)}"><span class="sn-res-icon">${svg(r.icon, 20)}</span><span><b>${r.label}</b><small>${r.text}</small></span></a></li>`;
const resourcesPanel = () => `<div class="sn-panel sn-panel--resources" id="sn-panel-resources" hidden><ul>${RESOURCES.map(resourceItem).join('')}</ul></div>`;

/**
 * @param {object} o
 * @param {string} o.logoSrc    logo image URL
 * @param {string} o.brandsHref the brands page URL
 * @param {'home'|'services'|'brands'|null} o.current the section the page belongs to
 */
export function siteHeader({ logoSrc, brandsHref, current = null }) {
  const cur = (key) => (key === current ? ' is-current" aria-current="page' : '');
  const link = (key, label, href) => `<li><a class="sn-top${cur(key)}" href="${esc(href)}">${label}</a></li>`;
  const menu = (key, label, href, panel) => `<li class="sn-has-menu" data-menu="${key}">
<a class="sn-top${cur(key)}" href="${esc(href)}" aria-haspopup="true" aria-expanded="false" aria-controls="sn-panel-${key}">${label}${svg('chevron', 14, 2.25)}</a>
${panel}
</li>`;
  const desktop = [
    link('home', 'Home', `${LIVE}/`),
    menu('services', 'Services', SERVICES_MENU.href, servicesPanel()),
    link('brands', 'Brands', brandsHref),
    link('areas', 'Service Areas', `${LIVE}/service-areas`),
    link('reviews', 'Reviews', `${LIVE}/reviews`),
    menu('resources', 'Resources', `${LIVE}/blog`, resourcesPanel()),
    link('about', 'About Us', `${LIVE}/about-us`),
  ].join('\n');

  // Phone menu: one row per item; Services and Resources open in place.
  const row = (key, label, href) => `<li><a class="sn-row${key === current ? ' is-current' : ''}" href="${esc(href)}"${key === current ? ' aria-current="page"' : ''}>${label}${key === current ? '<i class="sn-dot" aria-hidden="true"></i>' : ''}</a></li>`;
  const expander = (key, label, body) => `<li><button type="button" class="sn-row sn-row--toggle${key === current ? ' is-current' : ''}" aria-expanded="false" aria-controls="sn-sheet-${key}">${label}${svg('chevron', 16, 2.25)}</button><div class="sn-sheet-panel" id="sn-sheet-${key}" hidden>${body}</div></li>`;
  const sheet = [
    row('home', 'Home', `${LIVE}/`),
    expander('services', 'Services', `<div class="sn-sheet-cols">${SERVICES_MENU.columns.map((c) => serviceColumn(c)).join('')}</div><a class="sn-all" href="${esc(SERVICES_MENU.href)}">View all services ${svg('arrow', 16, 2.25)}</a>`),
    row('brands', 'Brands', brandsHref),
    row('areas', 'Service Areas', `${LIVE}/service-areas`),
    row('reviews', 'Reviews', `${LIVE}/reviews`),
    expander('resources', 'Resources', `<ul>${RESOURCES.map(resourceItem).join('')}</ul>`),
    row('about', 'About Us', `${LIVE}/about-us`),
  ].join('\n');

  return `<div class="sn">
<div class="sn-utility" aria-label="Business contact information"><div class="sn-wrap sn-utility-inner">
<div class="sn-utility-group"><a href="${esc(SITE.mapsPlace)}">${svg('pin')}5766 N Lincoln Ave, Suite 1, Chicago, IL 60659, United States</a><span class="sn-sep" aria-hidden="true"></span><span>${svg('clock')}${HOURS}</span></div>
<div class="sn-utility-group"><a href="mailto:${SITE.email}">${svg('mail')}${SITE.email}</a><span class="sn-sep" aria-hidden="true"></span><a class="sn-utility-phone" href="tel:${SITE.tel}">${svg('phone')}${SITE.phone}</a></div>
</div></div>
<header class="sn-nav"><div class="sn-wrap sn-nav-inner">
<a class="sn-logo" href="${LIVE}/" aria-label="Highlights Chicago home"><img src="${esc(logoSrc)}" alt="Highlights Chicago Electrical Services" width="181" height="44"></a>
<nav aria-label="Primary navigation"><ul class="sn-links">
${desktop}
</ul></nav>
<a class="sn-cta" href="${LIVE}/contact-us">Contact Us</a>
<button type="button" class="sn-burger" aria-expanded="false" aria-controls="sn-sheet" aria-label="Open navigation menu"><span></span><span></span><span></span></button>
</div></header>
<div class="sn-sheet" id="sn-sheet" hidden><div class="sn-wrap">
<ul class="sn-sheet-rows">
${sheet}
</ul>
<div class="sn-sheet-actions"><a class="sn-btn sn-btn--primary" href="${LIVE}/contact-us">Contact Us</a><a class="sn-btn sn-btn--secondary" href="tel:${SITE.tel}">${svg('phone', 18, 2)}${SITE.phone}</a></div>
</div></div>
</div>`;
}
