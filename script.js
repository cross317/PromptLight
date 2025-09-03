document.addEventListener('DOMContentLoaded', () => {
  const intro = document.getElementById('intro');
  if (!intro) return;

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
  
  setTimeout(removeIntro, 2000 + 2000 + 150);
});