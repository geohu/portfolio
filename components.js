// ── Component loader ──────────────────────────────────
// Fetches _nav.html and _footer.html and injects them into
// #nav-placeholder and #footer-placeholder on every page.
// Sets the active nav link based on the current filename.

(function () {
  const PAGE_MAP = {
    'index.html':             'index',
    '':                       'index',
    'projects.html':          'projects',
    'about.html':             'about',
    'project-healthtrack.html': 'projects',
    'project-nexus.html':     'projects',
    'project-waypoint.html':  'projects',
  };

  const filename = location.pathname.split('/').pop() || '';
  const activePage = PAGE_MAP[filename] ?? '';

  function load(url, placeholderId, callback) {
    fetch(url)
      .then(r => r.text())
      .then(html => {
        const el = document.getElementById(placeholderId);
        if (el) {
          el.outerHTML = html;
          if (callback) callback();
        }
      });
  }

  function setActiveLink() {
    document.querySelectorAll('.nav__links a[data-page]').forEach(a => {
      a.classList.toggle('active', a.dataset.page === activePage);
    });
  }

  function initNavScroll() {
    const nav = document.getElementById('nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 20);
    update();
    window.addEventListener('scroll', update, { passive: true });
  }

  document.addEventListener('DOMContentLoaded', () => {
    load('_nav.html', 'nav-placeholder', () => {
      setActiveLink();
      initNavScroll();
    });
    load('_footer.html', 'footer-placeholder');
  });
})();
