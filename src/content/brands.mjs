// Brand pages from the "Brand Pages" tab of the internal content plan, read 2026-10-26.
// Rows keep the sheet's order (highest keyword volume first). The brand is the first word(s) of each title.

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

// Official logos on file (official wordmarks with provenance). Others show the name until a logo is sourced.
const LOGOS = {
  tesla: 'logo-tesla.svg', chargepoint: 'logo-chargepoint.svg', eaton: 'logo-eaton.svg', emporia: 'logo-emporia.png',
  enphase: 'logo-enphase.svg', ge: 'logo-ge.svg', leviton: 'logo-leviton.svg', siemens: 'logo-siemens.svg',
  solaredge: 'logo-solaredge.svg', 'square-d': 'logo-square-d.svg', wallbox: 'logo-wallbox.png',
};

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

// Pages built so far. Every other card shows "Page in progress".
export const BUILT = { 'generac-generator-installation': 'brands/generac/generac-generator-installation/' };

const slugify = (s) => s.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Short card title: the sheet title without the brand at the front.
const shortTitle = (title, brand) => title.slice(brand.length).trim();

export const BRANDS = (() => {
  const map = new Map();
  for (const [brand, keyword, title, cat] of ROWS) {
    const slug = slugify(brand);
    if (!map.has(slug)) map.set(slug, { slug, name: DISPLAY[slug] || brand, sheetName: brand, logo: LOGOS[slug] || null, removed: REMOVED.has(slug), services: [] });
    const b = map.get(slug);
    const svcSlug = slugify(keyword.replace(/ near me$/, ''));
    const copyKey = cat === 'panel' && b.removed ? 'panelRemoved' : cat;
    const category = cat === 'backup' ? 'battery' : cat;
    b.services.push({
      title, keyword, cat: category,
      slug: svcSlug,
      short: shortTitle(title, brand).replace(/^Electrical Panel/, 'Panel'),
      blurb: COPY[copyKey].replace('{b}', b.name),
      path: BUILT[svcSlug] || null,
    });
  }
  return [...map.values()];
})();

// The category a brand is filed under on the hub: its first (highest-volume) service.
export const brandCategory = (b) => b.services[0].cat;
export const HUB_ORDER = ['generator', 'transfer', 'battery', 'solar', 'ev', 'doorbell', 'panel', 'surge', 'ceilingfan', 'bathfan', 'smoke', 'switch', 'recessed', 'disposal'];
