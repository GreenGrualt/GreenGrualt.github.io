// Inject a site-wide full-white overlay and hide it when the user presses "0".
(function () {
  // If overlay already present, do nothing
  if (document.getElementById('site-overlay')) return;

  // Create overlay element
  var overlay = document.createElement('div');
  overlay.id = 'site-overlay';
  // Basic inline styles as a safety fallback if CSS fails to load
  overlay.style.position = 'fixed';
  overlay.style.inset = '0';
  overlay.style.background = '#ffffff';
  overlay.style.zIndex = '2147483647';
  overlay.style.display = 'block';
  overlay.style.margin = '0';
  overlay.style.padding = '0';
  overlay.style.border = '0';
  overlay.style.pointerEvents = 'auto';

  // Insert overlay as early as possible
  if (document.documentElement) {
    try {
      document.documentElement.prepend(overlay);
    } catch (e) {
      if (document.body) document.body.prepend(overlay);
      else {
        document.addEventListener('DOMContentLoaded', function () {
          document.body.prepend(overlay);
        });
      }
    }
  }

  // Key handler: hide overlay when user presses "0" (top row) or Numpad0
  function onKey(e) {
    if (e.key === '0' || e.code === 'Numpad0') {
      var ov = document.getElementById('site-overlay');
      if (ov) ov.style.display = 'none';
      window.removeEventListener('keydown', onKey, true);
    }
  }

  // Use capture to have the highest chance of receiving the key event
  window.addEventListener('keydown', onKey, true);

  // Safety: if the page can be interacted with and you want overlay removed after X seconds, you could add fallback logic here.
})();