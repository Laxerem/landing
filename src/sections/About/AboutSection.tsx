import { Eyebrow } from '../../components/ui';
import styles from './AboutSection.module.css';
import type { AboutContent, Fact } from '../../types/content';

function FactCard({ fact }: { fact: Fact }) {
  return (
    <div className={styles.fact}>
      <div className={styles.factKey}>{fact.k}</div>
      <div className={styles.factVal}>
        {fact.v}
        {fact.small && <small className={styles.factSmall}>{fact.small}</small>}
      </div>
    </div>
  );
}

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
          <div className={['reveal', styles.facts].join(' ')} style={{ ['--d' as string]: '0.1s' }}>
            {data.facts.map((f) => (
              <FactCard key={f.k} fact={f} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
