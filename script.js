(() => {
  const SESSION_KEY = 'pf_session_started';

  const forceIntro = location.search.includes('intro');

  document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    if (!intro) return;

    const reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const hasSessionStarted = sessionStorage.getItem(SESSION_KEY) === '1';
    if (!hasSessionStarted) {
      sessionStorage.setItem(SESSION_KEY, '1');
    }

    if ((hasSessionStarted && !forceIntro) || reduced) {
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

    const cs = getComputedStyle(intro);

    const parseTime = (t) => {
      const x = (t || '0s').split(',')[0].trim();
      return x.endsWith('ms') ? parseFloat(x) : parseFloat(x) * 1000;
    };
    const totalMs = parseTime(cs.animationDelay) + parseTime(cs.animationDuration) + 150;
    setTimeout(removeIntro, isFinite(totalMs) ? totalMs : 4200);
  });
})();