// Coaching inquiry form
(function () {
  'use strict';

  var form = document.getElementById('coaching-form');
  var successEl = document.getElementById('form-success');
  var formCard = document.getElementById('form-card');

  if (!form) return;

  // Pre-select program from URL query param
  var params = new URLSearchParams(window.location.search);
  var programParam = params.get('program');
  if (programParam) {
    var goalSelect = form.querySelector('[name="goal"]');
    if (goalSelect) {
      var option = goalSelect.querySelector('option[value="competition"]');
      if (option && programParam.toLowerCase().includes('comp')) {
        goalSelect.value = 'competition';
      }
    }
    var msgArea = form.querySelector('[name="message"]');
    if (msgArea && !msgArea.value) {
      msgArea.value = 'I\'m interested in the ' + programParam + ' program. ';
      msgArea.focus();
      msgArea.selectionStart = msgArea.selectionEnd = msgArea.value.length;
    }
  }

  FormUtils.handleSubmit(form, function () {
    if (formCard) formCard.style.display = 'none';
    if (successEl) successEl.classList.add('show');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
})();
