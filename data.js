export const worlds = [
  { id: 'village', name: 'Home Village', icon: '⌂', colour: 'moss', locked: false, description: 'A warm place to begin your journey.' },
  { id: 'forest', name: 'Number Forest', icon: '✦', colour: 'leaf', locked: false, description: 'Meet Professor Owl and explore numbers.' },
  { id: 'harbour', name: 'Measurement Harbour', icon: '◒', colour: 'sky', locked: false, description: 'Measure, compare and discover.' },
  { id: 'tower', name: 'Time Tower', icon: '◷', colour: 'sun', locked: true, description: 'Coming soon: clocks and daily adventures.' }
];

export const lessons = [
  {
    id: 'counting-on', world: 'forest', title: 'The Number Path', npc: 'Professor Owl', emoji: '🦉', skill: 'Counting on from a number',
    teach: {
      title: 'Let’s walk along the number path',
      body: 'When we count on, we start at a number and move forward one step at a time. Start at 7, then count 8, 9, 10.',
      visual: [6, 7, 8, 9, 10, 11, 12]
    },
    questions: [
      { prompt: 'Start at 5 and count on 3. Where do you land?', visual: ['5', '+', '3', '=', '?'], answer: 8, choices: [7, 8, 9], hint: 'Begin at 5, then say 6, 7, 8.' },
      { prompt: 'Start at 9 and count on 2. Where do you land?', visual: ['9', '+', '2', '=', '?'], answer: 11, choices: [10, 11, 12], hint: 'The next two numbers after 9 are 10 and 11.' },
      { prompt: 'Start at 12 and count on 4. Where do you land?', visual: ['12', '+', '4', '=', '?'], answer: 16, choices: [15, 16, 17], hint: 'Try hopping four times: 13, 14, 15, 16.' }
    ],
    review: { prompt: 'Which number comes just after 18?', visual: ['18', '+', '1', '=', '?'], answer: 19, choices: [17, 18, 19], hint: 'The number after 18 is one more.' }
  },
  {
    id: 'tens-ones', world: 'forest', title: 'Tens Tree', npc: 'Professor Owl', emoji: '🦉', skill: 'Tens and ones',
    teach: {
      title: 'Numbers have homes',
      body: 'In 24, the 2 lives in the tens place. It means 2 groups of ten. The 4 lives in the ones place. It means 4 ones.',
      visual: [10, 10, 1, 1, 1, 1]
    },
    questions: [
      { prompt: 'How many ones are in 37?', visual: ['37', '→', '7'], answer: 7, choices: [3, 7, 10], hint: 'Look at the digit on the right.' },
      { prompt: 'How many tens are in 42?', visual: ['42', '→', '4 × 10'], answer: 4, choices: [2, 4, 6], hint: 'Look at the digit on the left.' },
      { prompt: 'Which number has 5 tens and 2 ones?', visual: ['5 × 10', '+', '2', '=', '?'], answer: 52, choices: [25, 52, 57], hint: 'Five tens comes first, then two ones.' }
    ],
    review: { prompt: 'Which number has 6 tens and 1 one?', visual: ['6 × 10', '+', '1', '=', '?'], answer: 61, choices: [16, 60, 61], hint: 'Six tens is 60, then add one.' }
  },
  {
    id: 'length-lighthouse', world: 'harbour', title: 'The Length Lighthouse', npc: 'Captain Measure', emoji: '🧭', skill: 'Measuring length in centimetres',
    teach: {
      title: 'Every centimetre is a little step',
      body: 'A ruler helps us measure length. Start at zero, then count the centimetre marks to the end of an object.',
      visual: ['0', '1', '2', '3', '4', '5', 'cm']
    },
    questions: [
      { prompt: 'A shell reaches from 0 to 6 on the ruler. How long is it?', visual: ['0', '→', '6 cm'], answer: 6, choices: [5, 6, 7], hint: 'Count the spaces from zero to the shell.' },
      { prompt: 'A pencil is 8 cm long. A crayon is 5 cm long. Which is longer?', visual: ['8 cm', '>', '5 cm'], answer: 8, choices: [5, 8, 'same'], hint: 'The greater number of centimetres means longer.' },
      { prompt: 'The rope is 10 cm long. We cut off 3 cm. How much is left?', visual: ['10 cm', '−', '3 cm', '=', '?'], answer: 7, choices: [6, 7, 8], hint: 'Start at 10 and count back three.' }
    ],
    review: { prompt: 'Which is the best tool for measuring a small shell?', visual: ['📏', '→', '?'], answer: 'ruler', choices: ['ruler', 'clock', 'dice'], hint: 'A ruler has centimetre marks for length.' }
  },
  {
    id: 'heavy-light-dock', world: 'harbour', title: 'The Heavy-Light Dock', npc: 'Captain Measure', emoji: '🧭', skill: 'Comparing mass',
    teach: {
      title: 'Which parcel needs more muscles?',
      body: 'Mass tells us how heavy something is. We can compare two objects by asking which one feels heavier or lighter.',
      visual: ['light', '⚖️', 'heavy']
    },
    questions: [
      { prompt: 'A feather and a book are on the dock. Which is heavier?', visual: ['⚖️', 'book', '↓'], answer: 'book', choices: ['feather', 'book', 'same'], hint: 'A book needs more muscles to lift.' },
      { prompt: 'Which is lighter: a small pebble or a big rock?', visual: ['pebble', '<', 'rock'], answer: 'pebble', choices: ['pebble', 'rock', 'same'], hint: 'The small pebble has less mass.' },
      { prompt: 'The balance tips down on the apple side. What does that tell us?', visual: ['apple', '⚖️', '↓'], answer: 'apple', choices: ['apple', 'balloon', 'same'], hint: 'The lower side is heavier.' }
    ],
    review: { prompt: 'Which object would you expect to have the greatest mass?', visual: ['feather', '<', 'paper', '<', 'suitcase'], answer: 'suitcase', choices: ['feather', 'suitcase', 'paper'], hint: 'A suitcase is much heavier than a feather or paper.' }
  }
];

export const defaultProgress = {
  xp: 0, coins: 0, streak: 0, lastPlayed: null, completedLessons: [],
  skills: {}, village: { flowers: 0, bridge: false, birds: 0 }, sessions: 0
};
