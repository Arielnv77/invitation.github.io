document.addEventListener("DOMContentLoaded", () => {

  const steps = [
    {
      text: "¿Te acuerdas del día<br>que te pedí salir?",
      image: "foto1.jpg",
      options: [
        { text: "Cómo olvidarlo…", next: true },
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

  /* ===== PRELOAD IMÁGENES ===== */
  const images = steps.map(s => s.image);
  let loaded = 0;

  images.forEach(src => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      loaded++;
      if (loaded === images.length) {
        start();
      }
    };
  });

  function start() {
    renderStep();
  }

  /* ===== RENDER ===== */
  function renderStep() {
    const step = steps[current];

    // Fade out
    question.classList.remove("show");
    buttons.classList.remove("show");
    bg.classList.remove("visible");

    setTimeout(() => {
      bg.style.backgroundImage = `url(${step.image})`;
      bg.classList.add("visible");

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

      // Fade in
      setTimeout(() => {
        question.classList.add("show");
        buttons.classList.add("show");
      }, 100);

    }, 500);
  }

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
      question.classList.remove("show");
      buttons.classList.remove("show");

      setTimeout(() => {
        question.innerHTML = "💖 ERES MÍA ESTE 14 💖";
        buttons.innerHTML = "";
        question.classList.add("show");
      }, 400);
    }
  }

  function showThinkAgain() {
    question.classList.remove("show");
    buttons.classList.remove("show");

    setTimeout(() => {
      question.innerHTML = "Piénsalo bien anda 😏";
      buttons.innerHTML = "";

      const back = document.createElement("button");
      back.textContent = "Vale, otra vez";
      back.classList.add("yes");
      back.onclick = renderStep;

      buttons.appendChild(back);

      question.classList.add("show");
      buttons.classList.add("show");
    }, 400);
  }

  function moveNo(e) {
    const btn = e.target;
    btn.style.transform = `translate(
      ${Math.random() * 300 - 150}px,
      ${Math.random() * 200 - 100}px
    )`;
  }

});
