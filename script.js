let mode = "neutral";

document.querySelectorAll("[data-choice]").forEach(btn => {
  btn.addEventListener("click", e => {
    mode = e.target.dataset.choice;
    document.body.setAttribute("data-mode", mode);
  });
});
