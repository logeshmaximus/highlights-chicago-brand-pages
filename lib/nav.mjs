// Menu data for the site header: the Services menu. Brands is a plain link to the brands page.
// Each service is [label, path under /services, live]. The menu shows live pages only: a planned page
// stays in this list with 0 and appears in the menu once it is published and set to 1 with its URL.
const LIVE_SITE = 'https://www.highlightschicago.com';
const svc = (path) => `${LIVE_SITE}/services/${path}`;

// Services: the first design's four groups, top pages by search volume first.
// Live status checked against highlightschicago.com on 2026-11-13 (12 pages went live after 2026-11-05).
const SERVICES = [
  { name: 'Electrical', items: [
    ['Electrical Repair', 'electrical-wiring/electrical-repair', 1],
    ['GFCI Outlets', 'electrical-outlets/gfci-outlet-installation', 1],
    ['Circuit Breaker Replacement', 'circuit-protection/circuit-breaker-replacement', 1],
    ['Panel Upgrade', 'panel-upgrades/electrical-panel-upgrade', 1],
    ['Whole-House Surge Protector', 'circuit-protection/whole-house-surge-protector', 1],
    ['Outlet Repair & Replacement', 'electrical-outlets/outlet-replacement-near-me', 1],
    ['Fire Alarm Systems', 'life-safety/fire-alarm-installation', 1],
    ['Panel Replacement', 'circuit-protection/electrical-panel-replacement-near-me', 1],
    ['Electrical Troubleshooting', 'electrical-wiring/electrical-troubleshooting', 1],
    ['Smoke Detectors', 'life-safety/smoke-detector-installation-and-wiring', 1],
    ['Electrical Safety Inspection', 'electrical-wiring/electrical-inspection-near-me', 1],
    ['Outlet Installation', 'electrical-outlets/electrical-outlet-installation', 1],
    ['Panel Repair & Maintenance', 'circuit-protection/breaker-box-and-panel-repair', 1],
    ['Panel Installation', 'panel-upgrades/electrical-panel-installation-near-me', 1],
    ['Carbon Monoxide Detectors', 'life-safety/carbon-monoxide-detector-installation', 1],
    ['Whole-House Rewiring', 'electrical-wiring/whole-house-rewiring-near-me', 1],
    ['Wiring Repair', 'electrical-wiring/electrical-wiring-and-repair-services', 1],
    ['Grounding & Bonding', 'circuit-protection/grounding-and-bonding', 1],
    ['100 to 200 Amp Service Upgrade', 'panel-upgrades/electrical-service-upgrade-near-me', 1],
    ['Light Switches', 'electrical-outlets/light-switch-replacement-and-installation', 1],
    ['New Construction Wiring', 'electrical-wiring/new-construction-electrician-near-me', 1],
    ['Infrared / Thermal Inspection', 'solar-energy/infrared-electrical-inspection', 1],
    ['Dimmer Switches', 'electrical-outlets/dimmer-switch-installation-and-replacement', 1],
    ['New & Dedicated Circuits', 'dedicated-circuit-installation-near-me', 0],
    ['Garage Wiring', 'garage-wiring-near-me', 0],
    ['Electrical Permits', 'electrical-permits-near-me', 0],
    ['Code Violation Correction', 'electrical-code-compliance-near-me', 0],
    ['Smart Switches & Motion Sensors', 'smart-switch-installation-near-me', 0],
    ['Remodel Wiring', 'remodel-electrical-wiring-near-me', 0],
    ['Junction Boxes', 'junction-box-installation-near-me', 0],
    ['Electric Meter & Meter Socket', 'meter-socket-replacement-near-me', 0],
    ['Furnace & AC Electrical', 'furnace-and-ac-electrical-near-me', 0],
  ] },
  { name: 'EV Charging', items: [
    ['Home & Tesla Charger Installation', 'ev-charging/tesla-and-ev-charger-installation', 1],
    ['Commercial & Multi-Unit EV Charging', 'ev-charging/commercial-ev-charger-installation-near-me', 1],
    ['EV Charger Repair & Maintenance', 'ev-charging/ev-charger-repair-near-me', 1],
  ] },
  { name: 'Lighting', items: [
    ['Outdoor & Security Lighting', 'outdoor-lighting/outdoor-lighting-installation', 1],
    ['Recessed Lighting', 'interior-lighting/recessed-lighting-installation', 1],
    ['Landscape Lighting', 'outdoor-lighting/landscape-lighting-installation', 1],
    ['Light Fixtures', 'interior-lighting/light-fixture-installation-and-replacement', 1],
    ['Chandeliers', 'interior-lighting/chandelier-installation', 1],
    ['LED Retrofit & Upgrades', 'interior-lighting/led-retrofit', 1],
    ['Under-Cabinet Lighting', 'interior-lighting/under-cabinet-lighting-installation-near-me', 1],
    ['Smart Lighting & Controls', 'smart-lighting-installation-near-me', 0],
    ['Track Lighting', 'track-lighting-installation-near-me', 0],
    ['Pendant Lighting', 'pendant-light-installation-near-me', 0],
    ['Wall Sconces', 'wall-sconce-installation-near-me', 0],
  ] },
  { name: 'Commercial', items: [
    ['Commercial Lighting', 'outdoor-lighting/commercial-lighting-installation-near-me', 1],
    ['Facility Electrical Maintenance', 'electrical-wiring/electrical-maintenance-services-near-me', 1],
    ['Parking Lot & Garage Lighting', 'outdoor-lighting/parking-lot-lighting-repair-and-installation', 1],
    ['Emergency Lighting', 'outdoor-lighting/emergency-lighting-services-and-maintenance', 1],
    ['Exit Signs & Egress Lighting', 'exit-sign-installation-near-me', 0],
    ['Warehouse & High-Bay Lighting', 'warehouse-lighting-installation-near-me', 0],
    ['Industrial Machinery & Motor Controls', 'industrial-machinery-wiring-near-me', 0],
    ['Sign & Storefront Lighting', 'sign-lighting-installation-near-me', 0],
    ['Restaurant & Kitchen Wiring', 'restaurant-electrician-near-me', 0],
    ['Tenant Build-Out & Office Electrical', 'office-electrical-installation-near-me', 0],
  ] },
];

// Only live pages reach the menu, in search-volume order.
export const SERVICES_MENU = {
  key: 'services',
  label: 'Services',
  href: `${LIVE_SITE}/services`,
  allLabel: 'View all services',
  columns: SERVICES
    .map((c) => ({ name: c.name, items: c.items.filter(([, , live]) => live).map(([n, p]) => [n, svc(p)]) }))
    .filter((c) => c.items.length),
};
