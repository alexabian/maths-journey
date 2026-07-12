export const worlds = [
  { id: 'village', name: 'Home Village', icon: '⌂', colour: 'moss', locked: false, description: 'A warm place to begin your journey.' },
  { id: 'forest', name: 'Number Forest', icon: '✦', colour: 'leaf', locked: false, description: 'Meet Professor Owl and explore numbers.' },
  { id: 'harbour', name: 'Measurement Harbour', icon: '◒', colour: 'sky', locked: true, description: 'Coming soon: measure, compare and discover.' },
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
      { prompt: 'Start at 5 and count on 3. Where do you land?', answer: 8, choices: [7, 8, 9], hint: 'Begin at 5, then say 6, 7, 8.' },
      { prompt: 'Start at 9 and count on 2. Where do you land?', answer: 11, choices: [10, 11, 12], hint: 'The next two numbers after 9 are 10 and 11.' },
      { prompt: 'Start at 12 and count on 4. Where do you land?', answer: 16, choices: [15, 16, 17], hint: 'Try hopping four times: 13, 14, 15, 16.' }
    ],
    review: { prompt: 'Which number comes just after 18?', answer: 19, choices: [17, 18, 19], hint: 'The number after 18 is one more.' }
  },
  {
    id: 'tens-ones', world: 'forest', title: 'Tens Tree', npc: 'Professor Owl', emoji: '🦉', skill: 'Tens and ones',
    teach: {
      title: 'Numbers have homes',
      body: 'In 24, the 2 lives in the tens place. It means 2 groups of ten. The 4 lives in the ones place. It means 4 ones.',
      visual: [10, 10, 1, 1, 1, 1]
    },
    questions: [
      { prompt: 'How many ones are in 37?', answer: 7, choices: [3, 7, 10], hint: 'Look at the digit on the right.' },
      { prompt: 'How many tens are in 42?', answer: 4, choices: [2, 4, 6], hint: 'Look at the digit on the left.' },
      { prompt: 'Which number has 5 tens and 2 ones?', answer: 52, choices: [25, 52, 57], hint: 'Five tens comes first, then two ones.' }
    ],
    review: { prompt: 'Which number has 6 tens and 1 one?', answer: 61, choices: [16, 60, 61], hint: 'Six tens is 60, then add one.' }
  }
];

export const defaultProgress = {
  xp: 0, coins: 0, streak: 0, lastPlayed: null, completedLessons: [],
  skills: {}, village: { flowers: 0, bridge: false, birds: 0 }, sessions: 0
};
