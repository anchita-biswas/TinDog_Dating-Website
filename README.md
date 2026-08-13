# 🐾 TinDog

> *Tinder, but for dogs. Find the love of your dog's life.*

A fully client-side dog-dating app — auth, onboarding, a swipeable match
deck, chat, filters, and notifications — built with plain HTML, CSS, and
JavaScript. No build step, no framework, no backend: everything runs from
`localStorage` in the browser. Originally a practice project from Angela
Yu's Web Development Bootcamp, since rebuilt into the full app described
below.

---

## ✨ Features

- **Landing page** — responsive marketing site with features, safety,
  testimonials, pricing, and download sections
- **Auth** — sign up / log in (mock, `localStorage`-backed)
- **Onboarding** — 4-step dog profile setup: info, photo & bio, personality
  tags, location
- **Swipe deck** — drag or button-based like/pass/super-like, with match
  animation and confetti
- **Matches & Chat** — per-match conversation threads with a simulated
  auto-reply
- **Filters** — breed, size, age range, distance, energy level
- **Notifications** — in-app alerts for matches, likes, and boosts
- **Responsive** — desktop sidebar + right panel, collapses to a bottom nav
  and full-screen views on mobile

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| HTML5 | Structure |
| CSS3 | Styling & animation |
| Vanilla JavaScript | App logic (no framework, no bundler) |
| Bootstrap-free, hand-built layout | Responsive grid & components |
| Font Awesome 6 | Icons |
| Google Fonts | Nunito + Ubuntu typography |

## 📁 Project Structure

Organized as Model / View / Controller — plain `<script>` files loaded in
dependency order, so the whole app still runs by opening `index.html`
directly in a browser (no server required).

```
TinDog-Dating Website/
├── index.html            landing page + app shell
├── login.html             sign in / sign up
├── css/
│   ├── styles.css          index.html styling
│   └── login.css           login.html styling
├── js/
│   ├── models/
│   │   ├── session.js        localStorage session keys + clearSession()
│   │   ├── dogs.js            mock dog data
│   │   └── state.js           app state, save/load, pool building
│   ├── views/
│   │   └── render.js          all DOM rendering + UI helpers
│   └── controllers/
│       ├── appController.js   event handlers for index.html (the `App` object)
│       └── authController.js  event handlers for login.html
└── images/
```

- **Models** own data and persistence — they never touch the DOM.
- **Views** read that data and render it — they never mutate state.
- **Controllers** are what the HTML's `onclick` attributes call; they
  respond to user actions and coordinate the two.

## 🚀 Getting Started

No build tools or dependencies required — just open it in a browser.

```bash
git clone https://github.com/your-username/tindog.git
cd tindog
```

Then double-click `index.html`, or drag it into any browser window.

## 📱 Responsive Design

- **Desktop** — sidebar navigation + a right-hand matches/messages/chat panel
- **Mobile** (< 1024px) — bottom tab bar, full-screen matches/messages/chat

## 🎨 Design Decisions

- Primary brand color `#ff4c68` (coral pink) used across hero, safety, and
  CTA sections
- The **Labrador** pricing tier is highlighted as "Popular"
- Match data lives entirely in `localStorage` under a single active
  session — signing out or creating a new account clears it, so one
  account's matches/chats never leak into another on a shared device

## 🙏 Credits

- Project inspired by [Dr. Angela Yu's](https://www.udemy.com/course/the-complete-web-development-bootcamp/) Web Development Bootcamp on Udemy
- Dog photos via [Unsplash](https://unsplash.com)
- Press logos belong to their respective owners
