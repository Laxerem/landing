import { Fragment } from 'react';
import styles from './StackTechs.module.css';

interface StackTechsProps {
  lead: string[];
  rest: string[];
}

export function StackTechs({ lead, rest }: StackTechsProps) {
  const items = [
    ...lead.map((t) => ({ t, lead: true })),
    ...rest.map((t) => ({ t, lead: false })),
  ];

  return (
    <div className={styles.techs}>
      {items.map((it, i) => (
        <Fragment key={it.t}>
          {i > 0 && <span className={styles.dot}>·</span>}
          <span className={it.lead ? styles.lead : ''}>{it.t}</span>
        </Fragment>
      ))}
    </div>
  );
}
