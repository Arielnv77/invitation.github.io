const steps = [
  {
    text: "¿Te acuerdas del día<br>que te pedí salir?",
    image: "foto1.jpg",
    options: [
      { text: "Cómo olvidarlo", next: true },
      { text: "¿Importa ese día?", thinkAgain: true }
    ]
  },
  {
    text: "Si volviésemos al principio…<br>¿lo vivirías igual?",
    image: "foto2.jpg",
    options: [
      { text: "Sí, sin cambiar nada", next: true },
      { text: "Menos timidez quizá 👀", next: true }
    ]
  },
  {
    text: "Entonces…<br>¿quieres ser mi San Valentín este 14<br>y todos los que vienen?",
    image: "foto3.jpg",
    options: [
      { text: "Sí 💖", yes: true },
      { text: "No", thinkAgain: true }
    ]
  }
];

let current = 0;

const img = document.getElementById("image");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");

function hideAll() {
  img.classList.remove("show");
  question.classList.remove("show");
  buttons.classList.remove("show");
}

function showAll() {
  requestAnimationFrame(() => {
    img.classList.add("show");
    question.classList.add("show");
    buttons.classList.add("show");
  });
}

function renderStep() {
  hideAll();

  setTimeout(() => {
    const step = steps[current];

    img.src = step.image;
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

      btn.onclick = () => handleClick(opt);
      buttons.appendChild(btn);
    });

    showAll();
  }, 500);
}

function handleClick(option) {
  if (option.thinkAgain) {
    hideAll();

    setTimeout(() => {
      question.innerHTML = "Piénsalo bien anda 😏";
      buttons.innerHTML = "";

      const back = document.createElement("button");
      back.textContent = "Vale… otra vez";
      back.classList.add("yes");
      back.onclick = renderStep;
      buttons.appendChild(back);

      showAll();
    }, 500);
    return;
  }

  if (option.next) {
    current++;
    renderStep();
    return;
  }

  if (option.yes) {
    hideAll();

    setTimeout(() => {
      question.innerHTML = "💖 Entonces ya está decidido.<br>Te amo.";
      buttons.innerHTML = "";
      showAll();
    }, 500);
  }
}

function moveNo(e) {
  e.target.style.transform = `translate(
    ${Math.random() * 200 - 100}px,
    ${Math.random() * 120 - 60}px
  )`;
}

/* INIT */
renderStep();
