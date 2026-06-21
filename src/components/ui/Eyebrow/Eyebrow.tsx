import type { ReactNode } from 'react';
import styles from './Eyebrow.module.css';

interface EyebrowProps {
  children: ReactNode;
  className?: string;
  center?: boolean;
}

export function Eyebrow({ children, className, center }: EyebrowProps) {
  return (
    <span className={[styles.eyebrow, center ? styles.center : '', className].filter(Boolean).join(' ')}>
      {children}
    </span>
  );
}
