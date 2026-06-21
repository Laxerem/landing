import { useEffect, useRef } from 'react';
import { initDither } from './dither';
import styles from './DitherBG.module.css';

export function DitherBG() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cleanup = initDither(ref.current, {
      waveColor: [0.5, 0.5, 0.5],
      colorNum: 26.4,
      pixelSize: 2,
      waveAmplitude: 0.3,
      waveFrequency: 3,
      waveSpeed: 0.05,
      enableMouseInteraction: true,
      mouseRadius: 0.3,
    });
    return () => cleanup?.();
  }, []);

  return (
    <div className={styles.bg} aria-hidden="true">
      <canvas ref={ref} className={styles.dither} />
    </div>
  );
}
