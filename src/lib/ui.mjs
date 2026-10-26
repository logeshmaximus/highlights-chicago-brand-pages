// Shared markup: icons, escaping, page head, site chrome (utility bar, nav, footer).
// Class names follow the Highlights Chicago Design System v3 build so the copied CSS applies unchanged.
import { PATHS, RAW } from './icon-paths.mjs';
import { SITE } from '../content/site.mjs';

export const esc = (s = '') => String(s)
  .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inline text may carry links written as [anchor](href). Everything else is escaped.
export const rich = (s = '', base = '') => esc(s).replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, t, h) => {
  const href = h.replace(/&amp;/g, '&');
  const ext = /^https?:/.test(href);
  const url = ext || href.startsWith('#') || href.startsWith('tel:') ? href : base + href;
  return `<a href="${esc(url)}"${ext ? ' target="_blank" rel="noopener noreferrer"' : ''}>${t}</a>`;
});

export function icon(name, size = 18, cls = 'ds-icon') {
  const p = PATHS[name];
  if (!p) throw new Error(`Unknown icon: ${name}`);
  return `<svg class="${cls}" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${p}</svg>`;
}
export const hcIcon = (name, size = 16) => `<svg class="hc-icon" width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true">${PATHS[name]}</svg>`;
export const badge = (name, size = 48, tone = 'blue', iconSize) =>
  `<span class="ds-badge ds-badge--${tone}" style="--badge:${size}px">${icon(name, iconSize || Math.round(size * 0.42))}</span>`;
export const google = (size = 22) => `<svg class="ds-google" width="${size}" height="${size}" viewBox="0 0 48 48" role="img" aria-label="Google">${RAW.google}</svg>`;
export const yelp = (size = 22) => `<svg class="ds-google" width="${size}" height="${size}" viewBox="0 0 48 48" role="img" aria-label="Yelp">${RAW.yelpBurst}</svg>`;
const starSvg = (size, white) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24">${white ? RAW.starWhite : RAW.star}</svg>`;
export const stars = (size = 18) => `<span class="ds-stars" aria-hidden="true">${starSvg(size).repeat(5)}</span>`;
export const miniMap = () => `<svg class="ds-mini-map" viewBox="0 0 380 240" aria-hidden="true" preserveAspectRatio="xMidYMid slice">${RAW.miniMap}</svg>`;
const xLogo = (size = 15) => `<svg width="${size}" height="${size}" viewBox="0 0 24 24" aria-hidden="true" fill="currentColor">${RAW.xLogo}</svg>`;

// Google and Yelp side by side, never blended (rating rule RATING-01).
export function ratings(tone = 'dark') {
  const g = SITE.google, y = SITE.yelp;
  return `<div class="hc-ratings hc-ratings--${tone}">`
    + `<a class="hc-rating" href="${esc(g.url)}" target="_blank" rel="noopener noreferrer" aria-label="Rated ${g.rating} out of 5 from ${g.count} Google reviews. Read the reviews on Google">`
    + `<svg class="hc-rating-mark" width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">${RAW.google}</svg>`
    + `<b class="hc-rating-num hc-rating-num--google">${g.rating}</b><span class="hc-stars-google" aria-hidden="true">${starSvg(16).repeat(5)}</span>`
    + `<span class="hc-rating-count">${g.count} Google reviews</span></a>`
    + `<span class="hc-rating-sep" aria-hidden="true"></span>`
    + `<a class="hc-rating" href="${esc(y.url)}" target="_blank" rel="noopener noreferrer" aria-label="Rated ${y.rating} out of 5 from ${y.count} Yelp reviews. Read the reviews on Yelp">`
    + `<svg class="hc-rating-mark" width="34" height="34" viewBox="0 0 48 48" aria-hidden="true">${RAW.yelpBurst}</svg>`
    + `<b class="hc-rating-num">${y.rating}</b><span class="hc-stars-yelp" aria-hidden="true">${`<span>${starSvg(16, true)}</span>`.repeat(5)}</span>`
    + `<span class="hc-rating-count">${y.count} Yelp reviews</span></a></div>`;
}

export function head({ title, description, canonical, base, extraHead = '' }) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
<meta name="robots" content="noindex, nofollow">
<link rel="canonical" href="${esc(canonical)}">
<link rel="icon" href="${base}icons/highlights-chicago-32.png" sizes="32x32">
<link rel="apple-touch-icon" href="${base}icons/highlights-chicago-180.png">
<link rel="stylesheet" href="${base}assets/css/inter.css">
<link rel="stylesheet" href="${base}assets/css/ds.css">
<link rel="stylesheet" href="${base}assets/css/site.css">
<link rel="stylesheet" href="${base}assets/css/preview.css">
${extraHead}</head>`;
}

const NAV = (base, current) => [
  ['Home', SITE.live + '/'],
  ['About us', SITE.live + '/about-us'],
  ['Services', SITE.live + '/services'],
  ['Brands', base + 'brands/index.html', 'brands'],
  ['Service Areas', SITE.live + '/service-areas'],
  ['Blog', SITE.live + '/blog'],
  ['Learning Center', SITE.live + '/learning-center'],
].map(([n, u, key]) => ({ n, u, current: key && key === current }));

export function previewBar(base) {
  return `<div class="pv-bar" role="note"><div class="pv-bar-inner"><b>Design preview</b><span>Not the live site. Forms do not submit, and every page is noindex.</span><a href="${base}index.html">All preview pages</a></div></div>`;
}

// Service-page chrome (ds-*), as on the v3 service pages.
export function dsHeader(base, current = 'brands', ctaLabel = 'Book Now') {
  const links = NAV(base, current);
  const a = (l) => `<a${l.current ? ' class="ds-nav-current" aria-current="page"' : ''} href="${esc(l.u)}">${l.n}</a>`;
  return `<a class="ds-skip" href="#main">Skip to content</a>
<div class="ds-utility" aria-label="Business contact information"><div class="ds-wrap ds-utility-inner">
<a href="${esc(SITE.mapsPlace)}">${icon('pin', 16)}${SITE.address}, United States</a><span class="ds-utility-sep" aria-hidden="true"></span>
<span>${icon('clock', 16)}${SITE.hoursShort}</span><span class="ds-utility-spacer"></span>
<a href="mailto:${SITE.email}">${icon('mail', 16)}${SITE.email}</a><span class="ds-utility-sep" aria-hidden="true"></span>
<a class="ds-utility-phone" href="tel:${SITE.tel}">${icon('phone', 16)}${SITE.phone}</a>
</div></div>
<header class="ds-nav"><div class="ds-wrap ds-nav-inner">
<a class="ds-nav-logo" href="${SITE.live}/" aria-label="Highlights Chicago home"><img src="${base}images/v3/logos/highlights-chicago-logo.webp" alt="Highlights Chicago Electrical Services" width="180" height="44"></a>
<nav class="ds-nav-links" aria-label="Primary navigation">${links.map(a).join('')}</nav>
<a class="ds-btn ds-btn--primary ds-btn--m ds-nav-cta" href="#quote"><span>${ctaLabel}</span></a>
<a class="ds-nav-call" href="tel:${SITE.tel}" aria-label="Call ${SITE.phone}">${icon('phone', 18)}</a>
<details class="ds-nav-mobile"><summary aria-label="Open navigation menu"><span></span><span></span><span></span></summary>
<nav aria-label="Mobile navigation">${links.map(a).join('')}<a class="ds-btn ds-btn--primary ds-btn--block" href="tel:${SITE.tel}">${icon('phone', 16)}<span>Call ${SITE.phone}</span></a></nav></details>
</div></header>`;
}

export function dsFooter(base) {
  return `<footer class="ds-footer"><div class="ds-wrap ds-footer-grid"><div class="ds-footer-main">
<a class="ds-footer-logo" href="${SITE.live}/" aria-label="Highlights Chicago home"><img src="${base}images/v3/logos/highlights-chicago-logo-white.webp" alt="Highlights Chicago Electrical Services" width="170" height="50"></a>
<p class="ds-footer-blurb">${esc(SITE.footerBlurb)}</p>
<a class="ds-footer-ai" href="${esc(SITE.aiSearch)}" rel="nofollow">${badge('sparkles', 32, 'navy', 15)}<span>Learn about Highlights Chicago with AI</span>${icon('arrowRight', 16)}</a>
<div class="ds-footer-cols">
<nav aria-label="Company"><h2>Company</h2><a href="${SITE.live}/about-us">About Us</a><a href="${SITE.live}/services">Our Services</a><a href="${base}brands/index.html">Brands</a><a href="${SITE.live}/learning-center">Learning Center</a><a href="${SITE.live}/contact-us">Contact Us</a></nav>
<nav aria-label="About us"><h2>About us</h2><a href="${SITE.live}/our-team">Our Team</a><a href="${SITE.live}/testimonials">Testimonials</a><a href="${SITE.live}/faq">FAQ</a></nav>
<address><h2>Contact</h2>
<a href="${esc(SITE.mapsPlace)}">${badge('pin', 32, 'navy', 15)}<span><b>Address:</b>${SITE.street}<br>Chicago, IL 60659</span></a>
<a href="tel:${SITE.tel}">${badge('phone', 32, 'navy', 15)}<span><b>Phone:</b>${SITE.phone}</span></a>
<a href="mailto:${SITE.email}">${badge('mail', 32, 'navy', 15)}<span><b>Email:</b>${SITE.email}</span></a>
</address></div></div>
<aside class="ds-footer-card" aria-labelledby="footer-quote-title"><h2 id="footer-quote-title">Request a quick <span>quote</span></h2>
<p>Tell the Highlights Chicago team what electrical service is needed and get help planning the next step.</p>
<form class="ds-foot-form" aria-label="Request a quick quote" data-preview-form>
<div class="ds-foot-form-grid">
<label><span>Name</span><input placeholder="Your name" autocomplete="name" name="name"></label>
<label><span>Email</span><input type="email" placeholder="Your email" autocomplete="email" name="email"></label>
<label><span>Phone number</span><input type="tel" placeholder="Your phone number" autocomplete="tel" name="phone"></label>
<label><span>Property address</span><input placeholder="Property address" autocomplete="street-address" name="address"></label>
</div>
<label><span>How can we help?</span><textarea name="issue" placeholder="Hey, how can we help?" rows="3"></textarea></label>
<button class="ds-btn ds-btn--light ds-btn--block" type="submit"><span>Request free quote</span></button>
<p class="ds-foot-call">Or call <a href="tel:${SITE.tel}">${SITE.phone}</a></p>
</form></aside></div>
<div class="ds-wrap ds-footer-bottom"><span>Copyright © 2026 Highlights Chicago</span>
<div class="ds-socials"><a href="https://www.facebook.com/HighlightsChicago" aria-label="Highlights Chicago on Facebook">${icon('facebook', 18)}</a><a href="https://x.com/wedoit4life" aria-label="Highlights Chicago on X">${xLogo(15)}</a></div></div>
</footer>`;
}

// Collection-page chrome (hc-*), as on the v3 category (cluster) pages.
export function hcHeader(base, current = 'brands') {
  const links = NAV(base, current);
  const a = (l) => `<a href="${esc(l.u)}"${l.current ? ' aria-current="page"' : ''}>${l.n}</a>`;
  return `<div class="hc hc-header-stack">
<div class="hc-utility" aria-label="Business contact information"><div class="hc-wrap hc-utility-inner">
<div class="hc-utility-group"><a href="${esc(SITE.mapsPlace)}">${hcIcon('hcPin')}${SITE.address}, United States</a><span class="hc-utility-divider" aria-hidden="true"></span><span>${hcIcon('hcClock')}${SITE.hoursShort}</span></div>
<div class="hc-utility-group"><a href="mailto:${SITE.email}">${hcIcon('hcMail')}${SITE.email}</a><span class="hc-utility-divider" aria-hidden="true"></span><a class="hc-utility-phone" href="tel:${SITE.tel}">${hcIcon('hcPhone')}${SITE.phoneShort}</a></div>
</div></div>
<header class="hc-nav"><div class="hc-wrap hc-nav-inner">
<a class="hc-nav-logo" href="${SITE.live}/" aria-label="Highlights Chicago home"><img src="${base}images/v3/logos/highlights-chicago-logo.webp" alt="Highlights Chicago"></a>
<nav class="hc-nav-links" aria-label="Primary navigation">${links.map(a).join('')}</nav>
<div class="hc-nav-actions"><a class="hc-nav-phone" href="tel:${SITE.tel}">${hcIcon('hcPhone', 18)}${SITE.phone}</a><a class="hc-nav-cta" href="${SITE.live}/contact-us">Contact us</a>
<details class="hc-nav-menu"><summary aria-label="Open navigation menu"><span></span><span></span><span></span></summary><nav aria-label="Mobile navigation">${links.map(a).join('')}</nav></details></div>
</div></header></div>`;
}

export function hcFooter(base) {
  return `<footer class="hc hc-footer"><div class="hc-wrap"><div class="hc-footer-grid"><div class="hc-footer-main">
<div class="hc-footer-brand"><a href="${SITE.live}/" aria-label="Highlights Chicago home"><img src="${base}images/v3/logos/highlights-chicago-logo-white.webp" alt="Highlights Chicago"></a>
<p>${esc(SITE.footerBlurb)}</p>
<a class="hc-footer-ai" href="${esc(SITE.aiSearch)}" rel="nofollow"><span class="hc-footer-ai-icon">${hcIcon('hcSparkle')}</span><b>Learn about Highlights Chicago with AI</b>${hcIcon('hcArrow')}</a></div>
<div class="hc-footer-rule"></div>
<div class="hc-footer-links">
<nav aria-label="Company links"><h2>Company</h2><a href="${SITE.live}/about-us">About Us</a><a href="${SITE.live}/services">Our Services</a><a href="${base}brands/index.html">Brands</a><a href="${SITE.live}/learning-center">Learning Center</a><a href="${SITE.live}/contact-us">Contact Us</a></nav>
<nav aria-label="About links"><h2>About Us</h2><a href="${SITE.live}/our-team">Our Team</a><a href="${SITE.live}/testimonials">Testimonials</a><a href="${SITE.live}/faq">FAQ</a></nav>
<address><h2>Contact</h2>
<a class="hc-footer-contact" href="${esc(SITE.mapsPlace)}"><span class="hc-footer-ai-icon">${hcIcon('hcPin')}</span><span><small>Address:</small>${SITE.street}<br>Chicago, IL 60659</span></a>
<a class="hc-footer-contact" href="tel:${SITE.tel}"><span class="hc-footer-ai-icon">${hcIcon('hcPhone')}</span><span><small>Phone:</small>${SITE.phoneShort}</span></a>
<a class="hc-footer-contact" href="mailto:${SITE.email}"><span class="hc-footer-ai-icon">${hcIcon('hcMail')}</span><span><small>Email:</small>${SITE.email}</span></a>
</address></div></div>
<aside class="hc-footer-card"><h2 class="hc-footer-title">Request a quick <span>quote</span></h2>
<p>Tell the Highlights Chicago team what electrical service is needed and get help planning the next step.</p>
<form class="hc-footer-form" aria-label="Footer quick quote form" data-preview-form>
<label>Name<input placeholder="Your name" autocomplete="name" name="name"></label>
<label>Email<input type="email" placeholder="Your email" autocomplete="email" name="email"></label>
<label>Phone number<input type="tel" placeholder="Your phone number" autocomplete="tel" name="phone"></label>
<label>Property address<input placeholder="Property address" autocomplete="street-address" name="address"></label>
<label class="hc-span-2">How can we help?<textarea name="issue" placeholder="Hey, how can we help?" rows="3"></textarea></label>
<button type="submit">Request Free Quote</button>
<p class="hc-footer-call">Or call<a href="tel:${SITE.tel}">${SITE.phoneShort}</a></p>
</form></aside></div>
<div class="hc-footer-bottom"><span>Copyright © 2026 Highlights Chicago</span>
<div class="hc-footer-socials"><a href="https://www.facebook.com/HighlightsChicago" aria-label="Highlights Chicago on Facebook">${hcIcon('facebook')}</a><a href="https://x.com/wedoit4life" aria-label="Highlights Chicago on X">${xLogo(15)}</a></div></div>
</div></footer>`;
}

export const scripts = (base) => `<script src="${base}assets/js/site.js" defer></script>`;
