// Brand pages from the "Brand Pages" tab of the internal content plan, read 2026-10-26.
// Rows keep the sheet's order (highest keyword volume first). The brand is the first word(s) of each title.
import LOGO_INFO from './logos.json' with { type: 'json' };

// Product categories: card photo, hub grouping, and the line each card uses.
export const CATEGORIES = {
  generator: { label: 'Generators', img: 'images/v3/photos/standby-generator.webp', alt: 'Air-cooled standby generator on a pad beside a stone-clad house wall', pos: '62% 50%' },
  transfer: { label: 'Transfer switches', img: 'images/v3/photos/breaker-panel-wall.webp', alt: 'Open breaker panel set into a drywall opening, with its main breaker and branch circuits wired in', pos: '5% 50%' },
  battery: { label: 'Home batteries and backup', img: 'images/v3/photos/solar-battery-install.webp', alt: 'Electrician kneeling at a wall-mounted home battery beside a breaker panel in a basement' },
  solar: { label: 'Solar', img: 'images/services/solar-panel-installation.jpg', alt: 'Installer fitting solar panels on a residential roof' },
  ev: { label: 'EV chargers', img: 'images/services/tesla-and-ev-charger-installation.jpg', alt: 'Electrician mounting a wall charger in a home garage beside a parked car' },
  doorbell: { label: 'Video doorbells and cameras', img: 'images/services/cctv-installation.jpg', alt: 'Security camera mounted on an exterior wall' },
  panel: { label: 'Electrical panels', img: 'images/services/electrical-panel-upgrade.jpg', alt: 'Electrician working inside an open electrical panel' },
  surge: { label: 'Surge protection', img: 'images/services/circuit-breaker-replacement.jpg', alt: 'Electrician working on a row of circuit breakers' },
  ceilingfan: { label: 'Ceiling fans', img: 'images/services/ceiling-fan-installation.jpg', alt: 'Bedroom with a ceiling fan above the bed' },
  bathfan: { label: 'Bathroom exhaust fans', img: 'images/services/light-fixture-installation-and-replacement.jpg', alt: 'Electrician on a ladder working on a ceiling fixture' },
  smoke: { label: 'Smoke and CO alarms', img: 'images/services/smoke-detector-installation-and-wiring.jpg', alt: 'Electrician fitting a hardwired smoke alarm to a ceiling' },
  switch: { label: 'Smart switches and dimmers', img: 'images/services/light-switch-replacement-and-installation.jpg', alt: 'Electrician fitting a wall switch' },
  recessed: { label: 'Recessed lighting', img: 'images/services/recessed-lighting-installation.jpg', alt: 'Electrician fitting a recessed light into a kitchen ceiling' },
  disposal: { label: 'Garbage disposals', img: 'images/services/garbage-disposal-wiring.jpg', alt: 'Kitchen sink and faucet above the cabinet where a disposal is wired' },
};

// Card copy per category. {b} is the brand. Plain, third person, no claims beyond the work itself.
const COPY = {
  generator: '{b} standby and portable generator hookups in Chicago: sizing, transfer switch, permitted wiring and repairs on the electrical side.',
  transfer: '{b} transfer switches wired between the panel and a generator, sized to the service and inspected by the City.',
  battery: '{b} home battery wiring in Chicago: the backup panel, the tie-in at the main panel and the City permit.',
  backup: '{b} home backup connected safely to the house: an inlet, a transfer device and the circuits it can carry.',
  solar: '{b} solar systems in Chicago: the electrical tie-in, inverter faults and the panel capacity a system needs.',
  ev: '{b} charger installation in Chicago garages and driveways: a dedicated circuit, the load check and the City permit.',
  doorbell: '{b} video doorbells and floodlight cameras wired to a working chime transformer or an outdoor box.',
  panel: '{b} panels assessed, repaired where that is the right call, or replaced with a new permitted panel.',
  panelRemoved: '{b} panels replaced with a new permitted panel. Highlights Chicago removes this make and does not install it.',
  surge: '{b} whole-house surge protection mounted at the main panel, on a breaker or beside it.',
  ceilingfan: '{b} ceiling fans hung on a fan-rated box, wired to the wall control, and repaired when the light or motor fails.',
  bathfan: '{b} bathroom exhaust fans wired and vented, including replacements of older, louder units.',
  smoke: '{b} smoke and carbon monoxide alarms replaced or newly hardwired and interconnected.',
  switch: '{b} smart switches and dimmers fitted where the box has the neutral the device needs.',
  recessed: '{b} recessed lights laid out, cut in and wired on the right circuits.',
  disposal: '{b} garbage disposals wired to a switched outlet or hardwired under the sink.',
};

// Brand logos on file: public/images/logos/logo-<slug>.svg|png (sources in SOURCES.md there).
// lib/logos.json lists each file and its width/height ratio; regenerate it after adding a logo.
// A brand without a file shows its name.
const LOGOS = Object.fromEntries(Object.entries(LOGO_INFO).map(([k, v]) => [k, v.file]));
const logoAspect = (slug) => LOGO_INFO[slug]?.aspect ?? null;

// Brand display names where the sheet's spelling differs from the maker's.
const DISPLAY = { 'cutler-hammer': 'Cutler-Hammer', 'minka-aire': 'Minka-Aire', span: 'SPAN', cat: 'Cat' };
const REMOVED = new Set(['federal-pacific', 'zinsco', 'challenger', 'pushmatic', 'sylvania']);

// [brand, primary keyword, sheet title, category]
const ROWS = [
  ['Generac', 'generac generator installation', 'Generac Generator Installation & Repair', 'generator'],
  ['Tesla', 'tesla charger installation', 'Tesla EV Charger Installation & Repair', 'ev'],
  ['Ring', 'ring doorbell installation', 'Ring Video Doorbell & Floodlight Camera Installation & Repair', 'doorbell'],
  ['Tesla', 'tesla powerwall installation', 'Tesla Home Battery Installation & Repair', 'battery'],
  ['Nest', 'nest doorbell installation', 'Nest Video Doorbell & Floodlight Camera Installation & Repair', 'doorbell'],
  ['Kohler', 'kohler generator installation', 'Kohler Generator Installation & Repair', 'generator'],
  ['Blink', 'blink doorbell installation', 'Blink Video Doorbell & Floodlight Camera Installation & Repair', 'doorbell'],
  ['Tesla', 'tesla solar panel installation', 'Tesla Solar Panels Installation & Repair', 'solar'],
  ['Broan', 'broan bathroom fan replacement', 'Broan Bathroom Exhaust Fan Installation & Repair', 'bathfan'],
  ['Challenger', 'challenger breaker replacement', 'Challenger Electrical Panel Replacement & Upgrade', 'panel'],
  ['Federal Pacific', 'federal pacific breaker replacement', 'Federal Pacific Electrical Panel Replacement & Upgrade', 'panel'],
  ['Harbor Breeze', 'harbor breeze ceiling fan installation', 'Harbor Breeze Ceiling Fan Installation & Repair', 'ceilingfan'],
  ['Cummins', 'cummins generator repair near me', 'Cummins Generator Installation & Repair', 'generator'],
  ['Arlo', 'arlo doorbell installation', 'Arlo Video Doorbell & Floodlight Camera Installation & Repair', 'doorbell'],
  ['Hunter', 'hunter ceiling fan installation', 'Hunter Ceiling Fan Installation & Repair', 'ceilingfan'],
  ['Eufy', 'eufy doorbell installation', 'Eufy Video Doorbell & Floodlight Camera Installation & Repair', 'doorbell'],
  ['Murray', 'murray breaker replacement', 'Murray Electrical Panel Replacement & Upgrade', 'panel'],
  ['Rivian', 'rivian charger installation', 'Rivian EV Charger Installation & Repair', 'ev'],
  ['Zinsco', 'zinsco breaker replacement', 'Zinsco Electrical Panel Replacement & Upgrade', 'panel'],
  ['Westinghouse', 'westinghouse generator repair near me', 'Westinghouse Generator Installation & Repair', 'generator'],
  ['ChargePoint', 'chargepoint ev charger installation', 'ChargePoint EV Charger Installation & Repair', 'ev'],
  ['Champion', 'champion generator repair near me', 'Champion Generator Installation & Repair', 'generator'],
  ['EcoFlow', 'ecoflow installation', 'EcoFlow Home Backup System Installation & Repair', 'backup'],
  ['Ford', 'ford charger installation', 'Ford EV Charger Installation & Repair', 'ev'],
  ['Cutler Hammer', 'cutler hammer breaker replacement', 'Cutler Hammer Electrical Panel Replacement & Upgrade', 'panel'],
  ['Casablanca', 'casablanca fan repair', 'Casablanca Ceiling Fan Installation & Repair', 'ceilingfan'],
  ['SunPower', 'sunpower solar repair', 'SunPower Solar Panels Installation & Repair', 'solar'],
  ['Span', 'span panel installation', 'Span Electrical Panel Replacement & Upgrade', 'panel'],
  ['First Alert', 'first alert smoke detector installation', 'First Alert Smoke & CO Detector Installation & Replacement', 'smoke'],
  ['Enphase', 'enphase inverter repair', 'Enphase Solar Panels Installation & Repair', 'solar'],
  ['Hampton Bay', 'hampton bay ceiling fan installation', 'Hampton Bay Ceiling Fan Installation & Repair', 'ceilingfan'],
  ['Cat', 'cat generator repair', 'Cat Generator Installation & Repair', 'generator'],
  ['Wallbox', 'wallbox ev charger installation', 'Wallbox EV Charger Installation & Repair', 'ev'],
  ['Emporia', 'emporia ev charger installation', 'Emporia EV Charger Installation & Repair', 'ev'],
  ['InSinkErator', 'insinkerator garbage disposal installation', 'InSinkErator Garbage Disposal Installation & Repair', 'disposal'],
  ['Waste King', 'waste king garbage disposal installation', 'Waste King Garbage Disposal Installation & Repair', 'disposal'],
  ['Lutron', 'lutron dimmer installation', 'Lutron Smart Switch & Dimmer Installation & Repair', 'switch'],
  ['GE', 'ge breaker replacement', 'GE Electrical Panel Replacement & Upgrade', 'panel'],
  ['Enphase', 'enphase battery installation', 'Enphase Home Battery Installation & Repair', 'battery'],
  ['Eaton', 'eaton breaker replacement', 'Eaton Electrical Panel Replacement & Upgrade', 'panel'],
  ['Briggs & Stratton', 'briggs & stratton generator installation', 'Briggs & Stratton Generator Installation & Repair', 'generator'],
  ['Firman', 'firman generator repair near me', 'Firman Generator Installation & Repair', 'generator'],
  ['Square D', 'square d breaker replacement', 'Square D Electrical Panel Replacement & Upgrade', 'panel'],
  ['Honeywell', 'honeywell generator installation', 'Honeywell Generator Installation & Repair', 'generator'],
  ['Sylvania', 'sylvania electrical panel replacement', 'Sylvania Electrical Panel Replacement & Upgrade', 'panel'],
  ['Siemens', 'siemens breaker replacement', 'Siemens Electrical Panel Replacement & Upgrade', 'panel'],
  ['Kasa', 'kasa smart switch installation', 'Kasa Smart Switch & Dimmer Installation & Repair', 'switch'],
  ['Square D', 'square d whole house surge protector installation', 'Square D Whole-House Surge Protector Installation & Repair', 'surge'],
  ['SolarEdge', 'solaredge inverter repair', 'SolarEdge Solar Panels Installation & Repair', 'solar'],
  ['Generac', 'generac pwrcell installation', 'Generac Home Battery Installation & Repair', 'battery'],
  ['DuroMax', 'duromax generator repair near me', 'DuroMax Generator Installation & Repair', 'generator'],
  ['Moen', 'moen garbage disposal installation', 'Moen Garbage Disposal Installation & Repair', 'disposal'],
  ['Generac', 'generac transfer switch installation', 'Generac Transfer Switch Installation & Repair', 'transfer'],
  ['Pushmatic', 'pushmatic electrical panel replacement', 'Pushmatic Electrical Panel Replacement & Upgrade', 'panel'],
  ['Eaton', 'eaton whole house surge protector installation', 'Eaton Whole-House Surge Protector Installation & Repair', 'surge'],
  ['Leviton', 'leviton switch installation', 'Leviton Smart Switch & Dimmer Installation & Repair', 'switch'],
  ['Siemens', 'siemens surge protector installation', 'Siemens Whole-House Surge Protector Installation & Repair', 'surge'],
  ['Reliance', 'reliance transfer switch installation', 'Reliance Transfer Switch Installation & Repair', 'transfer'],
  ['Juno', 'juno recessed lighting installation', 'Juno Recessed Lighting Installation & Repair', 'recessed'],
  ['Autel', 'autel ev charger installation', 'Autel EV Charger Installation & Repair', 'ev'],
  ['Minka Aire', 'minka aire ceiling fan repair', 'Minka Aire Ceiling Fan Installation & Repair', 'ceilingfan'],
  ['Fanimation', 'fanimation ceiling fan installation', 'Fanimation Ceiling Fan Installation & Repair', 'ceilingfan'],
  ['Westinghouse', 'westinghouse electrical panel replacement', 'Westinghouse Electrical Panel Replacement & Upgrade', 'panel'],
  ['Panasonic', 'panasonic bathroom fan installation', 'Panasonic Bathroom Exhaust Fan Installation & Repair', 'bathfan'],
  ['Enphase', 'enphase ev charger installation', 'Enphase EV Charger Installation & Repair', 'ev'],
  ['Kidde', 'kidde smoke detector installation', 'Kidde Smoke & CO Detector Installation & Replacement', 'smoke'],
  ['BRK', 'brk smoke detector replacement', 'BRK Smoke & CO Detector Installation & Replacement', 'smoke'],
  ['Nest', 'nest protect smoke detector replacement', 'Nest Smoke & CO Detector Installation & Replacement', 'smoke'],
  ['Halo', 'halo recessed lighting installation', 'Halo Recessed Lighting Installation & Repair', 'recessed'],
];

// The first written pages, keyed by the sheet's primary keyword, with their Sanity slugs (project x6yq02oi,
// type brandServiceLandingPageTemplate). The site itself does not rely on this list: a page counts as live
// when it is published in Sanity (see buildBrands). This only maps those slugs back to their sheet rows.
export const KNOWN_SLUGS = {
  'generac generator installation': 'generac-generator-installation-repair',
  'tesla charger installation': 'tesla-ev-charger-installation-repair',
  'ring doorbell installation': 'ring-video-doorbell-installation-repair',
  'tesla powerwall installation': 'tesla-home-battery-installation-repair',
  'nest doorbell installation': 'nest-video-doorbell-installation-repair',
  'kohler generator installation': 'kohler-generator-installation-repair',
  'tesla solar panel installation': 'tesla-solar-panels-installation-repair',
  'chargepoint ev charger installation': 'chargepoint-ev-charger-installation-repair',
  'ford charger installation': 'ford-ev-charger-installation-repair',
  'enphase ev charger installation': 'enphase-ev-charger-installation-repair',
  'briggs & stratton generator installation': 'briggs-stratton-generator-installation-repair',
};

// Brand pages live at /brands/<brand>/<page> on highlightschicago.com (the app's basePath).
export const BRANDS_PATH = '/brands';
export const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
export const brandPath = (brandSlug) => `${BRANDS_PATH}/${brandSlug}`;
export const pagePath = (brandSlug, pageSlug) => `${BRANDS_PATH}/${brandSlug}/${pageSlug}`;

// Short card title: the sheet title without the brand at the front.
const shortTitle = (title, brand) => title.slice(brand.length).trim();

// Words that tie a Sanity slug to a sheet row's equipment when the slug is not in KNOWN_SLUGS.
const CAT_WORDS = {
  generator: ['generator'], transfer: ['transfer'], battery: ['battery', 'powerwall', 'backup', 'pwrcell'], solar: ['solar', 'inverter'],
  ev: ['charger', 'ev-'], doorbell: ['doorbell', 'camera'], panel: ['panel', 'breaker'], surge: ['surge'], ceilingfan: ['ceiling-fan', 'fan'],
  bathfan: ['exhaust', 'bath'], smoke: ['smoke', 'detector', 'alarm'], switch: ['switch', 'dimmer'], recessed: ['recessed'], disposal: ['disposal'],
};

// A brand whose pages are all live, then a brand with some live pages, then the rest.
export const liveTier = (b) => (b.liveCount === 0 ? 2 : b.liveCount === b.services.length ? 0 : 1);

/**
 * Every brand from the sheet, with the pages published in Sanity marked live and linked.
 * @param {{brand: string, slug: string, title?: string, service?: string}[]} published published brand pages
 */
export function buildBrands(published = []) {
  const map = new Map();
  ROWS.forEach(([brand, keyword, title, cat], row) => {
    const slug = slugify(brand);
    if (!map.has(slug)) map.set(slug, { slug, row, name: DISPLAY[slug] || brand, sheetName: brand, logo: LOGOS[slug] || null, logoAspect: logoAspect(slug), removed: REMOVED.has(slug), services: [] });
    const b = map.get(slug);
    const copyKey = cat === 'panel' && b.removed ? 'panelRemoved' : cat;
    const category = cat === 'backup' ? 'battery' : cat;
    b.services.push({
      title, keyword, cat: category, row,
      slug: KNOWN_SLUGS[keyword] || slugify(title),
      live: false, href: null,
      short: shortTitle(title, brand).replace(/^Electrical Panel/, 'Panel'),
      blurb: COPY[copyKey].replace('{b}', b.name),
    });
  });
  // Mark each published page on its sheet row: by known slug first, then by brand and equipment word.
  for (const doc of published) {
    if (!doc?.slug || !doc?.brand) continue;
    const brandSlug = slugify(doc.brand) === 'briggs-stratton' ? 'briggs-and-stratton' : slugify(doc.brand);
    let b = map.get(brandSlug);
    let svc = b?.services.find((s) => s.slug === doc.slug)
      || b?.services.find((s) => !s.live && (CAT_WORDS[s.cat] || []).some((w) => doc.slug.includes(w)));
    if (!b) {
      b = { slug: brandSlug, row: ROWS.length, name: doc.brand, sheetName: doc.brand, logo: LOGOS[brandSlug] || null, logoAspect: logoAspect(brandSlug), removed: false, services: [] };
      map.set(brandSlug, b);
    }
    if (!svc) {
      const cat = Object.keys(CAT_WORDS).find((k) => CAT_WORDS[k].some((w) => doc.slug.includes(w))) || 'generator';
      svc = { title: doc.title || `${doc.brand} ${doc.service || ''}`.trim(), keyword: doc.slug, cat, row: ROWS.length, short: doc.service || doc.title || doc.slug, blurb: (COPY[cat] || COPY.generator).replace('{b}', doc.brand) };
      b.services.push(svc);
    }
    svc.slug = doc.slug;
    svc.live = true;
    svc.href = pagePath(brandSlug, doc.slug);
  }
  const brands = [...map.values()];
  // Live pages first; the sheet order (keyword volume) is kept inside each tier. Array.prototype.sort is stable.
  for (const b of brands) {
    b.services.sort((x, y) => Number(y.live) - Number(x.live));
    b.liveCount = b.services.filter((s) => s.live).length;
  }
  return brands.sort((a, b) => liveTier(a) - liveTier(b) || a.row - b.row);
}

// The category a brand is filed under on the hub: its first (highest-volume) service.
export const brandCategory = (b) => b.services[0].cat;
export const HUB_ORDER = ['generator', 'transfer', 'battery', 'solar', 'ev', 'doorbell', 'panel', 'surge', 'ceilingfan', 'bathfan', 'smoke', 'switch', 'recessed', 'disposal'];
