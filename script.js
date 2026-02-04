const steps = [
  {
    text: "Te acuerdas del dia <br> que te pedi salir?",
    image: "foto1.jpg",
    options: [
      { text: "Como voy a olvidarlo..", next: true },
      { text: "¿Importa ese día?", thinkAgain: true }
    ]
  },
  {
    text: "Si volvieses al principio...<br> ¿lo vivirías igual?",
    image: "foto2.jpg",
    options: [
      { text: "Si sin cambiar nada", next: true },
      { text: "Menos timidez..quizas 👀", next: true }
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

const card = document.getElementById("card");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");
const bg = document.getElementById("bg");

function renderStep() {
  card.classList.add("fade-out");
  bg.style.opacity = 0;
  bg.style.transform = "scale(1.05)";

  setTimeout(() => {
    const step = steps[current];

    question.innerHTML = step.text;
    bg.style.backgroundImage = `url(${step.image})`;
    buttons.innerHTML = "";

    step.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.textContent = opt.text;

      if (opt.yes) btn.classList.add("yes");

      if (opt.thinkAgain && current === steps.length - 1) {
        // SOLO en la última pregunta el botón huye
        btn.classList.add("no");
        btn.addEventListener("mouseenter", moveNo);
      }

      btn.addEventListener("click", () => handleClick(opt));
      buttons.appendChild(btn);
    });

    card.classList.remove("fade-out");
    card.classList.add("fade-in");
    bg.style.opacity = 1;
    bg.style.transform = "scale(1)";
  }, 500);
}

function handleClick(option) {
  // Pantalla intermedia "piénsalo bien"
  if (option.thinkAgain) {
    showThinkAgain();
    return;
  }

  // Avanzar normal
  if (option.next) {
    current++;
    renderStep();
    return;
  }

  // Final feliz
  if (option.yes) {
    card.classList.add("fade-out");

    setTimeout(() => {
      question.innerHTML = "💖 ERES MÍA ESTE 14 😈<br> Te amo mi amor";
      buttons.innerHTML = "";
      card.classList.remove("fade-out");
      card.classList.add("fade-in");
    }, 500);
  }
}

function showThinkAgain() {
  card.classList.add("fade-out");

  setTimeout(() => {
    question.innerHTML = "Piénsalo bien anda 😏";
    buttons.innerHTML = "";

    const backBtn = document.createElement("button");
    backBtn.textContent = "Vale… otra vez";
    backBtn.classList.add("yes");

    backBtn.addEventListener("click", () => {
      renderStep(); // vuelve a LA MISMA pregunta
    });

    buttons.appendChild(backBtn);

    card.classList.remove("fade-out");
    card.classList.add("fade-in");
  }, 500);
}

function moveNo(e) {
  const btn = e.target;
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 200 - 100;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

renderStep();
