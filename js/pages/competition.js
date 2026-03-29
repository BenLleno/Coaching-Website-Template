// Competition — gallery lightbox + timeline animations
(function () {
  'use strict';

  // Lightbox
  var lightbox = document.getElementById('lightbox');
  var galleryItems = document.querySelectorAll('.gallery-item');
  var currentLightboxIndex = 0;
  var lightboxImages = [];

  if (lightbox && galleryItems.length) {
    var closeLightbox = lightbox.querySelector('.lightbox-close');
    var prevLightbox = lightbox.querySelector('.lightbox-prev');
    var nextLightbox = lightbox.querySelector('.lightbox-next');
    var counterEl = lightbox.querySelector('.lightbox-counter');
    var imageWrap = lightbox.querySelector('.lightbox-image-wrap');

    galleryItems.forEach(function (item) {
      lightboxImages.push({
        emoji: item.querySelector('.gallery-emoji') ? item.querySelector('.gallery-emoji').textContent : item.textContent.trim(),
        caption: item.dataset.caption || ''
      });
    });

    function openLightbox(index) {
      currentLightboxIndex = index;
      updateLightboxContent();
      lightbox.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeLightboxFn() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    function updateLightboxContent() {
      var img = lightboxImages[currentLightboxIndex];
      if (imageWrap) imageWrap.textContent = img.emoji;
      if (counterEl) counterEl.textContent = (currentLightboxIndex + 1) + ' / ' + lightboxImages.length;
    }

    galleryItems.forEach(function (item, i) {
      item.addEventListener('click', function () {
        openLightbox(i);
      });
    });

    if (closeLightbox) closeLightbox.addEventListener('click', closeLightboxFn);

    if (prevLightbox) {
      prevLightbox.addEventListener('click', function () {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxContent();
      });
    }

    if (nextLightbox) {
      nextLightbox.addEventListener('click', function () {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        updateLightboxContent();
      });
    }

    lightbox.addEventListener('click', function (e) {
      if (e.target === lightbox) closeLightboxFn();
    });

    document.addEventListener('keydown', function (e) {
      if (!lightbox.classList.contains('active')) return;
      if (e.key === 'Escape') closeLightboxFn();
      if (e.key === 'ArrowLeft') {
        currentLightboxIndex = (currentLightboxIndex - 1 + lightboxImages.length) % lightboxImages.length;
        updateLightboxContent();
      }
      if (e.key === 'ArrowRight') {
        currentLightboxIndex = (currentLightboxIndex + 1) % lightboxImages.length;
        updateLightboxContent();
      }
    });
  }

  // Photo trigger buttons on timeline cards
  var photoTriggers = document.querySelectorAll('.timeline-card-photo-trigger');
  photoTriggers.forEach(function (btn, i) {
    btn.addEventListener('click', function () {
      if (lightbox && galleryItems.length > 0) {
        var targetIndex = parseInt(btn.dataset.galleryIndex || '0', 10);
        openLightbox(Math.min(targetIndex, lightboxImages.length - 1));
      }
    });
  });

  // Counter animation for achievement numbers
  function animateCounter(el) {
    var target = parseInt(el.dataset.target || el.textContent.replace(/[^0-9]/g, ''), 10);
    if (!target) return;
    var duration = 1600;
    var start = performance.now();
    var suffix = el.dataset.suffix || '';

    function update(now) {
      var progress = Math.min((now - start) / duration, 1);
      var eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target) + suffix;
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  var achievementNums = document.querySelectorAll('.achievement-number');
  if (achievementNums.length) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    achievementNums.forEach(function (el) {
      counterObserver.observe(el);
    });
  }
})();
