// Service landing page: "Generac Generator Installation & Repair" (first title on the Brand Pages sheet).
// Page type: L4-brand under the L3 generator-installation page. Facts: verified `live` facts from profile.json only.
import { head, dsHeader, dsFooter, previewBar, scripts, esc } from '../lib/ui.mjs';
import * as S from '../lib/sections.mjs';
import { SITE } from '../content/site.mjs';

const base = '../../../';
const L3 = `${SITE.live}/services/generator-installation/chicago`;
const L3_REPAIR = `${SITE.live}/services/generator-repair/chicago`;
const L3_BATTERY = `${SITE.live}/services/solar-battery-installation/chicago`;
const L3_PANEL = `${SITE.live}/services/electrical-panel-upgrade/chicago`;
const YELP = "Photo from Highlights Chicago's Yelp page";

const R = {
  peyton: ['Peyton H.', 'Jul 2024', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSUNidk9HX2JREAE!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CIHM0ogKEICAgICbvOG_bQ%7C%7C?hl=en'],
  nissa: ['Nissa B.', 'Jul 2024', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnSURyMC1PV2RnEAE!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CIHM0ogKEICAgIDr0-OWdg%7C%7C?hl=en'],
  keith: ['Keith G.', 'Jan 2024', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VJQ0FnSURObllYVG9RRRAB!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CIHM0ogKEICAgIDNnYXToQE%7C%7C?hl=en'],
  nicholas: ['Nicholas D.', 'May 2025', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VNZjNsYmJBajhQR2ZREAE!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CIHM0ogKEMf3lbbAj8PGfQ%7C%7C?hl=en'],
  loretta: ['Loretta W.', 'Sep 2025', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT2s5MWNsRkNVa2cwWW5kb1RuRk5jMWhSVlV4a1ZYYxAB!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CAIQACodChtycF9oOk91clFCUkg0YndoTnFNc1hRVUxkVXc%7C%7C?hl=en'],
  cee: ['Cee K.', 'Apr 2025', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChZDSUhNMG9nS0VJQ0FnTURJaGUyQ2FBEAE!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CIHM0ogKEICAgMDIhe2CaA%7C%7C?hl=en'],
  jose: ['Jose G.', 'Feb 2026', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sCi9DQUlRQUNvZENodHljRjlvT25aS1UwTllNMkZxVnpoS05UVkNWMmRFV1dOaGVXYxAB!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CAIQACodChtycF9oOnZKU0NYM2FqVzhKNTVCV2dEWWNheWc%7C%7C?hl=en-US'],
  david: ['David K.', 'May 2025', 'https://www.google.com/maps/reviews/data=!4m8!14m7!1m6!2m5!1sChdDSUhNMG9nS0VNSzgtNnlodHFlNXVBRRAB!2m1!1s0x0:0xae9382f0c0f6b3b!3m1!1s2@1:CIHM0ogKEMK8-6yhtqe5uAE%7C%7C?hl=en'],
};
const cite = (k) => `[${R[k][0]}, ${R[k][1]}](${R[k][2]})`;

const H1 = 'Generac Generator Installation & Repair in Chicago';

export const PAGE = {
  meta: {
    title: 'Generac Generator Installation & Repair in Chicago',
    description: 'Generac standby generator installation and repair in Chicago: load calculation, transfer switch, permitted wiring and alarms traced, by Highlights Chicago.',
    canonical: `${SITE.live}/services/generac-generator-installation/chicago`,
  },

  hero: {
    crumbs: [['Home', SITE.live], ['Brands', `${base}brands/index.html`], ['Generac', `${base}brands/generac/index.html`], ['Generac Generator Installation & Repair']],
    eyebrow: 'Chicago · All neighborhoods',
    h1: H1,
    lede: 'A Generac standby generator protects a Chicago house only when its electrical side is right: a load calculation, a transfer switch matched to the panel, a permitted feeder from the pad and a tested startup. Highlights Chicago is a City of Chicago licensed electrical contractor with 1,223 City permits on record since 2012, and it also traces faults on Generac units already in the yard.',
    chips: ['City of Chicago Electrical Contractor ECC96456', 'Licensed and insured'],
    cta: 'Book a Generac visit',
    bg: { src: 'images/v3/photos/standby-generator.webp', alt: 'Air-cooled standby generator on a pad beside a stone-clad house wall', pos: '58% 50%' },
    crewTitle: 'From the crews, across Chicago',
    crew: [
      { src: 'images/v3/photos/tech-panel-testing.webp', alt: 'Electrician in a Highlights Chicago hard hat testing breakers with a multimeter', label: 'Illustrative photo: testing breakers in a panel', pos: '50% 35%' },
      { src: 'images/v3/photos/lamp-lit-living-room.webp', alt: 'Woman and young girl reading on a sofa under a floor lamp', label: 'Illustrative photo: the lights that stay on', pos: '92% 50%' },
      { src: 'images/v3/photos/van-chicago-skyline.webp', alt: 'Highlights Chicago van in front of the Chicago skyline at dusk', label: 'Illustrative photo: a Highlights Chicago van' },
    ],
    form: {
      title: H1,
      sub: 'Highlights Chicago gives free estimates.',
      group2: 'The Generac job',
      question: 'What does the Generac job involve?',
      options: ['New Generac standby generator', 'Replace an older generator', 'Repair a Generac that failed', 'Transfer switch work', 'Generac PWRcell battery', 'Not sure which'],
      selectLabel: 'Which Generac is there now?',
      selectOptions: ['None yet', 'Air-cooled Guardian unit', 'Liquid-cooled unit', 'An older Generac', 'Not sure of the model'],
      reply: `Customers describe the office this way: “Every call I made was answered promptly” (${cite('loretta')}).`,
    },
  },

  jobs: {
    title: 'Which Generac job is this?',
    lede: 'Generac work in Chicago comes in three shapes, and each starts with a different first step.',
    cards: [
      { title: 'A new Generac standby generator', situation: 'A household adding a permanent Generac for the first time, fed by natural gas and switching on by itself when ComEd power drops.', src: 'images/v3/photos/standby-generator.webp', alt: 'Air-cooled standby generator on a pad beside a house', pos: '62% 50%', scope: 'The calculated load, the Generac model size, the switch type, free space in the panel and the gas meter’s capacity.', first: 'A load calculation at the main panel.', link: ['#site-assessment', 'What the assessment checks'] },
      { title: 'A Generac that failed or shows an alarm', situation: 'A unit that stayed off in an outage, shows a red light on its controller, or runs while the house stays dark.', src: 'images/services/electrical-troubleshooting.jpg', alt: 'Electrician testing wires at an open box with a multimeter', scope: 'The alarm on the controller, the transfer switch, the generator breaker, the starting battery and the fuel supply.', first: 'A photo of the controller display and its alarm.', link: ['#diagnose', 'Common Generac alarms'] },
      { title: 'Replacing or moving an older Generac', situation: 'A household replacing an aging unit, or sizing up after adding central air or an EV charger to the panel.', src: 'images/services/electrical-panel-upgrade.jpg', alt: 'Electrician working inside an open electrical panel', scope: 'Whether the pad, the transfer switch and the feeder can stay in service with the new model.', first: 'A photo of the model and serial label on the old unit.', link: ['#equipment-choices', 'Transfer switch choices'] },
    ],
    note: 'Households that are unsure can pick “Not sure which” in the form and send a photo of the unit’s label.',
  },

  equipment: {
    title: 'A Generac system, piece by piece',
    lede: 'The Generac on the pad is the part people see. The switch, the panel, the meter and the wire between them decide whether it carries the house when the grid drops.',
    tiles: [
      { title: 'Air-cooled standby unit', text: 'The common home Generac, on a pad outside', src: 'images/v3/photos/standby-generator.webp', alt: 'Air-cooled standby generator on a low pad beside a stone-clad house wall', pos: '62% 50%' },
      { title: 'Main panel', text: 'Where the transfer switch ties in', src: 'images/yelp/yelp-097.jpg', alt: 'Breaker panel with two columns of breakers behind an open door', credit: YELP },
      { title: 'Meter and service entrance', text: 'Sets how much the house can draw', src: 'images/yelp/yelp-083.jpg', alt: 'Bank of meter sockets on the brick wall of a two-flat', credit: YELP },
      { title: 'Feeder in conduit', text: 'The run from the pad to the switch', src: 'images/yelp/yelp-005.jpg', alt: 'Metal conduit running up a brick and siding wall to a service mast', credit: YELP, pos: '40% 60%' },
      { title: 'Home battery', text: 'Generac’s PWRcell is a battery, not an engine', src: 'images/v3/photos/solar-battery-install.webp', alt: 'Electrician kneeling at a wall-mounted home battery beside a breaker panel' },
      { title: 'Service mast and drop', text: 'Where storms often cut the power first', src: 'images/yelp/yelp-087.jpg', alt: 'Overhead service wires running to a mast on a sided house', credit: YELP },
    ],
    meta: 'Photos credited to Yelp are Highlights Chicago job photos. The others are illustrative.',
    banner: 'The alarm list further down covers what usually goes wrong with a Generac that is already installed.',
    bannerLink: 'Generac alarms and causes',
    compare: {
      title: 'Automatic switch, service-rated switch or load management: what changes?',
      lede: 'Every permanent Generac needs a transfer switch, so generator power can never flow back onto ComEd’s lines. These three setups are the common ones in Chicago homes.',
      labels: ['Switches on its own', 'Where it mounts', 'What it backs up', 'Usual fit', 'ComEd visit'],
      cards: [
        { title: 'Automatic transfer switch', values: ['Yes', 'Beside the main panel', 'Chosen circuits, or the whole panel', 'A unit smaller than the full house load', 'Not usually'] },
        { title: 'Service-rated automatic switch', values: ['Yes', 'Between the meter and the main panel', 'The whole house at once', 'A unit sized for the house, or paired with load modules', 'Yes, to disconnect the service'] },
        { title: 'Load management modules', values: ['They drop and restore big loads', 'Near the air conditioner or appliance circuit', 'Large loads, one at a time', 'A smaller unit carrying a whole house', 'No'] },
      ],
    },
    optionsTitle: 'Whole house or essential circuits?',
    callout: ['The kilowatt rating follows the circuits, not the floor area.', 'A Generac carrying only the furnace, the sump pump and the refrigerator can be a fraction of the size of one that carries central air and an electric range.'],
    options: [
      { title: 'Whole house', text: 'Every circuit transfers, and the Generac is sized for the largest loads running together.' },
      { title: 'Managed whole house', text: 'Every circuit transfers, while load modules let the air conditioner and other big loads take turns.' },
      { title: 'Essential circuits', text: 'Heat, the refrigerator, the sump pump and some lights move to a subpanel only the Generac feeds.' },
    ],
    optionsNote: 'The load calculation shows which of the three a given service and panel can support.',
  },

  assessment: {
    title: 'What gets checked before a Generac is sized',
    lede: 'A Generac is sized from the house, not from the brochure. These checks settle the model, the spot on the lot and most of the price.',
    photo: { src: 'images/services/electrical-wiring-and-repair-services.jpg', alt: 'Electrician wiring a metal box on conduit runs across a bare brick wall', label: 'Illustrative photo' },
    checks: [
      { title: 'Connected load and service size', text: 'NEC Article 702 requires an automatically switched standby system to carry the load it transfers, unless load management limits it. The Article 220 method works out that load, and the figure picks the Generac model.' },
      { title: 'Panel make, age and free spaces', text: 'A Generac switch connects to the existing panel, so the panel’s make, age and free breaker spaces decide which switch fits. A full or discontinued panel changes the plan.' },
      { title: 'Where the unit can sit', text: 'Generac’s installation manual sets clearances from windows, doors, vents and the house wall. On a narrow Chicago lot, those distances often choose the spot.' },
      { title: 'Gas meter and pipe size', icon: 'gauge', text: 'Each Generac spec sheet lists the model’s gas use at full load. The gas contractor sizes the pipe from that figure, and Peoples Gas decides whether the meter needs an upgrade.' },
      { title: 'The route from pad to switch', text: 'Brick walls, gangways and finished basements decide how the feeder reaches the switch. The Chicago Electrical Code generally calls for conduit, so the route is planned before the pad is placed.' },
      { title: 'Grounding and the neutral', text: 'The generator’s neutral and ground have to match the transfer switch. A service-rated switch bonds the neutral differently from a switch after the main panel, and the wiring follows that choice.' },
      { title: 'Signal at the pad', text: 'Newer Generac units report alarms and exercise runs through the Mobile Link app, over Wi-Fi or a cellular add-on. A brick wall between the router and the pad can weaken the Wi-Fi option.' },
      { title: 'Building and association rules', text: 'Condo boards, landlords and shared lots can limit where a Generac goes and when the work happens.' },
    ],
    routesTitle: 'If the panel cannot take a Generac switch',
    routes: [
      { title: 'A switch with its own load center', text: 'The essential circuits move into breaker space built into the transfer switch, and the old panel stays in place.' },
      { title: 'A service-rated switch at the meter', text: 'The switch becomes the main disconnect ahead of the panel, so a full panel stops being an obstacle.' },
      { title: 'A subpanel for the backed-up circuits', text: 'A new subpanel fed through the switch takes the circuits the household picks.' },
      { title: 'A panel or service upgrade first', text: 'When the panel is obsolete or too small anyway, the upgrade and the Generac hookup are planned as one job.' },
    ],
    routesNote: `The walkthrough settles the route: panel make, free spaces, service rating and the calculated load. Panel work has its own page: [electrical panel upgrade in Chicago](${L3_PANEL}).`,
  },

  diagnose: {
    title: 'Generac alarms and what usually causes them',
    lede: 'Most Generac service calls in Chicago start with an outage the unit did not handle, or a red light on the controller. These are the common patterns.',
    photo: { src: 'images/yelp/yelp-011.jpg', alt: 'Overhead service wires and a mast on the side of a house against a blue sky', credit: YELP },
    symptoms: [
      { icon: 'sunOff', title: 'The Generac did not start when the power went out', causes: 'A weak starting battery, the controller left in OFF or MANUAL, a closed gas valve, or an Overcrank or Low Oil Pressure alarm', check: 'The controller’s mode and the alarm on its display' },
      { icon: 'split', title: 'The Generac runs but the house stays dark', causes: 'The transfer switch did not transfer, or the main breaker on the generator is off', check: 'The switch status and the breaker on the unit' },
      { icon: 'calendar', title: 'The weekly exercise stopped', causes: 'A clock reset after a battery change, a dead battery, or the unit left out of AUTO', check: 'The exercise day and time set on the controller' },
      { icon: 'cpu', title: 'Mobile Link shows the unit offline', causes: 'Lost Wi-Fi at the pad, a changed router password, or a disconnected cellular add-on. Offline monitoring does not mean the unit has failed', check: 'Whether the controller itself shows an alarm' },
      { icon: 'zap', title: 'Lights dip hard when the air conditioner starts on generator', causes: 'A unit too small for the starting surge, or load modules never set up', check: 'What was running and the load settings' },
      { icon: 'alert', title: 'A carbon monoxide alarm sounds during a run', causes: 'Exhaust drifting into a window, door or vent near the unit', check: 'Get everyone outside, then call 911' },
    ],
    cards: [
      { title: 'Repair, replace or service?', lead: 'A dead battery, a tripped breaker or a loose control wire is a repair, not a new Generac.', rows: [['wrench', 'Engine parts and warranty claims run through Generac’s authorized service network, under Generac’s terms.'], ['arrowsLR', `A unit too small for the house as it is now, or one that keeps failing, is the point to price a replacement. Repairs on other makes have their own page: [generator repair in Chicago](${L3_REPAIR}).`]] },
      { title: 'Ice storms and the service mast', src: 'images/yelp/yelp-064.jpg', alt: 'Utility pole and overhead service lines behind a brick building', credit: YELP, text: 'Ice can pull a service mast off the wall, and ComEd reconnects only after the house side is repaired. A Generac keeps the furnace and the sump pump running while that repair waits.' },
    ],
  },

  brands: {
    title: 'Generac, and the panels its switches connect to',
    lede: 'Generac makes the unit, the transfer switch and the load modules. The panel it ties into can be any make, and these are common in Chicago basements.',
    logos: [{ name: 'Generac' }, { name: 'Square D', src: 'images/logos/logo-square-d.svg' }, { name: 'Siemens', src: 'images/logos/logo-siemens.svg' }, { name: 'Eaton', src: 'images/logos/logo-eaton.svg' }, { name: 'GE', src: 'images/logos/logo-ge.svg' }],
    note: 'Highlights Chicago works on every panel make, and the Generac switch is chosen to match the panel in the house.',
  },

  trust: {
    lede: 'A family-owned Chicago electrical company, established in 2012, working from a shop on N Lincoln Ave in West Ridge.',
    stats: [
      { icon: 'user', tag: 'Owner', value: 'Boz', caption: 'On site for estimates and installs. Reviews also name Raul, Kaplan, Jimmy and Victor.' },
      { icon: 'shieldCheck', tag: 'License', value: 'ECC96456', caption: 'City of Chicago electrical contractor license, also ECC94521' },
      { icon: 'fileCheck', tag: 'Permit record', value: '1,223', caption: 'City of Chicago permits on record since March 2012' },
      { icon: 'award', tag: 'Permit rank', value: '#30', caption: 'of 1,535 Chicago electrical contractors by permits in the 24 months to September 2026' },
    ],
    promises: [
      { icon: 'fileCheck', title: 'Contractor of record on the permit', text: 'On its City permits, Highlights Chicago is the electrical contractor of record, and it filed 392 of them itself as applicant.' },
      { icon: 'clipboardCheck', title: 'Inspections customers describe passing', text: 'Reviews describe Highlights Chicago jobs passing City inspection, the step that closes a permitted Generac hookup.' },
      { icon: 'clock', title: 'Open 24 hours, 7 days', text: 'Emergency electrical service runs around the clock, including the nights a storm takes the power out.' },
    ],
  },

  reviews: {
    title: 'What Chicago customers say?',
    items: [
      { quote: 'Our power went out late at night and they arrived promptly.', who: R.peyton[0], date: R.peyton[1], url: R.peyton[2] },
      { quote: 'we needed our weather head replaced before power could be restored to our home.', who: R.nissa[0], date: R.nissa[1], url: R.nissa[2] },
      { quote: 'in an ice storm the team arrived and got to work.', who: R.keith[0], date: R.keith[1], url: R.keith[2] },
      { quote: 'provided a safe, temporary fix until parts could be obtained', who: R.nicholas[0], date: R.nicholas[1], url: R.nicholas[2] },
    ],
  },

  gallery: {
    title: 'Our work in Chicago',
    lede: 'Service, meter and panel work in Chicago buildings. None of these photos shows a generator; they show the side of the house a Generac connects to.',
    cta: 'Book a Generac visit',
    photos: [
      { src: 'images/yelp/yelp-021.jpg', alt: 'Electrician working on a row of new breaker panels in an old basement while two crew members look on', cap: `Replacing a row of panels in a multi-unit basement. ${YELP}` },
      { src: 'images/yelp/yelp-012.jpg', alt: 'Three meters in a meter bank on a brick wall, labeled 1st, 2nd and 3rd floor', cap: `A three-meter bank on a brick three-flat. ${YELP}` },
      { src: 'images/yelp/yelp-015.jpg', alt: 'New breaker panel mounted on a basement wall with tidy wiring', cap: `A new 200-amp service in a basement. ${YELP}` },
      { src: 'images/yelp/yelp-006.jpg', alt: 'Three new gray panels mounted side by side on a plywood wall', cap: `Three new panels on a plywood backboard. ${YELP}` },
      { src: 'images/yelp/yelp-007.jpg', alt: 'Highlights Chicago crew member at an exterior meter-socket bank with the meters pulled', cap: `A meter-socket bank with the meters pulled for work. ${YELP}` },
    ],
  },

  process: {
    title: 'From the first call to a Generac that starts on its own',
    lede: 'Each step names who holds it, because several waits sit with the City, the gas trade or Generac’s supply chain.',
    steps: [
      { icon: 'phone', title: 'Call or form', text: 'The household says what must keep running in an outage and books a walkthrough. A photo of any existing Generac label helps.', owners: ['homeowner'] },
      { icon: 'search', title: 'Walkthrough', text: 'Customers describe a walkthrough, often with the owner, Boz. The panel, the meter, the gas meter and the spot for the unit get a look.', owners: ['highlights'] },
      { icon: 'clipboardList', title: 'Load calculation and estimate', text: 'The calculation fixes the Generac model and the switch type. Reviews describe a detailed estimate or written proposal before work starts.', owners: ['highlights'] },
      { icon: 'cpu', title: 'Generac equipment order', text: 'The unit, the switch and any load modules are ordered. Delivery follows Generac’s and the supplier’s schedule, often the longest wait.', owners: ['highlights', 'maker'] },
      { icon: 'landmark', title: 'City permit', text: 'Highlights Chicago is the contractor of record on the City electrical permit. Its electrical permits in the 24 months to September 2026 were issued in a median of 2 days.', owners: ['highlights', 'city'] },
      { icon: 'wrench', title: 'Pad, switch, feeder and gas', text: 'The unit is set, and the feeder, switch and grounding are wired. The gas line is a separate trade on its own permit. A switch at the meter needs ComEd to disconnect the service.', owners: ['highlights', 'gas', 'comed'] },
      { icon: 'clipboardCheck', title: 'Inspection, startup and registration', text: 'A City inspector checks the electrical work. The unit is started, a transfer is tested and the weekly exercise is set, and the household registers the unit with Generac.', owners: ['city', 'highlights', 'homeowner'] },
    ],
    duration: `Highlights Chicago’s Google reviews do not yet describe the length of a generator job. For the panel work a Generac hookup shares, one customer describes “a large job in one long day, including a new panel box” (${cite('cee')}). Equipment delivery and the gas line usually set the calendar, and City permit review is separate.`,
  },

  areas: {
    lede: 'Every Chicago neighborhood, plus Evanston and Palatine.',
    notListed: 'Not listed? Inside the city, Highlights Chicago covers it. Call to check.',
    serviceNote: 'On narrow Chicago lots a Generac often ends up in the gangway or beside a garage off the alley, which lengthens the feeder back to the panel.',
  },

  related: {
    title: 'Our other services in Chicago',
    hub: { src: 'images/v3/photos/van-chicago-skyline.webp', alt: 'Highlights Chicago van by the lakefront with the Chicago skyline at dusk', chip: 'Brand', title: 'All Generac services', text: 'Generac generators, home batteries and transfer switches across Chicago.', href: `${base}brands/generac/index.html`, cta: 'View Generac services' },
    cards: [
      { title: 'Whole-House Generator Installation', text: 'Standby generators of every make, from the load calculation up.', src: 'images/services/generator-installation.jpg', href: L3 },
      { title: 'Generac Home Battery', text: 'PWRcell wiring, the backup panel and the tie-in.', src: 'images/services/solar-battery-installation.jpg', href: `${base}brands/generac/index.html`, cta: 'See Generac services' },
      { title: 'Generac Transfer Switch', text: 'A switch on its own, for a unit already in place.', src: 'images/v3/photos/breaker-panel-wall.webp', pos: '5% 50%', href: `${base}brands/generac/index.html`, cta: 'See Generac services' },
      { title: 'Kohler Generators', text: 'Kohler standby generators, on the same panel and permit route.', src: 'images/v3/photos/standby-generator.webp', pos: '62% 50%', href: `${base}brands/kohler/index.html`, cta: 'See Kohler services' },
    ],
  },

  pricing: {
    title: 'What Generac generator installation costs in Chicago',
    lede: 'Chicago recorded 78 permits for permanent or standby generators in the 24 months to September 2026, too few for a fair median. So the table prices Generac work by what drives it.',
    source: 'Reported construction value on City of Chicago Electrical Work permits, issued October 2024 to September 2026. Source: City of Chicago building permit data.',
    featured: { label: 'Service or panel upgrade, when the hookup needs one: 4,337 with a value', value: '$4,200', count: '4,339 permits' },
    rows: [
      { icon: 'zap', job: 'New Generac standby generator', driver: 'Too few costed permits for a median; the model size, the switch and the feeder length set the price', permit: 'yes' },
      { icon: 'split', job: 'Automatic transfer switch on its own', driver: 'Switch rating, service size and where it mounts', permit: 'yes' },
      { icon: 'sliders', job: 'Load management modules', driver: 'How many large loads are managed, and where they sit', permit: 'yes' },
      { icon: 'refresh', job: 'Replacing an existing Generac', driver: 'New size against old, and whether the switch and pad can stay', permit: 'yes' },
      { icon: 'wrench', job: 'Generac repair on the electrical side', driver: 'The fault found: switch, breaker, battery charger circuit or wiring', permit: 'sometimes' },
      { icon: 'battery', job: 'Generac PWRcell battery instead', driver: 'Battery capacity and the circuits it carries', permit: 'yes' },
    ],
    drivers: [
      ['Generac model and kilowatts', 'Sets the unit, the pad and the gas demand', 'Once the load calculation is done'],
      ['Whole house or essential circuits', 'Decides the switch rating and any subpanel', 'When the must-run list is agreed'],
      ['Switch type and load modules', 'A service-rated switch or modules add parts', 'When the panel and service are read'],
      ['Distance from pad to panel', 'Longer conduit through brick or under walks', 'When the unit’s spot is chosen'],
      ['Gas pipe size and meter', 'Pipe size, length and any meter upgrade', 'When the gas contractor checks the meter'],
      ['Panel condition', 'A full or obsolete panel adds an upgrade', 'When the panel cover comes off'],
      ['Site and access', 'Gangways, steps and soft ground slow the setting', 'On narrow lots and rear yards'],
      ['Condo or landlord approval', 'A longer feeder when a board picks the spot', 'Before any equipment is ordered'],
    ],
    driversPhoto: { src: 'images/services/electrical-installation-services.jpg', alt: 'Electrician running metal conduit and boxes along new wall studs', label: 'Illustrative photo' },
    fee: 'Highlights Chicago gives free estimates. A price for one house needs a look at the panel, the meter and the spot for the unit. Payment is accepted by credit card, Zelle, Venmo, PayPal, Cash App or cryptocurrency, and a military discount is offered.',
    incentives: {
      text: 'Neither IRS home energy credit page lists a standby generator (both read October 26, 2026). The Residential Clean Energy Credit, which covered battery storage of at least 3 kilowatt hours, is not available for property placed in service after December 31, 2025. The Energy Efficient Home Improvement Credit covered improvements made through December 31, 2025.',
      sources: [['IRS: Residential Clean Energy Credit', 'https://www.irs.gov/credits-deductions/residential-clean-energy-credit'], ['IRS: Energy Efficient Home Improvement Credit', 'https://www.irs.gov/credits-deductions/energy-efficient-home-improvement-credit']],
    },
  },

  scope: {
    lede: 'The scope splits three ways: the work in a typical Generac install, the extras some homes need, and what the household holds at the end.',
    inTitle: 'In a typical Generac install',
    included: ['Setting the Generac on its pad', 'Transfer switch, wired and labeled', 'Feeder in conduit from the unit to the switch', 'Grounding and bonding', 'Battery and controller set up', 'Startup, a transfer test and the weekly exercise', 'City electrical permit and inspection'],
    inNote: 'A typical job. The walkthrough decides what a specific home needs.',
    separate: ['Gas line and its permit', 'Panel or service upgrade', 'Essential-circuit subpanel', 'Load management modules', 'Trenching under a walk or yard', 'Carbon monoxide alarms indoors'],
    outNote: 'Added only where the walkthrough shows the home needs it.',
    handover: ['City permit number', 'Passed City inspection', 'Labeled transfer switch', 'List of circuits on backup', 'Generac owner’s manual and maintenance schedule', 'Generac warranty registration details', 'Mobile Link set up, if the household wants it'],
    handoverPhoto: { src: 'images/yelp/yelp-040.jpg', alt: 'New electrical meters in a bank on a sided wall with conduit runs', credit: 'Photo: George A. on Yelp' },
    warranties: [
      { icon: 'zap', item: 'Generac generator', party: 'Generac, under its limited warranty for the model. Registration terms are in Generac’s warranty statement.' },
      { icon: 'split', item: 'Transfer switch and load modules', party: 'Generac, under its own terms.' },
      { icon: 'battery', item: 'PWRcell battery', party: 'Generac. Battery terms usually depend on years and on energy cycled.' },
      { icon: 'building', item: 'Panel and breakers', party: 'The panel maker.' },
    ],
  },

  faq: {
    title: 'Generac generators in Chicago: FAQs',
    items: [
      ['Does a Chicago house need the biggest Generac?', 'No. The circuits that protect a Chicago house in an outage are few: the furnace or boiler, the sump pump, the refrigerator and some lights. A smaller Generac on those circuits covers the damage risk, and everything above that is comfort. Highlights Chicago can price both sizes from one walkthrough, before the household decides.'],
      ['Is a Generac dealer needed, or a licensed electrician?', 'Generac sells home standby units through authorized dealers, listed on Generac’s own dealer locator. The licensed part of the job is the electrical work Highlights Chicago does: the load calculation, the transfer switch, the feeder, the City permit and the inspection. How the unit itself is supplied is worth settling in the estimate, before anything is ordered.'],
      ['Air-cooled Guardian or a liquid-cooled Generac?', 'Most houses fit an air-cooled Guardian model, which Generac sells from about 10 to 26 kilowatts. Liquid-cooled models serve larger loads and longer run times, at a higher price and with more maintenance. Highlights Chicago lets the load calculation decide which side of that line a house falls on.'],
      ['How loud is a Generac, and when does it run?', 'A Guardian unit runs a short self-test on a set day each week. Many newer models run it at reduced engine speed, so it is quieter than a full-load run. During an outage it runs at full speed until ComEd power returns. In a gangway between houses the sound carries next door, which is worth weighing when the spot is chosen.'],
      ['Does Generac’s warranty ask anything of the installer?', 'Generac’s limited warranty terms depend on the model, and Generac’s warranty statement sets out registration and who may install and start up the unit. Reading those terms before the order is placed avoids a gap later. The City permit and the passed inspection belong in the same folder, as a record that the electrical work met code.'],
      ['Can a Generac run on propane in Chicago?', 'Yes, most home Generac models run on natural gas or propane. Chicago houses usually use natural gas from the street main, since a propane tank needs yard space, clearances and refills that a city lot rarely offers. Generac rates many models slightly lower on natural gas than on propane, so the fuel is settled before the size.'],
      ['Can a portable Generac connect to the house safely?', 'Yes, through an inlet box outside and a transfer switch or listed interlock at the panel, so only one source can feed the house. A cord plugged into a dryer outlet can push power back onto ComEd’s lines and endanger line workers. The inlet and the interlock are licensed electrical work, permitted like any other change at the panel.'],
      ['Does a Generac need a City permit in Chicago?', 'Yes. The City’s electrical permit form records each permanent generator by its kilowatt rating, and the gas piping is permitted separately. An unpermitted Generac tends to surface during a home sale, and the inspection is the only outside check that the transfer switch was wired correctly.'],
      ['How often does a Generac need maintenance?', 'Generac’s owner’s manual sets service intervals by run hours and by years, covering oil, filters, spark plugs and the battery. Newer controllers flag a maintenance reminder on the display. Highlights Chicago handles the electrical side of a service visit: the battery charger circuit, the transfer switch and the wiring.'],
    ],
  },

  closing: {
    title: 'Planning a Generac generator in Chicago?',
    lede: 'Clear photos of the main panel, the gas meter and the spot planned for the unit let the walkthrough start with the right questions.',
    cta: 'Book a Generac visit',
    ready: [['camera', 'A photo of the main panel with its label readable'], ['gauge', 'A photo of the gas meter'], ['pin', 'Where the Generac would sit'], ['list', 'A list of what must run in an outage'], ['tag', 'The model and serial label of any existing generator']],
    brandsLabel: 'Generac and the panels it connects to',
    logos: [{ name: 'Generac' }, { name: 'Square D', src: 'images/logos/logo-square-d.svg' }, { name: 'Siemens', src: 'images/logos/logo-siemens.svg' }, { name: 'Eaton', src: 'images/logos/logo-eaton.svg' }, { name: 'GE', src: 'images/logos/logo-ge.svg' }],
  },

  guides: {
    title: 'Generac questions the modules leave open',
    lede: 'Three longer answers for Chicago households weighing a Generac.',
    items: [
      {
        icon: 'sun', tab: 'How does a Chicago winter test a Generac?',
        q: 'How does a Chicago winter test a Generac?',
        img: { src: 'images/yelp/yelp-092.jpg', alt: 'Long icicles hanging from the gutter of a gray frame house beside ice-coated overhead service wires', credit: YELP, pos: '50% 30%' },
        answer: 'Winter is when a Chicago Generac is most likely to be needed and least likely to start easily. A weak battery, thick oil and snow drifted against the enclosure are the usual culprits. Highlights Chicago checks the electrical side a cold start depends on: the battery charger circuit, the transfer switch and the wiring.',
        paras: [
          'Chicago’s outages cluster in two seasons: summer storms and winter ice. The winter ones are the costly kind, because a furnace or boiler that stops can let pipes freeze within hours.',
          'The usual approach treats a standby unit as set and forget. It exercises itself each week, so the household assumes it will start in January. But a weekly run in mild weather says little about a start at single-digit temperatures.',
          'What changes in the cold is the battery and the oil. A battery loses much of its cranking power as it chills, and the wrong oil grade thickens. Generac sells cold-weather kits with battery and oil heaters for its air-cooled units.',
          `Highlights Chicago looks at the parts of a winter start that are electrical: the charger circuit that keeps the battery topped up, the switch and the wiring. Engine service follows Generac’s manual. A full panel review sits on the [electrical panel upgrade page](${L3_PANEL}).`,
          `One customer describes a crew that “worked outdoors even in cold conditions” (${cite('jose')}). The Cook County Assessor dates 58.6% of Chicago’s houses and small residential buildings to before 1940. In buildings that age, the pump and heating circuits are worth checking before the first cold snap.`,
        ],
      },
      {
        icon: 'search', tab: 'What should a buyer check on a Generac that came with the house?',
        q: 'What should a buyer check on a Generac that came with the house?',
        img: { src: 'images/v3/photos/standby-generator.webp', alt: 'Air-cooled standby generator on a pad beside a house', credit: 'Illustrative photo', pos: '62% 50%' },
        answer: 'A Generac in the yard of a house for sale is only an asset if its permit, its switch and its service history check out. Highlights Chicago can read the panel and switch side and say whether the hookup looks permitted and sound.',
        paras: [
          'Plenty of Chicago houses change hands with a standby unit already on a pad. A listing usually describes it in one line, and the inspection report often stops at "unit present".',
          'The usual assumption is that a working unit is a finished system. Yet the generator may have been wired by whoever sold it, without a City permit or an inspection of the transfer switch.',
          'The City publishes every building permit on its open data portal, so a permit for the generator either exists or it does not. The model and serial label then give the unit’s age and size against the house as it is today.',
          `Highlights Chicago can check the transfer switch, the generator breaker and the feeder, and compare the unit’s size with the current load. A replacement, if one makes sense, follows the [whole-house generator installation](${L3}) route.`,
          'The permit record is public in the same way for contractors. Highlights Chicago has 1,223 City permits on record since March 2012, each one searchable on the City of Chicago data portal.',
        ],
      },
      {
        icon: 'battery', tab: 'When is a Generac PWRcell battery the better fit?',
        q: 'When is a Generac PWRcell battery the better fit than a standby unit?',
        img: { src: 'images/services/solar-battery-installation.jpg', alt: 'Electrician installing a wall-mounted home battery', credit: 'Illustrative photo' },
        answer: 'A Generac PWRcell suits a Chicago house that wants silent backup for short outages, has no room for a gas-fed unit, or already has solar on the roof. Pricing both against the same panel, before either is ordered, is how Highlights Chicago settles the choice.',
        paras: [
          'Generac sells two kinds of home backup: the engine-driven standby generator and the PWRcell battery. The two solve different outages.',
          'The usual pitch picks one by habit. A gas generator runs as long as the gas flows, but it needs a pad, clearances and a gas line. A battery needs none of those, but it holds a fixed amount of energy.',
          'The shift is that most Chicago outages are short, while the costly ones are long winter events. A battery covers the first kind quietly. Only a generator, or a battery with solar recharging it, covers a multi-day outage.',
          `Highlights Chicago wires both, so a household can price a PWRcell against a standby Generac on the same panel. The battery side has its own page: [solar battery installation in Chicago](${L3_BATTERY}).`,
          'The City’s records show how common batteries already are. Chicago issued 4,549 solar and battery storage permits in the 24 months to September 2026, against fewer than 100 for permanent generators.',
        ],
      },
    ],
  },
};

function jsonLd() {
  const p = PAGE;
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Electrician', '@id': `${SITE.live}/#business`, name: 'Highlights Chicago', url: SITE.live, telephone: SITE.tel, email: SITE.email,
        address: { '@type': 'PostalAddress', streetAddress: SITE.street, addressLocality: 'Chicago', addressRegion: 'IL', postalCode: '60659', addressCountry: 'US' },
        sameAs: [SITE.google.url, 'https://www.facebook.com/HighlightsChicago', 'https://x.com/wedoit4life', SITE.yelp.url] },
      { '@type': 'Service', name: H1, serviceType: 'Generac generator installation and repair', brand: { '@type': 'Brand', name: 'Generac' },
        provider: { '@id': `${SITE.live}/#business` }, areaServed: [{ '@type': 'City', name: 'Chicago' }, { '@type': 'City', name: 'Evanston' }, { '@type': 'City', name: 'Palatine' }], url: p.meta.canonical },
      { '@type': 'FAQPage', mainEntity: p.faq.items.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a.replace(/\[([^\]]+)\]\([^)]+\)/g, '$1') } })) },
      { '@type': 'BreadcrumbList', itemListElement: p.hero.crumbs.map(([n], i) => ({ '@type': 'ListItem', position: i + 1, name: n })) },
    ],
  };
  return `<script type="application/ld+json">${JSON.stringify(graph)}</script>\n`;
}

export function generacPage() {
  const p = PAGE;
  return `${head({ title: `${p.meta.title} | Highlights Chicago`, description: p.meta.description, canonical: p.meta.canonical, base, extraHead: jsonLd() })}
<body class="inter_c15e96cb-module__0bjUvq__variable">
${previewBar(base)}
<div class="ds space_grotesk_65550e9f-module__clzVXG__variable">
${dsHeader(base, 'brands', 'Book Now')}
<main id="main">
${S.hero(p.hero, base)}
${S.jobs(p.jobs, base)}
${S.equipment(p.equipment, base)}
${S.assessment(p.assessment, base)}
${S.diagnose(p.diagnose, base)}
${S.brands(p.brands, base)}
${S.trust(p.trust, base)}
${S.reviews(p.reviews)}
${S.gallery(p.gallery, base)}
${S.process(p.process)}
${S.areas(p.areas, base)}
${S.related(p.related, base)}
${S.pricing(p.pricing, base)}
${S.scope(p.scope, base)}
${S.faq(p.faq, base)}
${S.closing(p.closing, base)}
${S.guides(p.guides, base)}
</main>
${dsFooter(base)}
${S.callbar('Book a Generac visit')}
</div>
${scripts(base)}
</body>
</html>`;
}
