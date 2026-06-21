import { pointer } from './pointer';
import { reduceMotion } from './glUtils';

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; r: number;
}

export function initDotField(canvas: HTMLCanvasElement | null): (() => void) | null {
  if (!canvas) return null;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0;
  let particles: Particle[] = [];
  let raf = 0;
  let visible = false;

  function build() {
    const cw = canvas!.clientWidth || window.innerWidth;
    const ch = canvas!.clientHeight || window.innerHeight;
    W = canvas!.width = Math.floor(cw * dpr);
    H = canvas!.height = Math.floor(ch * dpr);
    const count = Math.min(110, Math.floor((cw * ch) / 16000));
    particles = [];
    for (let i = 0; i < count; i++) {
      const z = Math.random() * 0.8 + 0.2;
      particles.push({
        x: Math.random() * W,
        y: Math.random() * H,
        z,
        vx: (Math.random() - 0.5) * 0.12 * dpr,
        vy: (Math.random() - 0.5) * 0.12 * dpr,
        r: (z * 1.6 + 0.4) * dpr,
      });
    }
  }

  let resizeObs: ResizeObserver | null = null;
  if (window.ResizeObserver) {
    resizeObs = new ResizeObserver(build);
    resizeObs.observe(canvas);
  }
  window.addEventListener('resize', build);
  build();

  const LINK = 130 * dpr;

  function frame() {
    raf = 0;
    ctx!.clearRect(0, 0, W, H);
    const px = pointer.x * 26 * dpr;
    const py = -pointer.y * 26 * dpr;

    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      if (!reduceMotion) {
        a.x += a.vx;
        a.y += a.vy;
      }
      if (a.x < -20) a.x = W + 20;
      if (a.x > W + 20) a.x = -20;
      if (a.y < -20) a.y = H + 20;
      if (a.y > H + 20) a.y = -20;

      const sx = a.x + px * a.z;
      const sy = a.y + py * a.z;

      for (let k = i + 1; k < particles.length; k++) {
        const b = particles[k];
        const bx = b.x + px * b.z;
        const by = b.y + py * b.z;
        const dx = sx - bx, dy = sy - by;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK * LINK) {
          const alpha = (1 - Math.sqrt(d2) / LINK) * 0.16 * Math.min(a.z, b.z);
          ctx!.strokeStyle = `rgba(190,194,205,${alpha.toFixed(3)})`;
          ctx!.lineWidth = 1;
          ctx!.beginPath();
          ctx!.moveTo(sx, sy);
          ctx!.lineTo(bx, by);
          ctx!.stroke();
        }
      }

      ctx!.beginPath();
      ctx!.arc(sx, sy, a.r, 0, Math.PI * 2);
      ctx!.fillStyle = `rgba(206,210,220,${(0.18 + a.z * 0.35).toFixed(3)})`;
      ctx!.fill();
    }

    if (visible && !reduceMotion) raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  const io = new IntersectionObserver(
    (es) => {
      visible = es[0].isIntersecting;
      if (visible) kick();
    },
    { rootMargin: '140px' },
  );
  io.observe(canvas);
  kick();

  return () => {
    if (raf) cancelAnimationFrame(raf);
    io.disconnect();
    resizeObs?.disconnect();
    window.removeEventListener('resize', build);
  };
}
