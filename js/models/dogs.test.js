/* Self-check for the reply engine in dogs.js.  Run:  node js/models/dogs.test.js
   dogs.js is a plain browser script (no exports), so it is evaluated here as-is. */
const assert = require('assert');
const fs = require('fs');
const path = require('path');

const { DOGS, VOICE, REPLY_RULES, botReply } = (0, eval)(
  fs.readFileSync(path.join(__dirname, 'dogs.js'), 'utf8') +
  '\n;({ DOGS, VOICE, REPLY_RULES, botReply });'
);

const rex  = DOGS.find(d => d.id === 'd1');   // High energy
const nala = DOGS.find(d => d.id === 'd9');   // Low energy

// Every energy value in the data has a voice, or {excite}/{tail} leak into the UI.
assert.ok(DOGS.every(d => VOICE[d.energy]), 'every DOGS energy value has a VOICE entry');

// Placeholders must always be substituted, whichever rule fires.
const probes = ['want to go to the park?', 'got any treats', 'you are cute', 'hi',
                'ball?', 'nap time', 'is that so?', 'zxcvbnm qwerty'];
const all = [];
for (const dog of DOGS) {
  for (const p of probes) {
    for (let i = 0; i < 40; i++) all.push(botReply(dog, p));
  }
}
assert.ok(!all.some(r => /\{\w+\}/.test(r)), 'no unsubstituted {placeholder} in any reply');
assert.ok(all.every(r => r && r.trim()), 'no empty replies');

// Keyword routing beats the fallback.
assert.ok(REPLY_RULES.find(r => r.test.test('want to go to the park?')).lines
            .some(l => /park|walk|smell/i.test(l)),
          'park/walk rule is what matches "park"');

// Voice actually differs by energy — the whole point of the engine.
const hi = new Set(), lo = new Set();
for (let i = 0; i < 300; i++) { hi.add(botReply(rex, 'hi')); lo.add(botReply(nala, 'hi')); }
assert.ok(hi.size > 1 && lo.size > 1, 'greeting pool has variety');
assert.ok([...hi].filter(r => lo.has(r)).length < Math.min(hi.size, lo.size),
          'High and Low energy dogs do not produce identical greeting sets');

// Unmatched input still returns an in-character line.
assert.ok(botReply(nala, 'zxcvbnm qwerty').length > 0, 'fallback returns a line');

console.log(`all checks passed (${all.length} replies generated)`);
