import { HeroBG } from '../../features/BackgroundCanvas';
import { HeroCopy } from './HeroCopy';
import { HeroPhoto } from './HeroPhoto';
import styles from './HeroSection.module.css';
import type { HeroContent, ResumeContent } from '../../types/content';

interface HeroSectionProps {
  data: HeroContent,
  resume: ResumeContent,
  link: string
}

export function HeroSection({ data, resume, link }: HeroSectionProps) {
  return (
    <section className={styles.hero} id="top">
      <HeroBG />
      <div className={styles.inner}>
        <HeroCopy data={data} resume={resume} link={link} />
        <HeroPhoto src={data.photoSrc} alt={`${data.firstName} ${data.lastName}`} />
      </div>
      <div className={styles.scrollHint} aria-hidden="true">
        <span>scroll</span>
        <span className={styles.line} />
      </div>
    </section>
  );
}
