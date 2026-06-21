import { useEffect, useRef } from 'react';
import { initFog } from './fog';
import styles from './MidBG.module.css';

export function MidBG() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cleanup = initFog(ref.current);
    return () => cleanup?.();
  }, []);

  return (
    <div className={styles.bg} aria-hidden="true">
      <canvas ref={ref} className={styles.fog} />
    </div>
  );
}
