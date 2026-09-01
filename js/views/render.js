/* ============================================================
   View — DOM helpers and all render/create functions.
   Reads state/DOGS directly; never mutates them. The one exception
   is animateCard(), which hands off to App.handleSwipeResult() once
   its animation finishes — App is the single controller this app has,
   so that's a direct call rather than an event/callback layer.
   ============================================================ */

/* ── DOM HELPERS ─────────────────────────────── */
function show(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}
function hide(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add('hidden');
}
function toggleHidden(id, shouldHide) {
  const el = document.getElementById(id);
  if (el) el.classList.toggle('hidden', shouldHide);
}
function val(id) {
  const el = document.getElementById(id);
  return el ? el.value : '';
}
function setVal(id, v) {
  const el = document.getElementById(id);
  if (el) el.value = v;
}
function setHtml(id, v) {
  const el = document.getElementById(id);
  if (el) el.textContent = v;
}
function setBadge(id, count) {
  const el = document.getElementById(id);
  if (!el) return;
  if (count > 0) { el.textContent = count; el.style.display = 'flex'; }
  else { el.style.display = 'none'; }
}
function truncate(str, n) {
  return str && str.length > n ? str.slice(0, n) + '…' : (str || '');
}
function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}
function formatTime(ts) {
  if (!ts) return '';
  const d = new Date(ts), now = new Date(), diff = now - d;
  if (diff < 60000)    return 'now';
  if (diff < 3600000)  return Math.floor(diff / 60000) + 'm';
  if (diff < 86400000) return Math.floor(diff / 3600000) + 'h';
  return d.toLocaleDateString([], { month:'short', day:'numeric' });
}

/* ── TOASTS ──────────────────────────────────── */
function showToast(msg, type = '') {
  const icons = { success:'✅', error:'❌', info:'ℹ️', gold:'⭐' };
  const box = document.getElementById('toast-box');
  const t = document.createElement('div');
  t.className = `toast ${type}`;
  t.innerHTML = `<span class="toast-ico">${icons[type] || '🐾'}</span><span>${msg}</span>`;
  box.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3200);
}

/* ── CONFETTI ────────────────────────────────── */
function spawnConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';
  const colors = ['#FD297B','#FF655B','#01E054','#00B4D8','#FFB800','#A020F0','#fff'];
  for (let i = 0; i < 30; i++) {
    const c = document.createElement('div');
    c.className = 'conf';
    c.style.cssText = `left:${Math.random()*100}%;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*0.6}s;animation-duration:${1.2+Math.random()*0.8}s;`;
    container.appendChild(c);
  }
}

/* ── SWIPE CARDS ─────────────────────────────── */
function createCard(dog) {
  const card = document.createElement('div');
  card.className = 'dog-card';
  card.dataset.id = dog.id;
  const tags = dog.personality.slice(0, 3).map(t => `<span class="card-tag">${t}</span>`).join('');
  const premBadge = dog.isPremium ? `<span class="card-premium"><i class="fa-solid fa-crown"></i> Premium</span>` : '';
  card.innerHTML = `
    <img class="card-img" src="${dog.img}" alt="${dog.name}" loading="lazy">
    <div class="card-grad"></div>
    <button class="card-info-btn" onclick="App.showCardInfo('${dog.id}',event)" title="More info">
      <i class="fa-solid fa-circle-info"></i>
    </button>
    <div class="stamp stamp-like">LIKE</div>
    <div class="stamp stamp-nope">NOPE</div>
    <div class="stamp stamp-super">SUPER</div>
    <div class="card-info">
      <div class="card-name-row">
        <span class="card-name">${dog.name}</span>
        <span class="card-age">${dog.age}</span>
        ${premBadge}
      </div>
      <div class="card-meta">
        <i class="fa-solid fa-location-dot"></i>
        <span>${dog.distance} km away</span>
        <span>·</span>
        <span>${dog.breed}</span>
      </div>
      <div class="card-tags">${tags}</div>
    </div>
  `;
  return card;
}

function renderCards() {
  const stack = document.getElementById('card-stack');
  stack.innerHTML = '';
  if (state.pool.length === 0) {
    stack.innerHTML = `<div class="no-more"><div class="nm-emoji">🐾</div><h3>That's everyone nearby!</h3><p>Adjust your filters or check back later for new dogs.</p><button class="btn-full" onclick="App.resetFilters();App.applyFilters()" style="max-width:240px">Clear Filters</button></div>`;
    return;
  }
  const visible = state.pool.slice(0, Math.min(state.pool.length, 4));
  [...visible].reverse().forEach(dog => {
    const card = createCard(dog);
    stack.appendChild(card);
  });
  const topCard = stack.lastElementChild;
  if (topCard && topCard.classList.contains('dog-card')) {
    initDrag(topCard);
  }
}

function initDrag(card) {
  let isDragging = false, startX = 0, startY = 0, currentX = 0, currentY = 0;
  const stampLike  = card.querySelector('.stamp-like');
  const stampNope  = card.querySelector('.stamp-nope');
  const stampSuper = card.querySelector('.stamp-super');

  const onStart = (e) => {
    if (e.target.classList.contains('card-info-btn') || e.target.closest('.card-info-btn')) return;
    isDragging = true;
    startX = e.clientX ?? e.touches?.[0].clientX;
    startY = e.clientY ?? e.touches?.[0].clientY;
    card.style.transition = 'none';
  };
  const onMove = (e) => {
    if (!isDragging) return;
    const cx = (e.clientX ?? e.touches?.[0].clientX) - startX;
    const cy = (e.clientY ?? e.touches?.[0].clientY) - startY;
    currentX = cx; currentY = cy;
    const rot = cx * 0.06;
    card.style.transform = `translateX(${cx}px) translateY(${cy}px) rotate(${rot}deg)`;
    const superT = cy < -60;
    stampLike.style.opacity  = superT ? 0 : Math.min(1, (cx - 30) / 80);
    stampNope.style.opacity  = superT ? 0 : Math.min(1, (-cx - 30) / 80);
    stampSuper.style.opacity = Math.min(1, (-cy - 40) / 80);
  };
  const onEnd = () => {
    if (!isDragging) return;
    isDragging = false;
    card.style.transition = 'transform .35s cubic-bezier(.4,0,.2,1)';
    stampLike.style.opacity  = 0;
    stampNope.style.opacity  = 0;
    stampSuper.style.opacity = 0;

    if (currentY < -100)     animateCard(card, 0);
    else if (currentX > 100) animateCard(card, 1);
    else if (currentX < -100) animateCard(card, -1);
    else {
      card.style.transform = 'translateX(0) translateY(0) rotate(0)';
      currentX = 0; currentY = 0;
    }
  };

  card.addEventListener('pointerdown', onStart, { passive: true });
  document.addEventListener('pointermove', onMove, { passive: true });
  document.addEventListener('pointerup', onEnd);
  card._cleanup = () => document.removeEventListener('pointermove', onMove);
}

function animateCard(card, dir) {
  const isSuper = dir === 0;
  const tx  = isSuper ? 0 : (dir > 0 ? 1100 : -1100);
  const ty  = isSuper ? -900 : 0;
  const rot = isSuper ? 0 : (dir > 0 ? 30 : -30);
  card.style.transition = 'transform .45s cubic-bezier(.4,0,.2,1), opacity .35s';
  card.style.transform  = `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`;
  card.style.opacity    = '0';
  const dogId = card.dataset.id;
  if (card._cleanup) card._cleanup();
  setTimeout(() => { card.remove(); App.handleSwipeResult(dogId, dir); }, 450);
}

/* ── RIGHT PANEL (Matches / Messages) ─────────── */
function renderRightPanel(view) {
  hide('rp-matches'); hide('rp-messages'); hide('rp-chat'); hide('rp-empty');

  if (view === 'matches') {
    show('rp-matches');
    renderMatchesList();
  } else if (view === 'messages') {
    show('rp-messages');
    renderMessagesList();
  } else if (view === 'chat') {
    show('rp-chat');
  } else {
    if (state.matches.length === 0) show('rp-empty');
    else { show('rp-matches'); renderMatchesList(); }
  }
}

function renderMatchesList() {
  const row = document.getElementById('new-matches-row');
  if (row) {
    row.innerHTML = state.matches.length === 0
      ? '<p style="color:var(--g2);font-size:13px;padding:0 4px">No matches yet — keep swiping!</p>'
      : state.matches.slice(0, 8).map(m => {
          const dog = DOGS.find(d => d.id === m.dogId);
          if (!dog) return '';
          return `<div class="nm-bubble" onclick="App.openChat('${m.id}')">
            <div class="nm-ring"><img src="${dog.img}" alt="${dog.name}"><div class="nm-dot"></div></div>
            <span class="nm-name">${dog.name}</span>
          </div>`;
        }).join('');
  }

  const list    = document.getElementById('all-matches-list');
  const countEl = document.getElementById('rp-match-count');
  if (countEl) countEl.textContent = `${state.matches.length} match${state.matches.length !== 1 ? 'es' : ''}`;

  if (!list) return;
  if (state.matches.length === 0) {
    list.innerHTML = `<div class="matches-empty"><div class="me-emoji">💔</div><h3>No matches yet</h3><p>Start swiping to find your dog's perfect match!</p></div>`;
    return;
  }
  list.innerHTML = state.matches.map(m => {
    const dog  = DOGS.find(d => d.id === m.dogId);
    if (!dog) return '';
    const msgs = state.messages[m.id] || [];
    const last = msgs[msgs.length - 1];
    const preview = last ? (last.role === 'sent' ? 'You: ' + last.text : last.text) : 'Say hello! 👋';
    const time    = last ? formatTime(last.ts) : formatTime(m.timestamp);
    return `<div class="match-row" onclick="App.openChat('${m.id}')">
      <img class="mr-avatar" src="${dog.img}" alt="${dog.name}">
      <div class="mr-info">
        <div class="mr-name">${dog.name}</div>
        <div class="mr-preview">${truncate(preview, 36)}</div>
      </div>
      <div class="mr-right">
        <span class="mr-time">${time}</span>
        ${m.hasUnread ? '<div class="mr-unread"></div>' : ''}
      </div>
    </div>`;
  }).join('');
}

function renderMessagesList() {
  const list = document.getElementById('msg-list');
  if (!list) return;
  if (state.matches.length === 0) {
    list.innerHTML = `<div class="matches-empty"><div class="me-emoji">💬</div><h3>No messages yet</h3><p>Match with dogs to start chatting!</p></div>`;
    return;
  }
  const withMsgs = state.matches.filter(m => (state.messages[m.id] || []).length > 0);
  if (withMsgs.length === 0) {
    list.innerHTML = `<div class="matches-empty"><div class="me-emoji">💬</div><h3>No messages yet</h3><p>Say hi to your matches!</p></div>`;
    return;
  }
  list.innerHTML = withMsgs.map(m => {
    const dog  = DOGS.find(d => d.id === m.dogId);
    if (!dog) return '';
    const msgs = state.messages[m.id] || [];
    const last = msgs[msgs.length - 1];
    const preview = last ? (last.role === 'sent' ? 'You: ' + last.text : last.text) : 'No messages yet';
    return `<div class="match-row" onclick="App.openChat('${m.id}')">
      <img class="mr-avatar" src="${dog.img}" alt="${dog.name}">
      <div class="mr-info">
        <div class="mr-name">${dog.name}</div>
        <div class="mr-preview">${truncate(preview, 34)}</div>
      </div>
      <div class="mr-right">
        <span class="mr-time">${formatTime(last?.ts || m.timestamp)}</span>
        ${m.hasUnread ? '<div class="mr-unread"></div>' : ''}
      </div>
    </div>`;
  }).join('');
}

/* ── CHAT ────────────────────────────────────── */
function renderChatMessages(containerId, matchId) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const msgs = state.messages[matchId] || [];
  container.innerHTML = msgs.map(msg => {
    const isSent = msg.role === 'sent';
    return `<div class="msg ${isSent ? 'sent' : 'received'}">${escapeHtml(msg.text)}</div>`;
  }).join('');
  container.scrollTop = container.scrollHeight;
}

function showTyping(containerId) {
  const container = document.getElementById(containerId);
  if (!container || container.querySelector('.typing')) return;
  const el = document.createElement('div');
  el.className = 'msg received typing';
  el.innerHTML = '<span></span><span></span><span></span>';
  container.appendChild(el);
  container.scrollTop = container.scrollHeight;
}

function hideTyping(containerId) {
  document.getElementById(containerId)?.querySelector('.typing')?.remove();
}

/* ── PROFILE ─────────────────────────────────── */
function renderProfile() {
  const p = state.profile;
  if (!p) return;
  const photoEl = document.getElementById('pv-photo');
  if (photoEl) photoEl.src = p.photo || '';
  setHtml('pv-name', p.name || 'Your Dog');
  setHtml('pv-meta', `${p.breed || ''}${p.breed && p.age ? ' · ' : ''}${p.age ? p.age + ' years' : ''}${p.size ? ' · ' + p.size : ''}`);
  setHtml('pv-bio', p.bio || '');
  const tagsEl = document.getElementById('pv-tags');
  if (tagsEl) tagsEl.innerHTML = (p.personality || []).map(t => `<span class="pv-tag">${t}</span>`).join('');
  setHtml('pvs-matches', state.matches.length);
  setHtml('pvs-likes', state.likesGiven);
  setHtml('pvs-supers', state.superGiven);
  if (p.isPremium) show('pv-premium-badge'); else hide('pv-premium-badge');
}

/* ── NOTIFICATIONS ───────────────────────────── */
function renderNotifPanel() {
  const list = document.getElementById('notif-list');
  if (!list) return;
  if (state.notifs.length === 0) {
    list.innerHTML = '<div class="notif-empty">No notifications yet 🐾</div>';
    return;
  }
  list.innerHTML = state.notifs.slice(0, 12).map(n => `
    <div class="notif-item">
      <span class="notif-ico">🐾</span>
      <div><div class="notif-txt">${n.text}</div><div class="notif-tm">${formatTime(n.ts)}</div></div>
    </div>
  `).join('');
}

/* ── BADGES & COUNTERS ───────────────────────── */
function updateBadges() {
  const unreadMatches = state.matches.filter(m => m.hasUnread).length;
  const unreadMsgs    = state.matches.filter(m => {
    const msgs = state.messages[m.id] || [];
    return msgs.some(msg => msg.role === 'received' && m.hasUnread);
  }).length;

  setBadge('sb-matches-badge', unreadMatches);
  setBadge('sb-chat-badge',    unreadMsgs);
  setBadge('mn-matches-badge', unreadMatches);
  setBadge('mn-chat-badge',    unreadMsgs);

  if (unreadMatches > 0) show('mob-notif-dot');

  setHtml('pvs-matches', state.matches.length);
  setHtml('pvs-likes',   state.likesGiven);
  setHtml('pvs-supers',  state.superGiven);
}

function updateSuperLeftDisplay() {
  setHtml('super-left', state.superLeft);
}

/* ── RESPONSIVE LAYOUT ───────────────────────── */
function renderMobileView(view) {
  if (view === 'matches' || view === 'messages') {
    const rp = document.getElementById('right-panel');
    rp.style.display   = 'flex';
    rp.style.position  = 'fixed';
    rp.style.inset     = '0';
    rp.style.zIndex    = '50';
    rp.style.width     = '100%';
    rp.style.height    = '100dvh';
    rp.style.borderLeft = 'none';
    renderRightPanel(view);
  } else {
    const rp = document.getElementById('right-panel');
    rp.style.display   = '';
    rp.style.position  = '';
    rp.style.inset     = '';
    rp.style.zIndex    = '';
    rp.style.width     = '';
    rp.style.height    = '';
    rp.style.borderLeft = '';
  }
}
