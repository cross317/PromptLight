const SESSION_KEY = 'pf_session_started';

const hasSessionStarted = sessionStorage.getItem(SESSION_KEY) === '1';

document.addEventListener('DOMContentLoaded', () => {
  sessionStorage.setItem(SESSION_KEY, '1');

  const intro = document.getElementById('intro');
  if (!intro) return;

  if (hasSessionStarted) {
    intro.remove();
    return;
  }

  intro.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeOut') intro.remove();
  });
  intro.addEventListener('animationcancel', () => intro.remove());
});