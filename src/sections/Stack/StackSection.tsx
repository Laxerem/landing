import { Eyebrow } from '../../components/ui';
import { SkillGroup } from './SkillGroup';
import styles from './StackSection.module.css';
import type { StackContent } from '../../types/content';

interface StackSectionProps {
  data: StackContent;
}

export function StackSection({ data }: StackSectionProps) {
  return (
    <section className={styles.block} id="stack">
      <div className={styles.shell}>
        <div className={['reveal', styles.head].join(' ')}>
          <Eyebrow>02 — Навыки</Eyebrow>
          <h2 className={styles.heading}>Технологический стек.</h2>
          <p className={styles.sub}>
            Ядро — экосистема .NET. Вокруг — данные, инфраструктура и то, чем закрываю смежные задачи.
          </p>
        </div>
        <div className={styles.grid}>
          {data.groups.map((group, i) => (
            <SkillGroup key={group.n} group={group} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
