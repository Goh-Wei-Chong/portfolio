// Scroll cameos use existing character artwork; source credits are in docs/ASSETS.md.
const characters = {
  adventure: [
    { src: 'images/cameos/finn.png', name: 'finn' },
    { src: 'images/cameos/jake.png', name: 'jake' },
  ],
  chiikawa: [{ src: 'images/footer/shisa-official.png', name: 'chiikawa' }],
  bill: [{ src: 'images/cameos/bill-cipher.png', name: 'bill' }],
};

export function initCameos({ isPhotography, assetUrl }) {
  if (!('IntersectionObserver' in window)) return;
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const placements = isPhotography
    ? [
        ['.gallery-section', 'adventure', 'left', 'spaced'],
        ['.gallery-end', 'chiikawa', 'right', 'gallery'],
        ['#contact', 'bill', 'left', ''],
      ]
    : [
        ['#about', 'adventure', 'left', ''],
        ['#work', 'chiikawa', 'right', ''],
        ['.photography-preview', 'bill', 'left', ''],
      ];
  const slots = [];
  let active;
  let hasScrolled = false;
  const seen = new Set();

  placements.forEach(([selector, character, side, spacing]) => {
    const target = document.querySelector(selector);
    if (!target) return;
    const slot = document.createElement('div');
    slot.className = `cameo-slot ${spacing ? `cameo-slot--${spacing}` : ''}`;
    slot.setAttribute('aria-hidden', 'true');
    slot.dataset.cameo = character;
    slot.innerHTML = `<div class="cameo-stage"><div class="scroll-cameo scroll-cameo--${side} scroll-cameo--${character}">${characters[character].map(({ src, name }) => `<span class="cameo-art cameo-art--${name}"><img src="${assetUrl(src)}" alt="" loading="lazy" decoding="async" draggable="false" /></span>`).join('')}</div></div>`;
    target.before(slot);
    slots.push(slot);
  });

  // Give the gallery a breathing space after complete rows on 2- and 3-column grids.
  const gallerySlot = slots.find((slot) => slot.classList.contains('cameo-slot--gallery'));
  function placeGalleryCameo() {
    if (!gallerySlot) return;
    const visible = [...document.querySelectorAll('.gallery-item')].filter((item) => !item.hidden);
    if (visible.length > 6) {
      visible[Math.min(12, Math.floor((visible.length - 1) / 6) * 6) - 1].after(gallerySlot);
      gallerySlot.hidden = false;
    } else {
      gallerySlot.hidden = true;
    }
  }
  placeGalleryCameo();

  // Full-width clipping stays inside the actual viewport, including scrollbar width.
  function sizeStages() {
    const width = document.documentElement.clientWidth;
    slots.forEach((slot) => {
      const stage = slot.querySelector('.cameo-stage');
      stage.style.width = `${width}px`;
      stage.style.marginLeft = `${-slot.getBoundingClientRect().left}px`;
    });
  }
  sizeStages();
  addEventListener('resize', sizeStages, { passive: true });
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    placeGalleryCameo();
    sizeStages();
  }));

  const stop = () => {
    active?.querySelector('.scroll-cameo').classList.remove('is-peeking');
    active = null;
    // Reconsider only anchors still in view, without queuing off-screen animations.
    observer.disconnect();
    observe();
  };
  const observer = new IntersectionObserver((entries) => {
    if (!hasScrolled || active || reducedMotion.matches || document.hidden || document.body.classList.contains('modal-open')) return;
    const entry = entries.filter((item) => item.isIntersecting && !item.target.hidden && !seen.has(item.target))
      .sort((a, b) => Math.abs(a.boundingClientRect.top - innerHeight / 2) - Math.abs(b.boundingClientRect.top - innerHeight / 2))[0];
    if (!entry) return;
    const slot = entry.target;
    active = slot;
    seen.add(slot);
    observer.unobserve(slot);
    const cameo = slot.querySelector('.scroll-cameo');
    // Off-screen transforms can keep lazy images deferred. Decode before revealing.
    Promise.all([...cameo.querySelectorAll('img')].map((img) => {
      img.loading = 'eager';
      return img.decode();
    })).then(() => {
      if (active !== slot) return;
      const rect = slot.getBoundingClientRect();
      if (rect.bottom < 60 || rect.top > innerHeight - 60 || reducedMotion.matches || document.hidden || document.body.classList.contains('modal-open')) { stop(); return; }
      cameo.addEventListener('animationend', stop, { once: true });
      cameo.classList.add('is-peeking');
    }).catch(() => { if (active === slot) stop(); });
  }, { rootMargin: '-60px 0px -60px 0px', threshold: 0 });

  const observe = () => {
    if (!hasScrolled || reducedMotion.matches || document.hidden || document.body.classList.contains('modal-open')) return;
    slots.filter((slot) => !seen.has(slot)).forEach((slot) => observer.observe(slot));
  };
  const arm = () => {
    if (scrollY < 60) return;
    hasScrolled = true;
    removeEventListener('scroll', arm);
    observe();
  };
  addEventListener('scroll', arm, { passive: true });
  reducedMotion.addEventListener('change', () => {
    stop();
    observer.disconnect();
    observe();
  });
  document.addEventListener('visibilitychange', stop);
  document.querySelectorAll('dialog').forEach((dialog) => dialog.addEventListener('close', () => {
    observer.disconnect();
    observe();
  }));
}
