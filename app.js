// ============================================================
//  LinguaAI — warstwa prezentacji (frontend)
//  Komunikuje się wyłącznie z własnym serwerem (/api/generate),
//  nigdy bezpośrednio z API modelu językowego.
// ============================================================

// ---------- przykładowe zestawy (przed pierwszym generowaniem) ----------
const flashData = {
  A1: [
    { word: "cat", phon: "/kæt/", tr: "kot", ex: "My cat sleeps all day." },
    { word: "house", phon: "/haʊs/", tr: "dom", ex: "This is my house." },
    { word: "water", phon: "/ˈwɔːtə/", tr: "woda", ex: "Can I have some water?" },
    { word: "book", phon: "/bʊk/", tr: "książka", ex: "I read a book every week." },
    { word: "friend", phon: "/frend/", tr: "przyjaciel", ex: "She is my best friend." },
    { word: "morning", phon: "/ˈmɔːnɪŋ/", tr: "poranek", ex: "I drink coffee every morning." },
    { word: "apple", phon: "/ˈæpl/", tr: "jabłko", ex: "An apple a day keeps the doctor away." },
    { word: "school", phon: "/skuːl/", tr: "szkoła", ex: "The school is near my house." },
    { word: "happy", phon: "/ˈhæpi/", tr: "szczęśliwy", ex: "I am happy today." },
    { word: "family", phon: "/ˈfæmɪli/", tr: "rodzina", ex: "I have a big family." },
  ],
  A2: [
    { word: "airport", phon: "/ˈeəpɔːt/", tr: "lotnisko", ex: "We arrived at the airport early." },
    { word: "luggage", phon: "/ˈlʌɡɪdʒ/", tr: "bagaż", ex: "My luggage is too heavy." },
    { word: "delay", phon: "/dɪˈleɪ/", tr: "opóźnienie", ex: "There is a two-hour delay." },
    { word: "boarding pass", phon: "/ˈbɔːdɪŋ pɑːs/", tr: "karta pokładowa", ex: "Please show your boarding pass." },
    { word: "schedule", phon: "/ˈʃedjuːl/", tr: "rozkład, harmonogram", ex: "Check the train schedule." },
    { word: "receipt", phon: "/rɪˈsiːt/", tr: "paragon", ex: "Can I have a receipt, please?" },
    { word: "journey", phon: "/ˈdʒɜːni/", tr: "podróż", ex: "The journey took five hours." },
    { word: "booking", phon: "/ˈbʊkɪŋ/", tr: "rezerwacja", ex: "I made a booking for two nights." },
    { word: "departure", phon: "/dɪˈpɑːtʃə/", tr: "odlot, odjazd", ex: "Departure is at 6 a.m." },
    { word: "customs", phon: "/ˈkʌstəmz/", tr: "odprawa celna", ex: "We went through customs quickly." },
  ],
  B1: [
    { word: "deadline", phon: "/ˈdedlaɪn/", tr: "termin ostateczny", ex: "We need to meet the deadline for this sprint." },
    { word: "feedback", phon: "/ˈfiːdbæk/", tr: "informacja zwrotna", ex: "Thanks for your feedback on my code." },
    { word: "deployment", phon: "/dɪˈplɔɪmənt/", tr: "wdrożenie", ex: "The deployment is planned for Friday." },
    { word: "stakeholder", phon: "/ˈsteɪkhəʊldə/", tr: "interesariusz", ex: "We presented the demo to the stakeholders." },
    { word: "requirement", phon: "/rɪˈkwaɪəmənt/", tr: "wymaganie", ex: "This requirement is not clear yet." },
    { word: "bug", phon: "/bʌɡ/", tr: "błąd w programie", ex: "I found a bug in the login form." },
    { word: "skill", phon: "/skɪl/", tr: "umiejętność", ex: "Communication is an important skill." },
    { word: "salary", phon: "/ˈsæləri/", tr: "wynagrodzenie", ex: "What are your salary expectations?" },
    { word: "team lead", phon: "/tiːm liːd/", tr: "lider zespołu", ex: "Our team lead organises daily meetings." },
    { word: "experience", phon: "/ɪkˈspɪəriəns/", tr: "doświadczenie", ex: "I have three years of experience in Java." },
  ],
  B2: [
    { word: "scalability", phon: "/ˌskeɪləˈbɪləti/", tr: "skalowalność", ex: "Scalability was a key concern for the architecture." },
    { word: "to negotiate", phon: "/nɪˈɡəʊʃieɪt/", tr: "negocjować", ex: "We managed to negotiate better terms." },
    { word: "compliance", phon: "/kəmˈplaɪəns/", tr: "zgodność z przepisami", ex: "The system must ensure GDPR compliance." },
    { word: "liability", phon: "/ˌlaɪəˈbɪləti/", tr: "odpowiedzialność prawna", ex: "The company accepted liability for the damage." },
    { word: "revenue", phon: "/ˈrevənjuː/", tr: "przychód", ex: "Revenue grew by 20% this year." },
    { word: "to outsource", phon: "/ˈaʊtsɔːs/", tr: "zlecać na zewnątrz", ex: "They decided to outsource the testing." },
    { word: "bottleneck", phon: "/ˈbɒtlnek/", tr: "wąskie gardło", ex: "The database became a bottleneck." },
    { word: "to allocate", phon: "/ˈæləkeɪt/", tr: "przydzielać", ex: "We allocated more budget to marketing." },
    { word: "trade-off", phon: "/ˈtreɪd ɒf/", tr: "kompromis", ex: "There is a trade-off between speed and cost." },
    { word: "sustainable", phon: "/səˈsteɪnəbl/", tr: "zrównoważony", ex: "We need a sustainable growth strategy." },
  ],
  C1: [
    { word: "ambiguous", phon: "/æmˈbɪɡjuəs/", tr: "dwuznaczny", ex: "The contract wording is rather ambiguous." },
    { word: "to mitigate", phon: "/ˈmɪtɪɡeɪt/", tr: "łagodzić, ograniczać", ex: "We took steps to mitigate the risk." },
    { word: "to infer", phon: "/ɪnˈfɜː/", tr: "wywnioskować", ex: "What can we infer from these results?" },
    { word: "contingency plan", phon: "/kənˈtɪndʒənsi plæn/", tr: "plan awaryjny", ex: "Always have a contingency plan ready." },
    { word: "unprecedented", phon: "/ʌnˈpresɪdentɪd/", tr: "bezprecedensowy", ex: "The growth was unprecedented." },
    { word: "to undermine", phon: "/ˌʌndəˈmaɪn/", tr: "podważać", ex: "Constant delays undermine client trust." },
    { word: "nuanced", phon: "/ˈnjuːɑːnst/", tr: "zniuansowany", ex: "She gave a nuanced answer to the question." },
    { word: "to scrutinise", phon: "/ˈskruːtɪnaɪz/", tr: "dokładnie badać", ex: "The auditors scrutinised every invoice." },
    { word: "leverage", phon: "/ˈliːvərɪdʒ/", tr: "przewaga, dźwignia", ex: "We can use this data as leverage." },
    { word: "inherent", phon: "/ɪnˈhɪərənt/", tr: "nieodłączny", ex: "Every project has inherent risks." },
  ],
};

const quizData = {
  A1: [
    { q: "Jak przetłumaczysz słowo „cat”?", options: ["pies", "kot", "dom", "woda"], correct: 1 },
    { q: "Co znaczy „hello”?", options: ["żegnaj", "proszę", "cześć", "dziękuję"], correct: 2 },
    { q: "Jak przetłumaczysz „book”?", options: ["książka", "stół", "krzesło", "okno"], correct: 0 },
    { q: "Co znaczy „water”?", options: ["ogień", "woda", "powietrze", "ziemia"], correct: 1 },
  ],
  A2: [
    { q: "Jak przetłumaczysz „airport”?", options: ["dworzec", "lotnisko", "port", "stacja"], correct: 1 },
    { q: "Co znaczy „luggage”?", options: ["bagaż", "bilet", "paszport", "walizka podręczna"], correct: 0 },
    { q: "Jak przetłumaczysz „schedule”?", options: ["rozkład jazdy", "mapa", "przewodnik", "kierunek"], correct: 0 },
    { q: "Co znaczy „delay”?", options: ["przyspieszenie", "opóźnienie", "odwołanie", "zmiana"], correct: 1 },
  ],
  B1: [
    { q: "Jak przetłumaczysz słowo „deadline”?", options: ["spotkanie zespołu", "termin ostateczny", "przerwa kawowa", "kod źródłowy"], correct: 1 },
    { q: "Co znaczy „feedback”?", options: ["informacja zwrotna", "raport", "zadanie", "zgłoszenie błędu"], correct: 0 },
    { q: "Jak przetłumaczysz „deployment”?", options: ["wdrożenie", "testowanie", "projektowanie", "planowanie"], correct: 0 },
    { q: "Co znaczy „stakeholder”?", options: ["interesariusz", "programista", "klient końcowy", "tester"], correct: 0 },
  ],
  B2: [
    { q: "Jak przetłumaczysz „scalability”?", options: ["skalowalność", "stabilność", "dostępność", "wydajność"], correct: 0 },
    { q: "Co znaczy „to negotiate”?", options: ["negocjować", "zatrudniać", "zwalniać", "inwestować"], correct: 0 },
    { q: "Jak przetłumaczysz „compliance”?", options: ["zgodność z przepisami", "konkurencja", "współpraca", "rekrutacja"], correct: 0 },
    { q: "Co znaczy „liability”?", options: ["odpowiedzialność prawna", "rentowność", "płynność finansowa", "inwentaryzacja"], correct: 0 },
  ],
  C1: [
    { q: "Jak przetłumaczysz „ambiguous”?", options: ["dwuznaczny", "oczywisty", "precyzyjny", "zbędny"], correct: 0 },
    { q: "Co znaczy „to mitigate”?", options: ["łagodzić", "zaostrzać", "ignorować", "przyspieszać"], correct: 0 },
    { q: "Jak przetłumaczysz „infer”?", options: ["wywnioskować", "zaprzeczyć", "udowodnić", "zignorować"], correct: 0 },
    { q: "Co znaczy „contingency plan”?", options: ["plan awaryjny", "budżet roczny", "harmonogram spotkań", "raport końcowy"], correct: 0 },
  ],
};

// ============================================================
//  STAN APLIKACJI
// ============================================================
const LANG_NAMES = { en: "angielski", de: "niemiecki", es: "hiszpański" };
const DEMO_TOPICS = {
  A1: "Podstawowe słownictwo", A2: "Podróże i lotnisko", B1: "Rozmowa kwalifikacyjna w IT",
  B2: "Biznes i zarządzanie", C1: "Język analityczny",
};

let lessons = [];          // wszystkie lekcje (przykładowe + wygenerowane)
let currentLesson = null;  // lekcja otwarta w widoku nauki/quizu
let isLoading = false;
let lessonSeq = 0;

// przykładowe lekcje z wbudowanych danych
Object.keys(flashData).forEach((level) => {
  lessons.push({
    id: `demo-${level}`, topic: DEMO_TOPICS[level], level, lang: "en", ai: false,
    cards: flashData[level],
    quiz: quizData[level],
  });
});

function $(id) { return document.getElementById(id); }

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {            // Fisher–Yates
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ============================================================
//  NAWIGACJA MIĘDZY WIDOKAMI
// ============================================================
function showView(name) {
  if (isLoading && name !== "nauka") return;           // blokada akcji w trakcie generowania (2.1.2.2)
  if ((name === "nauka" || name === "quiz") && !currentLesson) currentLesson = lessons[lessons.length - 1];
  document.querySelectorAll(".view").forEach((v) => v.classList.remove("active"));
  $("view-" + name).classList.add("active");
  document.querySelectorAll(".nav-btn").forEach((b) => b.classList.toggle("active", b.dataset.view === name));
  if (name === "dashboard") renderDashboard();
  if (name === "nauka" && !isLoading) renderFlashcard();
  if (name === "quiz") renderQuiz();
}
document.querySelectorAll("[data-view]").forEach((btn) => btn.addEventListener("click", () => showView(btn.dataset.view)));
document.querySelectorAll("[data-goto]").forEach((btn) => btn.addEventListener("click", () => showView(btn.dataset.goto)));

function openLesson(lesson) {
  currentLesson = lesson;
  flashIndex = 0;
  flashOrder = lesson.cards.map((_, i) => i);
  resetQuiz();
  $("statLevel").textContent = lesson.level;
  showView("nauka");
}

// ============================================================
//  PANEL (DASHBOARD)
// ============================================================
function renderDashboard() {
  const grid = $("lessonGrid");
  grid.innerHTML = "";
  const ordered = [...lessons.filter((l) => l.ai).reverse(), ...lessons.filter((l) => !l.ai)];
  ordered.forEach((lesson) => {
    const card = document.createElement("div");
    card.className = "lesson-card";

    const h3 = document.createElement("h3");
    h3.textContent = lesson.topic;
    if (lesson.ai) {
      const badge = document.createElement("span");
      badge.className = "badge" + (lesson.mock ? " demo" : "");
      badge.textContent = lesson.mock ? "demo" : "AI";
      h3.append(" ", badge);
    }

    const meta = document.createElement("div");
    meta.className = "lesson-meta";
    meta.textContent = `${LANG_NAMES[lesson.lang]} · poziom ${lesson.level} · ${lesson.cards.length} słówek`;

    const btn = document.createElement("button");
    btn.className = "btn ghost block";
    btn.textContent = "Ucz się";
    btn.addEventListener("click", () => openLesson(lesson));

    card.append(h3, meta, btn);
    grid.appendChild(card);
  });

  $("statWords").textContent = lessons.reduce((sum, l) => sum + l.cards.length, 0);
  $("statLessons").textContent = lessons.length;
}

// ============================================================
//  KREATOR + GENEROWANIE PRZEZ SERWER (rozdz. 3.3 i 4)
// ============================================================
document.querySelectorAll(".chip").forEach((chip) => {
  chip.addEventListener("click", () => {
    document.querySelectorAll(".chip").forEach((c) => c.classList.remove("selected"));
    chip.classList.add("selected");
    $("topic").value = chip.textContent;
    $("topicError").hidden = true;
  });
});
$("topic").addEventListener("input", () => {
  $("topicError").hidden = true;
  document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("selected", c.textContent === $("topic").value));
});

// z generowanych dystraktorów budujemy quiz wielokrotnego wyboru
function buildQuiz(cards) {
  return shuffle(cards).map((card) => {
    const options = shuffle([card.tr, ...card.distractors]);
    return { q: `Jak przetłumaczysz „${card.word}”?`, options, correct: options.indexOf(card.tr) };
  });
}

function showGenError(message) {
  $("genErrorText").textContent = message;
  $("genError").hidden = false;
}

function setLoading(on, topic = "") {
  isLoading = on;
  $("btnGenerate").disabled = on;
  $("btnGenerate").textContent = on ? "Generuję…" : "Generuj lekcję →";
  $("flashSkeleton").hidden = !on;
  $("flashContent").hidden = on;
  document.querySelectorAll(".nav-btn").forEach((b) => (b.disabled = on));
  if (on) {
    $("loadingTopic").textContent = topic;
    $("flashTitle").textContent = "Generowanie lekcji";
    $("flashCounter").textContent = "";
  }
}

async function generateLesson() {
  const topic = $("topic").value.trim();
  $("genError").hidden = true;
  if (topic.length < 2) {                                // walidacja po stronie klienta (2.2.2.2)
    $("topicError").hidden = false;
    $("topic").focus();
    return;
  }
  if (location.protocol === "file:") {
    showGenError("Strona jest otwarta bezpośrednio z pliku, więc nie ma połączenia z serwerem. Uruchom w terminalu „node server.js” i otwórz http://localhost:3000.");
    return;
  }

  const payload = {
    topic,
    level: $("level").value,
    lang: $("lang").value,
    count: Math.min(20, Math.max(5, parseInt($("count").value, 10) || 10)),
  };

  setLoading(true, topic);
  showView("nauka");

  try {
    const res = await fetch("/api/generate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(120000),
    });
    const data = await res.json().catch(() => ({}));
    if (!res.ok) throw new Error(data.error || `Serwer zwrócił błąd ${res.status}.`);

    // format serwera → format komponentu fiszki
    const cards = data.flashcards.map((c) => ({
      word: c.word, phon: c.phonetic, tr: c.translation, ex: c.example, distractors: c.distractors,
    }));
    const lesson = {
      id: `ai-${++lessonSeq}`, topic: data.topic, level: data.level, lang: data.lang,
      ai: true, mock: data.mock, cards, quiz: buildQuiz(cards),
    };
    lessons.push(lesson);
    setLoading(false);
    openLesson(lesson);
  } catch (err) {
    setLoading(false);
    const msg = err.name === "TimeoutError"
      ? "Generowanie trwa zbyt długo. Spróbuj ponownie."
      : err instanceof TypeError
        ? "Brak połączenia z serwerem. Sprawdź, czy „node server.js” jest uruchomiony."
        : err.message;
    showView("kreator");
    showGenError(msg);                                   // formularz zachowuje wpisane dane (3.3.2.2)
  }
}

$("btnGenerate").addEventListener("click", generateLesson);
$("btnRetry").addEventListener("click", generateLesson);
$("topic").addEventListener("keydown", (e) => { if (e.key === "Enter") generateLesson(); });

// informacja o trybie serwera
if (location.protocol === "file:") {
  $("serverNote").textContent = "Tryb offline: generowanie wymaga uruchomienia serwera (node server.js).";
} else {
  fetch("/api/status").then((r) => r.json()).then((s) => {
    $("serverNote").textContent = s.mock
      ? "Serwer działa w trybie demo (MOCK=1): fiszki są przykładowe."
      : `Połączono z serwerem · model: ${s.model}`;
  }).catch(() => {});
}

// ============================================================
//  FISZKI (rozdz. 3.2.1)
// ============================================================
let flashIndex = 0;
let flashOrder = [];
const flipCard = $("flipCard");

function renderFlashcard() {
  const cards = currentLesson.cards;
  if (flashOrder.length !== cards.length) flashOrder = cards.map((_, i) => i);
  flashIndex = Math.min(Math.max(flashIndex, 0), cards.length - 1);
  const card = cards[flashOrder[flashIndex]];

  flipCard.classList.remove("flipped");
  $("flashTitle").textContent = `${currentLesson.topic} · ${currentLesson.level}`;
  $("flashCounter").textContent = `Fiszka ${flashIndex + 1} z ${cards.length} · kliknij kartę, aby zobaczyć tłumaczenie.`;
  $("flashWord").textContent = card.word;
  $("flashPhon").textContent = card.phon || "";
  $("flashTranslation").textContent = card.tr;
  $("flashExample").textContent = card.ex ? `"${card.ex}"` : "";
  $("flashProgress").style.width = `${((flashIndex + 1) / cards.length) * 100}%`;

  const dots = $("flashDots");
  dots.innerHTML = "";
  cards.forEach((_, i) => {
    const d = document.createElement("button");
    d.className = "dot" + (i === flashIndex ? " active" : "");
    d.setAttribute("aria-label", `Fiszka ${i + 1}`);
    d.addEventListener("click", () => { flashIndex = i; renderFlashcard(); });
    dots.appendChild(d);
  });

  $("flashPrev").disabled = flashIndex === 0;
  $("flashNext").textContent = flashIndex === cards.length - 1 ? "Przejdź do quizu →" : "Następna →";
}

function nextFlash() {
  if (flashIndex < currentLesson.cards.length - 1) { flashIndex++; renderFlashcard(); }
  else showView("quiz");
}
function prevFlash() {
  if (flashIndex > 0) { flashIndex--; renderFlashcard(); }
}

flipCard.addEventListener("click", () => flipCard.classList.toggle("flipped"));
$("flashNext").addEventListener("click", nextFlash);
$("flashPrev").addEventListener("click", prevFlash);
$("flashShuffle").addEventListener("click", () => {
  flashOrder = shuffle(flashOrder);
  flashIndex = 0;
  renderFlashcard();
});

document.addEventListener("keydown", (e) => {
  if (isLoading || !$("view-nauka").classList.contains("active")) return;
  if (e.key === "ArrowRight") nextFlash();
  else if (e.key === "ArrowLeft") prevFlash();
  else if (e.key === " " || (e.key === "Enter" && document.activeElement === flipCard)) {
    e.preventDefault();
    flipCard.classList.toggle("flipped");
  }
});

// ============================================================
//  QUIZ (rozdz. 3.2.2)
// ============================================================
let quizIndex = 0;
let answers = [];

function getQuestions() { return currentLesson.quiz; }

function resetQuiz() {
  quizIndex = 0;
  answers = [];
  $("quizPlay").hidden = false;
  $("quizResult").hidden = true;
}

function renderQuiz() {
  if (!$("quizResult").hidden) return;
  const questions = getQuestions();
  quizIndex = Math.min(Math.max(quizIndex, 0), questions.length - 1);
  const current = questions[quizIndex];
  const chosen = answers[quizIndex];

  $("quizTitle").textContent = `Quiz · ${currentLesson.topic}`;
  $("quizProgress").textContent = `Pytanie ${quizIndex + 1} z ${questions.length} · poziom ${currentLesson.level}`;
  $("quizQuestion").textContent = current.q;

  const wrap = $("quizOptions");
  wrap.innerHTML = "";
  current.options.forEach((text, i) => {
    const opt = document.createElement("button");
    opt.className = "quiz-option";
    opt.textContent = `${String.fromCharCode(65 + i)}. ${text}`;
    if (chosen !== undefined) {
      opt.disabled = true;
      if (i === current.correct) opt.classList.add("correct");
      else if (i === chosen) opt.classList.add("incorrect");
    }
    opt.addEventListener("click", () => { answers[quizIndex] = i; renderQuiz(); });
    wrap.appendChild(opt);
  });

  $("quizPrev").disabled = quizIndex === 0;
  $("quizNext").textContent = quizIndex === questions.length - 1 ? "Zakończ quiz" : "Następne →";
}

function showResult() {
  const questions = getQuestions();
  let score = 0;
  const list = $("resultList");
  list.innerHTML = "";

  questions.forEach((q, i) => {
    const ok = answers[i] === q.correct;
    if (ok) score++;
    const li = document.createElement("li");
    li.className = ok ? "ok" : "bad";
    const mark = document.createElement("strong");
    mark.textContent = ok ? "✓ " : "✗ ";
    li.append(mark, q.q);
    if (!ok) {
      const small = document.createElement("small");
      const yours = answers[i] === undefined ? "brak odpowiedzi" : q.options[answers[i]];
      small.textContent = `Twoja odpowiedź: ${yours} · poprawna: ${q.options[q.correct]}`;
      li.append(document.createElement("br"), small);
    }
    list.appendChild(li);
  });

  const percent = Math.round((score / questions.length) * 100);
  $("resultScore").textContent = `${score} / ${questions.length}`;
  $("resultPercent").textContent = `${percent}%`;
  $("resultMsg").textContent =
    percent === 100 ? "Bezbłędnie! Możesz spróbować wyższego poziomu."
    : percent >= 75 ? "Bardzo dobrze. Powtórz słówka, w których był błąd."
    : percent >= 50 ? "Nieźle. Wróć do fiszek i przejdź quiz jeszcze raz."
    : "Warto jeszcze raz przejrzeć fiszki z tej lekcji.";

  $("quizProgress").textContent = `Wynik · poziom ${currentLesson.level}`;
  $("quizPlay").hidden = true;
  $("quizResult").hidden = false;
}

$("quizPrev").addEventListener("click", () => { quizIndex--; renderQuiz(); });
$("quizNext").addEventListener("click", () => {
  if (quizIndex < getQuestions().length - 1) { quizIndex++; renderQuiz(); }
  else showResult();
});
$("quizRetry").addEventListener("click", () => { resetQuiz(); renderQuiz(); });
$("quizFinish").addEventListener("click", () => { resetQuiz(); showView("dashboard"); });

// ============================================================
//  START
// ============================================================
currentLesson = lessons.find((l) => l.level === "B1");
renderDashboard();
