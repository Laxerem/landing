import { Eyebrow } from '../../components/ui';
import { StackTechs } from './StackTechs';
import styles from './StackSection.module.css';
import type { StackContent } from '../../types/content';

interface StackSectionProps {
  data: StackContent;
}

export function StackSection({ data }: StackSectionProps) {
  const { core, satellites } = data;

  return (
    <section className={styles.block} id="stack">
      <div className={styles.shell}>
        <div className={['reveal', styles.head].join(' ')}>
          <Eyebrow>03 — Навыки</Eyebrow>
          <h2 className={styles.heading}>Технологический стек.</h2>
          <p className={styles.sub}>
            Ядро — экосистема .NET. Вокруг — данные, инфраструктура и то, чем закрываю смежные задачи.
          </p>
        </div>

        <div className={['reveal', styles.mix].join(' ')}>
          <div className={[styles.el, styles.core].join(' ')}>
            <span className={styles.beam} aria-hidden="true" />
            <div className={styles.coreLabel}>{core.label}</div>
            <div className={styles.coreName}>{core.name}</div>
            <p className={styles.coreDesc}>{core.desc}</p>
            <StackTechs lead={core.lead} rest={core.rest} />
          </div>

          <div className={styles.sats}>
            {satellites.map((s) => (
              <div className={[styles.el, styles.sat].join(' ')} key={s.title}>
                <span className={styles.beam} aria-hidden="true" />
                <div className={styles.satTitle}>{s.title}</div>
                <StackTechs lead={s.lead} rest={s.rest} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
