import { runShader, type DrawFn } from './glUtils';

const FRAG = [
  'precision highp float;',
  'uniform float u_time;',
  // u_full — размер всего фонового блока, u_off — смещение холста внутри него (в пикселях холста).
  'uniform vec2 u_full;',
  'uniform vec2 u_off;',
  'float hash(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}',
  'float noise(vec2 p){vec2 i=floor(p),f=fract(p);float a=hash(i),b=hash(i+vec2(1.0,0.0)),c=hash(i+vec2(0.0,1.0)),d=hash(i+vec2(1.0,1.0));vec2 u=f*f*(3.0-2.0*f);return mix(mix(a,b,u.x),mix(c,d,u.x),u.y);}',
  'float fbm(vec2 p){float v=0.0;float a=0.5;mat2 m=mat2(1.6,1.2,-1.2,1.6);for(int i=0;i<5;i++){v+=a*noise(p);p=m*p;a*=0.5;}return v;}',
  'void main(){',
  '  vec2 uv=(gl_FragCoord.xy+u_off)/u_full;',
  '  float aspect=u_full.x/u_full.y;',
  '  vec2 p=vec2((uv.x-0.5)*aspect,uv.y);',
  '  float t=u_time*0.035;',
  '  vec2 q=vec2(fbm(p*2.2+vec2(0.0,t)),fbm(p*2.2+vec2(4.0,1.0)+t*0.8));',
  '  float f=fbm(p*2.2+2.0*q+vec2(0.0,t*1.6));',
  '  float fog=smoothstep(0.14,0.92,f);',
  '  float env=mix(0.42,1.0,pow(uv.y,0.9));',
  '  vec3 base=vec3(0.014,0.015,0.022);',
  '  vec3 silver=vec3(0.60,0.63,0.70);',
  '  vec3 col=base+silver*fog*0.20*env;',
  '  col+=silver*0.06*smoothstep(0.86,1.0,uv.y);',
  '  float g=hash(gl_FragCoord.xy+u_time)*0.02-0.01;',
  '  col+=g;',
  '  gl_FragColor=vec4(col,1.0);',
  '}',
].join('\n');

/**
 * Холст размером с экран «прилипает» к видимой части блока `area`, а шейдер рисует
 * ровно тот кусок узора, который раньше приходился на это место во всю высоту блока.
 */
export function initFog(
  canvas: HTMLCanvasElement | null,
  area: HTMLElement | null,
): (() => void) | null {
  if (!area) return null;

  const draw: DrawFn = (gl, u, t, W) => {
    const c = canvas!.getBoundingClientRect();
    const a = area.getBoundingClientRect();
    const k = c.width > 0 ? W / c.width : 1;
    gl.uniform1f(u.u_time, t);
    gl.uniform2f(u.u_full, a.width * k, a.height * k);
    // gl_FragCoord.y отсчитывается от низа холста, поэтому смещение — от низа блока.
    gl.uniform2f(u.u_off, (c.left - a.left) * k, (a.bottom - c.bottom) * k);
  };

  return runShader(canvas, {
    frag: FRAG,
    uniforms: ['u_time', 'u_full', 'u_off'],
    maxDpr: 1.0,
    // Туман движется очень медленно — 30 кадров неотличимы от 60.
    maxFps: 30,
    redrawOnScroll: true,
    onFail: (c) => {
      c.style.background =
        'linear-gradient(180deg, #0c0c11 0%, #08080b 60%, #060608 100%)';
    },
    draw,
  });
}
