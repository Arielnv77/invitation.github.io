gsap.registerPlugin(ScrollTrigger);

let mode = "neutral";

document.querySelectorAll("[data-choice]").forEach(btn => {
  btn.addEventListener("click", e => {
    mode = e.target.dataset.choice;
    document.body.setAttribute("data-mode", mode);
  });
});

/* Animaciones por scroll */
gsap.utils.toArray("section").forEach(section => {
  gsap.fromTo(
    section,
    { opacity: 0 },
    {
      opacity: 1,
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        end: "top 30%",
        scrub: true
      }
    }
  );
});
