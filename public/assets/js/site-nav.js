// Site header behaviour: the Services and Resources dropdowns (hover, focus or tap) and the phone menu.
(() => {
  const root = document.querySelector('.sn');
  if (!root) return;
  const menus = [...root.querySelectorAll('.sn-has-menu')];
  const hover = matchMedia('(hover: hover)').matches;
  let timer = null;

  const isOpen = (li) => li.classList.contains('is-open');
  function setOpen(li, on) {
    const panel = li.querySelector('.sn-panel');
    panel.hidden = !on;
    li.classList.toggle('is-open', on);
    li.querySelector('.sn-top').setAttribute('aria-expanded', String(on));
    // Resources sits under its own label; Services spans the whole 1180 frame.
    if (on && panel.classList.contains('sn-panel--resources')) {
      const bar = root.querySelector('.sn-nav-inner').getBoundingClientRect();
      const item = li.getBoundingClientRect();
      const left = Math.min(item.left - bar.left - 24, bar.width - panel.offsetWidth);
      panel.style.left = `${Math.max(0, left)}px`;
    }
  }
  const closeAll = (except) => menus.forEach((m) => m !== except && isOpen(m) && setOpen(m, false));

  menus.forEach((li) => {
    const top = li.querySelector('.sn-top');
    if (hover) {
      li.addEventListener('pointerenter', () => { clearTimeout(timer); timer = setTimeout(() => { closeAll(li); setOpen(li, true); }, 60); });
      li.addEventListener('pointerleave', () => { clearTimeout(timer); timer = setTimeout(() => setOpen(li, false), 220); });
    } else {
      // Touch screens: the first tap opens the menu, a second tap follows the link.
      top.addEventListener('click', (e) => { if (!isOpen(li)) { e.preventDefault(); closeAll(li); setOpen(li, true); } });
    }
    li.addEventListener('focusin', () => { closeAll(li); setOpen(li, true); });
    li.addEventListener('focusout', (e) => { if (!li.contains(e.relatedTarget)) setOpen(li, false); });
  });
  document.addEventListener('click', (e) => { if (!e.target.closest('.sn-has-menu')) closeAll(); });
  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    const open = menus.find(isOpen);
    if (open) { setOpen(open, false); open.querySelector('.sn-top').focus(); }
  });

  // Phone menu
  const burger = root.querySelector('.sn-burger');
  const sheet = root.querySelector('.sn-sheet');
  burger.addEventListener('click', () => {
    sheet.hidden = !sheet.hidden;
    burger.setAttribute('aria-expanded', String(!sheet.hidden));
    burger.setAttribute('aria-label', sheet.hidden ? 'Open navigation menu' : 'Close navigation menu');
  });
  sheet.addEventListener('click', (e) => {
    const toggle = e.target.closest('.sn-row--toggle');
    if (!toggle) return;
    const open = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!open));
    document.getElementById(toggle.getAttribute('aria-controls')).hidden = open;
  });
})();
