/* ============================================================
   Controller — App
   Responds to UI events, mutates the Model (state/session), and
   tells the View to re-render. Exposed as `App` because index.html's
   onclick handlers call it by name.
   ============================================================ */
const App = {

  /* ── Landing Nav ───────────────────────────── */
  toggleLandNav() {
    document.getElementById('l-mobile-menu').classList.toggle('hidden');
  },

  /* ── Sign Out ──────────────────────────────── */
  signOut() {
    state.user = null;
    state.profile = null;
    clearSession(); // fixes: previous session's matches/chats/notifs no longer survive sign-out
    hide('app');
    show('landing');
    showToast('Signed out successfully', 'success');
    setTimeout(() => { window.scrollTo(0, 0); }, 100);
  },

  /* ── Enter App ─────────────────────────────── */
  enterApp() {
    if (!state.profile) {
      this.startOnboarding();
      return;
    }
    hide('landing');
    show('app');
    buildPool();
    renderCards();
    renderRightPanel('matches');
    renderProfile();
    updateBadges();
    updateSuperLeftDisplay();
    const notifCount = state.notifs.filter(n => !n.read).length;
    if (notifCount > 0) {
      show('mob-notif-dot');
      setHtml('sb-notif-badge', notifCount);
      show('sb-notif-badge');
    }
  },

  /* ══════════════════════════════════════════════
     ONBOARDING
  ══════════════════════════════════════════════ */
  startOnboarding() {
    this.initTagPicker();
    show('modal-onboard');
    this.goObStep(0);
  },

  goObStep(n) {
    const progBar = document.getElementById('ob-prog');
    if (progBar) {
      progBar.style.visibility = n === 0 ? 'hidden' : 'visible';
    }
    [0, 1, 2, 3, 4].forEach(i => {
      const el = document.getElementById(`ob-s${i}`);
      if (el) el.classList.toggle('hidden', i !== n);
      if (i >= 1) {
        const bar = document.getElementById(`ob-b${i}`);
        if (bar) bar.classList.toggle('active', i <= n);
      }
    });
  },

  obNext(step) {
    if (step === 1) {
      const name  = val('od-name').trim();
      const breed = val('od-breed');
      const age   = val('od-age');
      const size  = val('od-size');
      if (!name || !breed || !age || !size) return showToast('Please fill in all fields', 'error');
      state._obData = { name, breed, age: parseInt(age), size };
      this.goObStep(2);
    } else if (step === 2) {
      const bio   = val('od-bio').trim();
      const imgEl = document.getElementById('od-photo-prev');
      const photo = imgEl && imgEl.style.display !== 'none' ? imgEl.src
        : `https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80`;
      state._obData = { ...state._obData, bio, photo };
      this.goObStep(3);
    } else if (step === 3) {
      const selected = [...document.querySelectorAll('.ptag.sel')].map(t => t.dataset.tag);
      state._obData = { ...state._obData, personality: selected };
      this.goObStep(4);
    }
  },

  initTagPicker() {
    const grid = document.getElementById('tag-picker');
    if (!grid) return;
    grid.innerHTML = '';
    PERSONALITY_TAGS.forEach(tag => {
      const btn = document.createElement('button');
      btn.className = 'ptag';
      btn.textContent = tag;
      btn.dataset.tag = tag;
      btn.onclick = () => {
        const sels = document.querySelectorAll('.ptag.sel');
        if (!btn.classList.contains('sel') && sels.length >= 5) {
          return showToast('Pick up to 5 tags', 'info');
        }
        btn.classList.toggle('sel');
      };
      grid.appendChild(btn);
    });
  },

  handleFile(e, previewId, placeholderId) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const img = document.getElementById(previewId);
      img.src = ev.target.result;
      img.style.display = 'block';
      if (placeholderId) hide(placeholderId);
    };
    reader.readAsDataURL(file);
  },

  previewURL(url, previewId, placeholderId) {
    if (!url) return;
    const img = document.getElementById(previewId);
    img.src = url;
    img.style.display = 'block';
    if (placeholderId) hide(placeholderId);
    img.onerror = () => { img.style.display = 'none'; if (placeholderId) show(placeholderId); };
  },

  requestLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        pos => {
          state._obData = { ...state._obData, lat: pos.coords.latitude, lng: pos.coords.longitude };
          this.finishOnboarding();
        },
        () => this.finishOnboarding()
      );
    } else {
      this.finishOnboarding();
    }
  },

  skipLocation() { this.finishOnboarding(); },

  finishOnboarding() {
    state.profile = {
      ...(state._obData || {}),
      photo: state._obData?.photo || 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
      personality: state._obData?.personality || [],
    };
    delete state._obData;
    save();
    hide('modal-onboard');
    hide('landing');
    show('app');
    buildPool();
    renderCards();
    renderRightPanel('matches');
    renderProfile();
    updateBadges();
    updateSuperLeftDisplay();
    showToast(`Welcome to TinDog, ${state.profile.name}! 🐾`, 'success');
    setTimeout(() => this.addNotif('🎉 Your profile is live! Start swiping to find matches.'), 2000);
  },

  /* ══════════════════════════════════════════════
     SWIPING
  ══════════════════════════════════════════════ */
  handleSwipeResult(dogId, dir) {
    const dog = DOGS.find(d => d.id === dogId);
    if (!dog) return;

    if (dir === -1) {
      state.passedIds.push(dogId);
      state.pool = state.pool.filter(d => d.id !== dogId);
    } else {
      state.likesGiven++;
      if (dir === 0) {
        state.superGiven++;
        state.superLeft = Math.max(0, state.superLeft - 1);
        updateSuperLeftDisplay();
        showToast(`⭐ Super Liked ${dog.name}!`, 'gold');
        this.addNotif(`⭐ You super liked ${dog.name}!`);
      }
      state.pool = state.pool.filter(d => d.id !== dogId);
      const matchChance = dir === 0 ? 0.75 : 0.38;
      if (Math.random() < matchChance) {
        setTimeout(() => this.handleMatch(dog), 400);
        return;
      }
      // fixes: liked-but-unmatched dogs must not resurface when the pool is rebuilt
      state.passedIds.push(dogId);
    }
    save();
    renderCards();
    updateSuperLeftDisplay();
  },

  handleMatch(dog) {
    state.matchIds.push(dog.id);
    state.pool = state.pool.filter(d => d.id !== dog.id);
    const match = { id: 'm_' + dog.id, dogId: dog.id, timestamp: Date.now(), hasUnread: true };
    state.matches.unshift(match);
    if (!state.messages[match.id]) {
      state.messages[match.id] = [{
        id: 'sys1', role: 'received', text: OPENING_MSGS[dog.id] || `Woof! I matched with you! 🐾`, ts: Date.now()
      }];
    }
    state.notifs.unshift({ id: 'n_' + Date.now(), text: `❤️ You matched with ${dog.name}!`, ts: Date.now(), read: false });
    save();
    renderCards();
    renderRightPanel(state.currentView === 'messages' ? 'messages' : 'matches');
    updateBadges();
    const myPhoto = state.profile?.photo || '';
    document.getElementById('match-my-img').src  = myPhoto;
    document.getElementById('match-their-img').src = dog.img;
    document.getElementById('match-dog-nm').textContent = dog.name;
    state.currentMatchId = match.id;
    spawnConfetti();
    show('modal-match');
  },

  closeMatch() { hide('modal-match'); renderCards(); },

  openMatchChat() {
    hide('modal-match');
    if (state.currentMatchId) this.openChat(state.currentMatchId);
  },

  swipeCard(dir) {
    if (dir === 0 && state.superLeft <= 0) {
      return showToast('No super likes left today! Upgrade for unlimited 🌟', 'gold');
    }
    const stack = document.getElementById('card-stack');
    const top = stack.lastElementChild;
    if (!top || !top.classList.contains('dog-card')) return;
    animateCard(top, dir);
  },

  rewind() {
    if (!state.profile?.isPremium) {
      return showToast('⬅️ Rewind is a Premium feature!', 'gold');
    }
    const last = state.passedIds.pop();
    if (!last) return showToast('Nothing to rewind!', 'info');
    const dog = DOGS.find(d => d.id === last);
    if (dog) { state.pool.unshift(dog); renderCards(); }
    save();
  },

  boost() {
    showToast('⚡ Boost active! Your profile is now 2× more visible for 30 min.', 'gold');
    this.addNotif('⚡ Profile boost activated!');
  },

  showCardInfo(dogId, e) {
    e.stopPropagation();
    const dog = DOGS.find(d => d.id === dogId);
    if (!dog) return;
    showToast(`${dog.name} · ${dog.breed} · ${dog.size} · Energy: ${dog.energy}`, 'info');
  },

  /* ══════════════════════════════════════════════
     NAVIGATION
  ══════════════════════════════════════════════ */
  navigate(view, btn) {
    state.currentView = view;
    document.querySelectorAll('.sb-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.mn-btn').forEach(b => b.classList.remove('active'));
    if (btn) {
      btn.classList.add('active');
      document.querySelectorAll(`[data-view="${view}"]`).forEach(b => b.classList.add('active'));
    }

    toggleHidden('av-discover', view !== 'discover');
    toggleHidden('av-profile',  view !== 'profile');

    if (state.isMobile()) {
      renderMobileView(view);
    } else {
      if (view === 'matches')  renderRightPanel('matches');
      else if (view === 'messages') renderRightPanel('messages');
      else if (view === 'discover') renderRightPanel('matches');
    }

    if (view === 'profile') renderProfile();
  },

  /* ══════════════════════════════════════════════
     CHAT
  ══════════════════════════════════════════════ */
  openChat(matchId) {
    const match = state.matches.find(m => m.id === matchId);
    if (!match) return;
    const dog = DOGS.find(d => d.id === match.dogId);
    if (!dog) return;

    match.hasUnread = false;
    state.currentChatId = matchId;
    save();
    updateBadges();

    if (state.isMobile()) {
      document.getElementById('mc-avatar').src = dog.img;
      document.getElementById('mc-name').textContent = dog.name;
      renderChatMessages('mob-chat-msgs', matchId);
      show('modal-mobile-chat');
    } else {
      document.getElementById('cp-avatar').src = dog.img;
      document.getElementById('cp-name').textContent = dog.name;
      renderRightPanel('chat');
      renderChatMessages('chat-msgs', matchId);
    }
  },

  sendMessage() {
    const input = document.getElementById('chat-input');
    this._doSend(input, 'chat-msgs');
  },

  sendMobileMessage() {
    const input = document.getElementById('mob-chat-input');
    this._doSend(input, 'mob-chat-msgs');
  },

  _doSend(input, containerId) {
    if (!input || !state.currentChatId) return;
    const text = input.value.trim();
    if (!text) return;
    input.value = '';

    const msg = { id: 'm' + Date.now(), role: 'sent', text, ts: Date.now() };
    if (!state.messages[state.currentChatId]) state.messages[state.currentChatId] = [];
    state.messages[state.currentChatId].push(msg);
    save();
    renderChatMessages(containerId, state.currentChatId);
    renderMatchesList();
    const delay = 1200 + Math.random() * 1800;
    setTimeout(() => this.autoReply(containerId), delay);
  },

  autoReply(containerId) {
    if (!state.currentChatId) return;
    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
    const msg = { id: 'r' + Date.now(), role: 'received', text: reply, ts: Date.now() };
    state.messages[state.currentChatId].push(msg);
    save();
    renderChatMessages(containerId, state.currentChatId);
    renderMatchesList();
  },

  closeChatPanel() {
    state.currentChatId = null;
    const view = state.currentView === 'messages' ? 'messages' : 'matches';
    renderRightPanel(view);
  },

  closeMobileChat() {
    hide('modal-mobile-chat');
    state.currentChatId = null;
  },

  /* ══════════════════════════════════════════════
     PROFILE
  ══════════════════════════════════════════════ */
  openProfileEdit() {
    const p = state.profile;
    if (!p) return;
    const prev = document.getElementById('ep-photo-prev');
    if (prev) { prev.src = p.photo || ''; }
    setVal('ep-name', p.name || '');
    setVal('ep-breed', p.breed || '');
    setVal('ep-age', p.age || '');
    setVal('ep-bio', p.bio || '');
    show('modal-profile-edit');
  },
  closeProfileEdit() { hide('modal-profile-edit'); },

  saveProfile() {
    const name = val('ep-name').trim();
    if (!name) return showToast('Dog name is required', 'error');
    const prev = document.getElementById('ep-photo-prev');
    state.profile = {
      ...state.profile,
      name,
      breed: val('ep-breed').trim(),
      age:   parseInt(val('ep-age')) || state.profile.age,
      bio:   val('ep-bio').trim(),
      photo: prev?.src || state.profile.photo,
    };
    save();
    hide('modal-profile-edit');
    renderProfile();
    showToast('Profile updated! 🐾', 'success');
  },

  upgradePremium() {
    showToast('👑 Premium unlocks unlimited likes, super likes, rewind & more!', 'gold');
    setTimeout(() => {
      state.profile.isPremium = true;
      save();
      renderProfile();
      show('pv-premium-badge');
      showToast('Welcome to Premium! 🎉', 'success');
    }, 800);
  },

  /* ══════════════════════════════════════════════
     FILTERS
  ══════════════════════════════════════════════ */
  openFilters() {
    setVal('f-breed', state.filters.breed);
    document.getElementById('f-age-min').value  = state.filters.ageMin;
    document.getElementById('f-age-max').value  = state.filters.ageMax;
    document.getElementById('f-distance').value = state.filters.distance;
    this.updateAge();
    this.updateDist();
    this.syncChips('f-size', state.filters.size);
    this.syncChips('f-energy', state.filters.energy);
    show('modal-filters');
  },
  closeFilters() { hide('modal-filters'); },

  syncChips(rowId, activeVal) {
    const row = document.getElementById(rowId);
    if (!row) return;
    row.querySelectorAll('.chip').forEach(c => {
      c.classList.toggle('active', c.dataset.v === activeVal);
    });
  },

  updateAge() {
    const min = parseInt(document.getElementById('f-age-min').value);
    const max = parseInt(document.getElementById('f-age-max').value);
    setHtml('f-age-lbl', `${Math.min(min,max)}–${Math.max(min,max)} yrs`);
  },
  updateDist() {
    setHtml('f-dist-lbl', document.getElementById('f-distance').value + ' km');
  },

  applyFilters() {
    state.filters.breed    = val('f-breed');
    const amin = parseInt(document.getElementById('f-age-min').value);
    const amax = parseInt(document.getElementById('f-age-max').value);
    state.filters.ageMin   = Math.min(amin, amax);
    state.filters.ageMax   = Math.max(amin, amax);
    state.filters.distance = parseInt(document.getElementById('f-distance').value);
    state.filters.size     = document.querySelector('#f-size .chip.active')?.dataset.v || '';
    state.filters.energy   = document.querySelector('#f-energy .chip.active')?.dataset.v || '';
    save();
    buildPool();
    renderCards();
    hide('modal-filters');
    showToast('Filters applied!', 'success');
  },

  resetFilters() {
    state.filters = { breed:'', size:'', ageMin:0, ageMax:15, distance:25, energy:'' };
    this.syncChips('f-size', '');
    this.syncChips('f-energy', '');
    setVal('f-breed', '');
    document.getElementById('f-age-min').value  = 0;
    document.getElementById('f-age-max').value  = 15;
    document.getElementById('f-distance').value = 25;
    this.updateAge();
    this.updateDist();
  },

  initChipRows() {
    document.querySelectorAll('.chip-row').forEach(row => {
      row.querySelectorAll('.chip').forEach(chip => {
        chip.addEventListener('click', () => {
          row.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
          chip.classList.add('active');
        });
      });
    });
  },

  /* ══════════════════════════════════════════════
     NOTIFICATIONS
  ══════════════════════════════════════════════ */
  addNotif(text) {
    state.notifs.unshift({ id: 'n' + Date.now(), text, ts: Date.now(), read: false });
    if (state.notifs.length > 30) state.notifs = state.notifs.slice(0, 30);
    save();
    const count = state.notifs.filter(n => !n.read).length;
    setBadge('sb-notif-badge', count);
    if (count > 0) show('mob-notif-dot');
  },

  toggleNotifPanel() {
    const panel = document.getElementById('notif-panel');
    if (panel.classList.contains('hidden')) {
      renderNotifPanel();
      show('notif-panel');
      state.notifs.forEach(n => n.read = true);
      save();
      hide('mob-notif-dot');
      setBadge('sb-notif-badge', 0);
    } else {
      hide('notif-panel');
    }
  },

  clearNotifs() {
    state.notifs = [];
    save();
    renderNotifPanel();
  },
};

/* ── INIT ────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  load();

  // Close overlays on outside click (not for onboarding)
  document.querySelectorAll('.overlay').forEach(overlay => {
    overlay.addEventListener('click', e => {
      if (e.target === overlay && overlay.id !== 'modal-onboard') {
        overlay.classList.add('hidden');
        state.currentChatId = null;
      }
    });
  });

  // Chip rows
  App.initChipRows();

  // Close notif panel on outside click
  document.addEventListener('click', e => {
    const panel = document.getElementById('notif-panel');
    const btn1  = document.getElementById('notif-sb-btn');
    const btn2  = document.getElementById('mob-notif-btn');
    if (!panel?.contains(e.target) && e.target !== btn1 && e.target !== btn2
        && !btn1?.contains(e.target) && !btn2?.contains(e.target)) {
      panel?.classList.add('hidden');
    }
  });

  // Close mobile landing menu on scroll
  window.addEventListener('scroll', () => {
    document.getElementById('l-mobile-menu')?.classList.add('hidden');
  }, { passive: true });

  // Resize: reset mobile panel overrides
  window.addEventListener('resize', () => {
    if (!document.getElementById('app').classList.contains('hidden')) {
      const rp = document.getElementById('right-panel');
      if (!state.isMobile()) { rp.style.cssText = ''; }
    }
  });

  // ─── ROUTING ON LOAD ─────────────────────────
  if (state.user && state.profile) {
    hide('landing');
    App.enterApp();
  } else if (state.user && !state.profile) {
    App.startOnboarding();
  }
  // else: no user → show landing (default state)
});
