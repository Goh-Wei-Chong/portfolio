// Inline SVG keeps interface icons independent of a device's emoji font.
const paths = {
  'arrow-up-right': '<path d="M5 19 19 5M5 5h14v14"/>',
  'arrow-down-right': '<path d="m5 5 14 14M5 19h14V5"/>',
  'arrow-up': '<path d="M12 20V4m-7 7 7-7 7 7"/>',
  'arrow-down': '<path d="M12 4v16m-7-7 7 7 7-7"/>',
  'arrow-left': '<path d="M20 12H4m7-7-7 7 7 7"/>',
  'arrow-right': '<path d="M4 12h16m-7-7 7 7-7 7"/>',
  asterisk: '<path d="M12 2v20M2 12h20M5 5l14 14M5 19 19 5" stroke-width="2"/>',
  plus: '<path d="M12 4v16M4 12h16"/>',
  close: '<path d="m6 6 12 12M6 18 18 6"/>',
  copy: '<rect x="8" y="8" width="12" height="12" rx="1"/><path d="M16 8V4H4v12h4"/>',
  more: '<g fill="currentColor" stroke="none"><circle cx="4" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="20" cy="12" r="1.5"/></g>',
  'window-controls': '<g fill="currentColor" stroke="none"><circle cx="4" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="20" cy="12" r="2"/></g>',
};

export const icon = (name, className = '') => `<svg class="ui-icon ${className}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${paths[name]}</svg>`;
