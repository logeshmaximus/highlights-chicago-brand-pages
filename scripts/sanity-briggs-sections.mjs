// Adds the two sections the Briggs & Stratton page is missing (model table, Chicago library) to its DRAFT.
// Structure and Chicago figures follow the Kohler page; model facts come from the Briggs page's own model cards and price table.
import {createClient} from 'next-sanity'
import {randomUUID} from 'node:crypto'
const c = createClient({projectId: process.env.NEXT_SANITY_PROJECT_ID, dataset: process.env.NEXT_SANITY_DATASET, apiVersion: '2024-01-01', token: process.env.SANITY_API_WRITE_TOKEN, useCdn: false, perspective: 'raw'})
const key = () => randomUUID().replace(/-/g, '').slice(0, 12)
const id = 'bsp-briggs-stratton-generator-installation-repair'
const draftId = `drafts.${id}`
const kohler = await c.getDocument('bsp-kohler-generator-installation-repair')
let draft = await c.getDocument(draftId)
if (!draft) {
  const {_rev, _updatedAt, _createdAt, ...pub} = await c.getDocument(id)
  await c.createIfNotExists({...pub, _id: draftId})
  console.log('draft created from the published page')
}
const price = (display, sheetRow) => ({display, sheetRow, showTerms: true})
const modelMatrix = {
  title: 'The services we provide for each Briggs & Stratton',
  firstColumnLabel: 'Service',
  columns: [
    {_key: key(), _type: 'matrixColumn', series: 'PowerProtect', name: 'Home standby', note: 'Most Chicago homes'},
    {_key: key(), _type: 'matrixColumn', series: 'PowerProtect+', name: 'Big appliances', note: 'Homes with large central air'},
    {_key: key(), _type: 'matrixColumn', series: 'SimpliPHI 6.6', name: 'Home battery', note: 'No gas line, no pad'},
    {_key: key(), _type: 'matrixColumn', series: 'Any model', name: 'One you already have', note: 'Came with the house'},
  ],
  rows: [
    ['Choosing the size', 'Sized to what must keep running', 'Sized to start a large central air', 'Batteries stacked for the circuits you pick', 'Does it still cover today’s list?'],
    ['Switching your home over', 'A switch beside your panel or at the meter', 'A switch, plus load management for big appliances', 'A backup panel for the circuits it keeps on', 'We run a live switch-over test'],
    ['Wiring to your home', 'Run from the pad through brick or a gangway', 'Run from the pad through brick or a gangway', 'Connected at your main panel', 'Connections tightened and tested'],
    ['Gas line', 'Run by a gas contractor; we plan our work around it', 'Sized for the bigger unit; we plan our work around it', 'Not needed', 'Checked along with the unit'],
    ['Repairs', 'Won’t start, warning lights, a weak battery', 'Won’t start, or runs while the house stays dark', 'Ask us at the free estimate', 'Won’t start, or runs while the house stays dark'],
    ['Yearly checkups', 'Battery, switch and wiring checked every year', 'Battery, switch and wiring checked every year', 'Ask us at the free estimate', 'A full check before you rely on it'],
  ].map(([service, ...cells]) => ({_key: key(), _type: 'matrixRow', service, cells})),
  costRow: {
    label: 'Typical cost',
    cells: [
      {_key: key(), _type: 'costCell', note: 'Typical install, 161 City permits', price: price('$15,000 median', 'Generator (161 costed permits)')},
      {_key: key(), _type: 'costCell', note: 'Typical install, 161 City permits', price: price('$15,000 median', 'Generator (161 costed permits)')},
      {_key: key(), _type: 'costCell', note: 'Home battery', price: price('$19,000 typical', 'Solar / photovoltaic, $18,992 (4,022 costed permits)')},
      {_key: key(), _type: 'costCell', note: 'Repair visit; no repair row on the sheet', price: price('$3,000 typical', '100 amp service (2,189 costed permits); the sheet has no repair row')},
    ],
  },
}
// The Chicago guide: same Cook County Assessor figures as the Kohler page, with the brand-specific lines rewritten.
const kg = kohler.library.guides[0]
const swap = (t) => t.replace(/Kohler rates the compact 10RESV to sit 18 inches from the wall\. Larger models follow the clearances in their install manuals\./, 'Each Briggs & Stratton model follows the clearances in its install manual, and the upright 13 kW PowerProtect helps on a narrow side yard.').replace(/Kohler/g, 'Briggs & Stratton')
const library = {
  title: kohler.library.title, guideWord: kohler.library.guideWord, inThisGuideLabel: kohler.library.inThisGuideLabel,
  guides: [{
    _key: key(), _type: 'libraryGuide',
    tabLabel: 'Chicago homes and Briggs & Stratton sizing',
    title: 'Fitting a Briggs & Stratton standby to a Chicago home',
    intro: kg.intro,
    image: {...kg.image},
    stats: kg.stats.map((s) => ({...s, _key: key()})),
    sections: kg.sections.map((s) => ({...s, _key: key(), text: swap(s.text), title: swap(s.title)})),
  }],
}
await c.patch(draftId).set({modelMatrix, library}).commit()
console.log('model table and library added to', draftId)
console.log(JSON.stringify(library.guides[0].sections.map((s) => s.text), null, 1))
