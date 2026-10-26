// Service-page sections in the Design System v3 markup (ds-*). Each takes plain data and the
// relative base path; copy lives in the page module, never here.
import { esc, rich, icon, badge, google, yelp, stars, miniMap, ratings } from './ui.mjs';
import { SITE, AREAS } from '../content/site.mjs';

const img = (base, p) => (/^https?:/.test(p) ? p : base + p);
const posStyle = (pos) => (pos ? ` style="object-position:${pos}"` : '');
const credit = (c) => (c ? `<span class="ds-credit-pill">${esc(c)}</span>` : '');

function headBlock({ eyebrow, title, id, lede, aside = '', dark = false, split = false }) {
  const cls = ['ds-head', aside ? 'ds-head--aside' : '', split ? 'ds-head--split' : '', dark ? 'ds-head--dark' : ''].filter(Boolean).join(' ');
  if (split) {
    return `<div class="${cls}"><div class="ds-head-main"><p class="ds-eyebrow">${esc(eyebrow)}</p><h2 class="ds-h2" id="${id}">${esc(title)}</h2></div><p class="ds-lede ds-head-lede">${esc(lede)}</p></div>`;
  }
  return `<div class="${cls}"><div class="ds-head-main"><p class="ds-eyebrow">${esc(eyebrow)}</p><h2 class="ds-h2" id="${id}">${esc(title)}</h2>${lede ? `<p class="ds-lede">${rich(lede)}</p>` : ''}</div>${aside ? `<div class="ds-head-aside">${aside}</div>` : ''}</div>`;
}
const band = (tone, key, inner, extraCls = '') =>
  `<section class="ds-band ds-band--${tone} ds-band--${key}${extraCls}" id="${key}" aria-labelledby="${key}-title">${inner}</section>`;
const ghost = (href, label, cls = '') => `<a class="ds-ghost${cls}" href="${href}"><span>${esc(label)}</span>${icon('arrowRight', 16)}</a>`;
const noteline = (text) => `<div class="ds-noteline">${badge('info', 32, 'white', 15)}<div><p>${rich(text)}</p></div></div>`;

// ---------- Hero ----------
export function hero(d, base) {
  const crumbs = d.crumbs.map(([n, u], i) => (i === d.crumbs.length - 1
    ? `<li aria-current="page">${esc(n)}</li>`
    : `<li><a href="${u}">${esc(n)}</a></li>`)).join('');
  const crew = d.crew.map((c, i) => `<li><figure class="ds-photo"><img src="${img(base, c.src)}" alt="${esc(c.alt)}" title="${esc(c.label)}" loading="${i ? 'lazy' : 'eager'}" decoding="async"${posStyle(c.pos)}><span class="ds-crew-label">${esc(c.label)}</span></figure></li>`).join('');
  const chips = d.chips.map((c, i) => `<li>${icon(i ? 'circleCheck' : 'shieldCheck', 16)}${esc(c)}</li>`).join('');
  const f = d.form;
  const chipOpts = f.options.map((o, i) => `<label class="ds-chip-option${i ? '' : ' is-selected'}"><input type="radio" name="issue" value="${esc(o)}"${i ? '' : ' checked'}>${i ? '' : icon('check', 14)}<span>${esc(o)}</span></label>`).join('');
  const sel = (id, label, opts) => `<div class="ds-field"><label for="${id}">${esc(label)}</label><span class="ds-select"><select id="${id}" name="${id}">${opts.map((o) => `<option>${esc(o)}</option>`).join('')}</select>${icon('chevronDown', 18)}</span></div>`;
  return `<header class="ds-hero" id="top">
<img class="ds-hero-bg" src="${img(base, d.bg.src)}" alt="${esc(d.bg.alt)}" loading="eager" fetchpriority="high" decoding="async"${posStyle(d.bg.pos)}>
<div class="ds-hero-scrim" aria-hidden="true"></div>
<div class="ds-wrap ds-hero-grid"><div class="ds-hero-copy">
<nav class="ds-crumbs" aria-label="Breadcrumb"><ol>${crumbs}</ol></nav>
<p class="ds-eyebrow ds-eyebrow--light">${esc(d.eyebrow)}</p>
${ratings('dark')}
<h1 class="ds-h1">${esc(d.h1)}</h1>
<p class="ds-hero-lede">${rich(d.lede, base)}</p>
<ul class="ds-trust-chips" aria-label="Credentials">${chips}</ul>
<div class="ds-cta-row"><a class="ds-btn ds-btn--light" href="tel:${SITE.tel}">${icon('phone', 18)}<span>Call ${SITE.phone}</span></a>
<a class="ds-btn ds-btn--outline-light" href="#quote"><span>${esc(d.cta)}</span>${icon('arrowRight', 18)}</a></div>
<div class="ds-crew"><div class="ds-crew-head"><p>${esc(d.crewTitle)}<small>Illustrative photos</small></p><a href="#working-in-area">See more${icon('arrowRight', 16)}</a></div>
<ul class="ds-crew-strip">${crew}</ul></div>
</div>
<aside class="ds-form-card" id="quote" aria-labelledby="quote-title">
<h2 class="ds-form-title" id="quote-title">${esc(f.title)}</h2>
<p class="ds-form-sub">${esc(f.sub)}</p>
<form>
<div class="ds-form-group" role="group" aria-labelledby="quote-g1"><p class="ds-form-group-title" id="quote-g1"><span class="ds-step-dot">1</span>Contact details</p>
<div class="ds-form-row"><div class="ds-field"><label for="q-name">Name</label><input id="q-name" autocomplete="name" name="name"></div>
<div class="ds-field"><label for="q-phone">Phone</label><input id="q-phone" type="tel" autocomplete="tel" inputmode="tel" name="phone"></div></div>
<div class="ds-field ds-field--icon"><label for="q-address">Street or cross streets</label><span class="ds-input-icon">${icon('pin', 18)}<input id="q-address" placeholder="e.g. Lincoln &amp; Foster" autocomplete="street-address" name="address"></span></div>
</div>
<div class="ds-form-group" role="group" aria-labelledby="quote-g2"><p class="ds-form-group-title" id="quote-g2"><span class="ds-step-dot">2</span>${esc(f.group2)}</p>
${sel('q-building', 'Building type', ['Single-family / bungalow', 'Two-flat or three-flat', 'Condo in a converted building', 'Newer construction', 'Commercial or tenant space', 'Not sure'])}
<div class="ds-field" role="radiogroup" aria-labelledby="q-issue"><span class="ds-label" id="q-issue">${esc(f.question)}</span><div class="ds-chip-options">${chipOpts}</div></div>
${sel('q-existing', f.selectLabel, f.selectOptions)}
</div>
<button class="ds-btn ds-btn--primary ds-btn--block" type="submit"><span>Request service</span>${icon('arrowRight', 18)}</button>
<p class="ds-form-note">${icon('circleCheck', 16)}<span>${rich(f.reply)}</span></p>
</form>
</aside>
</div>
<span class="ds-pill-caption ds-hero-pill">Illustrative photo</span>
</header>`;
}

// ---------- Which job is this? ----------
export function jobs(d, base) {
  const cards = d.cards.map((c, i) => `<button type="button" role="tab" class="ds-job-card${i ? '' : ' is-active'}" id="job-tab-${i}" aria-selected="${!i}" aria-controls="job-panel-${i}" tabindex="${i ? -1 : 0}">
<span class="ds-job-media"><img src="${img(base, c.src)}" alt="${esc(c.alt)}" loading="lazy" decoding="async"${posStyle(c.pos)}><span class="ds-num-tag">${String(i + 1).padStart(2, '0')}</span>${i ? '' : `<span class="ds-job-check">${icon('check', 16)}</span>`}</span>
<span class="ds-job-body"><span class="ds-job-title">${esc(c.title)}</span><span class="ds-job-situation">${esc(c.situation)}</span></span>
<span class="ds-job-toggle">Scope &amp; first step<span class="ds-job-toggle-icon">${icon('chevronDown', 16)}</span></span>
</button>`).join('');
  const panels = d.cards.map((c, i) => `<div class="ds-job-panel" role="tabpanel" id="job-panel-${i}" aria-labelledby="job-tab-${i}"${i ? ' hidden' : ''}>
<div class="ds-job-detail">${badge('sliders', 48)}<div><h3 class="ds-label-head">Scope is decided by</h3><p class="ds-job-scope">${esc(c.scope)}</p></div></div>
<div class="ds-job-first">${badge('flag', 48, 'solid-blue')}<div><h3 class="ds-label-head">First step</h3><p class="ds-job-step">${esc(c.first)}</p></div>${ghost(c.link[0], c.link[1])}</div>
</div>`).join('');
  return band('white', 'your-job', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Start here', title: d.title, id: 'your-job-title', lede: d.lede, aside: `<p class="ds-hint">${badge('pointer', 32, 'blue', 16)}Select a job to see its scope &amp; first step</p>` })}
<div class="ds-jobs" style="--jobs:${d.cards.length};--active:0"><div class="ds-job-cards" role="tablist" aria-label="Choose the job">${cards}</div>${panels}</div>
<div class="ds-note-row"><div class="ds-note-row-main">${badge('help', 32, 'blue', 16)}<p>${esc(d.note)}</p></div><small class="ds-meta">Illustrative photos</small></div>
</div>`);
}

// Generator diagram drawn with the design system's diagram classes.
function genDiagram(on, label, managed = false) {
  const cells = [[22, 48, 46, 52], [74, 48, 98, 52], [22, 74, 46, 78], [74, 74, 98, 78]];
  const c = cells.map(([x, y, bx, by], i) => `<g><rect x="${x}" y="${y}" width="44" height="18" rx="2" class="dg-cell${on[i] ? ' dg-cell--on' : ''}"></rect>${on[i] ? `<path d="M${bx} ${by}l-5 6h6l-5 6" class="dg-bolt"></path>` : ''}</g>`).join('');
  const module = managed ? '<rect x="146" y="72" width="22" height="20" rx="3" class="dg-battery"></rect><rect x="151" y="78" width="12" height="3" rx="1" class="dg-battery-bar"></rect><rect x="151" y="84" width="12" height="3" rx="1" class="dg-battery-bar"></rect>' : '';
  const gen = '<rect x="186" y="56" width="66" height="44" rx="5" class="dg-battery"></rect><rect x="194" y="51" width="50" height="5" rx="2" class="dg-battery-cap"></rect>'
    + [64, 72, 80, 88].map((y) => `<rect x="222" y="${y}" width="22" height="4" rx="1" class="dg-battery-bar"></rect>`).join('')
    + '<rect x="194" y="64" width="20" height="14" rx="2" class="dg-battery-bar"></rect>';
  return `<svg class="ds-diagram ds-diagram--backup" viewBox="0 0 260 120" role="img" aria-label="${esc(label)}"><path d="M6 42 70 6l64 36" class="dg-house"></path><rect x="14" y="40" width="112" height="62" rx="2" class="dg-house"></rect>${c}<path d="M126 82h${managed ? '20M168 82h18' : '60'}" class="dg-link"></path>${module}${gen}</svg>`;
}

// ---------- Equipment ----------
export function equipment(d, base) {
  const tiles = d.tiles.map((t) => `<li class="ds-tile"><figure class="ds-photo ds-tile-media"><img src="${img(base, t.src)}" alt="${esc(t.alt)}" title="${esc(t.credit || 'Illustrative photo')}" loading="lazy" decoding="async"${posStyle(t.pos)}>${credit(t.credit)}</figure>
<div class="ds-tile-body"><h3 class="ds-h5">${esc(t.title)}</h3><p>${esc(t.text)}</p></div></li>`).join('');
  const rows = d.compare.labels;
  const compare = d.compare.cards.map((c) => `<article class="ds-compare-card"><header class="ds-compare-head"><h4>${esc(c.title)}</h4></header>
${c.values.map((v, i) => `<div class="ds-compare-row"><span class="ds-compare-label">${esc(rows[i])}</span><span class="ds-compare-value">${esc(v)}</span></div>`).join('')}</article>`).join('');
  const diag = [[[1, 1, 1, 1], 'Every circuit in the house on the generator'], [[1, 1, 1, 1], 'Every circuit connected, with large loads managed', true], [[0, 1, 1, 0], 'Only the essential circuits on the generator']];
  const options = d.options.map((o, i) => `<li class="ds-option"><div class="ds-option-art">${genDiagram(diag[i][0], diag[i][1], diag[i][2])}</div><h4 class="ds-h5">${esc(o.title)}</h4><p>${esc(o.text)}</p></li>`).join('');
  return band('grey', 'equipment', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Equipment', title: d.title, id: 'equipment-title', lede: d.lede })}
<ul class="ds-tiles">${tiles}</ul>
<p class="ds-meta ds-meta--end">${esc(d.meta)}</p>
<div class="ds-banner">${badge('wrench', 48)}<p>${esc(d.banner)}</p>${ghost('#diagnose', d.bannerLink)}</div>
<div class="ds-sub" id="equipment-choices"><div class="ds-sub-head ds-sub-head--split"><h3 class="ds-h3">${esc(d.compare.title)}</h3><p class="ds-lede">${esc(d.compare.lede)}</p></div>
<div class="ds-compare" style="--cols:${d.compare.cards.length};--rows:${rows.length + 1}">${compare}</div></div>
<div class="ds-sub" id="equipment-options"><h3 class="ds-h3 ds-sub-title">${esc(d.optionsTitle)}</h3>
<div class="ds-callout-navy">${badge('zapOff', 64, 'navy', 26)}<div><p class="ds-callout-lead">${esc(d.callout[0])}</p><p>${esc(d.callout[1])}</p></div></div>
<ul class="ds-options">${options}</ul>
${noteline(d.optionsNote)}</div>
</div>`);
}

// ---------- Site assessment ----------
export function assessment(d, base) {
  const icons = ['gauge', 'clipboardList', 'building', 'route', 'route', 'split', 'cpu', 'users'];
  const checks = d.checks.map((c, i) => `<li><span class="ds-numbered-num">${String(i + 1).padStart(2, '0')}</span>${badge(c.icon || icons[i], 44, 'blue', 18)}<div><h3 class="ds-h6">${esc(c.title)}</h3><p>${rich(c.text)}</p></div></li>`).join('');
  const tones = ['green', 'blue', 'blue', 'navy'];
  const flowIcons = ['circleCheck', 'filePlus', 'filePlus', 'arrowUpCircle'];
  const flow = d.routes.map((r, i) => `${i ? `<li class="ds-flow-arrow" aria-hidden="true">${icon('arrowRight', 18)}</li>` : ''}<li class="ds-flow-card ds-flow-card--${tones[i]}"><div class="ds-flow-top"><span class="ds-flow-num">${i + 1}</span>${icon(flowIcons[i], 20)}</div><h4 class="ds-h6">${esc(r.title)}</h4><p>${esc(r.text)}</p></li>`).join('');
  return band('white', 'site-assessment', `<div class="ds-wrap">
<div class="ds-checklist"><div class="ds-checklist-rail">${headBlock({ eyebrow: 'Site assessment', title: d.title, id: 'site-assessment-title', lede: d.lede })}
<div class="ds-checklist-photo"><figure class="ds-photo ds-photo--tall"><img src="${img(base, d.photo.src)}" alt="${esc(d.photo.alt)}" title="${esc(d.photo.label)}" loading="lazy" decoding="async"${posStyle(d.photo.pos)}><span class="ds-numeral-badge"><b>${d.checks.length}</b><span><i aria-hidden="true"></i>Checks</span></span></figure><p class="ds-meta">${esc(d.photo.label)}</p></div></div>
<ol class="ds-numbered">${checks}</ol></div>
<div class="ds-sub" id="assessment-routes"><div class="ds-sub-head">${badge('network', 48)}<h3 class="ds-h3">${esc(d.routesTitle)}</h3></div>
<ol class="ds-flow" style="--routes:${d.routes.length}">${flow}</ol>
<div class="ds-note-box">${noteline(d.routesNote)}</div></div>
</div>`);
}

// ---------- Repair / diagnose ----------
export function diagnose(d, base) {
  const acc = d.symptoms.map((s, i) => `<details class="ds-acc" name="symptoms"${i ? '' : ' open'}><summary>${badge(s.icon, 44, 'blue', 18)}<span class="ds-acc-title">${esc(s.title)}</span>${icon('chevronDown', 20, 'ds-icon ds-acc-chevron')}</summary>
<div class="ds-acc-body"><p class="ds-label-head ds-label-head--muted">Usual causes</p><p>${esc(s.causes)}</p>
<div class="ds-start-box">${icon('search', 18)}<div><p class="ds-label-head ds-label-head--blue">First thing to check</p><p>${esc(s.check)}</p></div></div></div></details>`).join('');
  const a = d.cards[0], b = d.cards[1];
  return band('grey', 'diagnose', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Repair', title: d.title, id: 'diagnose-title', lede: d.lede })}
<div class="ds-symptoms"><div class="ds-symptoms-photo"><figure class="ds-photo ds-photo--tall"><img src="${img(base, d.photo.src)}" alt="${esc(d.photo.alt)}" title="${esc(d.photo.credit)}" loading="lazy" decoding="async"${posStyle(d.photo.pos)}>${credit(d.photo.credit)}</figure></div>
<div class="ds-symptoms-list"><p class="ds-label-head ds-label-head--muted">What the homeowner sees</p>${acc}</div></div>
<div class="ds-info-cards">
<article class="ds-info-card"><div class="ds-info-head">${badge('refresh', 48)}<h3 class="ds-h4">${esc(a.title)}</h3></div><p class="ds-info-lead">${esc(a.lead)}</p>
<ul class="ds-icon-rows">${a.rows.map(([ic, t]) => `<li>${badge(ic, 40, 'white', 17)}<p>${rich(t)}</p></li>`).join('')}</ul></article>
<article class="ds-info-card ds-info-card--navy"><figure class="ds-photo ds-info-thumb"><img src="${img(base, b.src)}" alt="${esc(b.alt)}" title="${esc(b.credit)}" loading="lazy" decoding="async"${posStyle(b.pos)}>${credit(b.credit)}</figure>
<div class="ds-info-head">${badge('alert', 48, 'navy')}<h3 class="ds-h4">${esc(b.title)}</h3></div><p>${rich(b.text)}</p></article>
</div>
</div>`);
}

// ---------- Brand logos ----------
export function brands(d, base) {
  const tiles = d.logos.map((l) => (l.src
    ? `<li class="ds-logo-tile"><img src="${img(base, l.src)}" alt="${esc(l.name)} logo" loading="lazy" decoding="async"></li>`
    : `<li class="ds-logo-tile"><span class="pv-wordmark" role="img" aria-label="${esc(l.name)}"><b>${esc(l.name)}</b><small>Official logo pending</small></span></li>`)).join('');
  return band('white', 'brands', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Equipment brands', title: d.title, id: 'brands-title', lede: d.lede, aside: `<p class="ds-big-count"><b>${d.logos.length}</b> <span>Brands</span></p>` })}
<ul class="ds-logo-wall">${tiles}</ul>
<div class="ds-note-row"><div class="ds-note-row-main">${badge('wrench', 44, 'green', 18)}<p>${esc(d.note)}</p></div></div>
</div>`);
}

// ---------- Who you're calling (team + trust) ----------
export function trust(d, base) {
  const tiles = d.stats.map((s) => `<div class="ds-stat-tile"><p class="ds-stat-tag">${icon(s.icon, 14)}${esc(s.tag)}</p><p class="ds-stat-value">${esc(s.value)}</p><p class="ds-stat-caption">${esc(s.caption)}</p></div>`).join('');
  const g = SITE.google;
  const promises = d.promises.map((p) => `<li>${badge(p.icon, 48, 'navy')}<h3 class="ds-h5">${esc(p.title)}</h3><p>${rich(p.text)}</p></li>`).join('');
  return band('navy', 'trust', `<div class="ds-wrap">
${headBlock({ eyebrow: 'About Highlights Chicago', title: 'Who’s actually on the job?', id: 'trust-title', lede: d.lede, dark: true, split: true })}
<div class="ds-cred"><figure class="ds-photo ds-cred-photo"><img src="${base}images/v3/photos/van-chicago-skyline.webp" alt="Highlights Chicago service van in front of the Chicago skyline at dusk" loading="lazy" decoding="async"><span class="ds-address-chip">${icon('pin', 14)}${SITE.street}</span></figure>
<div class="ds-cred-stats">${tiles}
<div class="ds-stat-tile ds-stat-tile--google"><span class="ds-google-disc">${google(40)}</span><p class="ds-google-score"><b>${g.rating}</b><span>/5</span></p>
<div class="ds-google-meta">${stars(18)}<p>${g.count} Google reviews</p></div><p class="ds-stat-tag ds-stat-tag--end">${icon('check', 14)}Google rating</p></div>
</div></div>
<ul class="ds-promises">${promises}</ul>
</div>`);
}

// ---------- Reviews ----------
export function reviews(d) {
  const g = SITE.google;
  const items = d.items.map((r) => `<li class="ds-review"><header class="ds-review-head"><span class="ds-avatar" aria-hidden="true">${esc(r.who[0])}</span><div><p class="ds-review-name">${esc(r.who)}</p><p class="ds-review-date">${esc(r.date)}</p></div>${google(22)}</header>
<blockquote class="ds-review-text">“${esc(r.quote)}”</blockquote>
<footer class="ds-review-foot"><span>Posted on Google</span><a class="ds-ghost" href="${esc(r.url)}" target="_blank" rel="noreferrer"><span>View on Google</span>${icon('arrowUpRight', 16)}</a></footer></li>`).join('');
  return band('white', 'reviews', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Google reviews', title: d.title, id: 'reviews-title' })}
<div class="ds-reviews"><aside class="ds-place-card"><div class="ds-place-top"><div class="ds-place-brand">${google(36)}<div><p class="ds-place-title">Google reviews</p><p class="ds-place-sub">Highlights Chicago</p></div></div>
<div class="ds-place-score"><p class="ds-place-num"><b>${g.rating}</b><span>/5</span></p><div>${stars(18)}<p>${g.count} reviews</p></div></div>
<a class="ds-ghost" href="${esc(g.url)}"><span>Read all ${g.count} reviews</span>${icon('arrowRight', 16)}</a></div>
<a class="ds-place-map" href="${esc(SITE.mapsPlace)}" aria-label="Open the Highlights Chicago shop in Google Maps">${miniMap()}<span class="ds-map-chip">${icon('pin', 14)}Google Maps</span></a>
<div class="ds-place-foot"><p><b>Highlights Chicago · ${SITE.street}</b></p>${ghost(SITE.mapsPlace, 'Open in Google Maps')}</div></aside>
<ul class="ds-review-grid">${items}</ul></div>
<p class="ds-footnote">${icon('info', 16)}Short excerpts from public Google reviews, each linked to the original. Google and Yelp ratings are reported separately, never merged.</p>
</div>`);
}

// ---------- Our work ----------
export function gallery(d, base) {
  const items = d.photos.map((p) => `<li><figure class="ds-photo"><img src="${img(base, p.src)}" alt="${esc(p.alt)}" title="${esc(p.cap)}" loading="lazy" decoding="async"${posStyle(p.pos)}><figcaption class="ds-gallery-caption">${icon('camera', 14)}${esc(p.cap)}</figcaption></figure></li>`).join('');
  return band('white', 'working-in-area', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Our work', title: d.title, id: 'working-in-area-title', lede: d.lede, aside: `<a class="ds-text-cta" href="#quote">${esc(d.cta)}${icon('arrowRight', 16)}</a>` })}
<ul class="ds-gallery ds-gallery--${d.photos.length}">${items}</ul>
</div>`);
}

// ---------- Process ----------
const OWNER = {
  highlights: ['green', 'wrench', 'Highlights'], city: ['blue', 'landmark', 'City of Chicago'], comed: ['grey', 'zap', 'ComEd'],
  homeowner: ['grey', 'user', 'Homeowner'], maker: ['grey', 'cpu', 'Generac'], gas: ['grey', 'route', 'Gas contractor'],
};
const owner = (k) => { const [tone, ic, label] = OWNER[k]; return `<span class="ds-owner ds-owner--${tone}">${icon(ic, 13)}${label}</span>`; };
export function process(d) {
  const n = d.steps.length;
  const legendKeys = [...new Set(d.steps.flatMap((s) => s.owners))];
  const nodes = d.steps.map((s, i) => `<li${i ? '' : ' class="is-current"'}><button type="button" aria-label="Step ${i + 1}: ${esc(s.title)}"${i ? '' : ' aria-current="step"'}>${i + 1}</button></li>`).join('');
  const steps = d.steps.map((s, i) => `<li class="ds-step${i ? '' : ' is-current'}"><div class="ds-step-top"><span class="ds-step-num">${String(i + 1).padStart(2, '0')}</span>${badge(s.icon || 'clipboardCheck', 48)}</div>
<h3 class="ds-h5">${esc(s.title)}</h3><p>${rich(s.text)}</p><div class="ds-step-owners">${s.owners.map(owner).join('')}</div></li>`).join('');
  return band('grey', 'process', `<div class="ds-process ds-process--swipe" style="--done:0">
<div class="ds-wrap">${headBlock({ eyebrow: `The process · ${n} steps`, title: d.title, id: 'process-title', lede: d.lede, aside: `<div class="ds-legend"><p class="ds-label-head ds-label-head--muted">Who controls the step</p><ul>${legendKeys.map((k) => `<li>${owner(k)}</li>`).join('')}</ul></div>` })}</div>
<div class="ds-process-pin"><div class="ds-process-inner"><div class="ds-process-content">
<div class="ds-wrap"><div class="ds-rail"><p class="ds-rail-count" aria-live="polite"><b>01</b><span>/ ${String(n).padStart(2, '0')}</span></p>
<ol class="ds-rail-nodes" aria-label="Steps">${nodes}</ol>
<div class="ds-rail-arrows"><button type="button" class="ds-round-btn" disabled aria-label="Previous step">${icon('arrowLeft', 18)}</button><button type="button" class="ds-round-btn ds-round-btn--solid" aria-label="Next step">${icon('arrowRight', 18)}</button></div></div></div>
<div class="ds-track-viewport" tabindex="0" aria-label="Process steps"><ol class="ds-track">${steps}</ol></div>
<div class="ds-wrap"><p class="ds-track-hint">${badge('pointer', 32, 'white', 15)}Swipe or use the arrows to see all ${n} steps${icon('arrowRight', 16)}</p>
<div class="ds-callout-light">${badge('clock', 48)}<div><p class="ds-label-head ds-label-head--blue">How long it takes</p><p class="ds-callout-text">${rich(d.duration)}</p></div></div></div>
</div></div></div>
</div>`);
}

// ---------- Service areas ----------
export function areas(d, base) {
  const q = encodeURIComponent('Highlights Chicago Inc, 5766 N Lincoln Ave, Chicago, IL 60659');
  const cards = AREAS.map(([name, note, file, cr]) => `<li class="ds-area-card"><span class="ds-area-photo"><img src="${base}images/areas/${file}.jpg" alt="${esc(name)} landmark" loading="lazy" decoding="async"></span><h3 class="ds-h6">${esc(name)}</h3><p>${esc(note)}</p><small>Photo: ${esc(cr)}</small></li>`).join('');
  return band('navy', 'areas', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Service area', title: 'Areas covered across Chicago', id: 'areas-title', lede: d.lede, dark: true, aside: `<a class="ds-text-cta ds-text-cta--dark" href="${esc(SITE.mapsPlace)}">Open in Google Maps${icon('arrowUpRight', 16)}</a>` })}
<div class="ds-map-frame"><div class="ds-map-canvas"><iframe title="Map of Chicago with the Highlights Chicago shop in West Ridge" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${q}&amp;z=11&amp;output=embed"></iframe><span class="ds-map-chip">${icon('map', 14)}Google Maps · live embed</span></div>
<div class="ds-shop-card"><img src="${base}images/v3/logos/highlights-chicago-logo.webp" alt="Highlights Chicago Electrical Services" width="140" height="34" loading="lazy"><h3 class="ds-h5">Highlights Chicago</h3>
<p class="ds-shop-address">${icon('pin', 16)}${SITE.address}</p><p class="ds-proof-chip"><i aria-hidden="true"></i>West Ridge · The shop</p>
<a class="ds-btn ds-btn--primary ds-btn--block" href="${esc(SITE.mapsDirections)}">${icon('send', 16)}<span>Get directions</span></a></div></div>
<div class="ds-areas"><div class="ds-areas-bar"><p class="ds-rail-count ds-rail-count--dark" aria-live="polite"><b>01-06</b><span>/ ${AREAS.length}</span></p>
<div class="ds-rail-arrows"><button type="button" class="ds-round-btn ds-round-btn--dark" disabled aria-label="Previous areas">${icon('arrowLeft', 18)}</button><button type="button" class="ds-round-btn ds-round-btn--light" aria-label="Next areas">${icon('arrowRight', 18)}</button></div></div>
<ul class="ds-area-rail" tabindex="0" aria-label="Areas covered">${cards}</ul></div>
<div class="ds-areas-foot"><div class="ds-not-listed"><div class="ds-not-listed-text">${badge('help', 44, 'navy', 18)}<p>${esc(d.notListed)}</p></div><a class="ds-btn ds-btn--outline-light ds-btn--m" href="tel:${SITE.tel}">${icon('phone', 16)}<span>Call ${SITE.phone}</span></a></div>
<div class="ds-callout-rule">${badge('building', 48, 'navy')}<div><p class="ds-label-head ds-label-head--light">Service note · Chicago buildings</p><p>${esc(d.serviceNote)}</p></div></div></div>
</div>`);
}

// ---------- Related ----------
export function related(d, base) {
  const cards = d.cards.map((c) => `<li class="ds-service-card"><img class="ds-service-media" src="${img(base, c.src)}" alt="${esc(c.title)} by Highlights Chicago" loading="lazy" decoding="async"${posStyle(c.pos)}><div class="ds-service-body"><h3 class="ds-h6">${esc(c.title)}</h3><p>${esc(c.text)}</p>${ghost(c.href, c.cta || 'View service', ' ds-ghost--caps')}</div></li>`).join('');
  const h = d.hub;
  return band('white', 'other-services', `<div class="ds-wrap">
${headBlock({ eyebrow: 'More from Highlights Chicago', title: d.title, id: 'other-services-title' })}
<div class="ds-related"><article class="ds-category-card"><img class="ds-category-bg" src="${img(base, h.src)}" alt="${esc(h.alt)}" loading="lazy" decoding="async"><div class="ds-category-scrim" aria-hidden="true"></div><span class="ds-pill-caption ds-category-pill">Illustrative photo</span>
<div class="ds-category-body"><p class="ds-glass-chip"><i aria-hidden="true"></i>${esc(h.chip)}</p><h3 class="ds-h3">${esc(h.title)}</h3><p>${esc(h.text)}</p><a class="ds-btn ds-btn--light" href="${h.href}"><span>${esc(h.cta)}</span>${icon('arrowRight', 18)}</a></div></article>
<ul class="ds-service-cards">${cards}</ul></div>
</div>`);
}

// ---------- Pricing ----------
export function pricing(d, base) {
  const permit = (v, dark) => {
    const map = { yes: ['yes', 'check', 'Yes'], sometimes: ['sometimes', 'help', 'Sometimes'], no: ['no', 'minus', 'No'] };
    const [cls, ic, label] = map[v];
    return `<span class="ds-permit ds-permit--${cls}${dark ? ' ds-permit--dark' : ''}">${icon(ic, 13)}${label}</span>`;
  };
  const rows = d.rows.map((r) => `<div class="ds-price-row" role="row"><span role="cell" class="ds-price-job">${badge(r.icon || 'wrench', 40, 'blue', 17)}<b>${esc(r.job)}</b></span><span role="cell">${esc(r.driver)}</span><span role="cell" class="ds-price-pill">${permit(r.permit)}</span></div>`).join('');
  const drivers = d.drivers.map((x, i) => `<li><span class="ds-numbered-num">${String(i + 1).padStart(2, '0')}</span><div><h4 class="ds-h6">${esc(x[0])}</h4><p>${esc(x[1])}</p></div><div class="ds-when">${icon('search', 16)}<span><span class="ds-when-label">When it is known</span>${esc(x[2])}</span></div></li>`).join('');
  const sources = d.incentives.sources.map(([n, u]) => `<a href="${esc(u)}" target="_blank" rel="noopener noreferrer">${esc(n)}</a>`).join(' · ');
  return band('grey', 'pricing', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Cost & permits', title: d.title, id: 'pricing-title', lede: d.lede })}
<p class="ds-source">${badge('fileText', 32, 'blue', 15)}<b>Data source</b><span>${esc(d.source)}</span></p>
<ul class="ds-price-stats">${d.cards.map((c, i) => `<li class="ds-price-card${i ? '' : ' is-featured'}"><div class="ds-price-top">${badge(c.icon || 'trendingDown', 48, i ? 'blue' : 'navy')}<span class="ds-price-permit">Permit needed?${permit('yes', !i)}</span></div>
<h3 class="ds-h6">${esc(c.label)}</h3><p class="ds-price-value">${esc(c.value)}</p><p class="ds-price-sub">median reported</p><span class="ds-bar" style="--fill:${c.fill}" aria-hidden="true"></span><p class="ds-price-count">${icon('fileText', 14)}${esc(c.count)}</p></li>`).join('')}</ul>
<div class="ds-price-list" role="table" aria-label="Generac jobs without a reported median"><div class="ds-price-row ds-price-row--head" role="row"><span role="columnheader">Job</span><span role="columnheader">Reported median, or what drives the price</span><span role="columnheader">Permit needed?</span></div>${rows}</div>
${noteline('Permit values are the reported construction value for the whole project, not a quote.')}
<div class="ds-sub ds-drivers"><div class="ds-drivers-rail"><p class="ds-eyebrow">${d.drivers.length} cost drivers</p><h3 class="ds-h3">What moves the price</h3><figure class="ds-photo ds-photo--tall"><img src="${img(base, d.driversPhoto.src)}" alt="${esc(d.driversPhoto.alt)}" title="${esc(d.driversPhoto.label)}" loading="lazy" decoding="async"></figure><p class="ds-meta">${esc(d.driversPhoto.label)}</p></div>
<div class="ds-drivers-list"><div class="ds-drivers-head"><span>Factor <i aria-hidden="true"></i> Why it changes the price</span><span>When it is known</span></div><ol>${drivers}</ol></div></div>
<div class="ds-callout-light">${badge('receipt', 48)}<div><p class="ds-label-head ds-label-head--blue">Estimates and payment</p><p class="ds-callout-text">${esc(d.fee)}</p></div></div>
<div class="ds-callout-light pv-gap">${badge('tag', 48)}<div><p class="ds-label-head ds-label-head--blue">Incentives</p><p class="ds-callout-text">${esc(d.incentives.text)}</p><p class="ds-callout-text pv-sources">Sources: ${sources}</p></div></div>
</div>`);
}

// ---------- What the estimate covers ----------
export function scope(d, base) {
  const list = (items) => `<ul>${items.map((t) => `<li><span class="ds-scope-bullet">${icon('check', 14)}</span><span>${esc(t)}</span></li>`).join('')}</ul>`;
  const docs = d.handover.map(([t, x], i) => `<li class="ds-doc"><div class="ds-doc-top">${badge(['fileCheck', 'clipboardCheck', 'tag', 'list', 'fileText', 'award', 'cpu'][i % 7], 48, 'navy')}<span>${String(i + 1).padStart(2, '0')}</span></div><h3 class="ds-h6">${esc(t)}</h3><p class="pv-doc-text">${esc(x)}</p></li>`).join('');
  const w = d.warranties.map((r) => `<li>${badge(r.icon, 48)}<h3 class="ds-h6">${esc(r.item)}</h3><p class="ds-warranty-party">${esc(r.party)}</p></li>`).join('');
  return band('white', 'whats-included', `<div class="ds-wrap">
${headBlock({ eyebrow: 'Scope & handover', title: 'What the estimate covers', id: 'whats-included-title', lede: d.lede })}
<div class="ds-scope"><article class="ds-scope-panel ds-scope-panel--in"><header><span class="ds-scope-mark">${icon('check', 18)}</span><div><p class="ds-label-head">Included</p><h3 class="ds-h5">${esc(d.inTitle)}</h3></div></header>${list(d.included)}<p class="ds-scope-note">${esc(d.inNote)}</p></article>
<article class="ds-scope-panel ds-scope-panel--out"><header><span class="ds-scope-mark">${icon('plus', 18)}</span><div><p class="ds-label-head">Separate quote</p><h3 class="ds-h5">Priced only when the home needs it</h3></div></header>${list(d.separate)}<p class="ds-scope-note">${esc(d.outNote)}</p></article></div>
</div>
<div class="ds-handover"><div class="ds-wrap">
<div class="ds-head ds-head--aside ds-head--dark"><div class="ds-head-main"><p class="ds-eyebrow">At handover</p><h2 class="ds-h2">What the homeowner holds at the end</h2></div><div class="ds-head-aside"><p class="ds-glass-chip">${icon('list', 14)}${d.handover.length} items to collect</p></div></div>
<ol class="ds-docs">${docs}<li class="ds-doc ds-doc--photo"><figure class="ds-photo"><img src="${img(base, d.handoverPhoto.src)}" alt="${esc(d.handoverPhoto.alt)}" title="${esc(d.handoverPhoto.credit)}" loading="lazy" decoding="async">${credit(d.handoverPhoto.credit)}</figure></li></ol>
</div></div>
<div class="ds-wrap ds-warranties"><div><p class="ds-eyebrow">Warranties</p><h2 class="ds-h2">Who warrants what</h2><ul class="ds-legend-list"><li><i class="ds-ring ds-ring--blue" aria-hidden="true"></i>Warranted by the manufacturer</li></ul></div>
<ul class="ds-warranty-rows">${w}</ul></div>`);
}

// ---------- FAQ ----------
export function faq(d, base) {
  const items = d.items.map(([q, a], i) => `<details class="ds-faq-item"${i ? '' : ' open'}><summary><span class="ds-faq-num">${String(i + 1).padStart(2, '0')}</span><span class="ds-faq-q">${esc(q)}</span><span class="ds-faq-toggle" aria-hidden="true">${icon('plus', 16, 'ds-icon ds-faq-plus')}${icon('minus', 16, 'ds-icon ds-faq-minus')}</span></summary><div class="ds-faq-a"><p>${rich(a, base)}</p></div></details>`).join('');
  return band('grey', 'faq', `<div class="ds-wrap ds-faq"><aside class="ds-faq-rail"><p class="ds-eyebrow">FAQs · ${d.items.length} questions</p><h2 class="ds-h2" id="faq-title">${esc(d.title)}</h2>
<figure class="ds-photo ds-faq-photo"><img src="${base}images/v3/photos/tech-panel-testing.webp" alt="Highlights Chicago electrician testing a panel with a multimeter" loading="lazy" decoding="async" style="object-position:50% 35%"><div class="ds-faq-photo-body"><p class="ds-h5">Didn’t find the question?</p><a class="ds-btn ds-btn--light ds-btn--m" href="tel:${SITE.tel}">${icon('phone', 16)}<span>Call ${SITE.phone}</span></a></div></figure>
<div class="ds-proof-card"><div class="ds-proof-row"><span class="ds-google-disc ds-google-disc--line">${google(24)}</span><div><p class="ds-proof-num"><b>${SITE.google.rating}</b>${stars(16)}</p><p class="ds-proof-cap">${SITE.google.count} Google reviews</p></div></div>
<div class="ds-proof-row">${badge('shieldCheck', 48, 'green')}<div><p class="ds-proof-num"><b>${SITE.licence}</b></p><p class="ds-proof-cap">City of Chicago Electrical Contractor</p></div></div></div>
</aside><div class="ds-faq-list">${items}</div></div>`);
}

// ---------- Closing CTA ----------
export function closing(d, base) {
  const proof = [
    [`<span class="ds-google-disc">${google(24)}</span>`, SITE.google.rating + stars(16), `${SITE.google.count} Google reviews`],
    [`<span class="ds-google-disc">${yelp(24)}</span>`, SITE.yelp.rating, `${SITE.yelp.count} Yelp reviews`],
    [badge('fileCheck', 40, 'navy'), SITE.permits, 'City permits on record since 2012'],
    [badge('shieldCheck', 40, 'navy'), SITE.licence, 'City of Chicago Electrical Contractor'],
  ].map(([b, v, c]) => `<li><p class="ds-proof-big">${b}<b>${v}</b></p><p>${c}</p></li>`).join('');
  const logos = d.logos.map((l) => (l.src
    ? `<li class="ds-logo-tile ds-logo-tile--compact"><img src="${img(base, l.src)}" alt="${esc(l.name)} logo" loading="lazy" decoding="async"></li>`
    : `<li class="ds-logo-tile ds-logo-tile--compact"><span class="pv-wordmark" role="img" aria-label="${esc(l.name)}"><b>${esc(l.name)}</b></span></li>`)).join('');
  return `<section class="ds-band ds-band--photo ds-band--closing" id="closing" aria-labelledby="closing-title">
<img class="ds-closing-bg" src="${base}images/v3/photos/van-chicago-skyline.webp" alt="" loading="lazy" decoding="async">
<div class="ds-closing-scrim" aria-hidden="true"></div>
<div class="ds-wrap ds-closing"><img class="ds-closing-logo" src="${base}images/v3/logos/highlights-chicago-logo-white.webp" alt="Highlights Chicago Electrical Services" width="170" height="50" loading="lazy">
<p class="ds-eyebrow">Next step</p><h2 class="ds-h1 ds-closing-title" id="closing-title">${esc(d.title)}</h2><p class="ds-lede">${esc(d.lede)}</p>
<div class="ds-cta-row"><a class="ds-btn ds-btn--light" href="tel:${SITE.tel}">${icon('phone', 18)}<span>Call ${SITE.phone}</span></a><a class="ds-btn ds-btn--outline-light" href="#quote"><span>${esc(d.cta)}</span></a></div>
<ul class="ds-proof-strip">${proof}</ul>
<div class="ds-ready"><div class="ds-ready-head"><span class="ds-ready-badge">${icon('clipboardCheck', 22)}</span><h3 class="ds-h4">Have these ready</h3><a class="ds-ghost ds-ghost--dark ds-ghost--caps" href="tel:${SITE.tel}"><span>Call ${SITE.phone}</span>${icon('arrowRight', 16)}</a></div>
<ul class="ds-ready-items">${d.ready.map(([ic, t]) => `<li>${badge(ic, 44, 'navy', 18)}<p>${esc(t)}</p></li>`).join('')}</ul></div>
<div class="ds-closing-brands"><p class="ds-eyebrow">${esc(d.brandsLabel)}</p><ul>${logos}</ul></div>
</div></section>`;
}

// ---------- Guide (library layout, service-specific questions only) ----------
export function guides(d, base) {
  const tabs = d.items.map((g, i) => `<button type="button" role="tab" class="ds-guide-tab${i ? '' : ' is-active'}" id="guide-tab-${i}" aria-selected="${!i}" aria-controls="guide-panel-${i}" tabindex="${i ? -1 : 0}">${badge(g.icon, 44, i ? 'blue' : 'navy', 18)}<span class="ds-guide-tab-text"><small>Guide ${String(i + 1).padStart(2, '0')}</small>${esc(g.tab)}</span>${i ? '' : icon('chevronRight', 18)}</button>`).join('');
  const tocs = d.items.map((g, i) => `<nav class="ds-guide-toc" aria-label="In this guide"${i ? ' hidden' : ''}><p class="ds-label-head ds-label-head--muted">In this guide</p><ul><li><a href="#guide-${i + 1}-answer">The short answer</a></li><li><a href="#guide-${i + 1}-detail">The detail</a></li></ul></nav>`).join('');
  const panels = d.items.map((g, i) => `<article class="ds-guide" role="tabpanel" id="guide-panel-${i}" aria-labelledby="guide-tab-${i}"${i ? ' hidden' : ''}>
<header class="ds-guide-head"><img src="${img(base, g.img.src)}" alt="${esc(g.img.alt)}" loading="lazy" decoding="async"${posStyle(g.img.pos)}>${credit(g.img.credit)}<div><p class="ds-guide-kicker">Guide ${String(i + 1).padStart(2, '0')} / ${String(d.items.length).padStart(2, '0')}</p><h3 class="ds-h3">${esc(g.q)}</h3></div></header>
<div class="ds-guide-body"><p class="ds-lede" id="guide-${i + 1}-answer">${rich(g.answer, base)}</p>
<section class="ds-guide-part" id="guide-${i + 1}-detail"><h4 class="ds-h6">The detail</h4><div>${g.paras.map((p) => `<p>${rich(p, base)}</p>`).join('')}</div></section>
</div></article>`).join('');
  return band('white', 'guides', `<div class="ds-wrap">
${headBlock({ eyebrow: `Guide · ${d.items.length} questions`, title: d.title, id: 'guides-title', lede: d.lede })}
<div class="ds-library"><div class="ds-library-nav"><div class="ds-library-tabs" role="tablist" aria-orientation="vertical" aria-label="Guides">${tabs}</div>${tocs}</div>
<div class="ds-library-panels">${panels}</div></div>
</div>`);
}

export function callbar(cta) {
  return `<div class="ds-callbar"><a class="ds-btn ds-btn--primary" href="tel:${SITE.tel}">${icon('phone', 18)}<span>Call</span></a><a class="ds-btn ds-btn--secondary" href="#quote"><span>${esc(cta)}</span></a></div>`;
}
