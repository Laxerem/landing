import styles from './SkillChip.module.css';
import type { SkillItem } from '../../types/content';

interface SkillChipProps {
  skill: SkillItem;
}

export function SkillChip({ skill }: SkillChipProps) {
  return (
    <span className={[styles.chip, styles[skill.level]].join(' ')}>
      {skill.name}
    </span>
  );
}
