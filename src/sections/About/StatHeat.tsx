import { useMemo } from 'react';
import { CountUp } from './CountUp';
import styles from './StatHeat.module.css';
import type { AboutStat } from '../../types/content';

const COLS = 16;
const ROWS = 18;

interface StatHeatProps {
  stats: AboutStat[];
}

export function StatHeat({ stats }: StatHeatProps) {
  const cells = useMemo(() => {
    const lvl = () => {
      const r = Math.random();
      if (r > 0.86) return 4;
      if (r > 0.66) return 3;
      if (r > 0.4) return 2;
      if (r > 0.18) return 1;
      return 0;
    };
    return Array.from({ length: COLS * ROWS }, () => ({
      l: lvl(),
      delay: (Math.random() * 4).toFixed(2),
      dur: (3 + Math.random() * 3.5).toFixed(2),
    }));
  }, []);

  return (
    <div className={styles.root}>
      <div className={styles.grid} aria-hidden="true">
        {cells.map((c, i) => (
          <span
            key={i}
            className={[styles.cell, c.l ? styles[`l${c.l}`] : ''].filter(Boolean).join(' ')}
            style={{ animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}
          />
        ))}
      </div>
      <div className={styles.scrim} aria-hidden="true" />
      <div className={styles.rows}>
        {stats.map((s, i) => (
          <div className={styles.row} key={i}>
            <span className={styles.num}>
              <CountUp end={s.n} suffix={s.suffix ?? ''} />
            </span>
            <span className={styles.label}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
