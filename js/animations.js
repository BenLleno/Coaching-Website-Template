// Scroll Reveal Engine
(function () {
  'use strict';

  const revealClasses = ['.reveal', '.reveal-left', '.reveal-right', '.reveal-scale'];
  const elements = document.querySelectorAll(revealClasses.join(', '));

  if (!elements.length) return;

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.delay || '0', 10);
        setTimeout(function () {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  elements.forEach(function (el) {
    observer.observe(el);
  });
})();
