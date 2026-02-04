const steps = [
  {
    text: "Te acuerdas del dia <br> que te pedi salir?",
    image: "foto1.jpg",
    options: [
      { text: "Como voy a olvidarlo..", next: true },
      { text: " ¿Importa ese día?", next: true }
    ]
  },
  {
    text: " Si volvieses al principio...<br> ¿lo vivirías igual?",
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
      { text: "No, ya no ", no: true }
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
      if (opt.no) {
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
  if (option.next) {
    current++;
    renderStep();
  }

  if (option.yes) {
    question.innerHTML = "💖 ERES MÍA ESTE 14 😈<br> Te amo Mi Amor";
    buttons.innerHTML = "";
  }
}

function moveNo(e) {
  const btn = e.target;
  const x = Math.random() * 300 - 150;
  const y = Math.random() * 200 - 100;
  btn.style.transform = `translate(${x}px, ${y}px)`;
}

renderStep();
