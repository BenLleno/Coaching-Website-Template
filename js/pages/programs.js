// Programs — filter tabs + modal
(function () {
  'use strict';

  // Filter tabs
  var tabs = document.querySelectorAll('.filter-tab');
  var cards = document.querySelectorAll('.program-card');

  tabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      tabs.forEach(function (t) { t.classList.remove('active'); });
      tab.classList.add('active');

      var filter = tab.dataset.filter;
      cards.forEach(function (card) {
        if (filter === 'all' || card.dataset.category === filter) {
          card.classList.remove('hidden');
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Modal
  var overlay = document.getElementById('program-modal');
  if (!overlay) return;

  var closeBtn = overlay.querySelector('.modal-close');

  function openModal(card) {
    var title = card.dataset.title || card.querySelector('h3').textContent;
    var category = card.dataset.category || '';
    var duration = card.dataset.duration || '';
    var difficulty = card.dataset.difficulty || '3';
    var price = card.dataset.price || '';
    var description = card.dataset.description || card.querySelector('p').textContent;
    var includes = (card.dataset.includes || '').split('|').filter(Boolean);
    var emoji = card.querySelector('.program-card-image').textContent.trim();

    overlay.querySelector('#modal-title').textContent = title;
    overlay.querySelector('#modal-emoji').textContent = emoji;
    overlay.querySelector('#modal-category').textContent = category;
    overlay.querySelector('#modal-duration').textContent = duration;
    overlay.querySelector('#modal-price').textContent = price;
    overlay.querySelector('#modal-description').textContent = description;

    var difficultyEl = overlay.querySelector('#modal-difficulty');
    difficultyEl.innerHTML = '';
    for (var i = 1; i <= 5; i++) {
      var dot = document.createElement('span');
      dot.className = 'difficulty-dot' + (i <= parseInt(difficulty) ? ' filled' : '');
      difficultyEl.appendChild(dot);
    }

    var includesList = overlay.querySelector('#modal-includes');
    includesList.innerHTML = '';
    includes.forEach(function (item) {
      var li = document.createElement('li');
      li.className = 'includes-item';
      li.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>' + item;
      includesList.appendChild(li);
    });

    var inquireBtn = overlay.querySelector('#modal-inquire-btn');
    if (inquireBtn) {
      inquireBtn.href = 'coaching.html?program=' + encodeURIComponent(title);
    }

    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  cards.forEach(function (card) {
    card.addEventListener('click', function () {
      openModal(card);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeModal();
  });
})();
