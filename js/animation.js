/* 모바일 명장면 스크롤 인터렉션 */
(function () {
  if (!window.matchMedia('(hover: none)').matches) return;
  if (!('IntersectionObserver' in window)) return;

  var sceneCards = document.querySelectorAll('.scene-card');

  var sceneObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('scene-in-view');
      } else {
        entry.target.classList.remove('scene-in-view');
      }
    });
  }, { threshold: 0.55 });

  sceneCards.forEach(function (card) { sceneObs.observe(card); });
})();

/* 스크롤 진입 시 fade-up 애니메이션 */
(function () {
  var targets = document.querySelectorAll(
    '.scene-card, .cast-card, .behind-card, .rec-card, ' +
    '.synopsis-block, .synopsis-meta, .quote-block, ' +
    '.section-header, .hero-text'
  );

  targets.forEach(function (el) {
    el.classList.add('fade-up');
  });

  if (!('IntersectionObserver' in window)) {
    targets.forEach(function (el) { el.classList.add('is-visible'); });
    return;
  }

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(function (el) { observer.observe(el); });
})();
