// Fills empty image fields on brand service pages in Sanity. Writes DRAFTS only, never publishes.
// A published page gets a draft copy first (so the live page is unchanged until someone publishes).
// Run: node --env-file=.env.local scripts/sanity-fill-images.mjs <stageDir> [--dry]
//   <stageDir> holds the prepared product photos named in PLAN ({stage: 'file.jpg'}).
// Sources: {repo: 'path under public/images'} | {stage: 'file in stageDir'} | {asset: 'image-...'} (an asset already in Sanity)
import {createClient} from 'next-sanity'
import {readFileSync} from 'node:fs'
import {basename, join} from 'node:path'

const [stageDir, flag] = process.argv.slice(2)
const DRY = flag === '--dry'
const client = createClient({projectId: process.env.NEXT_SANITY_PROJECT_ID, dataset: process.env.NEXT_SANITY_DATASET,
  apiVersion: '2024-01-01', token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false, perspective: 'raw'})

const A = {
  powerwall3: 'image-352d9946e7a5de843ef6bb6065150aba5c1abf09-2329x2607-png',
  measuring: 'image-67370a00317693b76bc5c6a341ea8c4e7d0d122e-768x1376-png',
  chicagoBlock: 'image-f664a3f9d08e4ce3e362fd48c8e0fa3a05642eb6-1376x768-png',
  conduitBrick: 'image-a2e6897036bcfa8c881a909f02f47c2ddf04ba2f-1376x768-png',
  j1772Cable: 'image-a843b60270a8c9645ea747499685af957be5f7a1-1500x1500-jpg',
  pedestal: 'image-c1654a08a3a244b2065c5a9e494cacdeebbb9034-2000x2000-jpg',
  service200: 'image-a688ec1954a63ea8def3841f36aafcaa2b038f61-1000x750-jpg',
  wallConnectorSwitch: 'image-7686f2d10d761600fc21ebe64b8a9567fbe1584b-750x1000-jpg',
  fordStation: 'image-71144fa44aa832705884c456c3204a5a19dfb515-1581x1179-jpg',
  mountingCharger: 'image-62daf5c149ca7c818fd5b4119f5caa693e393f70-1200x800-jpg',
  generacLogo: 'image-53a4b398e9e01dcec425c0c1251a23c499857e39-1024x228-png',
  teslaLogo: 'image-c74b371a5925da8d3b6a20372d144d29b19d7097-989x129-svg',
}
const R = (p) => ({repo: p})
const S = (f) => ({stage: f})
const X = (k) => ({asset: A[k]})
const LOGO = (f) => R(`logos/${f}`)
const PHOTOS = {
  cctv: R('services/cctv-installation.jpg'), doorbell: R('services/low-voltage-wiring-installation.jpg'),
  outdoorLight: R('services/outdoor-lighting-installation.jpg'), outlet: R('services/electrical-outlet-installation.jpg'),
  evCharger: R('services/tesla-and-ev-charger-installation.jpg'), breaker: R('services/circuit-breaker-replacement.jpg'),
  solarRoof: R('services/solar-panel-installation.jpg'), panelTest: R('v3/photos/tech-panel-testing.webp'),
  battery: R('v3/photos/solar-battery-install.webp'), rooftop: R('v3/photos/gen-hero-rooftop-install.webp'),
  rooftopPortrait: R('v3/photos/solar-rooftop-install-portrait.webp'), roofCheck: R('v3/photos/gen-roof-site-assessment.webp'),
  flatRoofArray: R('v3/photos/gen-commercial-flat-roof-array.webp'), inverterWall: R('v3/photos/gen-string-inverter-on-wall.webp'),
}

const PLAN = {
  'bsp-nest-video-doorbell-installation-repair': {
    'hero.backgroundImage': PHOTOS.cctv, 'hero.mobile.photo': PHOTOS.cctv, 'estimateChecks.photo': PHOTOS.panelTest,
    'models.models[0].image': R('products/nest/nest-doorbell-wired-3rd-gen.webp'),
    'models.models[2].image': R('products/nest/nest-cam-with-floodlight.webp'),
    'models.models[3].image': R('products/nest/nest-hello-doorbell.webp'),
    'otherBrands.brands[0].logo': LOGO('logo-ring.svg'), 'otherBrands.brands[1].logo': X('teslaLogo'),
    'otherBrands.brands[2].logo': X('teslaLogo'), 'otherBrands.brands[3].logo': X('generacLogo'),
    'otherBrands.equipment[0].image': PHOTOS.outlet, 'otherBrands.equipment[1].image': PHOTOS.outdoorLight,
    'otherBrands.equipment[2].image': PHOTOS.doorbell,
  },
  'bsp-tesla-home-battery-installation-repair': {
    'hero.backgroundImage': PHOTOS.battery, 'hero.mobile.photo': PHOTOS.battery, 'estimateChecks.photo': X('measuring'),
    'models.models[1].image': S('tesla-powerwall-3-pair.jpg'), 'models.models[3].image': S('tesla-powerwall-2.jpg'),
    'otherBrands.brands[0].logo': X('generacLogo'), 'otherBrands.brands[1].logo': LOGO('logo-enphase.svg'),
    'otherBrands.brands[2].logo': S('franklinwh-logo.png'), 'otherBrands.brands[3].logo': LOGO('logo-solaredge.svg'),
    'otherBrands.equipment[0].image': PHOTOS.evCharger, 'otherBrands.equipment[1].image': PHOTOS.rooftop,
    'parts.parts[6].image': X('conduitBrick'), 'parts.parts[7].image': S('tesla-app-phone.jpg'),
  },
  'drafts.bsp-chargepoint-ev-charger-installation-repair': {
    'hero.backgroundImage': PHOTOS.evCharger, 'estimateChecks.photo': X('measuring'), 'library.guides[0].image': X('chicagoBlock'),
    'models.models[0].image': S('chargepoint-home-flex-hardwired.jpg'), 'models.models[1].image': S('chargepoint-home-flex-plug-in.jpg'),
    'models.models[2].image': S('chargepoint-cpf50.jpg'), 'models.models[3].image': S('chargepoint-home-32a.jpg'),
    'parts.parts[0].image': PHOTOS.breaker, 'parts.parts[3].image': X('j1772Cable'),
    'parts.parts[4].image': S('chargepoint-nacs-cable.jpg'), 'parts.parts[7].image': X('mountingCharger'),
  },
  'drafts.bsp-enphase-ev-charger-installation-repair': {
    'hero.backgroundImage': PHOTOS.evCharger, 'estimateChecks.photo': X('measuring'), 'library.guides[0].image': X('chicagoBlock'),
    'models.models[3].image': S('clippercreek-hcs-older.jpg'),
    'parts.parts[0].image': PHOTOS.breaker, 'parts.parts[5].image': X('j1772Cable'),
    'parts.parts[6].image': X('pedestal'), 'parts.parts[7].image': X('service200'),
  },
  'drafts.bsp-ford-ev-charger-installation-repair': {
    'hero.backgroundImage': X('fordStation'), 'library.guides[0].image': X('chicagoBlock'),
    'models.models[2].image': S('ford-mobile-power-cord.jpg'),
    'otherBrands.brands[1].logo': LOGO('logo-enphase.svg'), 'otherBrands.brands[2].logo': X('teslaLogo'),
    'parts.parts[0].image': PHOTOS.breaker, 'parts.parts[7].image': S('generlink-meter-collar.jpg'),
  },
  'drafts.bsp-ring-video-doorbell-installation-repair': {
    'hero.backgroundImage': PHOTOS.doorbell, 'estimateChecks.photo': PHOTOS.panelTest,
    'models.models[3].image': S('ring-video-doorbell-older.jpg'),
    'otherBrands.brands[0].logo': LOGO('logo-nest.svg'), 'otherBrands.brands[1].logo': LOGO('logo-arlo.png'),
    'otherBrands.brands[2].logo': LOGO('logo-eufy.svg'), 'otherBrands.brands[3].logo': LOGO('logo-blink.png'),
  },
  'drafts.bsp-tesla-ev-charger-installation-repair': {
    'hero.backgroundImage': PHOTOS.evCharger, 'hero.mobile.photo': PHOTOS.evCharger, 'estimateChecks.photo': X('measuring'),
    'library.guides[0].image': X('chicagoBlock'),
    'parts.parts[0].image': PHOTOS.breaker, 'parts.parts[5].image': X('wallConnectorSwitch'), 'parts.parts[8].image': X('service200'),
  },
  'drafts.bsp-tesla-solar-panels-installation-repair': {
    'hero.backgroundImage': PHOTOS.rooftop, 'hero.mobile.photo': PHOTOS.rooftopPortrait, 'estimateChecks.photo': PHOTOS.roofCheck,
    'installations.slides[0]': PHOTOS.flatRoofArray, 'installations.slides[1]': PHOTOS.inverterWall,
    'models.models[0].image': S('all-black-solar-panel.jpg'), 'models.models[1].image': S('tesla-solar-inverter.jpg'),
    'models.models[2].image': X('powerwall3'), 'models.models[3].image': PHOTOS.solarRoof,
    'otherBrands.brands[0].logo': LOGO('logo-enphase.svg'), 'otherBrands.brands[1].logo': LOGO('logo-solaredge.svg'),
    'otherBrands.brands[2].logo': LOGO('logo-qcells.svg'), 'otherBrands.brands[3].logo': X('generacLogo'),
  },
}

const uploaded = new Map()
async function assetId(src) {
  if (src.asset) return src.asset
  const file = src.repo ? join('public/images', src.repo) : join(stageDir, src.stage)
  if (uploaded.has(file)) return uploaded.get(file)
  if (DRY) return `(upload ${file})`
  const doc = await client.assets.upload('image', readFileSync(file), {filename: basename(file)})
  uploaded.set(file, doc._id)
  return doc._id
}
const get = (obj, path) => path.split(/\.|\[(\d+)\]/).filter(Boolean).reduce((o, k) => (o == null ? o : o[k]), obj)

for (const [id, slots] of Object.entries(PLAN)) {
  const draftId = id.startsWith('drafts.') ? id : `drafts.${id}`
  let draft = await client.getDocument(draftId)
  if (!draft) {
    const pub = await client.getDocument(id)
    if (!pub) { console.log('missing document', id); continue }
    const {_rev, _updatedAt, _createdAt, ...rest} = pub
    draft = {...rest, _id: draftId}
    if (!DRY) await client.createIfNotExists(draft)
    console.log(`${draftId}: draft created from the published page`)
  }
  const set = {}
  for (const [path, src] of Object.entries(slots)) {
    const cur = get(draft, path)
    if (cur === undefined) { console.log(`  skip ${path}: field not on the page`); continue }
    if (cur?.asset) { console.log(`  skip ${path}: already has a picture`); continue }
    set[`${path}.asset`] = {_type: 'reference', _ref: await assetId(src)}
    if (cur && !cur._type) set[`${path}._type`] = 'imageWithAlt'
  }
  console.log(`${draftId}: ${Object.keys(set).length} pictures${DRY ? ' (dry run)' : ''}`)
  if (!DRY && Object.keys(set).length) await client.patch(draftId).set(set).commit()
}
