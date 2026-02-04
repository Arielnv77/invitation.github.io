const steps = [
  {
    text: "Te acuerdas del día <br> que te pedí salir?",
    image: "foto1.jpg",
    options: [
      { text: "Cómo voy a olvidarlo…", next: true },
      { text: "¿Importa ese día?", thinkAgain: true }
    ]
  },
  {
    text: "Si volvieses al principio…<br> ¿lo vivirías igual?",
    image: "foto2.jpg",
    options: [
      { text: "Sí, sin cambiar nada", next: true },
      { text: "Menos timidez… quizás 👀", next: true }
    ]
  },
  {
    text: "Entonces…<br> ¿Sigo siendo tu PERSONA favorita <br> para este 14 de febrero?",
    image: "foto3.jpg",
    options: [
      { text: "Sí 💖", yes: true },
      { text: "No, ya no", thinkAgain: true }
    ]
  }
];

let current = 0;

const bg = document.getElementById("bg");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");

/* ===== RENDER ===== */
function renderStep() {
  const step = steps[current];

  bg.style.backgroundImage = `url(${step.image})`;
  question.innerHTML = step.text;
  buttons.innerHTML = "";

  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;

    if (opt.yes) btn.classList.add("yes");
    if (opt.thinkAgain && current === steps.length - 1) {
      btn.classList.add("no");
      btn.addEventListener("mouseenter", moveNo);
    }

    btn.addEventListener("click", () => handleClick(opt));
    buttons.appendChild(btn);
  });
}

/* ===== CLICK ===== */
function handleClick(option) {
  if (option.thinkAgain) {
    showThinkAgain();
    return;
  }

  if (option.next) {
    current++;
    renderStep();
    return;
  }

  if (option.yes) {
    question.innerHTML = "💖 ERES MÍA ESTE 14 😈<br> Te amo, mi amor";
    buttons.innerHTML = "";
  }
}

/* ===== PIÉNSALO BIEN ===== */
function showThinkAgain() {
  question.innerHTML = "Piénsalo bien anda 😏";
  buttons.innerHTML = "";

  const backBtn = document.createElement("button");
  backBtn.textContent = "Vale… otra vez";
  backBtn.classList.add("yes");
  backBtn.onclick = renderStep;

  buttons.appendChild(backBtn);
}

/* ===== BOTÓN NO HUYE ===== */
function moveNo(e) {
  const btn = e.target;
  btn.style.transform = `translate(
    ${Math.random() * 300 - 150}px,
    ${Math.random() * 200 - 100}px
  )`;
}

/* ===== INIT ===== */
renderStep();
