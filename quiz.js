const answers = [1, 1, 1, 1, 0, 2, 0, 1, 0, 2];
const opts = [
  ["Vrai", "Faux"],
  ["script", "<link>", "<style>"],
  ["color", "background-color", "font-color"],
  ["JavaScript", "Python", "CSS"],
  ["Un protocole de communication", "Un type de base de données", "Un framework CSS"],
  ["MySQL", "PostgreSQL", "MongoDB"],
  ["Structured Query Language", "Simple Query Language", "System Queue List"],
  ["Django", "React", "Laravel"],
  ["Un système de gestion de versions", "Un éditeur de texte", "Un serveur web"],
  ["header", "footer", "main"]
];

let totalQuestions = answers.length;
let timeLeft = 300;
let timerInterval;

function startTimer() {
  timerInterval = setInterval(() => {
    let min = String(Math.floor(timeLeft / 60)).padStart(2, "0");
    let sec = String(timeLeft % 60).padStart(2, "0");
    document.getElementById("timer").textContent = `Temps restant : ${min}:${sec}`;
    if (timeLeft <= 0) { clearInterval(timerInterval); gradeQuizAuto(); }
    timeLeft--;
  }, 1000);
}

function updateProgress() {
  let answered = document.querySelectorAll("input[type='radio']:checked").length;
  let percent = (answered / totalQuestions) * 100;
  document.getElementById("progressBarFill").style.width = percent + "%";
}

document.querySelectorAll("input[type='radio']").forEach(r => r.addEventListener("change", updateProgress));

function gradeQuizAuto() { 
  document.getElementById("result").innerHTML = "<strong>Temps écoulé ! Correction automatique…</strong>"; 
  gradeQuiz(); 
}

function gradeQuiz(e) {
  if (e) e.preventDefault(); 
  clearInterval(timerInterval);
  let score = 0;
  document.querySelectorAll(".quiz-feedback").forEach(f => f.remove());
  for (let i = 0; i < answers.length; i++) {
    const qDiv = document.querySelectorAll(".modern-card")[i];
    const sel = document.querySelector('input[name="q' + i + '"]:checked');
    const user = sel ? parseInt(sel.value) : -1;
    const correct = answers[i];
    if (user === correct) score++;
    const fb = document.createElement("div");
    fb.className = "quiz-feedback";
    if (user === correct) {
      fb.style.background = "#e6ffe6"; fb.style.border = "1px solid #55cc55"; fb.style.color = "#1a7a1a"; fb.innerHTML = "✔ Correct !";
    } else {
      fb.style.background = "#ffe6e6"; fb.style.border = "1px solid #ff5c5c"; fb.style.color = "#a30000"; fb.innerHTML = "✘ Incorrect — Bonne réponse : <strong>" + opts[i][correct] + "</strong>";
    }
    qDiv.appendChild(fb);
  }
  let percent = Math.round((score / totalQuestions) * 100);
  let level = "";
  if (score <= 4) level = "Débutant";
  else if (score <= 7) level = "Intermédiaire";
  else level = "Expert";
  document.getElementById("result").innerHTML = `Votre note : <strong>${score} / ${totalQuestions}</strong> — ${percent}%<br>Niveau atteint : <strong>${level}</strong>`;
}

document.addEventListener("DOMContentLoaded", () => { 
  startTimer(); 
  updateProgress(); 
  document.getElementById("quizForm").addEventListener("submit", gradeQuiz); 
});