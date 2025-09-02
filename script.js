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
    if (e.animationName === 'fadeOut') {
        intro.remove();
    }
  });
});

(function () {
    const supportsReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const transitionMs = 400; 

    
    window.addEventListener('DOMContentLoaded', () => {
    if (supportsReduced) return;
    document.body.classList.add('transition-enter');

    requestAnimationFrame(() => {
        document.body.classList.add('transition-active');
    
        setTimeout(() => {
            document.body.classList.remove('transition-enter', 'transition-active');
        }, transitionMs + 50);
        });
    });

    document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;

    if (a.target === '_blank' || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;    
    if (url.pathname === location.pathname && url.hash) return;
    e.preventDefault();
    if (supportsReduced) { location.href = a.href; return; }

    document.body.classList.add('transition-exit');
    
    requestAnimationFrame(() => {
    document.body.classList.add('transition-active');
    setTimeout(() => { location.href = a.href; }, transitionMs);
    });
    });

    window.addEventListener('pageshow', (evt) => {
    if (evt.persisted) {
        document.body.classList.remove('transition-enter','transition-exit','transition-active');
    }
  });
})();
