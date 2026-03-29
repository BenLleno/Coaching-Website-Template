// Home page — counter animation
(function () {
  'use strict';

  function animateCounter(el) {
    var target = parseInt(el.dataset.target || el.textContent, 10);
    var duration = 1800;
    var start = performance.now();

    function update(now) {
      var elapsed = now - start;
      var progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target).toLocaleString();
      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  var counters = document.querySelectorAll('.counter-value');
  if (!counters.length) return;

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(function (el) {
    el.dataset.target = el.textContent.replace(/,/g, '');
    observer.observe(el);
  });
})();
