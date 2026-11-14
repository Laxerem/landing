import { pointer } from './pointer';

export const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Анимация запускается, только когда холст реально виден. Отрицательный отступ нужен,
 * чтобы холст, вплотную примыкающий к краю экрана, не считался видимым.
 */
export const VISIBILITY_MARGIN = '-1px';

type GL = WebGLRenderingContext | WebGL2RenderingContext;

function compile(gl: GL, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('shader error:', gl.getShaderInfoLog(s));
  }
  return s;
}

function makeProgram(gl: GL, vs: string, fs: string): WebGLProgram {
  const p = gl.createProgram()!;
  gl.attachShader(p, compile(gl, gl.VERTEX_SHADER, vs));
  gl.attachShader(p, compile(gl, gl.FRAGMENT_SHADER, fs));
  gl.linkProgram(p);
  if (!gl.getProgramParameter(p, gl.LINK_STATUS)) {
    console.error('link error:', gl.getProgramInfoLog(p));
  }
  return p;
}

export type DrawFn = (
  gl: GL,
  u: Record<string, WebGLUniformLocation | null>,
  t: number,
  W: number,
  H: number,
) => void;

export interface ShaderOpts {
  gl2?: boolean;
  frag: string;
  uniforms?: string[];
  maxDpr?: number;
  /** Множитель внутреннего разрешения холста относительно (ограниченного) DPR. */
  scale?: number;
  /** Ограничение частоты кадров анимации; resize и прокрутка (см. redrawOnScroll) перерисовывают сразу. */
  maxFps?: number;
  /** Перерисовывать на каждый кадр прокрутки — для холстов, чья картинка зависит от позиции скролла. */
  redrawOnScroll?: boolean;
  onFail?: (canvas: HTMLCanvasElement) => void;
  draw: DrawFn;
}

export function runShader(
  canvas: HTMLCanvasElement | null,
  opts: ShaderOpts,
): (() => void) | null {
  if (!canvas) return null;

  const isGl2 = !!opts.gl2;
  const gl: GL | null = isGl2
    ? canvas.getContext('webgl2', { antialias: false, alpha: false })
    : (canvas.getContext('webgl', { antialias: false, alpha: false }) as GL | null) ||
      (canvas.getContext('experimental-webgl') as GL | null);

  if (!gl) {
    opts.onFail?.(canvas);
    return null;
  }

  const vsrc = isGl2
    ? '#version 300 es\nin vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}'
    : 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';

  const prog = makeProgram(gl, vsrc, opts.frag);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW,
  );
  const loc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(loc);
  gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

  const u: Record<string, WebGLUniformLocation | null> = {};
  (opts.uniforms ?? []).forEach((n) => {
    u[n] = gl.getUniformLocation(prog, n);
  });

  const dpr = Math.min(window.devicePixelRatio || 1, opts.maxDpr ?? 1.5) * (opts.scale ?? 1);
  let W = 0, H = 0;
  let needsResize = true;

  function resize() {
    needsResize = false;
    const w = Math.max(1, Math.floor(canvas!.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas!.clientHeight * dpr));
    if (w !== W || h !== H) {
      W = canvas!.width = w;
      H = canvas!.height = h;
      gl!.viewport(0, 0, W, H);
    }
  }

  const start = performance.now();
  // Небольшой допуск, чтобы джиттер rAF не пропускал кадр, который уже пора рисовать.
  const minFrameMs = opts.maxFps ? 1000 / opts.maxFps - 2 : 0;
  let lastDraw = -Infinity;
  let forceDraw = false;
  let raf = 0;
  let visible = false;

  function frame(now: number) {
    raf = 0;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    if (forceDraw || needsResize || now - lastDraw >= minFrameMs) {
      forceDraw = false;
      lastDraw = now;
      if (needsResize) resize();
      const t = (now - start) / 1000;
      opts.draw(gl!, u, reduceMotion ? 8.0 : t, W, H);
      (gl as WebGLRenderingContext).drawArrays(gl!.TRIANGLES, 0, 3);
    }
    if (visible && !reduceMotion) raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  function onResize() {
    needsResize = true;
    kick();
  }

  let resizeObs: ResizeObserver | null = null;
  if (window.ResizeObserver) {
    resizeObs = new ResizeObserver(onResize);
    resizeObs.observe(canvas);
  }
  window.addEventListener('resize', onResize);

  // Пока холст виден, цикл rAF и так крутится — достаточно попросить нарисовать ближайший кадр.
  // При reduceMotion цикла нет, поэтому кадр запрашивается явно.
  function onScroll() {
    if (!visible) return;
    forceDraw = true;
    if (reduceMotion) kick();
  }
  if (opts.redrawOnScroll) window.addEventListener('scroll', onScroll, { passive: true });

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
    window.removeEventListener('resize', onResize);
    if (opts.redrawOnScroll) window.removeEventListener('scroll', onScroll);
  };
}
