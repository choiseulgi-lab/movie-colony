/* 헤더 스크롤 감지 + 모바일 네비 토글 */
(function () {
  var header    = document.getElementById('site-header');
  var navToggle = document.getElementById('nav-toggle');
  var headerNav = document.querySelector('.header-nav');

  /* 헤더 스크롤 배경 */
  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* 모바일 햄버거 메뉴 */
  navToggle.addEventListener('click', function () {
    var isOpen = headerNav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    navToggle.setAttribute('aria-label', isOpen ? '메뉴 닫기' : '메뉴 열기');
  });

  /* 메뉴 링크 클릭 시 닫기 */
  headerNav.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      headerNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.setAttribute('aria-label', '메뉴 열기');
    });
  });

  /* 뷰포트 너비 변경 시 메뉴 초기화 */
  window.addEventListener('resize', function () {
    if (window.innerWidth > 767) {
      headerNav.classList.remove('is-open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
})();
