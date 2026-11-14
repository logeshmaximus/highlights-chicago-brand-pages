'use client'

// Interactive pieces of the brand service page. Everything renders on the server first; these only add
// switching and scrolling, so the page reads fine before JavaScript loads.
import {Children, useEffect, useRef, useState, type ReactNode} from 'react'

/** Services: vertical tabs on the left, the selected group's box on the right (an accordion on phones). */
export function ServiceTabs({tabs, panels}: {tabs: {name: string; summary?: string}[]; panels: ReactNode[]}) {
  const [active, setActive] = useState(0)
  return (
    <div className="bp-svc">
      <div className="bp-svc-tabs" role="tablist" aria-orientation="vertical">
        {tabs.map((t, i) => (
          <div key={i} className="bp-svc-item">
            <button
              type="button"
              role="tab"
              aria-selected={i === active}
              className={`bp-svc-tab${i === active ? ' is-active' : ''}`}
              onClick={() => setActive(i)}
            >
              <span className="bp-svc-tab-text">
                <b>{t.name}</b>
                {t.summary && <small>{t.summary}</small>}
              </span>
              <span className="bp-svc-tab-icon" aria-hidden="true">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {i === active ? <path d="M5 12h14M13 6l6 6-6 6" /> : <path d="M9 6l6 6-6 6" />}
                </svg>
              </span>
            </button>
            {/* Phones: the box opens under its tab */}
            <div className="bp-svc-inline" hidden={i !== active}>{panels[i]}</div>
          </div>
        ))}
      </div>
      <div className="bp-svc-panel" role="tabpanel">{panels[active]}</div>
    </div>
  )
}

/** A horizontal swipe row with arrows and a "01–04 / 09" counter. */
export function Carousel({children, label, counter = false}: {children: ReactNode; label: string; counter?: boolean}) {
  const track = useRef<HTMLDivElement>(null)
  const [state, setState] = useState({first: 1, last: 1, total: Children.count(children), atStart: true, atEnd: false})
  useEffect(() => {
    const el = track.current
    if (!el) return
    const update = () => {
      const items = [...el.children] as HTMLElement[]
      if (!items.length) return
      const left = el.scrollLeft
      const right = left + el.clientWidth
      const start = items[0].offsetLeft
      const visible = items.filter((it) => it.offsetLeft - start >= left - 4 && it.offsetLeft - start + it.offsetWidth <= right + 4)
      const first = visible.length ? items.indexOf(visible[0]) + 1 : 1
      const last = visible.length ? items.indexOf(visible[visible.length - 1]) + 1 : 1
      setState({first, last, total: items.length, atStart: left <= 4, atEnd: right >= el.scrollWidth - 4})
    }
    update()
    el.addEventListener('scroll', update, {passive: true})
    window.addEventListener('resize', update)
    return () => {
      el.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [])
  const go = (dir: 1 | -1) => {
    const el = track.current
    if (!el) return
    el.scrollBy({left: dir * el.clientWidth * 0.9, behavior: 'smooth'})
  }
  const pad = (n: number) => String(n).padStart(2, '0')
  return (
    <div className="bp-carousel">
      <div className="bp-carousel-track" ref={track} role="region" aria-label={label} tabIndex={0}>
        {children}
      </div>
      <div className="bp-carousel-foot">
        {counter ? (
          <span className="bp-carousel-count">
            <b>{pad(state.first)}–{pad(state.last)}</b> / {pad(state.total)}
          </span>
        ) : <span />}
        <span className="bp-carousel-arrows">
          <button type="button" aria-label="Previous" disabled={state.atStart} onClick={() => go(-1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6l-6 6 6 6" /></svg>
          </button>
          <button type="button" aria-label="Next" disabled={state.atEnd} onClick={() => go(1)}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6" /></svg>
          </button>
        </span>
      </div>
    </div>
  )
}

/** Library: guide tabs on the left, the selected guide on the right. */
export function LibraryTabs({tabs, panels, nav}: {tabs: ReactNode[]; panels: ReactNode[]; nav: ReactNode[]}) {
  const [active, setActive] = useState(0)
  return (
    <div className="bp-lib">
      <div className="bp-lib-side">
        <div className="bp-lib-tabs" role="tablist" aria-orientation="vertical">
          {tabs.map((t, i) => (
            <button key={i} type="button" role="tab" aria-selected={i === active} className={`bp-lib-tab${i === active ? ' is-active' : ''}`} onClick={() => setActive(i)}>
              {t}
            </button>
          ))}
        </div>
        {nav[active]}
      </div>
      <div className="bp-lib-panel" role="tabpanel">{panels[active]}</div>
    </div>
  )
}

/** The small "Book online 24/7" pill, bottom right, shown once the hero has scrolled away. */
export function BookingToggle({label, phone, callLabel}: {label: string; phone: string; callLabel?: string}) {
  const [shown, setShown] = useState(false)
  const [open, setOpen] = useState(false)
  useEffect(() => {
    const hero = document.querySelector('.bp-hero')
    if (!hero) return
    const io = new IntersectionObserver(([e]) => setShown(!e.isIntersecting), {threshold: 0})
    io.observe(hero)
    return () => io.disconnect()
  }, [])
  const tel = `tel:+1${phone.replace(/\D/g, '').slice(-10)}`
  return (
    <div className={`bp-booking${shown ? ' is-shown' : ''}`} aria-hidden={!shown}>
      {open && (
        <div className="bp-booking-menu">
          <a href="#quote" onClick={() => setOpen(false)}>Request a free estimate</a>
          <a href={tel}>{callLabel || 'Call'} {phone}</a>
        </div>
      )}
      <button type="button" className="bp-booking-pill" aria-expanded={open} onClick={() => setOpen(!open)} tabIndex={shown ? 0 : -1}>
        <span className="bp-booking-dot" aria-hidden="true" />
        {label}
      </button>
    </div>
  )
}
