/* Run in the head before the page paints, on both portfolio routes. */
(function () {
  var theme = null;
  try {
    var saved = window.localStorage.getItem('gwc-theme');
    if (saved === 'light' || saved === 'dark') theme = saved;
  } catch (error) {
    // Private browsing or disabled storage must not prevent the page rendering.
  }
  if (!theme) {
    try {
      theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    } catch (error) {
      theme = 'light';
    }
  }
  document.documentElement.setAttribute('data-theme', theme);
  document.documentElement.style.colorScheme = theme;
  var colour = document.querySelector('meta[name="theme-color"]');
  if (colour) colour.setAttribute('content', theme === 'dark' ? '#191d18' : '#f5f4ef');
})();
