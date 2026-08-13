/* ============================================================
   TinDog — Complete SPA Logic
   Auth · Cards · Matches · Chat · Filters · Notifications
   ============================================================ */

/* ── MOCK DOG DATA ───────────────────────────── */
const DOGS = [
  { id:'d1', name:'Rex', age:3, breed:'German Shepherd', size:'Large', energy:'High', personality:['Loyal','Playful','Protective','Alert'], bio:'Love long runs in the park and cuddles after 🐾 Looking for an adventure buddy!', distance:1.2, img:'https://images.unsplash.com/photo-1589965716319-4a041b58fa8a?w=600&q=80', isPremium:false },
  { id:'d2', name:'Bella', age:2, breed:'Golden Retriever', size:'Large', energy:'High', personality:['Friendly','Gentle','Playful','Sweet'], bio:'Beach lover 🌊 Tennis ball enthusiast. Certified good girl seeking a fun companion!', distance:0.8, img:'https://images.unsplash.com/photo-1552053831-71594a27632d?w=600&q=80', isPremium:true },
  { id:'d3', name:'Max', age:4, breed:'Husky', size:'Large', energy:'High', personality:['Adventurous','Vocal','Independent','Wild'], bio:'Looking for a hiking partner and someone to howl at the moon with 🌙✨', distance:2.1, img:'https://images.unsplash.com/photo-1605568420105-ce2a31c73301?w=600&q=80', isPremium:false },
  { id:'d4', name:'Pebbles', age:1, breed:'Corgi', size:'Small', energy:'High', personality:['Sassy','Smart','Cuddly','Stubborn'], bio:'Small but mighty. Will steal your socks AND your heart 🧦❤️', distance:0.5, img:'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&q=80', isPremium:false },
  { id:'d5', name:'Luna', age:3, breed:'Border Collie', size:'Medium', energy:'High', personality:['Intelligent','Energetic','Loyal','Focused'], bio:'Champion frisbee catcher 🥏 Looking for a dog who can keep up!', distance:3.4, img:'https://images.unsplash.com/photo-1518717758536-85ae29035b6d?w=600&q=80', isPremium:true },
  { id:'d6', name:'Charlie', age:5, breed:'Beagle', size:'Small', energy:'Medium', personality:['Curious','Friendly','Sniffing Expert','Gentle'], bio:'Nose-first into every adventure 🐽 Amateur food critic, expert cuddler.', distance:1.8, img:'https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=600&q=80', isPremium:false },
  { id:'d7', name:'Mochi', age:2, breed:'Shih Tzu', size:'Small', energy:'Low', personality:['Calm','Regal','Affectionate','Fluffy'], bio:'Professional lap warmer and Netflix partner 📺 Very much into slow walks and treats.', distance:0.9, img:'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&q=80', isPremium:false },
  { id:'d8', name:'Duke', age:6, breed:'Labrador Retriever', size:'Large', energy:'Medium', personality:['Gentle','Reliable','Fun','Experienced'], bio:'Experienced good boy 🏅 Expert stick fetcher, excellent swimmer. Looking for a calm companion.', distance:4.2, img:'https://images.unsplash.com/photo-1591160690555-5debfba289f0?w=600&q=80', isPremium:false },
  { id:'d9', name:'Nala', age:2, breed:'French Bulldog', size:'Small', energy:'Low', personality:['Lazy','Lovable','Snorty','Chill'], bio:'Certified couch potato 🛋️ Will only run for treats. Snoring is a love language.', distance:1.1, img:'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80', isPremium:true },
  { id:'d10', name:'Ace', age:4, breed:'Dalmatian', size:'Large', energy:'High', personality:['Bold','Playful','Athletic','Spotted'], bio:'Born to run 🏃 Looking for a partner in crime for zoomies and adventures!', distance:5.6, img:'https://images.unsplash.com/photo-1601758003122-53c40e686a19?w=600&q=80', isPremium:false },
  { id:'d11', name:'Coco', age:3, breed:'Poodle', size:'Medium', energy:'Medium', personality:['Smart','Elegant','Playful','Creative'], bio:'Brains AND beauty ✂️ Can learn any trick in 10 minutes. Seeking intellectual equals.', distance:2.7, img:'https://images.unsplash.com/photo-1575425186775-b8de9a427e67?w=600&q=80', isPremium:false },
  { id:'d12', name:'Thor', age:5, breed:'German Shepherd', size:'Large', energy:'High', personality:['Brave','Loyal','Disciplined','Noble'], bio:'Ex-police dog, now retired 🦸 Expert at fetch and protecting those I love.', distance:3.9, img:'https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80', isPremium:false },
];

const PERSONALITY_TAGS = ['Playful','Cuddly','Adventurous','Calm','Energetic','Loyal','Friendly','Independent','Protective','Gentle','Stubborn','Smart','Vocal','Snuggly','Foodie','Athletic','Lazy','Curious','Brave','Silly'];

const OPENING_MSGS = {
  d1:'Woof! 🐾 I saw you liked my profile. Want to meet at the dog park this weekend?',
  d2:'Hi! ☀️ Your human seems really cool. Does yours like beach days too?',
  d3:'Hey there! 🐺 My human says I need more doggy friends. Yours seems fun!',
  d4:'Omg HI! 🐕 I literally ran over to the phone when my owner said I had a match!',
  d5:'Hey! 🥏 I heard you like to play. Think you can keep up with me? 😄',
  d6:'*sniff sniff* 👃 Hmm, you smell interesting! My nose says you\'re a good match.',
  d7:'Oh hi 😌 I was in the middle of my nap but... I suppose this is worth waking up for.',
  d8:'Hey! 🏅 Experience has taught me that great matches start with great conversations.',
  d9:'..........hi 🛋️ Sorry, was napping. Anyway. You seem nice. Want to nap together?',
  d10:'HELLO!! 🏃 OK sorry my owner had to take the phone away I was too excited!',
  d11:'Bonjour! 🎩 My owner says I have impeccable taste. I think they\'re right about you.',
  d12:'*sits* *stays* *good boy* 🦸 Hi. I\'m looking for something serious. Are you?',
};

const BOT_REPLIES = [
  'That sounds so fun! My tail is wagging just thinking about it! 🐾',
  'My owner just read this over my shoulder and said "aww" haha',
  'YES! We should definitely do that. The dog park on Main Street is my fave 🌳',
  'You had me at treats 🦴 When are we meeting?',
  'Woof! I literally just did a zoomie around the room when I read that!',
  'My human is being SO embarrassing, they are taking photos of me texting you 😅',
  'Okay but what\'s your stance on belly rubs? Asking for important reasons.',
  'I showed my owner your photo and they said your dog is gorgeous! 😍',
];

/* ── STATE ───────────────────────────────────── */
const state = {
  user: null,
  profile: null,
  dogs: [...DOGS],
  pool: [],
  passedIds: [],
  matchIds: [],
  matches: [],
  messages: {},
  filters: { breed:'', size:'', ageMin:0, ageMax:15, distance:25, energy:'' },
  superLeft: 3,
  likesGiven: 0,
  superGiven: 0,
  currentChatId: null,
  notifs: [],
  lastCard: null,
  currentView: 'discover',
  isMobile: () => window.innerWidth < 1024,
};

/* ── STORAGE ─────────────────────────────────── */
function save() {
  localStorage.setItem('td_user', JSON.stringify(state.user));
  localStorage.setItem('td_profile', JSON.stringify(state.profile));
  localStorage.setItem('td_passed', JSON.stringify(state.passedIds));
  localStorage.setItem('td_matchIds', JSON.stringify(state.matchIds));
  localStorage.setItem('td_matches', JSON.stringify(state.matches));
  localStorage.setItem('td_messages', JSON.stringify(state.messages));
  localStorage.setItem('td_filters', JSON.stringify(state.filters));
  localStorage.setItem('td_stats', JSON.stringify({ likes:state.likesGiven, supers:state.superGiven, superLeft:state.superLeft }));
  localStorage.setItem('td_notifs', JSON.stringify(state.notifs));
}

function load() {
  try {
    state.user     = JSON.parse(localStorage.getItem('td_user'));
    state.profile  = JSON.parse(localStorage.getItem('td_profile'));
    state.passedIds = JSON.parse(localStorage.getItem('td_passed')) || [];
    state.matchIds  = JSON.parse(localStorage.getItem('td_matchIds')) || [];
    state.matches   = JSON.parse(localStorage.getItem('td_matches')) || [];
    state.messages  = JSON.parse(localStorage.getItem('td_messages')) || {};
    state.filters   = JSON.parse(localStorage.getItem('td_filters')) || state.filters;
    const st = JSON.parse(localStorage.getItem('td_stats')) || {};
    state.likesGiven = st.likes || 0;
    state.superGiven = st.supers || 0;
    state.superLeft  = st.superLeft ?? 3;
    state.notifs     = JSON.parse(localStorage.getItem('td_notifs')) || [];
  } catch(e) {}
}

/* ══════════════════════════════════════════════
   APP OBJECT
══════════════════════════════════════════════ */
const App = {

  /* ── Landing Nav ───────────────────────────── */
  toggleLandNav() {
    document.getElementById('l-mobile-menu').classList.toggle('hidden');
  },

  /* ── Sign Out ──────────────────────────────── */
  signOut() {
    state.user = null;
    state.profile = null;
    localStorage.removeItem('td_user');
    localStorage.removeItem('td_profile');
    hide('app');
    show('landing');
    this.showToast('Signed out successfully', 'success');
    setTimeout(() => { window.scrollTo(0, 0); }, 100);
  },

  /* ── Enter App ─────────────────────────────── */
  enterApp() {
    // Guard: if no profile, show onboarding instead
    if (!state.profile) {
      this.startOnboarding();
      return;
    }
    hide('landing');
    show('app');
    this.buildPool();
    this.renderCards();
    this.renderRightPanel('matches');
    this.renderProfile();
    this.updateBadges();
    this.updateSuperLeftDisplay();
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
    this.goObStep(0); // Always start at the welcome screen
  },

  goObStep(n) {
    // Show/hide progress bar (only for steps 1-4)
    const progBar = document.getElementById('ob-prog');
    if (progBar) {
      progBar.style.visibility = n === 0 ? 'hidden' : 'visible';
    }
    // Toggle steps
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
      if (!name || !breed || !age || !size) return this.showToast('Please fill in all fields', 'error');
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
          return this.showToast('Pick up to 5 tags', 'info');
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
    // Now enter the app properly
    hide('landing');
    show('app');
    this.buildPool();
    this.renderCards();
    this.renderRightPanel('matches');
    this.renderProfile();
    this.updateBadges();
    this.updateSuperLeftDisplay();
    this.showToast(`Welcome to TinDog, ${state.profile.name}! 🐾`, 'success');
    setTimeout(() => this.addNotif('🎉 Your profile is live! Start swiping to find matches.'), 2000);
  },

  /* ══════════════════════════════════════════════
     POOL & CARDS
  ══════════════════════════════════════════════ */
  buildPool() {
    const f = state.filters;
    state.pool = DOGS.filter(d => {
      if (state.matchIds.includes(d.id)) return false;
      if (state.passedIds.includes(d.id)) return false;
      if (f.breed && d.breed !== f.breed) return false;
      if (f.size && d.size !== f.size) return false;
      if (d.age < f.ageMin || d.age > f.ageMax) return false;
      if (d.distance > f.distance) return false;
      if (f.energy && d.energy !== f.energy) return false;
      return true;
    });
  },

  renderCards() {
    const stack = document.getElementById('card-stack');
    stack.innerHTML = '';
    if (state.pool.length === 0) {
      stack.innerHTML = `<div class="no-more"><div class="nm-emoji">🐾</div><h3>That's everyone nearby!</h3><p>Adjust your filters or check back later for new dogs.</p><button class="btn-full" onclick="App.resetFilters();App.applyFilters()" style="max-width:240px">Clear Filters</button></div>`;
      return;
    }
    const visible = state.pool.slice(0, Math.min(state.pool.length, 4));
    [...visible].reverse().forEach(dog => {
      const card = this.createCard(dog);
      stack.appendChild(card);
    });
    const topCard = stack.lastElementChild;
    if (topCard && topCard.classList.contains('dog-card')) {
      this.initDrag(topCard);
    }
  },

  createCard(dog) {
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
  },

  initDrag(card) {
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

      if (currentY < -100)     this.animateCard(card, 0);
      else if (currentX > 100) this.animateCard(card, 1);
      else if (currentX < -100) this.animateCard(card, -1);
      else {
        card.style.transform = 'translateX(0) translateY(0) rotate(0)';
        currentX = 0; currentY = 0;
      }
    };

    card.addEventListener('pointerdown', onStart, { passive: true });
    document.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerup', onEnd);
    card._cleanup = () => document.removeEventListener('pointermove', onMove);
  },

  animateCard(card, dir) {
    const isSuper = dir === 0;
    const tx  = isSuper ? 0 : (dir > 0 ? 1100 : -1100);
    const ty  = isSuper ? -900 : 0;
    const rot = isSuper ? 0 : (dir > 0 ? 30 : -30);
    card.style.transition = 'transform .45s cubic-bezier(.4,0,.2,1), opacity .35s';
    card.style.transform  = `translateX(${tx}px) translateY(${ty}px) rotate(${rot}deg)`;
    card.style.opacity    = '0';
    const dogId = card.dataset.id;
    if (card._cleanup) card._cleanup();
    setTimeout(() => { card.remove(); this.handleSwipeResult(dogId, dir); }, 450);
  },

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
        this.updateSuperLeftDisplay();
        this.showToast(`⭐ Super Liked ${dog.name}!`, 'gold');
        this.addNotif(`⭐ You super liked ${dog.name}!`);
      }
      state.pool = state.pool.filter(d => d.id !== dogId);
      const matchChance = dir === 0 ? 0.75 : 0.38;
      if (Math.random() < matchChance) {
        setTimeout(() => this.handleMatch(dog), 400);
        return;
      }
    }
    save();
    this.renderCards();
    this.updateSuperLeftDisplay();
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
    this.renderCards();
    this.renderRightPanel(state.currentView === 'messages' ? 'messages' : 'matches');
    this.updateBadges();
    const myPhoto = state.profile?.photo || '';
    document.getElementById('match-my-img').src  = myPhoto;
    document.getElementById('match-their-img').src = dog.img;
    document.getElementById('match-dog-nm').textContent = dog.name;
    state.currentMatchId = match.id;
    this.spawnConfetti();
    show('modal-match');
  },

  spawnConfetti() {
    const container = document.getElementById('confetti-container');
    container.innerHTML = '';
    const colors = ['#FD297B','#FF655B','#01E054','#00B4D8','#FFB800','#A020F0','#fff'];
    for (let i = 0; i < 30; i++) {
      const c = document.createElement('div');
      c.className = 'conf';
      c.style.cssText = `left:${Math.random()*100}%;width:${6+Math.random()*8}px;height:${6+Math.random()*8}px;background:${colors[Math.floor(Math.random()*colors.length)]};animation-delay:${Math.random()*0.6}s;animation-duration:${1.2+Math.random()*0.8}s;`;
      container.appendChild(c);
    }
  },

  closeMatch() { hide('modal-match'); this.renderCards(); },

  openMatchChat() {
    hide('modal-match');
    if (state.currentMatchId) this.openChat(state.currentMatchId);
  },

  /* ── Button-triggered swipes ──────────────── */
  swipeCard(dir) {
    if (dir === 0 && state.superLeft <= 0) {
      return this.showToast('No super likes left today! Upgrade for unlimited 🌟', 'gold');
    }
    const stack = document.getElementById('card-stack');
    const top = stack.lastElementChild;
    if (!top || !top.classList.contains('dog-card')) return;
    this.animateCard(top, dir);
  },

  rewind() {
    if (!state.profile?.isPremium) {
      return this.showToast('⬅️ Rewind is a Premium feature!', 'gold');
    }
    const last = state.passedIds.pop();
    if (!last) return this.showToast('Nothing to rewind!', 'info');
    const dog = DOGS.find(d => d.id === last);
    if (dog) { state.pool.unshift(dog); this.renderCards(); }
    save();
  },

  boost() {
    this.showToast('⚡ Boost active! Your profile is now 2× more visible for 30 min.', 'gold');
    this.addNotif('⚡ Profile boost activated!');
  },

  updateSuperLeftDisplay() {
    setHtml('super-left', state.superLeft);
  },

  showCardInfo(dogId, e) {
    e.stopPropagation();
    const dog = DOGS.find(d => d.id === dogId);
    if (!dog) return;
    this.showToast(`${dog.name} · ${dog.breed} · ${dog.size} · Energy: ${dog.energy}`, 'info');
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
      this.renderMobileView(view);
    } else {
      if (view === 'matches')  this.renderRightPanel('matches');
      else if (view === 'messages') this.renderRightPanel('messages');
      else if (view === 'discover') this.renderRightPanel('matches');
    }

    if (view === 'profile') this.renderProfile();
  },

  renderMobileView(view) {
    if (view === 'matches' || view === 'messages') {
      const rp = document.getElementById('right-panel');
      rp.style.display   = 'flex';
      rp.style.position  = 'fixed';
      rp.style.inset     = '0';
      rp.style.zIndex    = '50';
      rp.style.width     = '100%';
      rp.style.height    = '100dvh';
      rp.style.borderLeft = 'none';
      this.renderRightPanel(view);
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
  },

  /* ══════════════════════════════════════════════
     RIGHT PANEL
  ══════════════════════════════════════════════ */
  renderRightPanel(view) {
    hide('rp-matches'); hide('rp-messages'); hide('rp-chat'); hide('rp-empty');

    if (view === 'matches') {
      show('rp-matches');
      this.renderMatchesList();
    } else if (view === 'messages') {
      show('rp-messages');
      this.renderMessagesList();
    } else if (view === 'chat') {
      show('rp-chat');
    } else {
      if (state.matches.length === 0) show('rp-empty');
      else { show('rp-matches'); this.renderMatchesList(); }
    }
  },

  renderMatchesList() {
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
      const time    = last ? this.formatTime(last.ts) : this.formatTime(m.timestamp);
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
  },

  renderMessagesList() {
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
          <span class="mr-time">${this.formatTime(last?.ts || m.timestamp)}</span>
          ${m.hasUnread ? '<div class="mr-unread"></div>' : ''}
        </div>
      </div>`;
    }).join('');
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
    this.updateBadges();

    if (state.isMobile()) {
      document.getElementById('mc-avatar').src = dog.img;
      document.getElementById('mc-name').textContent = dog.name;
      this.renderChatMessages('mob-chat-msgs', matchId);
      show('modal-mobile-chat');
    } else {
      document.getElementById('cp-avatar').src = dog.img;
      document.getElementById('cp-name').textContent = dog.name;
      this.renderRightPanel('chat');
      this.renderChatMessages('chat-msgs', matchId);
    }
  },

  renderChatMessages(containerId, matchId) {
    const container = document.getElementById(containerId);
    if (!container) return;
    const msgs = state.messages[matchId] || [];
    container.innerHTML = msgs.map(msg => {
      const isSent = msg.role === 'sent';
      return `<div class="msg ${isSent ? 'sent' : 'received'}">${msg.text}</div>`;
    }).join('');
    container.scrollTop = container.scrollHeight;
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
    this.renderChatMessages(containerId, state.currentChatId);
    this.renderMatchesList();
    const delay = 1200 + Math.random() * 1800;
    setTimeout(() => this.autoReply(containerId), delay);
  },

  autoReply(containerId) {
    if (!state.currentChatId) return;
    const reply = BOT_REPLIES[Math.floor(Math.random() * BOT_REPLIES.length)];
    const msg = { id: 'r' + Date.now(), role: 'received', text: reply, ts: Date.now() };
    state.messages[state.currentChatId].push(msg);
    save();
    this.renderChatMessages(containerId, state.currentChatId);
    this.renderMatchesList();
  },

  closeChatPanel() {
    state.currentChatId = null;
    const view = state.currentView === 'messages' ? 'messages' : 'matches';
    this.renderRightPanel(view);
  },

  closeMobileChat() {
    hide('modal-mobile-chat');
    state.currentChatId = null;
  },

  /* ══════════════════════════════════════════════
     PROFILE
  ══════════════════════════════════════════════ */
  renderProfile() {
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
  },

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
    if (!name) return this.showToast('Dog name is required', 'error');
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
    this.renderProfile();
    this.showToast('Profile updated! 🐾', 'success');
  },

  upgradePremium() {
    this.showToast('👑 Premium unlocks unlimited likes, super likes, rewind & more!', 'gold');
    setTimeout(() => {
      state.profile.isPremium = true;
      save();
      this.renderProfile();
      show('pv-premium-badge');
      this.showToast('Welcome to Premium! 🎉', 'success');
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
    this.buildPool();
    this.renderCards();
    hide('modal-filters');
    this.showToast('Filters applied!', 'success');
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
     BADGES & COUNTERS
  ══════════════════════════════════════════════ */
  updateBadges() {
    const unreadMatches = state.matches.filter(m => m.hasUnread).length;
    const unreadMsgs    = state.matches.filter(m => {
      const msgs = state.messages[m.id] || [];
      return msgs.some(msg => msg.role === 'received' && m.hasUnread);
    }).length;

    setBadge('sb-matches-badge', unreadMatches);
    setBadge('sb-chat-badge',    unreadMsgs);
    setBadge('mn-matches-badge', unreadMatches);
    setBadge('mn-chat-badge',    unreadMsgs);

    const total = unreadMatches;
    if (total > 0) show('mob-notif-dot');

    setHtml('pvs-matches', state.matches.length);
    setHtml('pvs-likes',   state.likesGiven);
    setHtml('pvs-supers',  state.superGiven);
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
      this.renderNotifPanel();
      show('notif-panel');
      state.notifs.forEach(n => n.read = true);
      save();
      hide('mob-notif-dot');
      setBadge('sb-notif-badge', 0);
    } else {
      hide('notif-panel');
    }
  },

  renderNotifPanel() {
    const list = document.getElementById('notif-list');
    if (!list) return;
    if (state.notifs.length === 0) {
      list.innerHTML = '<div class="notif-empty">No notifications yet 🐾</div>';
      return;
    }
    list.innerHTML = state.notifs.slice(0, 12).map(n => `
      <div class="notif-item">
        <span class="notif-ico">🐾</span>
        <div><div class="notif-txt">${n.text}</div><div class="notif-tm">${this.formatTime(n.ts)}</div></div>
      </div>
    `).join('');
  },

  clearNotifs() {
    state.notifs = [];
    save();
    this.renderNotifPanel();
  },

  /* ══════════════════════════════════════════════
     TOASTS
  ══════════════════════════════════════════════ */
  showToast(msg, type = '') {
    const icons = { success:'✅', error:'❌', info:'ℹ️', gold:'⭐' };
    const box = document.getElementById('toast-box');
    const t = document.createElement('div');
    t.className = `toast ${type}`;
    t.innerHTML = `<span class="toast-ico">${icons[type] || '🐾'}</span><span>${msg}</span>`;
    box.appendChild(t);
    setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3200);
  },

  /* ══════════════════════════════════════════════
     UTILS
  ══════════════════════════════════════════════ */
  formatTime(ts) {
    if (!ts) return '';
    const d = new Date(ts), now = new Date(), diff = now - d;
    if (diff < 60000)    return 'now';
    if (diff < 3600000)  return Math.floor(diff / 60000) + 'm';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h';
    return d.toLocaleDateString([], { month:'short', day:'numeric' });
  },
};

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
    // Fully logged in with profile → go straight to app
    hide('landing');
    App.enterApp();
  } else if (state.user && !state.profile) {
    // Logged in but didn't finish profile setup → show onboarding on top of landing
    App.startOnboarding();
  }
  // else: no user → show landing (default state)
});
