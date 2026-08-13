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
