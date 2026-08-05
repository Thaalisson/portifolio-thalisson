import { useEffect, useRef } from "react";

const CLUSTER_DENSITY = 5200; // 1 node per this many px² of the cluster ellipse
const MAX_NODES = 70;
const LINK_DISTANCE_RATIO = 0.34; // relative to the cluster's horizontal radius
const DRIFT_SPEED = 0.05;
const PULSE_SPAWN_MS = 3000;
const PULSE_DURATION_MS = 1400;
const PARALLAX_MAX_PX = 22;
const PARALLAX_EASE = 0.06;
const FALLBACK_PRIMARY = "144 68% 45%"; // matches --primary in index.css

// Ambient canvas "neural network" — a permanent, subtle Hero backdrop rather
// than a one-shot intro. Nodes cluster into a brain-shaped ellipse anchored
// toward the text column, drift gently, link densely, and occasionally fire
// a soft signal pulse. Reacts to the pointer with a light parallax drift.
// No Three.js, no extra dependency — plain canvas 2D sized to its container.
export default function ParticleNetwork({ anchorXRatio = 0.34, anchorYRatio = 0.46 }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = canvas.parentElement;
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
    let nodes = [];
    let edges = [];
    let pulses = [];
    let rafId;
    let lastTime = 0;
    let sinceLastPulse = 0;
    let cx = 0;
    let cy = 0;
    let rx = 0;
    let ry = 0;
    let linkDistance = 0;
    let parallaxTargetX = 0;
    let parallaxTargetY = 0;
    let parallaxX = 0;
    let parallaxY = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      cx = width * anchorXRatio;
      cy = height * anchorYRatio;
      rx = Math.min(width * 0.7, height) * 0.46;
      ry = rx * 0.8;
      linkDistance = rx * LINK_DISTANCE_RATIO;
    };

    // Uniform-ish sampling inside the cluster ellipse (rejection sampling).
    const randomPointInEllipse = () => {
      let x, y;
      do {
        x = (Math.random() * 2 - 1) * rx;
        y = (Math.random() * 2 - 1) * ry;
      } while ((x * x) / (rx * rx) + (y * y) / (ry * ry) > 1);
      return { x: cx + x, y: cy + y };
    };

    const initNodes = () => {
      const area = Math.PI * rx * ry;
      const count = Math.min(MAX_NODES, Math.floor(area / CLUSTER_DENSITY));
      nodes = Array.from({ length: count }, () => {
        const p = randomPointInEllipse();
        return {
          x: p.x,
          y: p.y,
          vx: (Math.random() - 0.5) * DRIFT_SPEED,
          vy: (Math.random() - 0.5) * DRIFT_SPEED,
        };
      });
    };

    const rebuildEdges = () => {
      edges = [];
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dist = Math.hypot(
            nodes[i].x - nodes[j].x,
            nodes[i].y - nodes[j].y
          );
          if (dist < linkDistance) edges.push([i, j, dist]);
        }
      }
    };

    const spawnPulse = () => {
      if (!edges.length) return;
      const [a, b] = edges[Math.floor(Math.random() * edges.length)];
      pulses.push({ a, b, t: 0, reverse: Math.random() < 0.5 });
    };

    const step = (dt) => {
      nodes.forEach((n) => {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        const dx = n.x - cx;
        const dy = n.y - cy;
        if ((dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) > 1) {
          n.vx *= -1;
          n.vy *= -1;
        }
      });
      rebuildEdges();

      sinceLastPulse += dt;
      if (sinceLastPulse > PULSE_SPAWN_MS) {
        sinceLastPulse = 0;
        spawnPulse();
      }
      pulses.forEach((p) => (p.t += dt));
      pulses = pulses.filter((p) => p.t < PULSE_DURATION_MS);

      parallaxX += (parallaxTargetX - parallaxX) * PARALLAX_EASE;
      parallaxY += (parallaxTargetY - parallaxY) * PARALLAX_EASE;
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.save();
      ctx.translate(parallaxX, parallaxY);

      edges.forEach(([i, j, dist]) => {
        const a = nodes[i];
        const b = nodes[j];
        const alpha = 0.12 * (1 - dist / linkDistance);
        ctx.strokeStyle = `hsl(${primary} / ${alpha})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      pulses.forEach((p) => {
        const from = nodes[p.reverse ? p.b : p.a];
        const to = nodes[p.reverse ? p.a : p.b];
        if (!from || !to) return;
        const progress = Math.min(p.t / PULSE_DURATION_MS, 1);
        const eased = progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;
        const x = from.x + (to.x - from.x) * eased;
        const y = from.y + (to.y - from.y) * eased;
        const fade = Math.sin(progress * Math.PI);
        ctx.beginPath();
        ctx.fillStyle = `hsl(${primary} / ${0.7 * fade})`;
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.fillStyle = `hsl(${primary} / 0.4)`;
      nodes.forEach((n) => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });

      ctx.restore();
    };

    const loop = (time) => {
      const dt = lastTime ? time - lastTime : 16;
      lastTime = time;
      step(dt);
      draw();
      rafId = requestAnimationFrame(loop);
    };

    resize();
    initNodes();
    rebuildEdges();
    draw();

    if (!reduceMotion) {
      rafId = requestAnimationFrame(loop);
    }

    const handleResize = () => {
      resize();
      initNodes();
      rebuildEdges();
      draw();
    };
    window.addEventListener("resize", handleResize);

    const handlePointerMove = (e) => {
      const rect = container.getBoundingClientRect();
      const nx = (e.clientX - rect.left) / rect.width - 0.5;
      const ny = (e.clientY - rect.top) / rect.height - 0.5;
      parallaxTargetX = nx * PARALLAX_MAX_PX * -1;
      parallaxTargetY = ny * PARALLAX_MAX_PX * -1;
    };
    if (!reduceMotion) {
      window.addEventListener("pointermove", handlePointerMove);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("pointermove", handlePointerMove);
    };
  }, [anchorXRatio, anchorYRatio]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none"
    />
  );
}
