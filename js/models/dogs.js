/* ============================================================
   Model — Mock dog data
   ============================================================ */
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

/* Reply engine — picks a line by what was said, then speaks it in the
   dog's own voice. {excite}/{tail} are filled from the dog's energy, so
   a Low-energy Frenchie and a High-energy Dalmatian answer differently. */
const REPLY_RULES = [
  { test: /\b(park|walk|run|hike|outside|zoomies)\b/i, lines: [
      'The park?! {excite} I\'m already waiting by the door.',
      'Say "walk" one more time. I dare you. 🦮',
      'I know exactly which route. Trust me, I\'ve mapped every good smell.' ] },
  { test: /\b(food|treat|snack|eat|dinner|hungry|bone)\b/i, lines: [
      'Treats? You now have my full and undivided attention. 🦴',
      'I am legally required to tell you I have never once been fed.',
      '{tail} Go on. Say the word again.' ] },
  { test: /\b(cute|beautiful|handsome|gorgeous|adorable|love|pretty)\b/i, lines: [
      'Stop it. 😳 ...ok keep going.',
      'I showed my human this and they said "aww" out loud.',
      'You\'re not so bad yourself, you know. {tail}' ] },
  { test: /\b(hi|hey|hello|woof|sup|yo)\b/i, lines: [
      'Hi!! {excite}',
      'Hey there 🐾 my human is reading this over my shoulder.',
      'Oh! Hi. {tail} I was hoping you\'d message first.' ] },
  { test: /\b(play|ball|fetch|toy|frisbee|stick)\b/i, lines: [
      'Ball. BALL. {excite}',
      'I have seventeen toys and I will bring you all of them.',
      'Fair warning: I don\'t actually give the ball back.' ] },
  { test: /\b(nap|sleep|tired|lazy|couch|rest)\b/i, lines: [
      'Finally, someone who gets it. 😌',
      'I\'ve been asleep for six hours and honestly? Could go longer.',
      'Is this an invitation to nap in the same room? Because yes.' ] },
  { test: /\?\s*$/, lines: [
      'Hmm! {tail} Honestly? Yes.',
      'Great question. My human says I\'m not qualified to answer that. 😅',
      'Let me think about it... ok I thought about it. Absolutely.' ] },
];

/* Voice by energy level — one entry per value used in DOGS. */
const VOICE = {
  High:   { excite: 'ZOOMIES INITIATED.',                tail: '*tail going full speed*' },
  Medium: { excite: 'Ok, that\'s genuinely exciting.',    tail: '*tail wags*' },
  Low:    { excite: '...I sat up. That\'s how you know.', tail: '*one slow tail thump*' },
};

const FALLBACK_LINES = [
  '{tail} You\'re easy to talk to, you know that?',
  'My human is being SO embarrassing, they\'re photographing me texting you.',
  'Tell me more. I\'m told I\'m an excellent listener.',
];

function botReply(dog, userText) {
  const voice = VOICE[dog.energy] || VOICE.Medium;
  const rule  = REPLY_RULES.find(r => r.test.test(userText));
  const pool  = rule
    ? rule.lines
    : [`${dog.personality[0]} as always — tell me more!`, ...FALLBACK_LINES];
  return pool[Math.floor(Math.random() * pool.length)]
    .replace(/\{(\w+)\}/g, (_, key) => voice[key] || '');
}
