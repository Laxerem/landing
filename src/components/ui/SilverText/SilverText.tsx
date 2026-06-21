import type { ElementType, ReactNode } from 'react';
import styles from './SilverText.module.css';

interface SilverTextProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
}

export function SilverText({ children, as: Tag = 'span', className }: SilverTextProps) {
  return (
    <Tag className={[styles.silver, className].filter(Boolean).join(' ')}>
      {children}
    </Tag>
  );
}
