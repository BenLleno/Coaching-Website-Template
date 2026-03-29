// Shared form utilities
var FormUtils = (function () {
  'use strict';

  function getErrorEl(input) {
    return input.parentElement.querySelector('.field-error');
  }

  function showError(input, message) {
    input.classList.add('error');
    input.classList.remove('success');
    var existing = getErrorEl(input);
    if (existing) {
      existing.textContent = message;
    } else {
      var el = document.createElement('span');
      el.className = 'field-error';
      el.textContent = message;
      input.parentElement.appendChild(el);
    }
  }

  function clearError(input) {
    input.classList.remove('error');
    var err = getErrorEl(input);
    if (err) err.remove();
  }

  function markSuccess(input) {
    input.classList.remove('error');
    input.classList.add('success');
    var err = getErrorEl(input);
    if (err) err.remove();
  }

  function validateField(input) {
    var value = input.value.trim();
    var type = input.type;
    var required = input.hasAttribute('required');

    if (required && !value) {
      return { valid: false, message: 'This field is required.' };
    }

    if (type === 'email' && value) {
      var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRe.test(value)) {
        return { valid: false, message: 'Please enter a valid email address.' };
      }
    }

    if (type === 'url' && value) {
      try {
        new URL(value);
      } catch (_) {
        return { valid: false, message: 'Please enter a valid URL.' };
      }
    }

    if (type === 'tel' && value) {
      var telRe = /^[\d\s\+\-\(\)]{7,20}$/;
      if (!telRe.test(value)) {
        return { valid: false, message: 'Please enter a valid phone number.' };
      }
    }

    if (input.tagName === 'SELECT' && required && value === '') {
      return { valid: false, message: 'Please make a selection.' };
    }

    if (input.tagName === 'TEXTAREA' && required && value.length < 10) {
      return { valid: false, message: 'Please provide at least 10 characters.' };
    }

    return { valid: true, message: '' };
  }

  function validateForm(form) {
    var inputs = form.querySelectorAll('input:not([type=radio]):not([type=checkbox]), select, textarea');
    var valid = true;

    inputs.forEach(function (input) {
      var result = validateField(input);
      if (!result.valid) {
        showError(input, result.message);
        valid = false;
      } else {
        markSuccess(input);
      }
    });

    // Check required radio groups
    var radioGroups = {};
    form.querySelectorAll('input[type=radio][required]').forEach(function (r) {
      radioGroups[r.name] = radioGroups[r.name] || [];
      radioGroups[r.name].push(r);
    });
    Object.keys(radioGroups).forEach(function (name) {
      var group = radioGroups[name];
      var checked = group.some(function (r) { return r.checked; });
      if (!checked) {
        var last = group[group.length - 1];
        showError(last, 'Please select an option.');
        valid = false;
      }
    });

    // Check required checkboxes (at least one)
    var checkGroups = form.querySelectorAll('.checkbox-required-group');
    checkGroups.forEach(function (group) {
      var checked = group.querySelector('input[type=checkbox]:checked');
      var errTarget = group.querySelector('.checkbox-error-target');
      if (!checked) {
        if (errTarget) showError(errTarget, 'Please select at least one option.');
        valid = false;
      }
    });

    return valid;
  }

  function bindValidation(form) {
    form.querySelectorAll('input:not([type=radio]):not([type=checkbox]), select, textarea').forEach(function (input) {
      input.addEventListener('blur', function () {
        var result = validateField(input);
        if (!result.valid) {
          showError(input, result.message);
        } else {
          clearError(input);
        }
      });

      input.addEventListener('input', function () {
        if (input.classList.contains('error')) {
          var result = validateField(input);
          if (result.valid) clearError(input);
        }
      });
    });
  }

  function handleSubmit(form, onSuccess) {
    bindValidation(form);

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (validateForm(form)) {
        onSuccess(form);
      } else {
        var firstError = form.querySelector('.error');
        if (firstError) {
          firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
          firstError.focus();
        }
      }
    });
  }

  return {
    showError: showError,
    clearError: clearError,
    validateField: validateField,
    validateForm: validateForm,
    handleSubmit: handleSubmit
  };
})();
