/* Play real recordings inside their publication cards, on request. */
(() => {
  const cards = Array.from(document.querySelectorAll('[data-publication-video]'));
  const stopPlayers = [];

  cards.forEach(card => {
    const stage = card.querySelector('[data-video-stage]');
    const poster = card.querySelector('[data-video-poster]');
    const controls = card.querySelector('[data-video-tools]');
    let lastTrigger = poster;

    function stopVideo() {
      const player = stage.querySelector('iframe');
      if (player) player.remove();
      poster.hidden = false;
      controls.hidden = true;
    }
    stopPlayers.push(stopVideo);

    card.querySelectorAll('[data-video-id]').forEach(trigger => {
      trigger.setAttribute('role', 'button');
      function playVideo(event) {
        event.preventDefault();
        stopPlayers.forEach(stop => stop());
        lastTrigger = trigger;
        const player = document.createElement('iframe');
        player.src = `https://www.youtube-nocookie.com/embed/${trigger.dataset.videoId}?autoplay=1&rel=0`;
        player.title = `${card.dataset.videoName} — ${trigger.dataset.videoLabel}`;
        player.allow = 'autoplay; encrypted-media; picture-in-picture; fullscreen';
        player.allowFullscreen = true;
        player.referrerPolicy = 'strict-origin-when-cross-origin';
        stage.append(player);
        poster.hidden = true;
        controls.hidden = false;
        card.querySelector('[data-video-external]').href = trigger.href;
        player.focus();
      }
      trigger.addEventListener('click', playVideo);
      trigger.addEventListener('keydown', event => {
        if (event.key === ' ') playVideo(event);
      });
    });

    card.querySelector('[data-close-video]').addEventListener('click', () => {
      stopVideo();
      lastTrigger.focus();
    });
  });
})();
