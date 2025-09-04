document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

  const KEY = 'pf_session_started';
  const isFirstVisit = sessionStorage.getItem(KEY) !== '1';

  if (!isFirstVisit) {
    intro.remove();
    return;
  }

  sessionStorage.setItem(KEY, '1');

  const remove = () => intro.remove();

  intro.addEventListener('animationend', (e) => {
    if (e.animationName === 'fadeOut') remove();
  });

  intro.addEventListener('animationcancel', remove);

  setTimeout(remove, 4100);
});