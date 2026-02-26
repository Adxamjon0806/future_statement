const form = document.getElementById("bookingForm");
const successScreen = document.getElementById("successScreen");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

// Делаем canvas поверх всего
canvas.style.zIndex = "1000";

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let particles = [];

// Создание взрыва
function createFirework(x, y) {
  const count = 300;

  for (let i = 0; i < count; i++) {
    particles.push({
      x: x,
      y: y,
      angle: Math.random() * Math.PI * 2, // полный круг
      speed: Math.random() * 8 + 4,
      radius: Math.random() * 3 + 1,
      life: 100,
      alpha: 1,
      color: `rgb(${Math.floor(Math.random() * 255)},
                  ${Math.floor(Math.random() * 255)},
                  ${Math.floor(Math.random() * 255)})`,
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    // Движение
    p.x += Math.cos(p.angle) * p.speed;
    p.y += Math.sin(p.angle) * p.speed;

    // Замедление
    p.speed *= 0.96;

    // Гравитация
    p.y += 0.5;

    // Угасание
    p.life--;
    p.alpha -= 0.01;

    ctx.globalAlpha = p.alpha;
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = p.color;
    ctx.fill();
    ctx.globalAlpha = 1;

    if (p.life <= 0 || p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  successScreen.style.display = "flex";

  // Несколько взрывов
  for (let i = 0; i < 6; i++) {
    setTimeout(() => {
      createFirework(
        Math.random() * canvas.width,
        Math.random() * canvas.height * 0.6,
      );
    }, i * 400);
  }
});

animate();
