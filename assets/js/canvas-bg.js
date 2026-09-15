/**
 * Interactive Particle Constellation Background
 * Naufal Fikri Portfolio
 */

(function () {
  const canvas = document.getElementById('particle-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  let mouse = { x: null, y: null, radius: 140 };

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }

  function getColors() {
    const theme = document.documentElement.getAttribute('data-theme') || 'dark';
    if (theme === 'matrix') {
      return {
        particle: 'rgba(34, 197, 94, 0.65)',
        line: 'rgba(34, 197, 94, 0.15)',
        hoverLine: 'rgba(74, 222, 128, 0.35)'
      };
    } else if (theme === 'light') {
      return {
        particle: 'rgba(99, 102, 241, 0.5)',
        line: 'rgba(99, 102, 241, 0.1)',
        hoverLine: 'rgba(6, 182, 212, 0.25)'
      };
    } else {
      return {
        particle: 'rgba(56, 189, 248, 0.65)',
        line: 'rgba(99, 102, 241, 0.16)',
        hoverLine: 'rgba(56, 189, 248, 0.38)'
      };
    }
  }

  class Particle {
    constructor() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.size = Math.random() * 2 + 1;
      this.baseX = this.x;
      this.baseY = this.y;
      this.density = Math.random() * 20 + 1;
      this.vx = (Math.random() - 0.5) * 0.7;
      this.vy = (Math.random() - 0.5) * 0.7;
    }

    draw(colors) {
      ctx.fillStyle = colors.particle;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;

      if (this.x < 0 || this.x > width) this.vx = -this.vx;
      if (this.y < 0 || this.y > height) this.vy = -this.vy;

      // Mouse interaction
      if (mouse.x !== null && mouse.y !== null) {
        const dx = mouse.x - this.x;
        const dy = mouse.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < mouse.radius) {
          const force = (mouse.radius - distance) / mouse.radius;
          const directionX = (dx / distance) * force * 3;
          const directionY = (dy / distance) * force * 3;
          this.x -= directionX;
          this.y -= directionY;
        }
      }
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.floor((width * height) / 14000);
    const particleCount = Math.min(Math.max(count, 35), 90);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles(colors) {
    const maxDist = 130;
    for (let a = 0; a < particles.length; a++) {
      for (let b = a + 1; b < particles.length; b++) {
        const dx = particles[a].x - particles[b].x;
        const dy = particles[a].y - particles[b].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.8;
          ctx.strokeStyle = colors.line.replace(/[\d\.]+\)$/, `${opacity})`);
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(particles[b].x, particles[b].y);
          ctx.stroke();
        }
      }

      // Connect to mouse
      if (mouse.x !== null && mouse.y !== null) {
        const mdx = mouse.x - particles[a].x;
        const mdy = mouse.y - particles[a].y;
        const mdist = Math.sqrt(mdx * mdx + mdy * mdy);
        if (mdist < mouse.radius) {
          ctx.strokeStyle = colors.hoverLine;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(particles[a].x, particles[a].y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }
    }
  }

  let animationFrameId;
  function animate() {
    ctx.clearRect(0, 0, width, height);
    const colors = getColors();

    for (let i = 0; i < particles.length; i++) {
      particles[i].update();
      particles[i].draw(colors);
    }
    connectParticles(colors);

    animationFrameId = requestAnimationFrame(animate);
  }

  window.addEventListener('resize', () => {
    resize();
    initParticles();
  });

  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  window.addEventListener('mouseout', () => {
    mouse.x = null;
    mouse.y = null;
  });

  // Init
  resize();
  initParticles();
  animate();
})();
