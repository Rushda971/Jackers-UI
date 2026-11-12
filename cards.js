(() => {
  "use strict";

  const container = document.querySelector(".vortex");
  if (!container || !window.gsap || !window.Physics2DPlugin) return;

  gsap.registerPlugin(Physics2DPlugin);

  const random = (min, max) => gsap.utils.random(min, max);
  const suits = [
    { symbol: "♥", color: "#c94b55" },
    { symbol: "♦", color: "#c94b55" },
    { symbol: "♠", color: "#292929" },
    { symbol: "♣", color: "#292929" }
  ];
  const ranks = ["A", "K", "Q", "J", "10", "9"];

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cardCount = window.innerWidth < 700 ? 9 : 17;

  function createCard(index) {
    const card = document.createElement("div");
    const suit = suits[Math.floor(Math.random() * suits.length)];
    const rank = ranks[Math.floor(Math.random() * ranks.length)];

    card.className = "falling-card";
    card.setAttribute("aria-hidden", "true");
    card.innerHTML = `
      <span class="card-corner card-corner--top"><b>${rank}</b><i style="color:${suit.color}">${suit.symbol}</i></span>
      <span class="card-center" style="color:${suit.color}">${suit.symbol}</span>
      <span class="card-corner card-corner--bottom"><b>${rank}</b><i style="color:${suit.color}">${suit.symbol}</i></span>
    `;

    const width = random(42, 66);
    card.style.width = `${width}px`;
    card.style.height = `${Math.round(width * 1.43)}px`;
    card.style.setProperty("--card-opacity", random(0.17, 0.34).toFixed(2));
    container.appendChild(card);

    if (reducedMotion) {
      gsap.set(card, {
        x: random(0, Math.max(0, window.innerWidth - width)),
        y: random(0, window.innerHeight),
        rotation: random(-24, 24),
        opacity: 0.12
      });
      return;
    }

    gsap.delayedCall(random(0, 4.5), () => dropCard(card, true));
  }

  function dropCard(card, firstDrop = false) {
    const cardHeight = card.offsetHeight;
    const startX = random(-30, Math.max(0, window.innerWidth - card.offsetWidth));
    const startY = firstDrop ? random(-window.innerHeight, -cardHeight) : -cardHeight - random(40, 260);
    const duration = random(8.5, 12.5);
    const rotation = random(-150, 150);

    gsap.set(card, {
      x: startX,
      y: startY,
      rotation: random(-28, 28),
      opacity: random(0.17, 0.34),
      scale: random(0.88, 1.08)
    });

    gsap.to(card, {
      duration,
      physics2D: {
        velocity: random(38, 64),
        angle: random(84, 96),
        gravity: random(13, 19)
      },
      rotation: `+=${rotation}`,
      ease: "none",
      onComplete: () => dropCard(card)
    });
  }

  for (let i = 0; i < cardCount; i += 1) createCard(i);

  // Bring the dashboard into focus without competing with the falling cards.
  if (!reducedMotion) {
    gsap.from(".topbar", {
      y: -18,
      opacity: 0,
      duration: 0.7,
      ease: "power3.out"
    });

    gsap.from(".feature", {
      y: 28,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      delay: 0.12,
      ease: "power3.out"
    });

    document.querySelectorAll(".feature").forEach((feature) => {
      feature.addEventListener("pointerenter", () => {
        gsap.to(feature, {
          y: -6,
          scale: 1.015,
          duration: 0.28,
          ease: "power3.out",
          overwrite: "auto"
        });
      });

      feature.addEventListener("pointerleave", () => {
        gsap.to(feature, {
          y: 0,
          scale: 1,
          duration: 0.38,
          ease: "power3.out",
          overwrite: "auto"
        });
      });
    });
  }
})();

