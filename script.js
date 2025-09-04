(() => {
  const SESSION_KEY = 'pf_session_started';

  document.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    if (!intro) return;

    intro.style.pointerEvents = 'none';

    const params = new URLSearchParams(location.search);
    const force = params.has('intro');
    const reduced = window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const has = sessionStorage.getItem(SESSION_KEY) === '1';
    const shouldAnimate = (!has || force) && !reduced;

    const remove = (() => {
      let done = false;
      return () => {
        if (done) return;
        done = true;
        intro.remove();
      };
    })();

    if (!shouldAnimate) {
      remove();
      return;
    }

    intro.addEventListener('animationend', (e) => {
      if (e.animationName === 'fadeOut') remove();
    });
    intro.addEventListener('animationcancel', remove);

    const cs = getComputedStyle(intro);
    const first = s => (s || '0s').split(',')[0].trim();
    const toMs  = v => v.endsWith('ms') ? parseFloat(v) : parseFloat(v) * 1000;
    const total = toMs(first(cs.animationDelay)) + toMs(first(cs.animationDuration)) + 200;
    setTimeout(remove, (isFinite(total) && total > 0) ? total : 4200);

    sessionStorage.setItem(SESSION_KEY, '1');
  });
})();