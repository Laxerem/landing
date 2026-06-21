const VERT_SRC = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.0,1.0);}';

const FRAG_SRC = [
  'precision highp float;',
  'uniform float u_time;',
  'uniform vec2 u_res;',
  'uniform vec2 u_mouse;',
  'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
  'float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));vec2 u=f*f*(3.0-2.0*f);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}',
  'float fbm(vec2 p){float v=0.0;float a=0.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<6;i++){v+=a*noise(p);p=m*p;a*=0.5;}return v;}',
  'void main(){',
  '  vec2 uv=gl_FragCoord.xy/u_res.xy;',
  '  vec2 p=(gl_FragCoord.xy-0.5*u_res.xy)/u_res.y;',
  '  float t=u_time*0.045;',
  '  vec2 q=vec2(fbm(p*1.4+vec2(0.0,t)),fbm(p*1.4+vec2(5.2,1.3)+t));',
  '  vec2 r=vec2(fbm(p*1.4+3.5*q+vec2(1.7,9.2)+0.4*t),fbm(p*1.4+3.5*q+vec2(8.3,2.8)-0.4*t));',
  '  float f=fbm(p*1.4+3.5*r);',
  '  float light=smoothstep(0.18,0.92,f);',
  '  light=pow(light,1.7);',
  '  float md=length(p-u_mouse*vec2(u_res.x/u_res.y,1.0));',
  '  light+=0.12*exp(-md*md*2.5);',
  '  vec3 base=vec3(0.018,0.018,0.026);',
  '  vec3 silver=vec3(0.74,0.76,0.83);',
  '  vec3 col=mix(base,silver,light*0.6);',
  '  col+=vec3(0.0,0.004,0.018)*(1.0-light);',
  '  float topFall=smoothstep(1.15,-0.15,uv.y);',
  '  col*=mix(0.35,1.0,topFall);',
  '  float vig=smoothstep(1.35,0.25,length(uv-vec2(0.5,0.42)));',
  '  col*=mix(0.55,1.0,vig);',
  '  float g=hash(gl_FragCoord.xy+u_time)*0.025-0.012;',
  '  col+=g;',
  '  gl_FragColor=vec4(col,1.0);',
  '}',
].join('\n');

function compile(gl: WebGLRenderingContext, type: number, src: string): WebGLShader {
  const s = gl.createShader(type)!;
  gl.shaderSource(s, src);
  gl.compileShader(s);
  if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
    console.error('shader error:', gl.getShaderInfoLog(s));
  }
  return s;
}

export function initGlFog(
  canvas: HTMLCanvasElement,
  pointer: { x: number; y: number; tx: number; ty: number },
): () => void {
  const gl =
    (canvas.getContext('webgl') as WebGLRenderingContext | null) ??
    (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

  if (!gl) {
    canvas.style.background =
      'radial-gradient(120% 90% at 50% 0%, #16161b 0%, #0a0a0c 55%, #050506 100%)';
    return () => {};
  }

  const prog = gl.createProgram()!;
  gl.attachShader(prog, compile(gl, gl.VERTEX_SHADER, VERT_SRC));
  gl.attachShader(prog, compile(gl, gl.FRAGMENT_SHADER, FRAG_SRC));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(prog, 'p');
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const uTime = gl.getUniformLocation(prog, 'u_time');
  const uRes = gl.getUniformLocation(prog, 'u_res');
  const uMouse = gl.getUniformLocation(prog, 'u_mouse');

  const dpr = Math.min(window.devicePixelRatio || 1, 1.75);

  function resize() {
    const w = Math.floor(window.innerWidth * dpr);
    const h = Math.floor(window.innerHeight * dpr);
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      gl!.viewport(0, 0, w, h);
    }
  }

  resize();
  window.addEventListener('resize', resize);

  const start = performance.now();
  let rafId: number;

  function render(now: number) {
    const t = (now - start) / 1000;
    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    gl!.uniform1f(uTime, t);
    gl!.uniform2f(uRes, canvas.width, canvas.height);
    gl!.uniform2f(uMouse, pointer.x * 0.5, pointer.y * 0.5);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    rafId = requestAnimationFrame(render);
  }

  rafId = requestAnimationFrame(render);

  return () => {
    cancelAnimationFrame(rafId);
    window.removeEventListener('resize', resize);
    gl.deleteProgram(prog);
    gl.deleteBuffer(buf);
  };
}
