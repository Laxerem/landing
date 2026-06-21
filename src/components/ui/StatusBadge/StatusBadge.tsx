import styles from './StatusBadge.module.css';

interface StatusBadgeProps {
  text: string;
}

export function StatusBadge({ text }: StatusBadgeProps) {
  return (
    <div className={styles.badge}>
      <span className={styles.dot} />
      {text}
    </div>
  );
}
