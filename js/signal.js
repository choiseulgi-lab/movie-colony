/* ── SIGNAL — 실시간 응원 주파수 ──────────────────────── */
(function () {

  /* ── Supabase 설정 ─────────────────────────────────── */
  const SUPABASE_URL  = 'https://tgftqomhjemenlaemqwj.supabase.co';
  const SUPABASE_KEY  = 'sb_publishable_BqTcsj8CXbs89PLiN6W0eQ_7EaXHw-I';
  const TABLE         = 'guestbook';

  const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  /* ── 1. 실시간 응원 카운터 ─────────────────────────── */
  const countEl = document.getElementById('signal-count');
  let current = 45219;

  function formatNum(n) {
    return n.toLocaleString('ko-KR');
  }

  countEl.textContent = formatNum(current);

  function tickCounter() {
    const delta = Math.floor(Math.random() * 7) + 1;
    current += delta;
    countEl.textContent = formatNum(current);
    const next = Math.floor(Math.random() * 2000) + 2000; // 2~4초
    setTimeout(tickCounter, next);
  }

  setTimeout(tickCounter, 2000);

  /* ── 2. 폼 처리 ────────────────────────────────────── */
  const form       = document.getElementById('signal-form');
  const nameInput  = document.getElementById('signal-name');
  const contentEl  = document.getElementById('signal-content');
  const submitBtn  = document.getElementById('signal-submit');
  const msgEl      = document.getElementById('signal-msg');

  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    msgEl.textContent = '';

    const name    = nameInput.value.trim();
    const content = contentEl.value.trim();

    if (!name || !content) {
      msgEl.style.color = '#f43f6a';
      msgEl.textContent = '이름과 응원 메시지를 모두 입력해 주세요.';
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = '등록 중...';

    const { error } = await sb.from(TABLE).insert({ name, content });

    submitBtn.disabled = false;
    submitBtn.textContent = '등록하기';

    if (error) {
      console.error('[SIGNAL] insert error:', error);
      msgEl.style.color = '#f43f6a';
      msgEl.textContent = '오류: ' + (error.message || '등록에 실패했습니다.');
      return;
    }

    nameInput.value  = '';
    contentEl.value  = '';
    msgEl.style.color = '#a0a0b0';
    msgEl.textContent = '응원이 등록되었습니다!';
    setTimeout(() => { msgEl.textContent = ''; }, 3000);
  });

  /* ── Realtime 구독 (카운터 증가 연동) ──────────────── */
})();
