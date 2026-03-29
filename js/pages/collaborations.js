// Collaboration inquiry form
(function () {
  'use strict';

  var form = document.getElementById('collab-form');
  var formWrap = document.getElementById('collab-form-wrap');
  var successEl = document.getElementById('collab-success');

  if (!form) return;

  FormUtils.handleSubmit(form, function () {
    if (formWrap) formWrap.style.display = 'none';
    if (successEl) successEl.classList.add('show');
    window.scrollTo({ top: successEl ? successEl.offsetTop - 100 : 0, behavior: 'smooth' });
  });
})();
