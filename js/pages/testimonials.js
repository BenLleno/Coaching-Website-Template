// Testimonials — mobile carousel
(function () {
  'use strict';

  var grid = document.querySelector('.testimonials-grid');
  var prevBtn = document.querySelector('.carousel-btn.prev');
  var nextBtn = document.querySelector('.carousel-btn.next');
  var dotsContainer = document.querySelector('.carousel-dots');

  if (!grid) return;

  var cards = Array.from(grid.querySelectorAll('.testimonial-card'));
  var currentIndex = 0;
  var isCarouselMode = false;

  function isMobile() {
    return window.innerWidth < 768;
  }

  function enableCarousel() {
    isCarouselMode = true;
    grid.style.display = 'block';
    grid.style.overflow = 'hidden';
    cards.forEach(function (card, i) {
      card.style.display = i === 0 ? 'flex' : 'none';
      card.style.flexDirection = 'column';
    });
    updateDots();
  }

  function disableCarousel() {
    isCarouselMode = false;
    grid.style.display = '';
    grid.style.overflow = '';
    cards.forEach(function (card) {
      card.style.display = '';
    });
  }

  function showCard(index) {
    cards.forEach(function (card, i) {
      card.style.display = i === index ? 'flex' : 'none';
    });
    currentIndex = index;
    updateDots();
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.innerHTML = '';
    cards.forEach(function (_, i) {
      var dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === currentIndex ? ' active' : '');
      dot.setAttribute('aria-label', 'Go to testimonial ' + (i + 1));
      dot.addEventListener('click', function () {
        showCard(i);
      });
      dotsContainer.appendChild(dot);
    });
  }

  function handleResize() {
    if (isMobile() && !isCarouselMode) {
      enableCarousel();
    } else if (!isMobile() && isCarouselMode) {
      disableCarousel();
    }
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', function () {
      if (!isCarouselMode) return;
      var idx = (currentIndex - 1 + cards.length) % cards.length;
      showCard(idx);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', function () {
      if (!isCarouselMode) return;
      var idx = (currentIndex + 1) % cards.length;
      showCard(idx);
    });
  }

  // Touch swipe
  var touchStartX = 0;
  grid.addEventListener('touchstart', function (e) {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  grid.addEventListener('touchend', function (e) {
    if (!isCarouselMode) return;
    var delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      if (delta < 0) {
        showCard((currentIndex + 1) % cards.length);
      } else {
        showCard((currentIndex - 1 + cards.length) % cards.length);
      }
    }
  }, { passive: true });

  window.addEventListener('resize', handleResize);
  handleResize();
})();
