const STORAGE_KEY = 'gwc-theme';
const THEME_COLOURS = { light: '#f5f4ef', dark: '#191d18' };
let explicitTheme = null;
let initialized = false;
const boundButtons = new WeakSet();

const isTheme = (value) => value === 'light' || value === 'dark';

function savedTheme() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return isTheme(value) ? value : null;
  } catch {
    return null;
  }
}

function systemQuery() {
  try {
    return window.matchMedia('(prefers-color-scheme: dark)');
  } catch {
    return null;
  }
}

function systemTheme() {
  return systemQuery()?.matches ? 'dark' : 'light';
}

function currentTheme() {
  const value = document.documentElement.dataset.theme;
  return isTheme(value) ? value : (savedTheme() || systemTheme());
}

function syncButtons(theme) {
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    // A stable name lets assistive technology announce the toggle's pressed state.
    button.setAttribute('aria-label', 'Dark mode');
    button.setAttribute('aria-pressed', String(theme === 'dark'));
    button.title = `Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`;
    const label = button.querySelector('.theme-toggle-label');
    if (label) label.textContent = theme === 'dark' ? 'Dark' : 'Light';
  });
}

function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.documentElement.style.colorScheme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', THEME_COLOURS[theme]);
  syncButtons(theme);
}

export function themeToggleMarkup() {
  const theme = currentTheme();
  return `<button type="button" class="theme-toggle" data-theme-toggle aria-label="Dark mode" aria-pressed="${theme === 'dark'}" title="Switch to ${theme === 'dark' ? 'light' : 'dark'} mode"><svg class="theme-toggle-icon theme-icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/></svg><svg class="theme-toggle-icon theme-icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.7 13.1A8.8 8.8 0 0 1 10.9 3.3a8.8 8.8 0 1 0 9.8 9.8Z"/></svg><span class="theme-toggle-label" aria-hidden="true">${theme === 'dark' ? 'Dark' : 'Light'}</span></button>`;
}

export function initTheme() {
  if (!initialized) {
    explicitTheme = savedTheme();
    const query = systemQuery();
    const followSystem = (event) => {
      if (!explicitTheme) applyTheme(event.matches ? 'dark' : 'light');
    };
    if (query?.addEventListener) query.addEventListener('change', followSystem);
    else query?.addListener?.(followSystem);
    window.addEventListener('storage', (event) => {
      if (event.key !== STORAGE_KEY && event.key !== null) return;
      explicitTheme = isTheme(event.newValue) ? event.newValue : null;
      applyTheme(explicitTheme || systemTheme());
    });
    initialized = true;
  }

  applyTheme(explicitTheme || systemTheme());
  document.querySelectorAll('[data-theme-toggle]').forEach((button) => {
    if (boundButtons.has(button)) return;
    button.addEventListener('click', () => {
      explicitTheme = currentTheme() === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, explicitTheme);
      } catch {
        // The selection still works for this page when storage is unavailable.
      }
      applyTheme(explicitTheme);
    });
    boundButtons.add(button);
  });
}
