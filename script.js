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
    text: "Entonces…<br>¿soy tu persona favorita este 14?",
    image: "foto3.jpg",
    options: [
      { text: "Sí 💖", yes: true },
      { text: "No", thinkAgain: true }
    ]
  }
];

let current = 0;

const bg = document.getElementById("bg");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");

function renderStep(fade = false) {
  if (fade) {
    question.classList.remove("show");
    buttons.classList.remove("show");
  }

  setTimeout(() => {
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

      btn.onclick = () => handleClick(opt);
      buttons.appendChild(btn);
    });

    requestAnimationFrame(() => {
      question.classList.add("show");
      buttons.classList.add("show");
    });

  }, fade ? 500 : 0);
}

function handleClick(option) {
  if (option.thinkAgain) {
    question.classList.remove("show");
    buttons.classList.remove("show");

    setTimeout(() => {
      question.innerHTML = "Piénsalo bien anda 😏";
      buttons.innerHTML = "";

      const back = document.createElement("button");
      back.textContent = "Vale… otra vez";
      back.classList.add("yes");
      back.onclick = () => renderStep(true);

      buttons.appendChild(back);

      requestAnimationFrame(() => {
        question.classList.add("show");
        buttons.classList.add("show");
      });
    }, 500);
    return;
  }

  if (option.next) {
    current++;
    renderStep(true);
    return;
  }

  if (option.yes) {
    question.classList.remove("show");
    buttons.classList.remove("show");

    setTimeout(() => {
      question.innerHTML = "💖 ERES MÍA ESTE 14 💖";
      buttons.innerHTML = "";
      question.classList.add("show");
    }, 500);
  }
}

function moveNo(e) {
  e.target.style.transform = `translate(
    ${Math.random() * 200 - 100}px,
    ${Math.random() * 150 - 75}px
  )`;
}

/* INIT */
renderStep();
