/*
  Hangar 24 Core Beliefs Website Script

  Provides simple password gating so that only employees with the shared
  password can access the content. The password is stored client‑side
  only as a comparison string and not sent anywhere. On successful
  entry the overlay is hidden and the state is saved in localStorage.
*/

// Replace this value with the password provided by the user. It is kept
// client‑side only for comparison.
const PASSWORD = 'Hangar24Beliefs';

/**
 * Check whether the user has already authenticated. If so, hide the
 * password prompt. Otherwise leave it visible.
 */
function checkAuthentication() {
  const isAuthenticated = localStorage.getItem('h24Authenticated');
  if (isAuthenticated === 'true') {
    const overlay = document.getElementById('passwordPrompt');
    if (overlay) overlay.style.display = 'none';
  }
}

/**
 * Handle submission of the password form. If the entered password matches
 * the constant, store the authenticated flag and hide the overlay.
 */
function handlePasswordSubmit() {
  const input = document.getElementById('passwordInput');
  const errorEl = document.getElementById('passwordError');
  if (!input || !errorEl) return;
  const entered = input.value.trim();
  if (entered === PASSWORD) {
    localStorage.setItem('h24Authenticated', 'true');
    document.getElementById('passwordPrompt').style.display = 'none';
  } else {
    errorEl.textContent = 'Incorrect password, please try again.';
    input.value = '';
  }
}

/**
 * Set up event listeners once the DOM has loaded.
 */
function init() {
  checkAuthentication();
  const submitBtn = document.getElementById('passwordSubmit');
  const input = document.getElementById('passwordInput');
  if (submitBtn) {
    submitBtn.addEventListener('click', handlePasswordSubmit);
  }
  if (input) {
    input.addEventListener('keypress', function (e) {
      if (e.key === 'Enter') {
        e.preventDefault();
        handlePasswordSubmit();
      }
    });
  }
}

document.addEventListener('DOMContentLoaded', init);