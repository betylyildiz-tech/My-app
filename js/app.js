/* Adorn — uygulama kabuğu */
(function () {
  'use strict';
  const D = window.ADORN_DATA, E = window.ADORN_ENGINE, AI = window.ADORN_AI;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
  const esc = (s) => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const buzz = (ms = 8) => { try { navigator.vibrate && navigator.vibrate(ms); } catch (_) {} };
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const wait = (ms) => new Promise(r => setTimeout(r, ms));

  /* ---------- İkonlar ---------- */
  const P = {
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    sparkle: '<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z"/><path d="M19 15l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z"/>',
    drop: '<path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z"/>',
    star: '<path d="M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1L3.2 9.5l6.1-.9z"/>',
    wave: '<path d="M3 8c3-3 6 3 9 0s6 3 9 0M3 13c3-3 6 3 9 0s6 3 9 0M3 18c3-3 6 3 9 0s6 3 9 0"/>',
    bag: '<path d="M5 8h14l-1 12H6z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/>',
    target: '<circle cx="12" cy="12" r="8"/><circle cx="12" cy="12" r="4"/><circle cx="12" cy="12" r=".8"/>',
    beard: '<path d="M5 8c0 7 3 12 7 12s7-5 7-12"/><path d="M9 13c1 .8 2 1 3 1s2-.2 3-1"/><path d="M5 8c2 1 4 1 7 1s5 0 7-1"/>',
    blade: '<rect x="3" y="8" width="18" height="8" rx="2"/><path d="M8 12h8M7 8V6M17 8V6"/>',
    chat: '<path d="M4 5h16v11H9l-5 4z"/>',
    routine: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M3.5 6l1.2 1.2L7 5M3.5 12l1.2 1.2L7 11M3.5 18l1.2 1.2L7 17"/>',
    scan: '<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><path d="M7 12h10"/>',
    user: '<circle cx="12" cy="8" r="4"/><path d="M4 20c1.5-4 4.5-6 8-6s6.5 2 8 6"/>',
    flame: '<path d="M12 3c1 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.2 1-3.6 2-4.6.3 1.6 1 2.6 2 3.1C11 8.5 11 6 12 3z"/>',
    close: '<path d="M6 6l12 12M18 6L6 18"/>',
    back: '<path d="M15 5l-7 7 7 7"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    camera: '<path d="M4 8h3l2-2.5h6L17 8h3v11H4z"/><circle cx="12" cy="13" r="3.5"/>',
    image: '<rect x="3.5" y="4.5" width="17" height="15" rx="2.5"/><circle cx="9" cy="10" r="1.6"/><path d="M4 17l5-4.5 4 3.5 3-2.5 4 3.5"/>',
    type: '<path d="M5 6h14M12 6v13M9 19h6"/>',
    send: '<path d="M12 19V5M6 11l6-6 6 6"/>',
    history: '<path d="M4 12a8 8 0 1 0 2.4-5.7L4 8.6"/><path d="M4 4v4.6h4.6M12 8v4l3 2"/>',
    trash: '<path d="M5 7h14M10 7V5h4v2M7 7l1 13h8l1-13"/>',
    chev: '<path d="M9 5l7 7-7 7"/>',
    book: '<path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v15H6.5A2.5 2.5 0 0 0 4 20.5z"/><path d="M4 20.5A2.5 2.5 0 0 1 6.5 18H20v3H6.5"/>',
    lock: '<rect x="5" y="11" width="14" height="9" rx="2"/><path d="M8 11V8a4 4 0 0 1 8 0v3"/>',
    trophy: '<path d="M8 4h8v5a4 4 0 0 1-8 0z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8 20h8M9 17h6"/>',
    edit: '<path d="M4 20h4L19 9l-4-4L4 16z"/>',
    download: '<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>'
  };
  const ic = (n, cls = '') => `<svg class="ic ${cls}" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round">${P[n] || ''}</svg>`;

  /* ---------- Durum ---------- */
  const KEY = 'adorn.v2';
  const today = () => { const d = new Date(); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const yesterday = () => { const d = new Date(); d.setDate(d.getDate() - 1); return d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); };
  const fresh = () => ({
    v: 2, lang: I18N.detect(), mode: null, quizDone: false, welcomed: false, answers: {},
    profile: { name: '', concerns: [] }, chats: [], activeChat: null,
    streak: { count: 0, best: 0, last: null, xp: 0, doneDays: 0, series: null, today: { date: null, tasks: [], lesson: 0, quiz: null }, badges: [] },
    bag: [], routine: { date: null, am: [], pm: [] }, settings: { theme: 'system', apiKey: '' }
  });
  let S;
  try { S = Object.assign(fresh(), JSON.parse(localStorage.getItem(KEY) || 'null') || {}); } catch (_) { S = fresh(); }
  let saveT = 0;
  const save = () => { clearTimeout(saveT); saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (_) {} }, 120); };
  I18N.lang = S.lang;
  window.ADORN_KEY = S.settings.apiKey;

  /* ---------- Tema ---------- */
  const mq = matchMedia('(prefers-color-scheme: dark)');
  function applyTheme() {
    const host = document.documentElement.getAttribute('data-theme');
    const eff = S.settings.theme !== 'system' ? S.settings.theme : (host === 'dark' || host === 'light' ? host : (mq.matches ? 'dark' : 'light'));
    document.documentElement.dataset.scheme = eff;
    document.documentElement.dataset.mode = S.mode || 'makeup';
    document.documentElement.lang = S.lang;
    const meta = $('meta[name="theme-color"]');
    if (meta) meta.content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim() || '#F4EEE9';
  }
  mq.addEventListener?.('change', applyTheme);
  new MutationObserver(applyTheme).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

  /* ---------- Yardımcılar ---------- */
  function md(s) {
    let t = esc(s).replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>').replace(/\*\*[^*]*$/, '');
    const lines = t.split('\n'); let out = '', list = null;
    for (const raw of lines) {
      const l = raw.trim();
      const b = l.match(/^[•\-\*]\s+(.*)$/), o = l.match(/^\d+[.)]\s+(.*)$/);
      if (b || o) {
        const kind = b ? 'ul' : 'ol';
        if (list !== kind) { if (list) out += `</${list}>`; out += `<${kind}>`; list = kind; }
        out += `<li>${(b || o)[1]}</li>`;
      } else {
        if (list) { out += `</${list}>`; list = null; }
        if (l) out += `<p>${l}</p>`;
      }
    }
    if (list) out += `</${list}>`;
    return out;
  }
  function toast(msg, action) {
    const el = $('#toast');
    el.innerHTML = `<span>${esc(msg)}</span>${action ? `<button type="button">${esc(action.label)}</button>` : ''}`;
    el.classList.remove('show'); void el.offsetWidth; el.classList.add('show');
    if (action) el.querySelector('button').onclick = () => { action.run(); el.classList.remove('show'); };
    clearTimeout(toast.t); toast.t = setTimeout(() => el.classList.remove('show'), action ? 4200 : 2200);
  }
  const productById = (id) => D.PRODUCTS.find(p => p.id === id) || S.bag.find(b => b.id === id);
  const topics = () => D.TOPICS[S.mode || 'makeup'];
  const seriesList = () => D.SERIES[S.mode || 'makeup'];
  const curSeries = () => seriesList().find(s => s.id === S.streak.series) || null;
  function greet() {
    const h = new Date().getHours();
    return t(h < 5 ? 'night' : h < 12 ? 'morning' : h < 18 ? 'afternoon' : h < 22 ? 'evening' : 'night');
  }

  /* ---------- Seri mantığı ---------- */
  function ensureToday() {
    const d = today();
    if (S.streak.today.date !== d) {
      const s = curSeries();
      S.streak.today = { date: d, tasks: [], lesson: s ? S.streak.doneDays % s.lessons.length : 0, quiz: null };
    }
    if (S.routine.date !== d) S.routine = { date: d, am: [], pm: [] };
    if (S.streak.last && S.streak.last !== d && S.streak.last !== yesterday()) S.streak.count = 0;
  }
  const streakCount = () => (S.streak.last === today() || S.streak.last === yesterday()) ? S.streak.count : 0;
  const level = () => Math.floor(S.streak.xp / 100) + 1;
  const BADGES = [{ n: 3, k: 'badge3' }, { n: 7, k: 'badge7' }, { n: 14, k: 'badge14' }, { n: 30, k: 'badge30' }];

  function completeTask(id, fromEl) {
    ensureToday();
    const tk = S.streak.today.tasks;
    if (tk.includes(id)) return false;
    tk.push(id); S.streak.xp += 10;
    if (fromEl) burst(fromEl, '+10 XP');
    let dayDone = false;
    if (tk.length === 3) {
      dayDone = true;
      S.streak.count = S.streak.last === yesterday() ? S.streak.count + 1 : (S.streak.last === today() ? S.streak.count : 1);
      S.streak.last = today();
      S.streak.best = Math.max(S.streak.best, S.streak.count);
      S.streak.doneDays = Math.min(30, S.streak.doneDays + 1);
      S.streak.xp += 20;
      BADGES.forEach(b => { if (S.streak.count >= b.n && !S.streak.badges.includes(b.n)) S.streak.badges.push(b.n); });
    }
    save(); updateChip();
    if (dayDone) setTimeout(celebrate, 450);
    return true;
  }

  /* ---------- Kök ---------- */
  const app = $('#app');
  let tab = 'chat';

  function boot() {
    ensureToday(); applyTheme();
    if (!S.mode) return renderGate();
    if (S.mode === 'makeup' && !S.quizDone) return renderQuiz(0);
    // Ana ekran kısayolları (?go=scan / ?go=routine)
    const goTo = new URLSearchParams(location.search).get('go');
    if (goTo === 'routine' || goTo === 'bag' || goTo === 'profile') tab = goTo;
    renderShell();
    if (goTo === 'scan' && S.welcomed) setTimeout(openScan, 300);
  }

  /* ---------- 1. Yol ayrımı ---------- */
  function renderGate() {
    app.className = 'stage';
    app.innerHTML = `
      <section class="gate screen-in">
        <div class="lang-switch" role="group" aria-label="${t('language')}">
          <button type="button" data-lang="tr" class="${S.lang === 'tr' ? 'on' : ''}">TR</button>
          <button type="button" data-lang="en" class="${S.lang === 'en' ? 'on' : ''}">EN</button>
        </div>
        <div class="gate-top">
          <div class="orb orb-lg" aria-hidden="true"><i></i><i></i><i></i></div>
          <span class="wordmark big">adorn</span>
          <p class="eyebrow">${t('gateEyebrow')}</p>
        </div>
        <div class="gate-q">
          <h1>${t('gateQ')}</h1>
          <p class="muted">${t('gateSub')}</p>
          <div class="choice-row">
            <button type="button" class="choice pill-xl" data-pick="makeup"><span class="c-main">${t('yes')}</span><span class="c-sub">${t('yesHint')}</span></button>
            <button type="button" class="choice pill-xl" data-pick="care"><span class="c-main">${t('no')}</span><span class="c-sub">${t('noHint')}</span></button>
          </div>
        </div>
      </section>`;
    $$('[data-lang]', app).forEach(b => b.onclick = () => { S.lang = I18N.lang = b.dataset.lang; save(); applyTheme(); renderGate(); });
    $$('[data-pick]', app).forEach(b => b.onclick = () => {
      buzz(); pickEffect(b);
      S.mode = b.dataset.pick; save();
      setTimeout(() => { applyTheme(); if (S.mode === 'makeup') renderQuiz(0); else { S.quizDone = true; save(); renderShell(); } }, 460);
    });
  }
  function pickEffect(btn) {
    const group = btn.parentElement;
    group.classList.add('decided');
    $$('.choice', group).forEach(x => x.classList.toggle('picked', x === btn));
  }

  /* ---------- 2. Makyaj soruları ---------- */
  const QUIZ = [
    { k: 'level', q: 'q1', o: ['q1a', 'q1b', 'q1c', 'q1d'] },
    { k: 'focus', q: 'q2', o: ['q2a', 'q2b', 'q2c', 'q2d'] },
    { k: 'goal', q: 'q3', o: ['q3a', 'q3b', 'q3c', 'q3d'] }
  ];
  function renderQuiz(i, dir = 1) {
    const q = QUIZ[i];
    app.className = 'stage';
    app.innerHTML = `
      <section class="quiz ${dir > 0 ? 'slide-in' : 'slide-back'}">
        <div class="quiz-bar">
          <button type="button" class="icon-btn" data-act="back" aria-label="${t('back')}">${ic('back')}</button>
          <div class="dots" aria-label="${t('stepOf', i + 1, QUIZ.length)}">${QUIZ.map((_, j) => `<i class="${j < i ? 'done' : j === i ? 'on' : ''}"></i>`).join('')}</div>
          <button type="button" class="text-btn" data-act="skip">${t('skip')}</button>
        </div>
        <h1 class="quiz-q">${t(q.q)}</h1>
        <div class="quiz-opts">
          ${q.o.map((o, j) => `<button type="button" class="choice pill ${S.answers[q.k] === o ? 'was' : ''}" style="--d:${j * 55}ms" data-o="${o}">${t(o)}</button>`).join('')}
        </div>
      </section>`;
    $('[data-act=back]', app).onclick = () => { if (i === 0) { S.mode = null; save(); renderGate(); } else renderQuiz(i - 1, -1); };
    $('[data-act=skip]', app).onclick = finishQuiz;
    $$('[data-o]', app).forEach(b => b.onclick = () => {
      buzz(); pickEffect(b);
      S.answers[q.k] = b.dataset.o; save();
      setTimeout(() => (i + 1 < QUIZ.length ? renderQuiz(i + 1) : finishQuiz()), 380);
    });
  }
  function finishQuiz() {
    S.quizDone = true;
    // Yanıtları profile yansıt
    if (S.answers.focus === 'q2b' || S.answers.goal === 'q3d') S.profile.concerns = Array.from(new Set([...(S.profile.concerns || []), 'dull']));
    save(); renderShell();
  }

  /* ---------- Kabuk ---------- */
  function renderShell() {
    app.className = 'shell';
    app.innerHTML = `
      <header class="topbar bar-glass">
        <button type="button" class="icon-btn" data-act="history" aria-label="${t('chats')}">${ic('history')}</button>
        <span class="wordmark">adorn</span>
        <button type="button" class="streak-chip" data-act="streak" aria-label="${t('streakTitle')}">
          <span class="flame">${ic('flame')}</span><b id="chip-n">${streakCount()}</b><i class="chip-dot"></i>
        </button>
      </header>
      <main id="view" class="view"></main>
      <div id="composer-slot"></div>
      <nav class="dock bar-glass" aria-label="Adorn">
        ${dockBtn('chat', 'chat', 'tabChat')}${dockBtn('routine', 'routine', 'tabRoutine')}
        <button type="button" class="dock-scan" data-tab="scan" aria-label="${t('tabScan')}"><span>${ic('scan')}</span></button>
        ${dockBtn('bag', 'bag', 'tabBag')}${dockBtn('profile', 'user', 'tabProfile')}
      </nav>`;
    $('[data-act=history]').onclick = openHistory;
    $('[data-act=streak]').onclick = openStreak;
    $$('.dock [data-tab]').forEach(b => b.onclick = () => {
      buzz(5);
      const id = b.dataset.tab;
      if (id === 'scan') return openScan();
      // Sohbetteyken sekmeye tekrar dokunmak ana sayfaya döner
      if (id === 'chat' && tab === 'chat' && activeChat() && !busy) { S.activeChat = null; save(); }
      go(id);
    });
    go(tab, true);
    updateChip();
    if (!S.welcomed) setTimeout(openWelcome, 380);
  }
  const dockBtn = (id, icon, label) => `<button type="button" class="dock-btn" data-tab="${id}"><span class="dock-ic">${ic(icon)}</span><span class="dock-l">${t(label)}</span></button>`;

  function updateChip() {
    const n = $('#chip-n'); if (!n) return;
    n.textContent = streakCount();
    const chip = n.parentElement;
    chip.classList.toggle('lit', streakCount() > 0);
    chip.classList.toggle('pending', S.streak.today.tasks.length < 3);
  }

  function go(next, instant) {
    tab = next;
    $$('.dock [data-tab]').forEach(b => b.classList.toggle('on', b.dataset.tab === tab));
    const v = $('#view');
    v.classList.remove('enter'); void v.offsetWidth; if (!instant) v.classList.add('enter');
    v.scrollTop = 0;
    document.body.classList.toggle('has-composer', tab === 'chat');
    if (tab !== 'chat') $('#composer-slot').innerHTML = '';
    ({ chat: renderChat, routine: renderRoutine, bag: renderBag, profile: renderProfile })[tab]();
  }

  /* ---------- 3. Karşılama ---------- */
  function openWelcome() {
    const name = (S.profile.name || '').trim();
    const ov = overlay(`
      <div class="welcome">
        <div class="orb orb-md talk" aria-hidden="true"><i></i><i></i><i></i></div>
        <h2>${t('welcomeTitle')}${name ? ' ' + esc(name) + '!' : ''}</h2>
        <p class="type-on" id="wl-text"></p>
        <div class="welcome-actions">
          <button type="button" class="btn primary" data-act="meet">${t('letsMeet')}</button>
          <button type="button" class="btn ghost" data-act="later">${t('later')}</button>
        </div>
      </div>`, 'center');
    typeOn($('#wl-text', ov), t('welcomeBody'));
    const done = (toProfile) => {
      S.welcomed = true; save(); closeOverlay(ov);
      if (toProfile) { go('profile'); setTimeout(() => $('#pf-name')?.focus(), 380); }
    };
    $('[data-act=meet]', ov).onclick = () => { buzz(); done(true); };
    $('[data-act=later]', ov).onclick = () => done(false);
  }
  function typeOn(el, text) {
    if (reduced()) { el.textContent = text; return; }
    let i = 0;
    const step = () => { i = Math.min(text.length, i + 2); el.textContent = text.slice(0, i); if (i < text.length) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }

  /* ---------- Katmanlar (sheet / tam ekran) ---------- */
  function overlay(html, kind = 'sheet') {
    const ov = document.createElement('div');
    ov.className = `ov ov-${kind}`;
    ov.innerHTML = `<div class="ov-back"></div><div class="ov-panel ${kind === 'sheet' ? 'bar-glass' : ''}" role="dialog" aria-modal="true">${kind === 'sheet' ? '<div class="grab"></div>' : ''}${html}</div>`;
    $('#layers').appendChild(ov);
    requestAnimationFrame(() => ov.classList.add('open'));
    if (kind === 'sheet') {
      $('.ov-back', ov).onclick = () => closeOverlay(ov);
      dragToClose(ov);
    }
    return ov;
  }
  function closeOverlay(ov) {
    if (!ov || ov.dataset.closing) return;
    ov.dataset.closing = '1';
    ov.classList.remove('open'); ov.classList.add('closing');
    ov.dispatchEvent(new Event('close'));
    setTimeout(() => ov.remove(), 320);
  }
  function dragToClose(ov) {
    const panel = $('.ov-panel', ov); let y0 = null, dy = 0;
    panel.addEventListener('touchstart', (e) => { if (panel.scrollTop > 0) return; y0 = e.touches[0].clientY; dy = 0; panel.style.transition = 'none'; }, { passive: true });
    panel.addEventListener('touchmove', (e) => { if (y0 == null) return; dy = Math.max(0, e.touches[0].clientY - y0); panel.style.transform = `translateY(${dy}px)`; }, { passive: true });
    panel.addEventListener('touchend', () => { if (y0 == null) return; panel.style.transition = ''; panel.style.transform = ''; if (dy > 90) closeOverlay(ov); y0 = null; });
  }

  /* ---------- Sohbet ---------- */
  const activeChat = () => S.chats.find(c => c.id === S.activeChat) || null;
  let busy = false;

  function renderChat() {
    const v = $('#view');
    const c = activeChat();
    if (!c || !c.messages.length) {
      const name = (S.profile.name || '').trim();
      v.innerHTML = `
        <section class="home">
          <div class="hello">
            <p class="date">${new Date().toLocaleDateString(S.lang === 'tr' ? 'tr-TR' : 'en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
            <h1>${greet()}${name ? ', ' + esc(name) : ''}</h1>
            <p class="muted">${t('homeSub')}</p>
          </div>
          <div class="topic-grid">
            ${topics().map((tp, i) => `<button type="button" class="topic" style="--d:${i * 40}ms" data-topic="${tp.id}"><span class="topic-ic">${ic(tp.icon)}</span><span class="topic-t">${esc(tx(tp.t))}</span></button>`).join('')}
          </div>
        </section>`;
      $$('[data-topic]', v).forEach(b => b.onclick = () => { buzz(); startTopic(b.dataset.topic); });
    } else {
      const tp = c.topic ? topics().find(x => x.id === c.topic) || findTopicAny(c.topic) : null;
      v.innerHTML = `
        ${tp ? `<div class="focus"><span class="focus-pill">${ic(tp.icon)}${esc(tx(tp.t))}</span><p>${t('focusNote')}</p></div>` : ''}
        <div class="msgs" id="msgs"></div>`;
      const box = $('#msgs');
      c.messages.forEach(m => box.appendChild(msgEl(m)));
      requestAnimationFrame(() => { v.scrollTop = v.scrollHeight; });
    }
    renderComposer();
  }
  const findTopicAny = (id) => [...D.TOPICS.makeup, ...D.TOPICS.care].find(x => x.id === id);

  function renderComposer() {
    const slot = $('#composer-slot');
    if (tab !== 'chat') { slot.innerHTML = ''; return; }
    if ($('#composer', slot)) return;
    slot.innerHTML = `
      <form class="composer bar-glass" id="composer" autocomplete="off">
        <button type="button" class="icon-btn" data-act="photo" aria-label="${t('photo')}">${ic('camera')}</button>
        <textarea id="ask" rows="1" placeholder="${t('inputPh')}" enterkeyhint="send" maxlength="1200"></textarea>
        <button type="submit" class="send" aria-label="${t('send')}" disabled>${ic('send')}</button>
      </form>
      <p class="src-note" id="src-note"></p>`;
    const f = $('#composer'), ta = $('#ask'), sb = $('.send', f);
    const fit = () => { ta.style.height = 'auto'; ta.style.height = Math.min(120, ta.scrollHeight) + 'px'; sb.disabled = !ta.value.trim() || busy; };
    ta.addEventListener('input', fit);
    ta.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); f.requestSubmit(); } });
    f.onsubmit = (e) => { e.preventDefault(); const v = ta.value.trim(); if (!v || busy) return; ta.value = ''; fit(); send(v); };
    $('[data-act=photo]', f).onclick = openScan;
    updateSrcNote();
  }
  function updateSrcNote() {
    const n = $('#src-note'); if (!n) return;
    const s = AI.source();
    n.textContent = !navigator.onLine ? t('offline') : s ? t('sourceAI') : t('sourceLocal');
    n.classList.toggle('live', !!s);
  }
  window.addEventListener('adorn:ai', updateSrcNote);
  window.addEventListener('online', updateSrcNote);
  window.addEventListener('offline', updateSrcNote);

  function newChat(topic) {
    const c = { id: 'c' + Date.now().toString(36) + Math.random().toString(36).slice(2, 5), topic: topic || null, title: '', at: Date.now(), messages: [] };
    S.chats.unshift(c); S.chats = S.chats.slice(0, 40); S.activeChat = c.id; save();
    return c;
  }
  function startTopic(id) {
    const tp = topics().find(x => x.id === id);
    const c = newChat(id); c.title = tx(tp.t);
    if (tab !== 'chat') go('chat');
    send(tx(tp.q), c);
  }

  function msgEl(m) {
    const el = document.createElement('div');
    if (m.role === 'user') {
      el.className = 'msg user';
      el.innerHTML = `<div class="bubble">${m.img ? `<img src="${m.img}" alt="">` : ''}${esc(m.text)}</div>`;
      return el;
    }
    el.className = 'msg ai';
    el.innerHTML = `<div class="ai-body"><div class="ai-text">${md(m.text || '')}</div><div class="ai-extra"></div></div>`;
    fillExtras(el, m);
    return el;
  }
  function fillExtras(el, m) {
    const x = $('.ai-extra', el); let h = '';
    if (m.steps) h += `<div class="steps-card"><p class="sc-t">${esc(m.steps.title)}</p><ol>${m.steps.items.map(s => `<li><span></span>${esc(s)}</li>`).join('')}</ol>${m.steps.routine ? `<button type="button" class="link-btn" data-open-routine="${m.steps.routine}">${t('openRoutine')} ${ic('chev')}</button>` : ''}</div>`;
    if (m.products && m.products.length) h += `<div class="p-row">${m.products.map(id => productById(id)).filter(Boolean).map(miniCard).join('')}</div>`;
    if (m.chips && m.chips.length) h += `<div class="chips">${m.chips.map(c => `<button type="button" class="chip" data-say="${esc(c)}">${esc(c)}</button>`).join('')}</div>`;
    if (m.offTopic) h += `<div class="chips"><button type="button" class="chip strong" data-newq="${esc(m.offTopic)}">${t('askNew')} ${ic('chev')}</button></div>`;
    x.innerHTML = h;
    $$('[data-say]', x).forEach(b => b.onclick = () => { if (!busy) send(b.dataset.say); });
    $$('[data-newq]', x).forEach(b => b.onclick = () => { const q = b.dataset.newq; newChat(null); renderChat(); send(q); });
    $$('[data-open-routine]', x).forEach(b => b.onclick = () => { routineSide = b.dataset.openRoutine; go('routine'); });
    bindMini(x);
  }
  function miniCard(p) {
    const f = E.fitScore(p, S.profile);
    const inBag = S.bag.some(b => b.id === p.id);
    return `<div class="mini" data-pid="${p.id}" role="button" tabindex="0">
      <div class="mini-top"><span class="mini-brand" lang="en">${esc(p.brand)}</span><span class="score s-${f.score >= 80 ? 'hi' : f.score >= 60 ? 'mid' : 'lo'}">${f.score}%</span></div>
      <p class="mini-name">${esc(p.name)}</p>
      <p class="mini-d">${esc(tx(p.d))}</p>
      <div class="mini-bot"><span class="tag">${esc(tx(D.CATS[p.cat] || D.CATS.other))}</span>
      <button type="button" class="add ${inBag ? 'in' : ''}" data-add="${p.id}" aria-label="${t('addToBag')}">${ic(inBag ? 'check' : 'plus')}</button></div>
    </div>`;
  }
  function bindMini(root) {
    $$('[data-pid]', root).forEach(c => c.onclick = (e) => {
      if (e.target.closest('[data-add]')) return;
      openProduct(E.analyzeProduct(productById(c.dataset.pid), S.profile, S.mode));
    });
    $$('[data-add]', root).forEach(b => b.onclick = (e) => {
      e.stopPropagation();
      const p = productById(b.dataset.add);
      if (S.bag.some(x => x.id === p.id)) return;
      addToBag(p); b.classList.add('in', 'pop'); b.innerHTML = ic('check');
    });
  }

  async function send(text, chat) {
    if (busy) return;
    let c = chat || activeChat();
    if (!c) c = newChat(null);
    if (!c.title) c.title = text.slice(0, 48);
    c.at = Date.now();
    const um = { role: 'user', text };
    c.messages.push(um); save();
    if (tab !== 'chat') go('chat');
    else if (!$('#msgs')) renderChat();
    else $('#msgs').appendChild(msgEl(um));
    scrollDown(true);
    busy = true; $('.send') && ($('.send').disabled = true);

    const tp = c.topic ? findTopicAny(c.topic) : null;
    const local = E.reply({ text, prof: S.profile, mode: S.mode, lang: S.lang, name: (S.profile.name || '').trim(), bag: S.bag, topicArea: tp ? tp.area : null });
    const am = { role: 'ai', text: '' };
    const el = msgEl(am); el.classList.add('typing');
    el.querySelector('.ai-text').innerHTML = `<span class="dots3" aria-label="${t('thinking')}"><i></i><i></i><i></i></span>`;
    $('#msgs').appendChild(el); scrollDown(true);

    if (local.offTopic) {
      await wait(300);
      am.text = t('offTopic', tp ? tx(tp.t) : '');
      am.offTopic = text;
      await reveal(el, am);
      return finishMsg(c, am);
    }

    const src = AI.source();
    if (src) {
      try {
        const sys = systemPrompt(tp);
        const history = c.messages.filter(m => m.text).slice(-12).map(m => ({ role: m.role === 'ai' ? 'assistant' : 'user', content: m.text }));
        const tEl = el.querySelector('.ai-text');
        let started = false, pend = null;
        const final = await AI.chat({ system: sys, messages: history, onText: (txt) => {
          if (!started) { started = true; el.classList.remove('typing'); }
          pend = txt;
          if (!draw.q) { draw.q = requestAnimationFrame(() => { draw.q = 0; tEl.innerHTML = md(pend); scrollDown(); }); }
        } });
        am.text = String(final || pend || '').trim();
        if (!am.text) throw { code: 'empty' };
        el.classList.remove('typing'); tEl.innerHTML = md(am.text);
        if (local.products) am.products = local.products.slice(0, 3);
        if (local.steps && local.steps.routine) am.steps = local.steps;
        if (local.chips) am.chips = local.chips;
        am.ai = true;
        fillExtras(el, am); el.querySelector('.ai-extra').classList.add('fade-up');
        return finishMsg(c, am);
      } catch (e) {
        if (e && e.code === 'bad_key') toast(S.lang === 'tr' ? 'API anahtarı geçersiz. Yerleşik yanıt kullanıldı.' : 'Invalid API key. Used a built-in reply.');
        // yerel yanıta düş
      }
    } else {
      await wait(260 + Math.random() * 220);
    }
    Object.assign(am, { text: local.text, steps: local.steps, products: local.products, chips: local.chips });
    if (local.action === 'streak') am.chips = [...(am.chips || [])];
    await reveal(el, am);
    if (local.action === 'streak') setTimeout(openStreak, 500);
    finishMsg(c, am);
  }
  const draw = { q: 0 };
  function finishMsg(c, am) {
    c.messages.push(am); c.at = Date.now(); save();
    busy = false;
    const ta = $('#ask'); if (ta) $('.send').disabled = !ta.value.trim();
    updateSrcNote();
  }
  function reveal(el, m) {
    return new Promise((res) => {
      el.classList.remove('typing');
      const tEl = el.querySelector('.ai-text');
      const full = m.text || '';
      const done = () => { tEl.innerHTML = md(full); fillExtras(el, m); el.querySelector('.ai-extra').classList.add('fade-up'); scrollDown(); res(); };
      if (reduced() || full.length < 2) return done();
      const per = Math.max(3, Math.ceil(full.length / 40));
      let i = 0;
      const step = () => {
        i = Math.min(full.length, i + per);
        tEl.innerHTML = md(full.slice(0, i));
        scrollDown();
        if (i < full.length) requestAnimationFrame(step); else done();
      };
      requestAnimationFrame(step);
    });
  }
  function scrollDown(force) {
    const v = $('#view'); if (!v) return;
    const near = v.scrollHeight - v.scrollTop - v.clientHeight < 160;
    if (force || near) v.scrollTop = v.scrollHeight;
  }
  function systemPrompt(tp) {
    const lang = S.lang === 'tr' ? 'Turkish (natural, fluent, grammatically correct Turkish; use "sen" form)' : 'English';
    const prof = { ...S.profile }; delete prof.notes;
    const scope = S.mode === 'care'
      ? 'Scope: skincare, haircare, scalp, beard, shaving and grooming only. Never suggest makeup. If asked about makeup, say makeup content is turned off and can be enabled in Profile > Settings.'
      : 'Scope: skincare, haircare and makeup.';
    return [
      'You are Adorn, a warm, knowledgeable personal care assistant inside a mobile app.',
      `Always reply in ${lang}, even if the user mixes languages.`,
      'Keep it short and practical: 2–5 sentences, or up to 6 bullet lines starting with "• ". Use **bold** sparingly. No headings, tables or emoji.',
      scope,
      tp ? `This chat is focused on: "${tx(tp.t)}". Keep answers on this topic; if the user drifts far, answer in one line and suggest starting a new chat.` : '',
      `User profile (may be partial): ${JSON.stringify(prof)}.` + (S.profile.notes ? ` User notes: ${S.profile.notes.slice(0, 300)}` : ''),
      S.bag.length ? `Products they own: ${S.bag.map(b => (b.brand ? b.brand + ' ' : '') + b.name).join('; ')}.` : '',
      'Do not diagnose. For persistent, painful or spreading skin/scalp problems, recommend a dermatologist. Never comment on age, gender, ethnicity or attractiveness.'
    ].filter(Boolean).join('\n');
  }

  function openHistory() {
    const list = S.chats.filter(c => c.messages.length);
    const ov = overlay(`
      <div class="sheet-head"><h2>${t('chats')}</h2><button type="button" class="btn small primary" data-act="new">${ic('plus')} ${t('newChat')}</button></div>
      <div class="hist">${list.length ? list.map(c => {
        const tp = c.topic ? findTopicAny(c.topic) : null;
        return `<div class="hist-row ${c.id === S.activeChat ? 'on' : ''}" data-id="${c.id}">
          <button type="button" class="hist-main" data-open="${c.id}"><span class="hist-ic">${ic(tp ? tp.icon : 'chat')}</span><span><b>${esc(c.title || t('general'))}</b><small>${new Date(c.at).toLocaleDateString(S.lang === 'tr' ? 'tr-TR' : 'en-GB', { day: 'numeric', month: 'short' })} · ${c.messages.length}</small></span></button>
          <button type="button" class="icon-btn" data-del="${c.id}" aria-label="${t('deleteChat')}">${ic('trash')}</button></div>`;
      }).join('') : `<p class="muted center pad">${t('noChats')}</p>`}</div>`);
    $('[data-act=new]', ov).onclick = () => { S.activeChat = null; save(); closeOverlay(ov); go('chat'); };
    $$('[data-open]', ov).forEach(b => b.onclick = () => { S.activeChat = b.dataset.open; save(); closeOverlay(ov); go('chat'); });
    $$('[data-del]', ov).forEach(b => b.onclick = () => {
      const id = b.dataset.del; S.chats = S.chats.filter(c => c.id !== id);
      if (S.activeChat === id) S.activeChat = null;
      save(); b.closest('.hist-row').classList.add('gone'); setTimeout(() => b.closest('.hist-row')?.remove(), 260);
      if (tab === 'chat') renderChat();
    });
  }

  /* ---------- Rutin ---------- */
  let routineSide = new Date().getHours() < 15 ? 'am' : 'pm';
  function renderRoutine() {
    ensureToday();
    const r = E.buildRoutine(S.profile, S.mode);
    const v = $('#view');
    const steps = r[routineSide], done = S.routine[routineSide];
    const n = steps.filter(s => done.includes(s.id)).length;
    const pct = Math.round(n / steps.length * 100);
    const mins = steps.reduce((a, b) => a + b.m, 0);
    v.innerHTML = `
      <section class="page">
        <header class="page-h"><h1>${t('routineTitle')}</h1><p class="muted">${t('routineSub')}</p></header>
        <div class="seg" role="tablist" style="--i:${routineSide === 'am' ? 0 : 1}">
          <i class="seg-ind"></i>
          <button type="button" role="tab" class="${routineSide === 'am' ? 'on' : ''}" data-side="am">${ic('sun')} ${t('am')}</button>
          <button type="button" role="tab" class="${routineSide === 'pm' ? 'on' : ''}" data-side="pm">${ic('moon')} ${t('pm')}</button>
        </div>
        <div class="r-head glass">
          <div class="ring" style="--p:${pct}"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="trk"/><circle cx="22" cy="22" r="19" class="val" pathLength="100"/></svg><b>${n}/${steps.length}</b></div>
          <div><p class="r-title">${routineSide === 'am' ? t('am') : t('pm')}</p><p class="muted">${t('minutes', mins)}${pct === 100 ? ' · <span class="ok">' + t('allDone') + '</span>' : ''}</p></div>
        </div>
        <ol class="r-list">
          ${steps.map((s, i) => `<li><button type="button" class="r-step ${done.includes(s.id) ? 'done' : ''}" data-step="${s.id}" style="--d:${i * 35}ms"><span class="tick">${ic('check')}</span><span class="r-t">${esc(tx(s.t))}</span><span class="r-m">${t('minutes', s.m)}</span></button></li>`).join('')}
        </ol>
      </section>`;
    $$('[data-side]', v).forEach(b => b.onclick = () => { if (routineSide === b.dataset.side) return; routineSide = b.dataset.side; buzz(5); renderRoutine(); });
    $$('[data-step]', v).forEach(b => b.onclick = () => {
      const id = b.dataset.step, arr = S.routine[routineSide];
      const i = arr.indexOf(id);
      if (i >= 0) arr.splice(i, 1); else { arr.push(id); buzz(); }
      save();
      b.classList.toggle('done', i < 0);
      const all = steps.every(s => arr.includes(s.id));
      if (all) { completeTask(routineSide, b); }
      refreshRoutineHead(steps);
    });
  }
  function refreshRoutineHead(steps) {
    const done = S.routine[routineSide];
    const n = steps.filter(s => done.includes(s.id)).length, pct = Math.round(n / steps.length * 100);
    const ring = $('.r-head .ring'); if (!ring) return;
    ring.style.setProperty('--p', pct); ring.querySelector('b').textContent = `${n}/${steps.length}`;
    const m = $('.r-head .muted'); m.innerHTML = t('minutes', steps.reduce((a, b) => a + b.m, 0)) + (pct === 100 ? ' · <span class="ok">' + t('allDone') + '</span>' : '');
  }

  /* ---------- Ürünler ---------- */
  let bagFilter = 'all';
  function addToBag(p) {
    if (S.bag.some(b => b.id === p.id)) return;
    S.bag.unshift({ id: p.id, brand: p.brand, name: p.name, cat: p.cat, area: p.area, for: p.for || [], concerns: p.concerns || [], budget: p.budget || '', ff: !!p.ff, ing: p.ing || [], d: p.d || null, how: p.how || null, rating: 0, at: Date.now(), score: p.score });
    save(); buzz(12);
    toast(t('added'), { label: t('undo'), run: () => { S.bag = S.bag.filter(b => b.id !== p.id); save(); if (tab === 'bag') renderBag(); } });
    if (tab === 'bag') renderBag();
  }
  function renderBag() {
    const v = $('#view');
    const items = S.bag.filter(b => S.mode === 'makeup' || b.area !== 'makeup');
    const areas = Array.from(new Set(items.map(b => b.area)));
    if (bagFilter !== 'all' && !areas.includes(bagFilter)) bagFilter = 'all';
    const shown = items.filter(b => bagFilter === 'all' || b.area === bagFilter);
    v.innerHTML = `
      <section class="page">
        <header class="page-h row"><div><h1>${t('bagTitle')}</h1><p class="muted">${items.length}</p></div><button type="button" class="btn small primary" data-act="add">${ic('scan')} ${t('scanAdd')}</button></header>
        ${items.length ? `<div class="filters">${['all', ...areas].map(a => `<button type="button" class="chip ${bagFilter === a ? 'on' : ''}" data-f="${a}">${a === 'all' ? t('all') : esc(tx(D.AREAS[a]))}</button>`).join('')}</div>
        <div class="bag-list">${shown.map((b, i) => {
          const f = b.id.startsWith('u-') ? { score: b.score || 70 } : E.fitScore(b, S.profile);
          return `<div class="bag-item glass" style="--d:${i * 30}ms" data-bid="${esc(b.id)}">
            <div class="ring sm" style="--p:${f.score}"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="trk"/><circle cx="22" cy="22" r="19" class="val" pathLength="100"/></svg><b>${f.score}</b></div>
            <div class="bag-main"><span class="mini-brand" lang="${b.brand ? 'en' : S.lang}">${esc(b.brand || tx(D.CATS[b.cat]))}</span><p class="bag-name">${esc(b.name)}</p>
              <div class="stars" role="group" aria-label="${t('rate')}">${[1, 2, 3, 4, 5].map(n => `<button type="button" class="${b.rating >= n ? 'on' : ''}" data-rate="${n}" aria-label="${n}">${ic('star')}</button>`).join('')}</div></div>
            <button type="button" class="icon-btn" data-rm="${esc(b.id)}" aria-label="${t('removed')}">${ic('trash')}</button>
          </div>`;
        }).join('')}</div>` : `
        <div class="empty glass"><div class="orb orb-sm" aria-hidden="true"><i></i><i></i><i></i></div><p>${t('bagEmpty')}</p><button type="button" class="btn primary" data-act="add">${ic('camera')} ${t('scanTitle')}</button></div>`}
      </section>`;
    $$('[data-act=add]', v).forEach(b => b.onclick = openScan);
    $$('[data-f]', v).forEach(b => b.onclick = () => { bagFilter = b.dataset.f; renderBag(); });
    $$('[data-rate]', v).forEach(b => b.onclick = (e) => {
      e.stopPropagation();
      const it = S.bag.find(x => x.id === b.closest('[data-bid]').dataset.bid); it.rating = +b.dataset.rate; save(); buzz(5);
      $$('[data-rate]', b.parentElement).forEach(s => s.classList.toggle('on', +s.dataset.rate <= it.rating));
    });
    $$('[data-rm]', v).forEach(b => b.onclick = (e) => {
      e.stopPropagation();
      const id = b.dataset.rm, idx = S.bag.findIndex(x => x.id === id), it = S.bag[idx];
      S.bag.splice(idx, 1); save();
      const row = b.closest('.bag-item'); row.classList.add('gone'); setTimeout(renderBag, 260);
      toast(t('removed'), { label: t('undo'), run: () => { S.bag.splice(idx, 0, it); save(); renderBag(); } });
    });
    $$('[data-bid]', v).forEach(r => r.onclick = () => {
      const b = S.bag.find(x => x.id === r.dataset.bid);
      const known = D.PRODUCTS.find(p => p.id === b.id);
      openProduct(known ? E.analyzeProduct(known, S.profile, S.mode) : { known: false, product: b, score: b.score || 70, why: [], warn: [], how: b.how, ing: b.ing, desc: b.d });
    });
  }

  function openProduct(a) {
    const p = a.product;
    const inBag = S.bag.some(b => b.id === p.id);
    const list = (arr) => arr.map(x => `<li>${esc(typeof x === 'string' ? x : tx(x))}</li>`).join('');
    const ov = overlay(`
      <div class="pd">
        <div class="pd-top">
          <div class="ring lg" style="--p:${a.score}"><svg viewBox="0 0 44 44"><circle cx="22" cy="22" r="19" class="trk"/><circle cx="22" cy="22" r="19" class="val" pathLength="100"/></svg><b>${a.score}<small>%</small></b></div>
          <div><span class="mini-brand" lang="en">${esc(p.brand || '')}</span><h2>${esc(p.name)}</h2><span class="tag">${esc(tx(D.CATS[p.cat] || D.CATS.other))}</span></div>
        </div>
        <p class="pd-fit">${t('fit')}</p>
        ${a.aiNote ? `<p>${esc(a.aiNote)}</p>` : ''}
        ${a.desc ? `<p>${esc(tx(a.desc))}</p>` : ''}
        ${!a.known && !a.aiNote ? `<p class="muted">${t('unknownProduct')}</p>` : ''}
        ${a.why && a.why.length ? `<div class="pd-sec ok"><h3>${ic('check')} ${t('why')}</h3><ul>${list(a.why)}</ul></div>` : ''}
        ${a.warn && a.warn.length ? `<div class="pd-sec warn"><h3>${ic('target')} ${t('caution')}</h3><ul>${list(a.warn)}</ul></div>` : ''}
        ${a.how ? `<div class="pd-sec"><h3>${ic('sparkle')} ${t('how')}</h3><p>${esc(tx(a.how))}</p></div>` : ''}
        ${a.ing && a.ing.length ? `<div class="pd-sec"><h3>${ic('drop')} ${t('keyIng')}</h3><div class="chips">${a.ing.map(i => `<span class="chip static">${esc(i)}</span>`).join('')}</div></div>` : ''}
        <button type="button" class="btn primary wide" data-act="add" ${inBag ? 'disabled' : ''}>${ic(inBag ? 'check' : 'plus')} ${inBag ? t('added') : t('addToBag')}</button>
      </div>`);
    $('[data-act=add]', ov).onclick = (e) => { addToBag({ ...p, score: a.score }); e.currentTarget.disabled = true; e.currentTarget.innerHTML = ic('check') + ' ' + t('added'); };
  }

  /* ---------- Tarama ---------- */
  let stream = null;
  function stopCam() { if (stream) { stream.getTracks().forEach(tr => tr.stop()); stream = null; } }
  function openScan() {
    buzz();
    const ov = overlay(`
      <div class="scan">
        <video id="cam" playsinline muted autoplay></video>
        <img id="shot" alt="" hidden>
        <div class="scan-shade"></div>
        <header class="scan-h"><button type="button" class="icon-btn glass-dark" data-act="x" aria-label="${t('close')}">${ic('close')}</button><span>${t('scanTitle')}</span><span style="width:44px"></span></header>
        <div class="frame"><i></i><i></i><i></i><i></i><div class="beam"></div></div>
        <p class="scan-hint" id="scan-hint">${t('scanHint')}</p>
        <div class="scan-panel" id="scan-panel" hidden></div>
        <footer class="scan-f">
          <label class="round glass-dark" aria-label="${t('scanGallery')}">${ic('image')}<input type="file" accept="image/*" id="pick" hidden></label>
          <button type="button" class="shutter" data-act="shoot" aria-label="${t('scanCapture')}"><i></i></button>
          <button type="button" class="round glass-dark" data-act="type" aria-label="${t('scanType')}">${ic('type')}</button>
        </footer>
      </div>`, 'full');
    ov.addEventListener('close', stopCam);
    $('[data-act=x]', ov).onclick = () => closeOverlay(ov);
    $('[data-act=type]', ov).onclick = () => askName(ov, null);
    $('#pick', ov).onchange = (e) => { const f = e.target.files[0]; if (f) handleShot(ov, f); };
    $('[data-act=shoot]', ov).onclick = () => {
      const v = $('#cam', ov);
      if (!stream || !v.videoWidth) { $('#pick', ov).click(); return; }
      buzz(15);
      const c = document.createElement('canvas'); const sc = Math.min(1, 1280 / Math.max(v.videoWidth, v.videoHeight));
      c.width = v.videoWidth * sc; c.height = v.videoHeight * sc; c.getContext('2d').drawImage(v, 0, 0, c.width, c.height);
      ov.classList.add('flash'); setTimeout(() => ov.classList.remove('flash'), 300);
      c.toBlob(b => handleShot(ov, b), 'image/jpeg', 0.85);
    };
    startCam(ov);
  }
  async function startCam(ov) {
    try {
      if (!navigator.mediaDevices?.getUserMedia) throw 0;
      stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: 'environment' }, width: { ideal: 1280 } }, audio: false });
      if (!ov.isConnected) return stopCam();
      const v = $('#cam', ov); v.srcObject = stream; await v.play().catch(() => {});
      ov.classList.add('live');
    } catch (_) {
      ov.classList.add('nocam');
      $('#scan-hint', ov).textContent = t('camOff');
    }
  }
  async function shrink(blob) {
    try {
      const bmp = await createImageBitmap(blob); const sc = Math.min(1, 1280 / Math.max(bmp.width, bmp.height));
      const c = document.createElement('canvas'); c.width = Math.round(bmp.width * sc); c.height = Math.round(bmp.height * sc);
      c.getContext('2d').drawImage(bmp, 0, 0, c.width, c.height);
      return await new Promise(r => c.toBlob(r, 'image/jpeg', 0.85));
    } catch (_) { return blob; }
  }
  async function handleShot(ov, blob) {
    blob = await shrink(blob);
    stopCam();
    const img = $('#shot', ov); img.src = URL.createObjectURL(blob); img.hidden = false;
    ov.classList.add('frozen', 'busy'); ov.classList.remove('live');
    $('#scan-hint', ov).textContent = t('analyzing');
    if (AI.source()) {
      try {
        const r = await AI.json({ system: visionPrompt(), messages: [{ role: 'user', content: 'Analyze this product photo.' }], image: blob });
        ov.classList.remove('busy');
        if (!r || !r.found || !r.name) { $('#scan-hint', ov).textContent = t('notFoundPhoto'); return askName(ov, blob); }
        const label = ((r.brand || '') + ' ' + r.name).trim();
        const known = E.findProduct(label);
        let a;
        if (known) a = E.analyzeProduct(known, S.profile, S.mode);
        else {
          a = E.analyzeProduct(label, S.profile, S.mode);
          a.product.brand = String(r.brand || '').slice(0, 60); a.product.name = String(r.name).slice(0, 100);
          if (r.category && D.CATS[r.category]) { a.product.cat = r.category; }
          if (Array.isArray(r.keyIngredients)) a.ing = a.product.ing = r.keyIngredients.slice(0, 6).map(String);
        }
        if (typeof r.fit === 'number') a.score = Math.max(20, Math.min(98, Math.round(r.fit)));
        if (r.summary) a.aiNote = String(r.summary).slice(0, 400);
        if (Array.isArray(r.why) && r.why.length) a.why = r.why.slice(0, 4).map(String);
        if (Array.isArray(r.caution) && r.caution.length) a.warn = r.caution.slice(0, 4).map(String);
        if (r.how) a.how = String(r.how).slice(0, 300);
        closeOverlay(ov); setTimeout(() => openProduct(a), 200);
        return;
      } catch (e) { ov.classList.remove('busy'); }
    }
    ov.classList.remove('busy');
    askName(ov, blob);
  }
  function visionPrompt() {
    const lang = S.lang === 'tr' ? 'Turkish' : 'English';
    return `You review personal care products for a user. Identify the product in the photo and judge its fit for this user profile: ${JSON.stringify(S.profile)}. App mode: ${S.mode === 'care' ? 'no makeup (skin, hair, grooming only)' : 'makeup, skin and hair'}.
Reply with JSON only:
{"found": true, "brand": "", "name": "", "category": one of ${JSON.stringify(Object.keys(D.CATS))}, "keyIngredients": ["..."], "fit": 0-100, "summary": "one or two sentences in ${lang}", "why": ["short reasons in ${lang}"], "caution": ["short cautions in ${lang}"], "how": "how to use, one sentence in ${lang}"}
If no personal care product is visible or the name can't be read, reply {"found": false}. Don't comment on any person in the photo.`;
  }
  function askName(ov, blob) {
    stopCam();
    ov.classList.add('naming'); ov.classList.remove('live');
    const panel = $('#scan-panel', ov); panel.hidden = false;
    panel.innerHTML = `
      <h3>${blob ? t('whatProduct') : t('scanType')}</h3>
      ${blob ? `<p class="muted">${t('whatProductSub')}</p>` : ''}
      <form id="nm-form" class="nm-form"><input id="nm" type="text" placeholder="${t('scanTypePh')}" autocomplete="off" enterkeyhint="search"><button type="submit" class="btn primary">${t('analyze')}</button></form>
      <div class="sugg" id="sugg"></div>`;
    const inp = $('#nm', panel), sg = $('#sugg', panel);
    const suggest = () => {
      const q = E.norm(inp.value).trim();
      const pool = D.PRODUCTS.filter(p => S.mode === 'makeup' || p.area !== 'makeup');
      const hits = q.length < 2 ? pool.slice(0, 0) : pool.filter(p => E.norm(p.brand + ' ' + p.name).includes(q.split(' ')[0])).slice(0, 5);
      sg.innerHTML = hits.map(p => `<button type="button" data-s="${p.id}"><b>${esc(p.brand)}</b> ${esc(p.name)}</button>`).join('');
      $$('[data-s]', sg).forEach(b => b.onclick = () => { closeOverlay(ov); setTimeout(() => openProduct(E.analyzeProduct(productById(b.dataset.s), S.profile, S.mode)), 200); });
    };
    inp.addEventListener('input', suggest);
    $('#nm-form', panel).onsubmit = (e) => {
      e.preventDefault(); const q = inp.value.trim(); if (!q) return inp.focus();
      closeOverlay(ov); setTimeout(() => openProduct(E.analyzeProduct(q, S.profile, S.mode)), 200);
    };
    setTimeout(() => inp.focus(), 250);
  }

  /* ---------- Seri (tam ekran oyun) ---------- */
  function openStreak() {
    buzz();
    ensureToday();
    if (!curSeries()) return pickSeries(true);
    const ov = overlay('<div class="streak" id="streak"></div>', 'full');
    ov.classList.add('ov-streak');
    drawStreak(ov);
  }
  function drawStreak(ov) {
    const s = curSeries(); const st = S.streak; const tk = st.today.tasks;
    const lesson = s.lessons[st.today.lesson % s.lessons.length];
    const lv = level(), xpIn = st.xp % 100;
    const cnt = streakCount();
    const root = $('#streak', ov);
    const tasks = [
      { id: 'am', icon: 'sun', t: t('taskAM'), d: t('taskAMd') },
      { id: 'lesson', icon: 'book', t: t('taskLesson'), d: tx(lesson.t) },
      { id: 'pm', icon: 'moon', t: t('taskPM'), d: t('taskPMd') }
    ];
    root.innerHTML = `
      <canvas class="sparks" aria-hidden="true"></canvas>
      <header class="st-h">
        <button type="button" class="icon-btn glass-dark" data-act="x" aria-label="${t('close')}">${ic('close')}</button>
        <button type="button" class="st-series" data-act="series">${esc(tx(s.t))} ${ic('chev')}</button>
        <span class="lv-pill">${t('level', lv)}</span>
      </header>
      <div class="st-hero">
        <div class="flame-orb ${cnt > 0 ? 'lit' : ''}" style="--p:${tk.length / 3}">
          <svg class="prog" viewBox="0 0 120 120"><circle cx="60" cy="60" r="54" class="trk"/><circle cx="60" cy="60" r="54" class="val" pathLength="100" style="stroke-dashoffset:${100 - tk.length / 3 * 100}"/></svg>
          <div class="core"><span class="fl">${ic('flame')}</span><b id="st-count">${cnt}</b><small>${t('dayStreak')}</small></div>
        </div>
        <div class="xp"><div class="xp-row"><span>${t('xp', st.xp)}</span><span>${xpIn}/100</span></div><div class="xp-bar"><i style="width:${xpIn}%"></i></div></div>
      </div>
      <h3 class="st-sub">${t('todayTasks')} <span>${tk.length}/3</span></h3>
      <div class="quests">
        ${tasks.map((q, i) => `<button type="button" class="quest ${tk.includes(q.id) ? 'done' : ''}" data-q="${q.id}" style="--d:${i * 70}ms">
          <span class="q-ic">${ic(q.icon)}</span><span class="q-txt"><b>${q.t}</b><small>${esc(q.d)}</small></span><span class="q-ck">${ic(tk.includes(q.id) ? 'check' : 'chev')}</span></button>`).join('')}
      </div>
      <h3 class="st-sub">${t('journey')} <span>${st.doneDays}/30</span></h3>
      <div class="map" id="map">${mapHTML(st.doneDays, tk.length === 3)}</div>
      <h3 class="st-sub">${t('badges')}</h3>
      <div class="badges">${BADGES.map(b => `<div class="badge ${st.badges.includes(b.n) ? 'got' : ''}"><span>${ic(st.badges.includes(b.n) ? 'trophy' : 'lock')}</span><b>${b.n}</b><small>${t(b.k)}</small></div>`).join('')}</div>
      <div style="height:40px"></div>`;
    $('[data-act=x]', root).onclick = () => { closeOverlay(ov); if (tab === 'routine') renderRoutine(); };
    $('[data-act=series]', root).onclick = () => pickSeries(false, ov);
    $$('[data-q]', root).forEach(b => b.onclick = () => {
      const id = b.dataset.q;
      if (id === 'lesson') return openLesson(ov, lesson);
      if (tk.includes(id)) return;
      // Rutin adımlarını işaretle
      const r = E.buildRoutine(S.profile, S.mode);
      S.routine[id] = r[id].map(s => s.id);
      buzz(18);
      b.classList.add('done', 'pop');
      completeTask(id, b);
      setTimeout(() => drawStreak(ov), 650);
    });
    startSparks(ov);
  }
  function mapHTML(done, todayDone) {
    let h = '<div class="map-track">';
    for (let i = 0; i < 30; i++) {
      const state = i < done ? 'ok' : (i === done && !todayDone ? 'cur' : 'lock');
      const ms = [2, 6, 13, 29].includes(i);
      h += `<div class="node ${state} ${ms ? 'ms' : ''}" style="--x:${Math.sin(i * 0.9) * 34}%"><span>${state === 'ok' ? ic('check') : ms ? ic('trophy') : i + 1}</span></div>`;
    }
    return h + '</div>';
  }
  function openLesson(parent, lesson) {
    const done = S.streak.today.tasks.includes('lesson');
    const ov = overlay(`
      <div class="lesson">
        <span class="eyebrow">${t('taskLesson')}</span>
        <h2>${esc(tx(lesson.t))}</h2>
        <p>${esc(tx(lesson.b))}</p>
        <div class="quiz-box">
          <p class="qb-t">${t('lessonQuiz')}</p>
          <p class="qb-q">${esc(tx(lesson.q))}</p>
          <div class="qb-o">${lesson.o.map((o, i) => `<button type="button" class="choice pill" data-a="${i}">${esc(tx(o))}</button>`).join('')}</div>
          <p class="qb-r" id="qb-r"></p>
        </div>
        <button type="button" class="btn ghost wide" data-act="close">${t('close')}</button>
      </div>`);
    const res = $('#qb-r', ov);
    if (done) { const btns = $$('[data-a]', ov); btns.forEach(b => { b.disabled = true; b.classList.toggle('right', +b.dataset.a === lesson.a); }); res.textContent = t('correct').split('!')[0] + '!'; }
    $$('[data-a]', ov).forEach(b => b.onclick = () => {
      if (S.streak.today.tasks.includes('lesson')) return;
      const ok = +b.dataset.a === lesson.a;
      const g = b.parentElement; g.classList.add('decided');
      $$('[data-a]', g).forEach(x => { x.disabled = true; x.classList.toggle('right', +x.dataset.a === lesson.a); x.classList.toggle('picked', x === b); });
      if (!ok) b.classList.add('wrong');
      res.textContent = ok ? t('correct') : t('wrong');
      buzz(ok ? 20 : [10, 40, 10]);
      completeTask('lesson', ok ? b : null);
      if (!ok) S.streak.xp -= 5;
      save();
      setTimeout(() => drawStreak(parent), 300);
    });
    $('[data-act=close]', ov).onclick = () => closeOverlay(ov);
  }
  function pickSeries(thenOpen, parent) {
    const ov = overlay(`
      <div class="series-pick">
        <h2>${t('chooseSeries')}</h2>
        ${seriesList().map(s => `<button type="button" class="series-card ${S.streak.series === s.id ? 'on' : ''}" data-s="${s.id}"><span class="sc-orb">${ic(s.id.startsWith('mk') ? 'sparkle' : s.id.startsWith('gr') ? 'beard' : 'drop')}</span><span><b>${esc(tx(s.t))}</b><small>${esc(tx(s.d))}</small></span>${ic('chev')}</button>`).join('')}
      </div>`);
    $$('[data-s]', ov).forEach(b => b.onclick = () => {
      buzz();
      if (S.streak.series !== b.dataset.s) {
        S.streak.series = b.dataset.s;
        const s = curSeries(); S.streak.today.lesson = S.streak.doneDays % s.lessons.length;
        save();
      }
      closeOverlay(ov);
      if (thenOpen) setTimeout(openStreak, 260);
      else if (parent) drawStreak(parent);
    });
  }
  function celebrate() {
    const n = streakCount();
    const ov = overlay(`
      <div class="celebrate">
        <canvas class="confetti" aria-hidden="true"></canvas>
        <div class="flame-orb lit big"><div class="core"><span class="fl">${ic('flame')}</span><b id="cel-n">0</b></div></div>
        <h2>${t('dayDone')}</h2>
        <p>${t('dayDoneSub', n)}</p>
        <button type="button" class="btn primary" data-act="ok">${t('done')}</button>
      </div>`, 'center');
    ov.classList.add('ov-cel');
    let k = 0; const el = $('#cel-n', ov);
    const tick = () => { k++; el.textContent = Math.min(n, k); if (k < n) setTimeout(tick, Math.max(40, 400 / n)); };
    setTimeout(tick, 250);
    confetti($('.confetti', ov));
    buzz([20, 60, 30]);
    $('[data-act=ok]', ov).onclick = () => closeOverlay(ov);
  }

  /* ---------- Efektler ---------- */
  function burst(el, label) {
    if (reduced()) return;
    const r = el.getBoundingClientRect();
    const host = $('#fx');
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('i');
      const a = (Math.PI * 2 * i) / 14, d = 40 + Math.random() * 40;
      p.className = 'pt';
      p.style.cssText = `left:${cx}px;top:${cy}px;--tx:${Math.cos(a) * d}px;--ty:${Math.sin(a) * d}px;--h:${Math.random() * 40}`;
      host.appendChild(p); setTimeout(() => p.remove(), 700);
    }
    if (label) {
      const f = document.createElement('b'); f.className = 'xp-float'; f.textContent = label;
      f.style.cssText = `left:${cx}px;top:${cy - 10}px`; host.appendChild(f); setTimeout(() => f.remove(), 1000);
    }
  }
  function confetti(cv) {
    if (reduced() || !cv) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    const W = cv.width = innerWidth * dpr, H = cv.height = innerHeight * dpr;
    const ctx = cv.getContext('2d');
    const cs = getComputedStyle(document.documentElement);
    const cols = ['--accent', '--blob1', '--blob2', '--gold'].map(v => cs.getPropertyValue(v).trim() || '#c98');
    const ps = Array.from({ length: 120 }, () => ({ x: W / 2, y: H * 0.42, vx: (Math.random() - 0.5) * 18 * dpr, vy: (-Math.random() * 16 - 4) * dpr, r: (3 + Math.random() * 5) * dpr, c: cols[(Math.random() * cols.length) | 0], a: Math.random() * 6, s: Math.random() * 0.3 }));
    let f = 0;
    const loop = () => {
      if (!cv.isConnected) return;
      ctx.clearRect(0, 0, W, H);
      ps.forEach(p => { p.vy += 0.45 * dpr; p.vx *= 0.99; p.x += p.vx; p.y += p.vy; p.a += p.s; ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.a); ctx.fillStyle = p.c; ctx.fillRect(-p.r, -p.r / 2, p.r * 2, p.r); ctx.restore(); });
      if (++f < 160) requestAnimationFrame(loop); else ctx.clearRect(0, 0, W, H);
    };
    loop();
  }
  function startSparks(ov) {
    if (reduced()) return;
    const cv = $('.sparks', ov); if (!cv) return;
    const dpr = Math.min(2, devicePixelRatio || 1);
    let W, H; const ctx = cv.getContext('2d');
    const size = () => { W = cv.width = innerWidth * dpr; H = cv.height = innerHeight * dpr; };
    size();
    const ps = Array.from({ length: 34 }, () => ({ x: Math.random(), y: Math.random(), v: 0.0006 + Math.random() * 0.0016, r: 0.6 + Math.random() * 1.8, o: Math.random() }));
    const loop = () => {
      if (!ov.isConnected) return;
      const c2 = $('.sparks', ov); if (c2 !== cv) return;
      ctx.clearRect(0, 0, W, H);
      ps.forEach(p => { p.y -= p.v; p.o += 0.02; if (p.y < -0.02) { p.y = 1.02; p.x = Math.random(); } ctx.globalAlpha = 0.35 + Math.sin(p.o) * 0.3; ctx.fillStyle = '#ffd9b0'; ctx.beginPath(); ctx.arc(p.x * W, p.y * H, p.r * dpr, 0, 7); ctx.fill(); });
      requestAnimationFrame(loop);
    };
    loop();
  }

  /* ---------- Profil ---------- */
  function renderProfile() {
    const v = $('#view'); const pf = S.profile; const mk = S.mode === 'makeup';
    const group = (key, multi, extra = '') => {
      const opts = D.OPTIONS[key];
      const val = pf[key];
      return `<div class="pf-g"><p class="pf-l">${t(key)}</p><div class="chips ${extra}" data-key="${key}" data-multi="${multi ? 1 : 0}">
        ${opts.map(o => {
          const on = multi ? (val || []).includes(o.id) : val === o.id;
          return `<button type="button" class="chip ${on ? 'on' : ''}" data-v="${o.id}" aria-pressed="${on}">${o.c ? `<i class="sw" style="background:${o.c}"></i>` : ''}${esc(tx(o.l))}</button>`;
        }).join('')}</div></div>`;
    };
    const ai = AI.source();
    v.innerHTML = `
      <section class="page">
        <header class="pf-head">
          <div class="avatar orb orb-sm" aria-hidden="true"><i></i><i></i><i></i><b>${esc((pf.name || '').trim().charAt(0).toLocaleUpperCase(S.lang === 'tr' ? 'tr-TR' : 'en') || '')}</b></div>
          <div><h1>${t('profileTitle')}</h1><p class="muted">${t('profileSub')}</p></div>
        </header>
        <div class="card glass">
          <label class="pf-l" for="pf-name">${t('name')}</label>
          <input id="pf-name" class="field" type="text" maxlength="40" placeholder="${t('namePh')}" value="${esc(pf.name || '')}" autocomplete="given-name">
          ${group('skinType', false)}
          ${group('concerns', true)}
          ${group('hairType', false)}
          ${group('scalp', false)}
          ${!mk ? group('beard', false) : ''}
          ${mk ? group('skinTone', false, 'tones') : ''}
          ${mk ? group('undertone', false) : ''}
          ${mk ? group('makeupStyle', false) : ''}
          ${group('budget', false)}
          <div class="pf-g"><label class="pf-l" for="pf-notes">${t('notes')}</label><textarea id="pf-notes" class="field" rows="3" maxlength="400" placeholder="${t('notesPh')}">${esc(pf.notes || '')}</textarea></div>
          <p class="saved-note" id="saved-note" aria-live="polite"></p>
        </div>

        <h2 class="sec-t">${t('settings')}</h2>
        <div class="card glass settings">
          <div class="set-row"><span>${t('language')}</span><div class="mini-seg" data-set="lang"><button type="button" data-v="tr" class="${S.lang === 'tr' ? 'on' : ''}">Türkçe</button><button type="button" data-v="en" class="${S.lang === 'en' ? 'on' : ''}">English</button></div></div>
          <div class="set-row"><span>${t('appearance')}</span><div class="mini-seg" data-set="theme">${['system', 'light', 'dark'].map(k => `<button type="button" data-v="${k}" class="${S.settings.theme === k ? 'on' : ''}">${t('theme' + k[0].toUpperCase() + k.slice(1))}</button>`).join('')}</div></div>
          <div class="set-row col"><div class="set-sw"><span>${t('makeupContent')}</span><button type="button" class="switch ${mk ? 'on' : ''}" role="switch" aria-checked="${mk}" data-act="mode"><i></i></button></div><small class="muted">${t('makeupContentSub')}</small></div>
          <div class="set-row col"><div class="set-sw"><span>${t('aiTitle')}</span><span class="status ${ai ? 'on' : ''}">${ai ? t('aiOn') : t('aiOff')}</span></div><small class="muted">${t('aiSub')}</small>
            <input id="pf-key" class="field" type="password" autocomplete="off" spellcheck="false" placeholder="${t('aiKeyPh')}" value="${esc(S.settings.apiKey || '')}"></div>
          <div class="set-row col" id="install-row" hidden><button type="button" class="btn ghost wide" data-act="install">${ic('download')} ${t('install')}</button><small class="muted" id="install-hint"></small></div>
          <div class="set-row col"><button type="button" class="btn danger wide" data-act="reset">${ic('trash')} ${t('reset')}</button><div id="reset-confirm" hidden class="confirm"><p>${t('resetConfirm')}</p><div class="row"><button type="button" class="btn ghost" data-act="cancel">${t('cancel')}</button><button type="button" class="btn danger" data-act="wipe">${t('resetYes')}</button></div></div></div>
          <p class="muted small">${t('privacy')}</p>
        </div>
        <p class="ver muted small center">adorn · v2.0</p>
      </section>`;

    let nt = 0;
    const savedNote = () => { const n = $('#saved-note'); if (!n) return; n.textContent = t('saved'); n.classList.add('show'); clearTimeout(nt); nt = setTimeout(() => n.classList.remove('show'), 1400); };
    $('#pf-name').addEventListener('input', (e) => { pf.name = e.target.value; save(); const b = $('.avatar b'); if (b) b.textContent = pf.name.trim().charAt(0).toLocaleUpperCase(S.lang === 'tr' ? 'tr-TR' : 'en'); });
    $('#pf-name').addEventListener('change', savedNote);
    $('#pf-notes').addEventListener('input', (e) => { pf.notes = e.target.value; save(); });
    $('#pf-notes').addEventListener('change', savedNote);
    $$('[data-key]', v).forEach(g => $$('[data-v]', g).forEach(b => b.onclick = () => {
      const key = g.dataset.key, multi = g.dataset.multi === '1', id = b.dataset.v;
      buzz(5);
      if (multi) {
        const arr = pf[key] = pf[key] || []; const i = arr.indexOf(id);
        if (i >= 0) arr.splice(i, 1); else arr.push(id);
        b.classList.toggle('on', i < 0); b.setAttribute('aria-pressed', i < 0);
      } else {
        pf[key] = pf[key] === id ? null : id;
        $$('[data-v]', g).forEach(x => { const on = x.dataset.v === pf[key]; x.classList.toggle('on', on); x.setAttribute('aria-pressed', on); });
      }
      save(); savedNote();
    }));
    $$('[data-set]', v).forEach(g => $$('[data-v]', g).forEach(b => b.onclick = () => {
      const k = g.dataset.set, val = b.dataset.v;
      if (k === 'lang') { S.lang = I18N.lang = val; }
      if (k === 'theme') { S.settings.theme = val; }
      save(); applyTheme(); renderShell(); go('profile', true);
    }));
    $('[data-act=mode]', v).onclick = () => {
      S.mode = S.mode === 'makeup' ? 'care' : 'makeup';
      if (S.streak.series && !seriesList().some(s => s.id === S.streak.series)) S.streak.series = null;
      S.quizDone = true; save(); applyTheme(); renderShell(); go('profile', true); buzz();
    };
    $('#pf-key').addEventListener('change', (e) => { S.settings.apiKey = e.target.value.trim(); window.ADORN_KEY = S.settings.apiKey; save(); renderProfile(); });
    $('[data-act=reset]', v).onclick = () => { $('#reset-confirm').hidden = false; };
    $('[data-act=cancel]', v).onclick = () => { $('#reset-confirm').hidden = true; };
    $('[data-act=wipe]', v).onclick = () => { try { localStorage.removeItem(KEY); } catch (_) {} S = fresh(); I18N.lang = S.lang; window.ADORN_KEY = ''; tab = 'chat'; boot(); };
    setupInstall();
  }

  /* ---------- Kurulum ---------- */
  let deferred = null;
  window.addEventListener('beforeinstallprompt', (e) => { e.preventDefault(); deferred = e; setupInstall(); });
  function setupInstall() {
    const row = $('#install-row'); if (!row) return;
    const standalone = matchMedia('(display-mode: standalone)').matches || matchMedia('(display-mode: fullscreen)').matches || navigator.standalone;
    if (standalone) return;
    const ios = /iphone|ipad|ipod/i.test(navigator.userAgent);
    if (deferred || ios) {
      row.hidden = false;
      $('#install-hint').textContent = ios && !deferred ? t('installIOS') : '';
      $('[data-act=install]', row).onclick = async () => { if (deferred) { deferred.prompt(); await deferred.userChoice.catch(() => {}); deferred = null; row.hidden = true; } };
    }
  }

  /* ---------- Klavye / görünüm ---------- */
  if (window.visualViewport) {
    const vv = window.visualViewport;
    const onVV = () => {
      const kb = Math.max(0, window.innerHeight - vv.height - vv.offsetTop);
      document.documentElement.style.setProperty('--kb', kb + 'px');
      document.body.classList.toggle('kb-open', kb > 120);
    };
    vv.addEventListener('resize', onVV); vv.addEventListener('scroll', onVV);
  }
  document.addEventListener('visibilitychange', () => { if (!document.hidden) { ensureToday(); updateChip(); } });

  /* ---------- Servis çalışanı ---------- */
  if ('serviceWorker' in navigator && /^https?:$/.test(location.protocol) && !window.claude) {
    window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
  }

  boot();
})();
