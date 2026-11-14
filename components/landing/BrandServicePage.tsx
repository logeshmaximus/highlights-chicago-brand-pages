/* eslint-disable @next/next/no-img-element -- Sanity CDN images are already sized by imageUrl(). */
// The brand service landing page, built from one Sanity "brandServiceLandingPageTemplate" document.
// Sections follow the approved Paper design "HC · Generac generator brand page", top to bottom.
// An empty section in Sanity is left out; nothing on the page is made up here.
import type {ReactNode} from 'react'
import {imageUrl, type SanityImage} from '@/sanity/image'
import {BookingToggle, Carousel, LibraryTabs, ServiceTabs} from './client'
import {SITE} from '@/lib/site.mjs'
import {slugify} from '@/lib/brands.mjs'
import LOGOS from '@/lib/logos.json'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Doc = Record<string, any>
type BrandLink = {name: string; href: string}

const TEL = `tel:${SITE.tel}`
const pad = (n: number) => String(n).padStart(2, '0')
const has = (v: unknown) => (Array.isArray(v) ? v.length > 0 : Boolean(v))
const hasAsset = (img: any) => Boolean(img?.asset)
// Editor notes such as "[CONFIRM: ...]" are for the team, never for the page.
const clean = (t?: string) => (t || '').replace(/\s*\[(CONFIRM|TODO|NOTE)[^\]]*\]/gi, '').trim()

/** The brand's logo from public/images/logos, used where Sanity has no logo or model photo yet. */
function logoFor(name?: string): string | null {
  if (!name) return null
  const map = LOGOS as Record<string, {file: string}>
  const slug = slugify(name)
  const key = map[slug] ? slug : Object.keys(map).find((k) => slug.startsWith(`${k}-`) || slug === k)
  return key ? `/brands/images/logos/${map[key].file}` : null
}

/** Real Highlights Chicago photos used when a page has no hero or estimate photo in Sanity yet. */
function stockPhoto(doc: Doc, kind: 'hero' | 'estimate'): string {
  const t = `${doc.title || ''} ${doc.service || ''}`.toLowerCase()
  if (kind === 'estimate') return '/brands/images/v3/photos/tech-panel-testing.webp'
  if (/generator/.test(t)) return '/brands/images/v3/photos/standby-generator.webp'
  if (/battery|powerwall/.test(t)) return '/brands/images/v3/photos/solar-battery-install.webp'
  if (/charger|ev\b/.test(t)) return '/brands/images/services/tesla-and-ev-charger-installation.jpg'
  if (/doorbell|camera|cctv/.test(t)) return '/brands/images/services/cctv-installation.jpg'
  if (/solar/.test(t)) return '/brands/images/v3/photos/gen-hero-rooftop-install.webp'
  return '/brands/images/services/electrical-installation-services.jpg'
}

/* ---------- small pieces ---------- */

const PATHS: Record<string, string> = {
  phone: 'M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
  arrow: 'M5 12h14M13 6l6 6-6 6',
  arrowUpRight: 'M7 17 17 7M8 7h9v9',
  check: 'M5 12.5l4.5 4.5L19 7.5',
  pin: 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  info: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20zM12 16v-5M12 8h.01',
  shield: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z M9 12l2 2 4-4',
  plus: 'M12 5v14M5 12h14',
  navigate: 'M3 11l18-8-8 18-2-8z',
  chevron: 'M6 9l6 6 6-6',
  clipboard: 'M9 4h6v3H9zM7 5H5v16h14V5h-2 M9 13l2 2 4-4',
  // Estimate check icons (the icon list in the schema)
  'map-pin': 'M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z M12 12a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  flame: 'M12 22c4 0 7-3 7-7 0-3-2-5-3-7-1 2-2 3-3 3 0-3-1-6-4-8 0 4-4 6-4 11 0 4.5 3 8 7 8z',
  panel: 'M6 3h12v18H6z M9 7h6M9 11h6M9 15h6',
  gauge: 'M4 18a8 8 0 1 1 16 0 M12 14l4-4',
  meter: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M13 7l-3 6h4l-3 5',
  'list-checks': 'M4 7l2 2 3-3M4 15l2 2 3-3M13 7h7M13 15h7',
  fan: 'M12 12a3 3 0 1 0 0 .01M12 12c0-5 4-7 6-5s0 6-6 5zM12 12c5 0 7 4 5 6s-6 0-5-6zM12 12c0 5-4 7-6 5s0-6 6-5zM12 12c-5 0-7-4-5-6s6 0 5 6z',
  route: 'M6 19a2 2 0 1 0 0-.01M18 5a2 2 0 1 0 0-.01M6 17V9a3 3 0 0 1 3-3h6M18 7v8a3 3 0 0 1-3 3H9',
  pad: 'M4 16h16M6 16V9h12v7M3 20h18',
  wrench: 'M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.6 2.6-2.4-.6-.6-2.4z',
  user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8z M4 21a8 8 0 0 1 16 0',
  shieldCheck: 'M12 3l7 3v5c0 4.5-3 8.5-7 10-4-1.5-7-5.5-7-10V6z M9 12l2 2 4-4',
  fileCheck: 'M14 3H6v18h12V7z M14 3v4h4 M9 14l2 2 4-4',
  award: 'M12 15a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M8.5 14 7 22l5-3 5 3-1.5-8',
  clock: 'M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z M12 7v5l3 2',
  home: 'M3 11l9-7 9 7v10H3z M9 21v-6h6v6',
  file: 'M14 3H6v18h12V7z M14 3v4h4 M9 12h6M9 16h6',
  bolt: 'M13 2 4 14h7l-1 8 9-12h-7z',
  chevronRight: 'M9 6l6 6-6 6',
}
function Icon({name, size = 18}: {name: string; size?: number}) {
  const d = PATHS[name] || PATHS.check
  return (
    <svg className="bp-icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={d} />
    </svg>
  )
}

function Img({image, width = 1200, className, eager = false}: {image: SanityImage; width?: number; className?: string; eager?: boolean}) {
  const src = imageUrl(image, width)
  if (!src) return null
  return <img className={className} src={src} alt={image?.alt || ''} loading={eager ? 'eager' : 'lazy'} decoding="async" {...(eager ? {fetchPriority: 'high' as const} : {})} />
}

function Price({price, terms = true}: {price?: {display?: string; showTerms?: boolean}; terms?: boolean}) {
  if (!price?.display) return null
  return (
    <span className="bp-price">
      <span className="bp-price-chip">{price.display}</span>
      {terms && price.showTerms !== false && <small>Terms and conditions apply</small>}
    </span>
  )
}

function Section({id, tone = 'white', title, children, head}: {id: string; tone?: 'white' | 'alt' | 'navy'; title?: string; children: ReactNode; head?: ReactNode}) {
  return (
    <section id={id} className={`bp-section bp-section--${tone}`} aria-labelledby={title ? `${id}-title` : undefined}>
      <div className="bp-wrap">
        {(title || head) && (
          <div className="bp-section-head">
            {title && <h2 id={`${id}-title`} className="bp-h2">{title}</h2>}
            {head}
          </div>
        )}
        {children}
      </div>
    </section>
  )
}

const Stars = ({className = 'bp-stars'}: {className?: string}) => (
  <span className={className} aria-hidden="true">
    {Array.from({length: 5}, (_, i) => (
      <svg key={i} width="16" height="16" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2.5l2.9 6.1 6.6.8-4.9 4.5 1.3 6.6L12 17.3l-5.9 3.2 1.3-6.6-4.9-4.5 6.6-.8z" /></svg>
    ))}
  </span>
)
const GoogleMark = ({size = 28}: {size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 48 48" aria-hidden="true">
    <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z" />
    <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
    <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
    <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z" />
  </svg>
)
const YelpMark = ({size = 28}: {size?: number}) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true">
    <path fill="#D32323" d="M12.3 2.2c.5-.2 1.1.1 1.2.7l.6 7.4c.1.9-1 1.4-1.6.7L7.6 5.3c-.4-.5-.2-1.2.4-1.4zm-5.6 9.5l6.4 1.8c.9.3.9 1.5 0 1.8l-6.3 2.1c-.6.2-1.2-.2-1.3-.8-.2-1.2-.2-2.4.1-3.6.1-.6.7-1 1.1-1.3zm8.4 2.2l4.6 4.5c.4.4.4 1.1-.1 1.5-.9.8-2 1.4-3.2 1.7-.6.1-1.2-.3-1.2-.9l-.3-6.2c0-.8 1-1.3 1.6-.7zm1-3.6l4.6-4.4c.4-.4 1.1-.3 1.4.2.6 1 1 2.2 1.1 3.4 0 .6-.4 1.1-1 1.1l-6.3.6c-.9.1-1.4-1-.8-1.6zm-4.1 6.1l.1 6.4c0 .6-.6 1.1-1.2.9-1.2-.4-2.3-1-3.2-1.9-.4-.4-.4-1.1.1-1.5l3-3.3c.5-.6 1.2-.6 1.2-.6z" />
  </svg>
)

/* ---------- sections ---------- */

function Hero({doc, brandHref}: {doc: Doc; brandHref: string}) {
  const h = doc.hero || {}
  const f = h.form || {}
  const crumbs: string[] = doc.breadcrumb?.length ? doc.breadcrumb : ['Home', 'Brands', doc.brand, doc.title]
  const crumbHref = [SITE.live, '/brands', brandHref]
  const bg = imageUrl(h.backgroundImage, 2000) || stockPhoto(doc, 'hero')
  return (
    <section className="bp-hero" aria-labelledby="bp-hero-title">
      <img className="bp-hero-bg" src={bg} alt={h.backgroundImage?.alt || ''} fetchPriority="high" />
      <div className="bp-wrap bp-hero-grid">
        <div className="bp-hero-copy">
          <nav className="bp-crumbs" aria-label="Breadcrumb">
            <ol>
              {crumbs.map((c, i) => (
                <li key={i}>{i < crumbs.length - 1 && crumbHref[i] ? <a href={crumbHref[i]}>{c}</a> : <span aria-current="page">{c}</span>}</li>
              ))}
            </ol>
          </nav>
          {h.rating && (
            <div className="bp-rating">
              <a href={h.rating.googleUrl || SITE.google.url} className="bp-rating-item" target="_blank" rel="noopener noreferrer">
                <GoogleMark size={30} />
                <b className="bp-rating-num bp-rating-num--google">{h.rating.googleRating}</b>
                <Stars className="bp-stars bp-stars--gold" />
                {h.rating.googleCountLabel && <u>{h.rating.googleCountLabel}</u>}
              </a>
              <span className="bp-rating-sep" aria-hidden="true" />
              <a href={h.rating.yelpUrl || SITE.yelp.url} className="bp-rating-item" target="_blank" rel="noopener noreferrer" aria-label={`Rated ${h.rating.yelpRating} on Yelp`}>
                <YelpMark size={30} />
                <b className="bp-rating-num">{h.rating.yelpRating}</b>
                <span className="bp-yelp-stars" aria-hidden="true">{Array.from({length: 5}, (_, i) => <i key={i}>★</i>)}</span>
              </a>
            </div>
          )}
          <h1 id="bp-hero-title" className="bp-h1">
            {h.headline} {h.headlineHighlight && <span className="bp-green">{h.headlineHighlight}</span>}
          </h1>
          {h.lede && <p className="bp-hero-lede">{h.lede}</p>}
          {has(h.mobile?.values) && (
            <ul className="bp-hero-values">
              {h.mobile.values.map((v: Doc, i: number) => <li key={i}><b>{v.value}</b><span>{v.label}</span></li>)}
            </ul>
          )}
          <div className="bp-hero-actions">
            <a className="bp-btn bp-btn--light" href={TEL}><Icon name="phone" size={18} />{h.primaryCtaLabel || `Call ${SITE.phone}`}</a>
            <a className="bp-btn bp-btn--outline" href="#quote">{h.secondaryCtaLabel || 'Get a free estimate'}<Icon name="arrow" size={18} /></a>
          </div>
          {has(h.mobile?.symptoms) && (
            <div className="bp-hero-symptoms">
              {h.mobile.symptomsTitle && <p>{h.mobile.symptomsTitle}</p>}
              <ul>{h.mobile.symptoms.map((s: string, i: number) => <li key={i}><a href="#quote">{s}</a></li>)}</ul>
            </div>
          )}
        </div>
        <form id="quote" className="bp-form" aria-labelledby="bp-form-title" data-preview-form>
          <h2 id="bp-form-title" className="bp-form-title">{f.title || 'Request a free'} <span className="bp-green">{f.titleHighlight || 'estimate'}</span></h2>
          {f.intro && <p className="bp-form-intro">{f.intro}</p>}
          <div className="bp-form-row">
            <label><span>{f.nameLabel || 'Name'}</span><input name="name" autoComplete="name" placeholder={f.namePlaceholder || 'Your name'} /></label>
            <label><span>{f.phoneLabel || 'Phone number'}</span><input name="phone" type="tel" autoComplete="tel" placeholder={f.phonePlaceholder || 'Your phone number'} /></label>
          </div>
          <label><span>{f.addressLabel || 'Street or cross streets'}</span><input name="address" autoComplete="street-address" placeholder={f.addressPlaceholder || ''} /></label>
          {has(f.needOptions) && (
            <label>
              <span>{f.needLabel || 'What do you need?'}</span>
              <select name="need" defaultValue={f.needDefault}>
                {f.needOptions.map((o: string) => <option key={o}>{o}</option>)}
              </select>
            </label>
          )}
          {has(f.modelChoices) && (
            <fieldset className="bp-form-chips">
              <legend>{f.modelQuestion}</legend>
              {f.modelChoices.map((c: string, i: number) => (
                <label key={c} className="bp-chip-option"><input type="radio" name="model" value={c} defaultChecked={i === 0} /><span>{c}</span></label>
              ))}
            </fieldset>
          )}
          <button type="submit" className="bp-btn bp-btn--green bp-btn--block">{f.submitLabel || 'Request service'}<Icon name="arrow" size={18} /></button>
          <p className="bp-form-call">{f.callLabel || 'Or call'} <a href={TEL}>{f.phone || SITE.phoneShort}</a></p>
        </form>
      </div>
    </section>
  )
}

function Services({doc}: {doc: Doc}) {
  const s = doc.services
  if (!has(s?.groups)) return null
  const panels = s.groups.map((g: Doc, gi: number) => (
    <ol key={gi} className="bp-svc-box">
      {(g.items || []).map((it: Doc, i: number) => (
        <li key={i}><span className="bp-num">{pad(i + 1)}</span><h3 className="bp-h6">{it.title}</h3>{it.text && <p>{it.text}</p>}</li>
      ))}
    </ol>
  ))
  return (
    <Section id="services" title={s.title}>
      <ServiceTabs tabs={s.groups.map((g: Doc) => ({name: g.name, summary: g.summary}))} panels={panels} />
    </Section>
  )
}

function Models({doc}: {doc: Doc}) {
  const m = doc.models
  if (!has(m?.models)) return null
  const logo = logoFor(doc.brand)
  return (
    <Section id="models" tone="alt" title={m.title}>
      {/* Each card is five rows of one shared grid, so photos, names, text and tags line up across cards. */}
      <div className="bp-row bp-row--4 bp-subgrid">
        {m.models.map((c: Doc, i: number) => (
          <article key={i} className="bp-card bp-model" style={{gridRow: 'span 5'}}>
            <div className="bp-model-media">
              {hasAsset(c.image) ? <Img image={c.image} width={600} /> : logo && <img className="bp-model-logo" src={logo} alt={`${doc.brand} logo`} loading="lazy" />}
            </div>
            <p className="bp-label bp-label--green">{c.series}</p>
            <h3 className="bp-h5">{c.name}</h3>
            <p>{c.text}</p>
            {has(c.tags) ? <ul className="bp-tags">{c.tags.map((t: string) => <li key={t}>{t}</li>)}</ul> : <span />}
          </article>
        ))}
      </div>
    </Section>
  )
}

function ModelMatrix({doc}: {doc: Doc}) {
  const m = doc.modelMatrix
  if (!has(m?.columns) || !has(m?.rows)) return null
  return (
    <Section id="model-matrix" tone="alt" title={m.title}>
      <div className="bp-matrix-scroll">
        <table className="bp-matrix">
          <colgroup>{[0, ...m.columns].map((_: unknown, i: number) => <col key={i} />)}</colgroup>
          <thead>
            <tr>
              <th scope="col" className="bp-matrix-first">{m.firstColumnLabel || 'Service'}</th>
              {m.columns.map((c: Doc, i: number) => (
                <th key={i} scope="col">{c.series && <span className="bp-label bp-label--green">{c.series}</span>}<b>{c.name}</b>{c.note && <small>{c.note}</small>}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {m.rows.map((r: Doc, i: number) => (
              <tr key={i}>
                <th scope="row">{r.service}</th>
                {m.columns.map((_: Doc, ci: number) => <td key={ci} className={/not needed|checked along/i.test(r.cells?.[ci] || '') ? 'is-muted' : ''}>{r.cells?.[ci]}</td>)}
              </tr>
            ))}
          </tbody>
          {has(m.costRow?.cells) && (
            <tfoot>
              <tr>
                <th scope="row">{m.costRow.label || 'Typical cost'}<small>Terms and conditions apply</small></th>
                {m.costRow.cells.map((c: Doc, i: number) => <td key={i}>{c.note && <small>{c.note}</small>}<Price price={c.price} terms={false} /></td>)}
              </tr>
            </tfoot>
          )}
        </table>
      </div>
    </Section>
  )
}

function Parts({doc}: {doc: Doc}) {
  const p = doc.parts
  if (!has(p?.parts)) return null
  return (
    <Section id="parts" tone="alt" title={p.title}>
      <Carousel label={p.title || 'Parts'} counter>
        {p.parts.map((c: Doc, i: number) => (
          <article key={i} className="bp-card bp-part">
            <div className="bp-part-media"><Img image={c.image} width={600} /></div>
            <span className="bp-num">{pad(i + 1)}</span>
            <h3 className="bp-h6">{c.title}</h3>
            {c.text && <p>{c.text}</p>}
            {has(c.checks) && <ul className="bp-ticks">{c.checks.map((t: string, ti: number) => <li key={ti}>{t}</li>)}</ul>}
            <div className="bp-part-foot">
              {has(c.chips) ? (
                <ul className="bp-chips">{c.chips.map((t: string, ti: number) => <li key={t} className={ti === 0 ? 'is-green' : ''}>{t}</li>)}</ul>
              ) : (
                <><span>{c.footerLabel}</span><Price price={c.price} terms={false} /></>
              )}
            </div>
          </article>
        ))}
      </Carousel>
      {p.termsNote && <p className="bp-note">{p.termsNote}</p>}
    </Section>
  )
}

function Comparison({doc}: {doc: Doc}) {
  const c = doc.comparison
  if (!has(c?.options)) return null
  // Every card gets the same rows, so "Best fit", "Power" and the rest sit level across the three cards.
  const rows = Math.max(...c.options.map((o: Doc) => (o.rows || []).length))
  return (
    <Section id="comparison" title={c.title}>
      <div className="bp-row bp-row--3 bp-subgrid">
        {c.options.map((o: Doc, i: number) => (
          <article key={i} className="bp-card bp-compare" style={{gridRow: `span ${rows + 1}`}}>
            <header className="bp-compare-head">
              <h3 className="bp-h6">{o.title}</h3>
              <Img image={o.diagram} width={700} className="bp-compare-diagram" />
            </header>
            <dl>
              {(o.rows || []).map((r: Doc, ri: number) => (
                <div key={ri} className={r.highlight ? 'is-highlight' : ''}><dt>{r.label}</dt><dd>{r.value}</dd></div>
              ))}
            </dl>
          </article>
        ))}
      </div>
    </Section>
  )
}

function Scope({doc}: {doc: Doc}) {
  const s = doc.scope
  if (!s?.title) return null
  return (
    <Section id="scope" tone="alt" title={s.title}>
      {(s.calloutTitle || s.calloutText) && (
        <div className="bp-callout">
          <span className="bp-callout-icon"><Icon name="info" size={22} /></span>
          <div>{s.calloutTitle && <h3 className="bp-h6">{s.calloutTitle}</h3>}{s.calloutText && <p>{s.calloutText}</p>}</div>
        </div>
      )}
      {has(s.scenarios) && (
        <div className="bp-row bp-row--3">
          {s.scenarios.map((sc: Doc, i: number) => (
            <article key={i} className="bp-card bp-scenario">
              <div className="bp-scenario-media"><Img image={sc.diagram} width={700} /></div>
              <h3 className="bp-h6">{sc.title}</h3>
              {sc.text && <p>{sc.text}</p>}
            </article>
          ))}
        </div>
      )}
      {s.note && <p className="bp-info-line"><Icon name="info" size={18} />{s.note}</p>}
    </Section>
  )
}

function EstimateChecks({doc}: {doc: Doc}) {
  const e = doc.estimateChecks
  if (!has(e?.checks)) return null
  return (
    <section id="estimate" className="bp-section bp-section--white" aria-labelledby="estimate-title">
      <div className="bp-wrap">
        <div className="bp-estimate">
          <div className="bp-estimate-side">
            <h2 id="estimate-title" className="bp-h2">{e.title}</h2>
            <div className="bp-estimate-photo">
              {hasAsset(e.photo) ? <Img image={e.photo} width={900} /> : <img src={stockPhoto(doc, 'estimate')} alt="A Highlights Chicago electrician testing a panel" loading="lazy" />}
              {e.badgeNumber && <span className="bp-badge"><b>{e.badgeNumber}</b>{e.badgeLabel}</span>}
            </div>
          </div>
          <ol className="bp-checks">
            {e.checks.map((c: Doc, i: number) => (
              <li key={i}>
                <span className="bp-checks-num">{pad(i + 1)}</span>
                <span className="bp-icon-badge"><Icon name={c.icon || 'list-checks'} /></span>
                <div><h3 className="bp-h6">{c.title}</h3>{c.text && <p>{c.text}</p>}</div>
              </li>
            ))}
          </ol>
        </div>
        {has(e.routes) && (
          <div className="bp-routes">
            {e.routesTitle && <h3 className="bp-h4 bp-routes-title"><span className="bp-icon-badge"><Icon name="route" /></span>{e.routesTitle}</h3>}
            <ol className="bp-routes-row">
              {e.routes.map((r: Doc, i: number) => (
                <li key={i} className={`bp-route bp-route--${r.tone || 'green'}`}>
                  <span className="bp-route-num">{i + 1}</span>
                  <h4 className="bp-h6">{r.title}</h4>
                  {r.text && <p>{r.text}</p>}
                </li>
              ))}
            </ol>
          </div>
        )}
        {(e.noteLine1 || e.noteLine2) && (
          <p className="bp-note-box">
            <Icon name="info" size={18} />
            <span>
              {e.noteLine1}
              {e.noteLine2 && <><br />{e.noteLine2.split(/(cost table)/).map((part: string, i: number) => part === 'cost table' ? <a key={i} href="#pricing">cost table</a> : part)}</>}
            </span>
          </p>
        )}
      </div>
    </section>
  )
}

function Installations({doc}: {doc: Doc}) {
  const s = doc.installations
  // A photo row without photos is only arrows: the section shows once Sanity has at least one photo.
  const slides = (s?.slides || []).filter(hasAsset)
  if (!slides.length) return null
  return (
    <Section id="installations" title={s.title}>
      <Carousel label={s.title || 'Installations'}>
        {slides.map((img: Doc, i: number) => (
          <figure key={i} className="bp-slide">
            <Img image={img} width={900} />
            {(img.caption || img.alt) && <figcaption>{img.caption || img.alt}</figcaption>}
          </figure>
        ))}
      </Carousel>
    </Section>
  )
}

function Pricing({doc}: {doc: Doc}) {
  const p = doc.pricing
  if (!p?.title) return null
  const inc = p.included || {}
  return (
    <Section id="pricing" title={p.title}>
      {has(p.fees) && (
        <div className="bp-row bp-row--3 bp-fees">
          {p.fees.map((f: Doc, i: number) => (
            <article key={i} className="bp-card bp-fee">
              <p className="bp-label">{f.label}</p>
              <p className="bp-fee-price">{f.price?.display}</p>
              {f.price?.display && f.price?.showTerms !== false && !/^free$/i.test(f.price.display) && <small className="bp-terms">Terms and conditions apply</small>}
              {f.note && <p>{f.note}</p>}
            </article>
          ))}
        </div>
      )}
      <div className="bp-price-grid">
        {has(p.table?.rows) && (
          <div className="bp-card bp-price-table">
            <div className="bp-price-table-head"><span>{p.table.jobHeading}</span><span>{p.table.priceHeading || 'Price'}</span></div>
            <ul>
              {p.table.rows.map((r: Doc, i: number) => (
                <li key={i}><div><b>{r.job}</b>{r.driver && <small>{r.driver}</small>}</div><Price price={r.price} terms={false} /></li>
              ))}
            </ul>
            {p.table.note && <p className="bp-price-table-note">{p.table.note}</p>}
          </div>
        )}
        {inc.title && (
          <aside className="bp-included">
            <span className="bp-icon-badge bp-icon-badge--navy"><Icon name="shield" /></span>
            <h3 className="bp-h5">{inc.title}</h3>
            {has(inc.items) && <ul className="bp-ticks bp-ticks--green">{inc.items.map((t: string, i: number) => <li key={i}>{t}</li>)}</ul>}
            {(inc.incentivesTitle || inc.incentivesText) && (
              <div className="bp-incentives">
                {inc.incentivesTitle && <p className="bp-label">{inc.incentivesTitle}</p>}
                {inc.incentivesText && <p>{inc.incentivesText}</p>}
                {inc.incentivesLinkUrl && <a href={inc.incentivesLinkUrl} target="_blank" rel="noopener noreferrer">{inc.incentivesLinkLabel || inc.incentivesLinkUrl}</a>}
              </div>
            )}
            <a className="bp-btn bp-btn--light bp-btn--block" href="#quote">{inc.ctaLabel || 'Get a price'}<Icon name="arrow" size={18} /></a>
          </aside>
        )}
      </div>
      {has(p.medians) && (
        <ul className="bp-row bp-row--3 bp-medians">
          {p.medians.map((m: Doc, i: number) => <li key={i} className="bp-card"><b>{m.value}</b><span>{m.label}</span></li>)}
        </ul>
      )}
      {clean(p.source) && <p className="bp-note">{clean(p.source)}</p>}
    </Section>
  )
}

function Trust({doc}: {doc: Doc}) {
  const t = doc.trust
  if (!t?.title) return null
  const facts: Doc[] = t.facts || []
  return (
    <Section id="trust" tone="navy" title={t.title}>
      <div className="bp-trust">
        <div className="bp-trust-photo">
          <Img image={t.photo} width={900} />
          {t.address && <span className="bp-trust-pin"><Icon name="pin" size={16} />{t.address}</span>}
        </div>
        <div className="bp-facts">
          {facts.map((f, i) => {
            const label: string = f.label || ''
            if (/google/i.test(label)) {
              // The rating card from the design: the G mark, the score out of 5, stars and the review count.
              return (
                <div key={i} className="bp-fact bp-fact--wide bp-fact--google">
                  <span className="bp-fact-g"><GoogleMark size={36} /></span>
                  <p className="bp-fact-value">{f.value}{f.suffix && <small>{f.suffix}</small>}</p>
                  <span className="bp-fact-rule" aria-hidden="true" />
                  <div className="bp-fact-stars"><Stars className="bp-stars bp-stars--green" />{f.text && <p>{f.text}</p>}</div>
                  <p className="bp-label bp-fact-tag"><Icon name="check" size={16} />{label}</p>
                </div>
              )
            }
            const icon = /owner/i.test(label) ? 'user' : /licen/i.test(label) ? 'shieldCheck' : /rank/i.test(label) ? 'award' : 'fileCheck'
            return (
              <div key={i} className={`bp-fact${i === 4 ? ' bp-fact--wide' : ''}`}>
                {label && <p className="bp-label bp-label--green"><Icon name={icon} size={16} />{label}</p>}
                <p className="bp-fact-value">{f.value}{f.suffix && <small>{f.suffix}</small>}</p>
                {f.text && <p>{f.text}</p>}
              </div>
            )
          })}
        </div>
      </div>
      {has(t.points) && (
        <div className="bp-points">
          {t.points.map((p: Doc, i: number) => (
            <div key={i}><span className="bp-icon-badge bp-icon-badge--navy"><Icon name={['fileCheck', 'clipboard', 'clock'][i % 3]} /></span><h3 className="bp-h6">{p.title}</h3>{p.text && <p>{p.text}</p>}</div>
          ))}
        </div>
      )}
    </Section>
  )
}

function Reviews({doc}: {doc: Doc}) {
  const r = doc.reviews
  if (!has(r?.reviews)) return null
  return (
    <Section id="reviews" title={r.title}>
      <div className="bp-card bp-review-bar">
        <span><GoogleMark size={26} /><b>{r.googleRating}</b><small>{r.googleCount}</small></span>
        <span className="bp-rating-sep" aria-hidden="true" />
        <span><YelpMark size={26} /><b>{r.yelpRating}</b><small>{r.yelpCount}</small></span>
      </div>
      <Carousel label={r.title || 'Reviews'}>
        {r.reviews.map((c: Doc, i: number) => (
          <article key={i} className="bp-card bp-review">
            <header>
              <span className="bp-avatar" aria-hidden="true">{(c.name || '?').charAt(0)}</span>
              <div><b>{c.name}</b><small>{c.source}</small></div>
              <GoogleMark size={20} />
            </header>
            <Stars className="bp-stars bp-stars--green" />
            <blockquote>“{c.quote}”</blockquote>
            {c.url && <a href={c.url} target="_blank" rel="noopener noreferrer">{r.reviewLinkLabel || 'View on Google'}</a>}
          </article>
        ))}
      </Carousel>
    </Section>
  )
}

function Process({doc}: {doc: Doc}) {
  const p = doc.process
  if (!has(p?.steps)) return null
  return (
    <Section id="process" tone="alt" title={p.title}>
      <ol className="bp-row bp-row--4 bp-steps">
        {p.steps.map((s: Doc, i: number) => (
          <li key={i} className={`bp-card bp-step${i === p.steps.length - 1 ? ' is-last' : ''}`}>
            <span className="bp-step-num">{i + 1}</span>
            <h3 className="bp-h6">{s.title}</h3>
            {s.text && <p>{s.text}</p>}
          </li>
        ))}
      </ol>
    </Section>
  )
}

/* The North Side map from the Paper design ("Map frame", 1200 x 560): the base map is the design's own SVG,
   and each pin sits where the design puts it. Pins Sanity lists that the design has no spot for are shown as
   chips under the map, so nothing is dropped. */
const MAP_W = 1200
const MAP_H = 560
// x, y: the pin group's top-left (or top-right when side is 'r', label before the pin), in design pixels.
const PIN_SPOTS: Record<string, {x: number; y: number; side?: 'r'}> = {
  evanston: {x: 489, y: 65},
  'rogers park': {x: 614, y: 180, side: 'r'},
  'north park': {x: 874, y: 255, side: 'r'},
  'albany park': {x: 799, y: 311, side: 'r'},
  'jefferson park': {x: 129, y: 299},
  'lincoln square': {x: 501, y: 314},
  ravenswood: {x: 589, y: 272},
  uptown: {x: 664, y: 311},
  lakeview: {x: 679, y: 392},
  'logan square': {x: 399, y: 445},
  'wicker park': {x: 554, y: 492},
}
const pct = (v: number, of: number) => `${((v / of) * 100).toFixed(3)}%`
const PinMark = ({w = 22, h = 28}: {w?: number; h?: number}) => (
  <svg width={w} height={h} viewBox="0 0 22 28" aria-hidden="true">
    <path d="M11 1C5.5 1 1.5 5.2 1.5 10.4C1.5 17.3 11 27 11 27C11 27 20.5 17.3 20.5 10.4C20.5 5.2 16.5 1 11 1Z" fill="#66B143" stroke="#FFFFFF" strokeWidth="1.5" />
    <circle cx="11" cy="10.5" r="3.5" fill="#FFFFFF" />
  </svg>
)

function BaseMap() {
  const v = Array.from({length: 50}, (_, i) => `M${12 + i * 24} 0V560`).join(' ')
  const h = Array.from({length: 26}, (_, i) => `M0 ${11 + i * 22}H1200`).join(' ')
  const road = (d: string) => (
    <>
      <path d={d} fill="none" stroke="#CDD1D6" strokeWidth="9" strokeLinecap="round" />
      <path d={d} fill="none" stroke="#FFFFFF" strokeWidth="6" strokeLinecap="round" />
    </>
  )
  return (
    <svg className="bp-map-base" viewBox={`0 0 ${MAP_W} ${MAP_H}`} preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
      <rect width="1200" height="560" fill="#E8EAED" />
      <path d={v} fill="none" stroke="#F4F5F7" />
      <path d={h} fill="none" stroke="#F4F5F7" />
      <path d="M248 0C258 60 292 125 322 172C340 200 356 228 368 250" fill="none" stroke="#D3E6CB" strokeWidth="30" strokeLinecap="round" />
      <g fill="#D3E6CB">
        <rect x="296" y="248" width="52" height="26" rx="4" /><rect x="518" y="258" width="44" height="34" rx="4" />
        <rect x="632" y="362" width="30" height="34" rx="4" /><rect x="478" y="364" width="28" height="20" rx="4" />
        <rect x="414" y="530" width="60" height="40" rx="4" /><rect x="552" y="38" width="40" height="22" rx="4" />
      </g>
      <path d="M676 272C700 300 735 330 756 352C768 372 772 390 774 408C784 440 794 470 806 500C818 528 828 546 838 566" fill="none" stroke="#D3E6CB" strokeWidth="56" strokeLinecap="round" />
      <path d="M262 0C270 60 300 120 330 170C350 205 368 240 380 262C398 292 430 318 452 334C478 352 498 370 508 390C518 412 528 440 548 470C572 500 610 528 640 548L662 566" fill="none" stroke="#CFE0EC" strokeWidth="5" strokeLinecap="round" />
      <path d="M522 0C514 60 500 120 482 190C467 240 450 290 440 326" fill="none" stroke="#CFE0EC" strokeWidth="3" strokeLinecap="round" />
      <path d="M0 106H1200 M0 174H1200 M0 240H1200 M0 264H1200 M0 308H1200 M0 333H1200 M0 376H1200 M0 423H1200 M0 467H1200 M0 513H1200 M120 0V560 M215 0V560 M315 0V560 M410 0V560 M510 0V560 M605 0V560" fill="none" stroke="#FFFFFF" strokeWidth="3" />
      <path d="M150 109L285 196L446 276L505 333L650 420L785 507" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M0 250L140 327L410 473L565 520L670 566" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinejoin="round" />
      <path d="M585 174C595 230 605 290 615 330C640 380 670 420 700 450C730 480 760 505 780 530" fill="none" stroke="#FFFFFF" strokeWidth="3" />
      {road('M140 327C220 360 300 400 360 425C430 455 520 500 640 566')}
      {road('M140 327C175 280 210 230 213 196C214 130 205 60 200 0')}
      {road('M140 327C100 340 50 350 0 362')}
      {road('M676 286C700 308 724 330 742 350C756 372 768 405 778 430C790 460 800 488 810 510C818 530 824 548 832 566')}
      <path d="M572 0C585 30 600 45 612 60C620 72 616 86 602 98C600 130 608 165 626 205C645 245 672 272 700 298C725 320 742 338 760 350C772 352 774 362 766 372C776 395 784 412 790 428C798 452 808 476 816 494C826 518 833 540 840 560L1200 560L1200 0Z" fill="#CFE0EC" />
    </svg>
  )
}

function AreaMap({a}: {a: Doc}) {
  const pins: string[] = a.mapPins || []
  const labels: string[] = a.mapLabels || []
  const placed = pins.filter((p) => PIN_SPOTS[p.toLowerCase()])
  const extra = pins.filter((p) => !PIN_SPOTS[p.toLowerCase()] && !/palatine/i.test(p))
  const offMap = [...labels, ...pins].find((l) => /palatine/i.test(l))
  const lake = labels.find((l) => /lake/i.test(l)) || 'Lake Michigan'
  const name = a.shopName || SITE.name
  return (
    <div className="bp-map">
      <a className="bp-map-canvas" href={a.mapLinkUrl || a.directionsUrl} target="_blank" rel="noopener noreferrer" aria-label={`${name} service area on Google Maps: ${pins.join(', ')}`}>
        <BaseMap />
        {placed.map((p) => {
          const s = PIN_SPOTS[p.toLowerCase()]
          const pos = s.side === 'r' ? {right: pct(s.x, MAP_W), top: pct(s.y, MAP_H)} : {left: pct(s.x, MAP_W), top: pct(s.y, MAP_H)}
          return <span key={p} className={`bp-map-pin${s.side === 'r' ? ' bp-map-pin--r' : ''}`} style={pos}><PinMark /><span>{p}</span></span>
        })}
        <span className="bp-map-shop" style={{left: pct(366, MAP_W), top: pct(206, MAP_H)}}>
          <span className="bp-map-shop-ring" />
          <svg className="bp-map-shop-pin" width="36" height="46" viewBox="0 0 36 46" aria-hidden="true">
            <path d="M18 1.5C9 1.5 2 8.4 2 17C2 28.5 18 44.5 18 44.5C18 44.5 34 28.5 34 17C34 8.4 27 1.5 18 1.5Z" fill="#223D90" stroke="#FFFFFF" strokeWidth="2" />
            <circle cx="18" cy="17" r="8.5" fill="#FFFFFF" />
            <path d="M19.5 11L14 18.5H18L16.8 23.5L22.3 16H18.3Z" fill="#223D90" />
          </svg>
          <span className="bp-map-shop-name">{name}</span>
        </span>
        {offMap && (
          <span className="bp-map-off" style={{left: pct(16, MAP_W), top: pct(62, MAP_H)}}>
            <svg width="16" height="16" viewBox="0 0 24 24" aria-hidden="true"><path d="M17 17L7 7M7 15V7h8" fill="none" stroke="#3A7323" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            <PinMark w={14} h={18} />
            {offMap}
          </span>
        )}
        <span className="bp-map-lake" style={{left: pct(870, MAP_W), top: pct(470, MAP_H)}}>{lake}</span>
      </a>
      <div className="bp-map-card">
        <img src="/brands/images/v3/logos/highlights-chicago-logo.webp" alt="" width={140} height={34} />
        <div className="bp-map-card-body">
          <h3 className="bp-h5">{name}</h3>
          {a.shopAddress && <p className="bp-map-address"><Icon name="pin" size={20} />{a.shopAddress}</p>}
        </div>
        {a.shopHours && <p className="bp-map-hours"><span aria-hidden="true" />{a.shopHours}</p>}
        {a.directionsUrl && <a className="bp-btn bp-btn--blue bp-btn--block" href={a.directionsUrl} target="_blank" rel="noopener noreferrer"><Icon name="navigate" size={18} />{a.directionsLabel || 'Get directions'}</a>}
      </div>
      {extra.length > 0 && <ul className="bp-map-extra">{extra.map((p) => <li key={p}><PinMark w={14} h={18} />{p}</li>)}</ul>}
    </div>
  )
}

function Areas({doc}: {doc: Doc}) {
  const a = doc.areas
  if (!a?.title) return null
  return (
    <Section
      id="areas"
      tone="navy"
      title={a.title}
      head={a.mapLinkUrl && <a className="bp-link-green" href={a.mapLinkUrl} target="_blank" rel="noopener noreferrer">{a.mapLinkLabel || 'Open in Google Maps'}<Icon name="arrowUpRight" size={14} /></a>}
    >
      <AreaMap a={a} />
      {has(a.regions) && (
        <div className="bp-row bp-row--4 bp-regions">
          {a.regions.map((r: Doc, i: number) => (
            <div key={i} className="bp-region"><h3 className="bp-h6"><span>{pad(i + 1)}</span>{r.title}</h3>{r.text && <p>{r.text}</p>}</div>
          ))}
        </div>
      )}
    </Section>
  )
}

function Faq({doc}: {doc: Doc}) {
  const f = doc.faq
  if (!has(f?.items)) return null
  const shown = f.mobileCount || 8
  return (
    <section id="faq" className="bp-section bp-section--alt" aria-labelledby="faq-title">
      <div className="bp-wrap bp-faq">
        <div className="bp-faq-side">
          <h2 id="faq-title" className="bp-h3">{f.title}</h2>
          <div className="bp-faq-call">
            <Img image={f.callCardImage} width={800} />
            <div>
              <p className="bp-h6">{f.callCardTitle || 'Didn’t find the question?'}</p>
              <a className="bp-btn bp-btn--light" href={TEL}><Icon name="phone" size={18} />{f.callCardButton || `Call ${SITE.phone}`}</a>
            </div>
          </div>
          <div className="bp-card bp-faq-proof">
            <div><GoogleMark size={34} /><span><b>{f.googleRating} <Stars className="bp-stars bp-stars--green" /></b><small>{f.googleCount}</small></span></div>
            {f.licence && <div><span className="bp-icon-badge bp-icon-badge--green"><Icon name="shield" /></span><span><b>{f.licence}</b><small>{f.licenceLabel}</small></span></div>}
          </div>
        </div>
        <div className={`bp-faq-list${f.items.length > shown ? ' has-more' : ''}`}>
          {f.items.map((q: Doc, i: number) => (
            <details key={i} className={`bp-faq-item${i >= shown ? ' is-extra' : ''}`} open={i === 0}>
              <summary><span className="bp-faq-num">{pad(i + 1)}</span><span className="bp-faq-q">{q.question}</span><span className="bp-faq-pm" aria-hidden="true" /></summary>
              <p>{q.answer}</p>
            </details>
          ))}
          {f.items.length > shown && (
            <label className="bp-faq-more">
              <input type="checkbox" />
              <span>{f.seeAllLabel || `See all ${f.items.length} questions`}</span>
            </label>
          )}
        </div>
      </div>
    </section>
  )
}

function Closing({doc}: {doc: Doc}) {
  const c = doc.closing
  if (!c?.title) return null
  const bg = imageUrl(c.backgroundImage, 2000)
  return (
    <section id="closing" className="bp-closing" aria-labelledby="closing-title">
      {bg && <img className="bp-closing-bg" src={bg} alt="" loading="lazy" />}
      <div className="bp-wrap">
        <h2 id="closing-title" className="bp-h2">{c.title}</h2>
        {c.text && <p className="bp-closing-text">{c.text}</p>}
        <div className="bp-hero-actions">
          <a className="bp-btn bp-btn--light" href={TEL}><Icon name="phone" size={18} />{c.primaryCtaLabel || `Call ${SITE.phone}`}</a>
          <a className="bp-btn bp-btn--outline" href="#quote">{c.secondaryCtaLabel || 'Get a free estimate'}</a>
        </div>
        {has(c.checklist) && (
          <div className="bp-ready">
            <div className="bp-ready-head">
              <span className="bp-ready-icon"><Icon name="clipboard" size={26} /></span>
              <h3 className="bp-h5">{c.checklistTitle}</h3>
              <a className="bp-link-green" href={TEL}>Call {SITE.phone}<Icon name="arrow" size={14} /></a>
            </div>
            <ul>{c.checklist.map((t: string, i: number) => <li key={i}><span className="bp-icon-badge bp-icon-badge--glass"><Icon name="check" /></span>{t}</li>)}</ul>
          </div>
        )}
      </div>
    </section>
  )
}

function OtherBrands({doc, brandLinks}: {doc: Doc; brandLinks: BrandLink[]}) {
  const o = doc.otherBrands
  if (!has(o?.brands) && !has(o?.equipment)) return null
  // A card links to its brand's page here when the field has no link of its own.
  const find = (name: string) => brandLinks.find((b) => name?.toLowerCase().startsWith(b.name.toLowerCase()))?.href
  return (
    <Section id="other-brands" title={o.title}>
      {has(o.equipment) && (
        <div className="bp-row bp-row--3">
          {o.equipment.map((e: Doc, i: number) => (
            <a key={i} className="bp-card bp-equip" href={e.link || find(doc.brand) || '/brands'}>
              <div className="bp-equip-media"><Img image={e.image} width={700} /></div>
              <div className="bp-equip-body"><span><b>{e.title}</b>{e.text && <small>{e.text}</small>}</span><span className="bp-round-arrow"><Icon name="arrow" size={16} /></span></div>
            </a>
          ))}
        </div>
      )}
      {has(o.brands) && (
        <div className="bp-row bp-row--4 bp-logos">
          {o.brands.map((b: Doc, i: number) => (
            <a key={i} className="bp-card bp-logo-card" href={b.link || find(b.name) || '/brands'}>
              {hasAsset(b.logo) ? <Img image={b.logo} width={400} /> : logoFor(b.name) && <img src={logoFor(b.name)!} alt={`${b.name} logo`} loading="lazy" />}
              <span>{b.name}<Icon name="arrow" size={14} /></span>
            </a>
          ))}
        </div>
      )}
    </Section>
  )
}

function Library({doc}: {doc: Doc}) {
  const l = doc.library
  if (!has(l?.guides)) return null
  const word = l.guideWord || 'Guide'
  const n = l.guides.length
  const tabs = l.guides.map((g: Doc, i: number) => (
    <span key={i} className="bp-lib-tab-in">
      <span className="bp-lib-tab-icon"><Icon name={['home', 'file', 'pin', 'bolt'][i % 4]} size={20} /></span>
      <span><small>{word} {pad(i + 1)}</small><b>{g.tabLabel || g.title}</b></span>
      <span className="bp-lib-tab-go"><Icon name="chevronRight" size={18} /></span>
    </span>
  ))
  const nav = l.guides.map((g: Doc, i: number) => (
    has(g.sections) ? (
      <nav key={i} className="bp-lib-toc" aria-label={l.inThisGuideLabel || 'In this guide'}>
        <p className="bp-label">{l.inThisGuideLabel || 'In this guide'}</p>
        <ul>{g.sections.map((s: Doc, si: number) => <li key={si}><a href={`#guide-${i}-${si}`}>{s.title}</a></li>)}</ul>
      </nav>
    ) : null
  ))
  const panels = l.guides.map((g: Doc, i: number) => (
    <article key={i} className="bp-card bp-guide">
      <header className="bp-guide-head">
        <Img image={g.image} width={1200} />
        <div><p className="bp-label bp-label--green">{word} {pad(i + 1)} / {pad(n)}</p><h3 className="bp-h4">{g.title}</h3></div>
      </header>
      <div className="bp-guide-body">
        {g.intro && <p className="bp-guide-intro">{g.intro}</p>}
        {has(g.stats) && <ul className="bp-guide-stats">{g.stats.map((s: Doc, si: number) => <li key={si}><b>{s.value}</b><span>{s.label}</span></li>)}</ul>}
        {(g.sections || []).map((s: Doc, si: number) => (
          <section key={si} id={`guide-${i}-${si}`} className="bp-guide-section"><h4 className="bp-h6">{s.title}</h4><p>{s.text}</p></section>
        ))}
      </div>
    </article>
  ))
  return (
    <Section id="library" title={l.title}>
      <LibraryTabs tabs={tabs} panels={panels} nav={nav} />
    </Section>
  )
}

/* ---------- page ---------- */

export function BrandServicePage({doc, brandHref, brandLinks}: {doc: Doc; brandHref: string; brandLinks: BrandLink[]}) {
  const booking = doc.bookingToggle
  return (
    <div className="bp">
      <Hero doc={doc} brandHref={brandHref} />
      {/* The "On this page" bar (jumpBar in Sanity) is not shown: removed at the owner's request on 2026-11-14. */}
      <Services doc={doc} />
      <Models doc={doc} />
      <ModelMatrix doc={doc} />
      <Parts doc={doc} />
      <Comparison doc={doc} />
      <Scope doc={doc} />
      <EstimateChecks doc={doc} />
      <Installations doc={doc} />
      <Pricing doc={doc} />
      <Trust doc={doc} />
      <Reviews doc={doc} />
      <Process doc={doc} />
      <Areas doc={doc} />
      <Faq doc={doc} />
      <Closing doc={doc} />
      <OtherBrands doc={doc} brandLinks={brandLinks} />
      <Library doc={doc} />
      <BookingToggle label={booking?.label || 'Book online 24/7'} phone={booking?.phone || SITE.phone} callLabel={booking?.callLabel} />
    </div>
  )
}
