import { runShader, type DrawFn } from './glUtils';

const FRAG = [
  '#version 300 es',
  'precision highp float;',
  'out vec4 fragColor;',
  'uniform vec2 u_res;',
  'uniform float u_time;',
  'uniform vec3 u_waveColor;',
  'uniform float u_colorNum;',
  'uniform float u_pixelSize;',
  'uniform float u_waveSpeed;',
  'uniform float u_waveFreq;',
  'uniform float u_waveAmp;',
  'uniform vec2 u_mouse;',
  'uniform float u_mouseOn;',
  'uniform float u_mouseRadius;',
  'vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}',
  'vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}',
  'vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}',
  'vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}',
  'float cnoise(vec2 P){',
  '  vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);',
  '  vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);',
  '  Pi=mod289(Pi);',
  '  vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;',
  '  vec4 i=permute(permute(ix)+iy);',
  '  vec4 gx=fract(i*(1.0/41.0))*2.0-1.0;',
  '  vec4 gy=abs(gx)-0.5;',
  '  vec4 tx=floor(gx+0.5);',
  '  gx=gx-tx;',
  '  vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);',
  '  vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));',
  '  g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;',
  '  float n00=dot(g00,vec2(fx.x,fy.x));',
  '  float n10=dot(g10,vec2(fx.y,fy.y));',
  '  float n01=dot(g01,vec2(fx.z,fy.z));',
  '  float n11=dot(g11,vec2(fx.w,fy.w));',
  '  vec2 fade_xy=fade(Pf.xy);',
  '  vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);',
  '  return 2.3*mix(n_x.x,n_x.y,fade_xy.y);',
  '}',
  'float fbm(vec2 p){',
  '  float value=0.0;float amp=1.0;float freq=u_waveFreq;',
  '  for(int i=0;i<4;i++){value+=amp*abs(cnoise(p));p*=freq;amp*=u_waveAmp;}',
  '  return value;',
  '}',
  'float pattern(vec2 p){vec2 p2=p-u_time*u_waveSpeed;return fbm(p+fbm(p2));}',
  'const float bayer[64]=float[64](',
  '  0.0/64.0,48.0/64.0,12.0/64.0,60.0/64.0,3.0/64.0,51.0/64.0,15.0/64.0,63.0/64.0,',
  '  32.0/64.0,16.0/64.0,44.0/64.0,28.0/64.0,35.0/64.0,19.0/64.0,47.0/64.0,31.0/64.0,',
  '  8.0/64.0,56.0/64.0,4.0/64.0,52.0/64.0,11.0/64.0,59.0/64.0,7.0/64.0,55.0/64.0,',
  '  40.0/64.0,24.0/64.0,36.0/64.0,20.0/64.0,43.0/64.0,27.0/64.0,39.0/64.0,23.0/64.0,',
  '  2.0/64.0,50.0/64.0,14.0/64.0,62.0/64.0,1.0/64.0,49.0/64.0,13.0/64.0,61.0/64.0,',
  '  34.0/64.0,18.0/64.0,46.0/64.0,30.0/64.0,33.0/64.0,17.0/64.0,45.0/64.0,29.0/64.0,',
  '  10.0/64.0,58.0/64.0,6.0/64.0,54.0/64.0,9.0/64.0,57.0/64.0,5.0/64.0,53.0/64.0,',
  '  42.0/64.0,26.0/64.0,38.0/64.0,22.0/64.0,41.0/64.0,25.0/64.0,37.0/64.0,21.0/64.0);',
  'void main(){',
  '  vec2 uv=gl_FragCoord.xy/u_res.xy;',
  '  vec2 nps=vec2(u_pixelSize)/u_res;',
  '  vec2 uvPixel=nps*floor(uv/nps);',
  '  vec2 wuv=uvPixel-0.5;',
  '  wuv.x*=u_res.x/u_res.y;',
  '  float f=pattern(wuv);',
  '  if(u_mouseOn>0.5){',
  '    vec2 mNDC=(u_mouse/u_res-0.5)*vec2(1.0,-1.0);',
  '    mNDC.x*=u_res.x/u_res.y;',
  '    float dist=length(wuv-mNDC);',
  '    float effect=1.0-smoothstep(0.0,u_mouseRadius,dist);',
  '    f-=0.5*effect;',
  '  }',
  '  vec3 col=mix(vec3(0.0),u_waveColor,f);',
  '  vec2 sc=floor(uv*u_res/u_pixelSize);',
  '  int x=int(mod(sc.x,8.0));',
  '  int y=int(mod(sc.y,8.0));',
  '  float threshold=bayer[y*8+x]-0.25;',
  '  float st=1.0/(u_colorNum-1.0);',
  '  col+=threshold*st;',
  '  col=clamp(col-0.2,0.0,1.0);',
  '  col=floor(col*(u_colorNum-1.0)+0.5)/(u_colorNum-1.0);',
  '  fragColor=vec4(col,1.0);',
  '}',
].join('\n');

export interface DitherParams {
  waveColor?: [number, number, number];
  colorNum?: number;
  pixelSize?: number;
  waveSpeed?: number;
  waveFrequency?: number;
  waveAmplitude?: number;
  mouseRadius?: number;
  enableMouseInteraction?: boolean;
}

export function initDither(
  canvas: HTMLCanvasElement | null,
  params: DitherParams = {},
): (() => void) | null {
  const waveColor = params.waveColor ?? [0.5, 0.5, 0.5];
  const colorNum = params.colorNum ?? 26.4;
  const pixelSize = params.pixelSize ?? 2;
  const waveSpeed = params.waveSpeed ?? 0.05;
  const waveFrequency = params.waveFrequency ?? 3;
  const waveAmplitude = params.waveAmplitude ?? 0.3;
  const mouseRadius = params.mouseRadius ?? 0.3;
  const enableMouse = params.enableMouseInteraction !== false;

  const m = { x: 0, y: 0, on: 0 };

  let mouseHandler: ((e: PointerEvent) => void) | null = null;
  if (enableMouse && canvas) {
    mouseHandler = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect();
      const inside =
        e.clientX >= r.left && e.clientX <= r.right &&
        e.clientY >= r.top && e.clientY <= r.bottom;
      m.on = inside ? 1 : 0;
      if (inside && r.width > 0) {
        const d = canvas.width / r.width;
        m.x = (e.clientX - r.left) * d;
        m.y = (e.clientY - r.top) * d;
      }
    };
    window.addEventListener('pointermove', mouseHandler, { passive: true });
  }

  const draw: DrawFn = (gl, u, t, W, H) => {
    gl.uniform2f(u.u_res, W, H);
    gl.uniform1f(u.u_time, t);
    gl.uniform3f(u.u_waveColor, waveColor[0], waveColor[1], waveColor[2]);
    gl.uniform1f(u.u_colorNum, colorNum);
    gl.uniform1f(u.u_pixelSize, pixelSize);
    gl.uniform1f(u.u_waveSpeed, waveSpeed);
    gl.uniform1f(u.u_waveFreq, waveFrequency);
    gl.uniform1f(u.u_waveAmp, waveAmplitude);
    gl.uniform2f(u.u_mouse, m.x, m.y);
    gl.uniform1f(u.u_mouseOn, enableMouse ? m.on : 0);
    gl.uniform1f(u.u_mouseRadius, mouseRadius);
  };

  const cleanup = runShader(canvas, {
    gl2: true,
    frag: FRAG,
    maxDpr: 1.25,
    uniforms: [
      'u_res', 'u_time', 'u_waveColor', 'u_colorNum', 'u_pixelSize',
      'u_waveSpeed', 'u_waveFreq', 'u_waveAmp', 'u_mouse', 'u_mouseOn', 'u_mouseRadius',
    ],
    onFail: (c) => {
      c.style.background =
        'radial-gradient(120% 120% at 50% 50%, #1a1a1f 0%, #0a0a0c 60%, #050506 100%)';
    },
    draw,
  });

  return () => {
    cleanup?.();
    if (mouseHandler) window.removeEventListener('pointermove', mouseHandler);
  };
}
