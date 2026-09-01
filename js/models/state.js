/* ============================================================
   Model — App state, persistence, and pool building
   ============================================================ */
const state = {
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

function save() {
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

function buildPool() {
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
}
