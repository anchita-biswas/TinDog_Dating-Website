/* ============================================================
   Model — Session
   The set of localStorage keys that belong to a single logged-in
   session (as opposed to `td_users`, the permanent accounts table).
   Shared by index.html and login.html so switching accounts can't
   leak one user's matches/chats into the next.
   ============================================================ */
const SESSION_KEYS = [
  'td_user', 'td_profile', 'td_passed', 'td_matchIds',
  'td_matches', 'td_messages', 'td_filters', 'td_stats', 'td_notifs',
];

function clearSession() {
  SESSION_KEYS.forEach(k => localStorage.removeItem(k));
}
