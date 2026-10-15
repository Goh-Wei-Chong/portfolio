const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);

// A little welcome-desk dialogue. Add or reorder messages here.
export const shisaMessages = [
  'Hello, hello! You made it to the last stop.',
  'Take a little breather. The tabs can wait.',
  'A good day for a little curiosity, isn’t it?',
  'One more photo before you go?',
  'Got an idea? Wei Chong’s inbox is just above.',
  'I’m on welcome duty. Very important work.',
  'Thanks for stopping by. Come say hello again!',
];

const icons = {
  mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/>',
  linkedin: '<rect x="3" y="9" width="4" height="12" rx=".5"/><circle cx="5" cy="4.5" r="2"/><path d="M11 21V9h4v2c1-3 6-3 6 2v8m-6 0v-7"/>',
  github: '<path d="M9 21v-4c-4 1-4-2-6-2m15 6v-4c0-1-.3-1.7-1-2 4-.5 5-2.5 5-5 0-1.5-.5-2.5-1.5-3.5.3-1 .3-2.2-.3-3.5-2 0-3.2 1.2-3.2 1.2a12 12 0 0 0-8 0S7.8 3 5.8 3c-.6 1.3-.6 2.5-.3 3.5C4.5 7.5 4 8.5 4 10c0 2.5 1 4.5 5 5-.7.3-1 1-1 2v4"/>',
  camera: '<path d="M8 6 9.5 3h5L16 6h4a2 2 0 0 1 2 2v11H2V8a2 2 0 0 1 2-2Z"/><circle cx="12" cy="12" r="4"/>',
};
const icon = (name) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]}</svg>`;

export function footerMarkup({ profile, homeUrl, aboutUrl, photoUrl, assetUrl }) {
  const outgoing = (url, name, symbol) => `<a href="${esc(url)}" target="_blank" rel="noopener noreferrer">${icon(symbol)}<span>${name}</span><span class="sr-only"> (opens in a new tab)</span></a>`;
  return `<footer id="contact" class="site-footer last-stop-footer">
    <div class="wrap hello-wrap">
      <div class="hello-header"><span class="eyebrow">04 / SAY HELLO</span><span>A conversation is a good place to start.</span></div>
      <div class="hello-title"><h2>Let’s make<br><em>something matter.</em></h2><a href="mailto:${esc(profile.email)}" class="hello-send" aria-label="Email Wei Chong">↗</a></div>
      <div class="hello-contact"><a class="hello-email" href="mailto:${esc(profile.email)}">${esc(profile.email)}</a><button type="button" class="copy-email" aria-label="Copy email address">Copy email <span aria-hidden="true">⧉</span></button><span class="copy-status" role="status"></span></div>
    </div>
    <div class="last-stop-end">
      <div class="wrap">
        <nav class="footer-wayfinding" aria-label="Keep exploring"><div><span class="next-stop">NEXT STOP ↓</span><a href="${esc(aboutUrl)}">about</a><a href="${esc(photoUrl)}">photography</a></div><a class="back-top" href="#top">↑ BACK TO TOP</a></nav>
        <div class="footer-scene">
          <img class="last-stop-art" src="${assetUrl('images/footer/last-stop.svg')}" alt="" aria-hidden="true" loading="lazy" width="1000" height="390" />
          <div class="shisa-greeting">
            <p class="shisa-speech" id="shisa-speech" aria-hidden="true"></p>
            <p class="sr-only" data-shisa-announcement role="status" aria-live="polite" aria-atomic="true"></p>
            <button type="button" class="shisa-button" aria-label="Say hello to Shisa" aria-describedby="shisa-hint" aria-controls="shisa-speech" aria-expanded="false"><img src="${assetUrl('images/footer/shisa.webp')}" alt="" width="512" height="512" loading="lazy" decoding="async" /></button>
          </div>
          <span class="shisa-hint" id="shisa-hint">SHISA’S HERE. HOVER OR TAP TO SAY HELLO.</span>
        </div>
        <div class="footer-identity"><a href="${esc(homeUrl)}" class="end-signature">${profile.portrait.src ? `<img src="${assetUrl(profile.portrait.src)}" alt="" width="48" height="48" loading="lazy" />` : '<span class="end-monogram" aria-hidden="true">w.</span>'}<span>${esc(profile.name)}</span></a><span class="end-location">A LITTLE CURIOSITY, FROM ${esc(profile.location).toUpperCase()}.</span></div>
        <p class="footer-colophon">Made with curiosity, a camera, and a few too many open tabs.</p>
        <div class="end-socials">${outgoing(profile.linkedin, 'LinkedIn', 'linkedin')}<a href="mailto:${esc(profile.email)}">${icon('mail')}<span>Email</span></a>${outgoing(profile.github, 'GitHub', 'github')}<a href="${esc(photoUrl)}">${icon('camera')}<span>Photography</span></a></div>
        <div class="end-meta"><span>© ${new Date().getFullYear()} ${esc(profile.name)}</span><span>THANKS FOR STOPPING BY.</span></div>
      </div>
    </div>
  </footer>`;
}

export function initFooter() {
  const button = document.querySelector('.shisa-button');
  if (!button) return;
  const greeting = document.querySelector('.shisa-greeting');
  const speech = document.querySelector('.shisa-speech');
  const announcement = document.querySelector('[data-shisa-announcement]');
  let nextMessage = 0;
  let lastSpoke = -Infinity;
  let dismissTimer;
  let pointerInside = false;
  const hide = () => {
    greeting.classList.remove('is-chatty');
    button.setAttribute('aria-expanded', 'false');
  };
  const speak = () => {
    // Pointer entry, focus and click can belong to the same gesture.
    if (greeting.classList.contains('is-chatty') && performance.now() - lastSpoke < 350) return;
    lastSpoke = performance.now();
    clearTimeout(dismissTimer);
    speech.textContent = shisaMessages[nextMessage++ % shisaMessages.length];
    announcement.textContent = speech.textContent;
    greeting.classList.add('is-chatty');
    button.setAttribute('aria-expanded', 'true');
    if (!pointerInside && !button.matches(':focus-visible')) dismissTimer = setTimeout(hide, 6000);
  };
  greeting.addEventListener('pointerenter', (event) => {
    if (event.pointerType !== 'touch') { pointerInside = true; clearTimeout(dismissTimer); }
  });
  button.addEventListener('pointerenter', (event) => { if (event.pointerType !== 'touch') speak(); });
  button.addEventListener('focus', speak);
  button.addEventListener('click', speak);
  greeting.addEventListener('pointerleave', (event) => {
    if (event.pointerType !== 'touch') pointerInside = false;
    if (event.pointerType !== 'touch' && !button.matches(':focus-visible')) {
      clearTimeout(dismissTimer);
      dismissTimer = setTimeout(hide, 200);
    }
  });
  button.addEventListener('blur', () => { if (!pointerInside) hide(); });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && greeting.classList.contains('is-chatty')) { clearTimeout(dismissTimer); hide(); }
  });
}
