import { useEffect, useRef } from 'react';
import { initPlasma } from './plasma';
import { initDotField } from './dotField';
import styles from './HeroBG.module.css';

export function HeroBG() {
  const plasmaRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cleanupPlasma = initPlasma(plasmaRef.current);
    const cleanupDots = initDotField(dotsRef.current);
    return () => {
      cleanupPlasma?.();
      cleanupDots?.();
    };
  }, []);

  return (
    <div className={styles.bg} aria-hidden="true">
      <canvas ref={plasmaRef} className={styles.plasma} />
      <canvas ref={dotsRef} className={styles.dots} />
      <div className={styles.veil} />
    </div>
  );
}
