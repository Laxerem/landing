import { Eyebrow } from '../../components/ui';
import { StatHeat } from './StatHeat';
import styles from './AboutSection.module.css';
import type { AboutContent } from '../../types/content';

interface AboutSectionProps {
  data: AboutContent;
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section className={styles.block} id="about">
      <div className={styles.shell}>
        <div className={['reveal', styles.head].join(' ')}>
          <Eyebrow>01 — Обо мне</Eyebrow>
          <h2 className={styles.heading}>Бэкенд, который держит продукт.</h2>
        </div>
        <div className={styles.grid}>
          <div className="reveal">
            <p className={styles.lead}>{data.lead}</p>
            <div className={styles.body}>
              {data.body.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
          <div className={['reveal'].join(' ')} style={{ ['--d' as string]: '0.05s' }}>
            <StatHeat stats={data.stats} />
          </div>
        </div>
      </div>
    </section>
  );
}
