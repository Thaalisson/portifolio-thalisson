import { useEffect, useRef } from "react";

const BASE_DENSITY = 18000; // 1 particle per this many px² of viewport
const MAX_PARTICLES = 90;
const LINK_DISTANCE = 140;
const SPEED = 0.12;
const FALLBACK_PRIMARY = "144 68% 45%"; // matches --primary in index.css

// Lightweight canvas "constellation" background — no Three.js, no extra
// dependency. Runs only for the ~2.6s the intro splash is on screen.
export default function ParticleNetwork() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return; // canvas unsupported (e.g. jsdom in tests)

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const primary =
      getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim() || FALLBACK_PRIMARY;

    let width = 0;
    let height = 0;
    let particles = [];
    let rafId;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const initParticles = () => {
      const count = Math.min(
        MAX_PARTICLES,
        Math.floor((width * height) / BASE_DENSITY)
      );
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
      }));
    };

    const renderFrame = (animate) => {
      ctx.clearRect(0, 0, width, height);

      if (animate) {
        particles.forEach((p) => {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0 || p.x > width) p.vx *= -1;
          if (p.y < 0 || p.y > height) p.vy *= -1;
        });
      }

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dist = Math.hypot(a.x - b.x, a.y - b.y);
          if (dist < LINK_DISTANCE) {
            const alpha = 0.16 * (1 - dist / LINK_DISTANCE);
            ctx.strokeStyle = `hsl(${primary} / ${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = `hsl(${primary} / 0.55)`;
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });
    };

    const loop = () => {
      renderFrame(true);
      rafId = requestAnimationFrame(loop);
    };

    resize();
    initParticles();

    if (reduceMotion) {
      renderFrame(false);
    } else {
      loop();
    }

    const handleResize = () => {
      resize();
      initParticles();
      if (reduceMotion) renderFrame(false);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    />
  );
}
