// Interactions for the static preview: job tabs, form chips, process rail, area rail, guide tabs, forms.
(() => {
  const $$ = (sel, el = document) => [...el.querySelectorAll(sel)];
  const pad = (n) => String(n).padStart(2, '0');

  // "Which job is this?" tabs
  $$('.ds-jobs').forEach((jobs) => {
    const tabs = $$('.ds-job-card', jobs);
    const panels = $$('.ds-job-panel', jobs);
    const select = (i) => {
      tabs.forEach((t, j) => { t.classList.toggle('is-active', i === j); t.setAttribute('aria-selected', String(i === j)); t.tabIndex = i === j ? 0 : -1; });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      jobs.style.setProperty('--active', i);
    };
    tabs.forEach((t, i) => t.addEventListener('click', () => select(i)));
  });

  // Radio chips in the quote form
  $$('.ds-chip-options').forEach((group) => {
    group.addEventListener('change', () => {
      $$('.ds-chip-option', group).forEach((l) => l.classList.toggle('is-selected', l.querySelector('input').checked));
    });
  });

  // Process steps: native horizontal scroll with snap; the rail follows it.
  $$('.ds-process').forEach((proc) => {
    const vp = proc.querySelector('.ds-track-viewport');
    const steps = $$('.ds-step', proc);
    const nodes = $$('.ds-rail-nodes li', proc);
    const count = proc.querySelector('.ds-rail-count b');
    const [prev, next] = $$('.ds-rail-arrows button', proc);
    if (!vp || !steps.length) return;
    let cur = 0;
    const render = (i) => {
      cur = i;
      steps.forEach((s, j) => s.classList.toggle('is-current', j === i));
      nodes.forEach((n, j) => { n.classList.toggle('is-current', j === i); n.classList.toggle('is-done', j < i); const b = n.querySelector('button'); if (j === i) b.setAttribute('aria-current', 'step'); else b.removeAttribute('aria-current'); });
      if (count) count.textContent = pad(i + 1);
      proc.style.setProperty('--done', steps.length > 1 ? i / (steps.length - 1) : 0);
      if (prev) prev.disabled = i === 0;
      if (next) next.disabled = i === steps.length - 1;
    };
    const go = (i) => {
      i = Math.max(0, Math.min(steps.length - 1, i));
      vp.scrollTo({ left: steps[i].offsetLeft - steps[0].offsetLeft, behavior: 'smooth' });
      render(i);
    };
    vp.addEventListener('scroll', () => {
      const x = vp.scrollLeft;
      const atEnd = x + vp.clientWidth >= vp.scrollWidth - 4;
      let best = 0, d = Infinity;
      steps.forEach((s, j) => { const dd = Math.abs(s.offsetLeft - steps[0].offsetLeft - x); if (dd < d) { d = dd; best = j; } });
      render(atEnd && best < steps.length - 1 && d > 40 ? steps.length - 1 : best);
    }, { passive: true });
    nodes.forEach((n, i) => n.querySelector('button').addEventListener('click', () => go(i)));
    prev && prev.addEventListener('click', () => go(cur - 1));
    next && next.addEventListener('click', () => go(cur + 1));
    render(0);
  });

  // Service-area rail
  $$('.ds-areas').forEach((wrap) => {
    const rail = wrap.querySelector('.ds-area-rail');
    const cards = $$('.ds-area-card', wrap);
    const count = wrap.querySelector('.ds-rail-count b');
    const [prev, next] = $$('.ds-rail-arrows button', wrap);
    if (!rail || !cards.length) return;
    const update = () => {
      const w = cards[0].getBoundingClientRect().width + 20;
      const first = Math.round(rail.scrollLeft / w);
      const visible = Math.max(1, Math.round(rail.clientWidth / w));
      const last = Math.min(cards.length, first + visible);
      if (count) count.textContent = `${pad(first + 1)}–${pad(last)}`;
      if (prev) prev.disabled = rail.scrollLeft <= 2;
      if (next) next.disabled = rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2;
    };
    const step = (dir) => rail.scrollBy({ left: dir * rail.clientWidth * 0.9, behavior: 'smooth' });
    prev && prev.addEventListener('click', () => step(-1));
    next && next.addEventListener('click', () => step(1));
    rail.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  // Guide tabs
  $$('.ds-library').forEach((lib) => {
    const tabs = $$('.ds-guide-tab', lib);
    const panels = $$('.ds-guide', lib);
    const tocs = $$('.ds-guide-toc', lib);
    tabs.forEach((t, i) => t.addEventListener('click', () => {
      tabs.forEach((x, j) => { x.classList.toggle('is-active', i === j); x.setAttribute('aria-selected', String(i === j)); x.tabIndex = i === j ? 0 : -1; x.querySelector('.ds-badge').className = `ds-badge ds-badge--${i === j ? 'navy' : 'blue'}`; });
      panels.forEach((p, j) => { p.hidden = i !== j; });
      tocs.forEach((n, j) => { n.hidden = i !== j; });
    }));
  });

  // Forms never submit in the preview.
  $$('form').forEach((f) => f.addEventListener('submit', (e) => {
    e.preventDefault();
    if (f.querySelector('.pv-form-msg')) return;
    const p = document.createElement('p');
    p.className = 'pv-form-msg';
    p.textContent = 'Preview only: this form does not send. Call (773) 262-3333 to reach Highlights Chicago.';
    f.appendChild(p);
  }));
})();
