(function () {
  const INTRO_KEY = 'pl_intro_seen_v1';
  const intro = document.getElementById('intro');
  if (!intro) return;

  const prefersReducedMotion =
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const seen = sessionStorage.getItem(INTRO_KEY) === '1';
  if (seen) {
    intro.remove();
    return;
  }

  document.body.classList.add('intro-active');

  intro.style.animation = 'none';
  intro.style.transition = 'none';

  function endIntro() {
    if (!intro.parentNode) return;
    document.body.classList.remove('intro-active');
    document.body.classList.add('page-fade-in');
    if (!prefersReducedMotion) {
      intro.classList.add('leaving');
      setTimeout(() => {
        if (intro.parentNode) intro.remove();
      }, 650);
    } else {
      intro.remove();
    }
    sessionStorage.setItem(INTRO_KEY, '1');
  }

  const skipBtn = document.getElementById('skip-intro');
  if (skipBtn) {
    skipBtn.addEventListener('click', () => {
      endIntro();
    });
  }

  intro.addEventListener('click', (e) => {
    const cta = e.target.closest?.('.intro-cta');
    if (cta) {
      endIntro();
    }
  });
})();

(function () {
  window.addEventListener('DOMContentLoaded', () => {
    const intro = document.getElementById('intro');
    if (!intro) {
      document.body.classList.add('page-fade-in');
    }
  });
})();