import styles from './SkillGroup.module.css';
import type { SkillGroup as SkillGroupType } from '../../types/content';

interface SkillGroupProps {
  group: SkillGroupType;
  index: number;
}

export function SkillGroup({ group, index }: SkillGroupProps) {
  return (
    <div
      className={['reveal', styles.card].join(' ')}
      style={{ ['--d' as string]: `${index * 0.06}s` }}
    >
      <h3 className={styles.title}>
        <span className={styles.num}>{group.n}</span>
        {group.title}
      </h3>
      <div className={styles.sub}>{group.sub}</div>
      <div className={styles.chips}>
        {group.lead.map((t) => (
          <span key={t} className={[styles.chip, styles.lead].join(' ')}>{t}</span>
        ))}
        {group.rest.map((t) => (
          <span key={t} className={styles.chip}>{t}</span>
        ))}
      </div>
    </div>
  );
}
