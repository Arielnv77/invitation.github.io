console.log("JS cargado");

const steps = [
  {
    text: "¿Te acuerdas del día que te pedí salir?",
    image: "foto1.jpg",
    options: [
      { text: "Cómo olvidarlo", next: true },
      { text: "¿Importa ese día?", thinkAgain: true }
    ]
  },
  {
    text: "Si volviésemos al principio… ¿lo vivirías igual?",
    image: "foto2.jpg",
    options: [
      { text: "Sí, sin cambiar nada", next: true },
      { text: "Menos timidez quizá 👀", next: true }
    ]
  },
  {
    text: "Entonces… ¿soy tu persona favorita este 14?",
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

function renderStep() {
  const step = steps[current];
  console.log("Render step", current);

  bg.style.backgroundImage = `url(${step.image})`;
  question.textContent = step.text;
  buttons.innerHTML = "";

  step.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt.text;

    if (opt.yes) btn.classList.add("yes");
    if (opt.thinkAgain) btn.classList.add("no");

    btn.onclick = () => handleClick(opt);
    buttons.appendChild(btn);
  });
}

function handleClick(option) {
  if (option.thinkAgain) {
    question.textContent = "Piénsalo bien anda 😏";
    buttons.innerHTML = "";

    const back = document.createElement("button");
    back.textContent = "Vale, otra vez";
    back.classList.add("yes");
    back.onclick = renderStep;
    buttons.appendChild(back);
    return;
  }

  if (option.next) {
    current++;
    renderStep();
    return;
  }

  if (option.yes) {
    question.textContent = "💖 ERES MÍA ESTE 14 💖";
    buttons.innerHTML = "";
  }
}

renderStep();
