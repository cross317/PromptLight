const SESSION_KEY = 'pf_session_started';

document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  const reduced = window.matchMedia &&
                  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const hasSessionStarted = sessionStorage.getItem(SESSION_KEY) === '1';
  sessionStorage.setItem(SESSION_KEY, '1');

  if (hasSessionStarted || reduced) {
    intro.remove();
    return;
  }

  let removed = false;
  const removeIntro = () => {
    if (removed) return;
    removed = true;
    intro.remove();
  };

  intro.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeOut') removeIntro();
  });
  intro.addEventListener('animationcancel', removeIntro);

  //setTimeout(removeIntro, 2000 + 2000 + 150);
});