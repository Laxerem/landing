import { StatusBadge } from '../../components/ui';
import { HeroName } from './HeroName';
import styles from './HeroCopy.module.css';
import type { HeroContent } from '../../types/content';

function IconArrow() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 17 17 7M9 7h8v8" />
    </svg>
  );
}

function IconTelegram() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.3 18.6 19.9c-.25 1.1-.92 1.37-1.86.85l-5.14-3.79-2.48 2.39c-.27.27-.5.5-1.03.5l.37-5.2L17.9 6.1c.4-.35-.09-.55-.62-.2L6.3 12.43l-5.04-1.57c-1.1-.34-1.12-1.1.23-1.62l19.7-7.6c.91-.34 1.71.2 1.42 1.66Z" />
    </svg>
  );
}

interface HeroCopyProps {
  data: HeroContent,
  link: string
}

export function HeroCopy({ data, link }: HeroCopyProps) {
  return (
    <div className={styles.copy}>
      <div className="reveal">
        <StatusBadge text={data.statusText} />
      </div>
      <HeroName firstName={data.firstName} lastName={data.lastName} />
      <div className={[styles.role, 'reveal'].join(' ')} style={{ ['--d' as string]: '0.12s' }}>
        <span>{data.role}</span>
        <span className={styles.roleSep}>{data.roleSeparator}</span>
        <span>{data.roleStack}</span>
      </div>
      <p className={[styles.tagline, 'reveal'].join(' ')} style={{ ['--d' as string]: '0.18s' }}>
        {data.tagline}
      </p>
      <div className={[styles.cta, 'reveal'].join(' ')} style={{ ['--d' as string]: '0.24s' }}>
        <a href="#projects" className={styles.btnPrimary}>
          Смотреть проекты <IconArrow />
        </a>
        <a
          href={link}
          target="_blank"
          rel="noreferrer"
          className={styles.btnGhost}
        >
          <IconTelegram /> Telegram
        </a>
      </div>
    </div>
  );
}
