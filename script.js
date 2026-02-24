const form = document.getElementById("bookingForm");
const successScreen = document.getElementById("successScreen");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
console.log(ctx);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = [];

// Обновление размера при ресайзе
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

function createFirework(x, y) {
  for (let i = 0; i < 500; i++) {
    particles.push({
      x: x,
      y: y,
      angle: Math.random() * Math.PI * 5,
      speed: Math.random() * 6 + 8,
      radius: 3,
      life: 100,
      color: `rgb(
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)},
        ${Math.floor(Math.random() * 255)}
      )`,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;

    p.speed *= 0.96;
    p.life--;

    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();

    if (p.life <= 0 || p.speed < 0.3) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  successScreen.style.display = "flex";

  // Несколько взрывов в случайных местах
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFirework(
        Math.random() * canvas.width,
        (Math.random() * canvas.height) / 2,
      );
    }, i * 400);
  }
});

animate();
