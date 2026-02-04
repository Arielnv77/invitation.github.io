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
let showingBg1 = true;

const card = document.getElementById("card");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");

const bg1 = document.getElementById("bg1");
const bg2 = document.getElementById("bg2");

/* ===== CAMBIO DE IMAGEN CON CROSSFADE ===== */
function setBackground(image) {
  const show = showingBg1 ? bg1 : bg2;
  const hide = showingBg1 ? bg2 : bg1;

  show.style.backgroundImage = `url(${image})`;
  show.classList.add("active");
  hide.classList.remove("active");

  showingBg1 = !showingBg1;
}

/* ===== RENDER ===== */
function renderStep() {
  card.classList.add("fade-out");

  setTimeout(() => {
    const step = steps[current];

    question.innerHTML = step.text;
    buttons.innerHTML = "";
    setBackground(step.image);

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

    card.classList.remove("fade-out");
    card.classList.add("fade-in");
  }, 500);
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
    card.classList.add("fade-out");

    setTimeout(() => {
      question.innerHTML = "💖 ERES MÍA ESTE 14 😈<br> Te amo, mi amor";
      buttons.innerHTML = "";
      card.classList.remove("fade-out");
      card.classList.add("fade-in");
    }, 500);
  }
}

/* ===== PIÉNSALO BIEN ===== */
function showThinkAgain() {
  card.classList.add("fade-out");

  setTimeout(() => {
    question.innerHTML = "Piénsalo bien anda 😏";
    buttons.innerHTML = "";

    const backBtn = document.createElement("button");
    backBtn.textContent = "Vale… otra vez";
    backBtn.classList.add("yes");

    backBtn.addEventListener("click", () => {
      renderStep();
    });

    buttons.appendChild(backBtn);

    card.classList.remove("fade-out");
    card.classList.add("fade-in");
  }, 500);
}

/* ===== BOTÓN NO HUYE ===== */
function moveNo(e) {
  const btn = e.target;
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 200 - 100;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

/* ===== INIT ===== */
renderStep();
