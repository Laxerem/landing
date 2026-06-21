import { pointer } from './pointer';

export const reduceMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
    ? canvas.getContext('webgl2', { antialias: true, alpha: false })
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

  const dpr = Math.min(window.devicePixelRatio || 1, opts.maxDpr ?? 1.5);
  let W = 0, H = 0;

  function resize() {
    const w = Math.max(1, Math.floor(canvas!.clientWidth * dpr));
    const h = Math.max(1, Math.floor(canvas!.clientHeight * dpr));
    if (w !== W || h !== H) {
      W = canvas!.width = w;
      H = canvas!.height = h;
      gl!.viewport(0, 0, W, H);
    }
  }

  const start = performance.now();
  let raf = 0;
  let visible = false;

  function frame(now: number) {
    raf = 0;
    resize();
    const t = (now - start) / 1000;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    opts.draw(gl!, u, reduceMotion ? 8.0 : t, W, H);
    (gl as WebGLRenderingContext).drawArrays(gl!.TRIANGLES, 0, 3);
    if (visible && !reduceMotion) raf = requestAnimationFrame(frame);
  }

  function kick() {
    if (!raf) raf = requestAnimationFrame(frame);
  }

  let resizeObs: ResizeObserver | null = null;
  if (window.ResizeObserver) {
    resizeObs = new ResizeObserver(kick);
    resizeObs.observe(canvas);
  }
  window.addEventListener('resize', kick);

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
    window.removeEventListener('resize', kick);
  };
}
