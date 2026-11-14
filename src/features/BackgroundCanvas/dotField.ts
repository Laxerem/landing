import { pointer } from './pointer';
import { reduceMotion, VISIBILITY_MARGIN } from './glUtils';

interface Particle {
  x: number; y: number; z: number;
  vx: number; vy: number; r: number;
  /** Экранная позиция с учётом параллакса — пересчитывается каждый кадр. */
  sx: number; sy: number;
  fill: string;
}

// Прозрачность линии ≤ 0.16 и раньше округлялась до 3 знаков — заранее готовим все стили,
// чтобы линии одной прозрачности рисовать одним stroke() и не собирать строки в каждом кадре.
const LINE_ALPHA_STEPS = 1000;
const MAX_LINE_ALPHA = 0.16;
const LINE_STYLES = Array.from(
  { length: Math.round(MAX_LINE_ALPHA * LINE_ALPHA_STEPS) + 1 },
  (_, i) => `rgba(190,194,205,${(i / LINE_ALPHA_STEPS).toFixed(3)})`,
);

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
        sx: 0,
        sy: 0,
        fill: `rgba(206,210,220,${(0.18 + z * 0.35).toFixed(3)})`,
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
  const LINK2 = LINK * LINK;
  // Отрезки линий, разложенные по индексу прозрачности: [x1, y1, x2, y2, ...].
  const buckets: number[][] = LINE_STYLES.map(() => []);

  function frame() {
    raf = 0;
    ctx!.clearRect(0, 0, W, H);
    const px = pointer.x * 26 * dpr;
    const py = -pointer.y * 26 * dpr;

    for (const a of particles) {
      if (!reduceMotion) {
        a.x += a.vx;
        a.y += a.vy;
      }
      if (a.x < -20) a.x = W + 20;
      if (a.x > W + 20) a.x = -20;
      if (a.y < -20) a.y = H + 20;
      if (a.y > H + 20) a.y = -20;
      a.sx = a.x + px * a.z;
      a.sy = a.y + py * a.z;
    }

    for (const b of buckets) b.length = 0;
    for (let i = 0; i < particles.length; i++) {
      const a = particles[i];
      for (let k = i + 1; k < particles.length; k++) {
        const b = particles[k];
        const dx = a.sx - b.sx, dy = a.sy - b.sy;
        const d2 = dx * dx + dy * dy;
        if (d2 < LINK2) {
          const alpha = (1 - Math.sqrt(d2) / LINK) * MAX_LINE_ALPHA * Math.min(a.z, b.z);
          const idx = Math.round(alpha * LINE_ALPHA_STEPS);
          if (idx > 0) buckets[idx].push(a.sx, a.sy, b.sx, b.sy);
        }
      }
    }

    ctx!.lineWidth = 1;
    for (let idx = 1; idx < buckets.length; idx++) {
      const seg = buckets[idx];
      if (!seg.length) continue;
      ctx!.strokeStyle = LINE_STYLES[idx];
      ctx!.beginPath();
      for (let j = 0; j < seg.length; j += 4) {
        ctx!.moveTo(seg[j], seg[j + 1]);
        ctx!.lineTo(seg[j + 2], seg[j + 3]);
      }
      ctx!.stroke();
    }

    for (const a of particles) {
      ctx!.beginPath();
      ctx!.arc(a.sx, a.sy, a.r, 0, Math.PI * 2);
      ctx!.fillStyle = a.fill;
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
    { rootMargin: VISIBILITY_MARGIN },
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
