/* 예고편 모달 — 열기/닫기/포커스 트랩 */
(function () {
  const TRAILER_ID = 'dQw4w9WgXcQ'; // 실제 유튜브 ID로 교체

  const overlay = document.getElementById('modal-overlay');
  const iframe  = document.getElementById('trailer-iframe');
  const closeBtn = document.getElementById('modal-close');
  const openers = [
    document.getElementById('btn-trailer'),
  ];

  function openModal() {
    iframe.src = `https://www.youtube.com/embed/${TRAILER_ID}?autoplay=1`;
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    closeBtn.focus();
  }

  function closeModal() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    iframe.src = '';
    document.body.style.overflow = '';
  }

  openers.forEach(function (btn) {
    if (btn) btn.addEventListener('click', openModal);
  });

  closeBtn.addEventListener('click', closeModal);

  overlay.addEventListener('click', function (e) {
    if (e.target === overlay) closeModal();
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeModal();
    }
  });
})();
