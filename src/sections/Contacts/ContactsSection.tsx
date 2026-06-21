import { Eyebrow } from '../../components/ui';
import styles from './ContactsSection.module.css';
import type { ContactsContent } from '../../types/content';

function IconGitHub() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.73.5.5 5.74.5 12.02c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.16-.02-2.1-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.79 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.05.78 2.12 0 1.53-.01 2.77-.01 3.15 0 .31.21.68.8.56A11.53 11.53 0 0 0 23.5 12.02C23.5 5.74 18.27.5 12 .5Z" />
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

interface ContactsSectionProps {
  data: ContactsContent;
}

export function ContactsSection({ data: _ }: ContactsSectionProps) {
  return (
    <section className={styles.contact} id="contact">
      <div className={styles.shell}>
        <Eyebrow center className="reveal">04 — Контакты</Eyebrow>
        <h2 className={['reveal', styles.heading].join(' ')} style={{ ['--d' as string]: '0.06s' }}>
          Давайте <span className={styles.silver}>работать</span> вместе
        </h2>
        <p className={['reveal', styles.sub].join(' ')} style={{ ['--d' as string]: '0.12s' }}>
          Открыт к предложениям и интересным задачам на бэкенде. Самый быстрый способ связаться — Telegram.
        </p>
        <div className={['reveal', styles.links].join(' ')} style={{ ['--d' as string]: '0.18s' }}>
          <a
            className={styles.btnPrimary}
            href="https://t.me/laxerem"
            target="_blank"
            rel="noreferrer"
          >
            <IconTelegram /> @laxerem
          </a>
          <a
            className={styles.btnGhost}
            href="https://github.com/Laxerem"
            target="_blank"
            rel="noreferrer"
          >
            <IconGitHub /> github.com/Laxerem
          </a>
        </div>
      </div>
    </section>
  );
}
