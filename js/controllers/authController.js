/* ============================================================
   Controller — Auth (login.html)
   Mock client-only auth backed by localStorage. `td_users` is the
   permanent accounts table; everything else is session data cleared
   via clearSession() (js/models/session.js) on sign-out and sign-up.
   ============================================================ */

/* ── TAB SWITCHER ──────────────────────────────── */
function switchTab(tab) {
  const isLogin = tab === 'login';
  document.getElementById('login-form').style.display = isLogin ? '' : 'none';
  document.getElementById('signup-form').style.display = isLogin ? 'none' : '';
  document.getElementById('tab-login').classList.toggle('active', isLogin);
  document.getElementById('tab-signup').classList.toggle('active', !isLogin);
}

// Check URL param for initial tab
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get('tab') === 'signup') switchTab('signup');

/* ── PASSWORD TOGGLE ───────────────────────────── */
function togglePw(id, btn) {
  const input = document.getElementById(id);
  const isText = input.type === 'text';
  input.type = isText ? 'password' : 'text';
  btn.innerHTML = isText
    ? '<i class="fa-solid fa-eye"></i>'
    : '<i class="fa-solid fa-eye-slash"></i>';
}

/* ── TOAST ─────────────────────────────────────── */
function toast(msg, type = 'error') {
  const box = document.getElementById('auth-toast');
  const t = document.createElement('div');
  t.className = `at ${type}`;
  const icon = type === 'error' ? '❌' : '✅';
  t.innerHTML = `<span>${icon}</span><span>${msg}</span>`;
  box.appendChild(t);
  setTimeout(() => { t.classList.add('out'); setTimeout(() => t.remove(), 300); }, 3000);
}

/* ── LOGIN ─────────────────────────────────────── */
function doLogin() {
  const email = document.getElementById('li-email').value.trim();
  const pw    = document.getElementById('li-pw').value;
  if (!email || !pw) return toast('Please fill in all fields');

  const users = JSON.parse(localStorage.getItem('td_users') || '{}');
  if (!users[email]) return toast('No account found. Sign up first!');
  if (users[email].pw !== pw) return toast('Incorrect password');

  // Save session
  localStorage.setItem('td_user', JSON.stringify(users[email].user));
  toast('Welcome back! 🐾', 'success');
  setTimeout(() => { window.location.href = 'index.html'; }, 800);
}

/* ── SIGNUP ────────────────────────────────────── */
function doSignup() {
  const name  = document.getElementById('su-name').value.trim();
  const email = document.getElementById('su-email').value.trim();
  const pw    = document.getElementById('su-pw').value;

  if (!name || !email || !pw) return toast('Please fill in all fields');
  if (!email.includes('@')) return toast('Please enter a valid email');
  if (pw.length < 6) return toast('Password must be at least 6 characters');

  const users = JSON.parse(localStorage.getItem('td_users') || '{}');
  if (users[email]) return toast('Account already exists. Log in!');

  const user = { id: 'u_' + Date.now(), name, email, createdAt: Date.now() };
  users[email] = { user, pw };
  localStorage.setItem('td_users', JSON.stringify(users));

  // fixes: a new account must not inherit the previous session's matches/chats
  clearSession();
  localStorage.setItem('td_user', JSON.stringify(user));
  // No profile yet — index.html will detect and start onboarding

  toast('Account created! Setting up your profile... 🐾', 'success');
  setTimeout(() => { window.location.href = 'index.html'; }, 900);
}

/* ── AUTO REDIRECT if already logged in ───────── */
const existingUser = localStorage.getItem('td_user');
const existingProfile = localStorage.getItem('td_profile');
if (existingUser && existingProfile) {
  window.location.href = 'index.html';
}

// Enter on fields
document.addEventListener('keydown', e => {
  if (e.key === 'Enter') {
    const loginVisible = document.getElementById('login-form').style.display !== 'none';
    if (loginVisible) doLogin();
    else doSignup();
  }
});
