// Generac Generator Installation & Repair, v2: the senior's brand-page structure (Paper "city new",
// American Standard furnace page) in the Highlights design system, with a short scroll depth.
// Copy is reused from the verified v1 page (generac.mjs); models come from generac.com (read 2026-10-26);
// service names come from the Brand Pages sheet's Generac keywords; prices wait for the pricing artifact.
import { head, dsHeader, dsFooter, previewBar, scripts } from '../lib/ui.mjs';
import * as S from '../lib/sections.mjs';
import * as V from '../lib/sections-v2.mjs';
import { SITE } from '../content/site.mjs';
import { PRICING } from '../content/pricing.mjs';
import { PAGE as V1 } from './generac.mjs';

const base = '../../../';
const L3_PANEL = `${SITE.live}/services/electrical-panel-upgrade/chicago`;
const YELP = "Photo from Highlights Chicago's Yelp page";
const cluster = (slug) => `${base}brands/${slug}/index.html`;

const JUMP = [
  ['models', 'Models'], ['services', 'Services'], ['work', 'Recent work'], ['pricing', 'What it costs'],
  ['trust', 'Who does the work'], ['reviews', 'Reviews'], ['process', 'The process'], ['areas', 'Areas'],
  ['faq', 'Questions'], ['other', 'Other brands'],
];

export const PAGE = {
  meta: V1.meta,

  hero: {
    ...V1.hero,
    bg: { src: 'images/v3/photos/tech-panel-work.webp', alt: 'Electrician in a Highlights Chicago hard hat working on breakers in an open panel', pos: '60% 40%' },
    jump: JUMP,
    form: { ...V1.hero.form, options: V1.hero.form.options },
    mobile: {
      h1: 'Generac Generator Installation & Repair',
      lede: 'Load calculation, transfer switch, permitted feeder and a tested startup, from a City of Chicago licensed electrical contractor.',
      values: [['Free', 'Estimates'], ['24/7', 'Open every day'], ['Top 13%', 'Chicago permit volume']],
      symptomsHeading: 'What is the Generac doing?',
      symptoms: ['Won’t start', 'Runs, house dark', 'Red alarm light', 'New install', 'Maintenance'],
    },
  },

  models: {
    eyebrow: 'Generac models serviced · 4 groups',
    title: 'Every Generac, and the work each one needs',
    intro: 'Find the series on the label on the unit. Each one is wired, sized and serviced its own way.',
    swipeHint: 'Swipe for XG Protector, PWRcell and older units',
    series: [
      { tag: 'Most Chicago homes', name: 'Guardian', summary: 'Guardian Series standby units such as the 14 and 18 kW; Generac’s home standby range runs from 10 to 28 kW.', models: ['Guardian 14 kW', 'Guardian 18 kW', '10 to 26 kW Wi-Fi', '10 to 28 kW cellular'], weDo: ['Load calculation under NEC Article 702 to pick the size', 'Transfer switch matched to the panel, feeder in conduit', 'Alarms traced: Overcrank, Low Oil Pressure, a weak battery'] },
      { tag: 'Largest loads', name: 'XG Protector', summary: 'Generac’s XG Protector line runs from 25 to 80 kW, in single-phase 120/240 V or three-phase versions.', models: ['25 to 48 kW', '60 and 80 kW', 'Three-phase'], weDo: ['Size the unit to the full house load, or pair it with load modules', 'Service-rated switch at the meter, with ComEd disconnecting the service', 'Gas pipe size checked against the spec sheet’s full-load figure'] },
      { tag: 'Battery backup', name: 'PWRcell', summary: 'Generac’s battery storage system, often paired with solar: silent, with no gas line and no pad.', models: ['Solar battery storage'], weDo: ['Wire the battery and its backup panel at the main panel', 'Pick the circuits the battery carries in an outage', 'Price it side by side with a standby unit on the same panel'] },
      { tag: 'Older and inherited', name: 'Older units', summary: 'A Generac that came with the house, or one that no longer fits the load after central air or an EV charger.', models: ['Any model on the label'], weDo: ['Check the City permit record for the original hookup', 'Test the transfer switch, the generator breaker and the feeder', 'Compare the unit’s size with the house as it is now'] },
    ],
    buildsHeading: 'Same Generac, different hookup. What changes on the visit.',
    buildsNote: 'Set by the panel and the load calculation',
    builds: [
      { label: 'ATS', name: 'Automatic transfer switch', text: 'Beside the main panel, carrying chosen circuits or the whole panel. Generac sells them from 100 to 800 amps.' },
      { label: 'Service-rated', name: 'Switch at the meter', text: 'Becomes the main disconnect ahead of the panel, so the whole house transfers at once. ComEd disconnects the service to fit it.' },
      { label: 'Load modules', name: 'Load management', text: 'Big loads such as central air take turns, so a smaller Generac can carry a whole house.' },
    ],
  },

  services: {
    eyebrow: 'Generac services',
    title: 'Every Generac service Highlights Chicago does',
    intro: 'From a new standby hookup to a unit that stayed off in a storm. The electrical side, permitted and inspected.',
    groups: [
      { name: 'Installation', summary: 'From the load calculation to a unit that starts on its own.', services: [
        ['New Generac standby installation', 'Load calculation, pad, transfer switch, permitted feeder and a tested startup.'],
        ['Generac transfer switch installation', 'A switch matched to the panel, on its own or with a new unit.'],
        ['Generator wiring and feeder', 'Conduit from the pad to the switch, through brick or under a walk.'],
        ['Gas line coordination', 'The gas line is a separate trade on its own permit; the electrical work is scheduled around it.'],
      ] },
      { name: 'Repair & alarms', summary: 'Faults traced on the electrical side, from the controller to the switch.', services: [
        ['Won’t start in an outage', 'A weak battery, the controller left out of AUTO, a closed gas valve, or an Overcrank alarm.'],
        ['Runs, but the house stays dark', 'The transfer switch did not transfer, or the generator’s own breaker is off.'],
        ['Battery and charger circuit', 'The starting battery and the circuit that keeps it charged.'],
        ['Mobile Link shows offline', 'Lost Wi-Fi at the pad or a changed router password; the unit itself may be fine.'],
      ] },
      { name: 'Maintenance', summary: 'The electrical side of the schedule in Generac’s owner’s manual.', services: [
        ['Generac maintenance visit', 'Battery charger circuit, transfer switch and wiring, on Generac’s schedule.'],
        ['Weekly exercise reset', 'The exercise day and time set again on the controller, for example after a battery change.'],
        ['Winter readiness', 'Generac’s cold-weather kit adds battery and oil heaters for single-digit starts.'],
        ['A Generac that came with the house', 'Permit record, switch, breaker and feeder checked before anyone relies on it.'],
      ] },
      { name: 'Batteries & upgrades', summary: 'When the panel or the backup plan needs more than a generator.', services: [
        ['Generac PWRcell battery', 'The battery tie-in at the main panel, with its own backup circuits.'],
        ['Service or panel upgrade', `When the panel is full or obsolete, the upgrade and the hookup are one job. See [panel upgrades](${L3_PANEL}).`],
        ['Portable generator inlet', 'An inlet box and a transfer switch or listed interlock, so only one source feeds the house.'],
      ] },
    ],
  },

  work: {
    eyebrow: 'Recent work · Chicago',
    title: 'Recent Highlights Chicago work',
    intro: V1.gallery.lede,
    hint: 'Swipe or use the arrows to see all five',
    photos: V1.gallery.photos,
  },

  pricing: {
    eyebrow: 'What it costs · variable prices',
    title: 'What Generac work costs in Chicago',
    intro: 'Prices move with the unit size, the switch type and the run from the pad to the panel, so each one is a range.',
    confirm: 'CONFIRM: the prices still marked pending',
    fees: [
      { label: 'Estimate visit', value: 'Free', note: 'Highlights Chicago gives free estimates. A price for one house needs a look at the panel, the meter and the spot.' },
      { key: 'install', label: 'New Generac standby install', note: 'Median reported construction value on 161 City generator permits, not a quote. The model size, the switch and the feeder length move it.' },
      { key: 'repairVisit', label: 'Generac repair visit', note: 'The typical small electrical job on City permits. We find what’s wrong first and confirm your price before any work.' },
    ],
    tableHead: ['Common Generac jobs', 'Price'],
    rows: [
      { key: 'ats', job: 'Automatic transfer switch on its own', driver: 'Switch rating, service size and where it mounts' },
      { key: 'loadModules', job: 'Load management modules', driver: 'How many large loads are managed, and where they sit' },
      { key: 'replace', job: 'Replacing an existing Generac', driver: 'New size against old, and whether the switch and pad can stay' },
      { key: 'battery', job: 'Generac PWRcell battery', driver: 'Battery capacity and the circuits it carries' },
      { key: 'inlet', job: 'Portable generator inlet and interlock', driver: 'Inlet location and the interlock kit for the panel' },
    ],
    included: {
      title: 'With every price',
      items: ['A free estimate before any work', 'Highlights Chicago as contractor of record on the City permit', 'Credit card, Zelle, Venmo, PayPal, Cash App or cryptocurrency', 'A military discount'],
      footTitle: 'Incentives',
      foot: 'Neither IRS home energy credit page lists a standby generator (read October 26, 2026). [IRS: Residential Clean Energy Credit](https://www.irs.gov/credits-deductions/residential-clean-energy-credit)',
      cta: 'Get a price',
    },
    medians: [['$15,000', 'median, generator permits (161 with a cost)'], ['$4,700', 'median, 200-amp service upgrade (2,862 with a cost)'], ['$10,000', 'median, 400-amp or larger service (382 with a cost)']],
    source: 'Medians are the reported construction value for the whole project on City of Chicago electrical permits, August 2024 to August 2026, not a quote. Source: City of Chicago Building Permits.',
  },

  areas: {
    eyebrow: 'Where Highlights Chicago works · 4 areas',
    title: 'All of Chicago, plus Evanston and Palatine',
    facts: [['Coverage', 'Every Chicago neighborhood, plus Evanston and Palatine'], ['Hours', 'Open 24 hours, 7 days'], ['The shop', '5766 N Lincoln Ave, in West Ridge'], ['Permits', 'Highlights Chicago is the contractor of record on the City permit']],
    regions: [
      ['North Side', 'Lincoln Square, North Park, Albany Park, Ravenswood, Uptown, Rogers Park, Lakeview.'],
      ['Northwest and West', 'Logan Square, Jefferson Park, Wicker Park.'],
      ['Suburbs', 'Evanston and Palatine.'],
      ['Not listed?', 'Inside the city, Highlights Chicago covers it. Call to check.'],
    ],
  },

  faq: { title: 'Generac generators in Chicago, answered', items: [0, 1, 2, 7, 5, 8].map((i) => V1.faq.items[i]) },

  links: {
    eyebrow: 'Not a Generac generator?',
    title: 'Other Generac equipment and generator brands',
    equipmentTitle: 'Other Generac equipment',
    equipment: [['Generac home battery (PWRcell)', cluster('generac')], ['Generac transfer switch installation', cluster('generac')], ['All Generac services', cluster('generac')]],
    brandsTitle: 'Generator work on other brands',
    brands: [['Kohler generators', cluster('kohler')], ['Cummins generators', cluster('cummins')], ['Champion generators', cluster('champion')], ['Briggs & Stratton generators', cluster('briggs-and-stratton')]],
  },
};

export function generacV2Page() {
  const p = PAGE;
  return `${head({ title: `${p.meta.title} | Highlights Chicago`, description: p.meta.description, canonical: p.meta.canonical, base, extraHead: `<link rel="stylesheet" href="${base}assets/css/brand-v2.css">\n` })}
<body class="inter_c15e96cb-module__0bjUvq__variable">
${previewBar(base)}
<div class="ds v2 space_grotesk_65550e9f-module__clzVXG__variable">
${dsHeader(base, 'brands', 'Book Now')}
<main id="main">
${V.hero(p.hero, base)}
${V.models(p.models)}
${V.services(p.services)}
${V.work(p.work, base)}
${V.pricing(p.pricing, PRICING.generac)}
${S.trust(V1.trust, base)}
${V.reviews({ title: 'What Chicago customers say', intro: 'Short excerpts from public Google reviews about outages, storms and repairs.', items: V1.reviews.items })}
${S.process(V1.process)}
${V.areas(p.areas)}
${S.faq(p.faq, base)}
${S.closing({ ...V1.closing, ready: V1.closing.ready.slice(0, 4) }, base)}
${V.links(p.links)}
</main>
${dsFooter(base)}
${S.callbar('Book a Generac visit')}
</div>
${scripts(base)}
</body>
</html>`;
}
