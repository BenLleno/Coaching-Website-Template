// Navigation — scroll shadow + mobile drawer
(function () {
  'use strict';

  var nav = document.querySelector('.nav');
  var hamburger = document.querySelector('.nav-hamburger');
  var drawer = document.querySelector('.nav-drawer');

  if (!nav) return;

  // Scroll-aware background
  function handleScroll() {
    if (window.scrollY > 60) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  // Mobile drawer
  if (hamburger && drawer) {
    hamburger.addEventListener('click', function () {
      var isOpen = hamburger.classList.toggle('open');
      drawer.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      hamburger.setAttribute('aria-expanded', isOpen.toString());
    });

    // Close on drawer link click
    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on overlay click (outside drawer)
    document.addEventListener('click', function (e) {
      if (
        drawer.classList.contains('open') &&
        !drawer.contains(e.target) &&
        !hamburger.contains(e.target)
      ) {
        hamburger.classList.remove('open');
        drawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
})();
