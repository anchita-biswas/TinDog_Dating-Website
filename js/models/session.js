/* ============================================================
   Model — Session
   The set of localStorage keys holding the current demo session.
   There are no accounts: the profile IS the session, so clearing
   these keys returns the app to a first-visit state.
   ============================================================ */
const SESSION_KEYS = [
  'td_profile', 'td_passed', 'td_matchIds',
  'td_matches', 'td_messages', 'td_filters', 'td_stats', 'td_notifs',
];

function clearSession() {
  SESSION_KEYS.forEach(k => localStorage.removeItem(k));
}
