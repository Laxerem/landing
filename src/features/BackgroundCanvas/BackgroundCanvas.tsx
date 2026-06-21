import { useEffect } from 'react';
import { initGlFog } from './glFog';
import { initDotField } from './dotField';

export function BackgroundCanvas() {
  useEffect(() => {
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onPointerMove, { passive: true });

    const glCanvas = document.getElementById('gl') as HTMLCanvasElement | null;
    const dotsCanvas = document.getElementById('dots') as HTMLCanvasElement | null;

    const cleanupGl = glCanvas ? initGlFog(glCanvas, pointer) : null;
    const cleanupDots = dotsCanvas ? initDotField(dotsCanvas, pointer) : null;

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      cleanupGl?.();
      cleanupDots?.();
    };
  }, []);

  return null;
}
