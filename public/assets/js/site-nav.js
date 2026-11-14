// Site header behaviour: the Services menu, "View more" per column, and the phone sheet.
(() => {
  const root = document.querySelector('.sn');
  if (!root) return;
  const CAP = 8; // a column shows its first 8 pages; the rest open in place
  const bar = root.querySelector('.sn-nav-inner');
  const menus = [...root.querySelectorAll('.sn-has-menu')];
  const hover = matchMedia('(hover: hover)').matches;
  let hoverT = null;

  // Desktop columns: show the first CAP pages; "View N more" opens the rest in place.
  function layoutColumn(col) {
    const items = [...col.querySelectorAll('.sn-items > li')];
    const open = col.dataset.open === '1';
    items.forEach((li, i) => { li.hidden = !open && i >= CAP; });
    const extra = items.length - CAP;
    const more = col.querySelector('.sn-more');
    more.hidden = extra <= 0;
    more.textContent = open ? 'Show less' : `View ${extra} more`;
    more.setAttribute('aria-expanded', String(open));
  }
  const layoutAll = () => root.querySelectorAll('.sn-col').forEach(layoutColumn);

  function place(li) {
    const panel = li.querySelector('.sn-panel');
    const r = bar.getBoundingClientRect();
    const left = li.getBoundingClientRect().left - r.left - 31;
    panel.style.left = `${Math.max(0, Math.min(left, bar.clientWidth - panel.offsetWidth))}px`;
    panel.style.setProperty('--sn-top', `${r.bottom}px`);
  }
  function setOpen(li, on) {
    li.querySelector('.sn-panel').hidden = !on;
    li.classList.toggle('is-open', on);
    li.querySelector('.sn-top').setAttribute('aria-expanded', String(on));
    if (on) place(li);
  }
  const isOpen = (li) => li.classList.contains('is-open');
  const closeAll = (except) => menus.forEach((m) => m !== except && isOpen(m) && setOpen(m, false));

  menus.forEach((li) => {
    // The nav looks exactly like the live one (no arrow): the menu opens on hover and on keyboard focus;
    // clicking Services still opens /services.
    li.addEventListener('focusin', () => { clearTimeout(hoverT); closeAll(li); setOpen(li, true); });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) setOpen(li, false); });
    if (hover) {
      li.addEventListener('pointerenter', () => { clearTimeout(hoverT); hoverT = setTimeout(() => { closeAll(li); setOpen(li, true); }, 70); });
      li.addEventListener('pointerleave', () => { clearTimeout(hoverT); hoverT = setTimeout(() => setOpen(li, false), 240); });
    }
    li.querySelector('.sn-panel').addEventListener('click', (e) => {
      e.stopPropagation();
      const more = e.target.closest('.sn-more');
      if (!more) return;
      const col = more.closest('.sn-col');
      col.dataset.open = col.dataset.open === '1' ? '0' : '1';
      layoutColumn(col);
      more.focus();
    });
  });
  document.addEventListener('click', () => closeAll());
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = menus.find(isOpen);
    if (open) { setOpen(open, false); open.querySelector('.sn-top').focus(); }
  });
  addEventListener('resize', () => menus.forEach((m) => isOpen(m) && place(m)));

  // Phone sheet: the menu button, then the Services row and each group expand in place.
  const burger = root.querySelector('.sn-burger');
  const sheet = root.querySelector('.sn-sheet');
  burger.addEventListener('click', () => {
    sheet.hidden = !sheet.hidden;
    burger.setAttribute('aria-expanded', String(!sheet.hidden));
    burger.setAttribute('aria-label', sheet.hidden ? 'Open navigation menu' : 'Close navigation menu');
  });
  sheet.addEventListener('click', (e) => {
    const toggle = e.target.closest('.sn-sheet-row[aria-controls], .sn-sheet-cat');
    if (!toggle) return;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    document.getElementById(toggle.getAttribute('aria-controls')).hidden = open;
  });

  layoutAll();
})();
