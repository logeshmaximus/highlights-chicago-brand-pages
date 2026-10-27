// Brand service page v2 sections: the senior's C&S brand-page order (form-first hero, models, services
// in tabs, work, prices, team, reviews, process, areas, FAQ, closing, sibling links) in Highlights DS v3.
// Rows on desktop, swipe tracks on phones, so the page stays short.
import { esc, rich, icon, badge, google, yelp, stars, ratings } from './ui.mjs';
import { SITE } from '../content/site.mjs';

const img = (base, p) => (/^https?:/.test(p) ? p : base + p);
const pos = (p) => (p ? ` style="object-position:${p}"` : '');
const check = () => icon('check', 16);

// Labels: each one reads its field (d.labels.<key>) and falls back to the design's text when the field
// is empty, so a page with a blank or missing field still renders.
const LABELS = {
  heroCaption: '', // the design shows no caption on the hero photo
  jumpTitle: 'On this page',
  contactGroup: 'Contact details',
  submit: 'Request service',
  modelWork: 'The work on it',
  swipeHint: '',
  buildsNote: '',
  servicesEyebrow: '',
  pendingLabel: 'Ask us for a price', terms: 'Terms and conditions apply',
  moreButton: 'See all {n} prices',
  reviewsEyebrow: '',
  reviewSource: 'Google review',
  reviewLink: 'View on Google',
  reviewsHint: '',
  workHint: '',
};
const blank = (v) => v === undefined || v === null || v === '';
const label = (d, key) => (blank(d?.labels?.[key]) ? LABELS[key] : d.labels[key]);
const field = (v, key) => (blank(v) ? LABELS[key] : v);

function head({ eyebrow, title, id, intro, confirm }) {
  return `<div class="v2-head"><div class="ds-head-main">${blank(eyebrow) ? '' : `<p class="ds-eyebrow">${esc(eyebrow)}</p>`}<h2 class="ds-h2" id="${id}">${esc(title)}</h2></div>${intro || confirm ? `<div>${intro ? `<p class="v2-intro">${rich(intro)}</p>` : ''}${confirm ? `<span class="v2-confirm">${esc(confirm)}</span>` : ''}</div>` : ''}</div>`;
}
const section = (key, tone, inner) => `<section class="v2-band${tone ? ` v2-band--${tone}` : ''}" id="${key}" aria-labelledby="${key}-title"><div class="ds-wrap">${inner}</div></section>`;
const trackNav = (hint) => `<div class="v2-track-nav">${blank(hint) ? '<span></span>' : `<span class="v2-track-hint">${esc(hint)}</span>`}<div class="v2-track-arrows"><button type="button" data-prev aria-label="Previous">${icon('arrowLeft', 18)}</button><button type="button" data-next aria-label="Next">${icon('arrowRight', 18)}</button></div></div>`;

// ---------- Hero: form first, ratings above the H1, jump list ----------
export function hero(d, base) {
  const crumbs = d.crumbs.map(([n, u], i) => (i === d.crumbs.length - 1 ? `<li aria-current="page">${esc(n)}</li>` : `<li><a href="${u}">${esc(n)}</a></li>`)).join('');
  const chips = d.chips.map((c, i) => `<li>${icon(i ? 'circleCheck' : 'shieldCheck', 16)}${esc(c)}</li>`).join('');
  const f = d.form;
  const chipOpts = f.options.map((o, i) => `<label class="ds-chip-option${i ? '' : ' is-selected'}"><input type="radio" name="issue" value="${esc(o)}"${i ? '' : ' checked'}>${i ? '' : icon('check', 14)}<span>${esc(o)}</span></label>`).join('');
  const sel = (id, label, opts) => `<div class="ds-field"><label for="${id}">${esc(label)}</label><span class="ds-select"><select id="${id}" name="${id}">${opts.map((o) => `<option>${esc(o)}</option>`).join('')}</select>${icon('chevronDown', 18)}</span></div>`;
  const jump = d.jump.map(([id, label], i) => `<li><a href="#${id}"><i>${String(i + 1).padStart(2, '0')}</i>${esc(label)}</a></li>`).join('');
  return `<header class="ds-hero" id="top">
<img class="ds-hero-bg" src="${img(base, d.bg.src)}" alt="${esc(d.bg.alt)}" loading="eager" fetchpriority="high" decoding="async"${pos(d.bg.pos)}>
<div class="ds-hero-scrim" aria-hidden="true"></div>
<div class="ds-wrap ds-hero-grid"><div class="ds-hero-copy">
<nav class="ds-crumbs" aria-label="Breadcrumb"><ol>${crumbs}</ol></nav>
${blank(d.eyebrow) ? '' : `<p class="ds-eyebrow ds-eyebrow--light">${esc(d.eyebrow)}</p>`}
${ratings('dark')}
<h1 class="ds-h1"><span class="pv-d">${esc(d.h1)}</span><span class="pv-m">${esc(d.mobile.h1)}</span></h1>
<p class="ds-hero-lede"><span class="pv-d">${rich(d.lede, base)}</span><span class="pv-m">${esc(d.mobile.lede)}</span></p>
<div class="v2-values pv-m">${d.mobile.values.map(([v, l]) => `<div><b>${esc(v)}</b><span>${esc(l)}</span></div>`).join('')}</div>
<ul class="ds-trust-chips" aria-label="Credentials">${chips}</ul>
<div class="ds-cta-row"><a class="ds-btn ds-btn--light" href="tel:${SITE.tel}">${icon('phone', 18)}<span>Call ${SITE.phone}</span></a>
<a class="ds-btn ds-btn--outline-light" href="#quote">${'<span>' + esc(d.cta) + '</span>'}${icon('arrowRight', 18)}</a></div>
<div class="v2-symptoms pv-m"><p>${esc(d.mobile.symptomsHeading)}</p><ul>${d.mobile.symptoms.map((s) => `<li><a href="tel:${SITE.tel}">${esc(s)}</a></li>`).join('')}</ul></div>
<nav class="v2-jump" aria-label="On this page"><div class="v2-jump-head"><b>${esc(label(d, 'jumpTitle'))}</b><span>${d.jump.length} sections</span></div><ul>${jump}</ul></nav>
</div>
<aside class="ds-form-card" id="quote" aria-labelledby="quote-title">
<h2 class="ds-form-title" id="quote-title">${esc(f.title)}</h2><p class="ds-form-sub">${esc(f.sub)}</p>
<form>
<div class="ds-form-group" role="group" aria-labelledby="quote-g1"><p class="ds-form-group-title" id="quote-g1"><span class="ds-step-dot">1</span>${esc(label(d, 'contactGroup'))}</p>
<div class="ds-form-row"><div class="ds-field"><label for="q-name">Name</label><input id="q-name" autocomplete="name" name="name"></div>
<div class="ds-field"><label for="q-phone">Phone</label><input id="q-phone" type="tel" autocomplete="tel" inputmode="tel" name="phone"></div></div>
<div class="ds-field ds-field--icon"><label for="q-address">Street or cross streets</label><span class="ds-input-icon">${icon('pin', 18)}<input id="q-address" placeholder="e.g. Lincoln &amp; Foster" autocomplete="street-address" name="address"></span></div></div>
<div class="ds-form-group" role="group" aria-labelledby="quote-g2"><p class="ds-form-group-title" id="quote-g2"><span class="ds-step-dot">2</span>${esc(f.group2)}</p>
${sel('q-existing', f.selectLabel, f.selectOptions)}
<div class="ds-field" role="radiogroup" aria-labelledby="q-issue"><span class="ds-label" id="q-issue">${esc(f.question)}</span><div class="ds-chip-options">${chipOpts}</div></div></div>
<button class="ds-btn ds-btn--primary ds-btn--block" type="submit"><span>${esc(label(d, 'submit'))}</span>${icon('arrowRight', 18)}</button>
<p class="ds-form-note">${icon('circleCheck', 16)}<span>${rich(f.reply)}</span></p>
</form></aside>
</div>
${blank(label(d, 'heroCaption')) ? '' : `<span class="ds-pill-caption ds-hero-pill">${esc(label(d, 'heroCaption'))}</span>`}
</header>
<nav class="v2-tabsbar" aria-label="Jump to a section">${d.jump.map(([id, label]) => `<a href="#${id}">${esc(label)}</a>`).join('')}</nav>`;
}

// ---------- Models we service ----------
export function models(d) {
  const cards = d.series.map((s) => `<article class="v2-model"><span class="v2-tag">${esc(s.tag)}</span><h3>${esc(s.name)}</h3><p>${esc(s.summary)}</p>
<ul class="v2-chips">${s.models.map((m) => `<li>${esc(m)}</li>`).join('')}</ul>
<div class="v2-wedo"><b>${esc(label(d, 'modelWork'))}</b><ul class="v2-checks">${s.weDo.map((w) => `<li>${check()}<span>${esc(w)}</span></li>`).join('')}</ul></div></article>`).join('');
  const builds = d.builds.map((b) => `<li><strong>${esc(b.label)}</strong><em>${esc(b.name)}</em><p>${esc(b.text)}</p></li>`).join('');
  return section('models', 'alt', `${head({ eyebrow: d.eyebrow, title: d.title, id: 'models-title', intro: d.intro })}
<div class="v2-track v2-models v2-m-scroll" data-track>${cards}</div>
<div class="v2-track-nav pv-m"><span class="v2-track-hint">${esc(field(d.swipeHint, 'swipeHint'))}</span></div>
<div class="v2-builds"><div class="v2-builds-head"><h3>${esc(d.buildsHeading)}</h3><span class="pv-d">${esc(field(d.buildsNote, 'buildsNote'))}</span></div><ol>${builds}</ol></div>`);
}

// ---------- Services we do: tabs ----------
export function services(d) {
  const tabs = d.groups.map((g, i) => `<button type="button" role="tab" id="svc-tab-${i}" aria-controls="svc-panel-${i}" aria-selected="${!i}"${i ? ' tabindex="-1"' : ''}>${esc(g.name)}<span>${String(g.services.length).padStart(2, '0')}</span></button>`).join('');
  const panels = d.groups.map((g, i) => `<div class="v2-svc-panel" role="tabpanel" id="svc-panel-${i}" aria-labelledby="svc-tab-${i}"${i ? ' hidden' : ''}>
<div class="v2-svc-side"><i>${String(i + 1).padStart(2, '0')}</i><h3>${esc(g.name)}</h3><p>${esc(g.summary)}</p></div>
<ul class="v2-svc-grid">${g.services.map(([t, x]) => `<li class="v2-svc-card"><h4>${esc(t)}</h4><p>${rich(x)}</p></li>`).join('')}</ul></div>`).join('');
  const total = d.groups.reduce((n, g) => n + g.services.length, 0);
  return section('services', '', `${head({ eyebrow: blank(d.eyebrow) ? label(d, 'servicesEyebrow') : `${d.eyebrow} · ${total} in ${d.groups.length} groups`, title: d.title, id: 'services-title', intro: d.intro })}
<div class="v2-tabs" role="tablist" aria-label="Service groups" data-tabs>${tabs}</div>${panels}`);
}

// ---------- Our work: photo track ----------
export function work(d, base) {
  const items = d.photos.map((p) => `<figure><img src="${img(base, p.src)}" alt="${esc(p.alt)}" loading="lazy" decoding="async"${pos(p.pos)}><figcaption>${esc(p.cap)}</figcaption></figure>`).join('');
  return section('work', 'alt', `${head({ eyebrow: d.eyebrow, title: d.title, id: 'work-title', intro: d.intro })}
<div class="v2-scroll v2-work" data-track>${items}</div>${trackNav(field(d.hint, 'workHint'))}`);
}

// ---------- What it costs: variable prices from the pricing artifact ----------
export function pricing(d, prices) {
  const P = prices || {};
  const val = (k) => (P[k] ? { text: P[k], pending: false } : { text: field(d.pendingLabel, 'pendingLabel'), pending: true });
  const fees = d.fees.map((f) => {
    const v = f.value ? { text: f.value, pending: false } : val(f.key);
    return `<div class="v2-fee"><b>${esc(f.label)}</b><strong${v.pending ? ' class="is-pending"' : ''}>${esc(v.text)}</strong>${f.value ? '' : `<small class="v2-terms">${esc(label(d, 'terms'))}</small>`}<p>${esc(f.note)}</p></div>`;
  }).join('');
  const rows = d.rows.map((r, i) => {
    const v = val(r.key);
    return `<div class="v2-table-row${i >= 3 ? ' v2-more' : ''}"><div><b>${esc(r.job)}</b><small>${esc(r.driver)}</small></div><span${v.pending ? ' class="is-pending"' : ''}>${esc(v.text)}</span></div>`;
  }).join('') + (d.rows.length > 3 ? `<button type="button" class="v2-more-btn" data-more>${esc(label(d, 'moreButton').replace('{n}', d.rows.length))}</button>` : '');
  const medians = d.medians.map(([v, l]) => `<div class="v2-median"><strong>${esc(v)}</strong><span>${esc(l)}</span></div>`).join('');
  const inc = d.included;
  return section('pricing', '', `${head({ eyebrow: d.eyebrow, title: d.title, id: 'pricing-title', intro: d.intro, confirm: [...d.fees.filter((f) => !f.value), ...d.rows].some((r) => !P[r.key]) ? d.confirm : '' })}
<div class="v2-track v2-fees v2-m-scroll" data-track>${fees}</div>
<div class="v2-price-grid"><div class="v2-table"><div class="v2-table-head"><span>${esc(d.tableHead[0])}</span><span>${esc(d.tableHead[1])}</span></div>${rows}<p class="v2-terms">${esc(label(d, 'terms'))}</p></div>
<aside class="v2-included">${badge('shieldCheck', 44, 'navy', 20)}<h3>${esc(inc.title)}</h3><ul class="v2-checks">${inc.items.map((t) => `<li>${check()}<span>${esc(t)}</span></li>`).join('')}</ul>
<div class="v2-included-foot"><b>${esc(inc.footTitle)}</b>${rich(inc.foot)}</div>
<a class="ds-btn ds-btn--light ds-btn--block" href="#quote"><span>${esc(inc.cta)}</span>${icon('arrowRight', 18)}</a></aside></div>
<div class="v2-medians" data-track>${medians}</div><p class="v2-source">${esc(d.source)}</p>`);
}

// ---------- Reviews: rating line and a swipe track ----------
export function reviews(d) {
  const g = SITE.google, y = SITE.yelp;
  const cards = d.items.map((r) => `<article class="v2-review"><header><span class="ds-avatar" aria-hidden="true">${esc(r.who[0])}</span><div><b>${esc(r.who)}</b><small>${esc(label(d, 'reviewSource'))}, ${esc(r.date)}</small></div>${google(20)}</header>
${stars(15)}<blockquote>“${esc(r.quote)}”</blockquote><a href="${esc(r.url)}" target="_blank" rel="noreferrer">${esc(label(d, 'reviewLink'))}</a></article>`).join('');
  return section('reviews', '', `${head({ eyebrow: label(d, 'reviewsEyebrow'), title: d.title, id: 'reviews-title', intro: d.intro })}
<div class="v2-rating">${google(30)}<b>${g.rating}</b><span>${stars(16)} ${g.count} Google reviews</span>
<div class="v2-rating-split"><a href="${esc(g.url)}" target="_blank" rel="noopener noreferrer">${google(16)}Google</a><a href="${esc(y.url)}" target="_blank" rel="noopener noreferrer">${yelp(16)}Yelp ${y.rating} · ${y.count}</a></div></div>
<div class="v2-scroll v2-reviews" data-track>${cards}</div>${trackNav(label(d, 'reviewsHint'))}`);
}

// ---------- Where we work ----------
export function areas(d) {
  const q = encodeURIComponent('Highlights Chicago Inc, 5766 N Lincoln Ave, Chicago, IL 60659');
  const regions = d.regions.map(([n, list], i) => `<article class="v2-region"><h3><i>${String(i + 1).padStart(2, '0')}</i>${esc(n)}</h3><p>${esc(list)}</p></article>`).join('');
  return section('areas', 'navy', `${head({ eyebrow: d.eyebrow, title: d.title, id: 'areas-title' }).replace('class="ds-eyebrow"', 'class="ds-eyebrow ds-eyebrow--light"')}
<div class="v2-area-grid"><div class="v2-map"><iframe title="Map of Chicago with the Highlights Chicago shop in West Ridge" loading="lazy" referrerpolicy="no-referrer-when-downgrade" src="https://www.google.com/maps?q=${q}&amp;z=11&amp;output=embed"></iframe></div>
<div class="v2-facts">${d.facts.map(([l, v]) => `<div><b>${esc(l)}</b><p>${esc(v)}</p></div>`).join('')}</div></div>
<div class="v2-track v2-regions v2-m-scroll" data-track>${regions}</div>`);
}

// ---------- Other equipment and brands ----------
export function links(d) {
  const list = (title, items) => `<div><h3>${esc(title)}</h3><ul>${items.map(([t, u]) => `<li><a href="${u}">${esc(t)}${icon('arrowRight', 16)}</a></li>`).join('')}</ul></div>`;
  return section('other', '', `${head({ eyebrow: d.eyebrow, title: d.title, id: 'other-title' })}
<div class="v2-links">${list(d.equipmentTitle, d.equipment)}${list(d.brandsTitle, d.brands)}</div>`);
}
