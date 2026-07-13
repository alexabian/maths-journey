import { defaultProgress, lessons, worlds } from './data.js';

const KEY = 'maths-journey-progress-v1';
const app = document.querySelector('#app');
let progress = loadProgress();
let screen = 'home';
let activeLesson = null;
let step = 0;
let questionIndex = 0;
let questionResults = [];
let answered = false;
let parentUnlocked = false;
let activeWorld = 'forest';

function loadProgress() {
  try { return { ...defaultProgress, ...JSON.parse(localStorage.getItem(KEY) || '{}') }; }
  catch { return { ...defaultProgress }; }
}
function save() { localStorage.setItem(KEY, JSON.stringify(progress)); }
function escapeHtml(value) { return String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c])); }
function setScreen(next) { screen = next; render(); window.scrollTo({ top: 0, behavior: 'smooth' }); }
function today() { return new Date().toISOString().slice(0, 10); }
function worldUnlocked(worldId) {
  if (worldId === 'village' || worldId === 'forest') return true;
  if (worldId === 'harbour') return lessons.filter(l => l.world === 'forest').every(l => progress.completedLessons.includes(l.id));
  if (worldId === 'tower') return lessons.filter(l => l.world === 'harbour').every(l => progress.completedLessons.includes(l.id));
  return false;
}
function beginLesson(lesson = lessons.find(l => !progress.completedLessons.includes(l.id)) || lessons[0]) {
  activeLesson = lesson; step = 0; questionIndex = 0; questionResults = []; answered = false; screen = 'lesson'; render();
}
function addProgress() {
  progress.xp += 40; progress.coins += 12; progress.sessions += 1;
  if (!progress.completedLessons.includes(activeLesson.id)) progress.completedLessons.push(activeLesson.id);
  progress.skills[activeLesson.skill] = Math.min(100, (progress.skills[activeLesson.skill] || 0) + 30);
  const playedToday = progress.lastPlayed === today();
  if (!playedToday) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    progress.streak = progress.lastPlayed === yesterday ? progress.streak + 1 : 1;
    progress.lastPlayed = today();
  }
  progress.village.flowers += 3; progress.village.birds = Math.min(5, progress.village.birds + 1);
  save();
}
function header() { return `<header class="topbar"><div class="brand"><div class="brand-mark">✦</div><div><h1>Maths Journey</h1><p>A little adventure in every number</p></div></div><div class="top-actions"><div class="pill">✿ ${progress.village.flowers} flowers</div><button class="icon-btn" data-action="parent">For grown-ups</button></div></header>`; }
function home() {
  const next = lessons.find(l => !progress.completedLessons.includes(l.id)) || lessons[lessons.length - 1];
  return `${header()}<section class="hero"><div><p class="eyebrow">WELCOME BACK, EXPLORER</p><h2>The village is waiting for you.</h2><p>Follow the number path, help Professor Owl and bring colour back to your home village — one lovely idea at a time.</p><button class="primary" data-action="start">Begin today’s adventure <span aria-hidden="true">→</span></button></div><div class="hero-art" aria-hidden="true">🦉</div></section>
  <section class="section-head"><div><h3>Your journey</h3><p>Choose a place to explore.</p></div><button class="secondary" data-action="lesson-list">See lessons</button></section>
  <div class="world-grid">${worlds.map(w => { const unlocked = !w.locked && worldUnlocked(w.id); return `<button class="world-card ${w.colour}" ${unlocked ? '' : 'disabled'} data-world="${w.id}" ${unlocked ? '' : 'disabled'}><span class="world-icon">${unlocked ? w.icon : '🔒'}</span><strong>${w.name}</strong><small>${unlocked ? w.description : 'Finish the chapter before this one.'}</small></button>`; }).join('')}</div>
  <div class="stats"><div class="stat"><b>${progress.xp}</b><span>journey XP</span></div><div class="stat"><b>${progress.coins}</b><span>village coins</span></div><div class="stat"><b>${progress.streak}</b><span>day streak</span></div><div class="stat"><b>${progress.completedLessons.length}/${lessons.length}</b><span>lessons explored</span></div></div>
  <section class="section-head"><div><h3>Today’s small quest</h3><p>${escapeHtml(next.title)} · ${escapeHtml(next.skill)}</p></div><button class="primary" data-action="start">Play quest</button></section>`;
}
function lessonList() { const world = worlds.find(w => w.id === activeWorld) || worlds[1]; const chapterLessons = lessons.filter(l => l.world === activeWorld); return `${header()}<section class="section-head"><div><p class="eyebrow">CHAPTER ${activeWorld === 'forest' ? 'ONE' : 'TWO'}</p><h3>Lessons in ${escapeHtml(world.name)}</h3><p>${escapeHtml(world.description)}</p></div><button class="secondary" data-action="chapter-list">See chapters</button></section><div class="world-grid">${chapterLessons.map(l => `<button class="world-card ${world.colour}" data-lesson="${l.id}"><span class="world-icon">${progress.completedLessons.includes(l.id) ? '✿' : l.emoji}</span><strong>${escapeHtml(l.title)}</strong><small>${progress.completedLessons.includes(l.id) ? 'Explored · play again' : escapeHtml(l.skill)}</small></button>`).join('')}</div><button class="back" data-action="home">← Back to village</button>`; }
function lesson() {
  const total = 1 + activeLesson.questions.length + 1;
  const current = step + 1;
  const bar = `<div class="lesson-nav"><button class="back" data-action="home">← Village</button><div class="progress-track"><div class="progress-fill" style="width:${(current / total) * 100}%"></div></div><span class="pill">${current}/${total}</span></div>`;
  if (step === 0) return `${header()}<section class="lesson-shell">${bar}<article class="lesson-card"><div class="npc"><div class="npc-avatar">${activeLesson.emoji}</div><div><small>Professor Owl says</small><strong>${escapeHtml(activeLesson.title)}</strong></div></div><h2>${escapeHtml(activeLesson.teach.title)}</h2><p>${escapeHtml(activeLesson.teach.body)}</p><div class="number-path">${activeLesson.teach.visual.map((n, i) => `<span>${n === 10 ? '10' : n}</span>`).join('')}</div><div class="coach-note">You can take your time. We are learning how the numbers fit together.</div><div class="lesson-actions"><button class="primary" data-action="next">I’m ready →</button></div></article></section>`;
  if (step <= activeLesson.questions.length + 1) {
    const q = step <= activeLesson.questions.length ? activeLesson.questions[questionIndex] : activeLesson.review;
    return questionView(q, bar, step === 1 ? 'Let’s try one together' : step === activeLesson.questions.length + 1 ? 'A little review' : 'Now you try one');
  }
  return `${header()}<section class="lesson-shell">${bar}<article class="lesson-card complete"><div class="complete-art">🌱</div><h2>The village is growing!</h2><p>You helped Professor Owl and found a new way to think about <strong>${escapeHtml(activeLesson.skill.toLowerCase())}</strong>.</p><div class="reward-row"><span class="reward">✦ +40 XP</span><span class="reward">◎ +12 coins</span><span class="reward">✿ 3 flowers bloom</span></div><button class="primary" data-action="home">Return to village →</button></article></section>`;
}
function visualFor(q) {
  if (q.visual) return `<div class="math-visual" aria-label="Visual maths model">${q.visual.map(item => `<span>${escapeHtml(item)}</span>`).join('')}</div>`;
  return '';
}
function questionView(q, bar, label) { return `${header()}<section class="lesson-shell">${bar}<article class="lesson-card question"><div class="npc"><div class="npc-avatar">${activeLesson.emoji}</div><div><small>${label}</small><strong>${escapeHtml(activeLesson.skill)}</strong></div></div>${visualFor(q)}<h2>${escapeHtml(q.prompt)}</h2><div class="answer-grid">${q.choices.map(choice => `<button class="answer" data-answer="${escapeHtml(choice)}" ${answered ? 'disabled' : ''}>${escapeHtml(choice)}</button>`).join('')}</div><div class="feedback" id="feedback"></div><button class="secondary" data-action="hint">💡 Give me a hint</button></article></section>`; }
function parent() {
  if (!parentUnlocked) return `${header()}<section class="gate"><div class="complete-art">🔐</div><h2>Grown-up check</h2><p>This keeps progress details away from little explorers.</p><p><strong>What is 2 + 3?</strong></p><input aria-label="Parent answer" inputmode="numeric" data-parent-input placeholder="Type the answer" /><button class="primary" data-action="unlock-parent">Open grown-up view</button><div class="feedback" id="parent-feedback"></div></section>`;
  return `${header()}<section class="parent-panel"><div class="section-head"><div><h3>Grown-up view</h3><p>A gentle snapshot of the journey so far.</p></div><button class="back" data-action="home">← Village</button></div><div class="stats"><div class="stat"><b>${progress.sessions}</b><span>sessions completed</span></div><div class="stat"><b>${progress.streak}</b><span>day streak</span></div><div class="stat"><b>${progress.village.birds}</b><span>birds returned</span></div><div class="stat"><b>${progress.completedLessons.length}</b><span>lessons completed</span></div></div><h3 style="margin-top:28px">Skills</h3>${lessons.map(l => { const value = progress.skills[l.skill] || 0; return `<div class="skill-row"><strong>${escapeHtml(l.skill)}</strong><div class="skill-bar"><i style="width:${value}%"></i></div><span>${value < 40 ? 'Learning' : value < 80 ? 'Practising' : 'Secure'}</span></div>`; }).join('')}<div class="coach-note" style="margin-top:24px">Maths Journey keeps progress on this device only. There are no accounts, ads or analytics.</div></section>`;
}
function render() { app.innerHTML = screen === 'home' ? home() : screen === 'lessons' ? lessonList() : screen === 'lesson' ? lesson() : parent(); }

app.addEventListener('click', e => {
  const action = e.target.closest('[data-action]')?.dataset.action;
  if (action === 'start') beginLesson();
  if (action === 'home') setScreen('home');
  if (action === 'lesson-list') setScreen('lessons');
  if (action === 'chapter-list') setScreen('home');
  if (action === 'parent') { parentUnlocked = false; setScreen('parent'); }
  if (action === 'unlock-parent') {
    const input = document.querySelector('[data-parent-input]');
    const feedback = document.querySelector('#parent-feedback');
    if (input?.value.trim() === '5') { parentUnlocked = true; render(); }
    else if (feedback) { feedback.className = 'feedback try'; feedback.textContent = 'Try the little addition problem again.'; }
  }
  const lessonId = e.target.closest('[data-lesson]')?.dataset.lesson;
  if (lessonId) beginLesson(lessons.find(l => l.id === lessonId));
  const worldId = e.target.closest('[data-world]')?.dataset.world;
  if (worldId && worldUnlocked(worldId) && worldId !== 'village') { activeWorld = worldId; setScreen('lessons'); }
  const answerButton = e.target.closest('[data-answer]');
  if (answerButton && !answered) {
    const q = step <= activeLesson.questions.length ? activeLesson.questions[questionIndex] : activeLesson.review;
    const value = answerButton.dataset.answer; const correct = String(value) === String(q.answer);
    answerButton.classList.add(correct ? 'correct' : 'gentle-wrong'); answered = true;
    const feedback = document.querySelector('#feedback'); feedback.className = `feedback ${correct ? 'good' : 'try'}`;
    feedback.textContent = correct ? 'That’s it! You found the number path. 🌟' : `Almost! ${q.hint}`;
    questionResults.push(correct); if (correct) progress.xp += 8; save();
    setTimeout(() => { if (step < activeLesson.questions.length + 1) { questionIndex += 1; step += 1; answered = false; render(); } else { step += 1; addProgress(); render(); } }, 850);
  }
  if (action === 'hint') { const q = step <= activeLesson.questions.length ? activeLesson.questions[questionIndex] : activeLesson.review; const feedback = document.querySelector('#feedback'); if (feedback) { feedback.className = 'feedback try'; feedback.textContent = `💡 ${q.hint}`; } }
  if (action === 'next') { step += 1; render(); }
});

render();
