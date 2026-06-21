import { Section } from '../../components/layout';
import { SilverText } from '../../components/ui';
import { TimelineItem } from './TimelineItem';
import styles from './ExperienceSection.module.css';
import type { ExperienceContent } from '../../types/content';

interface ExperienceSectionProps {
  data: ExperienceContent;
}

export function ExperienceSection({ data }: ExperienceSectionProps) {
  return (
    <Section id="experience">
      <div className={styles.header}>
        <SilverText as="h2" className={styles.heading}>
          Опыт
        </SilverText>
      </div>
      <div className={styles.timeline}>
        {data.items.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </div>
    </Section>
  );
}
