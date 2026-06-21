import styles from './TimelineItem.module.css';
import type { ExperienceItem } from '../../types/content';

interface TimelineItemProps {
  item: ExperienceItem;
}

export function TimelineItem({ item }: TimelineItemProps) {
  return (
    <div className={styles.item}>
      <div className={styles.period}>{item.period}</div>
      <div className={styles.connector}>
        <span className={[styles.dot, styles[item.kind]].join(' ')} />
      </div>
      <div className={styles.content}>
        <p className={styles.title}>{item.title}</p>
        <p className={styles.org}>{item.organization}</p>
        {item.description && (
          <p className={styles.description}>{item.description}</p>
        )}
      </div>
    </div>
  );
}
