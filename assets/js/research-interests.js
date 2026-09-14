(() => {
  const presentation = document.querySelector('[data-interest-presentation]');
  if (!presentation) return;

  const interests = [...presentation.querySelectorAll('.research-interests li')];
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  // Animate a duplicate highlight layer; the original text always stays visible.
  interests.forEach((interest, index) => {
    interest.style.setProperty('--interest-order', index);
    const emphasis = document.createElement('span');
    emphasis.className = 'interest-emphasis';
    emphasis.textContent = interest.textContent;
    emphasis.setAttribute('aria-hidden', 'true');
    interest.append(emphasis);
  });

  function updateMotion() {
    presentation.classList.toggle('is-playing', !reducedMotion.matches);
  }

  reducedMotion.addEventListener('change', updateMotion);
  updateMotion();
})();
