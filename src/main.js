import './styles.css';
import './theme.css';
import { themeToggleMarkup, initTheme } from './theme.js';
import './footer.css';
import { footerMarkup, initFooter } from './footer.js';
import { profile, projects, experience, education, skills, photos } from './content.js';
import { icon } from './icons.js';
import './cameos.css';
import { initCameos } from './cameos.js';

const base = import.meta.env.BASE_URL;
const asset = (path) => `${base}${path}`;
const esc = (value = '') => String(value).replace(/[&<>"']/g, (char) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
const arrow = icon('arrow-up-right');
const isPhotography = /\/photography\/?(?:index\.html)?$/.test(location.pathname);
const home = (hash = '') => `${base}${hash}`;
const photoPage = asset('photography/');
const external = (url, text, className = '') => `<a class="${className}" href="${esc(url)}" target="_blank" rel="noopener noreferrer">${text}<span class="sr-only"> (opens in a new tab)</span>${arrow}</a>`;

function header() {
  return `<header id="top" class="site-header wrap">
    <a class="brand" href="${home()}" aria-label="Goh Wei Chong, home"><span class="brand-mark" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span>GWC<span class="brand-period">.</span></span></a>
    <nav aria-label="Main navigation"><a href="${home('#about')}">About</a><a href="${home('#work')}">Work</a><a href="${photoPage}" ${isPhotography ? 'aria-current="page"' : ''}>Photography</a><a href="${home('#contact')}">Let’s talk <span aria-hidden="true">${arrow}</span></a></nav>
    <div class="header-tools">${themeToggleMarkup()}<div class="local-time"><span class="status-dot"></span> ${esc(profile.location)} <time id="sg-time"></time></div></div>
  </header>`;
}

function portrait() {
  return `<div class="hero-portrait"><div class="portrait-frame">${profile.portrait.src
    ? `<img src="${asset(profile.portrait.src)}" alt="${esc(profile.portrait.alt)}" width="960" height="1280" fetchpriority="high" decoding="async" />`
    : `<div class="portrait-placeholder" role="img" aria-label="A space for Wei Chong’s portrait"><span class="corner corner-tl"></span><span class="corner corner-br"></span><div class="portrait-monogram">w<span>c.</span></div><span class="placeholder-caption">YOUR PORTRAIT HERE <span>${arrow}</span></span></div>`}
    <span class="portrait-note"><span class="status-dot"></span>${esc(profile.availability)}</span></div></div>`;
}

function projectArtwork(project, index) {
  if (project.image) return `<img src="${asset(project.image)}" alt="${esc(project.imageAlt)}" loading="lazy" width="900" height="680" />`;
  const art = [
    `<div class="analytics-window"><div class="window-bar"><span>${icon('window-controls', 'window-controls-icon')}</span><span>news_analysis.ipynb</span><span>${arrow}</span></div><div class="analytics-inner"><span class="mock-kicker">EXPLORING THE BBC NEWS DATASET</span><div class="mock-title">Words into<br><em>understanding.</em></div><div class="data-bars">${[32,56,42,78,64,94,72,100,85,66,91,76].map((n) => `<i style="--bar:${n}%"></i>`).join('')}</div><div class="mock-bottom"><span>Patterns. Associations. Predictions.</span><span>01 / 03</span></div></div></div>`,
    `<div class="judging-window"><div class="window-bar"><span class="mock-logo">j.</span><span>COMPETITION JUDGING</span><span>${icon('more')}</span></div><div class="judging-inner"><span class="mock-kicker">A GROUP WEB DEVELOPMENT PROJECT</span><div class="mock-title">Good ideas.<br>Shared effort.</div><div class="judging-row"><span>ASP.NET</span><i></i><span>01</span></div><div class="judging-row"><span>C# + SQL</span><i></i><span>02</span></div><div class="judging-row"><span>Built together</span><i></i><span>03</span></div></div></div>`,
    `<div class="explore-window"><div class="window-bar"><span>EXPLORE / PLAY</span><span>${arrow}</span></div><div class="explore-inner"><div class="orbit-art"><i></i><i></i><i></i><span>?</span></div><div class="explore-title">A little<br><em>discovery.</em></div><div class="mock-bottom"><span>Search · Discover · Play</span><span>API ${icon('arrow-right')} WEB</span></div></div></div>`,
  ];
  return `<div class="project-art art-${index}">${art[index % art.length]}<span class="art-disclaimer">Illustrative cover · add your screenshot</span></div>`;
}

function projectCards() {
  return projects.map((project, index) => `<article class="project-card"><button class="project-open" data-project="${esc(project.id)}" aria-label="Read about ${esc(project.title)}"><div class="project-image">${projectArtwork(project, index)}<span class="project-view">View project ${arrow}</span></div><div class="project-meta"><span>${String(index + 1).padStart(2, '0')} / ${esc(project.category)}</span><span>${esc(project.year)}</span></div><div class="project-heading"><h3>${esc(project.title)}</h3>${arrow}</div></button><p>${esc(project.description)}</p><div class="tags">${project.tools.slice(0, 3).map((tool) => `<span>${esc(tool)}</span>`).join('')}</div></article>`).join('');
}

function photoFrame(photo, index, preview = false) {
  const width = photo.width || (photo.orientation === 'portrait' ? 800 : 1200);
  const height = photo.height || (photo.orientation === 'portrait' ? 1200 : 800);
  // Thumbnails are exported with a 900px long edge; full images are used in the lightbox.
  const thumbnailWidth = Math.round(width * Math.min(1, 900 / Math.max(width, height)));
  const sizes = !preview && photo.orientation === 'landscape'
    ? '(max-width: 1440px) 94vw, 1320px'
    : '(max-width: 540px) 46vw, (max-width: 1440px) 31vw, 440px';
  const responsive = photo.thumbnail && photo.width && photo.height
    ? `srcset="${asset(photo.thumbnail)} ${thumbnailWidth}w, ${asset(photo.src)} ${width}w" sizes="${sizes}"` : '';
  return `<div class="photo-frame tone-${index % 6} ${esc(photo.orientation)} ${photo.src ? 'has-image' : ''}" style="--photo-ratio:${width}/${height}">${photo.src
    ? `<img src="${asset(photo.thumbnail || photo.src)}" ${responsive} alt="${esc(photo.alt)}" loading="lazy" decoding="async" width="${width}" height="${height}" />`
    : `<div class="empty-photo"><span class="frame-number">FRAME ${String(index + 1).padStart(2, '0')}</span><div class="frame-geometry" aria-hidden="true"><i></i><i></i></div><span class="frame-add">${preview ? 'A moment, waiting to be added.' : 'Your photograph here'}<span aria-hidden="true">${icon('plus')}</span></span></div>`}</div>`;
}

function footer() {
  return footerMarkup({ profile, homeUrl: home(), aboutUrl: home('#about'), photoUrl: photoPage, assetUrl: asset });
}

function portfolio() {
  return `${header()}<main id="main"><section class="hero wrap" aria-labelledby="hero-title"><div class="hero-top"><span class="eyebrow"><span class="tiny-star" aria-hidden="true">${icon('asterisk')}</span> A PORTFOLIO OF WORK & CURIOSITY</span><span class="hero-edition">EST. IN SINGAPORE<br>ALWAYS A WORK IN PROGRESS</span></div><div class="hero-title-row"><h1 id="hero-title">GOH<br><span>WEI CHONG<span class="title-dot">.</span></span></h1><div class="hero-side"><span class="vertical-label">BUILDING. LEARNING. OBSERVING.</span></div></div><div class="hero-bottom"><div class="hero-description"><span class="small-index">( HELLO, WORLD )</span><p>Computer science.<br>Considered solutions.<br><em>A curious eye.</em></p><a class="text-link" href="#work">Explore my work <span aria-hidden="true">${icon('arrow-down')}</span></a></div>${portrait()}<div class="hero-bio"><span class="status-line"><span class="status-dot"></span>${esc(profile.role)}</span><p>At the intersection of<br>technology and the everyday.</p><div class="hero-bio-foot"><span>NATIONAL UNIVERSITY<br>OF SINGAPORE</span><span>01 — 04</span></div></div></div></section>
    <section id="about" class="about-section wrap section"><div class="section-label"><span class="eyebrow">01 / A LITTLE ABOUT ME</span><span class="label-symbol" aria-hidden="true">${icon('arrow-down-right')}</span></div><div class="about-main"><h2>I like understanding<br>how things work.<br><span>Then making them better.</span></h2><div class="about-copy"><p>${esc(profile.intro)}</p><p>My experience spans data analytics, machine learning, and web development. Away from the screen, photography gives me another way to slow down, pay attention, and see a little differently.</p><div class="about-links">${external(profile.linkedin, 'More about me', 'text-link')}${profile.resume ? `<a class="text-link" href="${asset(profile.resume)}" target="_blank" rel="noopener">View résumé ${arrow}</a>` : ''}</div></div><div class="skills-grid">${skills.map((group) => `<div><h3>${esc(group.label)}</h3><p>${group.items.map(esc).join('<br>')}</p></div>`).join('')}</div></div></section>
    <section id="work" class="work-section wrap section"><div class="section-header"><div><span class="eyebrow">02 / SELECTED WORK</span><h2>Ideas, put<br><em>into practice.</em></h2></div><p>A few things I’ve built and explored.<br>From the classroom to the browser.</p></div><div class="project-grid">${projectCards()}</div></section>
    <section id="experience" class="experience-section wrap section"><div class="section-label"><span class="eyebrow">THE JOURNEY SO FAR</span><span class="label-symbol" aria-hidden="true">${icon('arrow-down-right')}</span></div><div class="experience-main"><h2>Learning by doing.</h2><div class="experience-list">${experience.map((item) => `<article class="experience-row"><div class="experience-date">${esc(item.dates)}</div><div><h3>${esc(item.role)}</h3><span class="company">${esc(item.company)}</span><p>${esc(item.description)}</p><ul>${item.highlights.map((text) => `<li>${esc(text)}</li>`).join('')}</ul></div></article>`).join('')}</div><div class="education-header"><span class="eyebrow">EDUCATION</span><span>Foundations & new perspectives</span></div>${education.map((item) => `<article class="education-row"><span>${esc(item.dates)}</span><div><h3>${esc(item.school)}</h3><p>${esc(item.qualification)}</p><span class="education-note">${esc(item.note)}</span></div></article>`).join('')}</div></section>
    <section class="photography-preview section"><div class="wrap"><div class="section-header"><div><span class="eyebrow">03 / THROUGH MY LENS</span><h2>A different<br><em>kind of focus.</em></h2></div><div><p>Beyond the screen, there’s a world<br>worth paying attention to.</p><a class="text-link" href="${photoPage}">Explore photography ${arrow}</a></div></div><a href="${photoPage}" class="photo-preview-grid" aria-label="Explore the photography gallery">${photos.slice(0, 3).map((photo, index) => photoFrame(photo, index, true)).join('')}</a><div class="gallery-note"><span>Light, colour, and the everyday.</span><span>${photos.filter((photo) => photo.src).length} SELECTED PHOTOGRAPHS ${arrow}</span></div></div></section>
  </main>${footer()}<dialog id="project-dialog" class="project-dialog" aria-labelledby="project-dialog-title"><button class="dialog-close" aria-label="Close project">${icon('close')}</button><div class="dialog-body"></div></dialog>`;
}

function photography() {
  const categories = ['All', ...new Set(photos.map((photo) => photo.category))];
  return `${header()}<main id="main"><section class="photo-hero wrap"><a class="text-link back-link" href="${home()}">${icon('arrow-left')} Back to portfolio</a><div class="photo-title-line"><div><span class="eyebrow">A PERSONAL VISUAL JOURNAL</span><h1>Through<br><em>my lens.</em><span class="title-dot">*</span></h1></div><div class="photo-intro"><span class="tiny-star" aria-hidden="true">${icon('asterisk')}</span><p>Warm light. Deep shadows.<br>Everyday stories.</p><span>Portraits, city nights, and details<br>collected along the way.</span></div></div><div class="photo-series"><span class="eyebrow">LIGHT, COLOUR & QUIET MOMENTS</span><p>A collection of small observations.</p></div><div class="photo-toolbar"><div class="filters" role="group" aria-label="Filter photographs">${categories.map((category) => `<button class="filter ${category === 'All' ? 'active' : ''}" data-filter="${esc(category)}" aria-pressed="${category === 'All'}">${esc(category)}</button>`).join('')}</div><span id="photo-count" role="status">${photos.length} frames</span></div></section><section class="gallery-section wrap" aria-label="Photographs"><div class="photo-gallery">${photos.map((photo, index) => `<article class="gallery-item ${photo.orientation === 'landscape' ? 'gallery-wide' : ''}" data-category="${esc(photo.category)}" style="--stagger:${index % 3 === 1 ? 55 : 0}px;--mobile-stagger:${index % 2 ? 30 : 0}px"><button class="photo-open" data-photo="${esc(photo.id)}" aria-label="Open ${esc(photo.title)}${photo.src ? '' : ', photo placeholder'}">${photoFrame(photo, index)}<span class="photo-caption"><span>${esc(photo.title)}</span><span>${photo.src ? ([photo.location, photo.year].filter(Boolean).length ? [photo.location, photo.year].filter(Boolean) : [photo.category]).map(esc).join(' · ') : 'TO BE FILLED'}</span></span></button></article>`).join('')}</div><div class="gallery-end"><span aria-hidden="true">${icon('asterisk')}</span><p>There’s always more to see.</p><span>More moments will find their way here.</span></div></section></main>${footer()}<dialog id="photo-dialog" class="photo-dialog" aria-labelledby="photo-dialog-title"><div class="lightbox-toolbar"><span id="lightbox-count"></span><button class="dialog-close" aria-label="Close photograph">${icon('close')}</button></div><div class="lightbox-content"></div><div class="lightbox-controls"><button id="photo-prev" aria-label="Previous photograph">${icon('arrow-left')}</button><p id="photo-dialog-title"></p><button id="photo-next" aria-label="Next photograph">${icon('arrow-right')}</button></div></dialog>`;
}

document.querySelector('#app').innerHTML = isPhotography ? photography() : portfolio();
initTheme();
initFooter();

function updateClock() {
  const clock = document.querySelector('#sg-time');
  clock.textContent = new Intl.DateTimeFormat('en-SG', { hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'Asia/Singapore' }).format(new Date());
  clock.dateTime = new Date().toISOString();
}
updateClock();
setInterval(updateClock, 60000);

document.querySelector('.copy-email').addEventListener('click', async () => {
  const status = document.querySelector('.copy-status');
  try { await navigator.clipboard.writeText(profile.email); status.textContent = 'Email copied'; }
  catch { status.textContent = `Copy this address: ${profile.email}`; }
  setTimeout(() => { status.textContent = ''; }, 5000);
});

let lastFocused;
function openDialog(dialog) { lastFocused = document.activeElement; dialog.showModal(); document.body.classList.add('modal-open'); }
document.querySelectorAll('dialog').forEach((dialog) => {
  dialog.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', (event) => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  dialog.addEventListener('close', () => { document.body.classList.remove('modal-open'); lastFocused?.focus(); });
});

document.querySelectorAll('[data-project]').forEach((button) => button.addEventListener('click', () => {
  const project = projects.find((entry) => entry.id === button.dataset.project);
  const dialog = document.querySelector('#project-dialog');
  dialog.querySelector('.dialog-body').innerHTML = `<span class="eyebrow">${esc(project.category)} / ${esc(project.year)}</span><h2 id="project-dialog-title">${esc(project.title)}</h2><p class="dialog-description">${esc(project.description)}</p><div class="dialog-facts"><span>CONTEXT<br><strong>${esc(project.role)}</strong></span><span>TOOLS<br><strong>${project.tools.map(esc).join(' · ')}</strong></span></div><h3>About the project</h3><ul>${project.details.map((detail) => `<li>${esc(detail)}</li>`).join('')}</ul>${project.image ? `<img class="dialog-project-image" src="${asset(project.image)}" alt="${esc(project.imageAlt)}" />` : '<p class="project-pending">Project screenshots and a fuller case study can be added here.</p>'}<div class="dialog-links">${project.sourceUrl ? external(project.sourceUrl, 'View source', 'text-link') : ''}${project.liveUrl ? external(project.liveUrl, 'Live project', 'text-link') : ''}</div>`;
  openDialog(dialog);
}));

if (isPhotography) {
  let category = 'All';
  let currentIndex = 0;
  const visiblePhotos = () => photos.filter((photo) => category === 'All' || photo.category === category);
  const dialog = document.querySelector('#photo-dialog');
  function layoutGallery() {
    const allItems = [...document.querySelectorAll('.gallery-item')];
    allItems.forEach((item) => item.classList.remove('gallery-final-desktop', 'gallery-final-mobile'));
    let column = 0;
    let lastItem;
    const finishGroup = () => {
      if (lastItem && column % 3 === 1) lastItem.classList.add('gallery-final-desktop');
      if (lastItem && column % 2 === 1) lastItem.classList.add('gallery-final-mobile');
    };
    allItems.filter((item) => !item.hidden).forEach((item) => {
      if (item.classList.contains('gallery-wide')) {
        finishGroup();
        item.style.setProperty('--stagger', '0px');
        item.style.setProperty('--mobile-stagger', '0px');
        column = 0;
        lastItem = null;
      } else {
        item.style.setProperty('--stagger', column % 3 === 1 ? '55px' : '0px');
        item.style.setProperty('--mobile-stagger', column % 2 ? '30px' : '0px');
        column += 1;
        lastItem = item;
      }
    });
    finishGroup();
  }
  layoutGallery();
  function renderLightbox() {
    const visible = visiblePhotos();
    const photo = visible[currentIndex];
    document.querySelector('.lightbox-content').innerHTML = photo.src
      ? `<img src="${asset(photo.src)}" alt="${esc(photo.alt)}" />`
      : `<div class="lightbox-placeholder">${photoFrame(photo, photos.indexOf(photo))}<p>This frame is ready for your photograph.</p></div>`;
    document.querySelector('#lightbox-count').textContent = `${String(currentIndex + 1).padStart(2, '0')} / ${String(visible.length).padStart(2, '0')}`;
    document.querySelector('#photo-dialog-title').textContent = [photo.title, photo.location, photo.year].filter(Boolean).join(' · ');
    document.querySelector('#photo-prev').disabled = visible.length < 2;
    document.querySelector('#photo-next').disabled = visible.length < 2;
  }
  document.querySelectorAll('[data-filter]').forEach((button) => button.addEventListener('click', () => {
    category = button.dataset.filter;
    document.querySelectorAll('[data-filter]').forEach((item) => { const active = item === button; item.classList.toggle('active', active); item.setAttribute('aria-pressed', String(active)); });
    document.querySelectorAll('.gallery-item').forEach((item) => { item.hidden = category !== 'All' && item.dataset.category !== category; });
    layoutGallery();
    document.querySelector('#photo-count').textContent = `${visiblePhotos().length} frames`;
  }));
  document.querySelectorAll('[data-photo]').forEach((button) => button.addEventListener('click', () => { currentIndex = visiblePhotos().findIndex((photo) => photo.id === button.dataset.photo); renderLightbox(); openDialog(dialog); }));
  function step(direction) { currentIndex = (currentIndex + direction + visiblePhotos().length) % visiblePhotos().length; renderLightbox(); }
  document.querySelector('#photo-prev').addEventListener('click', () => step(-1));
  document.querySelector('#photo-next').addEventListener('click', () => step(1));
  dialog.addEventListener('keydown', (event) => { if (event.key === 'ArrowLeft') { event.preventDefault(); step(-1); } if (event.key === 'ArrowRight') { event.preventDefault(); step(1); } });
}

// Register after gallery filters so cameo placement follows the visible photographs.
initCameos({ isPhotography, assetUrl: asset });
