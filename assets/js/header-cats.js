/* Three cats have claimed the header rule as their windowsill. */
(() => {
  document.querySelectorAll('[data-header-cats]').forEach(group => {
    const buttons = Array.from(group.querySelectorAll('.header-pet'));
    const reaction = group.querySelector('.cat-reaction');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let messageTimer;
    let animationTimer;
    let activeCat;

    function positionBubble(button) {
      const shelf = group.getBoundingClientRect();
      const cat = button.getBoundingClientRect();
      const width = reaction.offsetWidth;
      const left = Math.max(0, Math.min(shelf.width - width, cat.left - shelf.left + cat.width / 2 - width / 2));
      reaction.style.setProperty('--reaction-left', `${left}px`);
      reaction.style.top = `${Math.max(0, cat.top - shelf.top - reaction.offsetHeight - 6)}px`;
    }

    function respond(button, text) {
      clearTimeout(messageTimer);
      clearTimeout(animationTimer);
      buttons.forEach(cat => cat.classList.remove('is-petted', 'is-awake'));
      activeCat = button;
      void button.offsetWidth;
      button.classList.add('is-petted', 'is-awake');
      reaction.textContent = text;
      positionBubble(button);
      group.classList.add('has-message', 'has-played');
      animationTimer = setTimeout(() => button.classList.remove('is-petted'), 1000);
      messageTimer = setTimeout(() => {
        group.classList.remove('has-message');
        button.classList.remove('is-awake');
        reaction.textContent = '';
        activeCat = null;
      }, 3000);
    }

    function moveCat(button, left) {
      const travel = Math.max(0, group.clientWidth - button.offsetWidth);
      const ratio = travel ? Math.max(0, Math.min(travel, left)) / travel : 0;
      button.style.setProperty('--cat-position', ratio);
      button.dataset.moved = 'true';
    }

    buttons.forEach(button => {
      const replies = JSON.parse(button.dataset.catReplies);
      let replyIndex = 0;
      let drag;
      let suppressClickUntil = 0;
      button.disabled = false;

      button.addEventListener('click', event => {
        if (event.detail > 0 && performance.now() < suppressClickUntil) return;
        respond(button, replies[replyIndex++ % replies.length]);
      });
      button.addEventListener('keydown', event => {
        if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
        event.preventDefault();
        moveCat(button, button.offsetLeft + (event.key === 'ArrowLeft' ? -16 : 16));
        respond(button, 'This spot will do.');
      });
      button.addEventListener('pointerdown', event => {
        if (event.button !== 0 || !event.isPrimary) return;
        drag = { id: event.pointerId, startX: event.clientX, startY: event.clientY, left: button.offsetLeft, moving: false };
      });
      button.addEventListener('pointermove', event => {
        if (!drag || drag.id !== event.pointerId) return;
        const dx = event.clientX - drag.startX;
        const dy = event.clientY - drag.startY;
        if (!drag.moving) {
          if (Math.abs(dx) < 6 || Math.abs(dy) > Math.abs(dx)) return;
          drag.moving = true;
          button.setPointerCapture(event.pointerId);
          button.classList.add('is-dragging');
        }
        event.preventDefault();
        moveCat(button, drag.left + dx);
        if (activeCat === button) positionBubble(button);
      });
      function release(event) {
        if (!drag || drag.id !== event.pointerId) return;
        const moved = drag.moving;
        drag = null;
        button.classList.remove('is-dragging');
        if (button.hasPointerCapture(event.pointerId)) button.releasePointerCapture(event.pointerId);
        if (moved && event.type === 'pointerup') {
          suppressClickUntil = performance.now() + 400;
          respond(button, 'This spot will do.');
        }
      }
      button.addEventListener('pointerup', release);
      button.addEventListener('pointercancel', release);
      button.addEventListener('lostpointercapture', () => {
        drag = null;
        button.classList.remove('is-dragging');
      });
    });

    group.addEventListener('pointermove', event => {
      if (event.pointerType !== 'mouse' || reducedMotion.matches || buttons.some(cat => cat.classList.contains('is-dragging'))) return;
      buttons.forEach(cat => {
        const rect = cat.getBoundingClientRect();
        const distance = event.clientX - (rect.left + rect.width / 2);
        cat.classList.toggle('is-curious', Math.abs(distance) < rect.width);
        cat.style.setProperty('--cat-look', `${Math.max(-3, Math.min(3, distance / 30))}deg`);
      });
    });
    group.addEventListener('pointerleave', () => buttons.forEach(cat => cat.classList.remove('is-curious')));
    reducedMotion.addEventListener('change', () => buttons.forEach(cat => cat.classList.remove('is-curious')));
    new ResizeObserver(() => { if (activeCat) positionBubble(activeCat); }).observe(group);
    group.classList.add('is-ready');
  });
})();
