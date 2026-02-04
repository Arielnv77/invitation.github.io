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
let firstRender = true;

const bg = document.getElementById("bg");
const question = document.getElementById("question");
const buttons = document.getElementById("buttons");

/* ========= FADE ========= */

function fadeOut() {
  question.classList.remove("visible");
  buttons.classList.remove("visible");
  bg.classList.remove("visible");
}

function fadeIn() {
  requestAnimationFrame(() => {
    question.classList.add("visible");
    buttons.classList.add("visible");
    bg.classList.add("visible");
  });
}

/* ========= RENDER ========= */

function renderStep() {
  if (!firstRender) fadeOut();

  setTimeout(() => {
    const step = steps[current];

    // 🔥 AQUÍ es el ÚNICO sitio donde se toca la imagen
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

    fadeIn();
    firstRender = false;

  }, firstRender ? 0 : 600);
}

/* ========= ACTIONS ========= */

function handleClick(option) {
  if (option.thinkAgain) {
    fadeOut();

    setTimeout(() => {
      question.innerHTML = "Piénsalo bien anda 😏";
      buttons.innerHTML = "";

      const back = document.createElement("button");
      back.textContent = "Vale, otra vez";
      back.classList.add("yes");
      back.onclick = renderStep;
      buttons.appendChild(back);

      fadeIn();
    }, 600);

    return;
  }

  if (option.next) {
    current++;
    renderStep();
    return;
  }

  if (option.yes) {
    fadeOut();

    setTimeout(() => {
      question.innerHTML = "💖 ERES MÍA ESTE 14 💖";
      buttons.innerHTML = "";
      fadeIn();
    }, 600);
  }
}

/* ========= BOTÓN NO ========= */

function moveNo(e) {
  e.target.style.transform = `translate(
    ${Math.random() * 200 - 100}px,
    ${Math.random() * 150 - 75}px
  )`;
}

/* ========= INIT ========= */

renderStep();
